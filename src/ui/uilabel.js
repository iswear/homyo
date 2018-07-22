/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/16
 */
import LangUtil from '../utils/lang-util';
import TextUtil from '../utils/text-util';
import UINode from './uiview';
import CanvasRender from '../core/render/canvas/canvas-render';

export default (
  function () {
    var doc = document;

    var functions = (function () {
      function syncFont () {
        this._font = this.fontSize + 'px ' + this.fontFamily;
      }

      function syncLabelText () {
        if (this.text !== null && this.text.length > 0) {
          if (this.getObserverByAllParams('render', render_labelText, this, this) === null) {
            this.addObserver('render', renderLabelText, this, this);
          }
        } else {
          this.removeObserver('render', renderLabelText, this, this);
        }
      }

      function refreshTextRenderLayout () {
        this._textCacheCtx.layoutInvalid = true;
      }

      function refreshTextRenderCache () {
        this._textCacheCtx.renderInvalid = true;
      }

      function renderLabelText (sender, render) {
        var rect = this.getRectInLocal();
        var left = rect.left;
        var top = rect.top;
        var width = rect.width;
        var height = rect.height;

        var renderCache = this._textCacheCtx;
        if (renderCache.layoutInvalid) {
          renderLabelTextLayout.call(this);
          renderCache.layoutInvalid = false;
        }
        if (renderCache.renderInvalid) {
          renderLabelTextCache.call(this);
          renderCache.renderInvalid = false;
        }
        var cacheRender = renderCache.render;
        var cacheWidth = cacheRender.width;
        var cacheHeight = cacheRender.height;

        var srcWidth, srcHeight;
        var borderWidth = (this.borderColor !== null && this.borderWidth > 0) ? this.borderWidth : 0;
        var desX = left + borderWidth;
        var desY = top + borderWidth;
        var textRenderWidth = width - borderWidth * 2;
        var textRenderHeight = height - borderWidth * 2;

        if (width > 0 && height > 0) {
          srcWidth = (cacheWidth < textRenderWidth) ? cacheWidth : textRenderWidth;
          srcHeight = (cacheHeight < textRenderHeight) ? cacheHeight : textRenderHeight;
          if (this.textHorAlign > 0) {
            desX += textRenderWidth - srcWidth;
          } else if (this.textHorAlign === 0) {
            desX += Math.ceil((textRenderWidth - srcWidth) / 2);
          }
          if (this.textVerAlign > 0) {
            desY += textRenderHeight - srcHeight;
          } else if (this.textVerAlign === 0) {
            desY += Math.ceil((textRenderHeight - srcHeight) / 2);
          }
          render.drawImageExt(cacheRender.getCanvas(), 0, 0, srcWidth, srcHeight, desX, desY, srcWidth, srcHeight);
        }
      }

      function renderLabelTextLayout () {
        var renderCache = this._textCacheCtx;
        if (this.textLineNum != 1) {
          var rect = this.getRectInLocal();
          var borderWidth = (this.borderWidth > 0 && this.borderColor !== null) ? this.borderWidth : 0;
          renderCache.layout = TextUtil.getTextLayoutInfo(this.text, this._font, rect.width - 2 * borderWidth);
        } else {
          renderCache.layout = {
            width: TextUtil.getTextLayoutWidth(this.text, this._font),
            lines: [this.text]
          };
        }
      }

      function renderLabelTextCache () {
        var rect = this.getRectInLocal();
        var renderCache = this._textCacheCtx;
        var layoutInfo = renderCache.layout;
        var lines = layoutInfo.lines;
        var lineHeight = LangUtil.checkAndGet(this.textLineHeight, 1.5 * this.fontSize);
        var lineNum = (this.textLineNum < 1 || this.textLineNum > lines.length) ? lines.length : this.textLineNum;
        var borderWidth = (this.borderWidth > 0 && this.borderColor !== null) ? this.borderWidth : 0;
        var render = renderCache.render;
        render.width = (lineNum === 1) ? layoutInfo.width : (rect.width - 2 * borderWidth);
        render.height = lineHeight * lineNum + 1;
        render.clear();
        render.textBaseline = 'middle';
        var tx = 0, ty = lineHeight / 2;
        if (this.textHorAlign < 0) {
          tx = 0;
          render.textAlign = 'left';
        } else if (this.textHorAlign > 0) {
          tx = render.width;
          render.textAlign = 'right';
        } else {
          tx = render.width / 2;
          render.textAlign = 'center';
        }
        render.font = this._font;
        render.fillStyle = this.textColor;
        for (var i = 0; i < lineNum; ++i) {
          render.fillText(lines[i], tx, ty);
          ty += lineHeight;
        }
      }

      return {
        syncFont: syncFont,
        syncLabelText: syncLabelText,
        refreshTextRenderLayout: refreshTextRenderLayout,
        refreshTextRenderCache: refreshTextRenderCache
      }
    })();

    var UILabel = (function () {
      var InnerUILabel = LangUtil.extend(UINode);

      InnerUILabel.prototype.defFontSize = 13;
      InnerUILabel.prototype.defFontFamily = 'Helvetica, Roboto, Arial, sans-serif';
      InnerUILabel.prototype.defTextColor = '#000';
      InnerUILabel.prototype.defTextHorAlign = 0;
      InnerUILabel.prototype.defTextVerAlign = 0;
      InnerUILabel.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('text', LangUtil.checkAndGet(conf.text, ''));
        this.defineNotifyProperty('fontSize', LangUtil.checkAndGet(conf.fontSize, this.defFontSize));
        this.defineNotifyProperty('fontFamily', LangUtil.checkAndGet(conf.fontFamily, this.defFontFamily));
        this.defineNotifyProperty('textColor', LangUtil.checkAndGet(conf.textColor, this.defTextColor));
        this.defineNotifyProperty('textHorAlign', LangUtil.checkAndGet(conf.textHorAlign, this.defTextHorAlign));
        this.defineNotifyProperty('textVerAlign', LangUtil.checkAndGet(conf.textVerAlign, this.defTextVerAlign));
        this.defineNotifyProperty('textLineHeight', LangUtil.checkAndGet(conf.textLineHeight, undefined));
        this.defineNotifyProperty('textLineNum', LangUtil.checkAndGet(conf.textLineNum, 1));
        this.defineNotifyProperty('textRichInfo', LangUtil.checkAndGet(conf.textRichInfo, null));

        this._font = '';
        this._textCacheCtx = {
          layoutInvalid: true,
          layout: null,
          renderInvalid: true,
          render: new CanvasRender({canvas:doc.createElement('canvas')})
        };

        functions.syncFont.call(this);
        functions.syncLabelText.call(this);

        this.addObserver('textChanged', this.refresh, this, this);
        this.addObserver('fontSizeChanged', this.refresh, this, this);
        this.addObserver('fontFamilyChanged', this.refresh, this, this);
        this.addObserver('textColor', this.refresh, this, this);
        this.addObserver('textHorAlignChanged', this.refresh, this, this);
        this.addObserver('textVerAlignChanged', this.refresh, this, this);
        this.addObserver('textLineHeightChanged', this.refresh, this, this);
        this.addObserver('textLineNumChanged', this.refresh, this, this);
        this.addObserver('textRichInfo', this.refresh, this, this);

        this.addObserver('fontSizeChanged', functions.syncFont, this, this);
        this.addObserver('fontFamilyChanged', functions.syncFont, this, this);


        this.addObserver('widthChanged', functions.refreshTextRenderCache, this, this);
        this.addObserver('textChanged', functions.refreshTextRenderCache, this, this);
        this.addObserver('fontSizeChanged', functions.refreshTextRenderCache, this, this);
        this.addObserver('fontFamilyChanged', functions.refreshTextRenderCache, this, this);
        this.addObserver('textColorChanged', functions.refreshTextRenderCache, this, this);
        this.addObserver('textHorAlignChanged', functions.refreshTextRenderCache, this, this);
        this.addObserver('textLineHeightChanged', functions.refreshTextRenderCache, this, this);
        this.addObserver('textLineNumChanged', functions.refreshTextRenderCache, this, this);
        this.addObserver('textRichInfoChanged', functions.refreshTextRenderCache, this, this);

        this.addObserver('widthChanged', functions.refreshTextRenderLayout, this, this);
        this.addObserver('textChanged', functions.refreshTextRenderLayout, this, this);
        this.addObserver('fontSizeChanged', functions.refreshTextRenderLayout, this, this);

        this.addObserver('textChanged', functions.syncLabelText, this, this);
      }

      return InnerUILabel;
    })();

    return UILabel;
  }
)();