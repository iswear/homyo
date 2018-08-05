/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */

import LangUtil from '../../utils/lang-util';
import Node from '../../core/node';

export default (
  function () {
    var functions = (function () {
      function syncMapX () {
        this._mapNode.x = this.mapX;
      }
      
      function syncMapY () {
        this._mapNode.y = this.mapY;
      }
      
      function syncMapWidth () {
        this._mapNode.width = this.mapWidth;
      }

      function syncMapHeight () {
        this._mapNode.height = this.mapHeight;
      }
      
      function syncMapAnchorX () {
        this._mapNode.anchorX = this.mapAnchorX;
      }
      
      function syncMapAnchorY () {
        this._mapNode.anchorY = this.mapAnchorY;
      }

      return {
        syncMapX: syncMapX,
        syncMapY: syncMapY,
        syncMapWidth: syncMapWidth,
        syncMapHeight: syncMapHeight,
        syncMapAnchorX: syncMapAnchorX,
        syncMapAnchorY: syncMapAnchorY
      };
    })();

    var GMap = (function () {
      var InnerGMap = LangUtil.extend(Node);

      InnerGMap.prototype.defWidth = 0;
      InnerGMap.prototype.defHeight = 0;
      InnerGMap.prototype.defAnchorX = 0.5;
      InnerGMap.prototype.defAnchorY = 0.5;
      InnerGMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('mapX', LangUtil.checkAndGet(conf.mapX, 0));
        this.defineNotifyProperty('mapY', LangUtil.checkAndGet(conf.mapY, 0));
        this.defineNotifyProperty('mapWidth', LangUtil.checkAndGet(conf.mapWidth, 0));
        this.defineNotifyProperty('mapHeight', LangUtil.checkAndGet(conf.mapHeight, 0));
        this.defineNotifyProperty('mapAnchorX', LangUtil.checkAndGet(conf.mapAnchorX, 0));
        this.defineNotifyProperty('mapAnchorY', LangUtil.checkAndGet(conf.mapAnchorY, 0));

        this._mapNode = new Node({});
        this.addChildNode(this._mapNode);

        functions.syncMapX.call(this);
        functions.syncMapY.call(this);
        functions.syncMapWidth.call(this);
        functions.syncMapHeight.call(this);
        functions.syncMapAnchorX.call(this);
        functions.syncMapAnchorY.call(this);

        this.addObserver('mapXChanged', this.refresh, this, this);
        this.addObserver('mapYChanged', this.refresh, this, this);
        this.addObserver('mapWidthChanged', this.refresh, this, this);
        this.addObserver('mapHeightChanged', this.refresh, this, this);
        this.addObserver('mapAnchorXChanged', this.refresh, this, this);
        this.addObserver('mapAnchorYChanged', this.refresh, this, this);

        this.addObserver('mapXChanged', functions.syncMapX, this, this);
        this.addObserver('mapYChanged', functions.syncMapY, this, this);
        this.addObserver('mapWidthChanged', functions.syncMapWidth, this, this);
        this.addObserver('mapHeightChanged', functions.syncMapHeight, this, this);
        this.addObserver('mapAnchorXChanged', functions.syncMapAnchorX, this, this);
        this.addObserver('mapAnchorYChanged', functions.syncMapAnchorY, this, this);
      }

      InnerGMap.prototype.getMapRectInLocal = function () {
        return this._mapNode.getRectInLocal();
      }

      InnerGMap.prototype.getMapRectInWorld = function () {
        return this._mapNode.getRectInWorld();
      }

      InnerGMap.prototype.addModel = function (model) {
        this._mapNode.addChildNode(model);
      }

      InnerGMap.prototype.removeModel = function (model, destroy) {
        this._mapNode.removeChildNode(model, destroy);
      }

      return InnerGMap;
    })();

    return GMap;
  }
)();