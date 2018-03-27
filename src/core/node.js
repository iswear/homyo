/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../utils/lang-util';
import Notifier from './notifier';

import MatrixUtil from '../utils/matrix-util';

export default (
  function () {
    var functions = (function () {
      function syncTransform () {
        this._transform.needUpdate = true;
      }
      function syncRectInLocal () {
        this._rectInLocal.needUpdate = true;
      }
      function syncDirtyZoneCtx (sender, newVal, oldVal) {
        if (oldVal) {
          if (oldVal.enableDirtyZone) {
            this._disableDirtyZone(true);
          }
        }
        if (newVal) {
          if (newVal.enableDirtyZone) {
            this._enableDirtyZone(true);
          }
        }
      }
      function reportOriginRect () {
        if (!this._reportCtx.origin) {
          this._reportCtx.origin = true;
          this._renderCtx.refresh = true;
          var app = this.findApplication();
          if (app) {
            app.receiveDirtyZone(this);
          }
        }
      }
      function reportCurrentRect () {
        if (!this._reportCtx.current) {
          this._reportCtx.current = true;
          this._renderCtx.refresh = true;
          var app = this.findApplication();
          if (app) {
            app.receiveDirtyZone(this);
          }
        }
      }

      return {
        syncTransform: syncTransform,
        syncRectInLocal: syncRectInLocal,
        syncDirtyZoneCtx: syncDirtyZoneCtx,
        reportOriginRect: reportOriginRect,
        reportCurrentRect: reportCurrentRect
      }
    })();

    var Node = (function () {
      var id = 0;
      var InnerNode = LangUtil.extend(Notifier);

      InnerNode.prototype.defX = 0;
      InnerNode.prototype.defY = 0;
      InnerNode.prototype.defRotateZ = 0;
      InnerNode.prototype.defScaleX = 1;
      InnerNode.prototype.defScaleY = 1;
      InnerNode.prototype.defInclineX = 0;
      InnerNode.prototype.defInclineY = 0;
      InnerNode.prototype.defWidth = 0;
      InnerNode.prototype.defHeight = 0;
      InnerNode.prototype.defAnchorX = 0;
      InnerNode.prototype.defAnchorY = 0;
      InnerNode.prototype.defAlpha = 1;
      InnerNode.prototype.defVisible = true;
      InnerNode.prototype.defCursor = 'default';
      InnerNode.prototype.defInteractive = true;
      InnerNode.prototype.defLayer = 0;

      InnerNode.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('x', LangUtil.checkAndGet(conf.x, this.defX));
        this.defineNotifyProperty('y', LangUtil.checkAndGet(conf.y, this.defY));
        this.defineNotifyProperty('rotateZ', LangUtil.checkAndGet(conf.rotateZ, this.defRotateZ));
        this.defineNotifyProperty('scaleX', LangUtil.checkAndGet(conf.scaleX, this.defScaleX));
        this.defineNotifyProperty('scaleY', LangUtil.checkAndGet(conf.scaleY, this.defScaleY));
        this.defineNotifyProperty('inclineX', LangUtil.checkAndGet(conf.inclineX, this.defInclineX));
        this.defineNotifyProperty('inclineY', LangUtil.checkAndGet(conf.inclineY, this.defInclineY));
        this.defineNotifyProperty('width', LangUtil.checkAndGet(conf.width, this.defWidth));
        this.defineNotifyProperty('height', LangUtil.checkAndGet(conf.height, this.defHeight));
        this.defineNotifyProperty('anchorX', LangUtil.checkAndGet(conf.anchorX, this.defAnchorX));
        this.defineNotifyProperty('anchorY', LangUtil.checkAndGet(conf.anchorY, this.defAnchorY));
        this.defineNotifyProperty('alpha', LangUtil.checkAndGet(conf.alpha, this.defAlpha));
        this.defineNotifyProperty('visible', LangUtil.checkAndGet(conf.visible, this.defVisible));
        this.defineNotifyProperty('cursor', LangUtil.checkAndGet(conf.cursor, this.defCursor));
        this.defineNotifyProperty('interactive', LangUtil.checkAndGet(conf.interactive, this.defInteractive));
        this.defineNotifyProperty('parent', LangUtil.checkAndGet(conf.parent, null));
        this.defineNotifyProperty('application', LangUtil.checkAndGet(conf.application, null));

        this._id = ++id;
        this._childNodes =  {count: 0, defLayer: LangUtil.checkAndGet(conf.defLayer, this.defLayer), nodeLayers: []};
        this._transform = {
          needUpdate: false,
          lTransform: [0, 0, 0, 0, 0, 0],
          lReverseTransform: [0, 0, 0, 0, 0, 0],
          wTransform: [0, 0, 0, 0, 0, 0],
          wReverseTransform: [0, 0, 0, 0, 0, 0]
        };
        this._rectInLocal = {
          needUpdate: false,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        };
        this._rectInWorld = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        };
        this._reportCtx = {
          origin: false,
          current: false
        };


        functions.syncTransform.call(this);
        functions.syncRectInLocal.call(this);
        functions.syncDirtyZoneCtx.call(this, this.application, null);

        this.addObserver('xChanged', this.refresh, this, this);
        this.addObserver('yChanged', this.refresh, this, this);
        this.addObserver('rotateZChanged', this.refresh, this, this);
        this.addObserver('scaleXChanged', this.refresh, this, this);
        this.addObserver('scaleYChanged', this.refresh, this, this);
        this.addObserver('inclineXChanged', this.refresh, this, this);
        this.addObserver('inclineYChanged', this.refresh, this, this);
        this.addObserver('widthChanged', this.refresh, this, this);
        this.addObserver('heightChanged', this.refresh, this, this);
        this.addObserver('anchorXChanged', this.refresh, this, this);
        this.addObserver('anchorYChanged', this.refresh, this, this);
        this.addObserver('alphaChanged', this.refresh, this, this);
        this.addObserver('visibleChanged', this.refresh, this, this);

        this.addObserver('xChanged', functions.syncTransform, this, this);
        this.addObserver('yChanged', functions.syncTransform, this, this);
        this.addObserver('rotateZChanged', functions.syncTransform, this, this);
        this.addObserver('scaleXChanged', functions.syncTransform, this, this);
        this.addObserver('scaleYChanged', functions.syncTransform, this, this);
        this.addObserver('inclineXChanged', functions.syncTransform, this, this);
        this.addObserver('inclineYChanged', functions.syncTransform, this, this);
        this.addObserver('parentChanged', functions.syncTransform, this, this);

        this.addObserver('widthChanged', functions.syncRectInLocal, this, this);
        this.addObserver('heightChanged', functions.syncRectInLocal, this, this);
        this.addObserver('anchorXChanged', functions.syncRectInLocal, this, this);
        this.addObserver('anchorYChanged', functions.syncRectInLocal, this, this);

        this.addObserver('applicationChanged', functions.syncDirtyZoneCtx, this, this);
      }

      InnerNode.prototype.reportDirtyZone = function () {
        var app = this.findApplication();
        if (app) {
          app.receiveDirtyZone(node);
        }
      }

      InnerNode.prototype.getRectInLocal = function () {
        return this._rectInLocal;
      }

      InnerNode.prototype.getRectInWorld = function () {
        return this._rectInWorld;
      }

      InnerNode.prototype.getRectDirty = function (renderZone) {
        return LangUtil.clone(this._rectInWorld);
      }

      InnerNode.prototype.getChildNode = function (layerIndex, nodeIndex) {
        var layer = this._childNodes.nodeLayers[layerIndex];
        if (layer) {
          return layer[nodeIndex];
        } else {
          return null;
        }
      }

      InnerNode.prototype.getChildNodeLayers = function () {
        return this._childNodes.nodeLayers;
      }

      InnerNode.prototype.getChildNodeLocation = function (node) {
        for (var i = 0, len1 = this._childNodes.nodeLayers.length; i < len1; ++i) {
          var layer = this._childNodes.nodeLayers[i];
          if (layer) {
            for (var j = 0, len2 = layer.length; j < len2; ++j) {
              if (layer[j] === node) {
                return {layerIndex: i, nodeIndex: j};
              }
            }
          }
        }
        return null;
      }

      InnerNode.prototype.addChildNode = function (node) {
        node.removeFromParent(false);
        this.addChildNodeToLayer(node, this._childNodes.defLayer);
      }

      InnerNode.prototype.addChildNodeToLayer = function (node, layerIndex) {
        node.removeFromParent(false);
        var childNodes = this._childNodes;
        var nodeLayers = childNodes.nodeLayers;
        if (!nodeLayers[layerIndex]) {
          nodeLayers[layerIndex] = [];
        }
        childNodes.count ++;
        node.parent = this;
        nodeLayers[layerIndex].push(node);
        this.refresh();
      }

      InnerNode.prototype.insertChildNode = function (node, nodeIndex) {
        this.insertChildNodeToLayer(node, this._childNodes.defLayer, nodeIndex);
      }

      InnerNode.prototype.insertChildNodeToLayer = function (node, layerIndex, nodeIndex) {
        node.removeFromParent(false);
        var childNodes = this._childNodes;
        var nodeLayers = childNodes.nodeLayers;
        if (!nodeLayers[layerIndex]) {
          nodeLayers[layerIndex] = [];
        }
        childNodes.count ++;
        node.parent = this;
        if (nodeIndex < nodeLayers[layerIndex].length) {
          nodeLayers[layerIndex].splice(nodeIndex, 0, node);
        } else {
          nodeLayers[layerIndex].push(node);
        }
        this.refresh()
      }

      InnerNode.prototype.removeChildNode = function (node, destroy) {
        if (destroy) {
          node.destroy();
        } else {
          var layers = this._childNodes.nodeLayers;
          for (var i = 0, len = layers.length; i < len; ++i) {
            var layer = layers[i];
            if (layer) {
              for (var j = 0, len2 = layer.length; j < len2; ++j) {
                if (node === layer[j]) {
                  layer.splice(j, 1);
                  node.stopAllAnimation(true);
                  node.parent = null;
                  node.application = null;
                  this._childNodes.count--;
                  this.refresh();
                  return;
                }
              }
            }
          }
        }
      }

      InnerNode.prototype.removeFromParent = function (destroy) {
        var parent = this.parent;
        if (parent) {
          parent.removeChildNode(this, destroy);
        }
      }

      InnerNode.prototype.runAnimation = function (animation, fn, target, loop) {
        const application = this.findApplication()
        if (application) {
          application.getAnimationManager().addAnimationBinder(this, animation, fn, target, loop);
        }
      }

      InnerNode.prototype.stopAnimation = function (animation) {
        const application = this.findApplication()
        if (application) {
          application.getAnimationManager().removeAnimationBinderByNodeAndAnimation(this, animation);
        }
      }

      InnerNode.prototype.stopAllAnimation = function (children) {
        const application = this.findApplication()
        if (application) {
          if (children) {
            var layers = this._childNodes.nodeLayers;
            for (var i = 0, len = layers.length; i < len; ++i) {
              var layer = layers[i];
              if (layer) {
                for (var j = 0, len2 = layer.length; j < len2; ++j ) {
                  layer[j].stopAllAnimation(children);
                }
              }
            }
          }
          application.getAnimationManager().removeAnimationBinderByNode(this);
        }
      }

      InnerNode.prototype.transformLVectorToW = function (vector) {
        return MatrixUtil.mulMat2dAndVect2d(this._transform.wTransform, vector);
      }

      InnerNode.prototype.transformWVectorToL = function (vector) {
        return MatrixUtil.mulMat2dAndVect2d(this._transform.wReverseTransform, vector);
      }

      InnerNode.prototype.transformLVectorToP = function (vector) {
        return MatrixUtil.mulMat2dAndVect2d(this._transform.lTransform, vector);
      }

      InnerNode.prototype.transformPVectorToL = function (vector) {
        return MatrixUtil.mulMat2dAndVect2d(this._transform.lReverseTransform, vector);
      }

      InnerNode.prototype.getTransformInParent = function () {
        return LangUtil.clone(this._transform.lTransform);
      }

      InnerNode.prototype.getReverseTransformInParent = function () {
        return LangUtil.clone(this._transform.lReverseTransform);
      }

      InnerNode.prototype.getTransformInWorld = function () {
        return LangUtil.clone(this._transform.wTransform);
      }

      InnerNode.prototype.getReverseTransformInWorld = function() {
        return LangUtil.clone(this._transform.wReverseTransform);
      }

      InnerNode.prototype.needRender = function (renderZone) {
        var rectInWorld = this._rectInWorld;
        if (rectInWorld.left >= renderZone.right || rectInWorld.right <= renderZone.left || rectInWorld.top >= renderZone.bottom || rectInWorld.bottom <= renderZone.top) {
          return false;
        } else {
          var renders = this.getObserverByName('render');
          return renders && renders.length > 0;
        }
      }

      InnerNode.prototype.checkEventInteractZone = function (name, e, x, y) {
        var rect = this._rectInLocal;
        if (x >= rect.left && x <= rect.right &&
          y >= rect.top && y <= rect.bottom) {
          return true;
        } else {
          return false;
        }
      }

      InnerNode.prototype.findApplication = function () {
        var app = this.application;
        if (app !== null) {
          return app;
        } else {
          var node = this.parent;
          while (app === null && node !== null) {
            app = node.application;
            node = node.parent;
          }
          this.application = app;
          return app;
        }
      }

      InnerNode.prototype.refresh = function () {
        var app = this.findApplication();
        if (app !== null) {
          app.refresh();
        }
      }

      InnerNode.prototype.destroy = function () {
        // 清理所有的子对象
        var layers = this._childNodes.nodeLayers;
        for (var i = 0, len = layers.length; i < len; ++i) {
          var layer = layers[i];
          if (layer) {
            while (true) {
              var node = layer.pop();
              if (node === undefined) {
                break;
              } else {
                node.destroy();
              }
            }
          }
        }
        // 最后清理自己
        this.removeFromParent(false);
        this.super('destroy');
      }

      InnerNode.prototype._syncTransform = function (parentWTransform, parentWReverseTransform, parentUpdateTransform) {
        var transform = this._transform, rectInLocal = this._rectInLocal, rectInWorld = this._rectInWorld;
        var selfRectUpd = rectInLocal.needUpdate;
        var transformUpd = transform.needUpdate;
        var worldRectUpd = selfRectUpd || transformUpd || parentUpdateTransform;
        if (selfRectUpd) {
          rectInLocal.width = Math.round(this.width);
          rectInLocal.height = Math.round(this.height);
          rectInLocal.top = Math.round(rectInLocal.height * (-this.anchorY));
          rectInLocal.bottom = Math.round(rectInLocal.height + rectInLocal.top);
          rectInLocal.left = Math.round(rectInLocal.width * (-this.anchorX));
          rectInLocal.right = Math.round(rectInLocal.width + rectInLocal.left);
          rectInLocal.needUpdate = false;
        }
        if (transformUpd) {
          transform.lTransform =
            MatrixUtil.incline2d(
              MatrixUtil.scale2d(
                MatrixUtil.rotate2d(
                  MatrixUtil.translate2d(MatrixUtil.createIdentityMat2d(), this.x, this.y), this.rotateZ), this.scaleX, this.scaleY), this.inclineX, this.inclineY);
          transform.lReverseTransform = MatrixUtil.reverse2d(transform.lTransform);
          transform.needUpdate = false;
        }
        if (parentUpdateTransform || transformUpd) {
          transform.wTransform = MatrixUtil.mulMat2d(parentWTransform, transform.lTransform);
          transform.wReverseTransform = MatrixUtil.mulMat2d(transform.lReverseTransform, parentWReverseTransform);
        }
        if (worldRectUpd) {
          var p1 = this.transformLVectorToW([rectInLocal.left, rectInLocal.top]);
          var p2 = this.transformLVectorToW([rectInLocal.left, rectInLocal.bottom]);
          var p3 = this.transformLVectorToW([rectInLocal.right, rectInLocal.top]);
          var p4 = this.transformLVectorToW([rectInLocal.right, rectInLocal.bottom]);
          rectInWorld.top = Math.min(Math.min(p1[1], p2[1]), Math.min(p3[1], p4[1]));
          rectInWorld.bottom = Math.max(Math.max(p1[1], p2[1]), Math.max(p3[1], p4[1]));
          rectInWorld.left = Math.min(Math.min(p1[0], p2[0]), Math.min(p3[0], p4[0]));
          rectInWorld.right = Math.max(Math.max(p1[0], p2[0]), Math.max(p3[0], p4[0]));
          rectInWorld.width = rectInWorld.right - rectInWorld.left;
          rectInWorld.height = rectInWorld.bottom - rectInWorld.top;
        }
        var layers = this._childNodes.nodeLayers;
        for (var i = 0, len = layers.length; i < len; ++i) {
          var layer = layers[i];
          if (layer) {
            for (var j = 0, len2 = layer.length; j < len2; ++j) {
              layer[j]._syncTransform(transform.wTransform, transform.wReverseTransform, parentUpdateTransform || transformUpd);
            }
          }
        }
      }

      InnerNode.prototype._checkDirtyZone = function (renderZone, dirtyZones) {
        var result  = false;
        var reportCtx = this._reportCtx, wTransform = this._transform.wTransform, rectInWorld = this._rectInWorld;
        var report = reportCtx.origin || !(wTransform[0] === 1 && wTransform[1] === 0 && wTransform[3] === 0 && wTransform[4] === 0);
        if (!reportCtx.current && !(rectInWorld.left >= renderZone.right || rectInWorld.right <= renderZone.left || rectInWorld.top >= renderZone.bottom || rectInWorld.bottom <= renderZone.top)) {
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            if (!(rectInWorld.bottom <= dirtyZone.top || rectInWorld.top >= dirtyZone.bottom || rectInWorld.left >= dirtyZone.right || rectInWorld.right <= dirtyZone.left)) {
              if (report) {
                functions.reportCurrentRect.call(this);
                result = true;
              }
              break;
            }
          }
        }

        var layers = this._childNodes.nodeLayers;
        for (var i = 0, len = layers.length; i <len; ++i) {
          var layer = layers[i];
          if (layer) {
            for (var j = 0, len2 = layer.length; j < len2; ++j) {
              result = result || layer[j]._checkDirtyZone(renderZone, dirtyZones);
            }
          }
        }
        return result;
      }

      InnerNode.prototype._dispatchRender = function (render, parentAlpha, renderZone, dirtyZones) {
        this.postNotification('frame', this);
        var alpha = this.alpha * parentAlpha;
        if (this.visible && alpha > 0) {
          if (this.needRender(renderZone)) {
            var wTransform = this._transform.wTransform;
            // 设置矩阵
            render.setTransform(wTransform[0], wTransform[3], wTransform[1], wTransform[4], wTransform[2], wTransform[5]);
            // 设置透明度
            render.globalAlpha = alpha;
            // 绘制自身
            this.postNotification('render', this, [render, dirtyZones]);
            // 绘制子元素
            var layers = this._childNodes.nodeLayers;
            for (var i = 0, len = layers.length; i < len; ++i) {
              var layer = layers[i];
              if (layer) {
                for (var j = 0, len2 = layer.length; j < len2; ++j ) {
                  layer[j]._dispatchRender(render, alpha, renderZone, dirtyZones);
                }
              }
            }
            render.restore();
          } else {
            // 绘制子元素
            var layers = this._childNodes.nodeLayers;
            for (var i = 0, len = layers.length; i < len; ++i) {
              var layer = layers[i];
              if (layer) {
                for (var j = 0, len2 = layer.length; j < len2; ++j ) {
                  layer[j]._dispatchRender(render, alpha, renderZone, dirtyZones);
                }
              }
            }
          }
        }
        this._reportCtx.origin = false;
        this._reportCtx.current = false;
        this._renderCtx.refresh = false;
      }

      InnerNode.prototype._dispatchMouseTouchEvent = function (name, e) {
        if (this.visible) {
          var lPoint = this.transformWVectorToL([e.offsetX, e.offsetY]);
          var result = this.checkEventInteractZone(name, e, lPoint[0], lPoint[1]);

          if (e.skip) {
            e.skip = false;
            return false;
          }

          var targetInChildren = false;
          var layers = this._childNodes.nodeLayers;
          for (var  i = layers.length - 1; i >= 0; --i) {
            var layer = layers[i];
            if (layer) {
              for (var j = layer.length - 1; j >= 0; --j) {
                if (layer[j]._dispatchMouseTouchEvent(name, e)) {
                  targetInChildren = true;
                  break;
                }
              }
            }
            if (targetInChildren) {
              break;
            }
          }

          if (targetInChildren) {
            if (e.bubble) {
              this.postNotification(name, this, [e]);
            }
            return true;
          } else {
            if (result) {
              if (this.interactive) {
                this.postNotification(name, this, [e]);
              }
              return true;
            } else {
              return false;
            }
          }
        } else {
          return false;
        }
      }

      InnerNode.prototype._getId = function () {
        return this._id;
      }

      InnerNode.prototype._enableDirtyZone = function (children) {
        this.addObserver('xChanged', functions.reportOriginRect, this, this);
        this.addObserver('yChanged', functions.reportOriginRect, this, this);
        this.addObserver('rotateZChanged', functions.reportOriginRect, this, this);
        this.addObserver('scaleXChanged', functions.reportOriginRect, this, this);
        this.addObserver('scaleYChanged', functions.reportOriginRect, this, this);
        this.addObserver('inclineXChanged', functions.reportOriginRect, this, this);
        this.addObserver('inclineYChanged', functions.reportOriginRect, this, this);
        this.addObserver('widthChanged', functions.reportOriginRect, this, this);
        this.addObserver('heightChanged', functions.reportOriginRect, this, this);
        this.addObserver('anchorXChanged', functions.reportOriginRect, this, this);
        this.addObserver('anchorYChanged', functions.reportOriginRect, this, this);
        this.addObserver('alphaChanged', functions.reportOriginRect, this, this);
        this.addObserver('visibleChanged', functions.reportOriginRect, this, this);
        if (children) {
          var layers = this._childNodes;
          for (var i = 0, len = layers.length; i < len; ++i) {
            var layer = layers[i];
            if (layer) {
              for (var j = 0, len2 = layer.length; j < len2; ++j) {
                layer[j]._enableDirtyZone(children);
              }
            }
          }
        }
      }

      InnerNode.prototype._disableDirtyZone = function (children) {
        this.removeObserver('xChanged', functions.reportOriginRect, this, this);
        this.removeObserver('yChanged', functions.reportOriginRect, this, this);
        this.removeObserver('rotateZChanged', functions.reportOriginRect, this, this);
        this.removeObserver('scaleXChanged', functions.reportOriginRect, this, this);
        this.removeObserver('scaleYChanged', functions.reportOriginRect, this, this);
        this.removeObserver('inclineXChanged', functions.reportOriginRect, this, this);
        this.removeObserver('inclineYChanged', functions.reportOriginRect, this, this);
        this.removeObserver('widthChanged', functions.reportOriginRect, this, this);
        this.removeObserver('heightChanged', functions.reportOriginRect, this, this);
        this.removeObserver('anchorXChanged', functions.reportOriginRect, this, this);
        this.removeObserver('anchorYChanged', functions.reportOriginRect, this, this);
        this.removeObserver('alphaChanged', functions.reportOriginRect, this, this);
        this.removeObserver('visibleChanged', functions.reportOriginRect, this, this);
        if (children) {
          var layers = this._childNodes;
          for (var i = 0, len = layers.length; i < len; ++i) {
            var layer = layers[i];
            if (layer) {
              for (var j = 0, len2 = layer.length; j < len2; ++j) {
                layer[j]._disableDirtyZone(children);
              }
            }
          }
        }
      }

      return InnerNode;
    })();

    return Node;
  }
)()