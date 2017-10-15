/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */

import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (
  function () {

    var GMap = LangUtil.extend(Node);

    GMap.prototype.defGridVisible = true;
    GMap.prototype.defGridColor = '#000';
    GMap.prototype.defGridWidth = 50;
    GMap.prototype.defGridHeight = 50;
    GMap.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.defineNotifyProperty('gridVisible', LangUtil.checkAndGet(conf.gridVisible, this.defGridVisible));
      this.defineNotifyProperty('gridColor', LangUtil.checkAndGet(conf.gridColor, this.defGridColor));
      this.defineNotifyProperty('gridWidth', LangUtil.checkAndGet(conf.gridWidth, this.defGridWidth));
      this.defineNotifyProperty('gridHeight', LangUtil.checkAndGet(conf.gridHeight, this.defGridHeight));
      this.defineNotifyProperty('containerLeft', LangUtil.checkAndGet(conf.containerLeft, -Infinity));
      this.defineNotifyProperty('containerRight', LangUtil.checkAndGet(conf.containerRight, -Infinity));
      this.defineNotifyProperty('containerTop', LangUtil.checkAndGet(conf.containerTop, Infinity));
      this.defineNotifyProperty('containerBottom', LangUtil.checkAndGet(conf.containerBottom, Infinity));

      sync_gridRender.call(this);

      this.addObserver('gridVisibleChanged', this.refresh, this, this);
      this.addObserver('gridColorChanged', this.refresh, this, this);
      this.addObserver('gridWidthChanged', this.refresh, this, this);
      this.addObserver('gridHeightChanged', this.refresh, this, this);
      this.addObserver('gridVisibleChanged', sync_gridRender, this, this);
    }

    function render_grid(sender, render) {
      var rect = this.getRectInSelf();
      var left = rect.left;
      var top = rect.top;
      var right = rect.right;
      var bottom = rect.bottom;
      left = left < this.containerLeft ? this.containerLeft : left;
      right = (right < this.containerRight ? right : this.containerRight);
      top = top < this.containerTop ? this.containerTop : top;
      bottom = (bottom < this.containerBottom ? bottom : this.containerBottom);

      var gridWidth = this.gridWidth;
      var gridHeight = this.gridHeight;
      var x = Math.floor(left / gridWidth + 1) * gridWidth + 0.5, y = Math.floor(top / gridHeight + 1) * gridHeight + 0.5;
      render.beginPath();
      for (; x < right; x += gridWidth) {
        render.moveTo(x, top);
        render.lineTo(x, bottom);
      }
      for (; y < bottom; y += gridHeight) {
        render.moveTo(left, y);
        render.lineTo(right, y);
      }
      render.strokeStyle = this.gridColor;
      render.stroke();
    }

    function sync_gridRender() {
      if (this.gridVisible) {
        if (this.getObserverByAllParams('render', render_grid, this, this) === null) {
          this.addObserver('render', render_grid, this, this, 1);
        }
      } else {
        this.removeObserver('render', render_grid, this, this);
      }
    }

    return GMap;

  }
)();