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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
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
          this.init(conf)
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


/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      function notifyPropertyGetter (name) {
        return function () {
          return this.$properties[name];
        }
      }
      function notifyPropertySetter (name, eventName) {
        return function (val) {
          var oldVal = this.$properties[name];
          if (oldVal !== val) {
            this.$properties[name] = val;
            this.postNotification(eventName, this, [val, oldVal]);
          }
        }
      }

      return {
        notifyPropertyGetter: notifyPropertyGetter,
        notifyPropertySetter: notifyPropertySetter
      }
    })();

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
       * @param sender 指定发送者
       * @param order 排序
       */
      InnerNotifier.prototype.addObserver = function (name, fn, target, sender, order) {
        var observers = this._observers[name];
        if (!observers) {
          observers = [];
          this._observers[name] = observers;
        }
        var order = order ? order : 1;
        var newObserver = {
          fn: fn,
          target: target,
          sender: sender,
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
       * @param sender 发送者
       */
      InnerNotifier.prototype.removeObserver = function (name, fn, target, sender) {
        var observers = this._observers[name];
        if (observers) {
          var observer;
          for (var i = 0, len = observers.length; i < len; ++i) {
            observer = observers[i];
            if (observer.fn === fn && observer.target === target && observer.sender === sender) {
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

      InnerNotifier.prototype.getObserverByAllParams = function (name, fn, target, sender) {
        var observers = this._observers[name];
        if (observers) {
          var observer;
          for (var i = 0, len = observers.length; i < len; ++i) {
            observer = observers[i];
            if (observer.fn === fn && observer.target === target && observer.sender === sender) {
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
      InnerNotifier.prototype.postNotification = function (name, sender, params) {
        var observers = this._observers[name];
        if (observers) {
          var len = observers.length;
          if (len > 0) {
            params = params ? params : [];
            params.unshift(sender);
            var observer;
            for (var i = 0; i < len; ++i) {
              observer = observers[i];
              if (observer.sender === sender || observer.sender === null) {
                observer.fn.apply(observer.target, params);
              }
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
          get: functions.notifyPropertyGetter(name),
          set: functions.notifyPropertySetter(name, name + 'Changed')
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__ = __webpack_require__(4);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */





/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      function syncClipRender () {
        if (this.clip) {
          if (this.getObserverByAllParams('render', this.startClip, this, this) === null) {
            this.addObserver('render', this.startClip, this, this, 0);
          }
        } else {
          this.removeObserver('render', this.startClip, this, this);
        }
      }

      function syncTransform () {
        this._transformCtx.needUpdate = true;
      }
      
      function syncZoneInLocal () {
        this._zoneInLocal.needUpdate = true;
      }
      
      return {
        syncClipRender: syncClipRender,
        syncTransform: syncTransform,
        syncZoneInLocal: syncZoneInLocal
      }
    })();

    var Node = (function () {
      var id = 0;
      var InnerNode = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

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
      InnerNode.prototype.defVisible = false;
      InnerNode.prototype.defCursor = 'default';
      InnerNode.prototype.defInteractive = false;
      InnerNode.prototype.defClip = false;
      InnerNode.prototype.defLayer = 0;

      InnerNode.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('x', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.x, this.defX));
        this.defineNotifyProperty('y', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.y, this.defY));
        this.defineNotifyProperty('rotateZ', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.rotateZ, this.defRotateZ));
        this.defineNotifyProperty('scaleX', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.scaleX, this.defScaleX));
        this.defineNotifyProperty('scaleY', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.scaleY, this.defScaleY));
        this.defineNotifyProperty('inclineX', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.inclineX, this.defInclineX));
        this.defineNotifyProperty('inclineY', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.inclineY, this.defInclineY));
        this.defineNotifyProperty('width', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.width, this.defWidth));
        this.defineNotifyProperty('height', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.height, this.defHeight));
        this.defineNotifyProperty('anchorX', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.anchorX, this.defAnchorX));
        this.defineNotifyProperty('anchorY', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.anchorY, this.defAnchorY));
        this.defineNotifyProperty('alpha', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.alpha, this.defAlpha));
        this.defineNotifyProperty('visible', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.visible, this.defVisible));
        this.defineNotifyProperty('cursor', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.cursor, this.defCursor));
        this.defineNotifyProperty('interactive', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.interactive, this.defInteractive));
        this.defineNotifyProperty('clip', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.clip, this.defClip));
        this.defineNotifyProperty('parent', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.parent, null));
        this.defineNotifyProperty('application', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.application, null));

        this._id = ++id;
        this._childNodes =  {
          count: 0, 
          defLayer: __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.defLayer, this.defLayer), 
          nodeLayers: []
        };
        this._transformCtx = {
          needUpdate: false,
          lTransform: [0, 0, 0, 0, 0, 0],
          lReverseTransform: [0, 0, 0, 0, 0, 0],
          wTransform: [0, 0, 0, 0, 0, 0],
          wReverseTransform: [0, 0, 0, 0, 0, 0]
        };
        this._zoneInLocal = {
          needUpdate: false,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        };
        this._zoneInWorld = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        };
        this._dirtyZoneCtx = {
          dirty: false,
          oriReported: false,
          curReported: false
        };

        functions.syncClipRender.call(this);
        functions.syncTransform.call(this);
        functions.syncZoneInLocal.call(this);

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

        this.addObserver('clipChanged', functions.syncClipRender, this, this);

        this.addObserver('widthChanged', functions.syncZoneInLocal, this, this);
        this.addObserver('heightChanged', functions.syncZoneInLocal, this, this);
        this.addObserver('anchorXChanged', functions.syncZoneInLocal, this, this);
        this.addObserver('anchorYChanged', functions.syncZoneInLocal, this, this);
      }

      InnerNode.prototype.getZoneInLocal = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._zoneInLocal);
      }

      InnerNode.prototype.getZoneInWorld = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._zoneInWorld);
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
          application.runNodeAnimation(this, animation, fn, target, loop);
        }
      }

      InnerNode.prototype.stopAnimation = function (animation) {
        const application = this.findApplication()
        if (application) {
          application.stopNodeAnimation(this, animation);
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
          application.stopNodeAllAnimation(this);
        }
      }

      InnerNode.prototype.transformLVectorToW = function (vector) {
        return __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2dAndVect2d(this._transformCtx.wTransform, vector);
      }

      InnerNode.prototype.transformWVectorToL = function (vector) {
        return __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2dAndVect2d(this._transformCtx.wReverseTransform, vector);
      }

      InnerNode.prototype.transformLVectorToP = function (vector) {
        return __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2dAndVect2d(this._transformCtx.lTransform, vector);
      }

      InnerNode.prototype.transformPVectorToL = function (vector) {
        return __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2dAndVect2d(this._transformCtx.lReverseTransform, vector);
      }

      InnerNode.prototype.getTransformInParent = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._transformCtx.lTransform);
      }

      InnerNode.prototype.getReverseTransformInParent = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._transformCtx.lReverseTransform);
      }

      InnerNode.prototype.getTransformInWorld = function () {
        return __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._transformCtx.wTransform);
      }

      InnerNode.prototype.getReverseTransformInWorld = function() {
        return __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._transformCtx.wReverseTransform);
      }

      InnerNode.prototype.startClip = function (render) {
        var zone = this._zoneInLocal;
        render.beginPath();
        render.moveTo(zone.left, zone.top);
        render.lineTo(zone.right, zone.top);
        render.lineTo(zone.right, zone.bottom);
        render.lineTo(zone.left, zone.bottom);
        render.closePath();
        render.clip();
      }

      InnerNode.prototype.stopClip = function (render) {
        render.restore();
      }

      InnerNode.prototype.checkNeedRender = function (renderZone) {
        var renders = this.getObserverByName('render');
        return renders && renders.length > 0;
      }

      InnerNode.prototype.checkEventTrigger = function (name, e, x, y) {
        var zone = this._zoneInLocal;
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

      InnerNode.prototype.refresh = function () {
        var app = this.findApplication();
        if (app !== null) {
          app.refresh();
          this._reportOriDirtyZone(app);
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
        this.postNotification('frame', this);
        var transformCtx = this._transformCtx;
        var zoneInLocal = this._zoneInLocal;
        var zoneInWorld = this._zoneInWorld;
        if (zoneInLocal.needUpdate) {
          zoneInLocal.width = Math.round(this.width);
          zoneInLocal.height = Math.round(this.height);
          zoneInLocal.top = Math.round(zoneInLocal.height * (-this.anchorY));
          zoneInLocal.bottom = Math.round(zoneInLocal.height + zoneInLocal.top);
          zoneInLocal.left = Math.round(zoneInLocal.width * (-this.anchorX));
          zoneInLocal.right = Math.round(zoneInLocal.width + zoneInLocal.left);
        }
        
        if (transformCtx.needUpdate) {
          transformCtx.lTransform = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].incline2d(__WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].scale2d(__WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].rotate2d(__WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].translate2d(__WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].createIdentityMat2d(), this.x, this.y), this.rotateZ), this.scaleX, this.scaleY), this.inclineX, this.inclineY);
          transformCtx.lReverseTransform = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].reverse2d(transformCtx.lTransform);
          transformCtx.wTransform = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2d(parentWTransform, transformCtx.lTransform);
          transformCtx.wReverseTransform = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2d(transformCtx.lReverseTransform, parentWReverseTransform);
        } else if (parentUpdateTransform) {
          transformCtx.wTransform = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2d(parentWTransform, transformCtx.lTransform);
          transformCtx.wReverseTransform = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2d(transformCtx.lReverseTransform, parentWReverseTransform);
        }

        if (zoneInLocal.needUpdate || transformCtx.needUpdate || parentUpdateTransform) {
          var p1 = this.transformLVectorToW([zoneInLocal.left, zoneInLocal.top]);
          var p2 = this.transformLVectorToW([zoneInLocal.left, zoneInLocal.bottom]);
          var p3 = this.transformLVectorToW([zoneInLocal.right, zoneInLocal.top]);
          var p4 = this.transformLVectorToW([zoneInLocal.right, zoneInLocal.bottom]);
          zoneInWorld.top = Math.min(Math.min(p1[1], p2[1]), Math.min(p3[1], p4[1]));
          zoneInWorld.bottom = Math.max(Math.max(p1[1], p2[1]), Math.max(p3[1], p4[1]));
          zoneInWorld.left = Math.min(Math.min(p1[0], p2[0]), Math.min(p3[0], p4[0]));
          zoneInWorld.right = Math.max(Math.max(p1[0], p2[0]), Math.max(p3[0], p4[0]));
          zoneInWorld.width = zoneInWorld.right - zoneInWorld.left;
          zoneInWorld.height = zoneInWorld.bottom - zoneInWorld.top;
          this._dirtyZoneCtx.inRenderZone = __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].isZoneCross(zoneInWorld, renderZone);
        }

        zoneInLocal.needUpdate = false;
        transformCtx.needUpdate = false;

        var layers = this._childNodes.nodeLayers;
        for (var i = 0, len = layers.length; i < len; ++i) {
          var layer = layers[i];
          if (layer) {
            for (var j = 0, len2 = layer.length; j < len2; ++j) {
              layer[j]._syncTransform(transformCtx.wTransform, transformCtx.wReverseTransform, parentUpdateTransform || transformCtx.needUpdate);
            }
          }
        }
      }

      InnerNode.prototype._reportOriDirtyZone = function (app) {
        var dirtyZoneCtx = this._dirtyZoneCtx;
        if (dirtyZoneCtx.inRenderZone && !dirtyZoneCtx.oriReported) {
          this.oriReported = true;
          app.receiveDirtyZone(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._zoneInWorld));
        }
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

      InnerNode.prototype._reportCurDirtyZone = function (app, dirtyZones) {
        var result = false;
        var dirtyZoneCtx = this._dirtyZoneCtx;
        var zoneInWorld = this._zoneInWorld;
        if (dirtyZoneCtx.inRenderZone) {
          if (!dirtyZoneCtx.curReported) {
            var wTrans = this._transformCtx.wTransform;
            if (dirtyZoneCtx.oriReported) {
              result = app.receiveDirtyZone(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(zoneInWorld));
              dirtyZoneCtx.curReported = true;
            } else if (!(wTrans[0] === 1 && wTrans[1] === 0 && wTrans[3] === 0 && wTrans[4] === 0)) {
              for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                var dirtyZone = dirtyZones[i];
                if (__WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].isZoneCross(dirtyZone, zoneInWorld)) {
                  result = app.receiveDirtyZone(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(zoneInWorld));
                  dirtyZoneCtx.curReported = true;
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

      InnerNode.prototype._dispatchRender = function (render, parentAlpha, renderZone, dirtyZones) {
        var dirtyZoneCtx = this._dirtyZoneCtx;
        var alpha = this.alpha * parentAlpha;
        if (this.visible && alpha > 0) {
          if (this.clip) {
            // 如果发生裁剪
            if (dirtyZoneCtx.inRenderZone) {
              var w = this._transformCtx.wTransform;
              // 设置矩阵
              render.setTransform(w[0], w[3], w[1], w[4], w[2], w[5]);
              // 设置透明度
              render.globalAplha = alpha;
              // 绘制自身
              if (dirtyZoneCtx.curReported) {
                this.postNotification('render', this, [render, [this._zoneInWorld]]);
                this._dispatchChildrenRender(render, alpha, renderZone, dirtyZones);
                this.stopClip();
              } else {
                var zoneInWorld = this._zoneInWorld;
                var crossDirtyZones = [];
                for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                  var crossDirtyZone = __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].getZoneCross(zoneInWorld, dirtyZones[i]);
                  if (crossDirtyZone !== null) {
                    crossDirtyZone.left -= w[4];
                    crossDirtyZone.right -= w[4];
                    crossDirtyZone.top -= w[5];
                    crossDirtyZone.bottom -= [5];
                    crossDirtyZones.push(crossDirtyZone);
                  }
                }
                if (crossDirtyZones.length > 0) {
                  this.postNotification('render', this, [render, crossDirtyZones]);
                  this._dispatchChildrenRender(render, alpha, renderZone, dirtyZones);
                  this.stopClip();
                }
              }
            }
          } else {
            if (dirtyZoneCtx.inRenderZone) {
              if (this.checkNeedRender()) {
                var w = this._transformCtx.wTransform;
                // 设置矩阵
                render.setTransform(w[0], w[3], w[1], w[4], w[2], w[5]);
                // 设置透明度
                render.globalAplha = alpha;
                // 绘制自身
                if (dirtyZoneCtx.curReported) {
                  this.postNotification('render', this, [render, [this._zoneInLocal]]);
                } else {
                  var zoneInWorld = this._zoneInWorld;
                  var crossDirtyZones = [];
                  for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                    var crossDirtyZone = __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].getZoneCross(zoneInWorld, dirtyZones[i]);
                    if (crossDirtyZone !== null) {
                      crossDirtyZone.left -= w[4];
                      crossDirtyZone.right -= w[4];
                      crossDirtyZone.top -= w[5];
                      crossDirtyZone.bottom -= w[5];
                      crossDirtyZones.push(crossDirtyZone);
                    }
                  }
                  if (crossDirtyZones.length > 0) {
                    this.postNotification('render', this, [render, crossDirtyZones]);
                  }
                }
              }
              // 绘制子元素
              this._dispatchChildrenRender(render, alpha, renderZone, dirtyZones);
            } else {
              this._dispatchChildrenRender(render, alpha, renderZone, dirtyZones);
            }
          }
        }
        dirtyZoneCtx.oriReported = false;
        dirtyZoneCtx.curReported = false;
      }

      InnerNode.prototype._dispatchChildrenRender = function (render, alpha, renderZone, dirtyZones) {
        var layers = this._childNodes.nodeLayers;
        for (var i = 0, len = layers.length; i < len; ++i) {
          var layer = layers[i];
          if (layer) {
            for (var j = 0, len2 = layer.length; j < len2; ++j) {
              layer[j]._dispatchRender(render, alpha, renderZone, dirtyZones);
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



/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
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
        this._saveStack = [];

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
        this._saveStack.push(true);
      }

      InnerCanvasRender.prototype.restore = function () {
        if (this._saveStack.pop()) {
          this.$context.restore();
        }
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
/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var Binder = (function () {
      var InnerBinder = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

      InnerBinder.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('node', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.node, null));
        this.defineNotifyProperty('animation', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.animation, null));
        this.defineNotifyProperty('fn', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.fn, null));
        this.defineNotifyProperty('target', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.target, null));
        this.defineNotifyProperty('loop', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.loop, null));
        this._runParams = {};
      }

      InnerBinder.prototype.execute = function (deltaTime) {
        var result = this.animation.execute(this, deltaTime);
        if (this.fn !== null) {
          this.fn.apply(this.target, [this, result]);
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
        this.fn = null;
        this.target = null;
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
/* 8 */
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
/* 9 */
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
/* 10 */
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




/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var Manager = (function () {
      var InnerManager = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

      InnerManager.prototype.init = function (conf) {
        this.super('init', [conf]);
        this._aniBinders = [];
        this._paused = false;
      }

      InnerManager.prototype.pause = function () {
        this._paused = true;
      }

      InnerManager.prototype.resume = function () {
        this._paused = false;
      }

      InnerManager.prototype.addAnimation = function (node, animation, fn, target, loop) {
        this._aniBinders.push(new __WEBPACK_IMPORTED_MODULE_2__binder__["a" /* default */]({
          node: node,
          animation: animation,
          fn: fn,
          target: target,
          loop: loop
        }));
      }

      InnerManager.prototype.removeAnimationByNode = function (node) {
        var binders = this._aniBinders;
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
        var binders = this._aniBinders;
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
          var binders = this._aniBinders;
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
        this._aniBinders = null;
        this.super('destroy');
      }

      return InnerManager;
    })();

    return Manager;
  }
)());


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */



/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
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

      InnerFileLoader.prototype.loadImageAsync = function (url, fn, target) {
        if (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(this._loadedImages[url])) {
          return this._loadedImages[url];
        } else {
          var image = this._loadingImages[url];
          if (!image) {
            image = doc.createElement('img');
            image.src = url;
            this._loadingImages[url] = image;
          }

          var self = this;
          function loadSuccess() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingImages[url];
            self._loadedImages[url]  = image;
            if (fn) {
              fn.call(target, url, true);
            }
          }

          function loadError() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingImages[url];
            self._loadedImages[url] = null;
            if (fn) {
              fn.call(target, url, false);
            }
          }

          image.addEventListener('load', loadSuccess, false);
          image.addEventListener('error', loadError, false);
          return null;
        }
      }

      InnerFileLoader.prototype.loadAudioAsync = function (url, fn, target) {
        if (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(this._loadedAudios[url])) {
          return this._loadedAudios[url];
        } else {
          var audio = this._loadingAudios[url];
          if (!audio) {
            audio = doc.createElement('audio');
            audio.src = url;
            this._loadingAudios[url] = audio;
          }
          var self = this;
          function loadSuccess() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingAudios[url];
            self._loadedImages[url] = audio;
            if (fn) {
              fn.call(target, url, true);
            }
          }

          function loadError() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingAudios[url];
            self._loadedAudios[url] = null;
            if (fn) {
              fn.call(target, url, false);
            }
          }

          audio.addEventListener('load', loadSuccess, false);
          audio.addEventListener('error', loadError, false);
          return null;
        }
      }

      InnerFileLoader.prototype.loadVideoAsync = function (url, fn, target) {
        if (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(this._loadedVideos[url])) {
          return this._loadedVideos[url];
        } else {
          var video = this._loadingVideos[url];
          if (!video) {
            video = doc.createElement('video');
            video.src = url;
            this._loadingVideos[url] = video;
          }
          var self = this;
          function loadSuccess() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingVideos[url];
            self._loadedVideos[url] = video;
            if (fn) {
              fn.call(target, url, true);
            }
          }

          function loadError() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingVideos[url];
            self._loadedVideos[url] = null;
            if (fn) {
              fn.call(target, url, false);
            }
          }

          video.addEventListener('load', loadSuccess, false);
          video.addEventListener('error', loadError, false);
          return null;
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
/* 12 */
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
      createIdentityMat2d: function () {
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
      copyMat2d: function (srcMat, desMat) {
        for (var i = 0, len = srcMat.length; i < len; ++i) {
          desMat[i] = srcMat[i];
        }
        return desMat;
      },
      restMat2d: function (mat) {
        mat[0] = 1;
        mat[1] = 0;
        mat[2] = 0;
        mat[3] = 0;
        mat[4] = 1;
        mat[5] = 0;
        return mat;
      },
      mulMat2d: function (mat1, mat2) {
        return [
          mat1[0] * mat2[0] + mat1[1] * mat2[3], mat1[0] * mat2[1] + mat1[1] * mat2[4], mat1[0] * mat2[2] + mat1[1] * mat2[5] + mat1[2],
          mat1[3] * mat2[0] + mat1[4] * mat2[3], mat1[3] * mat2[1] + mat1[4] * mat2[4], mat1[3] * mat2[2] + mat1[4] * mat2[5] + mat1[5]
        ];
      },
      mulMat2dAndVect2d: function (mat, vector) {
        return [
          mat[0] * vector[0] + mat[1] * vector[1] + mat[2],
          mat[3] * vector[0] + mat[4] * vector[1] + mat[5]
        ];
      },
      translate2d: function (mat, x, y) {
        // [
        //   1, 0, x,
        //   0, 1, y,
        //   0, 0, 1
        // ]
        return [
          mat[0], mat[1], mat[0] * x + mat[1] * y + mat[2],
          mat[3], mat[4], mat[3] * x + mat[4] * y + mat[5]
        ];
      },
      rotate2d: function (mat, angle) {
        // [
        //   cos(angle), -sin(angle), 0,
        //   sin(angle),  cos(angle), 0,
        //   0, 0, 1
        // ]
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        return [
          mat[0] * c + mat[1] * s, mat[1] * c - mat[0] * s, mat[2],
          mat[3] * c + mat[4] * s, mat[4] * c - mat[3] * s, mat[5]
        ];
      },
      scale2d: function (mat, x, y) {
        // [
        //   x, 0, 0,
        //   0, y, 0,
        //   0, 0, 1
        // ]
        return [
          mat[0] * x, mat[1] * y, mat[2],
          mat[3] * x, mat[4] * y, mat[5]
        ];
      },
      incline2d: function (mat, x, y) {
        // [
        //   1, y, 0,
        //   x, 1, 0,
        //   0, 0, 1
        // ]
        return [
          mat[0] + mat[1] * y, mat[0] * x + mat[1], mat[2],
          mat[3] + mat[4] * y, mat[3] * x + mat[4], mat[5]
        ];
      },
      reverse2d: function (mat) {
        /**
         * 伴随矩阵求解逆矩阵
         */
        var temp = mat[0] * mat[4] - mat[1] * mat[3];
        return [
          mat[4] / temp, -mat[1] / temp, (mat[1] * mat[5] - mat[2] * mat[4]) / temp,
          -mat[3] / temp, mat[0] / temp, (mat[3] * mat[2] - mat[0] * mat[5]) / temp
        ];
      }
    };

    return util;
  }
)());

/***/ }),
/* 13 */
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




/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
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
          var anis = this.animations;
          binders = [];
          for (var i = 0, len = anis.length; i < len; ++i) {
            binders.push(new __WEBPACK_IMPORTED_MODULE_2__binder__["a" /* default */]({
              node: node,
              animation: anis[i]
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_animation__ = __webpack_require__(5);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */



/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var SchedulerAnimation = (function () {
      var InnerSchedulerAnimation = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__base_animation__["a" /* default */]);

      InnerSchedulerAnimation.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('fn', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.fn, null));
        this.defineNotifyProperty('target', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.target, null));
        this.defineNotifyProperty('interval', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.interval, 0));
        this.defineNotifyProperty('repeats', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.repeats, 0));
        this.defineNotifyProperty('param', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.param, null));
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
            this.fn.call(this.target, binder, this.param);
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
        this.fn = null;
        this.target = null;
        this.param = null;
        this.super('destroy')
      }

      return InnerSchedulerAnimation;
    })();

    return SchedulerAnimation;
  }
)());

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_animation__ = __webpack_require__(5);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */



/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var PropertyAnimation = (function () {
      var InnerPropertyAnimation = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__base_animation__["a" /* default */]);

      InnerPropertyAnimation.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('property', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.property, ''));
        this.defineNotifyProperty('targetOffset', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.targetOffset, 0));
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
        if ((offset - this.targetOffset) * (propertyOffset - this.targetOffset) <= 0) {
          binder.setRunParam('init', false);
          node[property] = node[property] + this.targetOffset - propertyOffset;
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
        this.targetOffset = null;
        this.offsetFn = null;
        this.super('destroy');
      }

      return InnerPropertyAnimation;
    })();

    return PropertyAnimation;
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




/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var doc = document;

    var functions = (function () {
      function syncBackgroundBorderRender() {
        var ctx = this._backgroundBorderCacheCtx;
        if (this.backgroundColor === null && (this.borderColor === null || this.borderWidth <= 0)) {
          this.removeObserver('render', renderBackgroundAndBorder, this, this);
          ctx.render = null;
        } else {
          if (this.getObserverByAllParams('render', renderBackgroundAndBorder, this, this) === null) {
            this.addObserver('render', renderBackgroundAndBorder, this, this, -Infinity);
          }
          if (ctx.render === null) {
            ctx.renderInvalid = true;
            ctx.render = new __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__["a" /* default */]({
              canvas: doc.createElement('canvas'),
              width: this.width,
              height: this.height
            });
          }
        }
      }

      function syncBackgroundBorderRenderInvalid() {
        this._backgroundBorderCacheCtx.renderInvalid = true;
      }
      
      function renderBackgroundAndBorder(sender, render, dirtyZones) {
        var ctx = this._backgroundBorderCacheCtx;
        if (ctx.renderInvalid) {
          renderBackgroundAndBorderCache.call(this, ctx.render);
          ctx.renderInvalid = false;
        }
        var rectInLocal = this.getRectInLocal();
        var cacheCanvas = ctx.render.getCanvas();
        var offsetLeft = - rectInLocal.left;
        var offsetTop = - rectInLocal.top;
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {
          var dirtyZone = dirtyZones[i];
          render.drawImageExt(cacheCanvas,
            dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
            dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
        }      
      }
      
      function renderBackgroundAndBorderCache(render) {
        var ctx = this._backgroundBorderCacheCtx;
        var rect = this.getRectInLocal();
        ctx.borderOffset = this.borderWidth / 2;
        ctx.borderRadius = this.borderRadius;
        ctx.backgroundOffset = ctx.borderOffset;
        ctx.backgroundRadius = this.borderRadius;
        ctx.clipOffset = this.borderWidth;
        ctx.clipRadius = this.borderRadius < ctx.borderOffset ? 0 : (this.borderRadius - ctx.borderOffset);
        if (ctx.render.width !== rect.width || ctx.render.height !== rect.height) {
          ctx.render.width = rect.width;
          ctx.render.height = rect.height;
        } else {
          ctx.render.clear();
        }
        if (ctx.borderRadius > 0) {
          renderRadiusPath(render, 0, 0, rect.width, rect.height, ctx.borderOffset, ctx.borderRadius);
        } else {
          renderRectPath(render, 0, 0, rect.width, rect.height, ctx.borderOffset);
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

      return {
        syncBackgroundBorderRender: syncBackgroundBorderRender,
        syncBackgroundBorderRenderInvalid: syncBackgroundBorderRenderInvalid,
        renderRectPath: renderRectPath,
        renderRadiusPath: renderRadiusPath
      }
    })();

    var UIView = (function () {
      var InnerUIView = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerUIView.prototype.defVisible = true;
      InnerUIView.prototype.defBackgroundColor = null;
      InnerUIView.prototype.defBorderColor = null;
      InnerUIView.prototype.defVisible = true;

      InnerUIView.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('backgroundColor', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.backgroundColor, this.defBackgroundColor));
        this.defineNotifyProperty('borderWidth', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.borderWidth, this.defBorderWidth));
        this.defineNotifyProperty('borderColor', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.borderColor, this.defBorderColor));
        this.defineNotifyProperty('borderRadius', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.borderRadius, this.defBorderRadius));

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

        functions.syncBackgroundBorderRender.call(this);
        functions.syncBackgroundBorderRenderInvalid.call(this);

        this.addObserver('backgroundColorChanged', this.refresh, this, this);
        this.addObserver('borderWidthChanged', this.refresh, this, this);
        this.addObserver('borderColorChanged', this.refresh, this, this);
        this.addObserver('borderRadiusChanged', this.refresh, this, this);

        this.addObserver('backgroundColorChanged', functions.syncBackgroundBorderRender, this, this);
        this.addObserver('borderWidthChanged', functions.syncBackgroundBorderRender, this, this);
        this.addObserver('borderColorChanged', functions.syncBackgroundBorderRender, this, this);

        this.addObserver('widthChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('heightChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('backgroundColorChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('borderWidthChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('borderColorChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
        this.addObserver('borderRadiusChanged', functions.syncBackgroundBorderRenderInvalid, this, this);
      }

      InnerUIView.prototype.startClip = function (render) {
        var ctx = this._backgroundBorderCacheCtx;
        var rect = this.getRectInLocal();
        if (ctx.clipRadius > 0) {
          functions.renderRadiusPath(render, rect.left, rect.top, rect.right, rect.bottom, ctx.clipOffset, ctx.clipRadius);
        } else {
          functions.renderRectPath(render, rect.left, rect.top, rect.right, rect.bottom, ctx.clipOffset);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_animation_scheduler_animation__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_animation_property_animation__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_animation_queue_animation__ = __webpack_require__(13);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */





/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var rootNodeProps = [
      'rotateZ', 'scaleX', 'scaleY', 'inclineX', 'inclineY', 'alpha', 'visible', 'img'
    ];

    var normalNodeProps = [
      'x', 'y', 'rotateZ', 'scaleX', 'scaleY', 'inclineX', 'inclineY', 'alpha', 'visible', 'img'
    ];

    var tweenableNodeProps = {
      x: true,
      y: true,
      rotateZ: true,
      scaleX: true,
      scaleY: true,
      inclineX: true,
      inclineY: true,
      alpha: true,
      visible: false,
      img: false
    };

    var propertyUnTweenUpdate = function (binder, param) {
      binder.node[param.property] = param.value;
    }
    
    var propertyLineTweenUpdate = function (offset, deltaTime) {
      var v = offset / deltaTime;
      return function (binder, dt, st) {
        return st * v;
      }
    }
    
    var propertyCurveTweenUpdate = function (params) {
      return function (binder, dt, st) {
        var t = newtonMethod(params, st, 0.5);
        var t_ = 1 - t;
        var result = params[1] * Math.pow(t_, 3) + 3 * params[3] * Math.pow(t_, 2) * t + 3 * params[5] * t_ * Math.pow(t, 2) + params[7] * Math.pow(t, 3);
        return result;
      }
    }
    
    var newtonMethod = function (params, st, t) {
      var count = 0;
      while(count < 5) {
        var t_ = 1 - t;
        var result = params[0] * Math.pow(t_, 3) + 3 * params[2] * Math.pow(t_, 2) * t + 3 * params[4] * t_ * Math.pow(t, 2) + params[6] * Math.pow(t, 3) - st;
        if (Math.abs(result) < 0.5) {
          break;
        } else {
          var result_ = ((-3 * params[0] + 3 * params[2]) * Math.pow(t_, 2) + (-6 * params[2] + 6 * params[4]) * t_ * t + (3 * params[6] - 3 * params[4]) * Math.pow(t, 2));
          if (result_ === 0) {
            t =  t + 0.1 > 1 ? (t - 0.1) : (t + 0.1);
          } else {
            t -= result / result_;
          }
        }
        count ++;
      }
      if (t < 0) {
        return 0;
      } else if (t > 1) {
        return 1;
      } else {
        return t;
      }
    }

    var GUtil = {
      compileModelFrames: function (node, frames, isRoot) {
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
                console.error('First frame time should be zero');
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
                  if (tweenableNodeProps[props[i2]]) {
                    if (frame.data.curves && frame.data.curves[props[i2]] && frame.data.curves[props[i2]].length === 8) {
                      var curve = frame.curves[props[i2]];
                      var params = [];
                      var width = curve[6] - curve[0];
                      var height = curve[7] -  curve[1];
                      params[0] = 0;
                      params[2] = (curve[2] - curve[0]) / width * deltaTime;
                      params[4] = (curve[4] - curve[0]) / width * deltaTime;
                      params[6] = deltaTime;
                      params[1] = 0;
                      params[3] = (curve[3] - curve[1]) / height * deltaProp;
                      params[5] = (curve[5] - curve[1]) / height * deltaProp;
                      params[7] = deltaProp;
                      syncQueue.push(new __WEBPACK_IMPORTED_MODULE_2__core_animation_property_animation__["a" /* default */]({
                        property: props[i2],
                        targetOffset: deltaProp,
                        offsetFn: propertyCurveTweenUpdate(params)
                      }));
                    } else {
                      asyncQueue.push(new __WEBPACK_IMPORTED_MODULE_2__core_animation_property_animation__["a" /* default */]({
                        property: props[i2],
                        targetOffset: deltaProp,
                        offsetFn: propertyLineTweenUpdate(deltaProp, deltaTime)
                      }));
                    }
                  } else {
                    asyncQueue.push(new __WEBPACK_IMPORTED_MODULE_1__core_animation_scheduler_animation__["a" /* default */]({
                      fn: propertyUnTweenUpdate,
                      target: undefined,
                      interval: deltaTime,
                      repeats: 1,
                      param: {property: props[i2], value: currProp}
                    }));
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
                  console.error('First frame has some required node property:' + props[i2]);
                  return null;
                }
                if (i === 0 || (!__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isUndefined(currProp) && prevProp !== currProp)) {
                  asyncQueue.push(new __WEBPACK_IMPORTED_MODULE_1__core_animation_scheduler_animation__["a" /* default */]({
                    fn: propertyUnTweenUpdate,
                    target: undefined,
                    interval: frame.time - prevTime,
                    repeats: 1,
                    param: {property: props[i2], value: currProp}
                  }));
                  prevProps[props[i2]] = currProp;
                }
              }
            }
            prevTime = frame.time;
            if (asyncQueue.length > 0) {
              syncQueue.push(new __WEBPACK_IMPORTED_MODULE_3__core_animation_queue_animation__["a" /* default */]({
                animations: asyncQueue,
                sync: false
              }));
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
  }
)());

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__g_texture__ = __webpack_require__(20);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */




/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var GTextureNode = (function () {
      var InnerGTextureNode = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGTextureNode.prototype.defLayer = 1;
      InnerGTextureNode.prototype.defAnchorX = 0.5;
      InnerGTextureNode.prototype.defAnchorY = 0.5;
      InnerGTextureNode.prototype.init = function (conf) {
        this.super('init', [conf]);

        this._texture = new __WEBPACK_IMPORTED_MODULE_2__g_texture__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.texture, {}));
        this.addChildNodeToLayer(this._texture, 0);
      }

      InnerGTextureNode.prototype.getTexture = function (conf) {
        return this._texture;
      }

      return InnerGTextureNode;
    })();

    return GTextureNode;
  }
)());

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */



/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      function syncImageRender () {
        this.removeObserver('render', renderImage, this, this);
        this.removeObserver('render', renderImageClip, this, this);
        if (this.image !== null && this.image !== '') {
          if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isString(this.image)) {
            this.addObserver('render', renderImage, this, this);
          } else {
            this.addObserver('render', renderImageClip, this, this);
          }
        }
      }

      function syncImageContext () {
        if (this.image !== null && this.image !== '') {
          var ctx = this._imageCtx;
          var image = this.image;
          ctx.invalid = true;
          if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isString(image)) {
            ctx.url = image;
          } else {
            ctx.url = image.url;
          }
        }
      }

      function renderImage (sender, render, dirtyZones) {
        var image = loadImage.call(this);
        if (image !== null) {
          var zoneInLocal = this.getZoneInLocal();
          var offsetLeft = - zoneInLocal.left;
          var offsetTop = - zoneInLocal.top;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }
      
      function renderImageClip (sender, render, dirtyZones) {
        var image = loadImage.call(this);
        if (image !== null) {
          var zoneInLocal = this.getZoneInLocal();
          var ctx = this._imageCtx;
          var offsetLeft = ctx.x - zoneInLocal.left;
          var offsetTop = ctx.y - zoneInLocal.top;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left + offsetLeft, dirtyZone.top + offsetTop, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }

      function loadImage () {
        var ctx = this._imageCtx;
        var image = this.findApplication().loadImage(ctx.url, true);
        if (ctx.invalid && image !== null) {
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
        return image;
      }

      return {
        syncImageRender: syncImageRender,
        syncImageContext: syncImageContext
      }
    })();

    var GTexture = (function () {
      var InnerGTexture = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGTexture.prototype.defImage = null;
      InnerGTexture.prototype.defAnchorX = 0.5;
      InnerGTexture.prototype.defAnchorY = 0.5;
      InnerGTexture.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('image', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.image, this.defImage));

        this._imageCtx = {
          invalid: true,
          url: null,
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };

        functions.syncImageRender.call(this);
        functions.syncImageContext.call(this);

        this.addObserver('imageChanged', this.refresh, this, this);

        this.addObserver('imageChanged', functions.syncImageRender, this, this);
        this.addObserver('imageChanged', functions.syncImageContext, this, this);
      }

      return InnerGTexture;
    })();

    return GTexture;
  }
)());

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(22);


(function () {
  var Application = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */].core.Application;
  var PropertyAnimation = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */].core.animation.PropertyAnimation;
  var GTexture = __WEBPACK_IMPORTED_MODULE_0__main__["a" /* default */].game.Texture;

  var root = new GTexture({
    x: 400,
    y: 300,
    visible: true,
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536657006&di=f6e8dc17d395fd0841a24aa1f068ce3c&imgtype=jpg&er=1&src=http%3A%2F%2Fp2.qhimg.com%2Ft0193dcb0a279f6ec8f.jpg',
  });

  var application = new Application({
    canvas: document.getElementById('main'),
    root: root
  });

  application.run();
  // root.runAnimation(new PropertyAnimation({
  //   property: 'inclineY',
  //   targetOffset: 1,
  //   offsetFn: function (animation, deltaTime, sumTime) {
  //     return  sumTime / 1000;
  //   }
  // }), null, null, false);
  
  // document.onclick = function () {
  //   console.log('yaya')
  //   root.x += 10;
  // }

})();

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_core_application__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_core_node__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_core_notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_core_io_file_loader__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_core_animation_manager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_core_animation_binder__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_core_animation_base_animation__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_core_animation_queue_animation__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_core_animation_scheduler_animation__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_core_animation_property_animation__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_core_render_canvas_canvas_render__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_core_render_webgl_webgl_render__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_ui_ui_view__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_ui_ui_label__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_game_g_scene__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_game_map_g_map__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_game_model_g_model__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_game_g_texture__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__src_game_g_texture_node__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__src_game_g_util__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__src_utils_event_util__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__src_utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__src_utils_matrix_util__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__src_utils_platform_util__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__src_utils_text_util__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__src_utils_timer_util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__src_utils_number_util__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__src_utils_geometry_util__ = __webpack_require__(4);



































/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var homyo = {
      core: {
        Application: __WEBPACK_IMPORTED_MODULE_0__src_core_application__["a" /* default */],
        Node: __WEBPACK_IMPORTED_MODULE_1__src_core_node__["a" /* default */],
        Notifier: __WEBPACK_IMPORTED_MODULE_2__src_core_notifier__["a" /* default */],

        io: {
          FileLoader: __WEBPACK_IMPORTED_MODULE_3__src_core_io_file_loader__["a" /* default */]
        },

        render: {
          CanvasRender: __WEBPACK_IMPORTED_MODULE_10__src_core_render_canvas_canvas_render__["a" /* default */],
          WebglRender: __WEBPACK_IMPORTED_MODULE_11__src_core_render_webgl_webgl_render__["a" /* default */]
        },

        animation: {
          Manager: __WEBPACK_IMPORTED_MODULE_4__src_core_animation_manager__["a" /* default */],
          Binder: __WEBPACK_IMPORTED_MODULE_5__src_core_animation_binder__["a" /* default */],
          BaseAnimation: __WEBPACK_IMPORTED_MODULE_6__src_core_animation_base_animation__["a" /* default */],
          QueueAnimation: __WEBPACK_IMPORTED_MODULE_7__src_core_animation_queue_animation__["a" /* default */],
          SchedulerAnimation: __WEBPACK_IMPORTED_MODULE_8__src_core_animation_scheduler_animation__["a" /* default */],
          PropertyAnimation: __WEBPACK_IMPORTED_MODULE_9__src_core_animation_property_animation__["a" /* default */]
        }
      },

      ui: {
        View: __WEBPACK_IMPORTED_MODULE_12__src_ui_ui_view__["a" /* default */],
        Label: __WEBPACK_IMPORTED_MODULE_13__src_ui_ui_label__["a" /* default */]
      },

      game: {
        Scene: __WEBPACK_IMPORTED_MODULE_14__src_game_g_scene__["a" /* default */],
        Map: __WEBPACK_IMPORTED_MODULE_15__src_game_map_g_map__["a" /* default */],
        Model: __WEBPACK_IMPORTED_MODULE_16__src_game_model_g_model__["a" /* default */],
        Texture: __WEBPACK_IMPORTED_MODULE_17__src_game_g_texture__["a" /* default */],
        TextureNode: __WEBPACK_IMPORTED_MODULE_18__src_game_g_texture_node__["a" /* default */],
        Util: __WEBPACK_IMPORTED_MODULE_19__src_game_g_util__["a" /* default */]
      },

      utils: {
        EventUtil: __WEBPACK_IMPORTED_MODULE_20__src_utils_event_util__["a" /* default */],
        LangUtil: __WEBPACK_IMPORTED_MODULE_21__src_utils_lang_util__["a" /* default */],
        MatrixUtil: __WEBPACK_IMPORTED_MODULE_22__src_utils_matrix_util__["a" /* default */],
        PlatformUtil: __WEBPACK_IMPORTED_MODULE_23__src_utils_platform_util__["a" /* default */],
        TextUtil: __WEBPACK_IMPORTED_MODULE_24__src_utils_text_util__["a" /* default */],
        TimerUtil: __WEBPACK_IMPORTED_MODULE_25__src_utils_timer_util__["a" /* default */],
        NumberUtil: __WEBPACK_IMPORTED_MODULE_26__src_utils_number_util__["a" /* default */],
        GeometryUtil: __WEBPACK_IMPORTED_MODULE_27__src_utils_geometry_util__["a" /* default */]
      }
    };

    return homyo;
  }
)());

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_timer_util__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_event_util__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_platform_util__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_geometry_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__render_canvas_canvas_render__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__animation_manager__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__io_file_loader__ = __webpack_require__(11);
/**
 * the core class for app
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */











/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
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
          this.postNotification('touchstart', this, [eventPreProcessMobile.call(this, ee, touches[i])]);
        }
      }

      function eventTouchMoveDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = eventPreProcessMobile(this, ee, touches[i]);
          if (eArg.move) {
            this.postNotification('touchmove', this, [eArg]);
          }
        }
      }

      function eventTouchEndDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          this.postNotification('touchend', this, [eventPreProcessMobile.call(this, ee, touches[i])]);
        }
      }

      function eventTouchCancelDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          this.postNotification('touchcancel', this, [eventPreProcessMobile.call(this, ee, touches[i])]);
        }
      }

      function eventTouchStartCanvas (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        var root = this._root;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = event_prehandler_mobile.call(this, ee, touches[i]);
          this.postNotification('touchstart', this, [eArg]);
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
            this.postNotification('touchmove', this, [eArg]);
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
          this.postNotification('touchend', this, [eArg]);
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
          this.postNotification('touchend', this, [eArg]);
          root._dispatchMouseTouchEvent('touchend', eArg);
          eArg.stopPropagation();
          eArg.preventDefault();
        }
      }

      function eventKeyDownDoc (e) {
        this.postNotification('keydown', this, [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventKeyPressDoc (e) {
        this.postNotification('keypress', this, [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventKeyUpDoc (e) {
        this.postNotification('keyup', this, [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventMouseDownDoc (e) {
        this.postNotification('mousedown', this, [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventMouseMoveDoc (e) {
        this.postNotification('mousemove', this, [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventMouseUpDoc (e) {
        this.postNotification('mouseup', this, [eventPreProcessDesktop.call(this, e ? e : win.event)]);
      }

      function eventClickCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('click', this, [eArg]);
        this._root._dispatchMouseTouchEvent('click', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventDblClickCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('dblclick', this, [eArg]);
        this._root._dispatchMouseTouchEvent('dblclick', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventContextMenuCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('contextmenu', this, [eArg]);
        this._root._dispatchMouseTouchEvent('contextmenu', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventMouseDownCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mousedown', this, [eArg]);
        this._root._dispatchMouseTouchEvent('mousedown', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventMouseMoveCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mousemove', this, [eArg]);
        this._root._dispatchMouseTouchEvent('mousemove', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventMouseUpCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mouseup', this, [eArg]);
        this._root._dispatchMouseTouchEvent('mouseup', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }

      function eventMouseWheelCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('wheel', this, [eArg]);
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

      function syncTransform () {
        this._transformCtx.needUpdate = true;
      }

      function syncRenderSize () {
        var render = this._render;
        var renderZone = this._renderZone;
        var transformCtx = this._transformCtx;
        if (!transformCtx.needUpdate) {
          if (render.clientWidth !== this._clientWidth || render.clientHeight !== this._clientHeight) {
            this._clientWidth = render.clientWidth;
            this._clientHeight = render.clientHeight;
            transformCtx.needUpdate = true;
          }
        }
        if (transformCtx.needUpdate) {
          var width = render.width;
          var height = render.height;
          var clientWidth = render.clientWidth;
          var clientHeight = render.clientHeight;
          switch (this.scaleMode) {
            case 1: {
              height = width * clientHeight / clientWidth;
              this.postNotification('resize', this, [width, height]);
              break;
            }
            case 2: {
              width = height * clientWidth / clientHeight;
              this.postNotification('resize', this, [width, height]);
              break;
            }
            case 3: {
              break;
            }
            default: {
              width = clientWidth;
              height = clientHeight;
              this.postNotification('resize', this, [width, height]);
              break;
            }
          }
          render.width = width;
          render.height = height;
          renderZone.width = width;
          renderZone.height = height;
          renderZone.right = width;
          renderZone.bottom = height;
          transformCtx.needUpdate = false;
          this._scaleX = width / clientWidth;
          this._scaleY = height / clientHeight;
          this.refresh();
        }
      }

      function loadImageFinished (url, success) {
        if (success) {
          if (this._loaderCtx.images[url] && this._loaderCtx.images[url].refresh) {
            this.receiveDirtyZone(null, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._renderZone));
            this.refresh();
          }
        }
      }

      return {
        initEvent: initEvent,
        syncTransform: syncTransform,
        syncRenderSize: syncRenderSize,
        loadImageFinished: loadImageFinished
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
        this.defineNotifyProperty('scaleMode', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.scaleMode, this.defScaleMode));

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
        this._dirtyZones = [];

        this._prevLoopTime = 0;
        this._preCheckTime = 0;
        this._refresh = true;
        this._timerTaskId = 0;
        this._events = [];

        this._animationCtx = {
          manager: new __WEBPACK_IMPORTED_MODULE_7__animation_manager__["a" /* default */]({})
        };
        this._loaderCtx = {
          images: {},
          audios: {},
          videos: {},
          loader: new __WEBPACK_IMPORTED_MODULE_8__io_file_loader__["a" /* default */]({})
        };

        this._clientWidth = this._render.clientWidth;
        this._clientHeight = this._render.clientHeight;
        this._scaleX = 1;
        this._scaleY = 1;
        this._transformCtx = {
          needUpdate: true,
          transform: [1, 0, 0, 0, 1, 0]
        };

        functions.initEvent.call(this);
        functions.syncTransform.call(this);
        functions.syncRenderSize.call(this);

        this.addObserver('scaleModeChanged', functions.syncTransform, this, this);
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

      InnerApplication.prototype.loadImage = function (url, refresh) {
        var loaderCtx = this._loaderCtx;
        var loader = loaderCtx.loader;
        if (loaderCtx.images[url]) {
          loaderCtx.images[url].refresh |= refresh;
          var image = loader.loadImageAsync(url);
          return image;
        } else {
          loaderCtx.images[url] = {refresh: refresh};
          var image = loader.loadImageAsync(url, functions.loadImageFinished, this);
          return image;
        }
      }

      InnerApplication.prototype.loadAudio = function (url) {
        return this._loaderCtx.loader.loadAudioAsync(url);
      }

      InnerApplication.prototype.loadVideo = function (url) {
        return this._loaderCtx.loader.loadVideoAsync(url);
      }

      InnerApplication.prototype.receiveDirtyZone = function (node, dirtyZone) {
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
        var dirtyZones = this._dirtyZones;
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

      InnerApplication.prototype.refresh = function () {
        this._refresh = true;
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
          functions.syncRenderSize.call(this);
        } else {
          this._preCheckTime += deltaTime;
        }
        if (this._refresh) {
          var renderZone = this._renderZone;
          var dirtyZones = this._dirtyZones;
          var root = this._root;
          var render = this._render;
          var transformCtx = this._transformCtx;
          // 同步最新的结点转换
          root._syncTransform(transformCtx.transform, transformCtx.transform, renderZone, transformCtx.needUpdate);
          // 重新计算脏矩形
          while (true) {
            if (!root._reportCurDirtyZone(this, dirtyZones)) {
              break;
            }
          }
          // 清理脏矩形区域
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.clearRect(dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
          // 重新绘制阶段
          root._dispatchRender(render, 1, renderZone, dirtyZones);
          // 清理脏矩形
          dirtyZones.splice(0, dirtyZones.length);
          // 矩阵回归到单位矩阵
          render.setTransform(1, 0, 0, 1, 0, 0);
          this._refresh = false;
          this._dirtyZones = [];
        }
      }

      InnerApplication.prototype.run = function () {
        if (this._timerTaskId === 0) {
          if (this._root !== null) {
            this._refresh = true;
            this.receiveDirtyZone(null, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._renderZone));
            this._timerTaskId = __WEBPACK_IMPORTED_MODULE_1__utils_timer_util__["a" /* default */].addAnimationTask(this.loop, this);
            this.postNotification('resize', this, [this._render.width, this._render.height]);
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/13
 */



/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      function syncViewPort () {
        this.$context.viewport(this.viewPortX, this.viewPortY, this.viewPortWidth, this.viewPortHeight)
      }
      
      return {
        syncViewPort: syncViewPort
      }
    })();

    var WebglRender = (function () {
      var InnerWebglRender = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__notifier__["a" /* default */]);

      InnerWebglRender.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.$canvas = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.canvas, null);
        this.$context = this.$canvas.getContext('webgl') || this.$canvas.getContext('experimental-webgl');

        this.defineNotifyProperty('viewPortX', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.x, 0));
        this.defineNotifyProperty('viewPortY', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.y, 0));
        this.defineNotifyProperty('viewPortWidth', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.width, this.$canvas.width));
        this.defineNotifyProperty('viewPortHeight', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.height, this.$canvas.height));

        functions.syncViewPort.call(this);

        this.addObserver('viewPortXChanged', functions.syncViewPort, this, this);
        this.addObserver('viewPortYChanged', functions.syncViewPort, this, this);
        this.addObserver('viewPortWidthChanged', functions.syncViewPort, this, this);
        this.addObserver('viewPortHeightChanged', functions.syncViewPort, this, this);
      }

      InnerWebglRender.prototype.createAndCompileShader = function (type, source) {
        var shader = this.$context.createShader(type);
        this.$context.shaderSource(shader, source);
        this.$context.compileShader(shader);
        return shader;
      }

      InnerWebglRender.prototype.attachAndLinkShaderProgram = function (vShader, fShader) {
        var shaderProgram = this.$context.createProgram();
        shaderProgram.attachShader(shaderProgram, vShader);
        shaderProgram.attachShader(shaderProgram, fShader);
        this.$context.linkProgram(shaderProgram);
        return shaderProgram;
      }

      return InnerWebglRender;
    })();

    return WebglRender;
  }
)());

/***/ }),
/* 25 */
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






/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var doc = document;

    var functions = (function () {
      function syncTextRender () {
        var ctx = this._textCacheCtx;
        if (this.text === null || this.text.trim().length === 0) {
          this.removeObserver('render', renderLabelText, this, this);
          ctx.render = null;
        } else {
          if (this.getObserverByAllParams('render', renderLabelText, this, this) === null) {
            this.addObserver('render', renderLabelText, this, this);
          }
          if (ctx.render === null) {
            ctx.renderInvalid = true;
            ctx.render = new __WEBPACK_IMPORTED_MODULE_4__core_render_canvas_canvas_render__["a" /* default */]({
              canvas: doc.createElement('canvas'),
              width: this.width,
              height: this.height
            });
          }
        }
      }

      function syncTextFontInvalid () {
        this._textCacheCtx.fontInvalid = true;
      }

      function syncTextLayoutInvalid () {
        this._textCacheCtx.layoutInvalid = true;
      }

      function syncTextRenderInvalid () {
        this._textCacheCtx.renderInvalid = true;
      }

      function renderLabelText (sender, render, dirtyZones) {
        var renderCache = this._textCacheCtx;
        if (renderCache.fontInvalid) {
          renderLabelTextFont.call(this);
          renderCache.fontInvalid = false;
        }
        if (renderCache.layoutInvalid) {
          renderLabelTextLayout.call(this);
          renderCache.layoutInvalid = false;
        }
        if (renderCache.renderInvalid) {
          renderLabelTextCache.call(this);
          renderCache.renderInvalid = false;
        }

        var rect = this.getRectInLocal();
        var width = rect.width;
        var height = rect.height;

        var contentWidth = width - this.borderWidth * 2;
        var contentHeight = height - this.borderWidth * 2;

        if (contentWidth > 0 && contentHeight > 0) {
          var left = rect.left;
          var top = rect.top;

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
            var crossRect = __WEBPACK_IMPORTED_MODULE_2__utils_geometry_util__["a" /* default */].getRectCross(desRect, dirtyZone);
            if (crossRect !== null) {
              render.drawImageExt(cacheCanvas,
                crossRect.left + offsetLeft, crossRect.top + offsetTop, crossRect.width, crossRect.height,
                crossRect.left, crossRect.top, crossRect.width, crossRect.height);
            }
          }
        }
      }
      
      function renderLabelTextFont () {
        this._textCacheCtx._font = this.fontSize + 'px ' + this.fontFamily;
      }

      function renderLabelTextLayout () {
        var renderCache = this._textCacheCtx;
        if (this.textLineNum !== 1) {
          var rect = this.getRectInLocal();
          var borderWidth = (this.borderWidth > 0 && this.borderColor !== null) ? this.borderWidth : 0;
          renderCache.layout = __WEBPACK_IMPORTED_MODULE_1__utils_text_util__["a" /* default */].getTextLayoutInfo(this.text, renderCache._font, rect.width - 2 * borderWidth);
        } else {
          renderCache.layout = __WEBPACK_IMPORTED_MODULE_1__utils_text_util__["a" /* default */].getTextLayoutInfo(this.text, renderCache._font, -1);
        }
      }

      function renderLabelTextCache () {
        var rect = this.getRectInLocal();
        var renderCache = this._textCacheCtx;
        var layoutInfo = renderCache.layout;
        var lines = layoutInfo.lines;
        var lineHeight = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(this.textLineHeight, 1.5 * this.fontSize);
        var lineNum = (this.textLineNum < 1 || this.textLineNum > lines.length) ? lines.length : this.textLineNum;
        var render = renderCache.render;
        var renderWidth = (lineNum === 1) ? layoutInfo.width : (rect.width - 2 * this.borderWidth);
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
      }

      return {
        syncTextRender: syncTextRender,
        syncTextFontInvalid: syncTextFontInvalid,
        syncTextLayoutInvalid: syncTextLayoutInvalid,
        syncTextRenderInvalid: syncTextRenderInvalid
      }
    })();

    var UILabel = (function () {
      var InnerUILabel = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_3__ui_view__["a" /* default */]);

      InnerUILabel.prototype.defFontSize = 13;
      InnerUILabel.prototype.defFontFamily = 'Helvetica, Roboto, Arial, sans-serif';
      InnerUILabel.prototype.defTextColor = '#000';
      InnerUILabel.prototype.defTextHorAlign = 0;
      InnerUILabel.prototype.defTextVerAlign = 0;
      InnerUILabel.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('text', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.text, ''));
        this.defineNotifyProperty('fontSize', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.fontSize, this.defFontSize));
        this.defineNotifyProperty('fontFamily', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.fontFamily, this.defFontFamily));
        this.defineNotifyProperty('textColor', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textColor, this.defTextColor));
        this.defineNotifyProperty('textHorAlign', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textHorAlign, this.defTextHorAlign));
        this.defineNotifyProperty('textVerAlign', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textVerAlign, this.defTextVerAlign));
        this.defineNotifyProperty('textLineHeight', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textLineHeight, undefined));
        this.defineNotifyProperty('textLineNum', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textLineNum, 1));

        this._textCacheCtx = {
          fontInvalid: true,
          font: '',
          layoutInvalid: true,
          layout: null,
          renderInvalid: true,
          render: null
        };

        functions.syncTextRender.call(this);
        functions.syncTextFontInvalid.call(this);
        functions.syncTextLayoutInvalid.call(this);
        functions.syncTextRenderInvalid.call(this);

        this.addObserver('textChanged', this.refresh, this, this);
        this.addObserver('fontSizeChanged', this.refresh, this, this);
        this.addObserver('fontFamilyChanged', this.refresh, this, this);
        this.addObserver('textColor', this.refresh, this, this);
        this.addObserver('textHorAlignChanged', this.refresh, this, this);
        this.addObserver('textVerAlignChanged', this.refresh, this, this);
        this.addObserver('textLineHeightChanged', this.refresh, this, this);
        this.addObserver('textLineNumChanged', this.refresh, this, this);

        this.addObserver('textChanged', functions.syncTextRender, this, this);

        this.addObserver('fontSizeChanged', functions.syncTextFontInvalid, this, this);
        this.addObserver('fontFamilyChanged', functions.syncTextFontInvalid, this, this);

        this.addObserver('widthChanged', functions.syncTextLayoutInvalid, this, this);
        this.addObserver('textChanged', functions.syncTextLayoutInvalid, this, this);
        this.addObserver('fontSizeChanged', functions.syncTextLayoutInvalid, this, this);
        this.addObserver('fontFamilyChanged', functions.syncTextFontInvalid, this, this);

        this.addObserver('widthChanged', functions.syncTextRenderInvalid, this, this);
        this.addObserver('textChanged', functions.syncTextRenderInvalid, this, this);
        this.addObserver('fontSizeChanged', functions.syncTextRenderInvalid, this, this);
        this.addObserver('fontFamilyChanged', functions.syncTextRenderInvalid, this, this);
        this.addObserver('textColorChanged', functions.syncTextRenderInvalid, this, this);
        this.addObserver('textHorAlignChanged', functions.syncTextRenderInvalid, this, this);
        this.addObserver('textLineHeightChanged', functions.syncTextRenderInvalid, this, this);
        this.addObserver('textLineNumChanged', functions.syncTextRenderInvalid, this, this);
      }

      return InnerUILabel;
    })();

    return UILabel;
  }
)());

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */



/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var GScene = (function () {
      var InnerGScene = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGScene.prototype.defLayer = 1;
      InnerGScene.prototype.defAnchorX = 0;
      InnerGScene.prototype.defAnchorY = 0;

      return InnerGScene;
    })();

    return GScene;
  }
)());

/***/ }),
/* 27 */
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





/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
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
        mapNode.removeObserver('frame', syncMapNodeX, this, this);
        mapNode.removeObserver('frame', syncMapNodeY, this, this);
        mapNode.removeObserver('frame', syncMapNodeAnchorX, this, this);
        mapNode.removeObserver('frame', syncMapNodeAnchorY, this, this);
        mapNode.removeObserver('frame', syncMapNodeWidthSquare, this, this);
        mapNode.removeObserver('frame', syncMapNodeWidthDiamond, this, this);
        mapNode.removeObserver('frame', syncMapNodeHeightSquare, this, this);
        mapNode.removeObserver('frame', syncMapNodeHeightDiamond, this, this);
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
          mapNode.addObserver('frame', syncMapNodeX, this, this);
          mapNode.addObserver('frame', syncMapNodeY, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorX, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorY, this, this);
          mapNode.addObserver('frame', syncMapNodeWidthSquare, this, this);
          mapNode.addObserver('frame', syncMapNodeHeightSquare, this, this);
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
          mapNode.addObserver('frame', syncMapNodeX, this, this);
          mapNode.addObserver('frame', syncMapNodeY, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorX, this, this);
          mapNode.addObserver('frame', syncMapNodeAnchorY, this, this);
          mapNode.addObserver('frame', syncMapNodeWidthDiamond, this, this);
          mapNode.addObserver('frame', syncMapNodeHeightDiamond, this, this);
        }
      }

      function syncMapBackgroundRender () {
        this._mapCacheCtx.background.needRender = (this.mapBackgroundImage && this.mapBackgroundImage !== '') ? true : false;
      }

      function syncMapTilesRender () {
        var tileCtx = this._mapCacheCtx.tile;
        tileCtx.needRender = (this.tileData && __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isArray(this.tileData)) ? true : false;
        tileCtx.offsetInvalid = true;
        tileCtx.sizeInvalid = true;
        tileCtx.foreInvalid = true;
        tileCtx.backInvalid = true;
      }

      function syncMapNodeX () {
        if (this._mapCacheCtx.mapXInvalid) {
          this._mapNode.x = this.mapX;
          this._mapCacheCtx.mapXInvalid = false;
        }
      }

      function syncMapNodeY () {
        if (this._mapCacheCtx.mapYInvalid) {
          this._mapNode.y = this.mapY;
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
        // var backgroundCtx = ctx.background;
      }

      function renderDiamondMap (sender, render, dirtyZones) {
        var ctx = this._mapCacheCtx;
        var tileCtx = ctx.tile;
        if (tileCtx.needRender && tileCtx.foreInvalid) {
          renderDiamondMapCache.call(this, tileCtx);
          tileCtx.foreInvalid = false;
        }
        // var backgroundCtx = ctx.background;
      }

      function renderSquareMapCache (sender, render, dirtyZones) {
        var ctx = this._mapCacheCtx.tile;
        var zone = this.getZoneInLocal();
        var mapNodeZone = this._mapNode.getZoneInLocal();

        var tileWidth = this.tileWidth;
        var tileHeight = this.tileHeight;

        var oldWidth = ctx.width;
        var oldHeight = ctx.height;
        var newWidth = oldWidth;
        var newHeight = oldHeight;
        if (ctx.sizeInvalid) {
          newWidth = Math.ceil(this.width / tileWidth) * tileWidth;
          newHeight = Math.ceil(this.height / tileHeight) * tileHeight;
          ctx.width = newWidth;
          ctx.height = newHeight;
          ctx.sizeInvalid = false;
        }

        var oldLeft = ctx.left;
        var oldTop = ctx.top;
        var newLeft = oldLeft;
        var newTop = oldTop;
        if (ctx.offsetInvalid) {
          newLeft = Math.floor(((zone.left - this.mapX - mapNodeZone.left) / tileWidth)) * tileWidth;
          newTop = Math.floor(((zone.top - this.mapY - mapNodeZone.top) / tileHeight)) * tileHeight;
          ctx.left = newLeft;
          ctx.top = newTop;
          ctx.offsetInvalid = false;
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
          var tileData = this.tileData;
          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
          for (var row = sRow, tileY = 0;
               row >= 0 && row < rowCount && tileY < newHeight;
               row += 1, tileY += tileHeight) {
            var tileRow = tileData[row];
            for (var col = sCol, tileX = 0;
                 col >= 0 && col < colCount && tileX < newWidth;
                 col += 1, tileX += tileWidth) {
              var tileCell = tileRow[col];
              if (!tileCell) {
                continue;
              }
              var imageClip = tileImageClip[tileCell];
              if (imageClip) {
                var image = tileImage[imageClip.imageId];
                if (image) {
                  var img = application.loadImage(image, true);
                  if (img !== null) {
                    foreRender.drawImageExt(img, image.x, image.y, image.width, image.height, tileX, tileY, tileWidth, tileHeight);
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
          var tileData = this.tileData;
          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
          for (var row = sRow, tileY = 0;
               row >= 0 && row < rowCount && tileY < newHeight;
               row += 1, tileY += tileHeight) {
            var tileRow = tileData[row];
            for (var col = sCol, tileX = 0;
                 col >= 0 && col < colCount && tileX < newWidth;
                 col += 1, tileX += tileWidth) {
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
                  var img = application.loadImage(image, true);
                  if (img !== null) {
                    foreRender.drawImageExt(img, image.x, image.y, image.width, image.height, tileX, tileY, tileWidth, tileHeight);
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
        var zone = this.getZoneInLocal();
        var mapNodeZone = this._mapNode.getZoneInLocal();

        var tileWidth = this.tileWidth;
        var tileHeight = this.tileHeight;
        var halfTileWidth = tileWidth / 2;
        var halfTileHeight = tileHeight / 2;

        var containerLeft = zone.left - this.mapX - mapNodeZone.left - this.mapTileRows * halfTileWidth;
        var containerTop = zone.top - this.mapY - mapNodeZone.top;
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
          var tileData = this.tileData;
          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
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
                  var img = application.loadImage(image, true);
                  if (img !== null) {
                    var srcX = image.x;
                    var srcY = image.y;
                    var srcWidth = image.width;
                    var srcHeight = image.height;
                    var desX = tileX;
                    var desY = tileY;
                    var desWidth = tileWidth;
                    var desHeight = tileHeight;
                    if (desX < 0) {
                      srcX += image.width / 2;
                      srcWidth -= image.width / 2;
                      desX += halfTileWidth;
                      desWidth -= halfTileWidth;
                    } else if (desX + tileWidth > newWidth) {
                      srcWidth -= image.width / 2;
                      desWidth -= halfTileWidth;
                    }
                    if (desY < 0) {
                      srcY += image.height / 2;
                      srcHeight -= image.height / 2;
                      desY += halfTileHeight;
                      desHeight -= halfTileHeight;
                    } else if (desY + tileHeight > newWidth) {
                      srcHeight -= image.height / 2;
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
          var tileData = this.tileData;
          var tileImage = this.tileImage;
          var tileImageClip = this.tileImageClip;
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
                  var img = application.loadImage(image, true);
                  if (img !== null) {
                    var halfImageWidth = image.width / 2;
                    var halfImageHeight = image.height / 2;
                    var srcX = image.x;
                    var srcY = image.y;
                    var srcWidth = image.width;
                    var srcHeight = image.height;
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
                                  foreRender.drawImageExt(img, image.x, image.y, image.width, halfImageHeight,
                                    tileX, tileY, tileWidth, halfTileHeight);
                                }
                                foreRender.drawImageExt(img, image.x, image.y + halfImageHeight, halfImageWidth, halfImageHeight,
                                  tileX, tileY + halfTileHeight, halfTileWidth, halfTileHeight);
                              } else {
                                if (clipTarTop > 0) {
                                  foreRender.drawImageExt(img, image.x + halfImageWidth, halfImageWidth, halfImageHeight,
                                    tileX + halfTileWidth, tileY, halfTileWidth, halfTileHeight);
                                }
                              }
                            } else if (tileX + halfTileWidth === clipTarRight) {
                              if (clipTarRight < newWidth) {
                                if (clipTarTop > 0) {
                                  foreRender.drawImageExt(img, image.x, image.y, image.width, halfImageHeight,
                                    tileX, tileY, tileWidth, halfTileHeight);
                                }
                                foreRender.drawImageExt(img, image.x + halfImageWidth, image.y + halfImageHeight, halfImageWidth, halfImageHeight,
                                  tileX + halfTileWidth, tileY + halfTileHeight, halfTileWidth, halfTileHeight);
                              } else {
                                if (clipTarTop > 0) {
                                  foreRender.drawImageExt(img, image.x, image.y, halfImageWidth, halfImageHeight,
                                    tileX, tileY, halfTileWidth, halfTileHeight);
                                }
                              }
                            } else {
                              if (clipTarTop > 0) {
                                foreRender.drawImageExt(img, image.x, image.y, image.width, halfImageHeight,
                                  tileX, tileY, tileWidth, halfTileHeight);
                              }
                            }
                          } else if (tileY + halfTileHeight === clipTarBottom) {
                            if (tileX + halfTileWidth === clipTarLeft) {
                              if (clipTarLeft > 0) {
                                if (clipTarBottom < newHeight) {
                                  foreRender.drawImageExt(img, image.x, image.y + halfImageHeight, image.width, halfImageHeight,
                                    tileX, tileY + halfTileHeight, tileWidth, halfTileHeight);
                                }
                                foreRender.drawImageExt(img, image.x, image.y, halfImageWidth, halfImageHeight,
                                  tileX, tileY, halfImageWidth, halfImageHeight);
                              } else {
                                if (clipTarBottom < newHeight) {
                                  foreRender.drawImageExt(img, image.x + halfImageWidth, image.y + halfImageHeight, halfImageWidth, halfImageHeight,
                                    tileX + halfTileWidth, tileY + halfTileHeight, halfTileWidth, halfTileHeight);
                                }
                              }
                            } else if (tileX + halfTileWidth === clipTarRight) {
                              if (clipTarRight < newWidth) {
                                if (clipTarBottom < newHeight) {
                                  foreRender.drawImageExt(img, image.x, image.y + halfImageHeight, image.width, halfImageHeight,
                                    tileX, tileY + halfTileHeight, tileWidth, halfTileHeight);
                                }
                                foreRender.drawImageExt(img, image.x + halfImageWidth, image.y, halfImageWidth, halfImageHeight,
                                  tileX + halfTileWidth, tileY, halfTileWidth, halfTileHeight);
                              } else {
                                if (clipTarBottom < newHeight) {
                                  foreRender.drawImageExt(img, image.x, image.y + halfImageHeight, halfImageWidth, halfImageHeight,
                                    tileX, tileY + halfImageHeight, halfTileWidth, halfTileHeight);
                                }
                              }
                            } else {
                              if (clipTarBottom < newHeight) {
                                foreRender.drawImageExt(img, image.x, image.y + halfImageHeight, image.width, halfImageHeight,
                                  tileX, tileY + halfTileHeight, tileWidth, halfTileHeight);
                              }
                            }
                          } else {
                            if (tileX + halfTileWidth === clipTarLeft) {
                              foreRender.drawImageExt(img, image.x, image.y, halfImageWidth, image.height,
                                tileX, tileY, halfTileWidth, tileHeight);
                            } else if (tileX + halfTileWidth === clipTarRight) {
                              foreRender.drawImageExt(img, image.x + halfImageWidth, image.y, halfImageWidth, image.height,
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

      return {
        syncMapNodeContext: syncMapNodeContext,
        syncMapBackgroundRender: syncMapBackgroundRender,
        syncMapTilesRender: syncMapTilesRender
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
      InnerGMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('mapX', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapX, 0));
        this.defineNotifyProperty('mapY', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapY, 0));
        this.defineNotifyProperty('mapBackgroundImage', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapBackgroundImage, null));
        this.defineNotifyProperty('mapTileType', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileType, this.defMapTileType));
        this.defineNotifyProperty('mapTileWidth', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileWidth, this.defMapTileWidth));
        this.defineNotifyProperty('mapTileHeight', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileHeight, this.defMapTileHeight));
        this.defineNotifyProperty('mapTileImageIndex', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileImageIndex, {}));
        this.defineNotifyProperty('mapTileImageClipIndex', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileImageClipIndex, {}));
        this.defineNotifyProperty('mapTileRows', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileRows, this.defMapTileRows));
        this.defineNotifyProperty('mapTileCols', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileCols, this.defMapTileCols));
        this.defineNotifyProperty('mapTileData', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.mapTileData, []));

        this._mapNode = new __WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]({
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
            foreRender: new __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__["a" /* default */]({canvas: doc.createElement('canvas')}),
            backInvalid: true,
            backRender: new __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__["a" /* default */]({canvas: doc.createElement('canvas')})
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
)());

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__g_util__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__g_texture_node__ = __webpack_require__(19);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */





/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      function createNode (conf) {
        var node = new __WEBPACK_IMPORTED_MODULE_3__g_texture_node__["a" /* default */](conf.node);
        if (conf.id) {
          this._nodeMap[conf.id] = node;
        }
        if (conf.children) {
          var children = conf.children;
          for (var i = 0, len = children.length; i < len; ++i) {
            node.addChildNode(createNode.call(this, children[i]));
          }
        }
        return node;
      }

      function createNodes (conf) {
        if (conf) {
          this._nodeMap = {};
          this._node = createNode.call(this, conf);
        }
      }

      function compileActions (actions) {
        this._actions = {};
        if (actions) {R
          for (var i = 0, len = actions.length; i < len; ++i) {
            var modelAction = actions[i];
            var modelActionFrames = modelAction.frames;
            if (modelActionFrames) {
              var nodeCompiledActions = [];
              for (var nodeId in modelActionFrames) {
                var node = this._nodeMap[nodeId];
                var nodeFrames = modelActionFrames[nodeId];
                if (node && nodeFrames) {
                  var animation = __WEBPACK_IMPORTED_MODULE_2__g_util__["a" /* default */].compileModelFrames(node, nodeFrames, node === this._node);
                  if (animation) {
                    nodeCompiledActions.push({
                      node: node,
                      animation: animation
                    });
                  }
                }
              }
              if (nodeCompiledActions.length > 0) {
                this._actions[modelAction.id] = nodeCompiledActions;
              }
            }
          }
        }
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

      InnerGModel.prototype.init = function (conf) {
        this.super('init', [conf]);

        this._node = null;
        this._nodeMap = null;

        this._actions = null;
        this._actionsContext = {
          runningActId: null,
          runningAct: null,
          progress: 0,
          loop: false
        };

        functions.createNodes.call(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.root, null));
        functions.compileActions.call(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.actions, null));
      }

      InnerGModel.prototype.addNode = function (node, nodeId, parentNodeId, prevNodeId) {
        var parentNode = this._nodeMap[parentNodeId];
        if (!parentNode) {
          console.log('Can not find parent node:' + prevNodeId);
          return;
        }
        if (arguments.length > 3) {
          if (prevNodeId === null) {
            parentNode.addChildNodeToLayer(node, 0);
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
            parentNode.addChildNodeToLayer(node, location.layerIndex, location.nodeIndex + 1);
            this._nodeMap[nodeId] = node;
            return;
          }
        } else {
          parentNode.addChildNode(node);
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
            var animation = __WEBPACK_IMPORTED_MODULE_2__g_util__["a" /* default */].compileModelFrames(node, nodeActFrames, node === this._node);
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
        this.super('destroy');
      }

      return InnerGModel;
    })();

    return GModel;
  }
)());


/***/ }),
/* 29 */
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

/***/ })
/******/ ]);