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
          ctx.foreInvalid = false;
        }
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
        var foreRender = ctx.backRender;
        var backRender = ctx.foreRender;

        if (ctx.backInvalid) {
          if (foreRender.width !== newWidth || foreRender.height !== newHeight) {
            foreRender.width = newWidth;
            foreRender.height = newHeight;
          } else {
            foreRender.clear();
          }

          var application = this.findApplication();
          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
          for (var row = sRow, tileY = 0, tileDataLen = tileData.length; tileY < newHeight && row < tileDataLen; row += 1, tileY += stepRow) {
            var tileRow = tileData[row];
            for (var col = sCol, tileX = 0, tileRowLen = tileRow.length; tileX < newWidth && col < tileRowLen; col += 1, tileX += stepCol) {
              var tileCell = tileRow[col];
              if (tileCell === 0) {
                continue;
              }
              var imageClip = tileImageClip[tileCell];
              if (imageClip) {
                var image = tileImage[imageClip.imageId];
                if (image) {
                  var img = application.loadImage(image.url, true);
                  if (img !== null) {
                    foreRender.drawImageExt(img, image.x, image.y, image.width, image.height, tileX, tileY, tileWidth, tileHeight);
                  }
                }
              }
            }
          }
          ctx.foreRender = foreRender;
          ctx.backRender = backRender;
          ctx.backInvalid = false;
        } else {
          if (newWidth !== oldWidth || newHeight !== oldHeight || newX !== oldX || newY !== oldY) {
            if (foreRender.width !== newWidth || newHeight !== oldHeight) {
              foreRender.width = newWidth;
              foreRender.height = newHeight;
            } else {
              foreRender.clear();
            }

            var clipWidth = Math.min(newWidth + newX, oldWidth + oldX) - Math.max(newX, oldX);
            var clipHeight = Math.min(newHeight + newY, oldHeight + oldY) - Math.max(newY, oldY);
            var clip = clipWidth > 0 && clipHeight > 0;
            var clipSrcLeft = 0;
            var clipSrcTop = 0;
            var clipTarLeft = 0;
            var clipTarTop = 0;
            if (clip) {
              clipSrcLeft = (newX > oldX) ? (newX - oldX) : 0;
              clipSrcTop = (newY > oldY) ? (newY - oldY) : 0;
              clipTarLeft = (newX < oldX) ? (oldX - newX) : 0;
              clipTarTop = (newY < oldY) ? (oldY - newY) : 0;
              foreRender.drawImageExt(backRender.getCanvas(),
                clipSrcLeft, clipSrcTop, clipWidth, clipHeight,
                clipTarLeft, clipTarTop, clipWidth, clipHeight);
            }

            var application = this.findApplication();
            var tileImage = this.tileImage;
            var tileImageClip = this.tileImageClip;
            var clipTarRight = clipWidth + clipTarLeft;
            var clipTarBottom = clipHeight + clipTarTop;
            for (var row = sRow, tileY = 0, tileDataLen = tileData.length; tileY < newHeight && row < tileDataLen; row += 1, tileY += stepRow) {
              var tileRow = tileData[row];
              for (var col = sCol, tileX = 0, tileRowLen = tileRow.length; tileX < newWidth && col < tileRowLen; col += 1, tileX += stepCol) {
                if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
                  continue;
                }
                var tileCell = tileRow[col];
                if (tileCell === 0) {
                  continue;
                }
                var imageClip = tileImageClip[tileCell];
                if (imageClip) {
                  var image = tileImage[imageClip.imageId];
                  if (image) {
                    var img = application.loadImage(image.url, true);
                    if (img !== null) {
                      foreRender.drawImageExt(img, image.x, image.y, image.width, image.height, tileX, tileY, tileWidth, tileHeight);
                    }
                  }
                }
              }
            }
            ctx.foreRender = foreRender;
            ctx.backRender = backRender;
            ctx.backInvalid = false;
          }
        }
        ctx.foreInvalid = false;
      }
      
      function renderDiamondMapCache (ctx) {
        var rect = this.getRectInLocal();
        var mapRect = this.getMapRectInLocal();
        var tileWidth = this.tileWidth;
        var tileHeight = this.tileHeight;
        var oldX = ctx.x;
        var oldY = ctx.y;
        var oldWidth = ctx.width;
        var oldHeight = ctx.height;
        var newX = oldX;
        var newY = oldY;
        var newWidth = oldWidth;
        var newHeight = oldHeight;

        var sRow = Math.floor((rect.left - mapRect.left) / tileHeight);
        var sCol = Math.floor((rect.left - mapRect.left) / tileHeight);
        var eRow = Math.floor();
        var eCol = Math.floor();

        if (ctx.offsetInvalid) {

        }

        if (ctx.sizeInvalid) {

        }

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

        this.defineNotifyProperty('rows', LangUtil.checkAndGet());
        this.defineNotifyProperty('cols', LangUtil.checkAndGet());
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
