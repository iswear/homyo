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
      function syncVertexValid () {
        this._renderContext.vertexValid = false;
      }
      function syncSizeValid () {
        this._renderContext.sizeValid = false;
      }
      function syncCacheValid () {
        this._renderContext.cacheValid = false;
      }
      function renderTiledMap (sender, render) {
        var renderContext = this._renderContext;
        this._renderContext.cacheFore.imageCount = 0;
        this._renderContext.cacheBack.imageCount = 0;
        if (!renderContext.cacheValid) {
          renderTiledMapCache.call(this);
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
      function renderTiledMapCache () {
        var renderContext = this._renderContext;
        if (this.tileType === 1) {
          renderTiledMapCacheType1.call(this, renderContext);
        } else {
          renderTiledMapCacheTypeOther.call(this, renderContext);
        }
      }
      function renderTiledMapCacheType1 (renderContext) {
        var oldX = renderContext.x;
        var oldY = renderContext.y;
        var oldWidth = renderContext.width;
        var oldHeight = renderContext.height;
        var newX = oldX;
        var newY = oldY;
        var newWidth = oldWidth;
        var newHeight = oldHeight;

        if (!renderContext.vertexValid) {
          newX = Math.floor(this.containerLeft / this.tileWidth) * this.tileWidth;
          newY = Math.floor(this.containerTop / this.tileHeight) * this.tileHeight;
          renderContext.x = newX;
          renderContext.y = newY;
          renderContext.vertexValid = true;
        }

        if (!renderContext.sizeValid) {
          newWidth = Math.ceil(this.containerRight / this.tileWidth)  * this.tileWidth - newX;
          newHeight = Math.ceil(this.containerBottom / this.tileHeight) * this.tileHeight - newY;
          renderContext.width = newWidth;
          renderContext.height = newHeight;
          renderContext.sizeValid = true;
          console.warn(newX, newY, newWidth, newHeight);
        }

        var sRow = Math.floor(this.containerTop / this.tileHeight);
        var sCol = Math.floor(this.containerLeft / this.tileWidth);
        if (renderContext.cacheInit) {
          if (newWidth !== oldWidth || newHeight !== oldHeight || newX !== oldX || newY !== oldY) {
            var clipWidth = Math.min(newWidth + newX, oldWidth + oldX) - Math.max(newX, oldX);
            var clipHeight = Math.min(newHeight + newY, oldHeight + oldY) - Math.max(newY, oldY);
            var clip = clipWidth > 0 && clipHeight > 0;
            var clipTarLeft = 0, clipTarTop = 0, clipTarRight = 0, clipTarBottom = 0;
            var cacheFore = renderContext.cacheFore;
            var cacheBack = renderContext.cacheBack;
            cacheBack.width = newWidth;
            cacheBack.height = newHeight;
            if (clip) {
              var clipSrcLeft = newX > oldX ? (newX - oldX) : 0;
              var clipSrcTop = newY > oldY ? (newY - oldY) : 0;
              clipTarLeft = newX < oldX ? (oldX - newX) : 0;
              clipTarRight = clipWidth + clipTarLeft;
              clipTarTop = newY < oldY ? (oldY - newY) : 0;
              clipTarBottom = clipHeight + clipTarTop;
              cacheBack.drawImageExt(cacheFore.getCanvas(), clipSrcLeft, clipSrcTop, clipWidth, clipHeight,
                clipTarLeft, clipTarTop, clipWidth, clipHeight);
            }

            var tileData = this.tileData
            if (LangUtil.isArray(tileData)) {
              var fileLoader = this.findApplication().getFileLoader();
              var tileWidth = this.tileWidth;
              var tileHeight = this.tileHeight;
              var tileStepWidth = tileWidth;
              var tileStepHeight = tileHeight;
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
                      var imgClip = tileImgClip[tileCell];
                      if (imgClip) {
                        var img = tileImg[imgClip.imgId];
                        if (img) {
                          var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                          if (image) {
                            cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height,
                              tileX, tileY, tileWidth, tileHeight);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            cacheFore.clear();
            renderContext.cacheBack = cacheFore;
            renderContext.cacheFore = cacheBack;
          }
        } else {
          renderContext.cacheInit = true;
          var cacheFore = renderContext.cacheFore;
          if (newWidth !== oldWidth || newHeight !== oldHeight) {
            cacheFore.width = newWidth;
            cacheFore.height = newHeight;
          }
          var tileData = this.tileData
          if (LangUtil.isArray(tileData)) {
            var fileLoader = this.findApplication().getFileLoader();
            var tileWidth = this.tileWidth;
            var tileHeight = this.tileHeight;
            var tileStepWidth = tileWidth;
            var tileStepHeight = tileHeight;
            var tileImg = this.tileImg;
            var tileImgClip = this.tileImgClip;
            var tileDataLen = tileData.length;

            for (var row = sRow, tileY = 0; tileY < newHeight && row < tileDataLen; row += 1, tileY += tileStepHeight) {
              var tileRow = tileData[row];
              if (LangUtil.isArray(tileRow)) {
                var tileRowLen = tileRow.length;
                for (var col = sCol, tileX = 0; tileX < newWidth && col < tileRowLen; col += 1, tileX += tileStepWidth) {
                  var tileCell = tileRow[col];
                  var imgClip = tileImgClip[tileCell];
                  if (imgClip) {
                    var img = tileImg[imgClip.imgId];
                    if (img) {
                      var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                      if (image) {
                        cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height,
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
      function renderTiledMapCacheTypeOther (renderContext) {
        var tileWidth = this.tileWidth;
        var tileHeight = this.tileHeight;
        var tileStepWidth = tileWidth / 2;
        var tileStepHeight = tileHeight / 2;

        var sRow = Math.floor(this.containerTop / this.tileHeight - this.containerLeft / this.tileWidth);
        var sCol = Math.floor(this.containerTop / this.tileHeight + this.containerLeft / this.tileWidth);
        var eRow = Math.floor(this.containerBottom / this.tileHeight - this.containerRight / this.tileWidth);
        var eCol = Math.floor(this.containerBottom / this.tileHeight + this.containerRight / this.tileWidth);

        if ((eRow + eCol - sRow - sCol) % 2 !== 0) {
          eCol += 1;
        }

        var oldX = renderContext.x;
        var oldY = renderContext.y;
        var oldWidth = renderContext.width;
        var oldHeight = renderContext.height;
        var newX = oldX;
        var newY = oldY;
        var newWidth = oldWidth;
        var newHeight = oldHeight;
        if (!renderContext.vertexValid) {
          newX = (sCol - sRow - 2) * this.tileWidth / 2;
          newY = (sCol + sRow) * this.tileHeight / 2;
          renderContext.x = newX;
          renderContext.y = newY;
          renderContext.vertexValid = true;
        }
        if (!renderContext.sizeValid) {
          newWidth = (eCol - eRow + 2) * this.tileWidth / 2 - newX;
          newHeight = (eCol + eRow + 2) * this.tileHeight / 2  - newY;
          renderContext.width = newWidth;
          renderContext.height = newHeight;
          renderContext.sizeValid = true;
          console.log(newX / 64, newY / 32, newWidth / 64, newHeight / 32);
        }
        var clip = false;
        if (renderContext.cacheInit) {
          if (newWidth !== oldWidth || newHeight !== oldHeight || newX !== oldX || newY !== oldY) {
            var clipWidth = Math.min(newWidth + newX, oldWidth + oldX) - Math.max(newX, oldX);
            var clipHeight = Math.min(newHeight + newY, oldHeight + oldY) - Math.max(newY, oldY);
            clip = clipWidth > 0 && clipHeight > 0;
            var clipTarLeft = 0, clipTarTop = 0, clipTarRight = 0, clipTarBottom = 0;
            var cacheFore = renderContext.cacheFore;
            var cacheBack = renderContext.cacheBack;
            cacheBack.width = newWidth;
            cacheBack.height = newHeight;
            if (clip) {
              var clipSrcLeft = newX > oldX ? (newX - oldX) : 0;
              var clipSrcTop = newY > oldY ? (newY - oldY) : 0;
              clipTarLeft = newX < oldX ? (oldX - newX) : 0;
              clipTarRight = clipTarLeft + clipWidth;
              clipTarTop = newY < oldY ? (oldY - newY) : 0;
              clipTarBottom = clipTarTop + clipHeight;
              cacheBack.drawImageExt(cacheFore.getCanvas(), clipSrcLeft, clipSrcTop, clipWidth, clipHeight,
                clipTarLeft, clipTarTop, clipWidth, clipHeight);
            }

            var tileData = this.tileData
            if (LangUtil.isArray(tileData)) {
              var fileLoader = this.findApplication().getFileLoader();
              var tileImg = this.tileImg;
              var tileImgClip = this.tileImgClip;
              var tileDataLen = tileData.length;
              var tClipTarLeft = clipTarLeft - tileStepWidth;
              var tClipTarRight = clipTarRight - tileStepWidth;
              var tClipTarTop = clipTarTop - tileStepHeight;
              var tClipTarBottom = clipTarBottom - tileStepHeight;
              // 往上面绘制
              for (var row = sRow, startCol = sCol - 1, startTileX = 0, startTileY = -tileStepHeight;
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
                        var imgClip = tileImgClip[tileCell];
                        if (imgClip) {
                          var img = tileImg[imgClip.imgId];
                          if (img) {
                            var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                            if (image) {
                              if (tileY < 0) {
                                if (!clip || tileX < clipTarLeft || tileX >= clipTarRight || clipTarTop > 0) {
                                  cacheBack.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                    tileX, 0, tileWidth, tileStepHeight);
                                }
                              } else if (newHeight < tileY + tileHeight) {
                                if (!clip || tileX < clipTarLeft || tileX >= clipTarRight || clipTarBottom < newHeight) {
                                  cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                    tileX, tileY, tileWidth, tileStepHeight);
                                }
                              } else if (tileX < 0) {
                                if (!clip || tileY < clipTarTop || tileY >= clipTarBottom || clipTarLeft > 0) {
                                  cacheBack.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height,
                                    0, tileY, tileStepWidth, tileHeight);
                                }
                              } else if (newWidth < tileX + tileWidth) {
                                if (!clip || tileY < clipTarTop || tileY >= clipTarBottom || clipTarRight < newWidth) {
                                  cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                    tileX, tileY, tileStepWidth, tileHeight);
                                }
                              } else {
                                if (clip) {
                                  if (tileX >= tClipTarLeft && tileX <= tClipTarRight && tileY >= tClipTarTop && tileY <= tClipTarBottom) {
                                    if (tileX === tClipTarLeft) {
                                      cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                        tileX, tileY, tileStepWidth, tileHeight);
                                      if (tileY === tClipTarTop) {
                                        cacheBack.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height / 2,
                                          tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                                      } else if (tileY === tClipTarBottom) {
                                        cacheBack.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y + imgClip.height / 2, imgClip.width / 2, imgClip.height / 2,
                                          tileX + tileStepWidth, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                                      }
                                    } else if (tileX === tClipTarRight) {
                                      cacheBack.drawImageExt(image, (imgClip.x + imgClip.width / 2), imgClip.y, imgClip.width / 2, imgClip.height,
                                        tileX + tileStepWidth, tileY, tileStepWidth, tileHeight);
                                      if (tileY === tClipTarTop) {
                                        cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height / 2,
                                          tileX, tileY, tileStepWidth, tileStepHeight);
                                      } else if (tileY === tClipTarBottom) {
                                        cacheBack.drawImageExt(image, imgClip.x, imgClip.y + imgClip.height / 2, imgClip.width / 2, imgClip.height / 2,
                                          tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                                      }
                                    } else if (tileY === tClipTarTop) {
                                      cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                        tileX, tileY, tileWidth, tileStepHeight);
                                    } else if (tileY === tClipTarBottom) {
                                      cacheBack.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                        tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                                    }
                                  } else {
                                    cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height,
                                      tileX, tileY, tileWidth, tileHeight);
                                  }
                                } else {
                                  cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height,
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
              }
              // 向下方绘制
              for (var row = sRow + 1, startCol = sCol - 1, startTileX = -tileStepWidth, startTileY = 0;
                   startTileY < newHeight && row < tileDataLen;
                   row += 1, startCol += 1, startTileY += tileHeight) {
                if (row >= 0 && row < tileDataLen) {
                  var tileRow = tileData[row];
                  if (LangUtil.isArray(tileRow)) {
                    var tileRowLen = tileRow.length;
                    for (var col = startCol, tileX = startTileX, tileY = startTileY;
                         tileX < newWidth && tileY < newHeight && col < tileRowLen;
                         col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                      if (col >= 0 && col < tileRowLen) {
                        var tileCell = tileRow[col];
                        var imgClip = tileImgClip[tileCell];
                        if (imgClip) {
                          var img = tileImg[imgClip.imgId];
                          if (img) {
                            var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                            if (image) {
                              if (tileY < 0) {
                                if (!clip || tileX < clipTarLeft || tileX >= clipTarRight || clipTarTop > 0) {
                                  cacheBack.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                    tileX, 0, tileWidth, tileStepHeight);
                                }
                              } else if (newHeight < tileY + tileHeight) {
                                if (!clip || tileX < clipTarLeft || tileX >= clipTarRight || clipTarBottom < newHeight) {
                                  cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                    tileX, tileY, tileWidth, tileStepHeight);
                                }
                              } else if (tileX < 0) {
                                if (!clip || tileY < clipTarTop || tileY >= clipTarBottom || clipTarLeft > 0) {
                                  cacheBack.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height,
                                    0, tileY, tileStepWidth, tileHeight);
                                }
                              } else if (newWidth < tileX + tileWidth) {
                                if (!clip || tileY < clipTarTop || tileY >= clipTarBottom || clipTarRight < newWidth) {
                                  cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                    tileX, tileY, tileStepWidth, tileHeight);
                                }
                              } else {
                                if (clip) {
                                  if (tileX >= tClipTarLeft && tileX <= tClipTarRight && tileY >= tClipTarTop && tileY <= tClipTarBottom) {
                                    if (tileX === tClipTarLeft) {
                                      cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                        tileX, tileY, tileStepWidth, tileHeight);
                                      if (tileY === tClipTarTop) {
                                        cacheBack.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height / 2,
                                          tileX + tileStepWidth, tileY, tileStepWidth, tileStepHeight);
                                      } else if (tileY === tClipTarBottom) {
                                        cacheBack.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y + imgClip.height / 2, imgClip.width / 2, imgClip.height / 2,
                                          tileX + tileStepWidth, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                                      }
                                    } else if (tileX === tClipTarRight) {
                                      cacheBack.drawImageExt(image, (imgClip.x + imgClip.width / 2), imgClip.y, imgClip.width / 2, imgClip.height,
                                        tileX + tileStepWidth, tileY, tileStepWidth, tileHeight);
                                      if (tileY === tClipTarTop) {
                                        cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height / 2,
                                          tileX, tileY, tileStepWidth, tileStepHeight);
                                      } else if (tileY === tClipTarBottom) {
                                        cacheBack.drawImageExt(image, imgClip.x, imgClip.y + imgClip.height / 2, imgClip.width / 2, imgClip.height / 2,
                                          tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                                      }
                                    } else if (tileY === tClipTarTop) {
                                      cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                        tileX, tileY, tileWidth, tileStepHeight);
                                    } else if (tileY === tClipTarBottom) {
                                      cacheBack.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                        tileX, tileY + tileStepHeight, tileWidth, tileStepHeight);
                                    }
                                  } else {
                                    cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height,
                                      tileX, tileY, tileWidth, tileHeight);
                                  }
                                } else {
                                  cacheBack.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height,
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
              }
            }
            cacheFore.clear();
            renderContext.cacheBack = cacheFore;
            renderContext.cacheFore = cacheBack;
          }
        } else {
          renderContext.cacheInit = true;
          var cacheFore = renderContext.cacheFore;
          if (newWidth !== oldWidth || newHeight !== oldHeight) {
            cacheFore.width = newWidth;
            cacheFore.height = newHeight;
          } else {
            cacheFore.clear();
          }
          var tileData = this.tileData
          if (LangUtil.isArray(tileData)) {
            var fileLoader = this.findApplication().getFileLoader();
            var tileImg = this.tileImg;
            var tileImgClip = this.tileImgClip;
            var tileDataLen = tileData.length;
            var srcX, srcY, srcWidth, srcHeight, desX, desY, desWidth, desHeight;
            // 往上面绘制
            for (var row = sRow, startCol = sCol - 1, startTileX = 0, startTileY = -tileStepHeight;
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
                      var imgClip = tileImgClip[tileCell];
                      if (imgClip) {
                        var img = tileImg[imgClip.imgId];
                        if (img) {
                          var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                          if (image) {
                            if (tileY < 0) {
                              cacheFore.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                tileX, 0, tileWidth, tileStepHeight);
                            } else if (newHeight < tileY + tileHeight) {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                tileX, tileY, tileWidth, tileStepHeight);
                            } else if (tileX < 0) {
                              cacheFore.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height,
                                0, tileY, tileStepWidth, tileHeight);
                            } else if (newWidth < tileX + tileWidth) {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                tileX, tileY, tileStepWidth, tileHeight);
                            } else {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height,
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
            // 向下方绘制
            for (var row = sRow + 1, startCol = sCol - 1, startTileX = -tileStepWidth, startTileY = 0;
                 startTileY < newHeight;
                 row += 1, startCol += 1, startTileY += tileHeight) {
              if (row >= 0 && row < tileDataLen) {
                var tileRow = tileData[row];
                if (LangUtil.isArray(tileRow)) {
                  var tileRowLen = tileRow.length;
                  for (var col = startCol, tileX = startTileX, tileY = startTileY;
                       tileX < newWidth && tileY < newHeight;
                       col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                    if (col >= 0 && col < tileRowLen) {
                      var tileCell = tileRow[col];
                      var imgClip = tileImgClip[tileCell];
                      if (imgClip) {
                        var img = tileImg[imgClip.imgId];
                        if (img) {
                          var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                          if (image) {
                            if (tileY < 0) {
                              cacheFore.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                tileX, 0, tileWidth, tileStepHeight);
                            } else if (newHeight < tileY + tileHeight) {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                tileX, tileY, tileWidth, tileStepHeight);
                            } else if (tileX < 0) {
                              cacheFore.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height,
                                0, tileY, tileStepWidth, tileHeight);
                            } else if (newWidth < tileX + tileWidth) {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                tileX, tileY, tileStepWidth, tileHeight);
                            } else {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height,
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
        renderTiledMap: renderTiledMap
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

        this.addObserver('render', functions.renderTiledMap, this, this);
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
