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
        var ctx = this._backgroundBorderCtx;
        if (this.backgroundColor === null && (this.borderColor === null || this.borderWidth <= 0)) {
          this.removeObserver('render', renderBackgroundAndBorder, this, this);
          ctx.render = null;
        } else {
          if (this.getObserverByAllParams('render', renderBackgroundAndBorder, this, this) === null) {
            this.addObserver('render', renderBackgroundAndBorder, this, this, LangUtil.getMinInteger());
          }
          if (ctx.render === null) {
            ctx.width = this.width;
            ctx.height = this.height;
            ctx.render = new CanvasRender({canvas: document.createElement('canvas'), width: ctx.width, height: ctx.height})
          }
        }
      }

      function syncBackgroundBorderRenderInvalid() {
        this.renderInvalid = true;
      }
      
      function renderClipSave(sender, render, dirtyZones) {

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
