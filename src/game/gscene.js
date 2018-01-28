/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (
  function () {
    var functions = {
      syncMap: function (sender, newVal, oldVal) {
        if (oldVal) {
          this.removeChildNode(oldVal, true);
        }
        var map = this.map;
        if (map) {
          this.addChildNode(map, 0);
          if (map.getObserverByAllParams('xChanged', functions.syncContainerZone, this, map) === null) {
            map.addObserver('xChanged', functions.syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('yChanged', functions.syncContainerZone, this, map) === null) {
            map.addObserver('yChanged', functions.syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('rotateZChanged', functions.syncContainerZone, this, map) === null) {
            map.addObserver('rotateZChanged', functions.syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('scaleXChanged', functions.syncContainerZone, this, map) === null) {
            map.addObserver('scaleXChanged', functions.syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('scaleYChanged', functions.syncContainerZone, this, map) === null) {
            map.addObserver('scaleYChanged', functions.syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('inclineX', functions.syncContainerZone, this, map) === null) {
            map.addObserver('inclineX', functions.syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('inclineY', functions.syncContainerZone, this, map) === null) {
            map.addObserver('inclineY', functions.syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('render', functions.syncContainerZoneListener, this, map) === null) {
            map.addObserver('render', functions.syncContainerZoneListener, this, map, -1);
          }
        }
      },
      syncContainerZone: function (sender) {
        this._needUpdateMapContainerZone = true;
      },
      syncContainerZoneListener: function () {
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
    };


    var GScene = (function () {
      var InnerGScene = LangUtil.extend(Node);

      InnerGScene.prototype.defLayer = 1;
      InnerGScene.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.defineNotifyProperty('map', LangUtil.checkAndGet(conf.map, null));
        this.defineNotifyProperty('contentOffsetX', LangUtil.checkAndGet(conf.contentOffsetX, 0));
        this.defineNotifyProperty('contentOffsetY', LangUtil.checkAndGet(conf.contentOffsetY, 0));

        this._needUpdateMapContainerZone = true;

        functions.syncMap.call(this);

        this.addObserver('mapChanged', functions.syncMap, this, this);

        this.addObserver('widthChanged', functions.syncContainerZone, this, this);
        this.addObserver('heightChanged', functions.syncContainerZone, this, this);
        this.addObserver('anchorXChanged', functions.syncContainerZone, this, this);
        this.addObserver('anchorYChanged', functions.syncContainerZone, this, this);
      }

      return InnerGScene;
    })();

    return GScene;
  }
)();