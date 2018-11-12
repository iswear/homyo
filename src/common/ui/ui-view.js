/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2018/7/28
 */
import LangUtil from '../utils/lang-util'
import Node from '../core/node';
import CanvasRender from '../core/render/canvas/canvas-render';

export default (function () {
    var doc = document;

    var functions = (function () {
      function renderBackgroundAndBorder (sender, render, dirtyZones) {
        var ctx = this._backgroundBorderCacheCtx;
        if (ctx.renderInvalid) {
          renderBackgroundAndBorderCache.call(this, ctx.render);
          ctx.renderInvalid = false;
        }
        var localZone = this.getLocalZone();
        var cacheCanvas = ctx.render.getCanvas();
        var offsetLeft = - localZone.left;
        var offsetTop = - localZone.top;
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {
          var dirtyZone = dirtyZones[i];
          render.drawImageExt(cacheCanvas,
            dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
            dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
        }      
      }
      
      function renderBackgroundAndBorderCache (render) {
        var ctx = this._backgroundBorderCacheCtx;
        var zone = this.getLocalZone();
        ctx.borderOffset = this.borderWidth / 2;
        ctx.borderRadius = this.borderRadius;
        ctx.backgroundOffset = ctx.borderOffset;
        ctx.backgroundRadius = this.borderRadius;
        ctx.clipOffset = this.borderWidth;
        ctx.clipRadius = this.borderRadius < ctx.borderOffset ? 0 : (this.borderRadius - ctx.borderOffset);
        if (ctx.render.width !== zone.width || ctx.render.height !== zone.height) {
          ctx.render.width = zone.width;
          ctx.render.height = zone.height;
        } else {
          ctx.render.clear();
        }
        if (ctx.borderRadius > 0) {
          renderRadiusPath(render, 0, 0, zone.width, zone.height, ctx.borderOffset, ctx.borderRadius);
        } else {
          renderRectPath(render, 0, 0, zone.width, zone.height, ctx.borderOffset);
        }
        if (this.backgroundColor !== null) {
          render.fillStyle = this.backgroundColor;
          render.fill();
        }
        if (this.borderColor != null && this.borderWidth > 0) {
          render.lineWidth = this.borderWidth;
          render.strokeStyle = this.borderColor;
          render.stroke();
        }
      }

      function renderRectPath(render, left, top, right, bottom, offset) {
        left = left + offset;
        top = top + offset;
        right = right - offset;
        bottom = bottom - offset;
        render.beginPath();
        render.moveTo(left, top);
        render.lineTo(right, top);
        render.lineTo(right, bottom);
        render.lineTo(left, bottom);
        render.closePath();
      }

      function renderRadiusPath(render, left, top, right, bottom, offset, radius) {
        left = left + offset;
        top = top + offset;
        right = right - offset;
        bottom = bottom - offset;
        render.beginPath();
        render.moveTo(left, top + radius);
        render.arcTo(left, top, left + radius, top, radius);
        render.lineTo(right - radius, top);
        render.arcTo(right, top, right, top + radius, radius);
        render.lineTo(right, bottom - radius);
        render.arcTo(right, bottom, right - radius, bottom, radius);
        render.lineTo(left + radius, bottom);
        render.arcTo(left, bottom, left, bottom - radius, radius);
        render.closePath();
      }

      function onPropertyChanged (sender, name, newVal, oldVal) {
        if (onEventsMap.hasOwnProperty(name)) {
          onEventsMap[name].call(this, newVal, oldVal);
        }
      }

      function onRenderChanged () {
        var ctx = this._backgroundBorderCacheCtx;
        this.removeObserver('render', renderBackgroundAndBorder, this);
        this._backgroundBorderCacheCtx.renderInvalid = true;
        this.dirty();
        if (!(this.backgroundColor === null && (this.borderColor === null || this.borderWidth <= 0))) {
          this.addObserver('render', renderBackgroundAndBorder, this, -Infinity);
          if (ctx.render === null) {
            ctx.renderInvalid = true;
            ctx.render = new CanvasRender({
              canvas: doc.createElement('canvas'),
              width: this.width,
              height: this.height
            })
          }
        } else {
          ctx.render = null;
        }
      }

      function onWidthChanged () {
        this._backgroundBorderCacheCtx.renderInvalid = true;
      }

      function onHeightChanged () {
        this._backgroundBorderCacheCtx.renderInvalid = true;
      }

      function onBorderRadiusChanged () {
        this._backgroundBorderCacheCtx.renderInvalid = true;
        this.dirty();
      }

      var onEventsMap = {
        width: onWidthChanged,
        height: onHeightChanged,
        backgroundColor: onRenderChanged,
        borderWidth: onRenderChanged,
        borderColor: onRenderChanged,
        borderRadius: onBorderRadiusChanged
      }

      return {
        onPropertyChanged: onPropertyChanged
      }
    })();

    var UIView = (function () {
      var InnerUIView = LangUtil.extend(Node);

      InnerUIView.prototype.defVisible = true;
      InnerUIView.prototype.defBackgroundColor = null;
      InnerUIView.prototype.defBorderWidth = 0;
      InnerUIView.prototype.defBorderColor = null;
      InnerUIView.prototype.defBorderRadius = 0;
      InnerUIView.prototype.defDirtyRenderSupport = true;
      InnerUIView.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.backgroundColor = LangUtil.checkAndGet(conf.backgroundColor, this.defBackgroundColor);
        this.borderWidth = LangUtil.checkAndGet(conf.borderWidth, this.defBorderWidth);
        this.borderColor = LangUtil.checkAndGet(conf.borderColor, this.defBorderColor);
        this.borderRadius = LangUtil.checkAndGet(conf.borderRadius, this.defBorderRadius);

        this._backgroundBorderCacheCtx = {
          borderOffset: 0,
          borderRadius: 0,
          backgroundOffset: 0,
          backgroundRadius: 0,
          clipOffset: 0,
          clipRadius: 0,
          renderInvalid: true,
          render: null
        };

        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      InnerUIView.prototype.startClip = function (render) {
        var ctx = this._backgroundBorderCacheCtx;
        var zone = this.getLocalZone();
        if (ctx.clipRadius > 0) {
          functions.renderRadiusPath(render, zone.left, zone.top, zone.right, zone.bottom, ctx.clipOffset, ctx.clipRadius);
        } else {
          functions.renderRectPath(render, zone.left, zone.top, zone.right, zone.bottom, ctx.clipOffset);
        }
        render.clip();
      }

      return InnerUIView;
    })();

    return UIView;
  }
)();

