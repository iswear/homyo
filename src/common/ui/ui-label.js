/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/16
 */
import LangUtil from '../utils/lang-util';
import TextUtil from '../utils/text-util';
import GeometryUtil from '../utils/geometry-util';
import UIView from './ui-view';
import CanvasRender from '../core/render/canvas/canvas-render';

export default (function () {
    var doc = document;

    var functions = (function () {
      function renderLabelText (sender, render, dirtyZones) {
        var renderCache = this._textCacheCtx;
        renderLabelTextFont.call(this);
        renderLabelTextLayout.call(this);
        renderLabelTextCache.call(this);
        
        var zone = this.getLocalZone();
        var width = zone.width;
        var height = zone.height;

        var contentWidth = width - this.borderWidth * 2;
        var contentHeight = height - this.borderWidth * 2;

        if (contentWidth > 0 && contentHeight > 0) {
          var left = zone.left;
          var top = zone.top;

          var cacheRender = renderCache.render;
          var cacheWidth = cacheRender.width;
          var cacheHeight = cacheRender.height;

          var desRect = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: cacheWidth,
            height: cacheHeight,
          };
          if (this.textHorAlign < 0) {
            desRect.left = left + this.borderWidth;
          } else if (this.textHorAlign > 0) {
            desRect.left = left + this.borderWidth + contentWidth - cacheWidth;
          } else {
            desRect.left = left + this.borderWidth + Math.ceil((contentWidth - cacheWidth) / 2);
          }
          desRect.right = desRect.left + cacheWidth;
          if (this.textVerAlign < 0) {
            desRect.top = top + this.borderWidth;
          } else if (this.textVerAlign > 0) {
            desRect.top = top + this.borderWidth + contentHeight - cacheHeight;
          } else {
            desRect.top = top + this.borderWidth + Math.ceil((contentHeight - cacheHeight) / 2);
          }
          desRect.bottom = desRect.top + cacheHeight;
          var offsetLeft = - desRect.left;
          var offsetTop = - desRect.top;
          var cacheCanvas = cacheRender.getCanvas();
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            var crossRect = GeometryUtil.getZoneCross(desRect, dirtyZone);
            if (crossRect !== null) {
              render.drawImageExt(cacheCanvas,
                crossRect.left + offsetLeft, crossRect.top + offsetTop, crossRect.width, crossRect.height,
                crossRect.left, crossRect.top, crossRect.width, crossRect.height);
            }
          }
        }
      }

      function renderLabelTextFont () {
        var renderCache = this._textCacheCtx;
        if (renderCache.fontInvalid) {
          renderCache._font = this.fontSize + 'px ' + this.fontFamily;
          renderCache.fontInvalid = false;
        }
      }

      function renderLabelTextLayout () {
        var renderCache = this._textCacheCtx;
        if (renderCache.layoutInvalid) {
          if (this.textLineNum !== 1) {
            var zone = this.getLocalZone();
            var borderWidth = (this.borderWidth > 0 && this.borderColor !== null) ? this.borderWidth : 0;
            renderCache.layout = TextUtil.getTextLayoutInfo(this.text, renderCache._font, zone.width - 2 * borderWidth);
          } else {
            renderCache.layout = TextUtil.getTextLayoutInfo(this.text, renderCache._font, -1);
          }
          renderCache.layoutInvalid = false;
        }
      }

      function renderLabelTextCache () {
        var renderCache = this._textCacheCtx;
        if (renderCache.renderInvalid) {
          var zone = this.getLocalZone();
          var layoutInfo = renderCache.layout;
          var lines = layoutInfo.lines;
          var lineHeight = LangUtil.checkAndGet(this.textLineHeight, 1.5 * this.fontSize);
          var lineNum = (this.textLineNum < 1 || this.textLineNum > lines.length) ? lines.length : this.textLineNum;
          var render = renderCache.render;
          var renderWidth = (lineNum === 1) ? layoutInfo.width : (zone.width - 2 * this.borderWidth);
          var renderHeight = lineHeight * lineNum + 1;
          if (render.width !== render.width || render.height !== renderHeight) {
            render.width = renderWidth;
            render.height = renderHeight;
          } else {
            render.clear();
          }
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
          render.font = this._textCacheCtx._font;
          render.fillStyle = this.textColor;
          for (var i = 0; i < lineNum; ++i) {
            render.fillText(lines[i], tx, ty);
            ty += lineHeight;
          }
          renderCache.renderInvalid = false;
        }
      }

      function onPropertyChanged (sender, name, newVal, oldVal) {
        if (onEventsMap.hasOwnProperty(name)) {
          onEventsMap[name].call(this, newVal, oldVal);
        }
      }

      function onTextChanged () {
        this.removeObserver('render', renderLabelText, this);
        if (this.text || this.text !== '') {
          this.addObserver('render', renderLabelText, this);
          var ctx = this._textCacheCtx;
          ctx.fontInvalid = true;
          ctx.layoutInvalid = true;
          ctx.renderInvalid = true;
          if (ctx.render === null) {
            ctx.render = new CanvasRender({
              canvas: doc.createElement('canvas'),
              width: this.width,
              height: this.height
            });
          }
        }
        this.dirty();
      }

      function onWidthChanged () {
        this._textCacheCtx.layoutInvalid = true;
        this._textCacheCtx.renderInvalid = true;
      }

      function onFontSizeChanged () {
        this._textCacheCtx.fontInvalid = true;
        this._textCacheCtx.layoutInvalid = true;
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }
      
      function onFontFamilyChanged () {
        this._textCacheCtx.fontInvalid = true;
        this._textCacheCtx.layoutInvalid = true;
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextColorChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextHorAlignChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextVerAlignChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextLineHeightChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextLineNumChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      var onEventsMap = {
        width: onWidthChanged,
        text: onTextChanged,
        fontSize: onFontSizeChanged,
        fontFamily: onFontFamilyChanged,
        textColor: onTextColorChanged,
        textHorAlign: onTextHorAlignChanged,
        textVerAlign: onTextVerAlignChanged,
        textLineHeight: onTextLineHeightChanged,
        textLineNum: onTextLineNumChanged
      }

      return {
        onPropertyChanged: onPropertyChanged
      }
    })();

    var UILabel = (function () {
      var InnerUILabel = LangUtil.extend(UIView);

      InnerUILabel.prototype.defFontSize = 13;
      InnerUILabel.prototype.defFontFamily = 'Helvetica, Roboto, Arial, sans-serif';
      InnerUILabel.prototype.defTextColor = '#000';
      InnerUILabel.prototype.defTextHorAlign = 0;
      InnerUILabel.prototype.defTextVerAlign = 0;
      InnerUILabel.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.text = LangUtil.checkAndGet(conf.text, '');
        this.fontSize = LangUtil.checkAndGet(conf.fontSize, this.defFontSize);
        this.fontFamily = LangUtil.checkAndGet(conf.fontFamily, this.defFontFamily);
        this.textColor = LangUtil.checkAndGet(conf.textColor, this.defTextColor);
        this.textHorAlign = LangUtil.checkAndGet(conf.textHorAlign, this.defTextHorAlign);
        this.textVerAlign = LangUtil.checkAndGet(conf.textVerAlign, this.defTextVerAlign);
        this.textLineHeight = LangUtil.checkAndGet(conf.textLineHeight, undefined);
        this.textLineNum = LangUtil.checkAndGet(conf.textLineNum, 1);

        this._textCacheCtx = {
          fontInvalid: true,
          font: '',
          layoutInvalid: true,
          layout: null,
          renderInvalid: true,
          render: null
        };

        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      return InnerUILabel;
    })();

    return UILabel;
  }
)();