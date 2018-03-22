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
      var BLOCK_FULL = 0;
      var BLOCK_TOP = 1;
      var BLOCK_RIGHT = 2;
      var BLOCK_BOTTOM = 3;
      var BLOCK_LEFT = 4;
      var BLOCK_TOP_LEFT = 5;
      var BLOCK_TOP_RIGHT = 6;
      var BLOCK_BOTTOM_LEFT = 7;
      var BLOCK_BOTTOM_RIGHT = 8;

      function syncVertexValid () {
        this._renderContext.vertexValid = false;
      }
      function syncSizeValid () {
        this._renderContext.sizeValid = false;
      }
      function syncCacheValid () {
        this._renderContext.cacheValid = false;
      }
      function renderMap (sender, render) {
        var renderContext = this._renderContext;
        this._renderContext.cacheFore.imageCount = 0;
        this._renderContext.cacheBack.imageCount = 0;
        if (!renderContext.cacheValid) {
          renderMapCache.call(this, renderContext);
          renderContext.cacheValid = true;
        }
        if (this.tileType === 1) {
          var x = this.containerLeft - renderContext.x;
          var y = this.containerTop - renderContext.y;
          var width = this.containerRight - this.containerLeft;
          var height = this.containerBottom - this.containerTop;
          render.fillRect(-10, -10, 20, 20);
          render.drawImageExt(renderContext.cacheFore.getCanvas(), x, y, width, height,
            this.containerLeft, this.containerTop, width, height);
        } else {
          var x = this.containerLeft - renderContext.x;
          var y = this.containerTop - renderContext.y;
          var width = this.containerRight - this.containerLeft;
          var height = this.containerBottom - this.containerTop;
          render.fillRect(-10, -10, 20, 20);
          render.drawImageExt(renderContext.cacheFore.getCanvas(), x, y, width, height,
            this.containerLeft, this.containerTop, width, height);
        }
      }
      function renderMapCache (renderContext) {
        if (this.tileType === 1) {
          renderMapCacheSquare.call(this, renderContext);
        } else {
          renderMapCacheDiamond.call(this, renderContext);
        }
      }
      function renderMapBlock (render, fileLoader, tileImg, tileImgClip, tileCell, srcType, tX, tY, tW, tH) {
        var imgClip = tileImgClip[tileCell];
        if (imgClip) {
          var img = tileImg[imgClip.imgId];
          if (img) {
            var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
            if (image) {
              switch (srcType) {
                case BLOCK_FULL:
                  render.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height, tX, tY, tW, tH);
                  break;
                case BLOCK_TOP:
                  render.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2, tX, tY, tW, tH);
                  break;
                case BLOCK_RIGHT:
                  render.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height, tX, tY, tW, tH);
                  break;
                case BLOCK_BOTTOM:
                  render.drawImageExt(image, imgClip.x, imgClip.y + imgClip.height / 2, imgClip.width, imgClip.height / 2, tX, tY, tW, tH);
                  break;
                case BLOCK_LEFT:
                  render.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height, tX, tY, tW, tH);
                  break;
                case BLOCK_TOP_LEFT:
                  render.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height / 2, tX, tY, tW, tH);
                  break;
                case BLOCK_TOP_RIGHT:
                  render.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height / 2, tX, tY, tW, tH);
                  break;
                case BLOCK_BOTTOM_LEFT:
                  render.drawImageExt(image, imgClip.x, imgClip.y + imgClip.height / 2, imgClip.width / 2, imgClip.height / 2, tX, tY, tW, tH);
                  break;
                case BLOCK_BOTTOM_RIGHT:
                  render.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y + imgClip.height / 2, imgClip.width / 2, imgClip.height / 2, tX, tY, tW, tH);
                  break;
                default:
                  break;
              }
            }
          }
        }
      }
      function renderMapCacheSquare (renderContext) {
        var tileWidth = this.tileWidth;
        var tileHeight = this.tileHeight;
        var tileStepWidth = tileWidth;
        var tileStepHeight = tileHeight;

        var oldX = renderContext.x;
        var oldY = renderContext.y;
        var oldWidth = renderContext.width;
        var oldHeight = renderContext.height;
        var newX = oldX;
        var newY = oldY;
        var newWidth = oldWidth;
        var newHeight = oldHeight;

        if (!renderContext.vertexValid) {
          newX = Math.floor(this.containerLeft / tileWidth) * tileWidth;
          newY = Math.floor(this.containerTop / tileHeight) * tileHeight;
          renderContext.x = newX;
          renderContext.y = newY;
          renderContext.vertexValid = true;
        }

        if (!renderContext.sizeValid) {
          newWidth = Math.ceil(this.containerRight / tileWidth)  * tileWidth - newX;
          newHeight = Math.ceil(this.containerBottom / tileHeight) * tileHeight - newY;
          renderContext.width = newWidth;
          renderContext.height = newHeight;
          renderContext.sizeValid = true;
        }
        var tileData = this.tileData;
        if (LangUtil.isNotArray(tileData)) {
          return;
        }
        var sRow = Math.floor(this.containerTop / tileHeight);
        var sCol = Math.floor(this.containerLeft / tileWidth);
        if (renderContext.cacheInit) {
          if (newWidth !== oldWidth || newHeight !== oldHeight || newX !== oldX || newY !== oldY) {
            var clipWidth = Math.min(newWidth + newX, oldWidth + oldX) - Math.max(newX, oldX);
            var clipHeight = Math.min(newHeight + newY, oldHeight + oldY) - Math.max(newY, oldY);
            var clip = clipWidth > 0 && clipHeight > 0;
            var clipTarLeft = 0, clipTarTop = 0, clipTarRight = 0, clipTarBottom = 0;
            var cacheFore = renderContext.cacheBack;
            var cacheBack = renderContext.cacheFore;
            cacheFore.width = newWidth;
            cacheFore.height = newHeight;
            if (clip) {
              var clipSrcLeft = newX > oldX ? (newX - oldX) : 0;
              var clipSrcTop = newY > oldY ? (newY - oldY) : 0;
              clipTarLeft = newX < oldX ? (oldX - newX) : 0;
              clipTarRight = clipWidth + clipTarLeft;
              clipTarTop = newY < oldY ? (oldY - newY) : 0;
              clipTarBottom = clipHeight + clipTarTop;
              cacheFore.drawImageExt(cacheBack.getCanvas(), clipSrcLeft, clipSrcTop, clipWidth, clipHeight,
                clipTarLeft, clipTarTop, clipWidth, clipHeight);
            }

            var fileLoader = this.findApplication().getFileLoader();
            var tileImg = this.tileImg;
            var tileImgClip = this.tileImgClip;
            var tileDataLen = tileData.length;
            for (var row = sRow, tileY = 0; tileY < newHeight && row < tileDataLen; row += 1, tileY += tileStepHeight) {
              var tileRow = tileData[row];
              if (LangUtil.isArray(tileRow)) {
                var tileRowLen = tileRow.length;
                for (var col = sCol, tileX = 0; tileX < newWidth && col < tileRowLen; col += 1, tileX += tileStepWidth) {
                  if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
                    var tileCell = tileRow[col];
                    renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_FULL, tileX, tileY, tileWidth, tileHeight);
                  }
                }
              }
            }
            cacheBack.clear();
            renderContext.cacheBack = cacheBack;
            renderContext.cacheFore = cacheFore;
          }
        } else {
          renderContext.cacheInit = true;
          var cacheFore = renderContext.cacheFore;
          if (newWidth !== oldWidth || newHeight !== oldHeight) {
            cacheFore.width = newWidth;
            cacheFore.height = newHeight;
          }
          var fileLoader = this.findApplication().getFileLoader();
          var tileImg = this.tileImg;
          var tileImgClip = this.tileImgClip;

          var tileDataLen = tileData.length;
          for (var row = sRow, tileY = 0; tileY < newHeight && row < tileDataLen; row += 1, tileY += tileStepHeight) {
            var tileRow = tileData[row];
            if (LangUtil.isArray(tileRow)) {
              var tileRowLen = tileRow.length;
              for (var col = sCol, tileX = 0; tileX < newWidth && col < tileRowLen; col += 1, tileX += tileStepWidth) {
                var tileCell = tileRow[col];
                renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_FULL, tileX, tileY, tileWidth, tileHeight);
              }
            }
          }
        }
      }
      function renderMapCacheDiamond(renderContext) {
        var tileWidth = this.tileWidth;
        var tileHeight = this.tileHeight;
        var tileStepWidth = tileWidth / 2;
        var tileStepHeight = tileHeight / 2;

        var sRow = Math.floor(this.containerTop / tileHeight - this.containerLeft / tileWidth);
        var sCol = Math.floor(this.containerTop / tileHeight + this.containerLeft / tileWidth);
        var eRow = Math.floor(this.containerBottom / tileHeight - this.containerRight / tileWidth);
        var eCol = Math.floor(this.containerBottom / tileHeight + this.containerRight / tileWidth);

        var oldX = renderContext.x;
        var oldY = renderContext.y;
        var oldWidth = renderContext.width;
        var oldHeight = renderContext.height;

        var newX = oldX;
        var newY = oldY;
        var newWidth = oldWidth;
        var newHeight = oldHeight;
        if (!renderContext.vertexValid) {
          newX = (sCol - sRow - 1) * tileStepWidth;
          newY = (sCol + sRow) * tileStepHeight;
          renderContext.x = newX;
          renderContext.y = newY;
          console.log("position", newX, newY);
          renderContext.vertexValid = true;
        }
        if (!renderContext.sizeValid) {
          newWidth = (eCol - eRow + 1) * tileStepWidth - newX;
          newHeight = (eCol + eRow + 2) * tileStepHeight - newY;
          renderContext.width = newWidth;
          renderContext.height = newHeight;
          console.log("size", newWidth, newHeight);
          renderContext.sizeValid = true;
        }
        var tileData = this.tileData;
        if (LangUtil.isNotArray(tileData)) {
          return;
        }

        var edgeLeft = -tileStepWidth;
        var edgeRight = newWidth - tileStepWidth;
        var edgeTop = -tileStepHeight;
        var edgeBottom = newHeight - tileStepHeight;
        var clip = false;
        if (renderContext.cacheInit) {
          if (newWidth !== oldWidth || newHeight !== oldHeight || newX !== oldX || newY !== oldY) {
            var clipWidth = Math.min(newWidth + newX, oldWidth + oldX) - Math.max(newX, oldX);
            var clipHeight = Math.min(newHeight + newY, oldHeight + oldY) - Math.max(newY, oldY);
            clip = clipWidth > 0 && clipHeight > 0;
            if (clip) {
              var clipSrcLeft = newX > oldX ? (newX - oldX) : 0;
              var clipSrcTop = newY > oldY ? (newY - oldY) : 0;
              var clipTarLeft = newX < oldX ? (oldX - newX) : 0;
              var clipTarTop = newY < oldY ? (oldY - newY) : 0;
              var clipTarRight = clipTarLeft + clipWidth;
              var clipTarBottom = clipTarTop + clipHeight;
              var cacheFore = renderContext.cacheBack;
              var cacheBack = renderContext.cacheFore;
              var edgeClipLeft = clipTarLeft - tileStepWidth;
              var edgeClipRight = clipTarRight - tileStepWidth;
              var edgeClipTop = clipTarTop - tileStepHeight;
              var edgeClipBottom = clipTarBottom - tileStepHeight;
              cacheFore.width = newWidth;
              cacheFore.height = newHeight;
              cacheFore.drawImageExt(cacheBack.getCanvas(), clipSrcLeft, clipSrcTop, clipWidth, clipHeight,
                clipTarLeft, clipTarTop, clipWidth, clipHeight);

              var fileLoader = this.findApplication().getFileLoader();
              var tileImg = this.tileImg;
              var tileImgClip = this.tileImgClip;

              var tileDataLen = tileData.length;
              for (var row = sRow, startCol = sCol - 1, startTileX = -tileStepWidth, startTileY = -tileStepHeight;
                   startTileX < newWidth;
                   row -= 1, startCol += 1, startTileX += tileWidth) {
                if (row >= 0 && row < tileDataLen) {
                  var tileRow = tileData[row];
                  if (LangUtil.isArray(tileRow)) {
                    var tileRowLen = tileRow.length;
                    for (var col = startCol, tileX = startTileX, tileY = startTileY;
                         tileX < newWidth && tileY < newHeight;
                         col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                      if (col >= 0 && col < tileRowLen) {
                        var tileCell = tileRow[col];
                        if (tileX < edgeClipLeft || tileX > edgeClipRight || tileY < edgeClipTop || tileY > edgeClipBottom) {
                          if (tileX === edgeLeft) {
                            if (tileY === edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_RIGHT,
                                tileX + tileStepWidth, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                            } else if (tileY === edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_RIGHT,
                                tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                            } else {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_RIGHT,
                                tileX + tileStepWidth, tileY, tileStepWidth, tileHeight);
                            }
                          } else if (tileX === edgeRight) {
                            if (tileY === edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
                                tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                            } else if (tileY === edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                                tileX, tileY, tileStepWidth, tileStepHeight);
                            } else {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_LEFT,
                                tileX, tileY, tileStepWidth, tileHeight);
                            }
                          } else {
                            if (tileY === edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                                tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                            } else if (tileY === edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                                tileX, tileY, tileWidth, tileStepHeight);
                            } else {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_FULL,
                                tileX, tileY, tileWidth, tileHeight);
                            }
                          }
                        } else if (tileX === edgeClipLeft) {
                          if (tileY === edgeClipTop) {
                            if (tileY > edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                                tileX, tileY, tileWidth, tileStepHeight);
                            }
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                              tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                          } else if (tileY === edgeClipBottom) {
                            if (tileY < edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                                tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                            }
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
                              tileX, tileY, tileStepWidth, tileStepHeight);
                          } else {
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_LEFT,
                              tileX, tileY, tileStepWidth, tileHeight);
                          }
                        } else if (tileX === edgeClipRight) {
                          if (tileY === edgeClipTop) {
                            if (tileY > edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                                tileX, tileY, tileWidth, tileStepHeight);
                            }
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_RIGHT,
                              tileX + tileStepWidth, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                          } else if (tileY === edgeClipBottom) {
                            if (tileY < edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                                tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                            }
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_RIGHT,
                              tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                          } else {
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_RIGHT,
                              tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                          }
                        } else {
                          if (tileY === edgeClipTop) {
                            if (tileY > edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                                tileX, tileY, tileWidth, tileStepHeight);
                            }
                          } else if (tileY === edgeClipBottom) {
                            if (tileY < edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                                tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              // 往下面绘制
              for (var row = sRow + 1, startCol = sCol, startTileX = -tileStepWidth, startTileY = 0;
                   startTileY < newHeight;
                   row += 1, startCol += 1, startTileY += tileHeight) {
                if (row >= 0 && col < tileRowLen) {
                  var tileRow = tileData[row];
                  if (LangUtil.isArray(tileRow)) {
                    var tileRowLen = tileRow.length;
                    for (var col = startCol, tileX = startTileX, tileY = startTileY;
                         tileX < newWidth && tileY < newHeight;
                         col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                      if (col >= 0 && col < tileRowLen) {
                        var tileCell = tileRow[col];
                        if (tileX < edgeClipLeft || tileX > edgeClipRight || tileY < edgeClipTop || tileY > edgeClipBottom) {
                          if (tileX === edgeLeft) {
                            if (tileY === edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_RIGHT,
                                tileX + tileStepWidth, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                            } else if (tileY === edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_RIGHT,
                                tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                            } else {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_RIGHT,
                                tileX + tileStepWidth, tileY, tileStepWidth, tileHeight);
                            }
                          } else if (tileX === edgeRight) {
                            if (tileY === edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
                                tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                            } else if (tileY === edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                                tileX, tileY, tileStepWidth, tileStepHeight);
                            } else {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_LEFT,
                                tileX, tileY, tileStepWidth, tileHeight);
                            }
                          } else {
                            if (tileY === edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                                tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                            } else if (tileY === edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                                tileX, tileY, tileWidth, tileStepHeight);
                            } else {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_FULL,
                                tileX, tileY, tileWidth, tileHeight);
                            }
                          }
                        } else if (tileX === edgeClipLeft) {
                          if (tileY === edgeClipTop) {
                            if (tileY > edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                                tileX, tileY, tileWidth, tileStepHeight);
                            }
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                              tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                          } else if (tileY === edgeClipBottom) {
                            if (tileY < edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                                tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                            }
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
                              tileX, tileY, tileStepWidth, tileStepHeight);
                          } else {
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_LEFT,
                              tileX, tileY, tileStepWidth, tileHeight);
                          }
                        } else if (tileX === edgeClipRight) {
                          if (tileY === edgeClipTop) {
                            if (tileY > edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                                tileX, tileY, tileWidth, tileStepHeight);
                            }
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_RIGHT,
                              tileX + tileStepWidth, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                          } else if (tileY === edgeClipBottom) {
                            if (tileY < edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                                tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                            }
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_RIGHT,
                              tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                          } else {
                            renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_RIGHT,
                              tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                          }
                        } else {
                          if (tileY === edgeClipTop) {
                            if (tileY > edgeTop) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                                tileX, tileY, tileWidth, tileStepHeight);
                            }
                          } else if (tileY === edgeClipBottom) {
                            if (tileY < edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                                tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            renderContext.cacheFore = cacheFore;
            renderContext.cacheBack = cacheBack;
          } else {
            clip = true;
          }
        }

        if (!clip) {
          var cacheFore;
          if (renderContext.cacheInit) {
            cacheFore = renderContext.cacheFore;
            if (newWidth === oldWidth && newHeight === oldHeight) {
              cacheFore.clear();
            } else {
              cacheFore.width = newWidth;
              cacheFore.height = newHeight;
            }
          } else {
            // renderContext.cacheInit = true;
            cacheFore = renderContext.cacheFore;
            cacheFore.clear();
            cacheFore.width = newWidth;
            cacheFore.height = newHeight;
          }
          var fileLoader = this.findApplication().getFileLoader();
          var tileImg = this.tileImg;
          var tileImgClip = this.tileImgClip;
          var tileDataLen = tileData.length;
          // 往上面绘制
          for (var row = sRow, startCol = sCol - 1, startTileX = -tileStepWidth, startTileY = -tileStepHeight;
               startTileX < newWidth;
               row -= 1, startCol += 1, startTileX += tileWidth) {
            if (row >= 0 && row < tileDataLen) {
              var tileRow = tileData[row];
              if (LangUtil.isArray(tileRow)) {
                var tileRowLen = tileRow.length;
                for (var col = startCol, tileX = startTileX, tileY = startTileY;
                     tileX < newWidth && tileY < newHeight;
                     col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                  if (col >= 0 && col < tileRowLen) {
                    var tileCell = tileRow[col];
                    if (tileX === edgeLeft) {
                      if (tileY === edgeTop) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_RIGHT,
                          tileX + tileStepWidth, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                      } else if (tileY === edgeBottom) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_RIGHT,
                          tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                      } else {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_RIGHT,
                          tileX + tileStepWidth, tileY, tileStepWidth, tileHeight);
                      }
                    } else if (tileX === edgeRight) {
                      if (tileY === edgeTop) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
                          tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                      } else if (tileY === edgeBottom) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                          tileX, tileY, tileStepWidth, tileStepHeight);
                      } else {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_LEFT,
                          tileX, tileY, tileStepWidth, tileHeight);
                      }
                    } else {
                      if (tileY === edgeTop) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                          tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                      } else if (tileY === edgeBottom) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                          tileX, tileY, tileWidth, tileStepHeight);
                      } else {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_FULL,
                          tileX, tileY, tileWidth, tileHeight);
                      }
                    }
                  }
                }
              }
            }
          }
          // 往下面绘制
          for (var row = sRow + 1, startCol = sCol, startTileX = -tileStepWidth, startTileY = tileStepHeight;
               startTileY < newHeight;
               row += 1, startCol += 1, startTileY += tileHeight) {
            if (row >= 0 && col < tileRowLen) {
              var tileRow = tileData[row];
              if (LangUtil.isArray(tileRow)) {
                var tileRowLen = tileRow.length;
                for (var col = startCol, tileX = startTileX, tileY = startTileY;
                     tileX < newWidth && tileY < newHeight;
                     col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                  if (col >= 0 && col < tileRowLen) {
                    var tileCell = tileRow[col];
                    if (tileX === edgeLeft) {
                      if (tileY === edgeTop) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_RIGHT,
                          tileX + tileStepWidth, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                      } else if (tileY === edgeBottom) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_RIGHT,
                          tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                      } else {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_RIGHT,
                          tileX + tileStepWidth, tileY, tileStepWidth, tileHeight);
                      }
                    } else if (tileX === edgeRight) {
                      if (tileY === edgeTop) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
                          tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                      } else if (tileY === edgeBottom) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                          tileX, tileY, tileStepWidth, tileStepHeight);
                      } else {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_LEFT,
                          tileX, tileY, tileStepWidth, tileHeight);
                      }
                    } else {
                      if (tileY === edgeTop) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM,
                          tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                      } else if (tileY === edgeBottom) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP,
                          tileX, tileY, tileWidth, tileStepHeight);
                      } else {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_FULL,
                          tileX, tileY, tileWidth, tileHeight);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      function loadImageFinished() {
        this._renderContext.cacheInit = false;
        this.refresh();
      }

      return {
        syncVertexValid: syncVertexValid,
        syncSizeValid: syncSizeValid,
        syncCacheValid: syncCacheValid,
        renderMap: renderMap
      }
    })();

    var GTiledMap = (function () {
      var InnerGTiledMap = LangUtil.extend(GMap);

      InnerGTiledMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('tileType', LangUtil.checkAndGet(conf.tileType, 1));
        this.defineNotifyProperty('tileWidth', LangUtil.checkAndGet(conf.tileWidth, 50));
        this.defineNotifyProperty('tileHeight', LangUtil.checkAndGet(conf.tileHeight, 50));
        this.defineNotifyProperty('tileImg', LangUtil.checkAndGet(conf.tileImg, {}));
        this.defineNotifyProperty('tileImgClip', LangUtil.checkAndGet(conf.tileImgClip, {}));
        this.defineNotifyProperty('tileData', LangUtil.checkAndGet(conf.tileData, {}));

        this._renderContext = {
          vertexValid: false,
          x: 0,
          y: 0,
          sizeValid: false,
          width: 0,
          height: 0,
          cacheInit: false,
          cacheValid: false,
          cacheFore: new CanvasRender({canvas: doc.createElement('canvas')}),
          cacheBack: new CanvasRender({canvas: doc.createElement('canvas')})
        }

        this.addObserver('tileTypeChanged', functions.syncVertexValid, this, this);
        this.addObserver('tileWidthChanged', functions.syncVertexValid, this, this);
        this.addObserver('tileHeightChanged', functions.syncVertexValid, this, this);
        this.addObserver('containerTopChanged', functions.syncVertexValid, this, this);
        this.addObserver('containerLeftChanged', functions.syncVertexValid, this, this);

        this.addObserver('tileWidthChanged', functions.syncSizeValid, this, this);
        this.addObserver('tileHeightChanged', functions.syncSizeValid, this, this);
        this.addObserver('containerTopChanged', functions.syncSizeValid, this, this);
        this.addObserver('containerBottomChanged', functions.syncSizeValid, this, this);
        this.addObserver('containerLeftChanged', functions.syncSizeValid, this, this);
        this.addObserver('containerRightChanged', functions.syncSizeValid, this, this);

        this.addObserver('tileTypeChanged', functions.syncCacheValid, this, this);
        this.addObserver('tileWidthChanged', functions.syncCacheValid, this, this);
        this.addObserver('tileHeightChanged', functions.syncCacheValid, this, this);
        this.addObserver('containerTopChanged', functions.syncCacheValid, this, this);
        this.addObserver('containerBottomChanged', functions.syncCacheValid, this, this);
        this.addObserver('containerLeftChanged', functions.syncCacheValid, this, this);
        this.addObserver('containerRightChanged', functions.syncCacheValid, this, this);

        this.addObserver('render', functions.renderMap, this, this);
      }

      InnerGTiledMap.prototype.invalidAndRefresh = function () {
        this._renderContext.init = false;
        this._renderContext.valid = false;
        this.refresh();
      }

      return InnerGTiledMap;
    })();

    return GTiledMap;
  }
)();
