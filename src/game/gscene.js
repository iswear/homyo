/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (
  function () {

    var GScene = LangUtil.extend(Node);

    GScene.prototype.init = function (conf) {
      this.super('init', [ conf ]);
      this.defineNotifyProperty('map', LangUtil.checkAndGet(conf.map, null));
      this.defineNotifyProperty('contentOffsetX', LangUtil.checkAndGet(conf.contentOffsetX, 0));
      this.defineNotifyProperty('contentOffsetY', LangUtil.checkAndGet(conf.contentOffsetY, 0));

      this._needUpdateMapContainerZone = true;

      sync_map.call(this);

      this.addObserver('mapChanged', sync_map, this, this);

      this.addObserver('widthChanged', sync_containerZone, this, this);
      this.addObserver('heightChanged', sync_containerZone, this, this);
      this.addObserver('anchorXChanged', sync_containerZone, this, this);
      this.addObserver('anchorYChanged', sync_containerZone, this, this);

      this.addObserver('render', render_clip, this, this, -Infinity);
    }
    
    function render_clip(sender, render) {
      var rect = this.getRectInSelf();
      render.rect(rect.left, rect.top, rect.width, rect.height);
      render.clip();
    }
    
    function render_updateMapContainerZone() {
      if (this._needUpdateMapContainerZone) {
        var map = this.map;
        if (map) {
          var rect = this.getRectInSelf();
          var leftTop = map.transformPVectorToL([rect.left, rect.top]);
          var leftBottom = map.transformPVectorToL([rect.left, rect.bottom]);
          var rightTop = map.transformPVectorToL([rect.right, rect.top]);
          var rightBottom = map.transformPVectorToL([rect.right, rect.bottom]);
          map.containerLeft = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
          map.containerRight = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
          map.containerTop = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);
          map.containerBottom = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);
          this._needUpdateMapContainerZone = false;
        }
      }
    }

    function sync_map(sender, val, oldVal) {
      if (oldVal) {
        this.removeChildNode(oldVal, true);
      }
      var map = this.map;
      if (map) {
        this.addChildNode(map);
        if (map.getObserverByAllParams('xChanged', sync_containerZone, this, map) === null) {
          map.addObserver('xChanged', sync_containerZone, this, map);
        }
        if (map.getObserverByAllParams('yChanged', sync_containerZone, this, map) === null) {
          map.addObserver('yChanged', sync_containerZone, this, map);
        }
        if (map.getObserverByAllParams('rotateZChanged', sync_containerZone, this, map) === null) {
          map.addObserver('rotateZChanged', sync_containerZone, this, map);
        }
        if (map.getObserverByAllParams('scaleXChanged', sync_containerZone, this, map) === null) {
          map.addObserver('scaleXChanged', sync_containerZone, this, map);
        }
        if (map.getObserverByAllParams('scaleYChanged', sync_containerZone, this, map) === null) {
          map.addObserver('scaleYChanged', sync_containerZone, this, map);
        }
        if (map.getObserverByAllParams('inclineX', sync_containerZone, this, map) === null) {
          map.addObserver('inclineX', sync_containerZone, this, map);
        }
        if (map.getObserverByAllParams('inclineY', sync_containerZone, this, map) === null) {
          map.addObserver('inclineY', sync_containerZone, this, map);
        }
        if (map.getObserverByAllParams('render', render_updateMapContainerZone, this, map) === null) {
          map.addObserver('render', render_updateMapContainerZone, this, map, -1);
        }
      }
    }

    function sync_containerZone(sender, val, oldVal) {
      this._needUpdateMapContainerZone = true;
    }

    return GScene;

  }
)();