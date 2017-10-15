/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/14
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';


export default (
  function () {

    var UINode = LangUtil.extend(Node);

    UINode.prototype.defVisible = true;
    UINode.prototype.defClipable = true;
    UINode.prototype.defBackgroundColor = null;
    UINode.prototype.defBorderColor = null;
    UINode.prototype.defBorderWidth = 0;
    UINode.prototype.defBorderRadius = 0;
    UINode.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.defineNotifyProperty('clipable', LangUtil.checkAndGet(conf.clipable, this.defClipable));
      this.defineNotifyProperty('backgroundColor', LangUtil.checkAndGet(conf.backgroundColor, this.defBackgroundColor));
      this.defineNotifyProperty('borderColor', LangUtil.checkAndGet(conf.borderColor, this.defBorderColor));
      this.defineNotifyProperty('borderWidth', LangUtil.checkAndGet(conf.borderWidth, this.defBorderWidth));
      this.defineNotifyProperty('borderRadius', LangUtil.checkAndGet(conf.borderRadius, this.defBorderRadius));

      this._clipBorderRadius = 0;

      sync_clipAndBackgroundRender.call(this);
      sync_borderRender.call(this);

      this.addObserver('clipableChanged', sync_clipAndBackgroundRender, this, this);
      this.addObserver('backgroundColorChanged', sync_clipAndBackgroundRender, this, this);
      this.addObserver('borderColorChanged', sync_borderRender, this, this);
      this.addObserver('borderWidthChanged', sync_borderRender, this, this);
      this.addObserver('borderRadiusChanged', sync_borderRender, this, this);

      this.addObserver('borderWidthChanged', sync_renderBorderRadius, this, this);
      this.addObserver('borderRadiusChanged', sync_renderBorderRadius, this, this);

      this.addObserver('clipableChanged', this.refresh, this, this);
      this.addObserver('backgroundColorChanged', this.refresh, this, this);
      this.addObserver('borderColorChanged', this.refresh, this, this);
      this.addObserver('borderWidthChanged', this.refresh, this, this);
      this.addObserver('borderRadiusChanged', this.refresh, this, this);
    }

    function render_clipAndbackgroundRender(sender, render) {
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
    }

    function render_border(sender, render) {
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
    
    function sync_clipAndBackgroundRender() {
      if (this.clipable || this.backgroundColor != null) {
        if (this.getObserverByAllParams('render', render_clipAndbackgroundRender, this, this) === null) {
          this.addObserver('render', render_clipAndbackgroundRender, this, this, -Infinity);
        }
      } else {
        this.removeObserver('render', render_clipAndbackgroundRender, this, this);
      }
    }

    function sync_borderRender() {
      if (this.borderWidth !== 0 && this.borderColor !== null) {
        if (this.getObserverByAllParams('render', render_border, this, this) === null) {
          this.addObserver('render', render_border, this, this, Infinity);
        }
      } else {
        this.removeObserver('render', render_border, this, this);
      }
    }

    function sync_renderBorderRadius() {
      this._clipBorderRadius = Math.ceil(this.borderRadius + this.borderWidth / 2);
      if (this._renderBorderRadius < 0) { this._renderBorderRadius = 0; }
    }

    return UINode;

  }
)();