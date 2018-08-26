/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */

import LangUtil from '../../utils/lang-util';
import Node from '../../core/node';
import CanvasRender from "../../core/render/canvas/canvas-render";

export default (
  function () {
    var functions = (function () {
      function syncMapNodeContext () {
        var mapNode = this._mapNode;
        this.removeObserver('mapXChanged', syncMapX, this, this);
        this.removeObserver('mapYChanged', syncMapX, this, this);
        this.removeObserver('anchorXChanged', syncMapAnchorX, this, this);
        this.removeObserver('anchorYChanged', syncMapAnchorY, this, this);
        this.removeObserver('mapTileWidthChanged', syncMapWidth, this, this);
        this.removeObserver('mapTileRowsChanged', syncMapWidth, this, this);
        this.removeObserver('mapTileColsChanged', syncMapWidth, this, this);
        this.removeObserver('mapTileHeightChanged', syncMapHeight, this, this);
        this.removeObserver('mapTileRowsChanged', syncMapHeight, this, this);
        this.removeObserver('mapTileColsChanged', syncMapHeight, this, this);
        mapNode.removeObserver('frame', syncMapNodeX, this, this);
        mapNode.removeObserver('frame', syncMapNodeY, this, this);
        mapNode.removeObserver('frame', syncMapNodeAnchorX, this, this);
        mapNode.removeObserver('frame', syncMapNodeAnchorY, this, this);
        mapNode.removeObserver('frame', syncMapNodeWidthSquare, this, this);
        mapNode.removeObserver('frame', syncMapNodeWidthDiamond, this, this);
        mapNode.removeObserver('frame', syncMapNodeHeightSquare, this, this);
        mapNode.removeObserver('frame', syncMapNodeHeightDiamond, this, this);
        if (this.mapTileType === 'square') {
          this.addObserver('mapXChanged', syncMapX, this, this);
          this.addObserver('mapYChanged', syncMapY, this, this);
          this.addObserver('anchorXChanged', syncMapAnchorX, this, this);
          this.addObserver('anchorYChanged', syncMapAnchorY, this, this);
          this.addObserver('mapTileWidthChanged', syncMapWidth, this, this);
          this.addObserver('mapTileColsChanged', syncMapWidth, this, this);
          this.addObserver('mapTileHeightChanged', syncMapHeight, this, this);
          this.addObserver('mapTileRowsChanged', syncMapHeight, this, this);
          mapNode.addObserver('frame', syncMapNodeX, this, this);
          mapNode.addObserver('frame', syncMapNodeY, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorX, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorY, this, this);
          mapNode.addObserver('frame', syncMapNodeWidthSquare, this, this);
          mapNode.addObserver('frame', syncMapNodeHeightSquare, this, this);
        } else if (this.mapTileType === 'diamond') {
          this.addObserver('mapXChanged', syncMapX, this, this);
          this.addObserver('mapYChanged', syncMapY, this, this);
          this.addObserver('anchorXChanged', syncMapAnchorX, this, this);
          this.addObserver('anchorYChanged', syncMapAnchorY, this, this);
          this.addObserver('mapTileWidthChanged', syncMapWidth, this, this);
          this.addObserver('mapTileRowsChanged', syncMapWidth, this, this);
          this.addObserver('mapTileColsChanged', syncMapWidth, this, this);
          this.addObserver('mapTileHeightChanged', syncMapHeight, this, this);
          this.addObserver('mapTileRowsChanged', syncMapHeight, this, this);
          this.addObserver('mapTileColsChanged', syncMapHeight, this, this);
          mapNode.addObserver('frame', syncMapNodeX, this, this);
          mapNode.addObserver('frame', syncMapNodeY, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorX, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorY, this, this);
          mapNode.addObserver('frame', syncMapNodeWidthDiamond, this, this);
          mapNode.addObserver('frame', syncMapNodeHeightDiamond, this, this);
        }
      }

      function syncMapBackgroundRender () {
        
      }

      function syncMapTilesRender () {
        
      }

      function syncMapNodeX () {
        if (this._mapCacheCtx.mapXInvalid) {
          this._mapNode.x = this.mapX;
          this._mapCacheCtx.mapXInvalid = false;
        }
      }

      function syncMapNodeY () {
        if (this._mapCacheCtx.mapYInvalid) {
          this._mapNode.y = this.mapY;
          this._mapCacheCtx.mapYInvalid = false;
        }
      }

      function syncMapNodeAnchorX () {
        if (this._mapCacheCtx.mapAnchorXInvalid) {
          this._mapNode.anchorX = this.anchorX;
          this._mapCacheCtx.mapAnchorXInvalid = false;
        }
      }

      function syncMapNodeAnchorY () {
        if (this._mapCacheCtx.mapAnchorYInvalid) {
          this._mapNode.anchorY = this.anchorY;
          this._mapCacheCtx.mapAnchorYInvalid = false;
        }
      }

      function syncMapNodeWidthSquare () {
        if (this._mapCacheCtx.mapWidthInvalid) {
          this._mapNode.width = this.mapTileWidth * this.mapTileCols;
          this._mapCacheCtx.mapWidthInvalid = false;
        }
      }

      function syncMapNodeWidthDiamond () {
        if (this._mapCacheCtx.mapWidthInvalid) {
          this._mapNode.width = (this.mapTileRows + this.mapTileCols) * this.mapTileWidth / 2;
          this._mapCacheCtx.mapWidthInvalid = false;
        }
      }

      function syncMapNodeHeightSquare () {
        if (this._mapCacheCtx.mapHeightInvalid) {
          this._mapNode.height = this.mapTileHeight * this.mapTileRows;
          this._mapCacheCtx.mapHeightInvalid = false;
        }
      }

      function syncMapNodeHeightDiamond () {
        if (this._mapCacheCtx.mapHeightInvalid) {
          this._mapNode.height = (this.mapTileRows + this.mapTileCols) * this.mapTileHeight / 2;
          this._mapCacheCtx.mapHeightInvalid = false;
        }
      }

      function syncMapX () {
        this._mapCacheCtx.mapXInvalid = true;
      }
      
      function syncMapY () {
        this._mapCacheCtx.mapYInvalid = true;
      }

      function syncMapWidth () {
        this._mapCacheCtx.mapWidthInvalid = true;
      }

      function syncMapHeight () {
        this._mapCacheCtx.mapHeightInvalid = true;
      }

      function syncMapAnchorX () {
        this._mapCacheCtx.mapAnchorXInvalid = true;
      }
      
      function syncMapAnchorY () {
        this._mapCacheCtx.mapAnchorYInvalid = true;
      }

      return {
        syncMapNodeContext: syncMapNodeContext,
      };
    })();

    var GMap = (function () {
      var InnerGMap = LangUtil.extend(Node);

      InnerGMap.prototype.defWidth = 0;
      InnerGMap.prototype.defHeight = 0;
      InnerGMap.prototype.defAnchorX = 0.5;
      InnerGMap.prototype.defAnchorY = 0.5;
      InnerGMap.prototype.defMapTileType = 'square';
      InnerGMap.prototype.defMapTileWidth = 50;
      InnerGMap.prototype.defMapTileHeight = 50;
      InnerGMap.prototype.defMapTileRows = 40;
      InnerGMap.prototype.defMapTileCols = 30;
      InnerGMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('mapX', LangUtil.checkAndGet(conf.mapX, 0));
        this.defineNotifyProperty('mapY', LangUtil.checkAndGet(conf.mapY, 0));
        this.defineNotifyProperty('mapBackgroundImage', LangUtil.checkAndGet(conf.mapBackgroundImage, null));
        this.defineNotifyProperty('mapTileType', LangUtil.checkAndGet(conf.mapTileType, this.defMapTileType));
        this.defineNotifyProperty('mapTileWidth', LangUtil.checkAndGet(conf.mapTileWidth, this.defMapTileWidth));
        this.defineNotifyProperty('mapTileHeight', LangUtil.checkAndGet(conf.mapTileHeight, this.defMapTileHeight));
        this.defineNotifyProperty('mapTileImageIndex', LangUtil.checkAndGet(conf.mapTileImageIndex, {}));
        this.defineNotifyProperty('mapTileImageClipIndex', LangUtil.checkAndGet(conf.mapTileImageClipIndex, {}));
        this.defineNotifyProperty('mapTileRows', LangUtil.checkAndGet(conf.mapTileRows, this.defMapTileRows));
        this.defineNotifyProperty('mapTileCols', LangUtil.checkAndGet(conf.mapTileCols, this.defMapTileCols));
        this.defineNotifyProperty('mapTileData', LangUtil.checkAndGet(conf.mapTileData, []));

        this._mapNode = new Node({});
        this.addChildNode(this._mapNode);

        this._mapCacheCtx = {
          mapXInvalid: true,
          mapYInvalid: true,
          mapWidthInvalid: true,
          mapHeightInvalid: true,
          mapAnchorXInvalid: true,
          mapAnchorYInvalid: true,
          offsetInvalid: true,
          x: 0,
          y: 0,
          sizeInvalid: true,
          width: 0,
          height: 0,
          foreInvalid: true,
          foreRender: new CanvasRender({canvas: doc.createElement('canvas')}),
          backInvalid: true,
          backRender: new CanvasRender({canvas: doc.createElement('canvas')})
        };

        functions.syncMapNodeContext.call(this);

        this.addObserver('mapTileTypeChanged', functions.syncMapNodeContext, this, this);
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