/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */
import LangUtil from '../../utils/lang-util';
import GMap from './g-map';
import CanvasRender from '../../core/render/canvas/canvas-render';

export default (
  function () {
    var doc = document;
    
    var functions = (function () {
      function syncMapRender () {
        this.removeObserver('render', renderSquareMap, this, this);
        this.removeObserver('render', renderDiamondMap, this, this);
        if (this.tileType === 'square') {
          this.addObserver('render', renderSquareMap, this, this);
        } else if (this.tileType === 'diamond') {
          this.addObserver('render', renderDiamondMap, this, this);
        }
      }
      
      function syncOffsetInvalid () {
        this._tileCacheCtx.offsetInvalid = true;
      }
      
      function syncSizeInvalid () {
        this._tileCacheCtx.sizeInvalid = true;
      }

      function syncForeInvalid () {
        this._tileCacheCtx.foreInvalid = true;
      }

      function syncBackInvalid () {
        this._tileCacheCtx.backInvalid = true;
      }
      
      function renderSquareMap (sender, render, dirtyZones) {
        var ctx = this._tileCacheCtx;
        if (ctx.offsetInvalid) {

        }
        if (ctx.sizeInvalid) {

        }
        if (ctx.foreInvalid) {
          renderSquareMapCache.call(this, ctx);
          ctx.foreInvalid = false;
        }
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {

        }
      }
      
      function renderDiamondMap (sender, render, dirtyZones) {
        var ctx = this._tileCacheCtx;
        if (ctx.foreInvalid) {
          renderDiamondMapCache.call(this, ctx);
        }
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {

        }
      }
      
      function renderSquareMapCache (ctx) {

      }
      
      function renderDiamondMapCache () {
        
      }

      return {
        syncMapRender: syncMapRender
      };
    })();

    var GTiledMap = (function () {
      var InnerGTiledMap = LangUtil.extend(GMap);

      InnerGTiledMap.prototype.defaultTileType = 'square';
      InnerGTiledMap.prototype.defaultTileWidth = 50;
      InnerGTiledMap.prototype.defaultTileHeight = 50;
      InnerGTiledMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('tileType', LangUtil.checkAndGet(conf.tileType, this.defaultTileType));
        this.defineNotifyProperty('tileWidth', LangUtil.checkAndGet(conf.tileWidth, this.defaultTileWidth));
        this.defineNotifyProperty('tileHeight', LangUtil.checkAndGet(conf.tileHeight, this.defaultTileHeight));
        this.defineNotifyProperty('tileImage', LangUtil.checkAndGet(conf.tileImage, {}));
        this.defineNotifyProperty('tileImageClip', LangUtil.checkAndGet(conf.tileImageClip, {}));
        this.defineNotifyProperty('tileData', LangUtil.checkAndGet(conf.tileData, {}));

        this._tileCacheCtx = {
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
      }

      return InnerGTiledMap;
    })();

    return GTiledMap;
  }
)();
