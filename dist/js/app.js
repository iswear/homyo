/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * util for class extend and so on
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

/* harmony default export */ __webpack_exports__["a"] = ((
  function () {

    var util = (function() {
      /**
       * 缺省初始化函数
       * @param config 配置
       */
      function defaultInitFn (conf) {
        
      }

      /**
       * 缺省销毁函数
       */
      function defaultDestroyFn() {
        
      }

      /**
       * 继承父级调用解决方案
       * @param fnName 函数名
       * @param args 参数
       * @returns {undefined}
       */
      function superCallFn (fnName, args) {
        if (arguments.length == 1 || !args) {
          args = [];
        }
        var that = this.__super_ ? this.__super_ : this;
        var prototype = that._super_;
        var ret = undefined;
        while (typeof prototype[fnName] === 'function') {
          if (that[fnName] === prototype[fnName]) {
            prototype = prototype._super_;
            continue;
          } else {
            this.__super_ = prototype;
            ret = prototype[fnName].apply(this, args);
            break;
          }
        }
        this.__super_ = null;
        return ret;
      }

      function extend (base) {
        var obj = function (conf) {
          this.init(conf);
          if (this.defineNotifyProperty) {
            for (var item in this) {
              if (this.hasOwnProperty(item)) {
                var prefix = item.charAt(0)
                if (prefix == '_' || prefix == '$') {
                  continue;
                }
                var value = this[item];
                delete this[item];
                this.defineNotifyProperty(item, value);
              }
            }
          }
        }
        if (base) {
          obj.prototype = Object.create(base.prototype);
          obj.prototype._super_ = base.prototype;
        } else {
          obj.prototype._super_ = {};
        }
        if (obj.prototype.init === undefined) {
          obj.prototype.init = defaultInitFn;
        }
        if (obj.prototype.destroy === undefined) {
          obj.prototype.destroy = defaultDestroyFn;
        }
        if (obj.prototype.super === undefined) {
          obj.prototype.super = superCallFn;
        }
        return obj;
      }

      function isUndefined (val) {
        return val === undefined;
      }

      function isNotUndefined (val) {
        return !isUndefined(val);
      }

      function isBoolean (val) {
        return typeof val === 'boolean';
      }

      function isNotBoolean (val) {
        return !isBoolean(val);
      }

      function isNumber (val) {
        return typeof val === 'number' && !isNaN(val);
      }

      function isNotNumber (val) {
        return !isNumber(val);
      }

      function isString (val) {
        return typeof val === 'string';
      }

      function isNotString (val) {
        return !isNotString(val);
      }

      function isArray (val) {
        return val instanceof Array;
      }

      function isNotArray (val) {
        return !isArray(val);
      }

      function isObject (val) {
        return typeof val === 'object';
      }

      function isNotObject (val) {
        return !isObject(val);
      }

      function isFunction (val) {
        return typeof val === 'function';
      }

      function isNotFunction (val) {
        return !isFunction(val);
      }

      function clone (val) {
        if (util.isArray(val)) {
          var rArr = [];
          for (var i = 0, size = val.length; i < size; ++i) {
            rArr.push(util.clone(val[i]));
          }
          return rArr;
        } else if (util.isObject(val)) {
          var rObj = {};
          for (var item in val) {
            if (val.hasOwnProperty(item)) {
              rObj[item] = util.clone(val[item]);
            }
          }
          return rObj;
        } else {
          return val;
        }
      }

      function checkAndGet (val, defVal) {
        return isUndefined(val) ? defVal : val;
      }

      return {
        extend: extend,
        isUndefined: isUndefined,
        isNotUndefined: isNotUndefined,
        isBoolean: isBoolean,
        isNotBoolean: isNotBoolean,
        isNumber: isNumber,
        isNotNumber: isNotNumber,
        isString: isString,
        isNotString: isNotString,
        isArray: isArray,
        isNotArray: isNotArray,
        isObject: isObject,
        isNotObject: isNotObject,
        isFunction: isFunction,
        isNotFunction: isNotFunction,
        clone: clone,
        checkAndGet: checkAndGet
      }
    })();

    return util;
  }
)());

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/**
 * provider and publish notification
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */


/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var Notifier = (function () {
      var InnerNotifier = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(null);

      InnerNotifier.prototype.init = function () {
        this.$properties = {};
        this._observers = {};
      }

      /**
       * 添加观察者
       * @param name 观察消息名称
       * @param fn 回调函数
       * @param target 回调this
       * @param order 排序
       */
      InnerNotifier.prototype.addObserver = function (name, fn, target, order) {
        var observers = this._observers[name];
        if (!observers) {
          observers = [];
          this._observers[name] = observers;
        }
        var order = order ? order : 1;
        var newObserver = {
          fn: fn,
          target: target,
          order: order
        };
        for (var i = 0, len = observers.length; i < len; ++i) {
          var observer = observers[i];
          if (observer.order > order) {
            observers.splice(i, 0, newObserver);
            return;
          }
        }
        observers.push(newObserver);
      }

      /**
       * 移除观察者
       * @param name 事件名称
       * @param fn 回调函数
       * @param target this
       */
      InnerNotifier.prototype.removeObserver = function (name, fn, target) {
        var observers = this._observers[name];
        if (observers) {
          var observer;
          for (var i = 0, len = observers.length; i < len; ++i) {
            observer = observers[i];
            if (observer.fn === fn && observer.target === target) {
              observers.splice(i, 1);
              i--;
              len--;
            }
          }
        }
      }

      /**
       * 获取某个事件的所有观察者
       * @param name
       * @returns {*}
       */
      InnerNotifier.prototype.getObserverByName = function (name) {
        return this._observers[name];
      }

      InnerNotifier.prototype.getObserverByAllParams = function (name, fn, target) {
        var observers = this._observers[name];
        if (observers) {
          var observer;
          for (var i = 0, len = observers.length; i < len; ++i) {
            observer = observers[i];
            if (observer.fn === fn && observer.target === target) {
              return observer;
            }
          }
        }
        return null;
      }
      
      /**
       * 发送消息
       * @param name
       * @param params
       * @param sender
       */
      InnerNotifier.prototype.postNotification = function (name, params) {
        var observers = this._observers[name];
        if (observers) {
          var len = observers.length;
          if (len > 0) {
            params = params ? params : [];
            params.unshift(this);
            var observer;
            for (var i = 0; i < len; ++i) {
              observer = observers[i];
              observer.fn.apply(observer.target, params);
            }
          }
        }
      }

      /**
       * 定义通知属性
       * @param name
       * @param value
       */
      InnerNotifier.prototype.defineNotifyProperty = function (name, value) {
        Object.defineProperty(this, name, {
          configurable: false,
          enumerable: false,
          get: function () {
            return this.$properties[name];
          },
          set: function (val) {
            var oldVal = this.$properties[name];
            if (oldVal !== val) {
              this.$properties[name] = val;
              this.postNotification('propertyChanged', [name, val, oldVal]);
            }
          }
        });
        if (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(value)) {
          this[name] = value;
        }
      }

      /**
       * 添加自定义属性
       * @param name
       * @param container
       * @param value
       * @param setter
       * @param getter
       */
      InnerNotifier.prototype.defineCustomProperty = function (name, container, value, getter, setter) {
        Object.defineProperty(this, name, {
          configurable: false,
          enumerable: false,
          get: getter,
          set: setter
        });
        if (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(value)) {
          container[name] = value;
        }
      }

      /**
       * 清理资源
       */
      InnerNotifier.prototype.destroy = function () {
        this.$properties = null;
        this._observers = null;
      }

      return InnerNotifier;
    })();

    return Notifier;
  }
)());

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__ = __webpack_require__(4);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */





/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var M2D = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].m2d;
    
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
      var InnerNode = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

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
        this.x = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.x, this.defX);
        this.y = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.y, this.defY);
        this.rotateZ = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.rotateZ, this.defRotateZ);
        this.scaleX = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.scaleX, this.defScaleX);
        this.scaleY = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.scaleY, this.defScaleY);
        this.shearX = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.shearX, this.defShearX);
        this.shearY = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.shearY, this.defShearY);
        this.width = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.width, this.defWidth);
        this.height = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.height, this.defHeight);
        this.anchorX = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.anchorX, this.defAnchorX);
        this.anchorY = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.anchorY, this.defAnchorY);
        this.alpha = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.alpha, this.defAlpha);
        this.visible = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.visible, this.defVisible);
        this.cursor = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.cursor, this.defCursor);
        this.interactive = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.interactive, this.defInteractive);
        this.dirtyRenderSupport = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.dirtyRenderSupport, this.defDirtyRenderSupport);
        this.clip = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.clip, this.defClip);
        this.parent = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.parent, null);
        this.application = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.application, null);

        this._id = ++id;

        this._childNodes =  {
          count: 0, 
          defLayer: __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.defLayer, this.defLayer), 
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
        return {
          left: worldZone.left - 1, 
          top: worldZone.top - 1,
          right: worldZone.right + 1,
          bottom: worldZone.bottom + 1,
          width: worldZone.width + 2,
          height: worldZone.height + 2
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
          localZone.width = Math.round(this.width);
          localZone.height = Math.round(this.height);
          localZone.top = Math.round(localZone.height * (-this.anchorY));
          localZone.bottom = Math.round(localZone.height + localZone.top);
          localZone.left = Math.round(localZone.width * (-this.anchorX));
          localZone.right = Math.round(localZone.width + localZone.left);
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
          worldZone.top = Math.round(Math.min(p1[1], p2[1], p3[1], p4[1]));
          worldZone.bottom = Math.round(Math.max(p1[1], p2[1], p3[1], p4[1]));
          worldZone.left = Math.round(Math.min(p1[0], p2[0], p3[0], p4[0]));
          worldZone.right = Math.round(Math.max(p1[0], p2[0], p3[0], p4[0]));
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

        dirtyCtx.isZoneCross = __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].isZoneCross(renderZone, this.getDirtyZone());
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
              result = app.receiveDirtyZone(this, selfDirtyZone);
              dirtyCtx.curReported = true;
            } else if (!this.dirtyRenderSupport || !(wTrans[0] === 1 && wTrans[1] === 0 && wTrans[3] === 0 && wTrans[4] === 1)) {
              var selfDirtyZone = this.getDirtyZone();
              for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                var dirtyZone = dirtyZones[i];
                if (__WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].isZoneCross(dirtyZone, selfDirtyZone)) {
                  result = app.receiveDirtyZone(this, selfDirtyZone);
                  dirtyCtx.curReported = true;
                  break;
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
                  var crossDirtyZone = __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].getZoneCross(worldZone, dirtyZones[i]);
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
                  var selfDirtyZone = this.getDirtyZone();
                  var crossDirtyZones = [];
                  for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                    var crossDirtyZone = __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].getZoneCross(selfDirtyZone, dirtyZones[i]);
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
)());

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */



/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var functions = (function () {
      function contextPropertyGetter (name) {
        return function () {
          return this.$context[name];
        }
      }

      function contextPropertySetter (name) {
        return function (val) {
          if (this.$context[name] !== val) {
            this.$context[name] = val;
          }
        }
      }

      function canvasPropertyGetter (name) {
        return function () {
          return this.$canvas[name];
        }
      }

      function canvasPropertySetter (name) {
        return function (val) {
          if (this.$canvas[name] !== val) {
            this.$canvas[name] = val;
          }
        }
      }

      return {
        contextPropertyGetter: contextPropertyGetter,
        contextPropertySetter: contextPropertySetter,
        canvasPropertyGetter: canvasPropertyGetter,
        canvasPropertySetter: canvasPropertySetter
      }
    })();
    
    var CanvasRender = (function () {
      var InnerCanvasRender = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

      InnerCanvasRender.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.$canvas = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.canvas, null);
        this.$context = this.$canvas.getContext('2d');

        this.defineCanvasProperty('width', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.width, undefined), false);
        this.defineCanvasProperty('height', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.height, undefined), false);
        this.defineCanvasProperty('clientWidth', undefined, true);
        this.defineCanvasProperty('clientHeight', undefined, true);
        this.defineContextProperty('fillStyle');
        this.defineContextProperty('strokeStyle');
        this.defineContextProperty('shadowColor');
        this.defineContextProperty('shadowBlur');
        this.defineContextProperty('shadowOffsetX');
        this.defineContextProperty('shadowOffsetY');
        this.defineContextProperty('lineCap');
        this.defineContextProperty('lineJoin');
        this.defineContextProperty('lineWidth');
        this.defineContextProperty('miterLimit');
        this.defineContextProperty('font');
        this.defineContextProperty('textAlign');
        this.defineContextProperty('textBaseline');
        this.defineContextProperty('globalAlpha');
        this.defineContextProperty('globalCompositeOperation');
      }

      InnerCanvasRender.prototype.getCanvas = function () {
        return this.$canvas;
      }

      InnerCanvasRender.prototype.getContext = function () {
        return this.$context;
      }

      InnerCanvasRender.prototype.defineContextProperty = function (name, value, readonly) {
        this.defineCustomProperty(
          name,
          this.$context,
          value,
          functions.contextPropertyGetter(name),
          readonly ? undefined : functions.contextPropertySetter(name)
        );
      }

      InnerCanvasRender.prototype.defineCanvasProperty = function (name, value, readonly) {
        this.defineCustomProperty(
          name,
          this.$canvas,
          value,
          functions.canvasPropertyGetter(name),
          readonly ? undefined : functions.canvasPropertySetter(name)
        );
      }

      InnerCanvasRender.prototype.beginPath = function () {
        this.$context.beginPath();
      }

      InnerCanvasRender.prototype.moveTo = function (x, y) {
        this.$context.moveTo(x, y);
      }

      InnerCanvasRender.prototype.lineTo = function (x, y) {
        this.$context.lineTo(x, y);
      }

      InnerCanvasRender.prototype.rect = function (x, y, width, height) {
        this.$context.rect(x, y, width, height);
      }

      InnerCanvasRender.prototype.arc = function (x, y, r, startAngle, endAngle, reverse) {
        this.$context.arc(x, y, r, startAngle, endAngle, reverse);
      }

      InnerCanvasRender.prototype.arcTo = function (x1, y1, x2, y2, r) {
        this.$context.arcTo(x1, y1, x2, y2, r);
      }

      InnerCanvasRender.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
        this.$context.quadraticCurveTo(cpx, cpy, x, y);
      }

      InnerCanvasRender.prototype.bezierCurveTo = function (cpx1, cpy1, cpx2, cpy2, x, y) {
        this.$context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
      }

      InnerCanvasRender.prototype.closePath = function () {
        this.$context.closePath();
      }

      InnerCanvasRender.prototype.buildPath = function (points) {
        this.$context.moveTo(points[0][0], points[0][1])
        for (var i = 1, len = points.length; i < len; ++i) {
          this.$context.lineTo(points[i][0], points[i][1])
        }
      }

      InnerCanvasRender.prototype.isPointInPath = function (x, y) {
        return this.$context.isPointInPath(x, y);
      }

      InnerCanvasRender.prototype.stroke = function () {
        this.$context.stroke();
      }

      InnerCanvasRender.prototype.strokeRect = function (x, y, width, height) {
        this.$context.strokeRect(x, y, width, height);
      }

      InnerCanvasRender.prototype.strokeText = function (text, x, y) {
        this.$context.strokeText(text, x, y);
      }

      InnerCanvasRender.prototype.strokeTextExt = function (text, x, y, maxWidth) {
        this.$context.strokeText(text, x, y, maxWidth);
      }

      InnerCanvasRender.prototype.fill = function () {
        this.$context.fill();
      }

      InnerCanvasRender.prototype.fillRect = function (x, y, width, height) {
        this.$context.fillRect(x, y, width, height);
      }

      InnerCanvasRender.prototype.fillText = function (text, x, y) {
        this.$context.fillText(text, x, y);
      }

      InnerCanvasRender.prototype.fillTextExt = function (text, x, y, maxWidth) {
        this.$context.fillText(text, x, y, maxWidth);
      }

      InnerCanvasRender.prototype.drawImage = function (img, x, y) {
        this.$context.drawImage(img, x, y);
      }

      InnerCanvasRender.prototype.drawImageExt = function (img, sx, sy, swidth, sheight, x, y, width, height) {
        this.$context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
      }

      InnerCanvasRender.prototype.createImageData = function (width, height) {
        this.$context.createImageData(width, height)
      }

      InnerCanvasRender.prototype.getImageData = function (x, y, width, height) {
        return this.$context.getImageData(x, y, width, height);
      }

      InnerCanvasRender.prototype.putImageData = function (data, x, y) {
        this.$context.putImageData(data, x, y);
      }

      InnerCanvasRender.prototype.putImageDataExt = function (data, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
        this.$context.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
      }

      InnerCanvasRender.prototype.createLinearGradient = function (x0, y0, x1, y1) {
        return this.$context.createLinearGradient(x0, y0, x1, y1);
      }

      InnerCanvasRender.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
        return this.$context.createRadialGradient(x0, y0, r0, x1, y1, r1);
      }

      InnerCanvasRender.prototype.createPattern = function (image, repeatMode) {
        this.$context.createPattern(image, repeatMode);
      }

      InnerCanvasRender.prototype.clip = function () {
        this.$context.save();
        this.$context.clip();
      }

      InnerCanvasRender.prototype.clear = function () {
        this.$context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
      }

      InnerCanvasRender.prototype.clearRect = function (x, y, width, height) {
        this.$context.clearRect(x, y, width, height);
      }

      InnerCanvasRender.prototype.save = function () {
        this.$context.save();
      }

      InnerCanvasRender.prototype.restore = function () {
        this.$context.restore();
      }

      InnerCanvasRender.prototype.toDataURL = function () {
        return this.$canvas.toDataURL();
      }

      InnerCanvasRender.prototype.translate = function (x, y) {
        this.$context.translate(x, y);
      }

      InnerCanvasRender.prototype.rotate = function (angle) {
        this.$context.rotate(angle);
      }

      InnerCanvasRender.prototype.scale = function (sx, sy) {
        this.$context.scale(sx, sy);
      }

      InnerCanvasRender.prototype.transform = function (a, b, c, d, e, f) {
        this.$context.transform(a, b, c, d, e, f);
      }

      InnerCanvasRender.prototype.setTransform = function (a, b, c, d, e, f) {
        this.$context.setTransform(a, b, c, d, e, f);
      }

      InnerCanvasRender.prototype.destroy = function () {
        this.$context = null;
        this.$canvas = null;
        this.super('destroy')
      }

      return InnerCanvasRender;
    })();

    return CanvasRender;
  }
)());

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * util for class extend and so on
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var util = (function() {
      function isZoneCross(zone1, zone2) {
        return !isZoneNotCross(zone1, zone2);
      }

      function isZoneNotCross(zone1, zone2) {
        return zone1.left >= zone2.right || zone1.right <= zone2.left || zone1.top >= zone2.bottom || zone1.bottom <= zone2.top;
      }

      function getZoneCross(zone1, zone2) {
        var left = Math.max(zone1.left, zone2.left);
        var right = Math.min(zone1.right, zone2.right);
        var width = right - left;
        if (width <= 0) {
          return null;
        }
        var top = Math.max(zone1.top, zone2.top);
        var bottom = Math.min(zone1.bottom, zone2.bottom);
        var height = bottom - top;
        if (height <= 0) {
          return null;
        }
        return {
          left: left,
          right: right,
          top: top,
          bottom: bottom,
          width: width,
          height: height
        }
      }
      
      return {
        isZoneCross: isZoneCross,
        isZoneNotCross: isZoneNotCross,
        getZoneCross: getZoneCross
      }
    })();

    return util;
  }
)());

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */


/**
 * 配置参数: 无
 */
/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var BaseAnimation = (function () {
      var InnerBaseAnimation = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

      InnerBaseAnimation.prototype.execute = function (binder, deltaTime) {}

      return InnerBaseAnimation;
    })();

    return BaseAnimation;
  }
)());

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */



/**
 * 配置参数：
 * {
 *    node:,
 *    animation:,
 *    fn:,
 *    target:
 * }
 */
/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var Binder = (function () {
      var InnerBinder = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

      InnerBinder.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('node', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.node, null));
        this.defineNotifyProperty('animation', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.animation, null));
        this.defineNotifyProperty('callbackFn', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.callbackFn, null));
        this.defineNotifyProperty('callbackTarget', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.callbackTarget, null));
        this.defineNotifyProperty('loop', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.loop, null));
        
        this._runParams = {};
      }

      InnerBinder.prototype.execute = function (deltaTime) {
        var result = this.animation.execute(this, deltaTime);
        if (this.callbackFn !== null) {
          this.callbackFn.call(this.callbackTarget, this, result);
        }
        return result;
      }

      InnerBinder.prototype.getRunParam = function (key) {
        return this._runParams[key];
      }

      InnerBinder.prototype.setRunParam = function (key, value) {
        this._runParams[key] = value;
      }

      InnerBinder.prototype.destroy = function () {
        this.node = null;
        this.animation = null;
        this.callbackFn = null;
        this.callbackTarget = null;
        this.loop = null;
        this.super('destroy');
      }

      return InnerBinder;
    })();

    return Binder;
  }
)());

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */
/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var util = {
      m2d: {
        newIdentityMat2D: function () {
          // [
          //   1, 0, 0,
          //   0, 1, 0,
          //   0, 0, 1
          // ];
          return [
            1, 0, 0,
            0, 1, 0
          ];
        },
        resetMat2D: function (mat) {
          mat[0] = 1;
          mat[1] = 0;
          mat[2] = 0;
          mat[3] = 0;
          mat[4] = 1;
          mat[5] = 0;
          return mat;
        },
        copyMat2D: function (srcMat, desMat) {
          for (var i = 0, len = srcMat.length; i < len; ++i) {
            desMat[i] = srcMat[i];
          }
          return desMat;
        },
        mulMat2D: function (mat1, mat2) {
          return [
            mat1[0] * mat2[0] + mat1[1] * mat2[3], 
            mat1[0] * mat2[1] + mat1[1] * mat2[4], 
            mat1[0] * mat2[2] + mat1[1] * mat2[5] + mat1[2],
            mat1[3] * mat2[0] + mat1[4] * mat2[3], 
            mat1[3] * mat2[1] + mat1[4] * mat2[4], 
            mat1[3] * mat2[2] + mat1[4] * mat2[5] + mat1[5]
          ];
        },
        mulMat2DAndVect2D: function (mat, vect) {
          return [
            mat[0] * vect[0] + mat[1] * vect[1] + mat[2],
            mat[3] * vect[0] + mat[4] * vect[1] + mat[5]
          ];
        },
        translate2D: function (mat, x, y) {
          // [
          //   1, 0, x,
          //   0, 1, y,
          //   0, 0, 1
          // ]
          return [
            mat[0], 
            mat[1], 
            mat[0] * x + mat[1] * y + mat[2],
            mat[3], 
            mat[4], 
            mat[3] * x + mat[4] * y + mat[5]
          ];
        },
        rotate2D: function (mat, angle) {
          // [
          //   cos(angle), -sin(angle), 0,
          //   sin(angle),  cos(angle), 0,
          //   0, 0, 1
          // ]
          var s = Math.sin(angle);
          var c = Math.cos(angle);
          return [
            mat[0] * c + mat[1] * s,
            mat[1] * c - mat[0] * s,
            mat[2],
            mat[3] * c + mat[4] * s,
            mat[4] * c - mat[3] * s, 
            mat[5]
          ];
        },
        scale2D: function (mat, x, y) {
          // [
          //   x, 0, 0,
          //   0, y, 0,
          //   0, 0, 1
          // ]
          return [
            mat[0] * x,
            mat[1] * y, 
            mat[2],
            mat[3] * x, 
            mat[4] * y, 
            mat[5]
          ];
        },
        shear2D: function (mat, x, y) {
          // [
          //   1, y, 0,
          //   x, 1, 0,
          //   0, 0, 1
          // ]
          return [
            mat[0] + mat[1] * y, 
            mat[0] * x + mat[1], 
            mat[2],
            mat[3] + mat[4] * y, 
            mat[3] * x + mat[4], 
            mat[5]
          ];
        },
        reverse2D: function (mat) {
          /**
           * 伴随矩阵求解逆矩阵
           */
          var temp = mat[0] * mat[4] - mat[1] * mat[3];
          return [
            mat[4] / temp, 
            -mat[1] / temp, 
            (mat[1] * mat[5] - mat[2] * mat[4]) / temp,
            -mat[3] / temp, 
            mat[0] / temp, 
            (mat[3] * mat[2] - mat[0] * mat[5]) / temp
          ];
        }
      },
      m3d: {
        newIdentityMat3D: function () {
          return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
          ]
        },
        resetMat3D: function (mat) {
          mat[0] = 1;
          mat[1] = 0;
          mat[2] = 0;
          mat[3] = 0;
          mat[4] = 0;
          mat[5] = 1;
          mat[6] = 0;
          mat[7] = 0;
          mat[8] = 0;
          mat[9] = 0;
          mat[10] = 1;
          mat[11] = 0;
          mat[12] = 0;
          mat[13] = 0;
          mat[14] = 0;
          mat[15] = 1;
        },
        copyMat3D: function (srcMat, desMat) {
          for (var i = 0, len = srcMat.length; i < len; ++i) {
            desMat[i] = srcMat[i];
          }
          return desMat;
        },
        mulMat3D: function (mat1, mat2) {
          return [
            mat1[0] * mat2[0] + mat1[1] * mat2[4] + mat1[2] * mat2[8] + mat1[3] * mat2[12],
            mat1[0] * mat2[1] + mat1[1] * mat2[5] + mat1[2] * mat2[9] + mat1[3] * mat2[13],
            mat1[0] * mat2[2] + mat1[1] * mat2[6] + mat1[2] * mat2[10] + mat1[3] * mat2[14],
            mat1[0] * mat2[3] + mat1[1] * mat2[7] + mat1[2] * mat2[11] + mat1[3] * mat2[15],
            mat1[4] * mat2[0] + mat1[5] * mat2[4] + mat1[6] * mat2[8] + mat1[7] * mat2[12],
            mat1[4] * mat2[1] + mat1[5] * mat2[5] + mat1[6] * mat2[9] + mat1[7] * mat2[13],
            mat1[4] * mat2[2] + mat1[5] * mat2[6] + mat1[6] * mat2[10] + mat1[7] * mat2[14],
            mat1[4] * mat2[3] + mat1[5] * mat2[7] + mat1[6] * mat2[11] + mat1[7] * mat2[15],
            mat1[8] * mat2[0] + mat1[9] * mat2[4] + mat1[10] * mat2[8] + mat1[11] * mat2[12],
            mat1[8] * mat2[1] + mat1[9] * mat2[5] + mat1[10] * mat2[9] + mat1[11] * mat2[13],
            mat1[8] * mat2[2] + mat1[9] * mat2[6] + mat1[10] * mat2[10] + mat1[11] * mat2[14],
            mat1[8] * mat2[3] + mat1[9] * mat2[7] + mat1[10] * mat2[11] + mat1[11] * mat2[15],
            mat1[12] * mat2[0] + mat1[13] * mat2[4] + mat1[14] * mat2[8] + mat1[15] * mat2[12],
            mat1[12] * mat2[1] + mat1[13] * mat2[5] + mat1[14] * mat2[9] + mat1[15] * mat2[13],
            mat1[12] * mat2[2] + mat1[13] * mat2[6] + mat1[14] * mat2[10] + mat1[15] * mat2[14],
            mat1[12] * mat2[3] + mat1[13] * mat2[7] + mat1[14] * mat2[11] + mat1[15] * mat2[15]          
          ];
        },
        mulMat3DAndVect3D: function (mat, vect) {
          return [
            mat1[0] * mat2[0] + mat1[1] * mat2[1] + mat1[2] * mat2[2] + mat1[3] * mat2[3],
            mat1[4] * mat2[0] + mat1[5] * mat2[1] + mat1[6] * mat2[2] + mat1[7] * mat2[3],
            mat1[8] * mat2[0] + mat1[9] * mat2[1] + mat1[10] * mat2[2] + mat1[11] * mat2[3],
            mat1[12] * mat2[0] + mat1[13] * mat2[1] + mat1[14] * mat2[2] + mat1[15] * mat2[3],
          ]
        },
        translate3D: function (mat, x, y, z) {
          // [
          //   1, 0, 0, x,
          //   0, 1, 0, y,
          //   0, 0, 1, z,
          //   0, 0, 0, 1
          // ]
          return [
            mat[0],
            mat[1],
            mat[2],
            mat[0] * x + mat[1] * y + mat[2] * z + mat[3],
            mat[4],
            mat[5],
            mat[6],
            mat[4] * x + mat[5] * y + mat[6] * z + mat[7],
            mat[8],
            mat[9],
            mat[10],
            mat[8] * x + mat[9] * y + mat[10] * z + mat[11],
            mat[12],
            mat[13],
            mat[14],
            mat[12] * x + mat[13] * y + mat[14] * z + mat[15],
          ];
        },
        rotate3D: function (mat, x, y, z) {
          // x轴旋转
          // [
          //   1,      0,       0,  0,
          //   0, cos(x), -sin(x),  0,
          //   0, sin(x),  cos(x),  0,
          //   0,      0,       0,  1
          // ]
          // y轴旋转
          // [
          //   cos(y), 0, -sin(y), 0,
          //        0, 1,       0, 0,
          //   sin(y), 0,  cos(y), 0,
          //        0, 0,       0, 1
          // ]
          // z轴旋转
          // [
          //   cos(z), -sin(z), 0, 0, 
          //   sin(z),  cos(z), 0, 0,
          //        0,       0, 1, 0,
          //        0,       0, 0, 1
          // ]
          var mat1 = util.m3d.copyMat3D(mat);
          if (x !== 0) {
            var sinx = Math.sin(x)
            var cosx = Math.cos(x)
            mat1[1] = mat1[1] * cosx + mat1[2] * sinx;
            mat1[2] = mat1[1] * -sinx + mat1[2] * cosx;
            mat1[5] = mat1[5] * cosx + mat1[6] * sinx;
            mat1[6] = mat1[5] * -sinx + mat1[6] * cosx;
            mat1[9] = mat1[9] * cosx + mat1[10] * sinx;
            mat1[10] = mat1[9] * -sinx + mat1[10] * cosx;
            mat1[13] = mat1[13] * cosx + mat1[14] * sinx;
            mat1[14] = mat1[13] * -sinx + mat1[14] * cosx;
          }
          if (y !== 0) {
            var siny = Math.sin(y)
            var cosy = Math.cos(y)
            mat1[0] = mat1[0] * cosy + mat1[2] * siny;
            mat1[2] = mat1[0] * -siny + mat1[2] * cosy;
            mat1[4] = mat1[4] * cosy + mat1[6] * siny;
            mat1[6] = mat1[4] * -siny + mat1[6] * cosy;
            mat1[8] = mat1[8] * cosy + mat1[10] * siny;
            mat1[10] = mat1[8] * -siny + mat1[10] * cosy;
            mat1[12] = mat1[12] * cosy + mat1[14] * siny;
            mat1[14] = mat1[12] * -siny + mat1[14] * cosy;
          }
          if (z !== 0) {
            var sinz = Math.sin(z)
            var cosz = Math.cos(z)
            mat1[0] = mat1[0] * cosz + mat1[1] * sinz;
            mat1[1] = mat1[0] * -sinz + mat1[1] * cosz;
            mat1[4] = mat1[4] * cosz + mat1[5] * sinz;
            mat1[5] = mat1[4] * -sinz + mat1[5] * cosz;
            mat1[8] = mat1[8] * cosz + mat1[9] * sinz;
            mat1[9] = mat1[8] * -sinz + mat1[9] * cosz;
            mat1[12] = mat1[12] * cosz + mat1[13] * sinz;
            mat1[13] = mat1[12] * -sinz + mat1[13] * cosz;
          }
          return null;
        },
        scale3D: function (mat, x, y, z) {
          // [
          //   x, 0, 0, 0,
          //   0, y, 0, 0,
          //   0, 0, z, 0,
          //   0, 0, 0, 1
          // ]
          return [
            mat[0] * x,
            mat[1] * y,
            mat[2] * z,
            mat[3],
            mat[4] * x,
            mat[5] * y,
            mat[6] * z,
            mat[7],
            mat[8] * x,
            mat[9] * y,
            mat[10] * z,
            mat[11],
            mat[12] * x,
            mat[13] * y,
            mat[14] * z,
            mat[15]
          ];
        },
        shear3D: function (mat, x, y, z) {
          // [
          //     1, y.x, z.x, 0,
          //   x.y,   1, z.y, 0,
          //   x.z, y.z,   1, 0,
          //     0,   0,   0, 1,
          // ]
          var x_y = 0, x_z = 0;
          var y_x = 0, y_z = 0;
          var z_x = 0, z_y = 0;
          if (x) {
            if (x.y) {
              x_y = x.y;
            }
            if (x.z) {
              x_z = x.z;
            }
          }
          if (y) {
            if (y.z) {
              y_z = y.z;
            }
            if (y.x) {
              y_x = y.x;
            }
          }
          if (z) {
            if (z.x) {
              z_x = z.x;
            }
            if (z.y) {
              z_y = z.y;
            }
          }
          return [
            mat[0] + mat[1] * x_y + mat[2] * x_z,
            mat[0] * y_x + mat[1] + mat[2] * y_z,
            mat[0] * z_x + mat[1] * z_y + mat[2],
            mat[3],
            mat[4] + mat[5] * x_y + mat[6] * x_z,
            mat[4] * y_x + mat[5] + mat[6] * y_z,
            mat[4] * z_x + mat[5] * z_y  + mat[6],
            mat[7],
            mat[8] + mat[9] * x_y + mat[10] * x_z,
            mat[8] * y_x + mat[9] + mat[10] * y_z,
            mat[8] * z_x + mat[9] * z_y + mat[10],
            mat[11],
            mat[12] + mat[13] * x_y + mat[14] * x_z,
            mat[12] * y_x + mat[13] + mat[14] * y_z,
            mat[12] * z_x + mat[13] * z_y + mat[14],
            mat[15]
          ];
        },
        lookAt: function (mat, eye, look, up) {
          var n = [eye[0] - look[0], eye[1] - look[1], eye[2] - look[2]];
          var u = [up[1] * n[2] - up[2] * n[1], up[2] * n[0] - up[0] * n[2], up[0] * n[1] - up[1] * n[0]];
          var v = [n[1] * u[2] - n[2] * u[1], n[2] * u[0] - n[0] * u[2], n[0] * u[1] - n[1] * u[0]];
          var nl = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
          var ul = Math.sqrt(u[0] * u[0] + u[1] * u[1] + u[2] * u[2]);
          var vl = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
          return [
            n[0] / nl, n[1] / nl, n[2] / nl, -(n[0] * eye[0] + n[1] * eye[1] + n[2] * eye[2]) / nl,
            u[0] / ul, u[1] / ul, u[2] / ul, -(u[0] * eye[0] + u[1] * eye[1] + u[2] * eye[2]) / ul,
            v[0] / vl, v[1] / vl, v[2] / vl, -(v[0] * eye[0] + v[1] * eye[1] + v[2] * eye[2]) / vl,
            0, 0, 0, 1
          ];
        },
        reverse3D: function (mat) {
          var temp = m[0] * m[5] * m[10] * m[15] + m[1] * m[6] * m[11] * [12] + m[2] * m[7] * m[8] * m[13] + m[3] * m[4] * m[9] * m[14] - m[0] * m[7] * m[10] * m[13] - m[1] * m[4] * m[11] * m[14] - m[2] * m[5] * m[8] * m[15] - m[3] * m[6] * m[9] * m[12];
          return [
            // [
            //   5, 6, 7,
            //   9, 10, 11, 
            //   13, 14, 15
            // ]
            (m[5] * m[10] * m[15] + m[6] * m[11] * m[13] + m[7] * m[9] * m[14] - m[5] * m[11] * m[14] - m[6] * m[9] * m[15] - m[7] * m[10] * m[13]) / temp,
            // [
            //   4, 6, 7,
            //   8, 10, 11, 
            //   12, 14, 15
            // ]
            -(m[4] * m[10] * m[15] + m[6] * m[11] * m[12] + m[7] * m[8] * m[14] - m[4] * m[11] * m[14] - m[6] * m[8] * m[15] - m[7] * m[10] * m[12]) / temp, 
            // [
            //   4, 5, 7,
            //   8, 9, 11, 
            //   12, 13, 15
            // ]
            (m[4] * m[9] * m[15] + m[5] * m[11] * m[12] + m[7] * m[8] * m[13] - m[4] * m[11] * m[13] - m[5] * m[8] * m[15] - m[7] * m[9] * m[12]) / temp, 
            // [
            //   4, 5, 6,
            //   8, 9, 10, 
            //   12, 13, 14
            // ]
            -(m[4] * m[9] * m[14] + m[5] * m[10] * m[12] + m[6] * m[8] * m[13] - m[4] * m[10] * m[13] - m[5] * m[8] * m[14] - m[6] * m[9] * m[12]) / temp,
            // [
            //   1, 2, 3,
            //   9, 10, 11, 
            //   13, 14, 15
            // ]
            -(m[1] * m[10] * m[15] + m[2] * m[11] * m[13] + m[3] * m[9] * m[14] - m[1] * m[11] * m[14] - m[2] * m[9] * m[15] - m[3] * m[10] * m[13]) / temp,
            // [
            //   0, 2, 3,
            //   8, 10, 11, 
            //   12, 14, 15
            // ]
            (m[0] * m[10] * m[15] + m[2] * m[11] * m[12] + m[3] * m[8] * m[14] - m[0] * m[11] * m[14] - m[2] * m[8] * m[15] - m[3] * m[10] * m[12]) / temp, 
            // [
            //   0, 1, 3,
            //   8, 9, 11, 
            //   12, 13, 15
            // ]
            -(m[0] * m[9] * m[15] + m[1] * m[11] * m[12] + m[3] * m[8] * m[13] - m[0] * m[11] * m[13] - m[1] * m[8] * m[15] - m[3] * m[9] * m[12]) / temp, 
            // [
            //   0, 1, 2,
            //   8, 9, 10,
            //   12, 13, 14
            // ]
            (m[0] * m[9] * m[14] + m[1] * m[10] * m[12] + m[2] * m[8] * m[13] - m[0] * m[10] * m[13] - m[1] * m[8] * m[14] - m[2] * m[9] * m[12]) / temp,
            // [
            //   1,  2,  3,
            //   5,  6,  7,
            //   13, 14, 15
            // ] 
            (m[1] * m[6] * m[15] + m[2] * m[7] * m[13] + m[3] * m[5] * m[14] - m[1] * m[7] * m[14] - m[2] * m[5] * m[15] - m[3] * m[6] * m[13]) / temp, 
            // [
            //   0,  2,  3,
            //   4,  6,  7,
            //   12, 14, 15
            // ] 
            -(m[0] * m[6] * m[15] + m[2] * m[7] * m[12] + m[3] * m[4] * m[14] - m[0] * m[7] * m[14] - m[2] * m[4] * m[15] - m[3] * m[6] * m[12]) / temp, 
            // [
            //   0,  1,  3,
            //   4,  5,  7,
            //   12, 13, 15
            // ] 
            (m[0] * m[5] * m[15] + m[1] * m[7] * m[12] + m[3] * m[4] * m[13] - m[0] * m[7] * m[13] - m[1] * m[4] * m[15] - m[3] * m[5] * m[12]) / temp, 
            // [
            //   0,  1,  2,
            //   4,  5,  6,
            //   12, 13, 14,
            // ] 
            -(m[0] * m[5] * m[14] + m[1] * m[6] * m[12] + m[2] * m[4] * m[13] - m[0] * m[6] * m[13] - m[1] * m[4] * m[14] - m[2] * m[5] * m[12]) / temp,
            // [
            //   1,  2,  3,
            //   5,  6,  7,
            //   9, 10, 11
            // ] 
            -(m[1] * m[6] * m[11] + m[2] * m[7] * m[9] + m[3] * m[5] * m[10] - m[5] * m[11] * m[14] - m[6] * m[9] * m[15] - m[7] * m[10] * m[13]) / temp,
            // [
            //   0,  2,  3,
            //   4,  6,  7,
            //   8, 10, 11
            // ] 
            (m[0] * m[6] * m[11] + m[2] * m[7] * m[8] + m[3] * m[4] * m[10] - m[0] * m[7] * m[10] - m[2] * m[4] * m[11] - m[3] * m[6] * m[8]) / temp, 
            // [
            //   0,  1,  3,
            //   4,  5,  7,
            //   8,  9, 11
            // ] 
            -(m[0] * m[5] * m[11] + m[1] * m[7] * m[8] + m[3] * m[4] * m[9] - m[0] * m[7] * m[9] - m[1] * m[4] * m[11] - m[3] * m[5] * m[8]) / temp, 
            // [
            //   0,  1,  2,
            //   4,  5,  6,
            //   8,  9, 10
            // ] 
            (m[0] * m[5] * m[10] + m[1] * m[6] * m[8] + m[2] * m[4] * m[9] - m[0] * m[6] * m[9] - m[1] * m[4] * m[10] - m[2] * m[5] * m[8]) / temp
          ];
        }
      }
    };

    return util;
  }
)());


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_animation__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__binder__ = __webpack_require__(6);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */




/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var QueueAnimation = (function () {
      var InnerQueueAnimation = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__base_animation__["a" /* default */]);

      InnerQueueAnimation.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('animations', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.animations, []));
        this.defineNotifyProperty('sync', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.sync, false));
      }

      InnerQueueAnimation.prototype.execute = function (binder, deltaTime) {
        var binders;
        if (binder.getRunParam('init')) {
          binders = binder.getRunParam('binders');
        } else {
          var node = binder.node;
          var animations = this.animations;
          binders = [];
          for (var i = 0, len = animations.length; i < len; ++i) {
            binders.push(new __WEBPACK_IMPORTED_MODULE_2__binder__["a" /* default */]({
              node: node,
              animation: animations[i]
            }));
          }
          binder.setRunParam('init', true);
          binder.setRunParam('binders', binders);
        }
        if (binders.length === 0) {
          binder.setRunParam('init', false);
          binder.setRunParam('binders', null);
          return true;
        } else {
          if (this.sync) {
            if (binders[0].execute(deltaTime)) {
              binders.splice(0, 1);
            }
          } else {
            for (var i = binders.length - 1; i >= 0; --i) {
              if (binders[i].execute(deltaTime)) {
                binders.splice(i, 1);
              }
            }
          }
          return false;
        }
      }

      InnerQueueAnimation.prototype.destroy = function () {
        this.animations = null;
        this.super('destroy');
      }

      return InnerQueueAnimation;
    })();

    return QueueAnimation;
  }
)());

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_animation__ = __webpack_require__(5);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */



/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var SchedulerAnimation = (function () {
      var InnerSchedulerAnimation = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__base_animation__["a" /* default */]);

      InnerSchedulerAnimation.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('callbackFn', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.callbackFn, null));
        this.defineNotifyProperty('callbackTarget', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.callbackTarget, null));
        this.defineNotifyProperty('interval', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.interval, 0));
        this.defineNotifyProperty('repeats', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.repeats, 0));
        this.defineNotifyProperty('params', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.params, null));
      }

      InnerSchedulerAnimation.prototype.execute = function (binder, deltaTime) {
        if (this.repeats > 0) {
          var repeats = 0, sumTime = 0;
          if (binder.getRunParam('init')) {
            repeats = binder.getRunParam('repeats');
            sumTime = binder.getRunParam('sumTime');
          } else {
            binder.setRunParam('init', true);
            binder.setRunParam('repeats', repeats);
            binder.setRunParam('sumTime', sumTime);
          }
          sumTime += deltaTime;
          if (sumTime >= this.interval) {
            this.callbackFn.call(this.callbackTarget, binder, this.params);
            sumTime -= this.interval;
            repeats += 1;
          }
          if (repeats >= this.repeats) {
            binder.setRunParam('init', false);
            return true;
          } else {
            binder.setRunParam('repeats', repeats);
            binder.setRunParam('sumTime', sumTime);
            return false;
          }
        } else {
          return true;
        }
      }

      InnerSchedulerAnimation.prototype.destroy = function () {
        this.callbackFn = null;
        this.callbackTarget = null;
        this.params = null;
        this.super('destroy');
      }

      return InnerSchedulerAnimation;
    })();

    return SchedulerAnimation;
  }
)());

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_animation__ = __webpack_require__(5);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */



/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var PropertyAnimation = (function () {
      var InnerPropertyAnimation = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__base_animation__["a" /* default */]);

      InnerPropertyAnimation.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('property', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.property, ''));
        this.defineNotifyProperty('offset', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.offset, 0));
        this.defineNotifyProperty('offsetFn', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.offsetFn, null));
      }

      InnerPropertyAnimation.prototype.execute = function (binder, deltaTime) {
        var propertyOffset = 0, sumTime = 0;
        if (binder.getRunParam('init')) {
          propertyOffset = binder.getRunParam('propertyOffset');
          sumTime = binder.getRunParam('sumTime');
        } else {
          binder.setRunParam('init', true);
          binder.setRunParam('propertyOffset', propertyOffset);
          binder.setRunParam('sumTime', sumTime);
        }
        sumTime += deltaTime;
        var node = binder.node, property = this.property;
        var offset = this.offsetFn.call(node, binder.animation, deltaTime, sumTime);
        if ((offset - this.offset) * (propertyOffset - this.offset) <= 0) {
          binder.setRunParam('init', false);
          node[property] = node[property] + this.offset - propertyOffset;
          return true;
        } else {
          binder.setRunParam('propertyOffset', offset);
          binder.setRunParam('sumTime', sumTime);
          node[property] = node[property] + offset - propertyOffset;
          return false;
        }
      }

      InnerPropertyAnimation.prototype.destroy = function () {
        this.property = null;
        this.offset = null;
        this.offsetFn = null;
        this.super('destroy');
      }

      return InnerPropertyAnimation;
    })();

    return PropertyAnimation;
  }
)());

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * util for text measure and layout
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

/* harmony default export */ __webpack_exports__["a"] = ((function () {
  var win = window;
  var reqAniFrame = (function () {
    if (win.requestAnimationFrame) {
      return win.requestAnimationFrame;
    } else if (win.webkitRequestAnimationFrame) {
      return win.webkitRequestAnimationFrame;
    } else if (win.msRequestAnimationFrame) {
      return win.msRequestAnimationFrame;
    } else if (win.mozRequestAnimationFrame) {
      return win.mozRequestAnimationFrame;
    } else if (win.oRequestAnimationFrame) {
      return win.oRequestAnimationFrame;
    } else {
      return null;
    }
  })();

  var aniTaskId = 0;
  var aniTaskList = [];
  var aniLoopId = 0;
  var aniLoopRun = false;

  var reqAniLoop = function () {
    aniTaskListUpdate();
    reqAniFrame(reqAniLoop);
  }

  var intervalAniLoop = function () {
    aniLoopId = win.setInterval(aniTaskListUpdate, 16);
  }

  var aniTaskListUpdate = function () {
    var len = aniTaskList.length;
    var i, task;
    for (i = 0; i < len; ++i) {
      task = aniTaskList[i];
      task.fn.call(task.target);
    }
  }

  var util = {
    addAnimationTask: function (fn, target) {
      aniTaskList.push({
        id: ++aniTaskId,
        fn: fn,
        target: target
      });
      if (!aniLoopRun) {
        if (reqAniFrame === null) {
          intervalAniLoop();
        } else {
          reqAniLoop();
        }
        aniLoopRun = true;
      }
      return aniTaskId;
    },
    removeAnimationTaskById: function (id) {
      for (var i = 0, len = aniTaskList.length; i < len; ++i) {
        var task = aniTaskList[i];
        if (task.id == id) {
          aniTaskList.splice(i, 1);
          i--;
          len--;
        }
      }
    }
  };

  return util;
})());

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var registerEvents = [];

    var util = {
      KEY_CODE: {
        TAB: 9,
        CLEAR: 12,
        ENTER: 13,
        SHIFT_LEFT: 16,
        CTRL_LEFT: 17,
        ALT_LEFT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESCAPE: 27,
        SPACE: 32,
        PRIOR: 33,
        NEXT: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SELECT: 41,
        PRINT: 42,
        EXECUTE: 43,
        INSERT: 44,
        DELETE: 45,
        HELP: 47,
        NUMBER0: 48,
        NUMBER1: 49,
        NUMBER2: 50,
        NUMBER3: 51,
        NUMBER4: 52,
        NUMBER5: 53,
        NUMBER6: 54,
        NUMBER7: 55,
        NUMBER8: 56,
        NUMBER9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        KP_NUMBER0: 96,
        KP_NUMBER1: 97,
        KP_NUMBER2: 98,
        KP_NUMBER3: 99,
        KP_NUMBER4: 100,
        KP_NUMBER5: 101,
        KP_NUMBER6: 102,
        KP_NUMBER7: 103,
        KP_NUMBER8: 104,
        KP_NUMBER9: 105,
        KP_MULTIPLY: 106,
        KP_ADD: 107,
        KP_SEPARATOR: 108,
        KP_SUBSTRACT: 109,
        KP_DECIMAL: 110,
        KP_DEVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        F13: 124,
        F14: 125,
        F15: 126,
        F16: 127,
        F17: 128,
        F18: 129,
        F19: 130,
        F20: 131,
        F21: 132,
        F22: 133,
        F23: 134,
        F24: 135,
        NUM_LOCK: 136,
        SCROLL_LOCK: 137
      },
      addEventListener: function (node, type, target, listener) {
        var fn = listener.bind(target);
        registerEvents.push({
          node: node,
          type: type,
          target: target,
          listener: listener,
          fn: fn
        });
        node.addEventListener(type, fn, false);
      },
      removeEventListener: function (node, type, target, listener) {
        for (var i = 0, len = registerEvents.length; i < len; ++i) {
          var event = registerEvents[i];
          if (event.node === node &&
            event.type === type &&
            event.target === target &&
            event.listener === listener) {
            node.removeEventListener(type,event.fn, false);
            registerEvents.splice(i, 1);
            i--;
            len--;
          }
        }
      }
    };

    return util;
  }
)());


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * util for platform check
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var util = {
      isMobile: navigator.userAgent.toLowerCase().indexOf("mobile") != -1,
      isDeskTop: !(navigator.userAgent.toLowerCase().indexOf("mobile") != -1),
      isIE: navigator.userAgent.toLowerCase().indexOf("msie") != -1
    };

    return util;
  }
)());

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__binder__ = __webpack_require__(6);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */




/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var Manager = (function () {
      var InnerManager = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

      InnerManager.prototype.init = function (conf) {
        this.super('init', [conf]);
        this._animationBinders = [];
        this._paused = false;
      }

      InnerManager.prototype.pause = function () {
        this._paused = true;
      }

      InnerManager.prototype.resume = function () {
        this._paused = false;
      }

      InnerManager.prototype.addAnimation = function (node, animation, callbackFn, callbackTarget, loop) {
        this._animationBinders.push(new __WEBPACK_IMPORTED_MODULE_2__binder__["a" /* default */]({
          node: node,
          animation: animation,
          callbackFn: callbackFn,
          callbackTarget: callbackTarget,
          loop: loop
        }));
      }

      InnerManager.prototype.removeAnimationByNode = function (node) {
        var binders = this._animationBinders;
        for (var i = 0, len = binders.length; i < len; ++i) {
          var binder = binders[i];
          if (binder.node === node) {
            binders.splice(i, 1);
            i--;
            len--;
          }
        }
      }

      InnerManager.prototype.removeAnimationByNodeAndAnimation = function (node, animation) {
        var binders = this._animationBinders;
        for (var i = 0, len = binders.length; i < len; ++i) {
          var binder = binders[i];
          if (binder.node === node && binder.animation === animation) {
            binders.splice(i, 1);
            i--;
            len--;
          }
        }
      }

      InnerManager.prototype.run = function (deltaTime) {
        if (!this._paused) {
          var binders = this._animationBinders;
          for (var i = 0, len = binders.length; i < len; ++i) {
            var binder = binders[i];
            if (binder.execute(deltaTime) && !binder.loop) {
              binders.splice(i, 1);
              i--;
              len--;
              if (binder.fn) {
                binder.fn.call(binder.target, binder, deltaTime, true);
              }
            } else {
              if (binder.fn) {
                binder.fn.call(binder.target, binder, deltaTime, false);
              }
            }
          }
        }
      }

      InnerManager.prototype.destroy = function () {
        this._animationBinders = null;
        this.super('destroy');
      }

      return InnerManager;
    })();

    return Manager;
  }
)());


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */



/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var doc = document;

    var FileLoader = (function () {
      var InnerFileLoader = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

      InnerFileLoader.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this._loadingImages = {};
        this._loadedImages = {};
        this._loadingAudios = {};
        this._loadedAudios = {};
        this._loadingVideos = {};
        this._loadedVideos = {};
      }

      InnerFileLoader.prototype.loadImageAsync = function (url, fn, target, ignoreNewCallback) {
        if (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(this._loadedImages[url])) {
          return this._loadedImages[url];
        } else {
          var image = this._loadingImages[url];
          if (!image) {
            image = doc.createElement('img');
            image.src = url;
            this._loadingImages[url] = image;
          } else {
            if (ignoreNewCallback) {
              return undefined;
            }
          }

          var self = this;
          function loadSuccess() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingImages[url];
            self._loadedImages[url]  = image;
            if (fn) {
              fn.call(target, url, this, true);
            }
          }

          function loadError() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingImages[url];
            self._loadedImages[url] = null;
            if (fn) {
              fn.call(target, url, null, false);
            }
          }

          image.addEventListener('load', loadSuccess, false);
          image.addEventListener('error', loadError, false);
          return undefined;
        }
      }

      InnerFileLoader.prototype.loadAudioAsync = function (url, fn, target, ignoreNewCallback) {
        if (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(this._loadedAudios[url])) {
          return this._loadedAudios[url];
        } else {
          var audio = this._loadingAudios[url];
          if (!audio) {
            audio = doc.createElement('audio');
            audio.src = url;
            this._loadingAudios[url] = audio;
          } else {
            if (ignoreNewCallback) {
              return undefined;
            }
          }

          var self = this;
          function loadSuccess() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingAudios[url];
            self._loadedImages[url] = audio;
            if (fn) {
              fn.call(target, url, this, true);
            }
          }

          function loadError() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingAudios[url];
            self._loadedAudios[url] = null;
            if (fn) {
              fn.call(target, url, null, false);
            }
          }

          audio.addEventListener('load', loadSuccess, false);
          audio.addEventListener('error', loadError, false);
          return undefined;
        }
      }

      InnerFileLoader.prototype.loadVideoAsync = function (url, fn, target, ignoreNewCallback) {
        if (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(this._loadedVideos[url])) {
          return this._loadedVideos[url];
        } else {
          var video = this._loadingVideos[url];
          if (!video) {
            video = doc.createElement('video');
            video.src = url;
            this._loadingVideos[url] = video;
          } else {
            if (ignoreNewCallback) {
              return undefined;
            }
          }

          var self = this;
          function loadSuccess() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingVideos[url];
            self._loadedVideos[url] = video;
            if (fn) {
              fn.call(target, url, this, true);
            }
          }

          function loadError() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingVideos[url];
            self._loadedVideos[url] = null;
            if (fn) {
              fn.call(target, url, null, false);
            }
          }

          video.addEventListener('load', loadSuccess, false);
          video.addEventListener('error', loadError, false);
          return undefined;
        }
      }

      InnerFileLoader.prototype.removeImage = function (url) {
        if (this._loadingImages[url]) {
          delete this._loadingImages[url]
        }
        if (this._loadedImages[url]) {
          delete this._loadedImages[url];
        }
      }

      InnerFileLoader.prototype.removeAudio = function (url) {
        if (this._loadingAudios[url]) {
          delete this._loadingAudios[url];
        }
        if (this._loadedAudios[url]) {
          delete this._loadedAudios[url];
        }
      }

      InnerFileLoader.prototype.removeVideo = function (url) {
        if (this._loadingVideos[url]) {
          delete this._loadingVideos[url];
        }
        if (this._loadedVideos[url]) {
          delete this._loadedVideos[url];
        }
      }

      InnerFileLoader.prototype.destroy = function () {
        this._loadingImages = null;
        this._loadedImages = null;
        this._loadingAudios = null;
        this._loadedAudios = null;
        this._loadingVideos = null;
        this._loadedVideos = null;
        this.super('destroy')
      }

      return InnerFileLoader;
    })();

    return FileLoader;
  }
)());

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__ = __webpack_require__(3);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2018/7/28
 */




/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var doc = document;

    var functions = (function () {
      function renderBackgroundAndBorder (sender, render, dirtyZones) {
        var ctx = this._backgroundBorderCacheCtx;
        if (ctx.renderInvalid) {
          renderBackgroundAndBorderCache.call(this, ctx.render);
          ctx.renderInvalid = false;
        }
        var localZone = this.getLocalZone();
        var cacheCanvas = ctx.render.getCanvas();
        var offsetLeft = - localZone.left;
        var offsetTop = - localZone.top;
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {
          var dirtyZone = dirtyZones[i];
          render.drawImageExt(cacheCanvas,
            dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
            dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
        }      
      }
      
      function renderBackgroundAndBorderCache (render) {
        var ctx = this._backgroundBorderCacheCtx;
        var zone = this.getLocalZone();
        ctx.borderOffset = this.borderWidth / 2;
        ctx.borderRadius = this.borderRadius;
        ctx.backgroundOffset = ctx.borderOffset;
        ctx.backgroundRadius = this.borderRadius;
        ctx.clipOffset = this.borderWidth;
        ctx.clipRadius = this.borderRadius < ctx.borderOffset ? 0 : (this.borderRadius - ctx.borderOffset);
        if (ctx.render.width !== zone.width || ctx.render.height !== zone.height) {
          ctx.render.width = zone.width;
          ctx.render.height = zone.height;
        } else {
          ctx.render.clear();
        }
        if (ctx.borderRadius > 0) {
          renderRadiusPath(render, 0, 0, zone.width, zone.height, ctx.borderOffset, ctx.borderRadius);
        } else {
          renderRectPath(render, 0, 0, zone.width, zone.height, ctx.borderOffset);
        }
        if (this.backgroundColor !== null) {
          render.fillStyle = this.backgroundColor;
          render.fill();
        }
        if (this.borderColor != null && this.borderWidth > 0) {
          render.lineWidth = this.borderWidth;
          render.strokeStyle = this.borderColor;
          render.stroke();
        }
      }

      function renderRectPath(render, left, top, right, bottom, offset) {
        left = left + offset;
        top = top + offset;
        right = right - offset;
        bottom = bottom - offset;
        render.beginPath();
        render.moveTo(left, top);
        render.lineTo(right, top);
        render.lineTo(right, bottom);
        render.lineTo(left, bottom);
        render.closePath();
      }

      function renderRadiusPath(render, left, top, right, bottom, offset, radius) {
        left = left + offset;
        top = top + offset;
        right = right - offset;
        bottom = bottom - offset;
        render.beginPath();
        render.moveTo(left, top + radius);
        render.arcTo(left, top, left + radius, top, radius);
        render.lineTo(right - radius, top);
        render.arcTo(right, top, right, top + radius, radius);
        render.lineTo(right, bottom - radius);
        render.arcTo(right, bottom, right - radius, bottom, radius);
        render.lineTo(left + radius, bottom);
        render.arcTo(left, bottom, left, bottom - radius, radius);
        render.closePath();
      }

      function onPropertyChanged (sender, name, newVal, oldVal) {
        if (propertyChangedMap.hasOwnProperty(name)) {
          propertyChangedMap[name].call(this, newVal, oldVal);
        }
      }

      function onRenderChanged () {
        var ctx = this._backgroundBorderCacheCtx;
        this.removeObserver('preClipRender', renderBackgroundAndBorder, this);
        this._backgroundBorderCacheCtx.renderInvalid = true;
        this.dirty();
        if (!(this.backgroundColor === null && (this.borderColor === null || this.borderWidth <= 0))) {
          this.addObserver('preClipRender', renderBackgroundAndBorder, this, -Infinity);
          if (ctx.render === null) {
            ctx.renderInvalid = true;
            ctx.render = new __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__["a" /* default */]({
              canvas: doc.createElement('canvas'),
              width: this.width,
              height: this.height
            });
            doc.body.appendChild(ctx.render.getCanvas());
          }
        } else {
          ctx.render = null;
        }
      }

      function onWidthChanged () {
        this._backgroundBorderCacheCtx.renderInvalid = true;
      }

      function onHeightChanged () {
        this._backgroundBorderCacheCtx.renderInvalid = true;
      }

      function onBorderRadiusChanged () {
        this._backgroundBorderCacheCtx.renderInvalid = true;
        this.dirty();
      }

      var propertyChangedMap = {
        width: onWidthChanged,
        height: onHeightChanged,
        backgroundColor: onRenderChanged,
        borderWidth: onRenderChanged,
        borderColor: onRenderChanged,
        borderRadius: onBorderRadiusChanged
      }

      return {
        onPropertyChanged: onPropertyChanged
      }
    })();

    var UIView = (function () {
      var InnerUIView = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerUIView.prototype.defVisible = true;
      InnerUIView.prototype.defBackgroundColor = null;
      InnerUIView.prototype.defBorderWidth = 0;
      InnerUIView.prototype.defBorderColor = null;
      InnerUIView.prototype.defBorderRadius = 0;
      InnerUIView.prototype.defDirtyRenderSupport = true;
      InnerUIView.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.backgroundColor = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.backgroundColor, this.defBackgroundColor);
        this.borderWidth = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.borderWidth, this.defBorderWidth);
        this.borderColor = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.borderColor, this.defBorderColor);
        this.borderRadius = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.borderRadius, this.defBorderRadius);

        this._backgroundBorderCacheCtx = {
          borderOffset: 0,
          borderRadius: 0,
          backgroundOffset: 0,
          backgroundRadius: 0,
          clipOffset: 0,
          clipRadius: 0,
          renderInvalid: true,
          render: null
        };

        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      InnerUIView.prototype.startClip = function (render) {
        var ctx = this._backgroundBorderCacheCtx;
        var zone = this.getLocalZone();
        if (ctx.clipRadius > 0) {
          functions.renderRadiusPath(render, zone.left, zone.top, zone.right, zone.bottom, ctx.clipOffset, ctx.clipRadius);
        } else {
          functions.renderRectPath(render, zone.left, zone.top, zone.right, zone.bottom, ctx.clipOffset);
        }
        render.clip();
      }

      return InnerUIView;
    })();

    return UIView;
  }
)());



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * util for text measure and layout
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

/* harmony default export */ __webpack_exports__["a"] = ((
  function () {

    var doc = document;

    var measureCanvas = doc.createElement("canvas");

    var measureContext = measureCanvas.getContext("2d");

    var charWidthDicts = {};

    var util = (function () {
      function getCharWidthDict (font) {
        if (charWidthDicts[font]) {
          return charWidthDicts[font];
        } else {
          var charWidthDict = {};
          measureContext.font = font;
          charWidthDict[" "] = measureContext.measureText(" ").width;
          charWidthDict["!"] = measureContext.measureText("!").width;
          charWidthDict["\""] = measureContext.measureText("\"").width;
          charWidthDict["#"] = measureContext.measureText("#").width;
          charWidthDict["$"] = measureContext.measureText("$").width;
          charWidthDict["%"] = measureContext.measureText("%").width;
          charWidthDict["&"] = measureContext.measureText("&").width;
          charWidthDict["'"] = measureContext.measureText("'").width;
          charWidthDict["("] = measureContext.measureText("(").width;
          charWidthDict[")"] = measureContext.measureText(")").width;
          charWidthDict["*"] = measureContext.measureText("*").width;
          charWidthDict["+"] = measureContext.measureText("+").width;
          charWidthDict[","] = measureContext.measureText("-").width;
          charWidthDict["-"] = measureContext.measureText(",").width;
          charWidthDict["."] = measureContext.measureText(",").width;
          charWidthDict["/"] = measureContext.measureText("/").width;
          charWidthDict["0"] = measureContext.measureText("0").width;
          charWidthDict["1"] = measureContext.measureText("1").width;
          charWidthDict["2"] = measureContext.measureText("2").width;
          charWidthDict["3"] = measureContext.measureText("3").width;
          charWidthDict["4"] = measureContext.measureText("4").width;
          charWidthDict["5"] = measureContext.measureText("5").width;
          charWidthDict["6"] = measureContext.measureText("6").width;
          charWidthDict["7"] = measureContext.measureText("7").width;
          charWidthDict["8"] = measureContext.measureText("8").width;
          charWidthDict["9"] = measureContext.measureText("9").width;
          charWidthDict[":"] = measureContext.measureText(":").width;
          charWidthDict[";"] = measureContext.measureText(";").width;
          charWidthDict["<"] = measureContext.measureText("<").width;
          charWidthDict["="] = measureContext.measureText("=").width;
          charWidthDict[">"] = measureContext.measureText(">").width;
          charWidthDict["?"] = measureContext.measureText("?").width;
          charWidthDict["@"] = measureContext.measureText("@").width;
          charWidthDict["A"] = measureContext.measureText("A").width;
          charWidthDict["B"] = measureContext.measureText("B").width;
          charWidthDict["C"] = measureContext.measureText("C").width;
          charWidthDict["D"] = measureContext.measureText("D").width;
          charWidthDict["E"] = measureContext.measureText("E").width;
          charWidthDict["F"] = measureContext.measureText("F").width;
          charWidthDict["G"] = measureContext.measureText("G").width;
          charWidthDict["H"] = measureContext.measureText("H").width;
          charWidthDict["I"] = measureContext.measureText("I").width;
          charWidthDict["J"] = measureContext.measureText("J").width;
          charWidthDict["K"] = measureContext.measureText("K").width;
          charWidthDict["L"] = measureContext.measureText("L").width;
          charWidthDict["M"] = measureContext.measureText("M").width;
          charWidthDict["N"] = measureContext.measureText("N").width;
          charWidthDict["O"] = measureContext.measureText("O").width;
          charWidthDict["P"] = measureContext.measureText("P").width;
          charWidthDict["Q"] = measureContext.measureText("Q").width;
          charWidthDict["R"] = measureContext.measureText("R").width;
          charWidthDict["S"] = measureContext.measureText("S").width;
          charWidthDict["T"] = measureContext.measureText("T").width;
          charWidthDict["U"] = measureContext.measureText("U").width;
          charWidthDict["V"] = measureContext.measureText("V").width;
          charWidthDict["W"] = measureContext.measureText("W").width;
          charWidthDict["X"] = measureContext.measureText("X").width;
          charWidthDict["Y"] = measureContext.measureText("Y").width;
          charWidthDict["["] = measureContext.measureText("Z").width;
          charWidthDict["\\"] = measureContext.measureText("\\").width;
          charWidthDict["]"] = measureContext.measureText("]").width;
          charWidthDict["^"] = measureContext.measureText("^").width;
          charWidthDict["_"] = measureContext.measureText("_").width;
          charWidthDict["`"] = measureContext.measureText("`").width;
          charWidthDict["a"] = measureContext.measureText("a").width;
          charWidthDict["b"] = measureContext.measureText("b").width;
          charWidthDict["c"] = measureContext.measureText("c").width;
          charWidthDict["d"] = measureContext.measureText("d").width;
          charWidthDict["e"] = measureContext.measureText("e").width;
          charWidthDict["f"] = measureContext.measureText("f").width;
          charWidthDict["g"] = measureContext.measureText("g").width;
          charWidthDict["h"] = measureContext.measureText("h").width;
          charWidthDict["i"] = measureContext.measureText("i").width;
          charWidthDict["j"] = measureContext.measureText("j").width;
          charWidthDict["k"] = measureContext.measureText("k").width;
          charWidthDict["l"] = measureContext.measureText("l").width;
          charWidthDict["m"] = measureContext.measureText("m").width;
          charWidthDict["n"] = measureContext.measureText("n").width;
          charWidthDict["o"] = measureContext.measureText("o").width;
          charWidthDict["p"] = measureContext.measureText("p").width;
          charWidthDict["q"] = measureContext.measureText("q").width;
          charWidthDict["r"] = measureContext.measureText("r").width;
          charWidthDict["s"] = measureContext.measureText("s").width;
          charWidthDict["t"] = measureContext.measureText("t").width;
          charWidthDict["u"] = measureContext.measureText("u").width;
          charWidthDict["v"] = measureContext.measureText("v").width;
          charWidthDict["w"] = measureContext.measureText("w").width;
          charWidthDict["x"] = measureContext.measureText("x").width;
          charWidthDict["y"] = measureContext.measureText("y").width;
          charWidthDict["z"] = measureContext.measureText("z").width;
          charWidthDict["{"] = measureContext.measureText("{").width;
          charWidthDict["|"] = measureContext.measureText("|").width;
          charWidthDict["}"] = measureContext.measureText("}").width;
          charWidthDict["~"] = measureContext.measureText("~").width;
          charWidthDict["\n"] = measureContext.measureText("\n").width;
          charWidthDict["zh"] = measureContext.measureText("汉").width;
          charWidthDicts[font] = charWidthDict;
          return charWidthDict;
        }
      }

      function getTextLayoutWidth (text, font) {
        var charWidthDict = getCharWidthDict(font);
        var textWidth = 0;
        var curChar = null;
        for (var i = 0, len = text.length; i < len; ++i) {
          curChar = text[i];
          if (curChar > '~') {
            textWidth += charWidthDict["zh"];
          } else {
            textWidth += charWidthDict[text[i]] ? charWidthDict[text[i]] : charWidthDict[" "];
          }
        }
        return Math.ceil(textWidth);
      }

      function getTextLayoutInfo (text, font, maxWidth) {
        if (maxWidth > 0) {
          if (text && text.length > 0) {
            var charWidthDict = getCharWidthDict(font);
            var length = text.length;
            var curLineWidth = 0, curCharWidth = 0;
            var startCharIndex = 0, preSpaceIndex = -1, preSpaceWidth = 0;
            var curChar = null;
            var textArr = [];
            var clearSpace = false;
            var textAllWidth = 0;
            if (maxWidth > 0) {
              for (var i = 0; i < length; ++i) {
                curChar = text[i];
                if (curChar > '~') {
                  curCharWidth = charWidthDict["zh"];
                  curLineWidth += curCharWidth;
                  textAllWidth += curCharWidth;
                  preSpaceIndex = i;
                  preSpaceWidth = curLineWidth;
                } else {
                  curCharWidth = charWidthDict[curChar];
                  curLineWidth += curCharWidth;
                  textAllWidth += curCharWidth;
                  if (curChar == '\n') {
                    textArr.push(text.substring(startCharIndex, i));
                    startCharIndex = i + 1;
                    curLineWidth = 0;
                    clearSpace = false;
                  } else if (curChar == ' ') {
                    preSpaceIndex = i;
                    preSpaceWidth = curLineWidth;
                  }
                }
                if (curLineWidth > maxWidth) {
                  clearSpace = true;
                  if (curChar > '~' || curChar == '' || preSpaceIndex <= startCharIndex) {
                    textArr.push(text.substring(startCharIndex, i));
                    startCharIndex = i;
                    curLineWidth = curCharWidth;
                  } else {
                    textArr.push(text.substring(startCharIndex, preSpaceIndex));
                    startCharIndex = preSpaceIndex + 1;
                    curLineWidth -= preSpaceWidth;
                  }
                }
              }
            }
            if (startCharIndex < length) {
              textArr.push(text.substr(startCharIndex, length));
            }
            return {
              width: textAllWidth,
              lines: textArr
            };
          } else {
            return [];
          }
        } else {
          return {
            width: getTextLayoutWidth(text, font),
            lines: [text]
          }
        }
      }

      return {
        getTextLayoutInfo: getTextLayoutInfo
      }
    })();

    return util;
  }
)());




/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__g_texture__ = __webpack_require__(19);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */




/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      
    })();

    var GModelNode = (function () {
      var InnerGModelNode = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGModelNode.prototype.defLayer = 1;
      
      InnerGModelNode.prototype.defAnchorX = 0.5;
      InnerGModelNode.prototype.defAnchorY = 0.5;
      InnerGModelNode.prototype.defWidth = 0;
      InnerGModelNode.prototype.defHeight = 0;
      InnerGModelNode.prototype.defDirtyRenderSupport = true;
      InnerGModelNode.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.texture = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.texture, null);
        
        this._texture = new __WEBPACK_IMPORTED_MODULE_2__g_texture__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.texture, {}));
        this.appendChildNodeToLayer(this._texture, 0);
      }

      InnerGModelNode.prototype.getTexture = function (conf) {
        return this._texture;
      }

      return InnerGModelNode;
    })();

    return GModelNode;
  }
)());

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */



/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var functions = (function () {
      function renderImage (sender, render, dirtyZones) {
        var ctx = this._imageCtx;
        var image = this.findApplication().loadImage(ctx.url, this.getID(), loadImageFinished, this);
        if (image) {
          var localZone = this.getLocalZone();
          var offsetLeft = - localZone.left;
          var offsetTop = - localZone.top;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }

      function loadImageFinished (url, image, success, async) {
        var ctx = this._imageCtx;
        if (ctx.invalid && success) {
          if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isString(this.image)) {
            this.width = image.width;
            this.height = image.height;
            ctx.x = 0;
            ctx.y = 0;
            ctx.width = image.width;
            ctx.height = image.height;
          } else {
            this.width = this.image.width;
            this.height = this.image.height;
            ctx.x = this.image.x;
            ctx.y = this.image.y;
            ctx.width = this.image.width;
            ctx.height = this.image.height;
          }
          ctx.invalid = false;
        }
        if (async) {
          this.dirty();
        }
      }

      function onPropertyChanged(sender, name, newVal, oldVal) {
        if (propertyChangedMap.hasOwnProperty(name)) {
          propertyChangedMap[name].call(this, newVal, oldVal);
        }
      }

      function onRenderImageChanged (newVal, oldVal) {
        this.removeObserver('postClipRender', renderImage, this);
        if (newVal && newVal !== '') {
          var ctx = this._imageCtx;
          if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isString(newVal)) {
            ctx.url = newVal;
            this.addObserver('postClipRender', renderImage, this);
          } else {
            ctx.url = newVal.url;
            this.addObserver('postClipRender', renderImage, this);
          }
          ctx.invalid = true;
        }
      }

      var propertyChangedMap = {
        image: onRenderImageChanged
      };
      
      return {
        onPropertyChanged: onPropertyChanged,
        onRenderImageChanged: onRenderImageChanged
      }
    })();

    var GTexture = (function () {
      var InnerGTexture = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGTexture.prototype.defImage = null;
      InnerGTexture.prototype.defAnchorX = 0.5;
      InnerGTexture.prototype.defAnchorY = 0.5;
      InnerGTexture.prototype.defWidth = 2;
      InnerGTexture.prototype.defHeight = 2;
      InnerGTexture.prototype.defDirtyRenderSupport = true;
      InnerGTexture.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.image = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.image, this.defImage);

        this._imageCtx = {
          invalid: true,
          url: null,
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };

        functions.onRenderImageChanged.call(this, this.image, undefined);

        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      return InnerGTexture;
    })();

    return GTexture;
  }
)());

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_common_core_render_webgl_shader_fragment_default_hlsl__ = __webpack_require__(33);



(function () {
  console.log(__WEBPACK_IMPORTED_MODULE_1__src_common_core_render_webgl_shader_fragment_default_hlsl__["a" /* default */])
  var Application = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */].core.Application;
  var PropertyAnimation = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */].core.animation.PropertyAnimation;
  var UILabel = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */].ui.Label;
  var CNode = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */].core.Node;
  var GTexture = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */].game.Texture;
  var GMap = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */].game.Map;

  // var root = new CNode({
  //   x: 400,
  //   y: 150,
  //   width: 100, 
  //   height: 100,
  //   visible: true,
  //   interactive: true
  // });

  // root.addObserver('postClipRender', function(sender, render){
  //   render.fillStyle = '#f00'
  //   render.fillRect(-50, -50, 100, 100)
  // }, root);

  // root.addObserver('mousedown', function(sender, render){
  //   console.log('mouseodwn')
  // });


  var label = new UILabel({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    visible: true,
    text: '测试测试feafeawfeawgeawgeawgeawgeawfeawfeawfeafeawfeafea',
    backgroundColor: '#f00',
    borderWidth: 1,
    borderColor: '#0f0',
    borderRadius: 10,
    clip: true
  });

  // // var root = new GTexture({
  // //   x: 400,
  // //   y: 300,
  // //   scaleY: Math.cos(22.5 * Math.PI / 180),
  // //   scaleX: Math.cos(22.5 * Math.PI / 180),
  // //   shearY: -Math.atan(22.5 * Math.PI / 180),
  // //   // shearX: .5,
  // //   // scaleY: 1,
  // //   // rotateZ: -0.3805063771123649,
  // //   visible: true,
  // //   image: './images/test/ride1/frame_00012.png',
  // // });

  // var root = new GMap({
  //   x: 250,
  //   y: 250,
  //   // mapX: 45,
  //   // mapY: 45,
  //   width: 200,
  //   height: 200,
  //   anchorX: 0.5,
  //   anchorY: 0.5,
  //   visible: true,
  //   mapTileType: 'square',
  //   mapTileWidth: 30,
  //   mapTileHeight: 30,
  //   mapTileImageIndex: {
  //     1: 'images/email.jpg'
  //   },
  //   mapTileImageClipIndex: {
  //     1: {
  //       imageId: 1,
  //       x: 0,
  //       y: 0,
  //       width: 30,
  //       height: 30
  //     }
  //   },
  //   mapTileRows: 15,
  //   mapTileCols: 15,
  //   mapGridVisible: true,
  //   mapTileData: [
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //   ]
  // });

  var root = new GMap({
    x: 250,
    y: 250,
    mapX: 10,
    mapY: 10,
    width: 200,
    height: 200,
    anchorX: 0.5,
    anchorY: 0.5,
    visible: true,
    mapTileType: 'diamond',
    mapTileWidth: 30,
    mapTileHeight: 20,
    mapTileImageIndex: {
      1: 'images/tile_ground.png'
    },
    mapTileImageClipIndex: {
      1: {
        imageId: 1,
        x: 0,
        y: 0,
        width: 128,
        height: 64
      }
    },
    mapTileRows: 15,
    mapTileCols: 15,
    mapGridVisible: true,
    mapTileData: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
  });


  root.appendChildNode(label);

  var application = new Application({
    canvas: document.getElementById('app'),
    root: root
  });

  // root.appendChildNode(new GTexture({
  //   x: -300,
  //   y: 0,
  //   // scaleY: Math.cos(22.5 * Math.PI / 180),
  //   // scaleX: Math.cos(22.5 * Math.PI / 180),
  //   // shearY: -Math.atan(22.5 * Math.PI / 180),
  //   // shearX: .5,
  //   // scaleY: 1,
  //   // rotateZ: -0.3805063771123649,
  //   visible: true,
  //   image: './images/test/ride1/frame_00012.png'
  // }));

//  root.appendChildNode(new GTexture({
//     x: -100,
//     y: 0,
//     scaleY: Math.cos(22.5 * Math.PI / 180),
//     scaleX: Math.cos(22.5 * Math.PI / 180),
//     shearY: -Math.atan(22.5 * Math.PI / 180),
//     // shearX: .5,
//     // scaleY: 1,
//     // rotateZ: -0.3805063771123649,
//     visible: true,
//     image: './images/test/ride1/frame_00012.png'
//   }));

//   root.appendChildNode(new GTexture({
//     x: 100,
//     y: 0,
//     // scaleY: Math.cos(22.5 * Math.PI / 180),
//     // scaleX: Math.cos(22.5 * Math.PI / 180),
//     // shearY: Math.atan(22.5 * Math.PI / 180),
//     // shearX: .5,
//     // scaleY: 1,
//     // rotateZ: -0.3805063771123649,
//     visible: true,
//     image: './images/test/ride1/frame_00005.png'
//   }));

  // root.appendChildNode(new GTexture({
  //   x: 300,
  //   y: 0,
  //   scaleY: 1 / Math.cos(22.5 * Math.PI / 180),
  //   scaleX: 1 / Math.cos(22.5 * Math.PI / 180),
  //   shearY: Math.atan(22.5 * Math.PI / 180),
  //   // shearX: .5,
  //   // scaleY: 1,
  //   // rotateZ: -0.3805063771123649,
  //   visible: true,
  //   image: './images/test/ride1/frame_00005.png'
  // }));

  application.run();

  // root.runAnimation(new PropertyAnimation({
  //     property: 'rotateZ',
  //     offset: Infinity,
  //     offsetFn: function (animation, deltaTime, sumTime) {
  //         return sumTime / 100;
  //     }
  // }), null, null, false);

  // for (var i = 0; i < 10; ++i) {
  //   root.appendChildNode(new GTexture({
  //     x: 20 * i,
  //     y: 20 * i,
  //     visible: true,
  //     image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536657006&di=f6e8dc17d395fd0841a24aa1f068ce3c&imgtype=jpg&er=1&src=http%3A%2F%2Fp2.qhimg.com%2Ft0193dcb0a279f6ec8f.jpg',
  //   }));
  // }

  document.onkeydown = function (e) {
    var e = e ? event : e;
    if (e.keyCode === 37) {
      // root.mapX += 10;
      label.x -= 10;
    } else if (e.keyCode === 39) {
      // root.mapX -= 10;
      label.x += 10;
    } else if (e.keyCode === 38) {
      // root.mapY += 10;
      label.y -= 10;
    } else if (e.keyCode === 40) {
      // root.mapY -= 10;
      label.y += 10;
    }
  }

})();


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_common_core_application__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_common_core_node__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_common_core_notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_common_core_io_file_loader__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_common_core_animation_manager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_common_core_animation_binder__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_common_core_animation_base_animation__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_common_core_animation_queue_animation__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_common_core_animation_scheduler_animation__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_common_core_animation_property_animation__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_common_core_render_canvas_canvas_render__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_common_core_render_webgl_webgl_render__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_common_ui_ui_view__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_common_ui_ui_label__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_common_game_g_scene__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_common_game_map_g_map__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_common_game_model_g_model__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_common_game_model_g_model_node__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__src_common_game_g_texture__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__src_common_game_g_util__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__src_common_utils_event_util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__src_common_utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__src_common_utils_matrix_util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__src_common_utils_platform_util__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__src_common_utils_text_util__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__src_common_utils_timer_util__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__src_common_utils_number_util__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__src_common_utils_geometry_util__ = __webpack_require__(4);



































/* harmony default export */ __webpack_exports__["a"] = ((
    function() {
        var homyo = {
            core: {
                Application: __WEBPACK_IMPORTED_MODULE_0__src_common_core_application__["a" /* default */],
                Node: __WEBPACK_IMPORTED_MODULE_1__src_common_core_node__["a" /* default */],
                Notifier: __WEBPACK_IMPORTED_MODULE_2__src_common_core_notifier__["a" /* default */],

                io: {
                    FileLoader: __WEBPACK_IMPORTED_MODULE_3__src_common_core_io_file_loader__["a" /* default */]
                },

                render: {
                    CanvasRender: __WEBPACK_IMPORTED_MODULE_10__src_common_core_render_canvas_canvas_render__["a" /* default */],
                    WebglRender: __WEBPACK_IMPORTED_MODULE_11__src_common_core_render_webgl_webgl_render__["a" /* default */]
                },

                animation: {
                    Manager: __WEBPACK_IMPORTED_MODULE_4__src_common_core_animation_manager__["a" /* default */],
                    Binder: __WEBPACK_IMPORTED_MODULE_5__src_common_core_animation_binder__["a" /* default */],
                    BaseAnimation: __WEBPACK_IMPORTED_MODULE_6__src_common_core_animation_base_animation__["a" /* default */],
                    QueueAnimation: __WEBPACK_IMPORTED_MODULE_7__src_common_core_animation_queue_animation__["a" /* default */],
                    SchedulerAnimation: __WEBPACK_IMPORTED_MODULE_8__src_common_core_animation_scheduler_animation__["a" /* default */],
                    PropertyAnimation: __WEBPACK_IMPORTED_MODULE_9__src_common_core_animation_property_animation__["a" /* default */]
                }
            },

            ui: {
                View: __WEBPACK_IMPORTED_MODULE_12__src_common_ui_ui_view__["a" /* default */],
                Label: __WEBPACK_IMPORTED_MODULE_13__src_common_ui_ui_label__["a" /* default */]
            },

            game: {
                Scene: __WEBPACK_IMPORTED_MODULE_14__src_common_game_g_scene__["a" /* default */],
                Map: __WEBPACK_IMPORTED_MODULE_15__src_common_game_map_g_map__["a" /* default */],
                Model: __WEBPACK_IMPORTED_MODULE_16__src_common_game_model_g_model__["a" /* default */],
                ModelNode: __WEBPACK_IMPORTED_MODULE_17__src_common_game_model_g_model_node__["a" /* default */],
                Texture: __WEBPACK_IMPORTED_MODULE_18__src_common_game_g_texture__["a" /* default */],
                Util: __WEBPACK_IMPORTED_MODULE_19__src_common_game_g_util__["a" /* default */]
            },

            utils: {
                EventUtil: __WEBPACK_IMPORTED_MODULE_20__src_common_utils_event_util__["a" /* default */],
                LangUtil: __WEBPACK_IMPORTED_MODULE_21__src_common_utils_lang_util__["a" /* default */],
                MatrixUtil: __WEBPACK_IMPORTED_MODULE_22__src_common_utils_matrix_util__["a" /* default */],
                PlatformUtil: __WEBPACK_IMPORTED_MODULE_23__src_common_utils_platform_util__["a" /* default */],
                TextUtil: __WEBPACK_IMPORTED_MODULE_24__src_common_utils_text_util__["a" /* default */],
                TimerUtil: __WEBPACK_IMPORTED_MODULE_25__src_common_utils_timer_util__["a" /* default */],
                NumberUtil: __WEBPACK_IMPORTED_MODULE_26__src_common_utils_number_util__["a" /* default */],
                GeometryUtil: __WEBPACK_IMPORTED_MODULE_27__src_common_utils_geometry_util__["a" /* default */]
            }
        };

        return homyo;
    }
)());

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_timer_util__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_event_util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_platform_util__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_geometry_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__render_canvas_canvas_render__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__animation_manager__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__io_file_loader__ = __webpack_require__(15);
/**
 * the core class for app
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */











/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var win = window;
    var docEle = document.documentElement;

    var functions = (function () {
      function eventPreProcessDesktop (e) {
        var eArg = this._events[0];
        var canvasViewOffset = this._render.getCanvas().getBoundingClientRect();
        var offsetX = (e.pageX - (canvasViewOffset.left - win.pageXOffset - docEle.clientLeft)) * this._scaleX;
        var offsetY = (e.pageY - (canvasViewOffset.top - win.pageYOffset - docEle.clientTop)) * this._scaleY;
        if (offsetX !== eArg.offsetX || offsetY !== eArg.offsetY || e.wheelDelta !== 0) {
          this.move = true;
        } else {
          this.move = false;
        }
        eArg.id = 1;
        eArg.event = e;
        eArg.target = null;
        eArg.wheelDelta = e.wheelDelta ? e.wheelDelta : e.detail;
        eArg.keyCode = e.keyCode;
        eArg.button = e.button;
        eArg.altKey = e.altKey;
        eArg.ctrlKey = e.ctrlKey;
        eArg.metaKey = e.metaKey;
        eArg.skip = false;
        eArg.bubble = true;
        eArg.offsetX = offsetX;
        eArg.offsetY = offsetY;
        return eArg;
      }

      function eventPreProcessMobile (e, touch) {
        var eArg = this._events[touch.identifier];
        if (!eArg) {
          eArg = new Event();
          this._events[touch.identifier] = eArg;
        }
        var canvasViewOffset = this._render.getCanvas().getBoundingClientRect();
        var offsetX = (e.pageX - (canvasViewOffset.left - win.pageXOffset - docEle.clientLeft)) * this._scaleX;
        var offsetY = (e.pageY - (canvasViewOffset.top - win.pageYOffset - docEle.clientTop)) * this._scaleY;
        if (offsetX !== eArg.offsetX || offsetY !== eArg.offsetY || e.wheelDelta !== 0) {
          this.move = true;
        } else {
          this.move = false;
        }
        eArg.id = touch.identifier;
        eArg.event = e;
        eArg.touch = touch;
        eArg.target = null;
        eArg.skip = false;
        eArg.bubble = true;
        eArg.offsetX = offsetX;
        eArg.offsetY = offsetY;
        return eArg;
      }

      function eventTouchStartDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          this.postNotification('touchstart', [eventPreProcessMobile.call(this, ee, touches[i])]);
        }
      }

      function eventTouchMoveDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = eventPreProcessMobile(this, ee, touches[i]);
          if (eArg.move) {
            this.postNotification('touchmove', [eArg]);
          }
        }
      }

      function eventTouchEndDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          this.postNotification('touchend', [eventPreProcessMobile.call(this, ee, touches[i])]);
        }
      }

      function eventTouchCancelDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          this.postNotification('touchcancel', [eventPreProcessMobile.call(this, ee, touches[i])]);
        }
      }

      function eventTouchStartCanvas (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        var root = this._root;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = event_prehandler_mobile.call(this, ee, touches[i]);
          this.postNotification('touchstart', [eArg]);
          root._dispatchMouseTouchEvent('touchstart', eArg);
          eArg.stopPropagation();
          eArg.preventDefault();
        }
      }

      function eventTouchMoveCanvas (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        var root = this._root;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = event_prehandler_mobile.call(this, ee, touches[i]);
          if (eArg.move) {
            this.postNotification('touchmove', [eArg]);
            root._dispatchMouseTouchEvent('touchmove', eArg);
          }
          eArg.stopPropagation();
          eArg.preventDefault();
        }
      }

      function eventTouchEndCanvas (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        var root = this._root;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = event_prehandler_mobile.call(this, ee, touches[i]);
          this.postNotification('touchend', [eArg]);
          root._dispatchMouseTouchEvent('touchend', eArg);
          eArg.stopPropagation();
          eArg.preventDefault();
        }
      }

      function eventTouchCancelCanvas (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        var root = this._root;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = event_prehandler_mobile.call(this, ee, touches[i]);
          this.postNotification('touchend', [eArg]);
          root._dispatchMouseTouchEvent('touchend', eArg);
          eArg.stopPropagation();
          eArg.preventDefault();
        }
      }

      function eventKeyDownDoc (e) {
        this.postNotification('keydown', [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventKeyPressDoc (e) {
        this.postNotification('keypress', [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventKeyUpDoc (e) {
        this.postNotification('keyup', [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventMouseDownDoc (e) {
        this.postNotification('mousedown', [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventMouseMoveDoc (e) {
        this.postNotification('mousemove', [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventMouseUpDoc (e) {
        this.postNotification('mouseup', [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventClickCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('click', [eArg]);
        this._root._dispatchMouseTouchEvent('click', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventDblClickCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('dblclick', [eArg]);
        this._root._dispatchMouseTouchEvent('dblclick', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventContextMenuCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('contextmenu', [eArg]);
        this._root._dispatchMouseTouchEvent('contextmenu', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventMouseDownCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mousedown', [eArg]);
        this._root._dispatchMouseTouchEvent('mousedown', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventMouseMoveCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mousemove', [eArg]);
        this._root._dispatchMouseTouchEvent('mousemove', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventMouseUpCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mouseup', [eArg]);
        this._root._dispatchMouseTouchEvent('mouseup', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventMouseWheelCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('wheel', [eArg]);
        this._root._dispatchMouseTouchEvent('wheel', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function initEvent () {
        var canvas = this._render.getCanvas();
        var doc = document;
        if (__WEBPACK_IMPORTED_MODULE_3__utils_platform_util__["a" /* default */].isMobile) {
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'touchstart', this, eventTouchStartDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'touchmove', this, eventTouchMoveDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'touchend', this, eventTouchEndDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'touchcancel', this, eventTouchCancelDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'touchstart', this, eventTouchStartCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'touchmove', this, eventTouchMoveCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'touchend', this, eventTouchEndCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'touchcancel', this, eventTouchCancelCanvas);
        } else {
          this._events.push(new Event());
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'keydown', this, eventKeyDownDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'keypress', this, eventKeyPressDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'keyup', this, eventKeyUpDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'mousedown', this, eventMouseDownDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'mousemove', this, eventMouseMoveDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(doc, 'mouseup', this, eventMouseUpDoc);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'click', this, eventClickCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'dblclick', this, eventDblClickCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'contextmenu', this, eventContextMenuCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'mousedown', this, eventMouseDownCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'mousemove', this, eventMouseMoveCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'mouseup', this, eventMouseUpCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'mousewheel', this, eventMouseWheelCanvas);
          __WEBPACK_IMPORTED_MODULE_2__utils_event_util__["a" /* default */].addEventListener(canvas, 'wheel', this, eventMouseWheelCanvas);
        }
      }

      function onLoadImageFinished (url, image, success) {
        if (success) {
          var callbacks = this._loaderCtx.callbacks[url];
          if (callbacks) {
            for (var callbackId in callbacks) {
              var callback = callbacks[callbackId];
              callback.callbackFn.call(callback.callbackTarget, url, image, success, true);
            }
            delete this._loaderCtx.callbacks[url];
          }
        }
      }

      function onRenderSizeChanged () {
        var render = this._render;
        var renderZone = this._renderZone;
        var transformCtx = this._transformCtx;
        if (!transformCtx.invalid) {
          if (render.clientWidth !== this._clientWidth || render.clientHeight !== this._clientHeight) {
            this._clientWidth = render.clientWidth;
            this._clientHeight = render.clientHeight;
            transformCtx.invalid = true;
          }
        }
        if (transformCtx.invalid) {
          var width = render.width;
          var height = render.height;
          var clientWidth = render.clientWidth;
          var clientHeight = render.clientHeight;
          switch (this.scaleMode) {
            case 1: {
              height = width * clientHeight / clientWidth;
              this.postNotification('resize', [width, height]);
              break;
            }
            case 2: {
              width = height * clientWidth / clientHeight;
              this.postNotification('resize', [width, height]);
              break;
            }
            default: {
              width = clientWidth;
              height = clientHeight;
              this.postNotification('resize', [width, height]);
              break;
            }
          }
          this._scaleX = width / clientWidth;
          this._scaleY = height / clientHeight;
          render.width = width;
          render.height = height;
          renderZone.width = width;
          renderZone.height = height;
          renderZone.right = width;
          renderZone.bottom = height;
          transformCtx.invalid = false;
          this.receiveDirtyZone(null, renderZone);
        }
      }

      function onPropertyChanged(sender, name, newVal, oldVal) {
        if (propertyChangedMap.hasOwnProperty(name)) {
          propertyChangedMap[name].call(this, newVal, oldVal);
        }
      }

      function onTransformInvalid() {
        this._transformCtx.invalid = true;
      }

      var propertyChangedMap = {
        scaleMode: onTransformInvalid
      }

      return {
        initEvent: initEvent,
        onLoadImageFinished: onLoadImageFinished,
        onPropertyChanged: onPropertyChanged,
        onRenderSizeChanged: onRenderSizeChanged,
      }
    })();

    var Event = (function () {
      function InnerEvent() {
        this.id = 0;
        this.event = null;

        this.touch = null;
        this.target = null;
        this.wheelDelta = 0;
        this.keyCode = 0;
        this.button = 0;
        this.altKey = false;
        this.ctrlKey = false;
        this.metaKey = false;
        this.move = false;

        this.skip = false;
        this.bubble = true;

        this.offsetX = 0;
        this.offsetY = 0;
      }

      InnerEvent.prototype.stopPropagation = function () {
        this.event.stopPropagation();
      }

      InnerEvent.prototype.preventDefault = function () {
        this.event.preventDefault();
      }

      return InnerEvent;
    })();

    var Application = (function () {
      var InnerApplication = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_5__notifier__["a" /* default */]);

      InnerApplication.prototype.defScaleMode = 0;
      InnerApplication.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.scaleMode = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.scaleMode, this.defScaleMode);

        this._root = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.root, null);
        this._root.application = this;

        this._render = new __WEBPACK_IMPORTED_MODULE_6__render_canvas_canvas_render__["a" /* default */]({canvas: conf.canvas, width: __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.width, undefined), height: __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.height, undefined)});
        this._renderZone = {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0
        };
        this._dirtyCtx = {
          dirty: false,
          zones: []
        };

        this._prevLoopTime = 0;
        this._preCheckTime = 0;
        this._timerTaskId = 0;
        this._events = [];

        this._animationCtx = {
          manager: new __WEBPACK_IMPORTED_MODULE_7__animation_manager__["a" /* default */]({})
        };
        this._loaderCtx = {
          callbacks: {},
          loader: new __WEBPACK_IMPORTED_MODULE_8__io_file_loader__["a" /* default */]({})
        };

        this._clientWidth = 0;
        this._clientHeight = 0;
        this._scaleX = 1;
        this._scaleY = 1;
        this._transformCtx = {
          invalid: true,
          transform: [1, 0, 0, 0, 1, 0]
        };

        functions.initEvent.call(this);
        functions.onRenderSizeChanged.call(this);

        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      InnerApplication.prototype.runNodeAnimation = function (node, animation, fn, target, loop) {
        this._animationCtx.manager.addAnimation(node, animation, fn, target, loop);
      }

      InnerApplication.prototype.stopNodeAnimation = function (node, animation) {
        this._animationCtx.manager.removeAnimationByNodeAndAnimation(node, animation);
      }

      InnerApplication.prototype.stopNodeAllAnimation = function (node) {
        this._animationCtx.manager.removeAnimationByNode(node);
      }

      InnerApplication.prototype.loadImage = function (url, callbackId, callbackFn, callbackTarget) {
        var image = this._loaderCtx.loader.loadImageAsync(url, functions.onLoadImageFinished, this, true); 
        if (image === undefined) {
          if (callbackId !== null && callbackFn !== null) {
            var imageCallBacks = this._loaderCtx.callbacks[url];
            if (!imageCallBacks) {
              this._loaderCtx.callbacks[url] = imageCallBacks = {};
            }
            if (!imageCallBacks[callbackId]) {
              imageCallBacks[callbackId] = {
                callbackFn: callbackFn, 
                callbackTarget: callbackTarget
              }
            }
          }
        } else if (image === null) {
          callbackFn.call(callbackTarget, url, image, false, false);
        } else {
          callbackFn.call(callbackTarget, url, image, true, false);
        }
        return image;
      }

      InnerApplication.prototype.loadAudio = function (url) {
        return this._loaderCtx.loader.loadAudioAsync(url);
      }

      InnerApplication.prototype.loadVideo = function (url) {
        return this._loaderCtx.loader.loadVideoAsync(url);
      }

      InnerApplication.prototype.receiveDirtyZone = function (node, dirtyZone) {
        var dirtyCtx = this._dirtyCtx;
        dirtyCtx.dirty = true;
        if (dirtyZone === null) {
          return false;
        }
        var renderZone = this._renderZone;
        if (__WEBPACK_IMPORTED_MODULE_4__utils_geometry_util__["a" /* default */].isZoneNotCross(renderZone, dirtyZone)) {
          return false;
        }
        dirtyZone.left = Math.max(renderZone.left, dirtyZone.left);
        dirtyZone.right = Math.min(renderZone.right, dirtyZone.right);
        dirtyZone.top = Math.max(renderZone.top, dirtyZone.top);
        dirtyZone.bottom = Math.min(renderZone.bottom, dirtyZone.bottom);
        dirtyZone.width = dirtyZone.right - dirtyZone.left;
        dirtyZone.height = dirtyZone.bottom - dirtyZone.top;
        var dirtyZones = dirtyCtx.zones;
        while (true) {
          var insert = true;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var zone = dirtyZones[i];
            if (__WEBPACK_IMPORTED_MODULE_4__utils_geometry_util__["a" /* default */].isZoneNotCross(zone, dirtyZone)) {
              continue;
            }
            dirtyZone.left = Math.min(zone.left, dirtyZone.left);
            dirtyZone.right = Math.max(zone.right, dirtyZone.right);
            dirtyZone.top = Math.min(zone.top, dirtyZone.top);
            dirtyZone.bottom = Math.max(zone.bottom, dirtyZone.bottom);
            dirtyZone.width = dirtyZone.right - dirtyZone.left;
            dirtyZone.height = dirtyZone.bottom - dirtyZone.top;
            insert = false;
            dirtyZones.splice(i, 1);
            break;
          }
          if (insert) {
            dirtyZones.push(dirtyZone);
            break;
          }
        }
        return true;
      }

      InnerApplication.prototype.loop = function () {
        var now = (new Date()).getTime(), deltaTime = 0;
        if (this._prevLoopTime !== 0) {
          deltaTime = now - this._prevLoopTime;
          this._prevLoopTime = now;
          this._animationCtx.manager.run(deltaTime);
        } else {
          this._prevLoopTime = now;
        }
        // 每半秒钟检测是否需要变换
        if (this._preCheckTime > 500) {
          this._preCheckTime = 0;
          functions.onRenderSizeChanged.call(this);
        } else {
          this._preCheckTime += deltaTime;
        }

        var dirtyCtx = this._dirtyCtx;
        if (dirtyCtx.dirty) {
          var dirtyZones = dirtyCtx.zones;
          var renderZone = this._renderZone;
          var root = this._root;
          var render = this._render;
          var transform = this._transformCtx.transform;
          // 同步最新的结点转换
          root._syncTransform(transform, transform, renderZone, false);
          // 重新计算脏矩形
          while (true) {
            if (!root._reportCurDirtyZone(this, dirtyZones)) {
              break;
            }
          }
          if (dirtyZones.length > 0) {
            // 清理脏矩形区域
            for (var i = 0, len = dirtyZones.length; i < len; ++i) {
              var dirtyZone = dirtyZones[i];
              render.clearRect(dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
            }
            // 重新绘制阶段
            console.log('frame');
            root._dispatchRender(render, 1, true, renderZone, dirtyZones);
            // 矩阵回归到单位矩阵
            render.setTransform(1, 0, 0, 1, 0, 0);
            // 清理脏矩形区
            dirtyCtx.zones = [];
            render.globalAlpha = 1;
          }
          // 是否脏了
          dirtyCtx.dirty = false;
        }
      }

      InnerApplication.prototype.run = function () {
        if (this._timerTaskId === 0) {
          if (this._root !== null) {
            this.receiveDirtyZone(null, {
              left: this._renderZone.left,
              top: this._renderZone.top,
              right: this._renderZone.right,
              bottom: this._renderZone.bottom,
              width: this._renderZone.width,
              height: this._renderZone.height
            });
            this._timerTaskId = __WEBPACK_IMPORTED_MODULE_1__utils_timer_util__["a" /* default */].addAnimationTask(this.loop, this);
            this.postNotification('resize', [this._render.width, this._render.height]);
          }
        }
      }

      InnerApplication.prototype.stop = function () {
        __WEBPACK_IMPORTED_MODULE_1__utils_timer_util__["a" /* default */].removeAnimationTaskById(this._timerTaskId);
        this._timerTaskId = 0;
      }

      InnerApplication.prototype.destroy = function () {
        if (this._root) {
          this._root.destroy();
          this._root = null;
        }
        if (this._render) {
          this._render.destroy();
          this._render = null;
        }
        if (this._animationCtx) {
          this._animationCtx.manager.destroy();
          this._animationCtx = null;
        }
        if (this._loaderCtx) {
          this._loaderCtx.loader.destroy();
          this._loaderCtx = null;
        }
        this.super('destroy');
      }

      return InnerApplication;
    })();

    return Application;
  }
)());


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__ = __webpack_require__(7);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */




/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var M3D = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].m3d;
    var functions = (function () {
      function onPropertyChanged (sender, name, newVal, oldVal) {
        if (propertyChangedMap.hasOwnProperty(name)) {
          propertyChangedMap[name].call(this, newVal, oldVal)
        }
      }
      
      function onViewPortChanged () {
        this.$context.viewport(this.viewPortX, this.viewPortY, this.viewPortWidth, this.viewPortHeight)
      }
      
      var propertyChangedMap = {
        viewPortX: onViewPortChanged,
        viewPortY: onViewPortChanged,
        viewPortWidth: onViewPortChanged,
        viewPortHeight: onViewPortChanged
      }

      return {
        onPropertyChanged: onPropertyChanged,
        onViewPortChanged: onViewPortChanged
      }
    })();

    var WebglRender = (function () {
      var InnerWebglRender = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

      InnerWebglRender.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.x = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.x, 0);
        this.y = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.y, 0);
        this.width = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.width, this.$canvas.width);
        this.height = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.height, this.$canvas.height);

        this._canvas = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.canvas, null);
        this._context = this.$canvas.getContext('webgl') || this.$canvas.getContext('experimental-webgl');
        this._program = this._context.createProgram();
        this._vertexShader = null;
        this._fragmentShader = null;

        functions.onViewPortChanged.call(this);
        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      InnerWebglRender.prototype.useProgram = function (vertexShader, fragmentShader) {
        var gl = this._context;
        this._vertexShader = gl.createShader(gl.VERTEX_SHADER);
        this._fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this._vertexShader, vertexShader);
        gl.compileShader(this._vertexShader);
        if (!gl.getShaderParameter(this._vertexShader, gl.COMPILE_STATUS)) {
          console.error('error compile vertex shader');
        }
        gl.shaderSource(this._fragmentShader, fragmentShader);
        gl.compileShader(this._fragmentShader);
        if (!gl.getShaderParameter(this._fragmentShader, gl.COMPILE_STATUS)) {
          console.error('error compile fragment shader');
        }
        this._program = gl.createProgram();
        gl.attachShader(this._program, this._vertexShader);
        gl.attachShader(this._program, this._fragmentShader);
        gl.linkProgram(this._program); 
      }
      
      InnerWebglRender.prototype.translate = function () {

      }

      InnerWebglRender.prototype.rotate = function () {

      }

      InnerWebglRender.prototype.scale = function () {

      }

      InnerWebglRender.prototype.shear = function () {

      }

      InnerWebglRender.prototype.lookAt = function () {

      }

      // InnerWebglRender.prototype.createAndCompileShader = function (type, source) {
      //   var shader = this.$context.createShader(type);
      //   this.$context.shaderSource(shader, source);
      //   this.$context.compileShader(shader);
      //   return shader;
      // }

      // InnerWebglRender.prototype.attachAndLinkShaderProgram = function (vShader, fShader) {
      //   var shaderProgram = this.$context.createProgram();
      //   shaderProgram.attachShader(shaderProgram, vShader);
      //   shaderProgram.attachShader(shaderProgram, fShader);
      //   this.$context.linkProgram(shaderProgram);
      //   return shaderProgram;
      // }

      return InnerWebglRender;
    })();

    return WebglRender;
  }
)());

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_text_util__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_geometry_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_view__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_render_canvas_canvas_render__ = __webpack_require__(3);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/16
 */






/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var doc = document;

    var functions = (function () {
      function renderLabelText (sender, render, dirtyZones) {
        var renderCache = this._textCacheCtx;
        renderLabelTextFont.call(this);
        renderLabelTextLayout.call(this);
        renderLabelTextCache.call(this);
        
        var zone = this.getLocalZone();
        var width = zone.width;
        var height = zone.height;

        var contentWidth = width - this.borderWidth * 2;
        var contentHeight = height - this.borderWidth * 2;

        if (contentWidth > 0 && contentHeight > 0) {
          var left = zone.left;
          var top = zone.top;

          var cacheRender = renderCache.render;
          var cacheWidth = cacheRender.width;
          var cacheHeight = cacheRender.height;

          var desRect = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: cacheWidth,
            height: cacheHeight,
          };
          if (this.textHorAlign < 0) {
            desRect.left = left + this.borderWidth;
          } else if (this.textHorAlign > 0) {
            desRect.left = left + this.borderWidth + contentWidth - cacheWidth;
          } else {
            desRect.left = left + this.borderWidth + Math.ceil((contentWidth - cacheWidth) / 2);
          }
          desRect.right = desRect.left + cacheWidth;
          if (this.textVerAlign < 0) {
            desRect.top = top + this.borderWidth;
          } else if (this.textVerAlign > 0) {
            desRect.top = top + this.borderWidth + contentHeight - cacheHeight;
          } else {
            desRect.top = top + this.borderWidth + Math.ceil((contentHeight - cacheHeight) / 2);
          }
          desRect.bottom = desRect.top + cacheHeight;
          var offsetLeft = - desRect.left;
          var offsetTop = - desRect.top;
          var cacheCanvas = cacheRender.getCanvas();
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            var crossRect = __WEBPACK_IMPORTED_MODULE_2__utils_geometry_util__["a" /* default */].getZoneCross(desRect, dirtyZone);
            if (crossRect !== null) {
              render.drawImageExt(cacheCanvas,
                crossRect.left + offsetLeft, crossRect.top + offsetTop, crossRect.width, crossRect.height,
                crossRect.left, crossRect.top, crossRect.width, crossRect.height);
            }
          }
        }
      }

      function renderLabelTextFont () {
        var renderCache = this._textCacheCtx;
        if (renderCache.fontInvalid) {
          renderCache._font = this.fontSize + 'px ' + this.fontFamily;
          renderCache.fontInvalid = false;
        }
      }

      function renderLabelTextLayout () {
        var renderCache = this._textCacheCtx;
        if (renderCache.layoutInvalid) {
          if (this.textLineNum !== 1) {
            var zone = this.getLocalZone();
            var borderWidth = (this.borderWidth > 0 && this.borderColor !== null) ? this.borderWidth : 0;
            renderCache.layout = __WEBPACK_IMPORTED_MODULE_1__utils_text_util__["a" /* default */].getTextLayoutInfo(this.text, renderCache._font, zone.width - 2 * borderWidth);
          } else {
            renderCache.layout = __WEBPACK_IMPORTED_MODULE_1__utils_text_util__["a" /* default */].getTextLayoutInfo(this.text, renderCache._font, -1);
          }
          renderCache.layoutInvalid = false;
        }
      }

      function renderLabelTextCache () {
        var renderCache = this._textCacheCtx;
        if (renderCache.renderInvalid) {
          var zone = this.getLocalZone();
          var layoutInfo = renderCache.layout;
          var lines = layoutInfo.lines;
          var lineHeight = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(this.textLineHeight, 1.5 * this.fontSize);
          var lineNum = (this.textLineNum < 1 || this.textLineNum > lines.length) ? lines.length : this.textLineNum;
          var render = renderCache.render;
          var renderWidth = (lineNum === 1) ? layoutInfo.width : (zone.width - 2 * this.borderWidth);
          var renderHeight = lineHeight * lineNum + 1;
          if (render.width !== render.width || render.height !== renderHeight) {
            render.width = renderWidth;
            render.height = renderHeight;
          } else {
            render.clear();
          }
          render.textBaseline = 'middle';
          var tx = 0, ty = lineHeight / 2;
          if (this.textHorAlign < 0) {
            tx = 0;
            render.textAlign = 'left';
          } else if (this.textHorAlign > 0) {
            tx = render.width;
            render.textAlign = 'right';
          } else {
            tx = render.width / 2;
            render.textAlign = 'center';
          }
          render.font = this._textCacheCtx._font;
          render.fillStyle = this.textColor;
          for (var i = 0; i < lineNum; ++i) {
            render.fillText(lines[i], tx, ty);
            ty += lineHeight;
          }
          renderCache.renderInvalid = false;
        }
      }

      function onPropertyChanged (sender, name, newVal, oldVal) {
        if (propertyChangedMap.hasOwnProperty(name)) {
          propertyChangedMap[name].call(this, newVal, oldVal);
        }
      }

      function onTextChanged () {
        this.removeObserver('postClipRender', renderLabelText, this);
        if (this.text || this.text !== '') {
          this.addObserver('postClipRender', renderLabelText, this);
          var ctx = this._textCacheCtx;
          ctx.fontInvalid = true;
          ctx.layoutInvalid = true;
          ctx.renderInvalid = true;
          if (ctx.render === null) {
            ctx.render = new __WEBPACK_IMPORTED_MODULE_4__core_render_canvas_canvas_render__["a" /* default */]({
              canvas: doc.createElement('canvas'),
              width: this.width,
              height: this.height
            });
          }
        }
        this.dirty();
      }

      function onWidthChanged () {
        this._textCacheCtx.layoutInvalid = true;
        this._textCacheCtx.renderInvalid = true;
      }

      function onFontSizeChanged () {
        this._textCacheCtx.fontInvalid = true;
        this._textCacheCtx.layoutInvalid = true;
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }
      
      function onFontFamilyChanged () {
        this._textCacheCtx.fontInvalid = true;
        this._textCacheCtx.layoutInvalid = true;
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextColorChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextHorAlignChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextVerAlignChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextLineHeightChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      function onTextLineNumChanged () {
        this._textCacheCtx.renderInvalid = true;
        this.dirty();
      }

      var propertyChangedMap = {
        width: onWidthChanged,
        text: onTextChanged,
        fontSize: onFontSizeChanged,
        fontFamily: onFontFamilyChanged,
        textColor: onTextColorChanged,
        textHorAlign: onTextHorAlignChanged,
        textVerAlign: onTextVerAlignChanged,
        textLineHeight: onTextLineHeightChanged,
        textLineNum: onTextLineNumChanged
      }

      return {
        onPropertyChanged: onPropertyChanged
      }
    })();

    var UILabel = (function () {
      var InnerUILabel = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_3__ui_view__["a" /* default */]);

      InnerUILabel.prototype.defFontSize = 13;
      InnerUILabel.prototype.defFontFamily = 'Helvetica, Roboto, Arial, sans-serif';
      InnerUILabel.prototype.defTextColor = '#000';
      InnerUILabel.prototype.defTextHorAlign = 0;
      InnerUILabel.prototype.defTextVerAlign = 0;
      InnerUILabel.prototype.defDirtyRenderSupport = true;
      InnerUILabel.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.text = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.text, '');
        this.fontSize = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.fontSize, this.defFontSize);
        this.fontFamily = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.fontFamily, this.defFontFamily);
        this.textColor = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textColor, this.defTextColor);
        this.textHorAlign = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textHorAlign, this.defTextHorAlign);
        this.textVerAlign = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textVerAlign, this.defTextVerAlign);
        this.textLineHeight = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textLineHeight, undefined);
        this.textLineNum = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textLineNum, 1);

        this._textCacheCtx = {
          fontInvalid: true,
          font: '',
          layoutInvalid: true,
          layout: null,
          renderInvalid: true,
          render: null
        };

        this.addObserver('propertyChanged', functions.onPropertyChanged, this);
      }

      return InnerUILabel;
    })();

    return UILabel;
  }
)());

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */



/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var GScene = (function () {
      var InnerGScene = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGScene.prototype.defLayer = 1;
      InnerGScene.prototype.defAnchorX = .5;
      InnerGScene.prototype.defAnchorY = .5;

      return InnerGScene;
    })();

    return GScene;
  }
)());

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__ = __webpack_require__(3);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */





/* harmony default export */ __webpack_exports__["a"] = ((function () {
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
            }
          }
        }
      }
      render.lineWidth = 1;
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
      ctx.needRender = (this.mapTileData && __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isArray(this.mapTileData)) ? true : false;
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
    var InnerGMap = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

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
      this.mapX = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapX, 0);
      this.mapY = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapY, 0);
      this.mapTileType = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileType, this.defMapTileType);
      this.mapTileWidth = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileWidth, this.defMapTileWidth);
      this.mapTileHeight = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileHeight, this.defMapTileHeight);
      this.mapTileImageIndex = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileImageIndex, {});
      this.mapTileImageClipIndex = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileImageClipIndex, {});
      this.mapTileRows = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileRows, this.defMapTileRows);
      this.mapTileCols = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileCols, this.defMapTileCols);
      this.mapTileData = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileData, []);
      this.mapGridVisible = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapGridVisible, this.defMapGridVisible);

      this._mapNode = new __WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]({
        rotateZ: 0,
        dirtyRenderSupport: true
      });
      this.appendChildNode(this._mapNode);

      this._mapGrid = new __WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]({
        rotateZ: 0,
        alpha: 0.2,
        dirtyRenderSupport: true
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
          foreRender: new __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__["a" /* default */]({ canvas: doc.createElement('canvas') }),
          backInvalid: true,
          backRender: new __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__["a" /* default */]({ canvas: doc.createElement('canvas') })
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
})());

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_proxy__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_node__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__g_model_node__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__g_model_util__ = __webpack_require__(29);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */







/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      function createNodes (nodes) {
        if (conf) {
          var queue = [];
          if (nodes) {
            for (var i = 0, len = nodes.length; i < len; ++i) {
              queue.push({
                parent: this._node,
                conf: nodes[i]
              });
            }
            while (queue.length > 0) {
              var item = queue.unshift();
              var itemConf = item.conf;
              var itemNode = new __WEBPACK_IMPORTED_MODULE_4__g_model_node__["a" /* default */](itemConf.node);
              var itemParent = item.parent;
              var children = itemConf.children;
              if (children) {
                for (var i = 0, len = children.length; i < len; ++i) {
                  queue.push[{
                    parent: itemNode,
                    conf: children[i]
                  }];
                }
              }
              itemParent.appendChildNode(itemNode);
              this._nodeMap[itemConf.id] = itemNode;
            }
          }
        }
      }

      function compileActions (actionGroups) {
        if (actionGroups) {
          for (var i = 0, len = actionGroups.length; i < len; ++i) {
            var actionGroup = actionGroups[i];
            var actions = actionGroup.actions;
            if (!actions) {
              continue
            }
            var compiledActions = [];
            for (var j = 0, leng = actions.length; j < leng; ++j) {
              var action = actions[i];
              var frames = action.frames;
              if (!frames) {
                continue
              }
              compileActions.push({
                id: action.id,
                name: action.name,
                condition: {
                  property: action.property,
                  min: action.min,
                  max: action.max
                }
              });
              for (var nodeId in frames) {
                var nodeFrames = frames[nodeId]
                if (!nodeFrames) {
                  var node = this._nodeMap[nodeId];
                  var animation = __WEBPACK_IMPORTED_MODULE_5__g_model_util__["a" /* default */].compilePropertiesFrames(this._nodeMap[nodeId], nodeFrames);
                }
              }
            }
            this._actionGroupMap[actionGroup.id] = {
              id: actionGroup.id,
              name: actionGroup.name,
              actions: compiledActions
            };
          }
        }
        // this._actions = {};
        // if (actions) {
        //   for (var i = 0, len = actions.length; i < len; ++i) {
        //     var modelAction = actions[i];
        //     var modelActionFrames = modelAction.frames;
        //     if (modelActionFrames) {
        //       var nodeCompiledActions = [];
        //       for (var nodeId in modelActionFrames) {
        //         var node = this._nodeMap[nodeId];
        //         var nodeFrames = modelActionFrames[nodeId];
        //         if (node && nodeFrames) {
        //           var animation = GUtil.compileModelFrames(node, nodeFrames, node === this._node);
        //           if (animation) {
        //             nodeCompiledActions.push({
        //               node: node,
        //               animation: animation
        //             });
        //           }
        //         }
        //       }
        //       if (nodeCompiledActions.length > 0) {
        //         this._actions[modelAction.id] = nodeCompiledActions;
        //       }
        //     }
        //   }
        // }
      }

      function createNode (conf) {
        var node = new __WEBPACK_IMPORTED_MODULE_4__g_model_node__["a" /* default */](conf.node);
        if (conf.id) {
          this._nodeMap[conf.id] = node;
        }
        if (conf.children) {
          var children = conf.children;
          for (var i = 0, len = children.length; i < len; ++i) {
            node.appendChildNode(createNode.call(this, children[i]));
          }
        }
        return node;
      }

      function runAction () {
        var context = this._actionsContext;
        if (context.runningAct) {
          var actions = context.runningAct;
          context.progress = 0;
          for (var i = 0, len = actions.length; i < len; ++i) {
            var action = actions[i];
            context.progress += 1;
            action.node.runAnimation(action.animation, runActionProgress, this, false);
          }
        }
      }

      function runActionProgress (binder, deltaTime, finish) {
        if (finish) {
          var context = this._actionsContext;
          context.progress -= 1;
          if (context.progress === 0 && context.loop) {
            runAction.call(this);
          }
        }
      }

      return {
        createNodes: createNodes,
        compileActions: compileActions
      }
    })();

    var GModel = (function () {
      var InnerGModel = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_notifier__["a" /* default */]);

      InnerGModel.prototype.defName = 'model';
      InnerGModel.prototype.defDirtyRenderSupport = true;
      InnerGModel.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.id = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.id, 1);
        this.name = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.name, this.defName);
        this.skin = new __WEBPACK_IMPORTED_MODULE_2__core_proxy__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.skin, {}));

        this._node = new __WEBPACK_IMPORTED_MODULE_3__core_node__["a" /* default */]({
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          shearX: 0,
          shearY: 0,
          rotateZ: 0,
          anchorX: .5,
          anchorY: .5,
          width: 0,
          height: 0,
          alpha: 1,
          visible: true,
          clip: false,
          interactive: true
        });
        this._nodeMap = {};

        this._actionGroupMap = {};
        this._actionGroupContext = {
          runningActionId: null,
          runningAction: null,
          progress: 0,
          loop: false
        };

        functions.createNodes.call(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.nodes, {}));
        functions.compileActions.call(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.actionGroups, null));
      }

      InnerGModel.prototype.addNode = function (node, nodeId, parentNodeId, prevNodeId) {
        var parentNode = this._nodeMap[parentNodeId];
        if (!parentNode) {
          console.log('Can not find parent node:' + prevNodeId);
          return;
        }
        if (arguments.length > 3) {
          if (prevNodeId === null) {
            parentNode.appendChildNodeToLayer(node, 0);
            this._nameMap[nodeId] = node;
            return;
          } else {
            var prevNode = this._nodeMap[prevNodeId];
            if (!prevNode) {
              console.log('Can not find prev node:' + prevNodeId)
              return;
            }
            var location = parentNode.getChildNodeLocation(prevNode);
            if (!location) {
              console.log('Can not find prev node:' + prevNodeId + ' in parent node:' + parentNodeId)
              return;
            }
            parentNode.appendChildNodeToLayer(node, location.layerIndex, location.nodeIndex + 1);
            this._nodeMap[nodeId] = node;
            return;
          }
        } else {
          parentNode.appendChildNode(node);
          this._nodeMap[nodeId] = node;
          return;
        }
      }

      InnerGModel.prototype.getNode = function (nodeId) {
        if (arguments.length === 0) {
          return this._node;
        } else {
          return this._nodeMap[nodeId]
        }
      }

      InnerGModel.prototype.removeNode = function (nodeId, destroy) {
        var node = this._nodeMap[nodeId];
        if (!node) {
          return null;
        }
        node.removeFromParent(destroy);
        delete this._nodeMap[nodeId];
        return node;
      }

      InnerGModel.prototype.compileAndSetAction = function (actConf) {
        var nodeActions = []
        var modelActFrames = actConf.frames;
        for (var nodeId in modelActFrames) {
          var node = this._nodeMap[nodeId];
          var nodeActFrames = modelActFrames[nodeId];
          if (node && nodeActFrames) {
            var animation = GUtil.compileModelFrames(node, nodeActFrames, node === this._node);
            if (animation) {
              nodeActions.push({
                node: node,
                animation: animation
              });
            }
          }
        }
        if (nodeActions.length > 0) {
          this._actions[actConf.id] = nodeActions;
        } else {
          delete this._actions[actConf.id];
        }
      }

      InnerGModel.prototype.runAction = function (actId, loop) {
        var context = this._actionsContext;
        if (name === context.runningActId) {
          return;
        }
        this.stopAction();
        context.runningActId = actId;
        context.runningAct = this._actions[actId];
        context.loop = loop;
        functions.runAction.call(this);
      }

      InnerGModel.prototype.stopAction = function () {
        var context = this._actionsContext;
        if (context.runningActId != null) {
          this._node.stopAnimation(true);
        }
        context.runningActId = null;
        context.runningAct = null;
        context.progress = 0;
        context.loop = false;
      }

      InnerGModel.prototype.destroy = function () {
        this._node.destroy();
        this._nodeMap = null;
        this._actions = null;
        this._actionsContext = null;
        this.super('destroy');
      }

      return InnerGModel;
    })();

    return GModel;
  }
)());


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var Proxy = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);
    Proxy.prototype.init = function (conf) {
      this.super('init', [conf]);
      for (var name in conf) {
        this[name] = conf[name]
      }
    }

    Proxy.prototype.get = function (name) {
      return this[name];
    }

    Proxy.prototype.set = function (name, value) {
      if (this[name] === value) {
        return;
      }
      if (this[name] === undefined) {
        this.defineNotifyProperty(name, value);
      } else {
        this[name] = value;
      }
    }

    return Proxy;
  }
)());

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_animation_scheduler_animation__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_animation_property_animation__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_animation_queue_animation__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_algebra_util__ = __webpack_require__(30);





/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    function propertySchedularUpdate (binder, param) {
      binder.node[param.property] = param.value
    }

    function propertyLineUpdate (v) {
      return function (binder, dt, st) {
        return st * v;
      }
    }

    function propertyCurveUpdate (params) {
      return function (binder, dt, st) {
        var t = __WEBPACK_IMPORTED_MODULE_3__utils_algebra_util__["a" /* default */].newton(params, st, 0.5);
        var t_ = 1 - t;
        return params[1] * Math.pow(t_, 3) + 3 * params[3] * Math.pow(t_, 2) * t + 3 * params[5] * t_ * Math.pow(t, 2) + params[7] * Math.pow(t, 3);
      }
    }

    function compilePropertiesFrames (node, nodeFrames) {
      if (node && nodeFrames) {
        var tweenSupportMap = {
          x: true,
          y: true,
          scaleX: true,
          scaleY: true,
          shearX: true,
          shearY: true,
          rotateZ: true,
          alpha: true,
          visible: true,
          texture: false
        };
        var asyncQueue = [];
        for (var prop in nodeFrames) {
          var propFrames = nodeFrames[prop]
          if (propFrames && propFrames.length > 0) {
            var syncQueue = [];
            var prevTime;
            var prevValue;
            for (var i = 0, len = propFrames.length; i < len; ++i) {
              var propFrame = propFrames[i];
              var time = propFrame.time;
              var value = propFrame.value;
              var tween = propFrame.tween;
              var curve = propFrame.curve;
              if (i === 0) {
                prevTime = 0
                prevValue = value
              }
              var deltaValue = value - prevValue;
              var deltaTime = time - prevTime;
              if (tween && tweenSupportMap[prop] && deltaValue !== 0) {
                // 渐变动画
                if (curve && curve.length === 8) {
                  var width = curve[6] - curve[0];
                  var height = curve[7] - curve[1];
                  var params = [
                    0,
                    0,
                    (curve[2] - curve[0]) / width * deltaTime,
                    (curve[3] - curve[1]) / height * deltaValue,
                    (curve[4] - curve[0]) / width * deltaTime,
                    (curve[5] - curve[1]) / height * deltaValue,
                    deltaTime,
                    deltaValue
                  ];
                  syncQueue.push(new __WEBPACK_IMPORTED_MODULE_1__core_animation_property_animation__["a" /* default */]({
                    property: prop,
                    offset: deltaValue,
                    offsetFn: propertyCurveUpdate(params)
                  }));
                } else {
                  syncQueue.push(new __WEBPACK_IMPORTED_MODULE_1__core_animation_property_animation__["a" /* default */]({
                    property: prop,
                    offset: deltaValue,
                    offsetFn: propertyLineUpdate(deltaValue / deltaTime)
                  }));
                }
              } else {
                // 逐帧动画
                syncQueue.push(new __WEBPACK_IMPORTED_MODULE_0__core_animation_scheduler_animation__["a" /* default */]({
                  callbackFn: propertySchedularUpdate,
                  callbackTarget: null,
                  interval: deltaTime,
                  repeats: 1,
                  param: {
                    property: prop,
                    value: value
                  }
                }));
              }
              if (syncQueue.length > 0) {
                asyncQueue.push(new __WEBPACK_IMPORTED_MODULE_2__core_animation_queue_animation__["a" /* default */]({
                  animations: syncQueue,
                  sync: true
                }));
              }
            } 
          }
        }
        if (asyncQueue.length > 0) {
          return new __WEBPACK_IMPORTED_MODULE_2__core_animation_queue_animation__["a" /* default */]({
            animations: asyncQueue,
            sync: false
          });
        }
      }
      return null;
    }

    return {
      compilePropertiesFrames: compilePropertiesFrames
    };
  }
)());

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    function newton(p, st, t) {
      var count = 0;
      while (count < 5) {
        var _t = 1 - t;
        var result = p[0] * Math.pow(_t, 3) + 3 * p[2] * Math.pow(_t, 2) * t +  3 * p[4] * _t * Math.pow(t, 2) + p[6] * Math.pow(t, 3) - st;
        if (Math.abs(result) < 0.5) {
          break;
        } else {
          var _result = (-3 * p[0] + 3 * p[2]) * Math.pow(_t, 2) + (-6 * p[2] + 6 * p[4]) * t * _t + (3 * p[6] - 3 * p[4]) * Math.pow(t, 2);
          if (_result === 0) {
            t = t + 0.1 > 1 ? t - 0.1 : t + 0.1;
          } else {
            t -= result / _result;
          }
        }
        count++;
      }
      if (t < 0) {
        return 0;
      } else if (t > 1) {
        return 1;
      } else {
        return t;
      }
    }

    return {
      newton: newton
    }
  }
)());

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_animation_scheduler_animation__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_animation_property_animation__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_animation_queue_animation__ = __webpack_require__(8);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */





/* harmony default export */ __webpack_exports__["a"] = ((function() {
  var rootNodeProps = [
    "rotateZ",
    "scaleX",
    "scaleY",
    "shearX",
    "shearY",
    "alpha",
    "visible",
    "image"
  ];

  var normalNodeProps = [
    "x",
    "y",
    "rotateZ",
    "scaleX",
    "scaleY",
    "shearX",
    "shearY",
    "alpha",
    "visible",
    "image"
  ];

  var tweenNodeProps = {
    x: true,
    y: true,
    rotateZ: true,
    scaleX: true,
    scaleY: true,
    shearX: true,
    shearY: true,
    alpha: true,
    visible: false,
    img: false
  };

  var propertyUnTweenUpdate = function(binder, param) {
    binder.node[param.property] = param.value;
  };

  var propertyLineTweenUpdate = function(offset, deltaTime) {
    var v = offset / deltaTime;
    return function(binder, dt, st) {
      return st * v;
    };
  };

  var propertyCurveTweenUpdate = function(params) {
    return function(binder, dt, st) {
      var t = newtonMethod(params, st, 0.5);
      var t_ = 1 - t;
      var result =
        params[1] * Math.pow(t_, 3) +
        3 * params[3] * Math.pow(t_, 2) * t +
        3 * params[5] * t_ * Math.pow(t, 2) +
        params[7] * Math.pow(t, 3);
      return result;
    };
  };

  var newtonMethod = function(params, st, t) {
    var count = 0;
    while (count < 5) {
      var t_ = 1 - t;
      var result =
        params[0] * Math.pow(t_, 3) +
        3 * params[2] * Math.pow(t_, 2) * t +
        3 * params[4] * t_ * Math.pow(t, 2) +
        params[6] * Math.pow(t, 3) -
        st;
      if (Math.abs(result) < 0.5) {
        break;
      } else {
        var result_ =
          (-3 * params[0] + 3 * params[2]) * Math.pow(t_, 2) +
          (-6 * params[2] + 6 * params[4]) * t_ * t +
          (3 * params[6] - 3 * params[4]) * Math.pow(t, 2);
        if (result_ === 0) {
          t = t + 0.1 > 1 ? t - 0.1 : t + 0.1;
        } else {
          t -= result / result_;
        }
      }
      count++;
    }
    if (t < 0) {
      return 0;
    } else if (t > 1) {
      return 1;
    } else {
      return t;
    }
  };

  var GUtil = {


    compileModelFrames: function(node, frames, isRoot) {
      if (frames && frames.length > 0) {
        var prevTime = 0;
        var prevProps;
        var syncQueue = [];
        for (var i = 0, len = frames.length; i < len; ++i) {
          var asyncQueue = [];
          var frame = frames[i];
          // 第一帧校验，关键帧必须为0
          if (i === 0) {
            if (frame.time !== 0) {
              console.error("First frame time should be zero");
              return null;
            } else {
              prevProps = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(frame.data.props);
            }
          }
          // 校验完毕开始编译动画
          var asyncQueue = [];
          var props = isRoot ? rootNodeProps : normalNodeProps;

          if (frame.tween && i !== 0) {
            // 渐变动画
            for (var i2 = 0, len2 = props.length; i2 < len2; ++i2) {
              var prevProp = prevProps[props[i2]];
              var currProp = frame.data.props[props[i2]];
              if (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(currProp) && prevProp !== currProp) {
                var deltaProp = currProp - prevProp;
                var deltaTime = frame.time - prevTime;
                if (tweenNodeProps[props[i2]]) {
                  if (
                    frame.data.curves &&
                    frame.data.curves[props[i2]] &&
                    frame.data.curves[props[i2]].length === 8
                  ) {
                    var curve = frame.curves[props[i2]];
                    var params = [];
                    var width = curve[6] - curve[0];
                    var height = curve[7] - curve[1];
                    params[0] = 0;
                    params[2] = ((curve[2] - curve[0]) / width) * deltaTime;
                    params[4] = ((curve[4] - curve[0]) / width) * deltaTime;
                    params[6] = deltaTime;
                    params[1] = 0;
                    params[3] = ((curve[3] - curve[1]) / height) * deltaProp;
                    params[5] = ((curve[5] - curve[1]) / height) * deltaProp;
                    params[7] = deltaProp;
                    syncQueue.push(
                      new __WEBPACK_IMPORTED_MODULE_2__core_animation_property_animation__["a" /* default */]({
                        property: props[i2],
                        offset: deltaProp,
                        offsetFn: propertyCurveTweenUpdate(params)
                      })
                    );
                  } else {
                    asyncQueue.push(
                      new __WEBPACK_IMPORTED_MODULE_2__core_animation_property_animation__["a" /* default */]({
                        property: props[i2],
                        offset: deltaProp,
                        offsetFn: propertyLineTweenUpdate(deltaProp, deltaTime)
                      })
                    );
                  }
                } else {
                  asyncQueue.push(
                    new __WEBPACK_IMPORTED_MODULE_1__core_animation_scheduler_animation__["a" /* default */]({
                      callbackFn: propertyUnTweenUpdate,
                      callbackTarget: undefined,
                      interval: deltaTime,
                      repeats: 1,
                      params: {
                        property: props[i2],
                        value: currProp
                      }
                    })
                  );
                }
                prevProps[props[i2]] = currProp;
              }
            }
          } else {
            // 逐帧动画
            for (var i2 = 0, len2 = props.length; i2 < len2; ++i2) {
              var prevProp = prevProps[props[i2]];
              var currProp = frame.data.props[props[i2]];
              if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(prevProp)) {
                console.error(
                  "First frame has some required node property:" + props[i2]
                );
                return null;
              }
              if (
                i === 0 ||
                (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(currProp) && prevProp !== currProp)
              ) {
                asyncQueue.push(
                  new __WEBPACK_IMPORTED_MODULE_1__core_animation_scheduler_animation__["a" /* default */]({
                    callbackFn: propertyUnTweenUpdate,
                    callbackTarget: undefined,
                    interval: frame.time - prevTime,
                    repeats: 1,
                    param: {
                      property: props[i2],
                      value: currProp
                    }
                  })
                );
                prevProps[props[i2]] = currProp;
              }
            }
          }
          prevTime = frame.time;
          if (asyncQueue.length > 0) {
            syncQueue.push(
              new __WEBPACK_IMPORTED_MODULE_3__core_animation_queue_animation__["a" /* default */]({
                animations: asyncQueue,
                sync: false
              })
            );
          }
        }
        if (syncQueue.length > 0) {
          return new __WEBPACK_IMPORTED_MODULE_3__core_animation_queue_animation__["a" /* default */]({
            animations: syncQueue,
            sync: true
          });
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  };

  return GUtil;
})());


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * util for class extend and so on
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

/* harmony default export */ __webpack_exports__["a"] = ((
  function () {

    var util = (function() {

      function getMaxInteger() {
        return 9007199254740991;
      }

      function getMinInteger() {
        return -9007199254740991
      }

      return {
        getMaxInteger: getMaxInteger,
        getMinInteger: getMinInteger
      }
    })();

    return util;
  }
)());

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (`
  void main(void){
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }

`);

/***/ })
/******/ ]);