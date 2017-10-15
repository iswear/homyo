/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/16
 */
import LangUtil from '../utils/lang-util';
import TextUtil from '../utils/text-util';
import UINode from './uinode';
import CanvasRender from '../core/render/canvas/canvas-render';


export default (
  function () {

    var doc = document;

    var UILabel = LangUtil.extend(UINode);

    UILabel.prototype.defFontSize = 13;
    UILabel.prototype.defFontFamily = 'Helvetica, Roboto, Arial, sans-serif';
    UILabel.prototype.defTextColor = '#000';
    UILabel.prototype.defTextHorAlign = 0;
    UILabel.prototype.defTextVerAlign = 0;
    UILabel.prototype.init = function (conf) {
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
      this._textRenderCache = {
        layoutInvalid: true,
        layout: null,
        cacheInvalid: true,
        cache: new CanvasRender({canvas:doc.createElement('canvas')})
      };

      sync_font.call(this);
      sync_textRenderLayout.call(this);
      sync_textRenderCache.call(this);
      sync_labelTextRender.call(this);


      this.addObserver('textChanged', this.refresh, this, this);
      this.addObserver('fontSizeChanged', this.refresh, this, this);
      this.addObserver('fontFamilyChanged', this.refresh, this, this);
      this.addObserver('textColor', this.refresh, this, this);
      this.addObserver('textHorAlignChanged', this.refresh, this, this);
      this.addObserver('textVerAlignChanged', this.refresh, this, this);
      this.addObserver('textLineHeightChanged', this.refresh, this, this);
      this.addObserver('textLineNumChanged', this.refresh, this, this);
      this.addObserver('textRichInfo', this.refresh, this, this);

      this.addObserver('fontSizeChanged', sync_font, this, this);
      this.addObserver('fontFamilyChanged', sync_font, this, this);


      this.addObserver('widthChanged', sync_textRenderCache, this, this);
      this.addObserver('textChanged', sync_textRenderCache, this, this);
      this.addObserver('fontSizeChanged', sync_textRenderCache, this, this);
      this.addObserver('fontFamilyChanged', sync_textRenderCache, this, this);
      this.addObserver('textColorChanged', sync_textRenderCache, this, this);
      this.addObserver('textHorAlignChanged', sync_textRenderCache, this, this);
      this.addObserver('textLineHeightChanged', sync_textRenderCache, this, this);
      this.addObserver('textLineNumChanged', sync_textRenderCache, this, this);
      this.addObserver('textRichInfoChanged', sync_textRenderCache, this, this);
      this.addObserver('textChanged', sync_labelTextRender, this, this);
    }
    
    function render_labelText(sender, render) {
      var rect = this.getRectInSelf();
      var left = rect.left;
      var top = rect.top;
      var width = rect.width;
      var height = rect.height;

      var renderCache = this._textRenderCache;
      if (renderCache.layoutInvalid) {
        render_labelTextLayout.call(this);
        renderCache.layoutInvalid = false;
      }
      if (renderCache.cacheInvalid) {
        render_labelTextCacheRender.call(this);
        renderCache.cacheInvalid = false;
      }
      var cacheRender = renderCache.cache;
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
    
    function render_labelTextLayout() {
      var renderCache = this._textRenderCache;
      if (this.textLineNum != 1) {
        var rect = this.getRectInSelf();
        var borderWidth = (this.borderWidth > 0 && this.borderColor !== null) ? this.borderWidth : 0;
        renderCache.layout = TextUtil.getTextLayoutInfo(this.text, this._font, rect.width - 2 * borderWidth);
      } else {
        renderCache.layout = {
          width: TextUtil.getTextLayoutWidth(this.text, this._font),
          lines: [this.text]
        };
      }
    }
    
    function render_labelTextCacheRender() {
      var rect = this.getRectInSelf();
      var renderCache = this._textRenderCache;
      var layoutInfo = renderCache.layout;
      var lines = layoutInfo.lines;
      var lineHeight = LangUtil.checkAndGet(this.textLineHeight, 1.5 * this.fontSize);
      var lineNum = (this.textLineNum < 1 || this.textLineNum > lines.length) ? lines.length : this.textLineNum;
      var borderWidth = (this.borderWidth > 0 && this.borderColor !== null) ? this.borderWidth : 0;
      var render = renderCache.cache;
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
    
    function sync_font() {
      this._font = this.fontSize + 'px ' + this.fontFamily;
    }

    function sync_textRenderLayout() {
      this._textRenderCache.layoutInvalid = true;
    }

    function sync_textRenderCache() {
      this._textRenderCache.cacheInvalid = true;
    }

    function sync_labelTextRender() {
      if (this.text !== null && this.text.length > 0) {
        if (this.getObserverByAllParams('render', render_labelText, this, this) === null) {
          this.addObserver('render', render_labelText, this, this);
        }
      } else {
        this.removeObserver('render', render_labelText, this, this);
      }
    }


    return UILabel;

  }
)();