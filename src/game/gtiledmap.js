/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */
import LangUtil from '../utils/lang-util';
import GMap from './gmap';
import CanvasRender from '../core/render/canvas/canvas-render';

export default (
  function () {
    var doc = document;

    var functions = (function () {
      function syncRenderCacheSize() {
        this._mapRenderCache.cacheFore.width = ;
        this._mapRenderCache.cacheFore.height = ;
      }

      return {
        syncRenderCacheSize: syncRenderCacheSize
      }
    })();
    
    var GTiledMap = (function () {
      var GInnerTiledMap = LangUtil.extend(GMap);

      GInnerTiledMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('tileWidth', LangUtil.checkAndGet(conf.tileWidth, 50));
        this.defineNotifyProperty('tileHeight', LangUtil.checkAndGet(conf.tileHeight, 50));
        this.defineNotifyProperty('tileInclineX', LangUtil.checkAndGet(conf.tileInclineX, 0));
        this.defineNotifyProperty('tileInclineY', LangUtil.checkAndGet(conf.tileInclineY, 0));

        this._mapRenderCache = {
          leftCol: -1,
          rightCol: -1,
          topRow: -1,
          bottomRow: -1,
          cacheInvalid: true,
          cacheInit: false,
          cacheFore: new CanvasRender({canvas: doc.createElement('canvas')}),
          cacheBack: new CanvasRender({canvas: doc.createElement('canvas')})
        }

        this.addObserver('tileWidthChanged', this.syncRenderCacheSize, this, this);
        this.addObserver('tileHeightChanged', this.syncRenderCacheSize, this, this);
        this.addObserver('tileInclineXChanged', this.syncRenderCacheSize, this, this);
        this.addObserver('tileInclineYChanged', this.syncRenderCacheSize, this, this);

        this.addObserver('containerLeftChanged', this.syncRenderCacheSize, this, this);
        this.addObserver('containerRightChanged', this.syncRenderCacheSize, this, this);
        this.addObserver('containerTopChanged', this.syncRenderCacheSize, this, this);
        this.addObserver('containerBottomChanged', this.syncRenderCacheSize, this, this);
      }

    })();

    return GTiledMap;
  }
)();