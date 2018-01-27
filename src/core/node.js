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

    var Node = LangUtil.extend(Notifier);

    Node.prototype.defX = 0;
    Node.prototype.defY = 0;
    Node.prototype.defWidth = 0;
    Node.prototype.defHeight = 0;
    Node.prototype.defAnchorX = 0;
    Node.prototype.defAnchorY = 0;
    Node.prototype.defAlpha = 1.0;
    Node.prototype.defRotateZ = 0;
    Node.prototype.defScaleX = 1;
    Node.prototype.defScaleY = 1;
    Node.prototype.defInclineX = 0;
    Node.prototype.defInclineY = 0;
    Node.prototype.defVisible = true;
    Node.prototype.defCursor = 'default';
    Node.prototype.defInteractable = true;

    Node.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.defineNotifyProperty('x', LangUtil.checkAndGet(conf.x, this.defX));
      this.defineNotifyProperty('y', LangUtil.checkAndGet(conf.y, this.defY));
      this.defineNotifyProperty('width', LangUtil.checkAndGet(conf.width, this.defWidth));
      this.defineNotifyProperty('height', LangUtil.checkAndGet(conf.height, this.defHeight));
      this.defineNotifyProperty('anchorX', LangUtil.checkAndGet(conf.anchorX, this.defAnchorX));
      this.defineNotifyProperty('anchorY', LangUtil.checkAndGet(conf.anchorY, this.defAnchorY));
      this.defineNotifyProperty('alpha', LangUtil.checkAndGet(conf.alpha, this.defAlpha));
      this.defineNotifyProperty('rotateZ', LangUtil.checkAndGet(conf.rotateZ, this.defRotateZ));
      this.defineNotifyProperty('scaleX', LangUtil.checkAndGet(conf.scaleX, this.defScaleX));
      this.defineNotifyProperty('scaleY', LangUtil.checkAndGet(conf.scaleY, this.defScaleY));
      this.defineNotifyProperty('inclineX', LangUtil.checkAndGet(conf.inclineX, this.defInclineX));
      this.defineNotifyProperty('inclineY', LangUtil.checkAndGet(conf.inclineY, this.defInclineY));
      this.defineNotifyProperty('visible', LangUtil.checkAndGet(conf.visible, this.defVisible));
      this.defineNotifyProperty('cursor', LangUtil.checkAndGet(conf.cursor, this.defCursor));
      this.defineNotifyProperty('interactable', LangUtil.checkAndGet(conf.interactable, this.defInteractable));
      this.defineNotifyProperty('application', LangUtil.checkAndGet(conf.application, null));
      this.defineNotifyProperty('parent', LangUtil.checkAndGet(conf.parent, null));

      this._childNodes =  {count: 0, defLayer: LangUtil.checkAndGet(conf.defLayer, 0), nodeLayers: []};

      this._transform = {
        needTransform: false,
        needUpdateTransform: false,
        lTransform: [0, 0, 0, 0, 0, 0],
        lReverseTransform: [0, 0, 0, 0, 0, 0],
        gTransform: [0, 0, 0, 0, 0, 0],
        gReverseTransform: [0, 0, 0, 0, 0, 0]
      };

      this._rectInSelf = {
        needUpdateRectInSelf: false,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0
      }

      sync_transform.call(this);
      sync_renderZone.call(this);

      this.addObserver('xChanged', this.refresh, this, this);
      this.addObserver('yChanged', this.refresh, this, this);
      this.addObserver('widthChanged', this.refresh, this, this);
      this.addObserver('heightChanged', this.refresh, this, this);
      this.addObserver('anchorXChanged', this.refresh, this, this);
      this.addObserver('anchorYChanged', this.refresh, this, this);
      this.addObserver('alphaChanged', this.refresh, this, this);
      this.addObserver('rotateZChanged', this.refresh, this, this);
      this.addObserver('scaleXChanged', this.refresh, this, this);
      this.addObserver('scaleYChanged', this.refresh, this, this);
      this.addObserver('inclineXChanged', this.refresh, this, this);
      this.addObserver('inclineYChanged', this.refresh, this, this);
      this.addObserver('visibleChanged', this.refresh, this, this);

      this.addObserver('xChanged', sync_transform, this, this);
      this.addObserver('yChanged', sync_transform, this, this);
      this.addObserver('rotateZChanged', sync_transform, this, this);
      this.addObserver('scaleXChanged', sync_transform, this, this);
      this.addObserver('scaleYChanged', sync_transform, this, this);
      this.addObserver('inclineXChanged', sync_transform, this, this);
      this.addObserver('inclineYChanged', sync_transform, this, this);
      this.addObserver('widthChanged', sync_renderZone, this, this);
      this.addObserver('heightChanged', sync_renderZone, this, this);
      this.addObserver('anchorXChanged', sync_renderZone, this, this);
      this.addObserver('anchorYChanged', sync_renderZone, this, this);
    }

    Node.prototype.getRectInSelf = function () {
      return this._rectInSelf;
    }

    Node.prototype.getChildNodeAt = function (layerIndex, nodeIndex) {
      var layer = this._childNodes.nodeLayers[layerIndex];
      return layer[nodeIndex];
    }

    Node.prototype.getChildNodeLocation = function (node) {
      for (var i = 0, len1 = this._childNodes.nodeLayers.length; i < len1; ++i) {
        var layers = this._childNodes.nodeLayers[i];
        if (layers) {
          for (var j = 0, len2 = layers.length; j < len2; ++j) {
            if (layers[j] === node) {
              return {layerIndex: i, nodeIndex: j};
            }
          }
        }
      }
      return null;
    }

    Node.prototype.getChildNodeLayers = function () {
      return this._childNodes.nodeLayers;
    }

    Node.prototype.getChildNodeLayerAt = function (layerIndex) {
      return this._childNodes.nodeLayers[layerIndex];
    }

    Node.prototype.addChildNode = function (node) {
      this.addChildNodeToLayer(node, this._childNodes.defLayer);
    }

    Node.prototype.addChildNodeToLayer = function (node, layerIndex) {
      if (node.parent === null) {
        var childNodes = this._childNodes;
        var nodeLayers = childNodes.nodeLayers;
        if (!nodeLayers[layerIndex]) {
          nodeLayers[layerIndex] = [];
        }
        node.parent = this;
        nodeLayers[layerIndex].push(node);
        childNodes.count ++;
        this.refresh();
      }
    }

    Node.prototype.addChildNodeToLocation = function (node, layerIndex, nodeIndex) {
      if (node.parent === null) {
        var childNodes = this._childNodes;
        var nodeLayers = childNodes.nodeLayers;
        if (!nodeLayers[layerIndex]) {
          nodeLayers[layerIndex] = [];
        }
        node.parent = this;
        nodeLayers[layerIndex].splice(nodeIndex, 0, node);
        childNodes.count ++;
        this.refresh();
      }
    }

    Node.prototype.removeChildNode = function (node, destroy) {
      var layers = this._childNodes.nodeLayers;
      for (var i = 0, len = layers.length; i < len; ++i) {
        var layer = layers[i];
        if (layer) {
          for (var j = 0, len2 = layer.length; j < len2; ++j) {
            if (node === layer[j]) {
              layer.splice(j, 1);
              len2--;
              j--;
              this._childNodes.count--;
              this.refresh();
            }
          }
        }
      }
      node.application = null;
      node.parent = null;
      if (destroy) {
        node.destroy();
      }
    }

    Node.prototype.removeChildNodeAtLayer = function (node, layerIndex, destroy) {
      var layer = this._childNodes.nodeLayers[layerIndex];
      for (var i = 0, len = layer.length; i < len; ++i) {
        if (node === layer[i]) {
          layer.splice(i, 1);
          len--;
          i--;
          this._childNodes.count--;
          this.refresh();
        }
      }
      node.application = null;
      node.parent = null;
      if (destroy) {
        node.destroy();
      }
    }

    Node.prototype.removeFromParent = function (destroy) {
      var parent = this.parent;
      parent.removeChildNode(this, destroy);
    }

    Node.prototype.runAnimation = function (animation, fn, target, loop) {
      this.findApplication().getAnimationManager().addAnimationBinder(this, animation, fn, target, loop);
    }

    Node.prototype.stopAnimation = function (animation) {
      this.findApplication().getAnimationManager().removeAnimationBinderByNodeAndAnimation(this, animation);
    }

    Node.prototype.stopAllAnimation = function () {
      this.findApplication().getAnimationManager().removeAnimationBinderByNode(this);
    }

    Node.prototype.transformLVectorToG = function (vector) {
      return MatrixUtil.mulMat2dAndVect2d(this._transform.gTransform, vector);
    }

    Node.prototype.transformGVectorToL = function (vector) {
      return MatrixUtil.mulMat2dAndVect2d(this._transform.gReverseTransform, vector);
    }

    Node.prototype.transformLVectorToP = function (vector) {
      return MatrixUtil.mulMat2dAndVect2d(this._transform.lTransform, vector);
    }

    Node.prototype.transformPVectorToL = function (vector) {
      return MatrixUtil.mulMat2dAndVect2d(this._transform.lReverseTransform, vector);
    }

    Node.prototype.needRender = function () {
      var renders = this.getObserverByName('render');
      return renders && renders.length > 0;
    }

    Node.prototype.checkEventInteractZone = function (name, e, x, y) {
      var rect = this.getRectInSelf();
      if (x >= rect.left && x <= rect.right
        && y >= rect.top && y <= rect.bottom) {
        return true;
      } else {
        return false;
      }
    }

    Node.prototype.findApplication = function () {
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

    Node.prototype.refresh = function () {
      var app = this.findApplication();
      if (app !== null) {
        app.refresh();
      }
    }

    Node.prototype.destroy = function () {
      var layers = this._childNodes.nodeLayers;
      for (var i = 0, len = layers.length; i < len; ++i) {
        var layer = layers[i];
        for (var j = 0, len2 = layer.length; j < len2; ++j) {
          layer[j].destroy();
        }
      }
      this.parent = null;
      this.application = null;
      this._childNodes.nodeLayers = null;
      this.super('destroy');
    }

    Node.prototype._dispatchRender = function (render, parentAlpha, parentGTransform, parentGReverseTransform, parentUpdateTransform) {
      var alpha = this.alpha * parentAlpha
      if (this.visible && alpha > 0) {
        var transform = this._transform, rectInSelf = this._rectInSelf;
        if (rectInSelf.needUpdateRectInSelf) {
          rectInSelf.width = Math.round(this.width);
          rectInSelf.height = Math.round(this.height);
          rectInSelf.top = Math.round(rectInSelf.height * (-this.anchorY));
          rectInSelf.bottom = Math.round(rectInSelf.height + rectInSelf.top);
          rectInSelf.left = Math.round(rectInSelf.width * (-this.anchorX));
          rectInSelf.right = Math.round(rectInSelf.width + rectInSelf.left);
          rectInSelf.needUpdateRectInSelf = false;
        }
        var needUpdateTransform = transform.needUpdateTransform;
        if (needUpdateTransform) {
          transform.lTransform =
            MatrixUtil.incline2d(
              MatrixUtil.scale2d(
                MatrixUtil.rotate2d(
                  MatrixUtil.translate2d(MatrixUtil.createIdentityMat2d(), this.x, this.y), this.rotateZ), this.scaleX, this.scaleY), this.inclineX, this.inclineY);
          transform.lReverseTransform = MatrixUtil.reverse2d(transform.lTransform);
          transform.needTransform = !MatrixUtil.isIdentityMat2d(transform.lTransform);
          transform.needUpdateTransform = false;
        }
        if (parentUpdateTransform || needUpdateTransform) {
          transform.gTransform = MatrixUtil.mulMat2d(parentGTransform, transform.lTransform);
          transform.gReverseTransform = MatrixUtil.mulMat2d(transform.lReverseTransform, parentGReverseTransform);
        }

        var needRender = this.needRender()
        if (this.needRender()) {
          // 设置矩阵
          if (transform.needTransform) {
            var gTransform = transform.gTransform
            render.setTransform(gTransform[0], gTransform[3], gTransform[1], gTransform[4], gTransform[2], gTransform[5]);
          }
          // 设置透明度
          if (this.alpha !== 1) {
            render.globalAlpha = alpha
          }
          // 开始绘制
          this.postNotification('render', this, [ render ]);
          var layers = this._childNodes.nodeLayers;
          for (var i = 0, len = layers.length; i < len; ++i) {
            var layer = layers[i];
            for (var j = 0, len2 = layer.length; j < len2; ++j ) {
              layer[j]._dispatchRender(render, alpha, transform.gTransform, transform.gReverseTransform, parentUpdateTransform || needUpdateTranform);
            }
          }
          render.restore()
        } else {
          // 设置透明度
          if (this.alpha !== 1) {
            render.globalAlpha = alpha
          }
          // 开始绘制
          this.postNotification('render', this, [ render ]);
          var layers = this._childNodes.nodeLayers;
          for (var i = 0, len = layers.length; i < len; ++i) {
            var layer = layers[i];
            for (var j = 0, len2 = layer.length; j < len2; ++j ) {
              layer[j]._dispatchRender(render, alpha, transform.gTransform, transform.gReverseTransform, parentUpdateTransform || needUpdateTranform);
            }
          }
        }
      }
    }

    Node.prototype._dispatchMouseTouchEvent = function (name, e) {
      if (this.visible) {
        var lPoint = this.transformGVectorToL([e.offsetX, e.offsetY]);
        var result = this.checkEventInteractZone(name, e, lPoint[0], lPoint[1]);


        var targetInChildren = false;
        if (e.skip) {
          e.skip = false;
        } else {
          var layers = this._childNodes.nodeLayers;
          for (var  i = layers.length - 1; i >= 0; --i) {
            var layer = layers[i];
            for (var j = layer.length - 1; j >= 0; --j) {
              if (layer[j]._dispatchMouseTouchEvent(name, e)) {
                targetInChildren = true;
                break;
              }
            }
            if (targetInChildren) {
              break;
            }
          }
        }

        if (targetInChildren) {
          if (e.bubble) {
            this.postNotification(name, this, [ e ]);
          }
          return true;
        } else {
          if (result) {
            if (this.interactable) {
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

    function sync_transform() {
      this._transform.needUpdateTransform = true;
    }

    function sync_renderZone() {
      this._rectInSelf.needUpdateRectInSelf = true;
    }

    return Node;
  }
)()