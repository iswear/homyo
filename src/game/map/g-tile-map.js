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
        if (ctx.foreInvalid) {
          renderSquareMapCache.call(this);
          ctx.foreInvalid = false;
        }
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {

        }
      }
      
      function renderDiamondMap (sender, render, dirtyZones) {
        var ctx = this._tileCacheCtx;
        if (ctx.offsetInvalid) {

          ctx.offsetInvalid = false;
        }
        if (ctx.sizeInvalid) {

          ctx.sizeInvalid = false;
        }
        if (ctx.foreInvalid) {
          renderDiamondMapCache.call(this);
          ctx.foreInvalid = false;
        }
        var offsetLeft, offsetTop;
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {

        }
      }
      
      function renderSquareMapCache (ctx) {
        var rect = this.getRectInLocal();
        var mapRect = this.getMapRectInLocal();
        var tileWidth = this.tileWidth;
        var tileHeight = this.tileHeight;
        var stepRow = tileHeight;
        var stepCol = tileWidth;
        var oldX = ctx.x;
        var oldY = ctx.y;
        var oldWidth = ctx.width;
        var oldHeight = ctx.height;
        var newX = oldX;
        var newY = oldY;
        var newWidth = oldWidth;
        var newHeight = oldHeight;

        if (ctx.offsetInvalid) {
          newX = Math.floor((rect.left - mapRect.left) / tileWidth) * tileWidth;
          newY = Math.floor((rect.top - mapRect.top) / tileHeight) * tileHeight;
          ctx.x = newX;
          ctx.y = newY;
          ctx.offsetInvalid = false;
        }
        if (ctx.sizeInvalid) {
          newWidth = Math.ceil(this.width / tileWidth) * tileWidth;
          newHeight = Math.ceil(this.height / tileHeight) * tileHeight;
          ctx.width = newWidth;
          ctx.height = newHeight;
          ctx.sizeInvalid = false;
        }

        var tileData = this.tileData;
        if (LangUtil.isNotArray(tileData)) {
          return;
        }

        var sRow = newX / tileWidth;
        var sCol = newY / tileHeight;

        if (ctx.backInvalid) {
          var loader = this.findApplication().getFileLoader();
          var foreRender = ctx.foreRender;
          if (newWidth !== oldWidth || newHeight !== oldHeight) {
            foreRender.width = newWidth;
            foreRender.height = newHeight;
          }

          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
          var tileDataLen = tileData.length;
          for (var row = sRow, tileY = 0; tileY < newHeight && row < tileDataLen; row += 1, tileY += stepRow) {
            var tileRow = tileData[row];
            if (LangUtil.isArray(tileRow)) {
              var tileRowLen = tileRow.length;
              for (var col = sCol, tileX = 0; tileX < newWidth && col < tileRowLen; col += 1, tileX += stepCol) {
                var tileCell = tileRow[col];
                if (tileCell === 0) {
                  continue;
                }
                var imageClip = tileImageClip[tileCell];
                if (imageClip) {
                  var image = tileImage[imageClip.imageId];
                  if (image) {
                    // TODO: draw block

                  }
                }
              }
            }
          }
          ctx.backInvalid = false;
        } else {
          if (newWidth !== oldWidth || newHeight !== oldHeight || newX !== oldX || newY !== oldY) {
            var clipWidth = Math.min(newWidth + newX, oldWidth + oldX) - Math.max(newX, oldX);
            var clipHeight = Math.min(newHeight + newY, oldHeight + oldY) - Math.max(newY, oldY);
            var clip = clipWidth > 0 && clipHeight > 0;
            var foreRender = ctx.foreRender;
            var backRender = ctx.backRender;
            foreRender.width = newWidth;
            foreRender.height = newHeight;
            if (clip) {
              // TODO: draw block
            }
          }
        }
      }
      
      function renderDiamondMapCache (ctx) {
        
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
          backRender: new CanvasRender({canvas: doc.createElement('canvas')}),
          progress: {}
        };
      }

      return InnerGTiledMap;
    })();

    return GTiledMap;
  }
)();
