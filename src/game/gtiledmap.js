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

    var GTiledMap = LangUtil.extend(GMap);

    GTiledMap.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.defineNotifyProperty('row', LangUtil.checkAndGet(conf.row, 50));
      this.defineNotifyProperty('col', LangUtil.checkAndGet(conf.col, 50));
      this.defineNotifyProperty('brush', LangUtil.checkAndGet(conf.brush, null));
      this.defineNotifyProperty('tileds', LangUtil.checkAndGet(conf.tileds, {}));

      this._mapRenderCache = {
        leftCol: -1,
        rightCol: -1,
        topRow: -1,
        bottomRow: -1,
        cacheInvalid: true,
        cacheInit: false,
        cacheFore: new CanvasRender({canvas: doc.createElement('canvas')}),
        cacheBack: new CanvasRender({canvas: doc.createElement('canvas')})
      };

      sync_renderCacheInvalid.call(this);
      sync_renderSize.call(this);

      this.addObserver('xChanged', sync_renderCacheInvalid, this, this);
      this.addObserver('widthChanged', sync_renderCacheInvalid, this, this);
      this.addObserver('containerLeftChanged', sync_renderCacheInvalid, this, this);
      this.addObserver('containerRightChanged', sync_renderCacheInvalid, this, this);
      this.addObserver('yChanged', sync_renderCacheInvalid, this, this);
      this.addObserver('heightChanged', sync_renderCacheInvalid, this, this);
      this.addObserver('containerTopChanged', sync_renderCacheInvalid, this, this);
      this.addObserver('containerBottomChanged', sync_renderCacheInvalid, this, this);
      this.addObserver('containerLeftChanged', this.refresh, this, this);
      this.addObserver('containerRightChanged', this.refresh, this, this);
      this.addObserver('containerTopChanged', this.refresh, this, this);
      this.addObserver('containerBottomChanged', this.refresh, this, this);
      this.addObserver('render', render_tiledMap, this, this);
    }

    GTiledMap.prototype.invalidRenderCache = function () {
      this._mapRenderCache.cacheInvalid = true;
      this._mapRenderCache.cacheInit = false;
      this.refresh();
    }
    
    function render_tiledMap(sender, render) {
      var mapCache = this._mapRenderCache;
      if (mapCache.cacheInvalid) {
        render_tiledMapCache.call(this);
        mapCache.cacheInvalid = false;
      }
      var rect = this.getRectInSelf();
      var left = rect.left < this.containerLeft ? this.containerLeft : rect.left;
      var top = rect.top < this.containerTop ? this.containerTop : rect.top;
      var width = (rect.right < this.containerRight ? rect.right : this.containerRight) - left;
      var height = (rect.bottom < this.containerBottom ? rect.bottom : this.containerBottom) - top;
      var x = left - mapCache.leftCol * this.gridWidth;
      var y = top - mapCache.topRow * this.gridHeight;
      if (width > 0 && height > 0) {
        render.drawImageExt(
          mapCache.cacheFore.getCanvas(), x, y, width, height, left, top, width, height
        );
      }
    }

    function render_tiledMapCache() {
      var rect = this.getRectInSelf();
      var left = rect.left < this.containerLeft ? this.containerLeft : rect.left;
      var top = rect.top < this.containerTop ? this.containerTop : rect.top;
      var right = rect.right < this.containerRight ? rect.right : this.containerRight;
      var bottom = rect.bottom < this.containerBottom ? rect.bottom : this.containerBottom;
      var gridWidth = this.gridWidth;
      var gridHeight = this.gridHeight;

      var leftCol = Math.floor(left / this.gridWidth);
      var rightCol = Math.ceil(right / this.gridWidth);
      var topRow = Math.floor(top / this.gridHeight);
      var bottomRow = Math.ceil(bottom / this.gridHeight);

      var mapRenderCache = this._mapRenderCache;
      if (mapRenderCache.cacheInit) {
        var cacheLeftCol = mapRenderCache.leftCol;
        var cacheRightCol = mapRenderCache.rightCol;
        var cacheTopRow = mapRenderCache.topRow;
        var cacheBottomRow = mapRenderCache.bottomRow;

        if (!(leftCol >= mapRenderCache.leftCol && rightCol <= mapRenderCache.rightCol
          && topRow >= mapRenderCache.topRow && bottomRow <= mapRenderCache.bottomRow)) {

          var backRender = mapRenderCache.cacheBack;
          var foreRender = mapRenderCache.cacheFore;

          var clipLeftCol = Math.max(cacheLeftCol, leftCol);
          var clipRightCol = Math.min(cacheRightCol, rightCol);
          var clipTopRow = Math.max(cacheTopRow, topRow);
          var clipBottomRow = Math.min(cacheBottomRow, bottomRow);

          backRender.width = (rightCol - leftCol + 1) * gridWidth;
          backRender.height = (bottomRow - topRow + 1) * gridHeight;

          var fileLoader = this.findApplication().getFileLoader();
          for (var i = topRow, tiledY = 0; i <= bottomRow; ++i, tiledY += gridHeight) {
            for (var j = leftCol, tiledX = 0; j <= rightCol; ++j, tiledX += gridHeight) {
              if (i < clipTopRow || i > clipBottomRow || j < clipLeftCol || j > clipRightCol) {
                var tileds = this.tileds[i+":"+j];
                if (tileds && tileds.length > 0) {
                  for (var m = 0, len = tileds.length; m < len; ++m) {
                    var tiled = tileds[m];
                    var image = fileLoader.loadImageAsync(
                      tiled.url,
                      fn_loadImageFinished,
                      this
                    );
                    if (image !== null) {
                      backRender.drawImageExt(
                        image, tiled.left, tiled.top, tiled.width, tiled.height, tiledX, tiledY, gridWidth, gridHeight
                      );
                    }
                  }
                }
              }
            }
          }
          if (clipLeftCol <= clipRightCol && clipTopRow <= clipBottomRow) {
            var clipX = (clipLeftCol - cacheLeftCol) * gridWidth;
            var clipY = (clipTopRow - cacheTopRow) * gridHeight;
            var clipWidth = (clipRightCol - clipLeftCol + 1) * gridWidth;
            var clipHeight = (clipBottomRow - clipTopRow + 1) * gridHeight;
            if (clipWidth > 0 && clipHeight > 0) {
              backRender.drawImageExt(
                foreRender.getCanvas(), clipX, clipY, clipWidth, clipHeight, (clipLeftCol - leftCol) * gridWidth, (clipTopRow - topRow) * gridHeight, clipWidth, clipHeight
              );
            }
          }
          foreRender.clear();
          mapRenderCache.cacheFore = backRender;
          mapRenderCache.cacheBack = foreRender;
          mapRenderCache.leftCol = leftCol;
          mapRenderCache.rightCol = rightCol;
          mapRenderCache.topRow = topRow;
          mapRenderCache.bottomRow = bottomRow;
        }
      } else {
        var foreRender = mapRenderCache.cacheFore;
        foreRender.width = (rightCol - leftCol + 1) * gridWidth;
        foreRender.height = (bottomRow - topRow + 1) * gridHeight;
        var fileLoader = this.findApplication().getFileLoader();
        for (var i = topRow, tiledY = 0; i <= bottomRow; ++i, tiledY += gridHeight) {
          for (var j = leftCol, tiledX = 0; j <= rightCol; ++j, tiledX += gridWidth) {
            var tileds = this.tileds[i + ":" + j];
            if (tileds && tileds.length > 0) {
              for (var m = 0, len = tileds.length; m < len; ++m) {
                var tiled = tileds[m];
                var image = fileLoader.loadImageAsync(
                  tiled.url,
                  fn_loadImageFinished,
                  this
                );
                if (image !== null) {
                  foreRender.drawImageExt(
                    image, tiled.left, tiled.top, tiled.width, tiled.height, tiledX, tiledY, gridWidth, gridHeight
                  );
                }
              }
            }
          }
        }
        mapRenderCache.cacheInit = true;
        mapRenderCache.leftCol = leftCol;
        mapRenderCache.rightCol = rightCol;
        mapRenderCache.topRow = topRow;
        mapRenderCache.bottomRow = bottomRow;
      }
    }
    
    function sync_renderCacheInvalid() {
      this._mapRenderCache.cacheInvalid = true;
    }
    
    function sync_renderSize() {
      this.width = this.gridWidth * this.col;
      this.height = this.gridHeight * this.row;
    }
    
    function fn_loadImageFinished() {
      this._mapRenderCache.cacheInvalid = true;
      this._mapRenderCache.cacheInit = false;
      this.refresh();
    }

    return GTiledMap;

  }
)();