/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/14
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';
import CanvasRender from '../core/render/canvas/canvas-render';


export default (
  function () {
    var doc = document;

    var functions = (function () {
      function syncBackgroundRender () {
        if (this.clipable || this.backgroundColor != null) {
          if (this.getObserverByAllParams('render', renderClipAndBackground, this, this) === null) {
            this.addObserver('render', renderClipAndBackground, this, this, -Infinity);
          }
        } else {
          this.removeObserver('render', renderClipAndBackground, this, this);
        }
      }

      function syncBorderRender () {
        if (this.borderWidth !== 0 && this.borderColor !== null) {
          if (this.getObserverByAllParams('render', renderBorder, this, this) === null) {
            this.addObserver('render', renderBorder, this, this, Infinity);
          }
        } else {
          this.removeObserver('render', renderBorder, this, this);
        }
      }

      function syncBorderRadius () {
        this._clipBorderRadius = Math.ceil(this.borderRadius + this.borderWidth / 2);
        if (this._renderBorderRadius < 0) {
          this._renderBorderRadius = 0;
        }
      }
      
      function syncBorderRenderCache () {
        this._borderCacheCtx.renderInvalid = true;
      }
      
      function renderClipAndBackground (sender, render, dirtyZones, global) {
        if (global) {
          var rect = this.getRectInLocal();
          var left = rect.left;
          var right = rect.right;
          var top = rect.top;
          var bottom = rect.bottom;
          if (this.borderRadius === 0) {
            render.beginPath();
            render.rect(left, top, rect.width, rect.height);
            if (this.clipable) {
              render.clip();
            }
            if (this.backgroundColor !== null) {
              render.fillStyle = this.backgroundColor;
              render.fill();
            }
          } else {
            if (this.clipable) {
              var radius = this._clipBorderRadius;
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
              render.clip();
            }

            if (this.backgroundColor !== null) {
              var halfWidth = this.borderWidth / 2;
              right = right - halfWidth;
              bottom = bottom - halfWidth;
              left = left + halfWidth;
              top = top + halfWidth;
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
              render.fillStyle = this.backgroundColor;
              render.fill();
            }
          }
        } else {

        }
      }

      function renderBorder (sender, render, dirtyZones, global) {
        if (this._borderCacheCtx.renderInvalid) {
          this._borderCacheCtx.renderInvalid = false;
          renderBorderCache.call(this, sender, this._borderCacheCtx.render);
        }
        if (global) {
          var rect = this.getRectInLocal();
          render.drawImage(this._borderCacheCtx.render, rect.left, rect.top);
        } else {
          var rectInWorld = this.getRectInWorld();
          // TODO!!!
        }
      }
      
      function renderBorderCache (sender, render) {
        var rect = this.getRectInLocal();
        var left = 0;
        var right = rect.width;
        var top = 0;
        var bottom = rect.height;
        var radius = this.borderRadius;
        render.width = right;
        render.height = bottom;
        render.clear();
        if (radius === 0) {
          render.beginPath();
          render.rect(left, top, rect.width, rect.height);
        } else {
          var halfWidth = this.borderWidth / 2;
          right = right - halfWidth;
          bottom = bottom - halfWidth;
          left = left + halfWidth;
          top = top + halfWidth;
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
        render.lineWidth = this.borderWidth;
        render.strokeStyle = this.borderColor;
        render.stroke();
      }

      return {
        syncBorderRadius: syncBorderRadius,
        syncBackgroundRender: syncBackgroundRender,
        syncBorderRender: syncBorderRender,
        syncBorderRenderCache: syncBorderRenderCache
      }
    })();

    var UIView = (function () {
      var InnerUIView = LangUtil.extend(Node);

      InnerUIView.prototype.defVisible = true;
      InnerUIView.prototype.defClipable = false;
      InnerUIView.prototype.defBackgroundColor = null;
      InnerUIView.prototype.defBorderColor = null;
      InnerUIView.prototype.defBorderWidth = 0;
      InnerUIView.prototype.defBorderRadius = 0;
      InnerUIView.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('clipable', LangUtil.checkAndGet(conf.clipable, this.defClipable));
        this.defineNotifyProperty('backgroundColor', LangUtil.checkAndGet(conf.backgroundColor, this.defBackgroundColor));
        this.defineNotifyProperty('borderColor', LangUtil.checkAndGet(conf.borderColor, this.defBorderColor));
        this.defineNotifyProperty('borderWidth', LangUtil.checkAndGet(conf.borderWidth, this.defBorderWidth));
        this.defineNotifyProperty('borderRadius', LangUtil.checkAndGet(conf.borderRadius, this.defBorderRadius));

        this._clipBorderRadius = 0;
        this._borderCacheCtx = {
          renderInvalid: true,
          render: new CanvasRender({canvas: doc.createElement('canvas')})
        };

        functions.syncBackground.call(this);
        functions.syncBorder.call(this);
        functions.syncBorderRadius.call(this);
        functions.syncBorderRenderCache.call(this);

        this.addObserver('borderWidthChanged', functions.syncBorderRadius, this, this);
        this.addObserver('borderRadiusChanged', functions.syncBorderRadius, this, this);

        this.addObserver('clipableChanged', functions.syncBackgroundRender, this, this);
        this.addObserver('backgroundColorChanged', functions.syncBackgroundRender, this, this);

        this.addObserver('borderColorChanged', functions.syncBorderRender, this, this);
        this.addObserver('borderWidthChanged', functions.syncBorderRender, this, this);
        this.addObserver('borderRadiusChanged', functions.syncBorderRender, this, this);

        this.addObserver('widthChanged', functions.syncBorderRenderCache, this, this);
        this.addObserver('heightChanged', functions.syncBorderRenderCache, this, this);
        this.addObserver('borderColorChanged', functions.syncBorderRenderCache, this, this);
        this.addObserver('borderWidthChanged', functions.syncBorderRenderCache, this, this);
        this.addObserver('borderRadiusChanged', functions.syncBorderRenderCache, this, this);

        this.addObserver('clipableChanged', this.refresh, this, this);
        this.addObserver('backgroundColorChanged', this.refresh, this, this);
        this.addObserver('borderColorChanged', this.refresh, this, this);
        this.addObserver('borderWidthChanged', this.refresh, this, this);
        this.addObserver('borderRadiusChanged', this.refresh, this, this);
      }

      return InnerUIView;
    })();

    return UIView;
  }
)();