/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../utils/lang-util';
import Notifier from './notifier';
import MatrixUtil from '../utils/matrix-util';
import GeometryUtil from '../utils/geometry-util';

export default (
  function () {
    var M2D = MatrixUtil.m2d;
    
    var functions = (function () {
      function onAppend () {
        this.dirty();
      }

      function onRemove () {
        this.dirty();
      }

      function onPropertyChanged (sender, name, newVal, oldVal) {
        if (propertyChangedMap.hasOwnProperty(name)) {
          propertyChangedMap[name].call(this, newVal, oldVal);
        }
      }

      function onLocalTransformChanged () {
        this._transformCtx.localInvalid = true;
        this.dirty();
      }

      function onLocalZoneChanged () {
        this._zoneCtx.localInvalid = true;
        this.dirty();
      }

      function onDirty (newVal, oldVal) {
        this.dirty();
      }

      var propertyChangedMap = {
        x: onLocalTransformChanged,
        y: onLocalTransformChanged,
        anchorX: onLocalZoneChanged,
        anchorY: onLocalZoneChanged,
        scaleX: onLocalTransformChanged,
        scaleY: onLocalTransformChanged,
        shearX: onLocalTransformChanged,
        shearY: onLocalTransformChanged,
        width: onLocalZoneChanged,
        height: onLocalZoneChanged,
        rotateZ: onLocalTransformChanged,
        alpha: onDirty,
        visible: onDirty
      }
      
      return {
        onAppend: onAppend,
        onRemove: onRemove,
        onPropertyChanged: onPropertyChanged,
        onLocalTransformChanged: onLocalTransformChanged,
        onLocalZoneChanged: onLocalZoneChanged
      }
    })();

    var Node = (function () {
      var id = 0;
      var InnerNode = LangUtil.extend(Notifier);

      InnerNode.prototype.defX = 0;
      InnerNode.prototype.defY = 0;
      InnerNode.prototype.defScaleX = 1;
      InnerNode.prototype.defScaleY = 1;
      InnerNode.prototype.defShearX = 0;
      InnerNode.prototype.defShearY = 0;
      InnerNode.prototype.defRotateZ = 0;
      InnerNode.prototype.defAnchorX = 0.5;
      InnerNode.prototype.defAnchorY = 0.5;
      InnerNode.prototype.defWidth = 0;
      InnerNode.prototype.defHeight = 0;
      InnerNode.prototype.defAlpha = 1;
      InnerNode.prototype.defVisible = true;
      InnerNode.prototype.defCursor = 'default';
      InnerNode.prototype.defInteractive = false;
      InnerNode.prototype.defClip = false;
      InnerNode.prototype.defDirtyRenderSupport = false;
      InnerNode.prototype.defLayer = 0;
      InnerNode.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.x = LangUtil.checkAndGet(conf.x, this.defX);
        this.y = LangUtil.checkAndGet(conf.y, this.defY);
        this.rotateZ = LangUtil.checkAndGet(conf.rotateZ, this.defRotateZ);
        this.scaleX = LangUtil.checkAndGet(conf.scaleX, this.defScaleX);
        this.scaleY = LangUtil.checkAndGet(conf.scaleY, this.defScaleY);
        this.shearX = LangUtil.checkAndGet(conf.shearX, this.defShearX);
        this.shearY = LangUtil.checkAndGet(conf.shearY, this.defShearY);
        this.width = LangUtil.checkAndGet(conf.width, this.defWidth);
        this.height = LangUtil.checkAndGet(conf.height, this.defHeight);
        this.anchorX = LangUtil.checkAndGet(conf.anchorX, this.defAnchorX);
        this.anchorY = LangUtil.checkAndGet(conf.anchorY, this.defAnchorY);
        this.alpha = LangUtil.checkAndGet(conf.alpha, this.defAlpha);
        this.visible = LangUtil.checkAndGet(conf.visible, this.defVisible);
        this.cursor = LangUtil.checkAndGet(conf.cursor, this.defCursor);
        this.interactive = LangUtil.checkAndGet(conf.interactive, this.defInteractive);
        this.dirtyRenderSupport = LangUtil.checkAndGet(conf.dirtyRenderSupport, this.defDirtyRenderSupport);
        this.clip = LangUtil.checkAndGet(conf.clip, this.defClip);
        this.parent = LangUtil.checkAndGet(conf.parent, null);
        this.application = LangUtil.checkAndGet(conf.application, null);

        this._id = ++id;

        this._childNodes =  {
          count: 0, 
          defLayer: LangUtil.checkAndGet(conf.defLayer, this.defLayer), 
          nodeLayers: []
        };
        this._transformCtx = {
          localInvalid: false,
          localTransform: [0, 0, 0, 0, 0, 0],
          localReverseTransform: [0, 0, 0, 0, 0, 0],
          worldTransform: [0, 0, 0, 0, 0, 0],
          worldReverseTransform: [0, 0, 0, 0, 0, 0]
        };
        this._zoneCtx = {
          localInvalid: true,
          local: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0
          },
          world: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: 0,
            height: 0
          }
        };
        this._dirtyCtx = {
          isVisible: true,
          isZoneCross: true,
          isCheckRender: true,
          oriReported: false,
          curReported: false
        };

        functions.onLocalTransformChanged.call(this);
        functions.onLocalZoneChanged.call(this);

        this.addObserver('append', functions.onAppend, this);
        this.addObserver('remove', functions.onRemove, this);
        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      InnerNode.prototype.getID = function () {
        return this._id;
      }

      InnerNode.prototype.getLocalZone = function () {
        var localZone = this._zoneCtx.local;
        return {
          left: localZone.left,
          top: localZone.top,
          right: localZone.right,
          bottom: localZone.bottom,
          width: localZone.width,
          height: localZone.height
        };
      }

      InnerNode.prototype.getWorldZone = function () {
        var worldZone = this._zoneCtx.world;
        return {
          left: worldZone.left,
          top: worldZone.top,
          right: worldZone.right,
          bottom: worldZone.bottom,
          width: worldZone.width,
          height: worldZone.height
        };
      }

      InnerNode.prototype.getDirtyZone = function () {
        var worldZone = this._zoneCtx.world;
        if (worldZone.width > 0 && worldZone.height > 0) {
          return {
            left: worldZone.left - 1, 
            top: worldZone.top - 1,
            right: worldZone.right + 1,
            bottom: worldZone.bottom + 1,
            width: worldZone.width + 2,
            height: worldZone.height + 2
          }
        } else {
          return null;
        }
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

      InnerNode.prototype.appendChildNode = function (node) {
        node.removeFromParent(false);
        this.appendChildNodeToLayer(node, this._childNodes.defLayer);
      }

      InnerNode.prototype.appendChildNodeToLayer = function (node, layerIndex) {
        node.removeFromParent(false);
        var childNodes = this._childNodes;
        var nodeLayers = childNodes.nodeLayers;
        if (!nodeLayers[layerIndex]) {
          nodeLayers[layerIndex] = [];
        }
        childNodes.count ++;
        node.parent = this;
        nodeLayers[layerIndex].push(node);
        node.postNotification('append', [this]);
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
        node.postNotification('append', [this]);
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
                  return;
                }
              }
            }
          }
        }
        node.postNotification('remove', [this, destroy]);
      }

      InnerNode.prototype.removeFromParent = function (destroy) {
        var parent = this.parent;
        if (parent) {
          parent.removeChildNode(this, destroy);
        }
      }

      InnerNode.prototype.runAnimation = function (animation, fn, target, loop) {
        var application = this.findApplication()
        if (application) {
          application.runNodeAnimation(this, animation, fn, target, loop);
        }
      }

      InnerNode.prototype.stopAnimation = function (animation) {
        var application = this.findApplication()
        if (application) {
          application.stopNodeAnimation(this, animation);
        }
      }

      InnerNode.prototype.stopAllAnimation = function (children) {
        var application = this.findApplication()
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
          application.stopNodeAllAnimation(this);
        }
      }

      InnerNode.prototype.transformLVectorToW = function (vector) {
        return M2D.mulMat2DAndVect2D(this._transformCtx.worldTransform, vector);
      }

      InnerNode.prototype.transformWVectorToL = function (vector) {
        return M2D.mulMat2DAndVect2D(this._transformCtx.worldReverseTransform, vector);
      }

      InnerNode.prototype.transformLVectorToP = function (vector) {
        return M2D.mulMat2DAndVect2D(this._transformCtx.localTransform, vector);
      }

      InnerNode.prototype.transformPVectorToL = function (vector) {
        return M2D.mulMat2DAndVect2D(this._transformCtx.localReverseTransform, vector);
      }

      InnerNode.prototype.getTransformInParent = function () {
        var t = this._transformCtx.localTransform;
        return [t[0], t[1], t[2], t[3], t[4], t[5]];
      }

      InnerNode.prototype.getReverseTransformInParent = function () {
        var t = this._transformCtx.localReverseTransform;
        return [t[0], t[1], t[2], t[3], t[4], t[5]];
      }

      InnerNode.prototype.getTransformInWorld = function () {
        var t = this._transformCtx.worldTransform;
        return [t[0], t[1], t[2], t[3], t[4], t[5]];
      }

      InnerNode.prototype.getReverseTransformInWorld = function() {
        var t = this._transformCtx.worldReverseTransform;
        return [t[0], t[1], t[2], t[3], t[4], t[5]];
      }

      InnerNode.prototype.clipPath = function (render) {
        var zone = this._zoneCtx.local;
        render.beginPath();
        render.moveTo(zone.left + 5, zone.top + 5);
        render.lineTo(zone.right - 5, zone.top + 5);
        render.lineTo(zone.right - 5, zone.bottom - 5);
        render.lineTo(zone.left + 5, zone.bottom - 5);
        render.closePath();
      }

      InnerNode.prototype.checkNeedRender = function (renderZone) {
        var preRenders = this.getObserverByName('preClipRender');
        var postRenders = this.getObserverByName('postClipRender');
        return (preRenders && preRenders.length > 0) || (postRenders && postRenders.length > 0) ? true : false;
      }

      InnerNode.prototype.checkEventTrigger = function (name, e, x, y) {
        var zone = this._zoneCtx.local;
        if (x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom) {
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

      InnerNode.prototype._syncTransform = function (parentWTransform, parentWReverseTransform, renderZone, parentUpdateTransform) {
        this.postNotification('frame');
        var transformCtx = this._transformCtx;
        var zoneCtx = this._zoneCtx;
        var dirtyCtx = this._dirtyCtx;
        var localZone = zoneCtx.local;
        var worldZone = zoneCtx.world;
        if (zoneCtx.localInvalid) {
          localZone.top = Math.ceil(this.height * (-this.anchorY));
          localZone.bottom = Math.floor(this.height + localZone.top);
          localZone.left = Math.ceil(this.width * (-this.anchorX));
          localZone.right = Math.floor(this.width + localZone.left);
          localZone.width = localZone.right - localZone.left;
          localZone.height = localZone.bottom - localZone.top;
        }
        
        if (transformCtx.localInvalid) {
          transformCtx.localTransform = M2D.shear2D(M2D.scale2D(M2D.rotate2D(M2D.translate2D(M2D.newIdentityMat2D(), this.x, this.y), this.rotateZ), this.scaleX, this.scaleY), this.shearX, this.shearY);
          transformCtx.localReverseTransform = M2D.reverse2D(transformCtx.localTransform);
          transformCtx.worldTransform = M2D.mulMat2D(parentWTransform, transformCtx.localTransform);
          transformCtx.worldReverseTransform = M2D.mulMat2D(transformCtx.localReverseTransform, parentWReverseTransform);
        } else if (parentUpdateTransform) {
          transformCtx.worldTransform = M2D.mulMat2D(parentWTransform, transformCtx.localTransform);
          transformCtx.worldReverseTransform = M2D.mulMat2D(transformCtx.localReverseTransform, parentWReverseTransform);
        }

        if (zoneCtx.localInvalid || transformCtx.localInvalid || parentUpdateTransform) {
          var p1 = this.transformLVectorToW([localZone.left, localZone.top]);
          var p2 = this.transformLVectorToW([localZone.left, localZone.bottom]);
          var p3 = this.transformLVectorToW([localZone.right, localZone.top]);
          var p4 = this.transformLVectorToW([localZone.right, localZone.bottom]);
          worldZone.top = Math.ceil(Math.min(p1[1], p2[1], p3[1], p4[1]));
          worldZone.bottom = Math.floor(Math.max(p1[1], p2[1], p3[1], p4[1]));
          worldZone.left = Math.ceil(Math.min(p1[0], p2[0], p3[0], p4[0]));
          worldZone.right = Math.floor(Math.max(p1[0], p2[0], p3[0], p4[0]));
          worldZone.width = worldZone.right - worldZone.left;
          worldZone.height = worldZone.bottom - worldZone.top;
        }

        var layers = this._childNodes.nodeLayers;
        for (var i = 0, len = layers.length; i < len; ++i) {
          var layer = layers[i];
          if (layer) {
            for (var j = 0, len2 = layer.length; j < len2; ++j) {
              layer[j]._syncTransform(transformCtx.worldTransform, transformCtx.worldReverseTransform, renderZone, parentUpdateTransform || transformCtx.localInvalid);
            }
          }
        }

        dirtyCtx.isZoneCross = localZone.width > 0 && localZone.height > 0 && GeometryUtil.isZoneCross(renderZone, localZone);
        dirtyCtx.isCheckRender = this.checkNeedRender();
        dirtyCtx.isVisible = this.visible;
        transformCtx.localInvalid = false;
        zoneCtx.localInvalid = false;
      }

      InnerNode.prototype.dirty = function () {
        var app = this.findApplication();
        if (app !== null) {
          this._reportOriDirtyZone(app);
        }
      }

      InnerNode.prototype._reportOriDirtyZone = function (app) {
        var dirtyCtx = this._dirtyCtx;
        if (!dirtyCtx.oriReported && dirtyCtx.isZoneCross && dirtyCtx.isCheckRender && dirtyCtx.isVisible) {
          app.receiveDirtyZone(this, this.getDirtyZone());
          dirtyCtx.oriReported = true;
        } else {
          app.receiveDirtyZone(this, null);
          dirtyCtx.oriReported = true;
        }

        if (dirtyCtx.isVisible) {
          var layers = this._childNodes.nodeLayers;
          for (var i = 0, len = layers.length; i < len; ++i) {
            var layer = layers[i];
            if (layer) {
              for (var j = 0, len2 = layer.length; j < len2; ++j) {
                layer[j]._reportOriDirtyZone(app);
              }
            }
          }
        }
      }

      InnerNode.prototype._reportCurDirtyZone = function (app, dirtyZones) {
        var result = false;
        var dirtyCtx = this._dirtyCtx;
        if (!dirtyCtx.isVisible) {
          return false;
        }
        if (dirtyCtx.isZoneCross && dirtyCtx.isCheckRender) {
          if (!dirtyCtx.curReported) {
            var wTrans = this._transformCtx.worldTransform;
            if (dirtyCtx.oriReported) {
              var selfDirtyZone = this.getDirtyZone();
              dirtyCtx.curReported = true;
              if (selfDirtyZone !== null) {
                result = app.receiveDirtyZone(this, selfDirtyZone);
              }
            } else if (!this.dirtyRenderSupport || !(wTrans[0] === 1 && wTrans[1] === 0 && wTrans[3] === 0 && wTrans[4] === 1)) {
              var selfDirtyZone = this.getDirtyZone();
              if (selfDirtyZone !== null) {
                for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                  var dirtyZone = dirtyZones[i];
                  if (GeometryUtil.isZoneCross(dirtyZone, selfDirtyZone)) {
                    result = app.receiveDirtyZone(this, selfDirtyZone);
                    dirtyCtx.curReported = true;
                    break;
                  }
                }
              }
            }
          }
        }
        var layers = this._childNodes.nodeLayers;
        for (var i = 0, len = layers.length; i < len; ++i) {
          var layer = layers[i];
          if (layer) {
            for (var j = 0, len2 = layer.length; j < len2; ++j) {
              result = result || layer[j]._reportCurDirtyZone(app, dirtyZones);
            }
          }
        }
        return result;
      }

      InnerNode.prototype._dispatchRender = function (render, parentAlpha, parentVisisble, renderZone, dirtyZones) {
        var dirtyCtx = this._dirtyCtx;
        var alpha = this.alpha * parentAlpha;
        var visible = parentVisisble && dirtyCtx.isVisible;
        if (visible && alpha > 0) {
          if (this.clip) {
            // 如果发生裁剪
            if (dirtyCtx.isZoneCross) {
              var w = this._transformCtx.worldTransform;
              // 设置矩阵
              render.setTransform(w[0], w[3], w[1], w[4], w[2], w[5]);
              // 设置透明度
              render.globalAlpha = alpha;
              // 绘制自身
              if (dirtyCtx.curReported) {
                this.postNotification('preClipRender', [render, [this._zoneCtx.local]]);
                this.clipPath(render);
                render.clip();
                this.postNotification('postClipRender', [render, [this._zoneCtx.local]]);
                this._dispatchChildrenRender(render, alpha, visible, renderZone, dirtyZones);
                render.restore();
              } else {
                var worldZone = this._zoneCtx.world;
                var crossDirtyZones = [];
                for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                  var crossDirtyZone = GeometryUtil.getZoneCross(worldZone, dirtyZones[i]);
                  if (crossDirtyZone !== null) {
                    crossDirtyZone.left -= w[2];
                    crossDirtyZone.right -= w[2];
                    crossDirtyZone.top -= w[5];
                    crossDirtyZone.bottom -= [5];
                    crossDirtyZones.push(crossDirtyZone);
                  }
                }
                this.postNotification('preClipRender', [render, crossDirtyZones]);
                this.clipPath(render);
                render.clip();
                this.postNotification('postClipRender', [render, crossDirtyZones]);
                this._dispatchChildrenRender(render, alpha, crossDirtyZones.length > 0, renderZone, dirtyZones);
                render.restore();
              }
            }
          } else {
            if (dirtyCtx.isZoneCross) {
              if (dirtyCtx.isCheckRender) {
                var w = this._transformCtx.worldTransform;
                // 设置矩阵
                render.setTransform(w[0], w[3], w[1], w[4], w[2], w[5]);
                // 设置透明度
                render.globalAlpha = alpha;
                // 绘制自身
                if (dirtyCtx.curReported) {
                  this.postNotification('preClipRender', [render, [this._zoneCtx.local]]);
                  this.postNotification('postClipRender', [render, [this._zoneCtx.local]]);
                } else {
                  var worldZone = this._zoneCtx.world;
                  var crossDirtyZones = [];
                  for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                    var crossDirtyZone = GeometryUtil.getZoneCross(worldZone, dirtyZones[i]);
                    if (crossDirtyZone !== null) {
                      crossDirtyZone.left -= w[2];
                      crossDirtyZone.right -= w[2];
                      crossDirtyZone.top -= w[5];
                      crossDirtyZone.bottom -= w[5];
                      crossDirtyZones.push(crossDirtyZone);
                    }
                  }
                  if (crossDirtyZones.length > 0) {
                    this.postNotification('preClipRender', [render, crossDirtyZones]);
                    this.postNotification('postClipRender', [render, crossDirtyZones]);
                  }
                }
              }
              // 绘制子元素
              this._dispatchChildrenRender(render, alpha, visible, renderZone, dirtyZones);
            } else {
              this._dispatchChildrenRender(render, alpha, visible, renderZone, dirtyZones);
            }
          }
        } else {
          this._dispatchChildrenRender(render, alpha, visible, renderZone, dirtyZones);
        }
        dirtyCtx.oriReported = false;
        dirtyCtx.curReported = false;
      }

      InnerNode.prototype._dispatchChildrenRender = function (render, alpha, visible, renderZone, dirtyZones) {
        var layers = this._childNodes.nodeLayers;
        for (var i = 0, len = layers.length; i < len; ++i) {
          var layer = layers[i];
          if (layer) {
            for (var j = 0, len2 = layer.length; j < len2; ++j) {
              layer[j]._dispatchRender(render, alpha, visible, renderZone, dirtyZones);
            }
          }
        }
      }

      InnerNode.prototype._dispatchMouseTouchEvent = function (name, e) {
        if (this.visible) {
          var lPoint = this.transformWVectorToL([e.offsetX, e.offsetY]);
          var result = this.checkEventTrigger(name, e, lPoint[0], lPoint[1]);

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
              this.postNotification(name, [e]);
            }
            return true;
          } else {
            if (result) {
              if (this.interactive) {
                this.postNotification(name, [e]);
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

      return InnerNode;
    })();

    return Node;
  }
)()