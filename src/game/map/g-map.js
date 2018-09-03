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
        this.removeObserver('render', renderSquareMap, this, this);
        this.removeObserver('render', renderDiamondMap, this, this);
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
          this.addObserver('render', renderSquareMap, this, this);
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
          this.addObserver('render', renderDiamondMap, this, this);
          mapNode.addObserver('frame', syncMapNodeX, this, this);
          mapNode.addObserver('frame', syncMapNodeY, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorX, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorY, this, this);
          mapNode.addObserver('frame', syncMapNodeWidthDiamond, this, this);
          mapNode.addObserver('frame', syncMapNodeHeightDiamond, this, this);
        }
      }

      function syncMapBackgroundRender () {
        this._mapCacheCtx.background.needRender = (this.mapBackgroundImage && this.mapBackgroundImage !== '') ? true : false;
      }

      function syncMapTilesRender () {
        var tileCtx = this._mapCacheCtx.tile;
        tileCtx.needRender = (this.tileData && LangUtil.isArray(this.tileData)) ? true : false;
        tileCtx.offsetInvalid = true;
        tileCtx.sizeInvalid = true;
        tileCtx.foreInvalid = true;
        tileCtx.backInvalid = true;
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

      function renderSquareMap (sender, render, dirtyZones) {
        var ctx = this._mapCacheCtx;
        var tileCtx = ctx.tile;
        if (tileCtx.needRender && tileCtx.foreInvalid) {
          renderSquareMapCache.call(this, tileCtx);
          tileCtx.foreInvalid = false;
        }
        // var backgroundCtx = ctx.background;
      }

      function renderDiamondMap (sender, render, dirtyZones) {
        var ctx = this._mapCacheCtx;
        var tileCtx = ctx.tile;
        if (tileCtx.needRender && tileCtx.foreInvalid) {
          renderDiamondMapCache.call(this, tileCtx);
          tileCtx.foreInvalid = false;
        }
        // var backgroundCtx = ctx.background;
      }

      function renderSquareMapCache (sender, render, dirtyZones) {
        var ctx = this._mapCacheCtx.tile;
        var zone = this.getZoneInLocal();
        var mapNodeZone = this._mapNode.getZoneInLocal();

        var tileWidth = this.tileWidth;
        var tileHeight = this.tileHeight;

        var oldWidth = ctx.width;
        var oldHeight = ctx.height;
        var newWidth = oldWidth;
        var newHeight = oldHeight;
        if (ctx.sizeInvalid) {
          newWidth = Math.ceil(this.width / tileWidth) * tileWidth;
          newHeight = Math.ceil(this.height / tileHeight) * tileHeight;
          ctx.width = newWidth;
          ctx.height = newHeight;
          ctx.sizeInvalid = false;
        }

        var oldLeft = ctx.left;
        var oldTop = ctx.top;
        var newLeft = oldLeft;
        var newTop = oldTop;
        if (ctx.offsetInvalid) {
          newLeft = Math.floor(((zone.left - this.mapX - mapNodeZone.left) / tileWidth)) * tileWidth;
          newTop = Math.floor(((zone.top - this.mapY - mapNodeZone.top) / tileHeight)) * tileHeight;
          ctx.left = newLeft;
          ctx.top = newTop;
          ctx.offsetInvalid = false;
        }

        var sRow = newLeft / tileWidth;
        var sCol = newTop / tileHeight;
        var rowCount = this.mapTileRows;
        var colCount = this.mapTileCols;
        if (ctx.backInvalid) {
          var foreRender = ctx.backRender;
          var backRender = ctx.foreRender;
          if (foreRender.width !== newWidth && foreRender.height !== newHeight) {
            foreRender.width = newWidth;
            foreRender.height = newHeight;
          } else {
            foreRender.clear();
          }

          var application = this.findApplication();
          var tileData = this.tileData;
          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
          for (var row = sRow, tileY = 0;
               row >= 0 && row < rowCount && tileY < newHeight;
               row += 1, tileY += tileHeight) {
            var tileRow = tileData[row];
            for (var col = sCol, tileX = 0;
                 col >= 0 && col < colCount && tileX < newWidth;
                 col += 1, tileX += tileWidth) {
              var tileCell = tileRow[col];
              if (!tileCell) {
                continue;
              }
              var imageClip = tileImageClip[tileCell];
              if (imageClip) {
                var image = tileImage[imageClip.imageId];
                if (image) {
                  var img = application.loadImage(image, true);
                  if (img !== null) {
                    foreRender.drawImageExt(img, image.x, image.y, image.width, image.height, tileX, tileY, tileWidth, tileHeight);
                  }
                }
              }
            }
          }
          ctx.foreRender = foreRender;
          ctx.backRender = backRender;
        } else if (newWidth !== oldWidth || newHeight !== oldHeight || newLeft !== oldLeft || newTop !== oldTop) {
          var foreRender = ctx.backRender;
          var backRender = ctx.foreRender;
          if (foreRender.width !== newWidth && foreRender.height !== newHeight) {
            foreRender.width = newWidth;
            foreRender.height = newHeight;
          } else {
            foreRender.clear();
          }
          var clipWidth = Math.min(newWidth + newLeft, oldWidth + oldLeft) - Math.max(newLeft, oldLeft);
          var clipHeight = Math.min(newHeight + newTop, oldHeight + oldTop) - Math.max(newTop, oldTop);
          var clip = clipWidth > 0 && clipHeight > 0;
          var clipTarLeft = 0;
          var clipTarTop = 0;
          var clipTarRight = 0;
          var clipTarBottom = 0;
          if (clip) {
            clipTarLeft = newLeft < oldLeft ? (oldLeft - newLeft) : 0;
            clipTarRight = clipWidth + clipTarLeft;
            clipTarTop = newTop < oldTop ? (oldTop - newTop) : 0;
            clipTarBottom = clipHeight + clipTarTop;
            foreRender.drawImageExt(backRender.getCanvas(), newLeft > oldLeft ? (newLeft - oldLeft) : 0, newTop > oldTop ? (newTop - oldTop) : 0, clipWidth, clipHeight,
              clipTarLeft, clipTarTop, clipWidth, clipHeight);
          }
          var application = this.findApplication();
          var tileData = this.tileData;
          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
          for (var row = sRow, tileY = 0;
               row >= 0 && row < rowCount && tileY < newHeight;
               row += 1, tileY += tileHeight) {
            var tileRow = tileData[row];
            for (var col = sCol, tileX = 0;
                 col >= 0 && col < colCount && tileX < newWidth;
                 col += 1, tileX += tileWidth) {
              if (clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom) {
                continue;
              }
              var tileCell = tileRow[col];
              if (!tileCell) {
                continue;
              }
              var imageClip = tileImageClip[tileCell];
              if (imageClip) {
                var image = tileImage[imageClip.imageId];
                if (image) {
                  var img = application.loadImage(image, true);
                  if (img !== null) {
                    foreRender.drawImageExt(img, image.x, image.y, image.width, image.height, tileX, tileY, tileWidth, tileHeight);
                  }
                }
              }
            }
          }
          ctx.foreRender = foreRender;
          ctx.backRender = backRender;
        }
        ctx.backInvalid = false;
        ctx.foreInvalid = false;
      }

      function renderDiamondMapCache (sender, render, dirtyZones) {
        var ctx = this._mapCacheCtx.tile;
        var zone = this.getZoneInLocal();
        var mapNodeZone = this._mapNode.getZoneInLocal();

        var tileWidth = this.tileWidth;
        var tileHeight = this.tileHeight;
        var halfTileWidth = tileWidth / 2;
        var halfTileHeight = tileHeight / 2;

        var containerLeft = zone.left - this.mapX - mapNodeZone.left - this.mapTileRows * halfTileWidth;
        var containerTop = zone.top - this.mapY - mapNodeZone.top;
        var containerRight = containerLeft + this.width;
        var containerBottom = containerTop + this.height;

        var sRow = Math.floor(containerTop / tileHeight - containerLeft / tileWidth);
        var sCol = Math.floor(containerTop / tileHeight + containerLeft / tileWidth);
        var eRow = Math.floor(containerBottom / tileHeight - containerRight / tileWidth);
        var eCol = Math.floor(containerBottom / tileHeight + containerRight / tileWidth);

        var oldLeft = ctx.left;
        var oldTop = ctx.top;
        var newLeft = oldLeft;
        var newTop = oldTop;
        if (ctx.offsetInvalid) {
          newLeft = ((sCol - sRow - 1) * halfTileWidth) + containerLeft;
          newTop = (sCol + sRow) * halfTileHeight;
          ctx.left = newLeft;
          ctx.top = newTop;
          ctx.offsetInvalid = false;
        }

        var oldWidth = ctx.width;
        var oldHeight = ctx.height;
        var newWidth = oldWidth;
        var newHeight = oldHeight;
        if (ctx.sizeInvalid) {
          newWidth = (eCol - eRow + 1) * halfTileWidth - newLeft;
          newHeight = (eCol + eRow + 2) * halfTileHeight - newTop;
          ctx.width = newWidth;
          ctx.height = newHeight;
          ctx.sizeInvalid = false;
        }

        var rowCount = this.mapTileRows;
        var colCount = this.mapTileCols;
        if (ctx.backInvalid) {
          var foreRender = ctx.backRender;
          var backRender = ctx.foreRender;
          if (foreRender.width !== newWidth && foreRender.height !== newHeight) {
            foreRender.width = newWidth;
            foreRender.height = newHeight;
          } else {
            foreRender.clear();
          }
          var application = this.findApplication();
          var tileData = this.tileData;
          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
          for (var startRow = sRow, startCol = sCol - 1, startTileX = -halfTileWidth, startTileY = -halfTileHeight;
               startTileY < newHeight;
               startTileX = (startTileX !== 0 ? 0 : -halfTileWidth), startTileY += halfTileHeight, startRow += 1, startCol += 1) {
            if (startRow < 0 || startCol >= colCount) {
              break;
            }
            for (var row = startRow, col = startCol, tileX = startTileX, tileY = startTileY;
                 tileX < newWidth;
                 row -= 1, col += 1, tileX += tileWidth) {
              if (row < 0 || col >= colCount) {
                break;
              }
              if (row >= rowCount || col < 0) {
                continue;
              }
              var tileCell = tileData[row][col];
              if (!tileCell) {
                continue;
              }
              var imageClip = tileImageClip[tileCell];
              if (imageClip) {
                var image = tileImage[imageClip.imageId];
                if (image) {
                  var img = application.loadImage(image, true);
                  if (img !== null) {
                    var srcX = image.x;
                    var srcY = image.y;
                    var srcWidth = image.width;
                    var srcHeight = image.height;
                    var desX = tileX;
                    var desY = tileY;
                    var desWidth = tileWidth;
                    var desHeight = tileHeight;
                    if (desX < 0) {
                      srcX += image.width / 2;
                      srcWidth -= image.width / 2;
                      desX += halfTileWidth;
                      desWidth -= halfTileWidth;
                    } else if (desX + tileWidth > newWidth) {
                      srcWidth -= image.width / 2;
                      desWidth -= halfTileWidth;
                    }
                    if (desY < 0) {
                      srcY += image.height / 2;
                      srcHeight -= image.height / 2;
                      desY += halfTileHeight;
                      desHeight -= halfTileHeight;
                    } else if (desY + tileHeight > newWidth) {
                      srcHeight -= image.height / 2;
                      desHeight -= halfTileHeight;
                    }
                    foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                      desX, desY, desWidth, desHeight);
                  }
                }
              }
            }
          }
          ctx.foreRender = foreRender;
          ctx.backRender = backRender;
        } else if (newWidth !== oldWidth || newHeight !== oldHeight || newLeft !== oldLeft || newTop !== oldTop) {
          var foreRender = ctx.backRender;
          var backRender = ctx.foreRender;
          if (foreRender.width !== newWidth && foreRender.height !== newHeight) {
            foreRender.width = newWidth;
            foreRender.height = newHeight;
          } else {
            foreRender.clear();
          }
          var clipWidth = Math.min(newWidth + newLeft, oldWidth + oldLeft) - Math.max(newLeft, oldLeft);
          var clipHeight = Math.min(newHeight + newTop, oldHeight + oldTop) - Math.max(newTop, oldTop);
          var clip = clipWidth > 0 && clipHeight > 0;
          var clipTarLeft = 0;
          var clipTarTop = 0;
          var clipTarRight = 0;
          var clipTarBottom = 0;
          if (clip) {
            clipTarLeft = newLeft < oldLeft ? (oldLeft - newLeft) : 0;
            clipTarRight = clipWidth + clipTarLeft;
            clipTarTop = newTop < oldTop ? (oldTop - newTop) : 0;
            clipTarBottom = clipHeight + clipTarTop;
            foreRender.drawImageExt(backRender.getCanvas(), newLeft > oldLeft ? (newLeft - oldLeft) : 0, newTop > oldTop ? (newTop - oldTop) : 0, clipWidth, clipHeight,
              clipTarLeft, clipTarTop, clipWidth, clipHeight);

          }
          var application = this.findApplication();
          var tileData = this.tileData;
          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
          for (var startRow = sRow, startCol = sCol - 1, startTileX = -halfTileWidth, startTileY = -halfTileHeight;
               startTileY < newHeight;
               startTileX = (startTileX !== 0 ? 0 : -halfTileWidth), startTileY += halfTileHeight, startRow += 1, startCol += 1) {
            if (startRow < 0 || startCol >= colCount) {
              break;
            }
            for (row = startRow, col = startCol, tileX = startTileX , tileY = startTileY;
              tileX < newWidth;
              row -= 1, col += 1, tileX += tileWidth) {
              if (row < 0 || col >= colCount) {
                break;
              }
              if (row >= rowCount || col < 0) {
                continue;
              }
              var tileCell = tileData[row][col];
              if (!tileCell) {
                continue;
              }
              var imageClip = tileImageClip[tileCell];
              if (imageClip) {
                var image = tileImage[imageClip.imageId];
                if (image) {
                  var img = application.loadImage(image, true);
                  if (img !== null) {
                    var halfImageWidth = image.width / 2;
                    var halfImageHeight = image.height / 2;
                    var srcX = image.x;
                    var srcY = image.y;
                    var srcWidth = image.width;
                    var srcHeight = image.height;
                    var desX = tileX;
                    var desY = tileY;
                    var desWidth = tileWidth;
                    var desHeight = tileHeight;
                    if (desX < 0) {
                      srcX += halfImageWidth;
                      srcWidth -= halfImageWidth;
                      desX += halfTileWidth;
                      desWidth -= halfTileHeight;
                    } else if (desX + tileWidth > newWidth) {
                      srcWidth -= halfImageWidth;
                      desWidth -= halfTileWidth;
                    }
                    if (desY < 0) {
                      srcY += halfImageHeight;
                      srcHeight -= halfImageHeight;
                      desY += halfTileHeight;
                      desHeight -= halfTileHeight;
                    } else if (desY + tileHeight > newHeight) {
                      srcHeight -= halfImageHeight;
                      desHeight -= halfTileHeight;
                    }
                    if (clip) {
                      if (tileY + desHeight <= clipTarTop) {
                        foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                          desX, desY, desWidth, desHeight);
                      } else if (tileY >= clipTarBottom) {
                        foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                          desX, desY, desWidth, desHeight);
                      } else {
                        if (tileX + desWidth <= clipTarLeft) {
                          foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                            desX, desY, desWidth, desHeight);
                        } else if (tileX >= clipTarRight) {
                          foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                            desX, desY, desWidth, desHeight);
                        } else {
                          if (tileY + halfTileHeight === clipTarTop) {
                            if (tileX + halfTileWidth === clipTarLeft) {
                              foreRender.drawImageExt(img, )
                            } else if (tileX + halfTileWidth === clipTarRight) {

                            } else {

                            }
                          } else if (tileY + halfTileHeight === clipTarBottom && clipTarBottom !== newHeight) {

                          } else {

                          }
                        }
                      }
                    } else {
                      foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                        desX, desY, desWidth, desHeight);
                    }
                  }
                }
              }
            }
          }
        }
        ctx.backInvalid = false;
        ctx.foreInvalid = false;
      }

      return {
        syncMapNodeContext: syncMapNodeContext,
        syncMapBackgroundRender: syncMapBackgroundRender,
        syncMapTilesRender: syncMapTilesRender
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

        this._mapNode = new Node({
          rotateZ: 0
        });
        this.addChildNode(this._mapNode);

        this._mapCacheCtx = {
          mapXInvalid: true,
          mapYInvalid: true,
          mapWidthInvalid: true,
          mapHeightInvalid: true,
          mapAnchorXInvalid: true,
          mapAnchorYInvalid: true,
          background: {
            needRender: false,
          },
          tile: {
            needRender: false,
            offsetInvalid: true,
            left: 0,
            top: 0,
            sizeInvalid: true,
            width: 0,
            height: 0,
            foreInvalid: true,
            foreRender: new CanvasRender({canvas: doc.createElement('canvas')}),
            backInvalid: true,
            backRender: new CanvasRender({canvas: doc.createElement('canvas')})
          }
        };

        functions.syncMapNodeContext.call(this);
        functions.syncMapBackgroundRender.call(this);
        functions.syncMapTilesRender.call(this);

        this.addObserver('mapTileTypeChanged', functions.syncMapNodeContext, this, this);
        this.addObserver('mapBackgroundImageChanged', functions.syncMapBackgroundRender, this, this);
        this.addObserver('mapTileDataChanged', functions.syncMapTilesRender, this, this);
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