/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/14
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';


export default (
  function () {
    var functions = {
      syncClipOrBackground: function () {
        if (this.clipable || this.backgroundColor != null) {
          if (this.getObserverByAllParams('render', functions.renderClipAndBackground, this, this) === null) {
            this.addObserver('render', functions.renderClipAndBackground, this, this, -Infinity);
          }
        } else {
          this.removeObserver('render', functions.renderClipAndBackground, this, this);
        }
      },
      syncBorder: function () {
        if (this.borderWidth !== 0 && this.borderColor !== null) {
          if (this.getObserverByAllParams('render', functions.renderBorder, this, this) === null) {
            this.addObserver('render', functions.renderBorder, this, this, Infinity);
          }
        } else {
          this.removeObserver('render', functions.renderBorder, this, this);
        }
      },
      syncBorderRadius: function () {
        this._clipBorderRadius = Math.ceil(this.borderRadius + this.borderWidth / 2);
        if (this._renderBorderRadius < 0) { this._renderBorderRadius = 0; }
      },
      renderClipAndBackground: function (sender, render) {
        var rect = this.getRectInSelf();
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
      },
      renderBorder: function (sender, render) {
        var rect = this.getRectInSelf();
        var left = rect.left;
        var right = rect.height;
        var top = rect.top;
        var bottom = rect.bottom;
        var radius = this.borderRadius;
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
    }

    var UINode = (function () {
      var InnerUINode = LangUtil.extend(Node);

      InnerUINode.prototype.defVisible = true;
      InnerUINode.prototype.defClipable = false;
      InnerUINode.prototype.defBackgroundColor = null;
      InnerUINode.prototype.defBorderColor = null;
      InnerUINode.prototype.defBorderWidth = 0;
      InnerUINode.prototype.defBorderRadius = 0;
      InnerUINode.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('clipable', LangUtil.checkAndGet(conf.clipable, this.defClipable));
        this.defineNotifyProperty('backgroundColor', LangUtil.checkAndGet(conf.backgroundColor, this.defBackgroundColor));
        this.defineNotifyProperty('borderColor', LangUtil.checkAndGet(conf.borderColor, this.defBorderColor));
        this.defineNotifyProperty('borderWidth', LangUtil.checkAndGet(conf.borderWidth, this.defBorderWidth));
        this.defineNotifyProperty('borderRadius', LangUtil.checkAndGet(conf.borderRadius, this.defBorderRadius));

        this._clipBorderRadius = 0;

        functions.syncClipOrBackground.call(this);
        functions.syncBorder.call(this);
        functions.syncBorderRadius.call(this);

        this.addObserver('clipableChanged', functions.syncClipOrBackground, this, this);
        this.addObserver('backgroundColorChanged', functions.syncClipOrBackground, this, this);
        this.addObserver('borderColorChanged', functions.syncBorder, this, this);
        this.addObserver('borderWidthChanged', functions.syncBorder, this, this);
        this.addObserver('borderRadiusChanged', functions.syncBorder, this, this);
        this.addObserver('borderWidthChanged', functions.syncBorderRadius, this, this);
        this.addObserver('borderRadiusChanged', functions.syncBorderRadius, this, this);

        this.addObserver('clipableChanged', this.refresh, this, this);
        this.addObserver('backgroundColorChanged', this.refresh, this, this);
        this.addObserver('borderColorChanged', this.refresh, this, this);
        this.addObserver('borderWidthChanged', this.refresh, this, this);
        this.addObserver('borderRadiusChanged', this.refresh, this, this);
      }

      return InnerUINode;
    })();

    return UINode;
  }
)();