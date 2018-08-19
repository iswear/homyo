/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2018/7/28
 */
import LangUtil from '../utils/lang-util'
import Node from '../core/node';
import CanvasRender from '../core/render/canvas/canvas-render';

export default (
  function () {
    var doc = document;

    var functions = (function () {
      function syncBackgroundBorderRender() {
        var ctx = this._backgroundBorderCacheCtx;
        if (this.backgroundColor === null && (this.borderColor === null || this.borderWidth <= 0)) {
          this.removeObserver('render', renderBackgroundAndBorder, this, this);
          ctx.render = null;
        } else {
          if (this.getObserverByAllParams('render', renderBackgroundAndBorder, this, this) === null) {
            this.addObserver('render', renderBackgroundAndBorder, this, this, -Infinity);
          }
          if (ctx.render === null) {
            ctx.renderInvalid = true;
            ctx.render = new CanvasRender({
              canvas: doc.createElement('canvas'),
              width: this.width,
              height: this.height
            });
          }
        }
      }

      function syncBackgroundBorderRenderInvalid() {
        this._backgroundBorderCacheCtx.renderInvalid = true;
      }
      
      function renderBackgroundAndBorder(sender, render, dirtyZones) {
        var ctx = this._backgroundBorderCacheCtx;
        if (ctx.renderInvalid) {
          renderBackgroundAndBorderCache.call(this, ctx.render);
          ctx.renderInvalid = false;
        }
        var rectInLocal = this.getRectInLocal();
        var cacheCanvas = ctx.render.getCanvas();
        var offsetLeft = - rectInLocal.left;
        var offsetTop = - rectInLocal.top;
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {
          var dirtyZone = dirtyZones[i];
          render.drawImageExt(cacheCanvas,
            dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
            dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
        }      
      }
      
      function renderBackgroundAndBorderCache(render) {
        var ctx = this._backgroundBorderCacheCtx;
        var rect = this.getRectInLocal();
        ctx.borderOffset = this.borderWidth / 2;
        ctx.borderRadius = this.borderRadius;
        ctx.backgroundOffset = ctx.borderOffset;
        ctx.backgroundRadius = this.borderRadius;
        ctx.clipOffset = this.borderWidth;
        ctx.clipRadius = this.borderRadius < ctx.borderOffset ? 0 : (this.borderRadius - ctx.borderOffset);
        if (ctx.render.width !== rect.width || ctx.render.height !== rect.height) {
          ctx.render.width = rect.width;
          ctx.render.height = rect.height;
        } else {
          ctx.render.clear();
        }
        if (ctx.borderRadius > 0) {
          renderRadiusPath(render, 0, 0, rect.width, rect.height, ctx.borderOffset, ctx.borderRadius);
        } else {
          renderRectPath(render, 0, 0, rect.width, rect.height, ctx.borderOffset);
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

      return {
        syncBackgroundBorderRender: syncBackgroundBorderRender,
        syncBackgroundBorderRenderInvalid: syncBackgroundBorderRenderInvalid,
        renderRectPath: renderRectPath,
        renderRadiusPath: renderRadiusPath
      }
    })();

    var UIView = (function () {
      var InnerUIView = LangUtil.extend(Node);

      InnerUIView.prototype.defVisible = true;
      InnerUIView.prototype.defBackgroundColor = null;
      InnerUIView.prototype.defBorderColor = null;
      InnerUIView.prototype.defVisible = true;

      InnerUIView.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('backgroundColor', LangUtil.checkAndGet(conf.backgroundColor, this.defBackgroundColor));
        this.defineNotifyProperty('borderWidth', LangUtil.checkAndGet(conf.borderWidth, this.defBorderWidth));
        this.defineNotifyProperty('borderColor', LangUtil.checkAndGet(conf.borderColor, this.defBorderColor));
        this.defineNotifyProperty('borderRadius', LangUtil.checkAndGet(conf.borderRadius, this.defBorderRadius));

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

        functions.syncBackgroundBorderRender.call(this);
        functions.syncBackgroundBorderRenderInvalid.call(this);

        this.addObserver('backgroundColorChanged', this.refresh, this, this);
        this.addObserver('borderWidthChanged', this.refresh, this, this);
        this.addObserver('borderColorChanged', this.refresh, this, this);
        this.addObserver('borderRadiusChanged', this.refresh, this, this);

        this.addObserver('backgroundColorChanged', functions.syncBackgroundBorderRender, this, this);
        this.addObserver('borderWidthChanged', functions.syncBackgroundBorderRender, this, this);
        this.addObserver('borderColorChanged', functions.syncBackgroundBorderRender, this, this);

        this.addObserver('widthChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('heightChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('backgroundColorChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('borderWidthChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('borderColorChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('borderRadiusChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
      }

      InnerUIView.prototype.startClip = function (render) {
        var ctx = this._backgroundBorderCacheCtx;
        var rect = this.getRectInLocal();
        if (ctx.clipRadius > 0) {
          functions.renderRadiusPath(render, rect.left, rect.top, rect.right, rect.bottom, ctx.clipOffset, ctx.clipRadius);
        } else {
          functions.renderRectPath(render, rect.left, rect.top, rect.right, rect.bottom, ctx.clipOffset);
        }
        render.clip();
      }

      return InnerUIView;
    })();

    return UIView;
  }
)();


