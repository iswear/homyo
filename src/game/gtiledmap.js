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
      function renderMap (sender, render) {
        var renderContext = this._renderContext;
        this._renderContext.cacheFore.imageCount = 0;
        this._renderContext.cacheBack.imageCount = 0;
        if (!renderContext.cacheValid) {
          renderMapCache(this, renderContext);
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
      function renderMapCache (self, renderContext) {
        if (self.tileType === 1) {
          renderMapCacheSquare(self, renderContext);
        } else {
          renderMapCacheDiamond(self, renderContext);
        }
      }
      function renderMapBlock (self, render, fileLoader, tileImg, tileImgClip, tileCell, sX, sY, sW, sH, tX, tY, tW, tH) {
        var imgClip = tileImgClip[tileCell];
        if (imgClip) {
          var img = tileImg[imgClip.imgId];
          if (img) {
            var image = fileLoader.loadImageAsync(img, loadImageFinished, self);
            if (image) {
              render.drawImageExt(image, sX, sY, sW, sH, tX, tY, tW, tH);
            }
          }
        }
      }
      function renderMapCacheSquare (self, renderContext) {
        var tileWidth = self.tileWidth;
        var tileHeight = self.tileHeight;
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
          newX = Math.floor(self.containerLeft / tileWidth) * tileWidth;
          newY = Math.floor(self.containerTop / tileHeight) * tileHeight;
          renderContext.x = newX;
          renderContext.y = newY;
          renderContext.vertexValid = true;
        }

        if (!renderContext.sizeValid) {
          newWidth = Math.ceil(self.containerRight / tileWidth)  * tileWidth - newX;
          newHeight = Math.ceil(self.containerBottom / tileHeight) * tileHeight - newY;
          renderContext.width = newWidth;
          renderContext.height = newHeight;
          renderContext.sizeValid = true;
          console.warn(newX, newY, newWidth, newHeight);
        }

        var sRow = Math.floor(self.containerTop / tileHeight);
        var sCol = Math.floor(self.containerLeft / tileWidth);
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

            var tileData = self.tileData
            if (LangUtil.isArray(tileData)) {
              var fileLoader = self.findApplication().getFileLoader();
              var tileImg = self.tileImg;
              var tileImgClip = self.tileImgClip;
              var tileDataLen = tileData.length;
              for (var row = sRow, tileY = 0; tileY < newHeight && row < tileDataLen; row += 1, tileY += tileStepHeight) {
                var tileRow = tileData[row];
                if (LangUtil.isArray(tileRow)) {
                  var tileRowLen = tileRow.length;
                  for (var col = sCol, tileX = 0; tileX < newWidth && col < tileRowLen; col += 1, tileX += tileStepWidth) {
                    if (!(clip && tileX >= clipTarLeft && tileX < clipTarRight && tileY >= clipTarTop && tileY < clipTarBottom)) {
                      var tileCell = tileRow[col];
                      renderMapBlock(self, cacheFore, fileLoader, tileImg, tileImgClip, tileCell);
                      /*
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
                      */
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
          var tileData = self.tileData
          if (LangUtil.isArray(tileData)) {
            var fileLoader = self.findApplication().getFileLoader();
            var tileImg = self.tileImg;
            var tileImgClip = self.tileImgClip;
            var tileDataLen = tileData.length;

            for (var row = sRow, tileY = 0; tileY < newHeight && row < tileDataLen; row += 1, tileY += tileStepHeight) {
              var tileRow = tileData[row];
              if (LangUtil.isArray(tileRow)) {
                var tileRowLen = tileRow.length;
                for (var col = sCol, tileX = 0; tileX < newWidth && col < tileRowLen; col += 1, tileX += tileStepWidth) {
                  var tileCell = tileRow[col];
                  renderMapBlock();

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
      function renderMapCacheDiamond(self, renderContext) {
        var tileWidth = self.tileWidth;
        var tileHeight = self.tileHeight;
        var tileStepWidth = tileWidth / 2;
        var tileStepHeight = tileHeight / 2;

        var sRow = Math.floor(self.containerTop / tileHeight - self.containerLeft / tileWidth);
        var sCol = Math.floor(self.containerTop / tileHeight+ self.containerLeft / tileWidth);
        var eRow = Math.floor(self.containerBottom / tileHeight - self.containerLeft / tileWidth);
        var eCol = Math.floor(self.containerBottom / tileHeight + self.containerLeft / tileWidth);

        var oldX = renderContext.x;
        var oldY = renderContext.y;
        var oldWidth = renderContext.width;
        var oldHeight = renderContext.height;

        var newX = oldX;
        var newY = oldY;
        var newWidth = oldWidth;
        var newHeight = oldHeight;
        if (!renderContext.vertexValid) {
          newX = (sCol - sRow - 1) * self.tileWidth / 2;
          newY = (sCol + sRow) * self.tileHeight / 2;
          renderContext.x = newX;
          renderContext.y = newY;
          renderContext.vertexValid = true;
        }
        if (!renderContext.sizeValid) {
          newWidth = (eCol - eRow + 1) * self.tileWidth / 2 - newX;
          newHeight = (eCol + eRow + 2) * self.tileHeight / 2  - newY;
          renderContext.width = newWidth;
          renderContext.height = newHeight;
          renderContext.sizeValid = true;
        }

        var edgeLeft = -tileStepWidth;
        var edgeRight = newWidth - tileStepWidth;
        var edgeTop = -tileStepHeight;
        var edgeBottom = newHeight - tileStepHeight;
        var tileData = self.tileData;
        if (LangUtil.isNotArray(tileData)) {
          return;
        }
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
              for (var row = sRow, startCol = sCol - 1, startTileX = -tileStepWidth, startTileY = -tileStepHeight;
                   startTileX < newWidth;
                   row -= 1, startCol += 1, startTileX += tileWidth) {
                var tileDataLen = tileData.length;
                if (row >= 0 && row < tileDataLen) {
                  var tileRow = tileData[row];
                  if (LangUtil.isArray(tileRow)) {
                    var tileRowLen = tileRow.length;
                    for (var col = startCol, tileX = startTileX, tileY = startTileY;
                         tileX < newWidth && tileY < newHeight;
                         col += 1, tileX += tileStepWidth, tileY += tileStepHeight) {
                      if (col >= 0 && col < tileRowLen) {
                        if (tileX < 0) {
                          sX = tileStepWidth;
                          tX = 0;
                        } else {
                          sX = 0;
                          tX = tileX;
                        }
                        if (tileY < 0) {
                          sY = tileStepHeight;
                          tY = 0;
                        } else {
                          sY = tileY;
                          tY = tileY;
                        }
                        w = (tileX > edgeLeft && tileX < edgeRight) ? tileWidth : tileStepWidth;
                        h = (tileY > edgeTop && tileY < edgeBottom) ? tileHeight : tileStepHeight;
                        // 剪切逻辑
                        if (sX === edgeClipLeft) {
                          if (sY === edgeClipTop) {

                          } else if (sY === edgeClipBottom) {

                          }
                        } else if (sX === edgeClipRight) {
                          if (sY === edgeClipTop) {

                          } else if (sY === edgeClipBottom) {

                          }
                        } else if (sY === edgeClipTop) {

                        } else if (sY === edgeClipBottom) {

                        } else {

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
                        if (tileX < 0) {
                          sX = tileStepWidth;
                          tX = 0;
                        } else {
                          sX = 0;
                          tX = tileX;
                        }
                        if (tileY < 0) {
                          sY = tileStepHeight;
                          tY = 0;
                        } else {
                          sY = tileY;
                          tY = tileY;
                        }
                        w = (tileX > edgeLeft && tileX < edgeRight) ? tileWidth : tileStepWidth;
                        h = (tileY > edgeTop && tileY < edgeBottom) ? tileHeight : tileStepHeight;
                        // 剪切逻辑
                        if (sX === edgeClipLeft) {
                          if (sY === edgeClipTop) {

                          } else if (sY === edgeClipBottom) {

                          }
                        } else if (sX === edgeClipRight) {
                          if (sY === edgeClipTop) {

                          } else if (sY === edgeClipBottom) {

                          }
                        } else if (sY === edgeClipTop) {

                        } else if (sY === edgeClipBottom) {

                        } else {

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
            cacheFore = renderContext.cacheFore;
          }
          var fileLoader = self.findApplcation().getFileLoader();
          var tileImg = self.tileImg;
          var tileImgClip = self.tileImgClip;
          var tileDataLen = tileData.length;
          var sX, sY, tX, tY, w, h;
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
                    if (tileX < 0) {
                      sX = tileStepWidth;
                      tX = 0;
                    } else {
                      sX = 0;
                      tX = tileX;
                    }
                    if (tileY < 0) {
                      sY = tileStepHeight;
                      tY = 0;
                    } else {
                      sY = tileY;
                      tY = tileY;
                    }
                    w = (tileX > edgeLeft && tileX < edgeRight) ? tileWidth : tileStepWidth;
                    h = (tileY > edgeTop && tileY < edgeBottom) ? tileHeight : tileStepHeight;
                    // TODO 绘制
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
                    if (tileX < 0) {
                      sX = tileStepWidth;
                      tX = 0;
                    } else {
                      sX = 0;
                      tX = tileX;
                    }
                    if (tileY < 0) {
                      sY = tileStepHeight;
                      tY = 0;
                    } else {
                      sY = tileY;
                      tY = tileY;
                    }
                    w = (tileX > edgeLeft && tileX < edgeRight) ? tileWidth : tileStepWidth;
                    h = (tileY > edgeTop && tileY < edgeBottom) ? tileHeight : tileStepHeight;
                    // TODO 绘制
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
