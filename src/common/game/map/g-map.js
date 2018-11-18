/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */

import LangUtil from '../../utils/lang-util';
import Node from '../../core/node';
import CanvasRender from "../../core/render/canvas/canvas-render";

export default (function () {
  var doc = document;

  var functions = (function () {
    function renderSquareMap(sender, render, dirtyZones) {
      var ctx = this._mapCacheCtx;
      var tileCtx = ctx.tile;
      if (tileCtx.needRender && tileCtx.foreInvalid) {
        renderSquareMapCache.call(this, tileCtx);
        tileCtx.foreInvalid = false;
      }
      var mapNodeZone = this._mapNode.getLocalZone();
      /* test */
      // var mapZone = this.getLocalZone();
      // render.lineWidth = 1;
      // render.strokeStyle = '#f00';
      // render.strokeRect(mapZone.left, mapZone.top, mapZone.width, mapZone.height);
      // render.strokeStyle = '#0f0';
      // render.strokeRect(mapNodeZone.left - this.mapX, mapNodeZone.top - this.mapY, mapNodeZone.width, mapNodeZone.height);
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

    function renderSquareMapGrid(sender, render, dirtyZones) {
      var mapNodeZone = this._mapNode.getLocalZone();
      var offsetLeft = mapNodeZone.left + this._mapNode.x;
      var offsetTop = mapNodeZone.top + this._mapNode.y;
      var offsetRight = mapNodeZone.right + this._mapNode.x;
      var offsetBottom = mapNodeZone.bottom + this._mapNode.y;
      render.beginPath();
      for (var i = 0, len = dirtyZones.length; i < len; ++i) {
        var dirtyZone = dirtyZones[i];
        var rowStartX = Math.max(dirtyZone.left, offsetLeft);
        var rowEndX = Math.min(dirtyZone.right, offsetRight);
        var colStartY = Math.max(dirtyZone.top, offsetTop);
        var colEndY = Math.min(dirtyZone.bottom, offsetBottom);
        if (rowStartX <= rowEndX && colStartY <= colEndY) {
          var miny = Math.ceil((colStartY - offsetTop) / this.mapTileHeight) * this.mapTileHeight + offsetTop;
          for (var y = miny; y <= colEndY; y += this.mapTileHeight) {
            render.moveTo(rowStartX, y + 0.5);
            render.lineTo(rowEndX, y + 0.5);
          }
          var minx = Math.ceil((rowStartX - offsetLeft) / this.mapTileWidth) * this.mapTileWidth + offsetLeft;
          for (var x = minx; x <= rowEndX; x += this.mapTileWidth) {
            render.moveTo(x + 0.5, colStartY);
            render.lineTo(x + 0.5, colEndY);
          }
        }
      }
      render.lineWidth = 1;
      render.strokeStyle = '#000';
      render.stroke();
    }

    function renderDiamondMap(sender, render, dirtyZones) {
      var ctx = this._mapCacheCtx;
      var tileCtx = ctx.tile;
      if (tileCtx.needRender && tileCtx.foreInvalid) {
        renderDiamondMapCache.call(this, tileCtx);
        tileCtx.foreInvalid = false;
      }
      var mapNodeZone = this._mapNode.getLocalZone();
      /* test */
      // var mapZone = this.getLocalZone();
      // render.lineWidth = 1;
      // render.strokeStyle = '#f00';
      // render.strokeRect(mapZone.left, mapZone.top, mapZone.width, mapZone.height);
      // render.strokeStyle = '#0f0';
      // render.strokeRect(mapNodeZone.left - this.mapX, mapNodeZone.top - this.mapY, mapNodeZone.width, mapNodeZone.height);
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

    function renderDiamondMapGrid(sender, render, dirtyZones) {
      var mapNodeZone = this._mapNode.getLocalZone();
      var halfTileWidth = this.mapTileWidth / 2;
      var halfTileHeight = this.mapTileHeight / 2;
      var offsetLeft = mapNodeZone.left + this._mapNode.x + this.mapTileRows * halfTileWidth;
      var offsetTop = mapNodeZone.top + this._mapNode.y;
      var slopeX2Y = this.mapTileHeight / this.mapTileWidth;
      var slopeY2X = this.mapTileWidth / this.mapTileHeight;
      render.beginPath();
      for (var i = 0, len = dirtyZones.length; i < len; ++i) {
        var dirtyZone = dirtyZones[i];
        var mapLeft = dirtyZone.left - offsetLeft;
        var mapRight = dirtyZone.right - offsetLeft;
        var mapTop = dirtyZone.top - offsetTop;
        var mapBottom = dirtyZone.bottom - offsetTop;
        // 计算并绘制行
        var startRow = Math.max(Math.ceil(mapTop / this.mapTileHeight - mapRight / this.mapTileWidth), 0);
        var endRow = Math.min(Math.floor(mapBottom / this.mapTileHeight - mapLeft / this.mapTileWidth), this.mapTileRows);
        var startCol = Math.max(Math.ceil(mapTop / this.mapTileHeight + mapLeft / this.mapTileWidth), 0);
        var endCol = Math.min(Math.floor(mapBottom / this.mapTileHeight + mapRight / this.mapTileWidth), this.mapTileCols);
        
        if (startRow <= endRow && startCol <= endCol) {
          // 绘制行
          // y = slopeX2Y * (x + row * tileWidth)
          // x = slopeY2X * y - row * tileWidth
          for (var row = startRow; row <= endRow; ++row) {
            var minx = -row * halfTileWidth;
            var maxx = (-row + this.mapTileCols) * halfTileWidth;
            var miny = row * halfTileHeight;
            var maxy = (row + this.mapTileCols) * halfTileHeight;
            var startX = Math.max(minx, mapLeft, slopeY2X * mapTop - row * this.mapTileWidth);
            var startY = Math.max(miny, mapTop, slopeX2Y * (mapLeft + row * this.mapTileWidth));
            var endX = Math.min(maxx, mapRight, slopeY2X * mapBottom - row * this.mapTileWidth);
            var endY = Math.min(maxy, mapBottom, slopeX2Y * (mapRight + row * this.mapTileWidth));
            if (startX < endX) {
              render.moveTo(startX + offsetLeft, startY + offsetTop);
              render.lineTo(endX + offsetLeft, endY + offsetTop);
              console.log(startX + offsetLeft, startY + offsetTop, endX + offsetLeft, endY + offsetTop);
            }
          }
          // 绘制列
          // y = -slopeX2Y * (x - col * tileWidth)
          // x = -slopeY2X * y + col * tileWidth
          for (var col = startCol; col <= endCol; ++col) {
            var minx = (col - this.mapTileRows) * halfTileWidth;
            var maxx = col * halfTileWidth;
            var miny = col * halfTileHeight;
            var maxy = (col + this.mapTileRows) * halfTileHeight;
            var startX = Math.max(minx, mapLeft, -slopeY2X * mapBottom + col * this.mapTileWidth);
            var startY = Math.min(maxy, mapBottom, -slopeX2Y * (mapLeft - col * this.mapTileWidth));
            var endX = Math.min(maxx, mapRight, -slopeY2X * mapTop + col * this.mapTileWidth);
            var endY = Math.max(miny, mapTop, -slopeX2Y * (mapRight - col * this.mapTileWidth));
            if (startX < endX) {
              render.moveTo(startX + offsetLeft, startY + offsetTop);
              render.lineTo(endX + offsetLeft, endY + offsetTop);
              console.log(startX + offsetLeft, startY + offsetTop, endX + offsetLeft, endY + offsetTop);
            }
          }
        }
      }
      render.lineWidth = 1;
      render.lineCap = 'round';
      render.strokeStyle = '#f00';
      render.stroke();
    }

    function renderSquareMapCache(ctx) {
      var zone = this.getLocalZone();
      var mapNodeZone = this._mapNode.getLocalZone();

      var tileWidth = this.mapTileWidth;
      var tileHeight = this.mapTileHeight;

      var oldLeft = ctx.left;
      var oldTop = ctx.top;
      var newLeft = Math.floor(((zone.left + this.mapX - mapNodeZone.left) / tileWidth)) * tileWidth;
      var newTop = Math.floor(((zone.top + this.mapY - mapNodeZone.top) / tileHeight)) * tileHeight;

      var oldWidth = ctx.width;
      var oldHeight = ctx.height;
      var newWidth = Math.ceil((this.width + zone.left + this.mapX - mapNodeZone.left) / tileWidth) * tileWidth - newLeft;
      var newHeight = Math.ceil((this.height + zone.top + this.mapY - mapNodeZone.top) / tileHeight) * tileHeight - newTop;

      var sRow = newTop / tileHeight;
      var sCol = newLeft / tileWidth;
      var rowCount = this.mapTileRows;
      var colCount = this.mapTileCols;
      if (ctx.backInvalid) {
        var foreRender = ctx.backRender;
        var backRender = ctx.foreRender;
        if (foreRender.width !== newWidth || foreRender.height !== newHeight) {
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
        if (foreRender.width !== newWidth || foreRender.height !== newHeight) {
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
          /* test */
          // foreRender.strokeStyle = '#00f';
          // foreRender.strokeRect(clipTarLeft, clipTarTop, clipWidth, clipHeight);
          /* test */
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
      ctx.left = newLeft;
      ctx.top = newTop;
      ctx.width = newWidth;
      ctx.height = newHeight;
      ctx.backInvalid = false;
      ctx.foreInvalid = false;
    }

    function renderDiamondMapCache(ctx) {
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
      var newLeft = ((sCol - sRow - 1) * halfTileWidth) + this.mapTileRows * halfTileWidth;
      var newTop = (sCol + sRow) * halfTileHeight;

      var oldWidth = ctx.width;
      var oldHeight = ctx.height;
      var newWidth = (eCol - eRow - sCol + sRow + 2) * halfTileWidth;
      var newHeight = (eCol + eRow - sCol - sRow + 2) * halfTileHeight;

      var rowCount = this.mapTileRows;
      var colCount = this.mapTileCols;
      if (ctx.backInvalid) {
        var foreRender = ctx.backRender;
        var backRender = ctx.foreRender;
        if (foreRender.width !== newWidth || foreRender.height !== newHeight) {
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
        for (var startRow = sRow, startCol = sCol - 1, startTileX = -halfTileWidth, startTileY = -halfTileHeight; startTileY < newHeight; startTileY += halfTileHeight) {
          if (startCol >= colCount) {
            break;
          }
          if (startRow >= 0) {
            for (var row = startRow, col = startCol, tileX = startTileX, tileY = startTileY; tileX < newWidth; row -= 1, col += 1, tileX += tileWidth) {
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
                      srcWidth -= halfImageWidth;
                      desX += halfTileWidth;
                      desWidth -= halfTileWidth;
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
                    foreRender.drawImageExt(img, srcX, srcY, srcWidth, srcHeight,
                      desX, desY, desWidth, desHeight);
                  }
                }
              }
            }
            if (startTileX === 0) {
              startTileX = -halfTileWidth;
              startRow += 1;
            } else {
              startTileX = 0;
              startCol += 1;
            }
          }
        }
        ctx.foreRender = foreRender;
        ctx.backRender = backRender;
      } else if (newWidth !== oldWidth || newHeight !== oldHeight || newLeft !== oldLeft || newTop !== oldTop) {
        var foreRender = ctx.backRender;
        var backRender = ctx.foreRender;
        if (foreRender.width !== newWidth || foreRender.height !== newHeight) {
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
          /* test */
          // foreRender.strokeStyle = '#00f';
          // foreRender.strokeRect(clipTarLeft, clipTarTop, clipWidth, clipHeight);
          /* test */
        }
        var application = this.findApplication();
        var tileData = this.mapTileData;
        var tileImage = this.mapTileImageIndex;
        var tileImageClip = this.mapTileImageClipIndex;
        var mapID = this.getID();
        for (var startRow = sRow, startCol = sCol - 1, startTileX = -halfTileWidth, startTileY = -halfTileHeight; startTileY < newHeight; startTileY += halfTileHeight) {
          if (startCol >= colCount) {
            break;
          }
          if (startRow >= 0) {
            for (row = startRow, col = startCol, tileX = startTileX, tileY = startTileY; tileX < newWidth; row -= 1, col += 1, tileX += tileWidth) {
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
                                  foreRender.drawImageExt(img, imageClip.x + halfImageWidth, imageClip.y, halfImageWidth, halfImageHeight,
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
                                  tileX, tileY, halfTileWidth, halfTileHeight);
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
                                    tileX, tileY + halfTileHeight, halfTileWidth, halfTileHeight);
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
          if (startTileX === 0) {
            startTileX = -halfTileWidth;
            startRow += 1;
          } else {
            startTileX = 0;
            startCol += 1;
          }
        }
        ctx.foreRender = foreRender;
        ctx.backRender = backRender;
      }
      ctx.left = newLeft;
      ctx.top = newTop;
      ctx.width = newWidth;
      ctx.height = newHeight;
      ctx.backInvalid = false;
      ctx.foreInvalid = false;
    }

    function loadImageFinished(url, image, success, async) {
      if (async && success) {
        var tileCtx = this._mapCacheCtx.tile;
        tileCtx.foreInvalid = true;
        tileCtx.backInvalid = true;
        this.dirty();
      }
    }

    function invalidMapCacheFore() {
      this._mapCacheCtx.tile.foreInvalid = true;
      this.dirty()
    }

    function invalidMapCacheAll() {
      var ctx = this._mapCacheCtx.tile;
      ctx.needRender = (this.mapTileData && LangUtil.isArray(this.mapTileData)) ? true : false;
      ctx.offsetInvalid = true;
      ctx.sizeInvalid = true;
      ctx.foreInvalid = true;
      ctx.backInvalid = true;
      this.dirty()
    }
    
    function onPropertyChanged(sender, name, newVal, oldVal) {
      var events = propertyChangedMap[this.mapTileType]
      if (events.hasOwnProperty(name)) {
        events[name].call(this, sender, newVal, oldVal);
      }
    }

    function onWidthChanged() {
      invalidMapCacheFore.call(this);
      this._mapGrid.width = this.width;
    }

    function onHeightChanged() {
      invalidMapCacheFore.call(this);
      this._mapGrid.height = this.height;
    }

    function onAnchorXChanged() {
      invalidMapCacheFore.call(this);
      this._mapNode.anchorX = this.anchorX;
      this._mapGrid.anchorX = this.anchorX;
    }

    function onAnchorYChanged() {
      invalidMapCacheFore.call(this);
      this._mapNode.anchorY = this.anchorY;
      this._mapGrid.anchorY = this.anchorY;
    }

    function onMapTileTypeChanged() {
      this.removeObserver('postClipRender', renderSquareMap, this);
      this.removeObserver('postClipRender', renderDiamondMap, this);
      this._mapGrid.removeObserver('postClipRender', renderSquareMapGrid, this);
      this._mapGrid.removeObserver('postClipRender', renderDiamondMapGrid, this);
      if (this.mapTileType === 'square') {
        this.addObserver('postClipRender', renderSquareMap, this);
        this._mapGrid.addObserver('postClipRender', renderSquareMapGrid, this);
        invalidMapCacheAll.call(this);
        onWidthChanged.call(this);
        onHeightChanged.call(this);
        onAnchorXChanged.call(this);
        onAnchorYChanged.call(this);
        onMapXChanged.call(this);
        onMapYChanged.call(this);
        onSquareMapTileWidthChanged.call(this);
        onSquareMapTileHeightChanged.call(this);
        onSquareMapTileRowsChanged.call(this);
        onSquareMapTileColsChanged.call(this);
      } else if (this.mapTileType === 'diamond') {
        this.addObserver('postClipRender', renderDiamondMap, this);
        this._mapGrid.addObserver('postClipRender', renderDiamondMapGrid, this);
        invalidMapCacheAll.call(this);
        onWidthChanged.call(this);
        onHeightChanged.call(this);
        onAnchorXChanged.call(this);
        onAnchorYChanged.call(this);
        onMapXChanged.call(this);
        onMapYChanged.call(this);
        onDiamondMapTileWidthChanged.call(this);
        onDiamondMapTileHeightChanged.call(this);
        onDiamondMapTileRowsChanged.call(this);
        onDiamondMapTileColsChanged.call(this);
      }
    }

    function onMapXChanged() {
      invalidMapCacheFore.call(this);
      this._mapNode.x = -this.mapX;
    }

    function onMapYChanged() {
      invalidMapCacheFore.call(this);
      this._mapNode.y = -this.mapY;
    }

    function onSquareMapTileWidthChanged() {
      invalidMapCacheAll.call(this);
      this._mapNode.width = this.mapTileWidth * this.mapTileCols;
    }

    function onSquareMapTileHeightChanged() {
      invalidMapCacheAll.call(this);
      this._mapNode.height = this.mapTileHeight * this.mapTileRows;
    }

    function onSquareMapTileRowsChanged() {
      invalidMapCacheAll.call(this);
      this._mapNode.height = this.mapTileHeight * this.mapTileRows;
    }

    function onSquareMapTileColsChanged() {
      invalidMapCacheAll.call(this);
      this._mapNode.width = this.mapTileWidth * this.mapTileCols; 
    }

    function onDiamondMapTileWidthChanged() {
      invalidMapCacheAll.call(this);
      this._mapNode.width = (this.mapTileRows + this.mapTileCols) * this.mapTileWidth / 2;
    }

    function onDiamondMapTileHeightChanged() {
      invalidMapCacheAll.call(this);
      this._mapNode.height = (this.mapTileRows + this.mapTileCols) * this.mapTileHeight / 2;
    }

    function onDiamondMapTileRowsChanged() {
      invalidMapCacheAll.call(this);
      this._mapNode.width = (this.mapTileRows + this.mapTileCols) * this.mapTileWidth / 2;
      this._mapNode.height = (this.mapTileRows + this.mapTileCols) * this.mapTileHeight / 2;
    }

    function onDiamondMapTileColsChanged() {
      invalidMapCacheAll.call(this);
      this._mapNode.width = (this.mapTileRows + this.mapTileCols) * this.mapTileWidth / 2;
      this._mapNode.height = (this.mapTileRows + this.mapTileCols) * this.mapTileHeight / 2;
    }

    function onMapTileDataChanged() {
      invalidMapCacheAll.call(this);
    }

    function onMapGridVisibleChanged() {
      this._mapGrid.visible = this.mapGridVisible;
    }

    var propertyChangedMap = {
      square: {
        width: onWidthChanged,
        height: onHeightChanged,
        anchorX: onAnchorXChanged,
        anchorY: onAnchorYChanged,
        mapTileType: onMapTileTypeChanged,
        mapX: onMapXChanged,
        mapY: onMapYChanged,
        mapTileWidth: onSquareMapTileWidthChanged,
        mapTileHeight: onSquareMapTileHeightChanged,
        mapTileRows: onSquareMapTileRowsChanged,
        mapTileCols: onSquareMapTileColsChanged,
        mapTileData: onMapTileDataChanged,
        mapGridVisible: onMapGridVisibleChanged
      },
      diamond: {
        width: onWidthChanged,
        height: onHeightChanged,
        anchorX: onAnchorXChanged,
        anchorY: onAnchorYChanged,
        mapTileType: onMapTileTypeChanged,
        mapX: onMapXChanged,
        mapY: onMapYChanged,
        mapTileWidth: onDiamondMapTileWidthChanged,
        mapTileHeight: onDiamondMapTileHeightChanged,
        mapTileRows: onDiamondMapTileRowsChanged,
        mapTileCols: onDiamondMapTileColsChanged,
        mapTileData: onMapTileDataChanged,
        mapGridVisible: onMapGridVisibleChanged
      }
    }

    return {
      onPropertyChanged: onPropertyChanged
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
    InnerGMap.prototype.defDirtyRenderSupport = true;
    InnerGMap.prototype.defMapGridVisible = false;
    InnerGMap.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.mapX = LangUtil.checkAndGet(conf.mapX, 0);
      this.mapY = LangUtil.checkAndGet(conf.mapY, 0);
      this.mapTileType = LangUtil.checkAndGet(conf.mapTileType, this.defMapTileType);
      this.mapTileWidth = LangUtil.checkAndGet(conf.mapTileWidth, this.defMapTileWidth);
      this.mapTileHeight = LangUtil.checkAndGet(conf.mapTileHeight, this.defMapTileHeight);
      this.mapTileImageIndex = LangUtil.checkAndGet(conf.mapTileImageIndex, {});
      this.mapTileImageClipIndex = LangUtil.checkAndGet(conf.mapTileImageClipIndex, {});
      this.mapTileRows = LangUtil.checkAndGet(conf.mapTileRows, this.defMapTileRows);
      this.mapTileCols = LangUtil.checkAndGet(conf.mapTileCols, this.defMapTileCols);
      this.mapTileData = LangUtil.checkAndGet(conf.mapTileData, []);
      this.mapGridVisible = LangUtil.checkAndGet(conf.mapGridVisible, this.defMapGridVisible);

      this._mapNode = new Node({
        rotateZ: 0,
        dirtyRenderSupport: true
      });
      this.appendChildNode(this._mapNode);

      this._mapGrid = new Node({
        rotateZ: 0,
        dirtyRenderSupport: true,
      });
      this.appendChildNode(this._mapGrid);

      this._mapCacheCtx = {
        tile: {
          needRender: false,
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          foreInvalid: true,
          foreRender: new CanvasRender({ canvas: doc.createElement('canvas') }),
          backInvalid: true,
          backRender: new CanvasRender({ canvas: doc.createElement('canvas') })
        }
      };

      document.body.appendChild(this._mapCacheCtx.tile.foreRender.getCanvas())
      document.body.appendChild(this._mapCacheCtx.tile.backRender.getCanvas())

      this.addObserver('propertyChanged', functions.onPropertyChanged, this);
    }

    InnerGMap.prototype.addModel = function (model) {
      this._mapNode.appendChildNode(model);
    }

    InnerGMap.prototype.removeModel = function (model, destroy) {
      this._mapNode.removeChildNode(model, destroy);
    }

    return InnerGMap;
  })();

  return GMap;
})();