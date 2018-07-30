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
      function syncClipRender() {
        if (this.enableClip) {
          if (this.getObserverByAllParams('render', renderClipSave, this, this) === null) {
            this.addObserver('render', renderClipSave, this, this, LangUtil.getMinInteger() + 1);
          }
          if (this.getObserverByAllParams('render', renderClipStore, this, this) === null) {
            this.addObserver('render', renderClipStore, this, this, LangUtil.getMaxInteger());
          }
        } else {
          this.removeObserver('render', renderClipSave, this, this);
          this.removeObserver('render', renderClipStore, this, this);
        }
      }

      function syncBackgroundBorderRender() {
        var ctx = this._backgroundBorderCacheCtx;
        if (this.backgroundColor === null && (this.borderColor === null || this.borderWidth <= 0)) {
          this.removeObserver('render', renderBackgroundAndBorder, this, this);
          ctx.render = null;
        } else {
          if (this.getObserverByAllParams('render', renderBackgroundAndBorder, this, this) === null) {
            this.addObserver('render', renderBackgroundAndBorder, this, this, LangUtil.getMinInteger());
          }
          if (ctx.render === null) {
            var rect = this.getRectInLocal();
            ctx.width = rect.width;
            ctx.height = rect.height;
            ctx.render = new CanvasRender({canvas: document.createElement('canvas'), width: ctx.width, height: ctx.height})
          }
        }
      }

      function syncBackgroundBorderRenderInvalid() {
        var ctx = this._backgroundBorderCacheCtx;
        ctx.renderInvalid = true;
      }
      
      function renderClipSave(sender, render, dirtyZones, global) {
        var ctx = this._backgroundBorderCacheCtx;
        var rect = this.getRectInLocal();
        if (ctx.clipRadius > 0) {
          renderRadiusPath(render, rect.left, rect.top, rect.right, rect.bottom, ctx.clipOffset, ctx.clipRadius);
        } else {
          renderRectPath(render, rect.left, rect.top, rect.right, rect.bottom, ctx.clipOffset);
        }
        render.clip();
      }

      function renderClipStore(sender, render, dirtyZones, global) {
        render.restore();
      }
      
      function renderBackgroundAndBorder(sender, render, dirtyZones, global) {
        var ctx = this._backgroundBorderCacheCtx;
        if (ctx.renderInvalid && ctx.render !== null) {
          renderBackgroundAndBorderCache.call(this, ctx.render);
          ctx.renderInvalid = false;
        }
        var rect = this.getRectInLocal();
        if (global) {
          render.drawImage(ctx.render.getCanvas(), rect.left, rect.top);
        } else {
          
        }
      }
      
      function renderBackgroundAndBorderCache(render) {
        var ctx = this._backgroundBorderCacheCtx;
        ctx.borderOffset = this.borderWidth / 2;
        ctx.borderRadius = this.borderRadius;
        ctx.backgroundOffset = ctx.borderOffset;
        ctx.backgroundRadius = this.borderRadius;
        ctx.clipOffset = this.borderWidth;
        ctx.clipRadius = this.borderRadius < ctx.borderOffset ? 0 : (this.borderRadius - ctx.borderOffset);
        var rect = this.getRectInLocal();
        if (ctx.renderWidth !== rect.width || ctx.renderHeight !== rect.height) {
          ctx.renderWidth = rect.width;
          ctx.renderHeight = rect.height;
          ctx.render.width = ctx.renderWidth;
          ctx.render.height = ctx.renderHeight;
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
        syncClipRender: syncClipRender,
        syncBackgroundBorderRender: syncBackgroundBorderRender,
        syncBackgroundBorderRenderInvalid: syncBackgroundBorderRenderInvalid
      }
    })();

    var UIView = (function () {
      var InnerUIView = LangUtil.extend(Node);

      InnerUIView.prototype.defVisible = true;
      InnerUIView.prototype.defEnableClip = false;
      InnerUIView.prototype.defBackgroundColor = null;
      InnerUIView.prototype.defBorderColor = null;
      InnerUIView.prototype.
      InnerUIView.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('enableClip', LangUtil.checkAndGet(conf.enableClip, this.defEnableClip));
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
          renderWidth: 0,
          renderHeight: 0,
          render: null
        };

        functions.syncClipRender.call(this);
        functions.syncBackgroundBorderRender.call(this);
        functions.syncBackgroundBorderRenderInvalid.call(this);

        this.addObserver('enableClipChanged', functions.syncClipRender, this, this);

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

    })();

    return UIView;
  }
)();
