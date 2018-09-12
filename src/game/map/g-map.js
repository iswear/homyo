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
    var doc = document;

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
        mapNode.removeObserver('frame', syncMapNodeX, this, mapNode);
        mapNode.removeObserver('frame', syncMapNodeY, this, mapNode);
        mapNode.removeObserver('frame', syncMapNodeAnchorX, this, mapNode);
        mapNode.removeObserver('frame', syncMapNodeAnchorY, this, mapNode);
        mapNode.removeObserver('frame', syncMapNodeWidthSquare, this, mapNode);
        mapNode.removeObserver('frame', syncMapNodeWidthDiamond, this, mapNode);
        mapNode.removeObserver('frame', syncMapNodeHeightSquare, this, mapNode);
        mapNode.removeObserver('frame', syncMapNodeHeightDiamond, this, mapNode);
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
          mapNode.addObserver('frame', syncMapNodeX, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeY, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeAnchorX, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeAnchorY, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeWidthSquare, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeHeightSquare, this, mapNode);
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
          mapNode.addObserver('frame', syncMapNodeX, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeY, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeAnchorX, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeAnchorY, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeWidthDiamond, this, mapNode);
          mapNode.addObserver('frame', syncMapNodeHeightDiamond, this, mapNode);
        }
      }

      function syncMapBackgroundRender () {
        this._mapCacheCtx.background.needRender = (this.mapBackgroundImage && this.mapBackgroundImage !== '') ? true : false;
      }

      function syncMapTilesRender () {
        var tileCtx = this._mapCacheCtx.tile;
        tileCtx.needRender = (this.mapTileData && LangUtil.isArray(this.mapTileData)) ? true : false;
        tileCtx.offsetInvalid = true;
        tileCtx.sizeInvalid = true;
        tileCtx.foreInvalid = true;
        tileCtx.backInvalid = true;
      }

      function syncMapNodeX () {
        if (this._mapCacheCtx.mapXInvalid) {
          this._mapNode.x = - this.mapX;
          this._mapCacheCtx.mapXInvalid = false;
        }
      }

      function syncMapNodeY () {
        if (this._mapCacheCtx.mapYInvalid) {
          this._mapNode.y = - this.mapY;
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
        var mapZone = this.getLocalZone();
        var mapNodeZone = this._mapNode.getLocalZone();
        /* test */
        render.lineWidth = 1;
        render.strokeStyle = '#f00';
        render.strokeRect(mapZone.left, mapZone.top, mapZone.width, mapZone.height);
        render.strokeStyle = '#0f0';
        render.strokeRect(mapNodeZone.left - this.mapX, mapNodeZone.top - this.mapY, mapNodeZone.width, mapNodeZone.height);
        /* test */
        var offsetLeft = this.mapX - mapNodeZone.left - tileCtx.left;
        var offsetTop = this.mapY - mapNodeZone.top - tileCtx.top;
        var canvas = tileCtx.foreRender.getCanvas();
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {
          var dirtyZone = dirtyZones[i];
          render.drawImageExt(canvas, 
            dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height, 
            dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
        }
      }

      function renderDiamondMap (sender, render, dirtyZones) {
        var ctx = this._mapCacheCtx;
        var tileCtx = ctx.tile;
        if (tileCtx.needRender && tileCtx.foreInvalid) {
          renderDiamondMapCache.call(this, tileCtx);
          tileCtx.foreInvalid = false;
        }
        var mapZone = this.getLocalZone();
        var mapNodeZone = this._mapNode.getLocalZone();
        /* test */
        render.lineWidth = 1;
        render.strokeStyle = '#f00';
        render.strokeRect(mapZone.left, mapZone.top, mapZone.width, mapZone.height);
        render.strokeStyle = '#0f0';
        render.strokeRect(mapNodeZone.left - this.mapX, mapNodeZone.top - this.mapY, mapNodeZone.width, mapNodeZone.height);
        /* test */
        var offsetLeft = this.mapX - mapNodeZone.left - tileCtx.left;
        var offsetTop = this.mapY - mapNodeZone.top - tileCtx.top;
        var canvas = tileCtx.foreRender.getCanvas();
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {
          var dirtyZone = dirtyZones[i];
          render.drawImageExt(canvas, 
            dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height, 
            dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
        }
      }

      function renderSquareMapCache (sender, render, dirtyZones) {
        var ctx = this._mapCacheCtx.tile;
        var zone = this.getLocalZone();
        var mapNodeZone = this._mapNode.getLocalZone();

        var tileWidth = this.mapTileWidth;
        var tileHeight = this.mapTileHeight;

        var oldLeft = ctx.left;
        var oldTop = ctx.top;
        var newLeft = oldLeft;
        var newTop = oldTop;
        if (ctx.offsetInvalid) {
          newLeft = Math.floor(((zone.left + this.mapX - mapNodeZone.left) / tileWidth)) * tileWidth;
          newTop = Math.floor(((zone.top + this.mapY - mapNodeZone.top) / tileHeight)) * tileHeight;
          ctx.left = newLeft;
          ctx.top = newTop;
          ctx.offsetInvalid = false;
        }

        var oldWidth = ctx.width;
        var oldHeight = ctx.height;
        var newWidth = oldWidth;
        var newHeight = oldHeight;
        if (ctx.sizeInvalid) {
          newWidth = Math.ceil((this.width + zone.left + this.mapX - mapNodeZone.left) / tileWidth) * tileWidth - newLeft;
          newHeight = Math.ceil((this.height + zone.top + this.mapY - mapNodeZone.top) / tileHeight) * tileHeight - newTop;
          ctx.width = newWidth;
          ctx.height = newHeight;
          ctx.sizeInvalid = false;
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
          var tileData = this.mapTileData;
          var tileImage = this.mapTileImageIndex;
          var tileImageClip = this.mapTileImageClipIndex;
          var mapID = this.getID();
          for (var row = sRow, tileY = 0; row < rowCount && tileY < newHeight; row += 1, tileY += tileHeight) {
            if (row < 0) {
              continue;
            }
            var tileRow = tileData[row];
            for (var col = sCol, tileX = 0; col < colCount && tileX < newWidth; col += 1, tileX += tileWidth) {
              if (col < 0) {
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
                  var img = application.loadImage(image, mapID, loadImageFinished, this);
                  if (img) {
                    foreRender.drawImageExt(img, imageClip.x, imageClip.y, imageClip.width, imageClip.height, tileX, tileY, tileWidth, tileHeight);
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
          var tileData = this.mapTileData;
          var tileImage = this.mapTileImageIndex;
          var tileImageClip = this.mapTileImageClipIndex;
          var mapID = this.getID();
          for (var row = sRow, tileY = 0; row < rowCount && tileY < newHeight; row += 1, tileY += tileHeight) {
            if (row < 0) {
              continue;
            }
            var tileRow = tileData[row];
            for (var col = sCol, tileX = 0; col < colCount && tileX < newWidth; col += 1, tileX += tileWidth) {
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
                  var img = application.loadImage(image, mapID, loadImageFinished, this);
                  if (img) {
                    foreRender.drawImageExt(img, imageClip.x, imageClip.y, imageClip.width, imageClip.height, tileX, tileY, tileWidth, tileHeight);
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
        var zone = this.getLocalZone();
        var mapNodeZone = this._mapNode.getLocalZone();

        var tileWidth = this.mapTileWidth;
        var tileHeight = this.mapTileHeight;
        var halfTileWidth = tileWidth / 2;
        var halfTileHeight = tileHeight / 2;

        var containerLeft = zone.left + this.mapX - mapNodeZone.left - this.mapTileRows * halfTileWidth;
        var containerTop = zone.top + this.mapY - mapNodeZone.top;
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
          var tileData = this.mapTileData;
          var tileImage = this.mapTileImageIndex;
          var tileImageClip = this.mapTileImageClipIndex;
          var mapID = this.getID();
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
                  var img = application.loadImage(image, mapID, loadImageFinished, this);
                  if (img) {
                    var srcX = imageClip.x;
                    var srcY = imageClip.y;
                    var srcWidth = imageClip.width;
                    var srcHeight = imageClip.height;
                    var desX = tileX;
                    var desY = tileY;
                    var desWidth = tileWidth;
                    var desHeight = tileHeight;
                    if (desX < 0) {
                      srcX += imageClip.width / 2;
                      srcWidth -= imageClip.width / 2;
                      desX += halfTileWidth;
                      desWidth -= halfTileWidth;
                    } else if (desX + tileWidth > newWidth) {
                      srcWidth -= imageClip.width / 2;
                      desWidth -= halfTileWidth;
                    }
                    if (desY < 0) {
                      srcY += imageClip.height / 2;
                      srcHeight -= imageClip.height / 2;
                      desY += halfTileHeight;
                      desHeight -= halfTileHeight;
                    } else if (desY + tileHeight > newWidth) {
                      srcHeight -= imageClip.height / 2;
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
          var tileData = this.mapTileData;
          var tileImage = this.mapTileImageIndex;
          var tileImageClip = this.mapTileImageClipIndex;
          var mapID = this.getID();
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
                  var img = application.loadImage(image, mapID, loadImageFinished, this);
                  if (img) {
                    var halfImageWidth = imageClip.width / 2;
                    var halfImageHeight = imageClip.height / 2;
                    var srcX = imageClip.x;
                    var srcY = imageClip.y;
                    var srcWidth = imageClip.width;
                    var srcHeight = imageClip.height;
                    var desX = tileX;
                    var desY = tileY;
                    var desWidth = tileWidth;
                    var desHeight = tileHeight;
                    if (desX < 0) {
                      srcX += halfImageWidth;
                      desX += halfTileWidth;
                      srcWidth -= halfImageWidth;
                      desWidth -= halfTileWidth;
                    } else if (desX + tileWidth > newWidth) {
                      srcWidth -= halfImageWidth;
                      desWidth -= halfTileWidth;
                    }
                    if (desY < 0) {
                      srcY += halfImageHeight;
                      desY += halfTileHeight;
                      srcHeight -= halfImageHeight;
                      desHeight -= halfTileHeight;
                    } else if (desY + tileHeight > newHeight) {
                      srcHeight -= halfImageHeight;
                      desHeight -= halfTileHeight;
                    }
                    if (clip) {
                      if (desY + desHeight <= clipTarTop) {
                        foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                          desX, desY, desWidth, desHeight);
                      } else if (desY >= clipTarBottom) {
                        foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                          desX, desY, desWidth, desHeight);
                      } else {
                        if (desX + desWidth <= clipTarLeft) {
                          foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                            desX, desY, desWidth, desHeight);
                        } else if (desX >= clipTarRight) {
                          foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                            desX, desY, desWidth, desHeight);
                        } else {
                          if (tileY + halfTileHeight === clipTarTop) {
                            if (tileX + halfTileWidth === clipTarLeft) {
                              if (clipTarLeft > 0) {
                                if (clipTarTop > 0) {
                                  foreRender.drawImageExt(img, imageClip.x, imageClip.y, imageClip.width, halfImageHeight,
                                    tileX, tileY, tileWidth, halfTileHeight);
                                }
                                foreRender.drawImageExt(img, imageClip.x, imageClip.y + halfImageHeight, halfImageWidth, halfImageHeight,
                                  tileX, tileY + halfTileHeight, halfTileWidth, halfTileHeight);
                              } else {
                                if (clipTarTop > 0) {
                                  foreRender.drawImageExt(img, imageClip.x + halfImageWidth, halfImageWidth, halfImageHeight,
                                    tileX + halfTileWidth, tileY, halfTileWidth, halfTileHeight);
                                }
                              }
                            } else if (tileX + halfTileWidth === clipTarRight) {
                              if (clipTarRight < newWidth) {
                                if (clipTarTop > 0) {
                                  foreRender.drawImageExt(img, imageClip.x, imageClip.y, imageClip.width, halfImageHeight,
                                    tileX, tileY, tileWidth, halfTileHeight);
                                }
                                foreRender.drawImageExt(img, imageClip.x + halfImageWidth, imageClip.y + halfImageHeight, halfImageWidth, halfImageHeight,
                                  tileX + halfTileWidth, tileY + halfTileHeight, halfTileWidth, halfTileHeight);
                              } else {
                                if (clipTarTop > 0) {
                                  foreRender.drawImageExt(img, imageClip.x, imageClip.y, halfImageWidth, halfImageHeight,
                                    tileX, tileY, halfTileWidth, halfTileHeight);
                                }
                              }
                            } else {
                              if (clipTarTop > 0) {
                                foreRender.drawImageExt(img, imageClip.x, imageClip.y, imageClip.width, halfImageHeight,
                                  tileX, tileY, tileWidth, halfTileHeight);
                              }
                            }
                          } else if (tileY + halfTileHeight === clipTarBottom) {
                            if (tileX + halfTileWidth === clipTarLeft) {
                              if (clipTarLeft > 0) {
                                if (clipTarBottom < newHeight) {
                                  foreRender.drawImageExt(img, imageClip.x, imageClip.y + halfImageHeight, imageClip.width, halfImageHeight,
                                    tileX, tileY + halfTileHeight, tileWidth, halfTileHeight);
                                }
                                foreRender.drawImageExt(img, imageClip.x, imageClip.y, halfImageWidth, halfImageHeight,
                                  tileX, tileY, halfImageWidth, halfImageHeight);
                              } else {
                                if (clipTarBottom < newHeight) {
                                  foreRender.drawImageExt(img, imageClip.x + halfImageWidth, imageClip.y + halfImageHeight, halfImageWidth, halfImageHeight,
                                    tileX + halfTileWidth, tileY + halfTileHeight, halfTileWidth, halfTileHeight);
                                }
                              }
                            } else if (tileX + halfTileWidth === clipTarRight) {
                              if (clipTarRight < newWidth) {
                                if (clipTarBottom < newHeight) {
                                  foreRender.drawImageExt(img, imageClip.x, imageClip.y + halfImageHeight, imageClip.width, halfImageHeight,
                                    tileX, tileY + halfTileHeight, tileWidth, halfTileHeight);
                                }
                                foreRender.drawImageExt(img, imageClip.x + halfImageWidth, imageClip.y, halfImageWidth, halfImageHeight,
                                  tileX + halfTileWidth, tileY, halfTileWidth, halfTileHeight);
                              } else {
                                if (clipTarBottom < newHeight) {
                                  foreRender.drawImageExt(img, imageClip.x, imageClip.y + halfImageHeight, halfImageWidth, halfImageHeight,
                                    tileX, tileY + halfImageHeight, halfTileWidth, halfTileHeight);
                                }
                              }
                            } else {
                              if (clipTarBottom < newHeight) {
                                foreRender.drawImageExt(img, imageClip.x, imageClip.y + halfImageHeight, imageClip.width, halfImageHeight,
                                  tileX, tileY + halfTileHeight, tileWidth, halfTileHeight);
                              }
                            }
                          } else {
                            if (tileX + halfTileWidth === clipTarLeft) {
                              foreRender.drawImageExt(img, imageClip.x, imageClip.y, halfImageWidth, imageClip.height,
                                tileX, tileY, halfTileWidth, tileHeight);
                            } else if (tileX + halfTileWidth === clipTarRight) {
                              foreRender.drawImageExt(img, imageClip.x + halfImageWidth, imageClip.y, halfImageWidth, imageClip.height,
                                tileX + halfTileWidth, tileY, halfTileWidth, tileHeight);
                            }
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

      function loadImageFinished (url, image, success, async) {
        if (async && success) {
          var tileCtx = this._mapCacheCtx.tile;
          tileCtx.foreInvalid = true;
          tileCtx.backInvalid = true;
          this.dirty();
        }
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
        this.defineNotifyProperty('mapTileType', LangUtil.checkAndGet(conf.mapTileType, this.defMapTileType));
        this.defineNotifyProperty('mapBackgroundImage', LangUtil.checkAndGet(conf.mapBackgroundImage, null));
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