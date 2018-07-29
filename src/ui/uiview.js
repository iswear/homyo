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

      function syncBackgroundBorderPathCtx() {
        var rect = this.getRectInLocal();
        var ctx = this._backgroundBorderCtx;
        ctx.borderOffset = this.borderWidth / 2;
        ctx.borderRadius = this.borderRadius;
        ctx.backgroundOffset = this.borderOffset;
        ctx.backgroundRadius = this.borderRadius;
        ctx.clipOffset = this.borderWidth;
        ctx.clipRadius = this.borderRadius > ctx.borderOffset ? (this.borderRadius - ctx.borderOffset) : 0;
        if (rect.width !== ctx.renderWidth || rect.height !== ctx.renderHeight) {

        }
      }

      function syncBackgroundBorderCacheCtx() {

      }
      
      function syncBackgroundBorderCtx() {
        ctx.renderInvalid = true;
        if (this.backgroundColor === null && (this.borderColor === null || this.borderWidth <= 0)) {
          this.removeObserver('render', renderBackgroundAndBorder, this, this);
          ctx.render = null;
        } else {
          if (ctx === null) {
            if (this.getObserverByAllParams('render', renderBackgroundAndBorder, this, this) === null) {
              this.addObserver('render', renderBackgroundAndBorder, this, this, LangUtil.getMinInteger());
            }
            ctx.renderWidth =
            ctx.render = new
          }
        }



          if (this.getObserverByAllParams('render', renderBackgroundAndBorder, this, this) === null) {
            this.addObserver('render', renderBackgroundAndBorder, this, this, LangUtil.getMinInteger());
            ctx.render = null;
          }
        }

      }
      
      function renderClipSave() {

      }

      function renderClipStore() {

      }
      
      function renderBackgroundAndBorder() {

      }
      
      function renderBackgroundAndBorderCache() {

      }


      return {
        syncClipRender: syncClipRender,
        syncBackgroundBorderRender: syncBackgroundBorderRender,
        syncBackgroundBorderCtx: syncBackgroundBorderCtx
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

        this._backgroundBorderCtx = {
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

        this.addObserver('enableClipChanged', functions.syncClipRender, this, this);

        this.addObserver('widthChanged', functions.syncBackgroundBorderCtx, this, this);
        this.addObserver('heightChanged', functions.syncBackgroundBorderCtx, this, this);
        this.addObserver('backgroundColorChanged', functions.syncBackgroundBorderCtx, this, this);
        this.addObserver('borderWidthChanged', functions.syncBackgroundBorderCtx, this, this);
        this.addObserver('borderColorChanged', functions.syncBackgroundBorderCtx, this, this);
        this.addObserver('borderRadiusChanged',functions.syncBackgroundBorderCtx, this, this);
      }

    })();

    return UIView;
  }
)();
