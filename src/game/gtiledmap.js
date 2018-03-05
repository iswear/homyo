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
      function syncTileType () {
        if (this.tileType === 1) {
          this.addObserver('tileWidthChanged', syncSinCosValid, this, this);
          this.addObserver('tileHeightChanged', syncSinCosValid, this, this);
        } else {
          this.removeObserver('tileWidthChanged', syncSinCosValid, this, this);
          this.removeObserver('tileHeightChanged', syncSinCosValid, this, this);
        }
        syncSinCosValid.call(this);
      }
      function syncSinCosValid () {
        this._renderContext.sinCosValid = false;
      }
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
        if (!renderContext.cacheValid) {
          renderTiledMapCache.call(this);
          renderContext.cacheValid = true;
        }
        if (this.tileType === 1) {
          var x = this.containerLeft - (Math.floor(this.containerLeft / this.tileWidth)) * this.tileWidth;
          var y = this.containerTop - (Math.floor(this.containerTop / this.tileHeight)) * this.tileHeight;
          var width = this.containerRight - this.containerLeft;
          var height = this.containerBottom - this.containerTop;
          render.drawImageExt(renderContext.cacheFore.getCanvas(), x, y, width, height,
            this.containerLeft, this.containerTop, width, height);
          render.fillStyle = '#f00';
          render.fillRect(-5, -5, 10, 10);
        } else {
          var x = this.containerLeft - (Math.floor(this.containerLeft / this.tileWidth)) * this.tileWidth;
          var y = this.containerTop - (Math.floor(this.containerTop / this.tileHeight)) * this.tileHeight;
          var width = this.containerRight - this.containerLeft;
          var height = this.containerBottom - this.containerTop;
          console.warn(x, y, width, height);
          render.drawImageExt(renderContext.cacheFore.getCanvas(), x, y, width, height,
            this.containerLeft, this.containerTop, width, height);
          render.fillStyle = '#f00';
          render.fillRect(-5, -5, 10, 10);
        }
      }
      function renderTiledMapCache () {
        var renderContext = this._renderContext;
        if (!renderContext.sinCosValid) {
          if (this.tileType === 1) {
            renderContext.sin = 0;
            renderContext.cos = 0;
          } else {
            renderContext.sin = this.tileHeight / Math.sqrt(Math.pow(this.tileWidth, 2) + Math.pow(this.tileHeight, 2));
            renderContext.cos = this.tileWidth / Math.sqrt(Math.pow(this.tileWidth, 2) + Math.pow(this.tileHeight, 2));
          }
          renderContext.sinCosValid = true;
        }
        if (this.tileType === 1) {
          renderTiledMapCacheType1.call(this, renderContext);
        } else {
          renderTiledMapCacheTypeOther.call(this, renderContext);
        }
      }
      function renderTiledMapCacheType1 (renderContext) {
        var oldX = renderContext.x;
        var oldY = renderContext.y
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
              clipTarRight = newWidth + clipTarLeft;
              clipTarTop = newY < oldY ? (oldY - newY) : 0;
              clipTarBottom = newHeight + clipTarTop;
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
                          if (image !== null) {
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
            cacheFore.clear();
            renderContext.cacheBack = cacheFore;
            renderContext.cacheFore = cacheBack;
          }
        } else {
          // renderContext.cacheInit = true;
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
                      if (image !== null) {
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
        var oldX = renderContext.x;
        var oldY = renderContext.y;
        var oldWidth = renderContext.width;
        var oldHeight = renderContext.height;
        var newX = oldX;
        var newY = oldY;
        var newWidth = oldWidth;
        var newHeight = oldHeight;
        if (!renderContext.vertexValid){
          newX = Math.floor(this.containerLeft / this.tileWidth) * this.tileWidth;
          newY = (Math.floor(this.containerLeft / this.tileHeight) - 0.5) * this.tileHeight;
          renderContext.x = newX;
          renderContext.y = newY;
          renderContext.vertexValid = true;
        }
        if (!renderContext.sizeValid) {
          newWidth = Math.ceil(this.containerRight / this.tileWidth) * this.tileWidth - newX;
          newHeight = (Math.ceil(this.containerBottom / this.tileHeight) + 0.5) * this.tileHeight - newY;
          renderContext.width = newWidth;
          renderContext.height = newHeight;
          renderContext.sizeValid = true;
        }

        const sRow = Math.floor(this.containerTop / this.tileHeight - this.containerLeft / this.tileWidth);
        const sCol = Math.floor(this.containerLeft / this.tileWidth + this.containerTop / this.tileHeight);
        if (renderContext.cacheInit) {
          if (newWidth !== oldWidth || newHeight !== oldHeight || newX !== oldX || newY !== oldY) {
            var clipWidth = Math.min(newWidth + newX, oldWidth + oldX) - Math.max(newX, oldX);
            var clipHeight = Math.min(newHeight + newY, oldHeight + oldY) - Math.max(newY, oldY);
            var clip = clipWidth > 0 && clipHeight > 0;
            var clipTarLeft = 0, clipTarTop = 0, clipTarRight = 0, clipTarBottom = 0;
            var cacheFore = renderContext.cacheFore;
            var cacheBack = renderContext.cacheBack;
            cacheBack.width = newWidth;
            cacheFore.height = newHeight;
            if (clip) {
              var clipSrcLeft = newX > oldX ? (newX - oldX) : 0;
              var clipSrcTop = newY > oldY ? (newY - oldY) : 0;
              clipTarLeft = newX < oldX ? (oldX - newX) : 0;
              clipTarRight = newWidth + clipTarLeft;
              clipTarTop = newY < oldY ? (oldY - newY) : 0;
              clipTarBottom = newHeight + clipTarTop;
              cacheBack.drawImageExt(cacheFore.getCanvas(), clipSrcLeft, clipTarTop, clipWidth, clipHeight,
                clipTarLeft, clipTarTop, clipWidth, clipHeight);
            }

            var tileData = this.tileData
            if (LangUtil.isArray(tileData)) {
              var fileLoader = this.findApplication().getFileLoader();
              var tileWidth = this.tileWidth;
              var tileHeight = this.tileHeight;
              var tileStepWidth = tileWidth / 2;
              var tileStepHeight = tileHeight / 2;
              var tileImg = this.tileImg;
              var tileImgClip = this.tileImgClip;
              var tileDataLen = tileData.length;
              // 往上面绘制
              for (var row = sRow - 1, startCol = sCol - 1, startTileX = 0, startTileY = -tileStepHeight;
                   startTileX < newWidth && row < tileDataLen;
                   row -= 1, startCol += 1, startTileX += tileWidth) {
                if (row >= 0) {
                  var tileRow = tileData[row];
                  if (LangUtil.isArray(tileRow)) {
                    var tileRowLen = tileRow.length;
                    for (var col = startCol, tileX = startTileX, tileY = startTileY;
                         tileX < newWidth && tileY < newHeight && col < tileRowLen;
                         col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                      if (col >= 0) {
                        var tileCell = tileRow[col];
                        var imgClip = tileImgClip[tileCell];
                        if (imgClip) {
                          var img = tileImg[imgClip.imgId];
                          if (img) {
                            var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                            if (image !== null) {
                              if (tileY < 0) {
                                if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && 0 >= clipTarTop && 0 < clipTarBottom)) {
                                  cacheFore.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                    tileX, 0, tileWidth, tileHeight / 2);
                                }
                              } else if (newHeight < tileY + tileHeight) {
                                if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
                                  cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                    tileX, tileY, tileWidth, tileHeight / 2);
                                }
                              } else if (tileX < 0) {
                                if (!(clip && 0 >= clipTarLeft && 0 < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
                                  cacheFore.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height,
                                    0, tileY, tileWidth / 2, tileHeight);
                                }
                              } else if (newWidth < tileX + tileWidth) {
                                if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
                                  cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                    tileX, tileY, tileWidth / 2, tileHeight);
                                }
                              } else {
                                if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
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
              // 向下方绘制
              for (var row = sRow, startCol = sCol - 1, startTileX = -tileStepWidth, startTileY = 0;
                   startTileY < newHeight && row < tileDataLen;
                   row += 1, startCol += 1, startTileY += tileHeight) {
                if (row >= 0) {
                  var tileRow = tileData[row];
                  if (LangUtil.isArray(tileRow)) {
                    var tileRowLen = tileRow.length;
                    for (var col = startCol, tileX = startTileX, tileY = startTileY;
                         tileX < newWidth && tileY < newHeight && col < tileRowLen;
                         col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                      if (col > 0) {
                        var tileCell = tileRow[col];
                        var imgClip = tileImgClip[tileCell];
                        if (imgClip) {
                          var img = tileImg[imgClip.imgId];
                          if (img) {
                            var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                            if (image !== null) {
                              if (tileY < 0) {
                                if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && 0 >= clipTarTop && 0 < clipTarBottom)) {
                                  cacheFore.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                    tileX, 0, tileWidth, tileHeight / 2);
                                }
                              } else if (newHeight < tileY + tileHeight) {
                                if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
                                  cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                    tileX, tileY, tileWidth, tileHeight / 2);
                                }
                              } else if (tileX < 0) {
                                if (!(clip && 0 >= clipTarLeft && 0 < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
                                  cacheFore.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height,
                                    0, tileY, tileWidth / 2, tileHeight);
                                }
                              } else if (newWidth < tileX + tileWidth) {
                                if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
                                  cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                    tileX, tileY, tileWidth / 2, tileHeight);
                                }
                              } else {
                                if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
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
            cacheFore.clear();
            renderContext.cacheBack = cacheFore;
            renderContext.cacheFore = cacheBack;
          }
        } else {
          // renderContext.cacheInit = true;
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
            var tileStepWidth = tileWidth / 2;
            var tileStepHeight = tileHeight / 2;
            var tileImg = this.tileImg;
            var tileImgClip = this.tileImgClip;
            var tileDataLen = tileData.length;
            // 往上面绘制
            for (var row = sRow - 1, startCol = sCol - 1, startTileX = 0, startTileY = -tileStepHeight;
                 startTileX < newWidth && row < tileDataLen;
                 row -= 1, startCol += 1, startTileX += tileWidth) {
              if (row >= 0) {
                var tileRow = tileData[row];
                if (LangUtil.isArray(tileRow)) {
                  var tileRowLen = tileRow.length;
                  for (var col = startCol, tileX = startTileX, tileY = startTileY;
                       tileX < newWidth && tileY < newHeight && col < tileRowLen;
                       col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                    if (col >= 0) {
                      var tileCell = tileRow[col];
                      var imgClip = tileImgClip[tileCell];
                      if (imgClip) {
                        var img = tileImg[imgClip.imgId];
                        if (img) {
                          var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                          if (image !== null) {
                            if (tileY < 0) {
                              cacheFore.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                tileX, 0, tileWidth, tileHeight / 2);
                            } else if (newHeight < tileY + tileHeight) {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                tileX, tileY, tileWidth, tileHeight / 2);
                            } else if (tileX < 0) {
                              cacheFore.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height,
                                0, tileY, tileWidth / 2, tileHeight);
                            } else if (newWidth < tileX + tileWidth) {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                tileX, tileY, tileWidth / 2, tileHeight);
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
            for (var row = sRow, startCol = sCol - 1, startTileX = -tileStepWidth, startTileY = 0;
                 startTileY < newHeight && row < tileDataLen;
                 row += 1, startCol += 1, startTileY += tileHeight) {
              if (row >= 0) {
                var tileRow = tileData[row];
                if (LangUtil.isArray(tileRow)) {
                  var tileRowLen = tileRow.length;
                  for (var col = startCol, tileX = startTileX, tileY = startTileY;
                       tileX < newWidth && tileY < newHeight && col < tileRowLen;
                       col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                    if (col > 0) {
                      var tileCell = tileRow[col];
                      var imgClip = tileImgClip[tileCell];
                      if (imgClip) {
                        var img = tileImg[imgClip.imgId];
                        if (img) {
                          var image = fileLoader.loadImageAsync(img, loadImageFinished, this);
                          if (image !== null) {
                            if (tileY < 0) {
                              cacheFore.drawImageExt(image, imgClip.x, (imgClip.y + imgClip.height / 2), imgClip.width, imgClip.height / 2,
                                tileX, 0, tileWidth, tileHeight / 2);
                            } else if (newHeight < tileY + tileHeight) {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width, imgClip.height / 2,
                                tileX, tileY, tileWidth, tileHeight / 2);
                            } else if (tileX < 0) {
                              cacheFore.drawImageExt(image, imgClip.x + imgClip.width / 2, imgClip.y, imgClip.width / 2, imgClip.height,
                                0, tileY, tileWidth / 2, tileHeight);
                            } else if (newWidth < tileX + tileWidth) {
                              cacheFore.drawImageExt(image, imgClip.x, imgClip.y, imgClip.width / 2, imgClip.height,
                                tileX, tileY, tileWidth / 2, tileHeight);
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
        // this._renderContext.cacheInit = false;
        this.refresh();
      }

      return {
        syncTileType: syncTileType,
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
          sinCosValid: false,
          sin: 0,
          cos: 0,
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

        this.addObserver('tileTypeChanged', functions.syncTileType, this, this);

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
