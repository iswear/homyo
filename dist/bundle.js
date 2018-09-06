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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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

      function getMaxInteger() {
        return 9007199254740991;
      }

      function getMinInteger() {
        return -9007199254740991
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
        checkAndGet: checkAndGet,
        getMaxInteger: getMaxInteger,
        getMinInteger: getMinInteger
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__ = __webpack_require__(10);
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
      
      function syncRectInLocal () {
        this._rectInLocal.needUpdate = true;
      }
      
      return {
        syncClipRender: syncClipRender,
        syncTransform: syncTransform,
        syncRectInLocal: syncRectInLocal
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
        this._dirtyZoneCtx = {
          inRenderZone: false,
          oriReported: false,
          curReported: false
        };

        functions.syncClipRender.call(this);
        functions.syncTransform.call(this);
        functions.syncRectInLocal.call(this);

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
        this.addObserver('widthChanged', functions.syncRectInLocal, this, this);
        this.addObserver('heightChanged', functions.syncRectInLocal, this, this);
        this.addObserver('anchorXChanged', functions.syncRectInLocal, this, this);
        this.addObserver('anchorYChanged', functions.syncRectInLocal, this, this);
      }

      InnerNode.prototype.getRectInLocal = function () {
        return this._rectInLocal;
      }

      InnerNode.prototype.getRectInWorld = function () {
        return this._rectInWorld;
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
        var rect = this._rectInLocal;
        render.beginPath();
        render.moveTo(rect.left, rect.top);
        render.lineTo(rect.right, rect.top);
        render.lineTo(rect.right, rect.bottom);
        render.lineTo(rect.left, rect.bottom);
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
        var rect = this._rectInLocal;
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
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
        if (app === null) {
          return;
        }
        app.refresh();
        if (app.enableDirtyZone) {
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
        var transformCtx = this._transformCtx;
        var rectInLocal = this._rectInLocal;
        var rectInWorld = this._rectInWorld;
        if (rectInLocal.needUpdate) {
          rectInLocal.width = Math.round(this.width);
          rectInLocal.height = Math.round(this.height);
          rectInLocal.top = Math.round(rectInLocal.height * (-this.anchorY));
          rectInLocal.bottom = Math.round(rectInLocal.height + rectInLocal.top);
          rectInLocal.left = Math.round(rectInLocal.width * (-this.anchorX));
          rectInLocal.right = Math.round(rectInLocal.width + rectInLocal.left);
          rectInLocal.needUpdate = false;
        }
        if (transformCtx.needUpdate) {
          transformCtx.lTransform =
            __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].incline2d(
              __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].scale2d(
                __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].rotate2d(
                  __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].translate2d(__WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].createIdentityMat2d(), this.x, this.y), this.rotateZ), this.scaleX, this.scaleY), this.inclineX, this.inclineY);
          transformCtx.lReverseTransform = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].reverse2d(transformCtx.lTransform);
          transformCtx.needUpdate = false;
        }
        if (parentUpdateTransform || transformCtx.needUpdate) {
          transformCtx.wTransform = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2d(parentWTransform, transformCtx.lTransform);
          transformCtx.wReverseTransform = __WEBPACK_IMPORTED_MODULE_2__utils_matrix_util__["a" /* default */].mulMat2d(transformCtx.lReverseTransform, parentWReverseTransform);
        }
        if (rectInLocal.needUpdate || transformCtx.needUpdate || parentUpdateTransform) {
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
          if (__WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].isRectNotCross(rectInWorld, renderZone)) {
            this._dirtyZoneCtx.inRenderZone = false;
          } else {
            this._dirtyZoneCtx.inRenderZone = true;
          }
        }

        this.postNotification('frame', this);
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
          app.receiveDirtyZone(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(this._rectInWorld));
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
        var rectInWorld = this._rectInWorld;
        if (dirtyZoneCtx.inRenderZone) {
          if (!dirtyZoneCtx.curReported) {
            var wTrans = this._transformCtx.wTransform;
            if (dirtyZoneCtx.oriReported) {
              result = app.receiveDirtyZone(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(rectInWorld));
              dirtyZoneCtx.curReported = true;
            } else if (!(wTrans[0] === 1 && wTrans[1] === 0 && wTrans[3] === 0 && wTrans[4] === 0)) {
              for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                var dirtyZone = dirtyZones[i];
                if (__WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].isRectCross(dirtyZone, rectInWorld)) {
                  result = app.receiveDirtyZone(this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].clone(rectInWorld));
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
                this.postNotification('render', this, [render, [this._rectInLocal]]);
                this._dispatchChildrenRender(render, alpha, renderZone, dirtyZones);
                this.stopClip();
              } else {
                var rectInWorld = this._rectInWorld;
                var crossDirtyZones = [];
                for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                  var crossDirtyZone = __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].getRectCross(rectInWorld, dirtyZones[i]);
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
                var w = this._syncTransform.wTransform;
                // 设置矩阵
                render.setTransform(w[0], w[3], w[1], w[4], w[2], w[5]);
                // 设置透明度
                render.globalAplha = alpha;
                // 绘制自身
                if (dirtyZoneCtx.curReported) {
                  this.postNotification('render', this, [render, [this._rectInLocal]]);
                } else {
                  var rectInWorld = this._rectInWorld;
                  var crossDirtyZones = [];
                  for (var i = 0, len = dirtyZones.length; i < len; ++i) {
                    var crossDirtyZone = __WEBPACK_IMPORTED_MODULE_3__utils_geometry_util__["a" /* default */].getRectCross(rectInWorld, dirtyZones[i]);
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
        this.super('destroy');
      }

      return InnerBinder;
    })();

    return Binder;
  }
)());

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */




/* harmony default export */ __webpack_exports__["a"] = ((
  function () {

    var GMap = (function () {
      var InnerGMap = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGMap.prototype.defWidth = 0;
      InnerGMap.prototype.defHeight = 0;
      InnerGMap.prototype.defAnchorX = 0;
      InnerGMap.prototype.defAnchorY = 0;
      InnerGMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('containerLeft', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.containerLeft, -Infinity));
        this.defineNotifyProperty('containerRight', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.containerRight, -Infinity));
        this.defineNotifyProperty('containerTop', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.containerTop, Infinity));
        this.defineNotifyProperty('containerBottom', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.containerBottom, Infinity));

        this._models = [];
      }

      InnerGMap.prototype.checkEventTrigger = function (name, e, x, y) {
        return true;
      }

      InnerGMap.prototype.addModel = function (model, x, y, layerIndex) {

      }

      InnerGMap.prototype.removeModel = function (model, x, y, layerIndex) {

      }

      return InnerGMap;
    })();

    return GMap;
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
/**
 * util for class extend and so on
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var util = (function() {
      function isRectCross(rect1, rect2) {
        return !isRectNotCross(rect1, rect2);
      }

      function isRectNotCross(rect1, rect2) {
        return rect1.left >= rect2.right || rect1.right <= rect2.left || rect1.top >= rect1.bottom || rect1.bottom <= rect2.top;
      }

      function getRectCross(rect1, rect2) {
        var left = Math.max(rect1.left, rect2.left);
        var right = Math.min(rect1.right, rect2.right);
        var width = right - left;
        if (width <= 0) {
          return null;
        }
        var top = Math.max(rect1.top, rect2.top);
        var bottom = Math.min(rect1.bottom, rect2.bottom);
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
        isRectCross: isRectCross,
        isRectNotCross: isRectNotCross,
        getRectCross: getRectCross
      }
    })();

    return util;
  }
)());

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__binder__ = __webpack_require__(5);
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

      InnerManager.prototype.addAnimationBinder = function (node, animation, fn, target, loop) {
        this._aniBinders.push(new __WEBPACK_IMPORTED_MODULE_2__binder__["a" /* default */]({
          node: node,
          animation: animation,
          fn: fn,
          target: target,
          loop: loop
        }));
      }

      InnerManager.prototype.removeAnimationBinderByNode = function (node) {
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

      InnerManager.prototype.removeAnimationBinderByNodeAndAnimation = function (node, animation) {
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_animation__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__binder__ = __webpack_require__(5);
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_animation__ = __webpack_require__(4);
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_animation__ = __webpack_require__(4);
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
/* 17 */
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
            this.addObserver('render', renderBackgroundAndBorder, this, this, __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].getMinInteger());
          }
          if (ctx.render === null) {
            ctx.render = new __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__["a" /* default */]({canvas: doc.createElement('canvas'), width: rect.width, height: rect.height})
          }
        }
      }

      function syncBackgroundBorderRenderInvalid() {
        this._backgroundBorderCacheCtx.renderInvalid = true;
      }
      
      function renderBackgroundAndBorder(sender, render, dirtyZones) {
        var ctx = this._backgroundBorderCacheCtx;
        if (ctx.renderInvalid && ctx.render !== null) {
          renderBackgroundAndBorderCache.call(this, ctx.render);
          ctx.renderInvalid = false;
        }
        for (var i = 0, len = dirtyZones.length; i < len; ++i) {
          var dirtyZone = dirtyZones[i];
          render.drawImageExt(ctx.render.getCanvas(),
            dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height,
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
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_animation_scheduler_animation__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_animation_property_animation__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_animation_queue_animation__ = __webpack_require__(14);
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_node__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gtexture__ = __webpack_require__(21);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */




/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      function syncImg (sender, newVal, oldVal) {
        this._texture.img = newVal;
      }

      return {
        syncImg: syncImg
      }
    })();

    var GNode = (function () {
      var InnerGNode = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGNode.prototype.defLayer = 1;
      InnerGNode.prototype.defAnchorX = 0.5;
      InnerGNode.prototype.defAnchorY = 0.5;
      InnerGNode.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('img', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.img, null));

        this._texture = new __WEBPACK_IMPORTED_MODULE_2__gtexture__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.texture, {}));
        this.addChildNodeToLayer(this._texture, 0);

        functions.syncImg.call(this, this, this.img, null)

        this.addObserver('imgChanged', functions.syncImg, this, this);
      }

      InnerGNode.prototype.getTexture = function (conf) {
        return this._texture;
      }

      return InnerGNode;
    })();

    return GNode;
  }
)());

/***/ }),
/* 21 */
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
      function syncImg () {
        this.removeObserver('render', renderImg, this, this);
        this.removeObserver('render', renderImgClip, this, this);
        if (this.img !== null && this.img !== '') {
          if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isString(this.img)) {
            this._img.url = this.img;
            this._img.image = null;
            this._img.progress = 0;
            this.addObserver('render', renderImg, this, this);
          } else {
            this._img.url = this.img.url;
            this._img.image = null;
            this._img.progress = 0;
            this.addObserver('render', renderImgClip, this, this);
          }
        }
      }
      function syncImgRender (image) {
        if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isString(this.img)) {
          this.width = image.width;
          this.height = image.height;
          this._img.image = image;
        } else {
          this.width = this.img.width;
          this.height = this.img.height;
          this._img.image = image;
          this._img.x = this.img.x;
          this._img.y = this.img.y;
          this._img.width = this.img.width;
          this._img.height = this.img.height;
        }
        this.refresh();
      }
      function renderImg (sender, render) {
        var img = this._img;
        if (!img.image) {
          loadImage.call(this, img.url);
        } else {
          var rect = this.getRectInLocal();
          render.drawImage(img.image, rect.left, rect.top);
        }
      }
      function renderImgClip (sender, render) {
        var img = this._img;
        if (!img.image) {
          loadImage.call(this, img.url);
        } else {
          var rect = this.getRectInLocal();
          render.drawImageExt(img.image, img.x, img.y, img.width, img.height, rect.left, rect.top, img.width, img.height);
        }
      }
      function loadImage (url) {
        var fileLoader = this.findApplication().getFileLoader();
        var image = fileLoader.loadImageAsync(url);
        if (image !== null) {
          syncImgRender.call(this, image);
        } else {
          if (this._img.progress === 0) {
            fileLoader.loadImageAsync(url, loadImageFinished, this);
            this._img.progress = 1;
          }
        }
      }
      function loadImageFinished (url, success) {
        if (success) {
          var image = this.findApplication().getFileLoader().loadImageAsync(url);
          if (image !== null) {
            syncImgRender.call(this, image);
            this._img.progress = 2;
          } else {
            this._img.progress = 3;
          }
        } else {
          this._img.progress = 3;
        }
      }

      return {
        syncImg: syncImg
      }
    })();

    var GTexture = (function () {
      var InnerGTexture = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGTexture.prototype.defImg = null;
      InnerGTexture.prototype.defAnchorX = 0.5;
      InnerGTexture.prototype.defAnchorY = 0.5;
      InnerGTexture.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('img', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.img, this.defImg));

        this._img = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          url: null,
          image: null,
          progress: 0
        };

        functions.syncImg.call(this);

        this.addObserver('imgChanged', functions.syncImg, this, this);
      }

      return InnerGTexture;
    })();

    return GTexture;
  }
)());

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_core_application__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_core_node__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_core_notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_core_io_file_loader__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_core_animation_manager__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_core_animation_binder__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_core_animation_base_animation__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_core_animation_queue_animation__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_core_animation_scheduler_animation__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_core_animation_property_animation__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_core_render_canvas_canvas_render__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_core_render_webgl_webgl_render__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_ui_uiview__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_ui_uilabel__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_game_gscene__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_game_gmap__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_game_gimagemap__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_game_gtiledmap__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__src_game_gmodel__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__src_game_gnode__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__src_game_gtexture__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__src_game_gutil__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__src_utils_event_util__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__src_utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__src_utils_matrix_util__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__src_utils_platform_util__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__src_utils_text_util__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__src_utils_timer_util__ = __webpack_require__(7);




































/* harmony default export */ __webpack_exports__["default"] = ((
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
        View: __WEBPACK_IMPORTED_MODULE_12__src_ui_uiview__["a" /* default */],
        Label: __WEBPACK_IMPORTED_MODULE_13__src_ui_uilabel__["a" /* default */]
      },

      game: {
        Scene: __WEBPACK_IMPORTED_MODULE_14__src_game_gscene__["a" /* default */],
        Map: __WEBPACK_IMPORTED_MODULE_15__src_game_gmap__["a" /* default */],
        ImageMap: __WEBPACK_IMPORTED_MODULE_16__src_game_gimagemap__["a" /* default */],
        TiledMap: __WEBPACK_IMPORTED_MODULE_17__src_game_gtiledmap__["a" /* default */],
        Model: __WEBPACK_IMPORTED_MODULE_18__src_game_gmodel__["a" /* default */],
        Node: __WEBPACK_IMPORTED_MODULE_19__src_game_gnode__["a" /* default */],
        Texture: __WEBPACK_IMPORTED_MODULE_20__src_game_gtexture__["a" /* default */],
        Util: __WEBPACK_IMPORTED_MODULE_21__src_game_gutil__["a" /* default */]
      },

      utils: {
        EventUtil: __WEBPACK_IMPORTED_MODULE_22__src_utils_event_util__["a" /* default */],
        LangUtil: __WEBPACK_IMPORTED_MODULE_23__src_utils_lang_util__["a" /* default */],
        MatrixUtil: __WEBPACK_IMPORTED_MODULE_24__src_utils_matrix_util__["a" /* default */],
        PlatformUtil: __WEBPACK_IMPORTED_MODULE_25__src_utils_platform_util__["a" /* default */],
        TextUtil: __WEBPACK_IMPORTED_MODULE_26__src_utils_text_util__["a" /* default */],
        TimerUtil: __WEBPACK_IMPORTED_MODULE_27__src_utils_timer_util__["a" /* default */]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_geometry_util__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__render_canvas_canvas_render__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__animation_manager__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__io_file_loader__ = __webpack_require__(12);
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
      function eventInit () {
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
      function checkRenderSize () {
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
          renderZone.right = width;
          renderZone.bottom = height;
          renderZone.width = width;
          renderZone.height = height;
          transformCtx.needUpdate = false;
          this._scaleX = width / clientWidth;
          this._scaleY = height / clientHeight;
          this.refresh();
        }
      }
      function syncTransform () {
        this._transformCtx.needUpdate = true;
      }
      function syncNodesDirtyZoneCtx () {
        if (this._root) {
          if (this.enableDirtyZone) {
            this._root._enableDirtyZone(true);
          } else {
            this._root._disableDirtyZone(true);
          }
        }
      }

      return {
        eventInit: eventInit,
        syncTransform: syncTransform,
        checkRenderSize: checkRenderSize,
        syncNodesDirtyZoneCtx: syncNodesDirtyZoneCtx
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
      InnerApplication.prototype.defEnableDirtyZone = false;
      InnerApplication.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('scaleMode', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.scaleMode, this.defScaleMode));
        this.defineNotifyProperty('enableDirtyZone', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.enableDirtyZone, this.defEnableDirtyZone));

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
        this._animationManager = new __WEBPACK_IMPORTED_MODULE_7__animation_manager__["a" /* default */]({});
        this._fileLoader = new __WEBPACK_IMPORTED_MODULE_8__io_file_loader__["a" /* default */]({});

        this._clientWidth = this._render.clientWidth;
        this._clientHeight = this._render.clientHeight;
        this._scaleX = 1;
        this._scaleY = 1;
        this._transformCtx = {
          needUpdate: true,
          transform: [1, 0, 0, 0, 1, 0]
        };

        functions.eventInit.call(this);
        functions.syncTransform.call(this);
        functions.syncNodesDirtyZoneCtx.call(this);

        this.addObserver('scaleModeChanged', functions.syncTransform, this, this);
        this.addObserver('enableDirtyZoneChanged', functions.syncNodesDirtyZoneCtx, this, this);
      }

      InnerApplication.prototype.getAnimationManager = function () {
        return this._animationManager;
      }

      InnerApplication.prototype.getFileLoader = function () {
        return this._fileLoader;
      }

      InnerApplication.prototype.receiveDirtyZone = function (node, dirtyZone) {
        var renderZone = this._renderZone;
        if (__WEBPACK_IMPORTED_MODULE_4__utils_geometry_util__["a" /* default */].isRectNotCross(renderZone, dirtyZone)) {
          return false;
        }
        dirtyZone.left = Math.max(renderZone.left, dirtyZone.left);
        dirtyZone.right = Math.min(renderZone.right, dirtyZone.right);
        dirtyZone.top = Math.max(renderZone.top, dirtyZone.top);
        dirtyZone.bottom = Math.min(renderZone.top, dirtyZone.bottom);
        dirtyZone.width = dirtyZone.right - dirtyZone.left;
        dirtyZone.height = dirtyZone.bottom - dirtyZone.top;
        var dirtyZones = this._dirtyZones;
        while (true) {
          var insert = true;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var zone = dirtyZones[i];
            if (__WEBPACK_IMPORTED_MODULE_4__utils_geometry_util__["a" /* default */].isRectNotCross(zone, dirtyZone)) {
              continue;
            }
            dirtyZone.left = Math.min(zone.left, left);
            dirtyZone.right = Math.max(zone.right, right);
            dirtyZone.top = Math.min(zone.top, top);
            dirtyZone.bottom = Math.max(zone.top, top);
            dirtyZone.width = right - left;
            dirtyZone.height = bottom - top;
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
        if (this._prevLoopTime != 0) {
          deltaTime = now - this._prevLoopTime;
          this._prevLoopTime = now;
          this._animationManager.run(deltaTime);
        } else {
          this._prevLoopTime = now;
        }
        // 每半秒钟检测是否需要变换
        if (this._preCheckTime > 500) {
          this._preCheckTime = 0;
          functions.checkRenderSize.call(this);
        } else {
          this._preCheckTime += deltaTime;
        }
        if (this._refresh) {
          var renderZone = this._renderZone;
          var dirtyZones = this._dirtyZones;
          var root = this._root;
          var render = this._render;
          var transformCtx = this._transformCtx;
          this._refresh = false;
          // 同步最新的结点转换
          root._syncTransform(transformCtx.transform, transformCtx.transform, renderZone, transformCtx.needUpdate);
          // 重新计算脏矩形
          if (this.enableDirtyZone) {
            // 重复检测受影响区域
            while (root._reportCurDirtyZone(this, dirtyZones)) { }
          } else {
            // 画布区域加上
            dirtyZones.push(renderZone);
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
        }
      }

      InnerApplication.prototype.run = function () {
        if (this._timerTaskId === 0) {
          if (this._root !== null) {
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
        if (this._animationManager) {
          this._animationManager.destroy();
          this._animationManager = null;
        }
        if (this._fileLoader) {
          this._fileLoader.destroy();
          this._fileLoader = null;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_text_util__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uiview__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_render_canvas_canvas_render__ = __webpack_require__(3);
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
        if (this.text !== null && this.text.length > 0) {
          if (this.getObserverByAllParams('render', renderLabelText, this, this) === null) {
            this.addObserver('render', renderLabelText, this, this);
          }
        } else {
          this.removeObserver('render', renderLabelText, this, this);
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
        var left = rect.left;
        var top = rect.top;
        var width = rect.width;
        var height = rect.height;

        var cacheRender = renderCache.render;
        var cacheWidth = cacheRender.width;
        var cacheHeight = cacheRender.height;

        var contentWidth = width - this.borderWidth * 2;
        var contentHeight = height - this.borderWidth * 2;

        if (contentWidth > 0 && contentHeight > 0) {
          var desX, desY;
          if (this.textHorAlign > 0) {
            desX = contentWidth - src
          } else if (this.textHorAlign < 0) {

          } else {

          }
          if (this.textVerAlign > 0) {

          } else if (this.textVerAlign < 0) {

          } else {

          }
        }











        var rect = this.getRectInLocal();
        var left = rect.left;
        var top = rect.top;
        var width = rect.width;
        var height = rect.height;

        var cacheRender = renderCache.render;
        var cacheWidth = cacheRender.width;
        var cacheHeight = cacheRender.height;

        var srcWidth, srcHeight;
        var desX = left + this.borderWidth;
        var desY = top + this.borderWidth;
        var textRenderWidth = width - this.borderWidth * 2;
        var textRenderHeight = height - this.borderWidth * 2;

        if (width > 0 && height > 0) {
          srcWidth = (cacheWidth < textRenderWidth) ? cacheWidth : textRenderWidth;
          srcHeight = (cacheHeight < textRenderHeight) ? cacheHeight : textRenderHeight;
          if (this.textHorAlign > 0) {
            desX += textRenderWidth - srcWidth;
          } else if (this.textHorAlign === 0) {
            desX += Math.ceil((textRenderWidth - srcWidth) / 2);
          }
          if (this.textVerAlign > 0) {
            desY += textRenderHeight - srcHeight;
          } else if (this.textVerAlign === 0) {
            desY += Math.ceil((textRenderHeight - srcHeight) / 2);
          }
          render.drawImageExt(cacheRender.getCanvas(), 0, 0, srcWidth, srcHeight, desX, desY, srcWidth, srcHeight);
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
        render.width = (lineNum === 1) ? layoutInfo.width : (rect.width - 2 * this.borderWidth);
        render.height = lineHeight * lineNum + 1;
        render.clear();
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
      var InnerUILabel = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_2__uiview__["a" /* default */]);

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
        this.defineNotifyProperty('textRichInfo', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.textRichInfo, null));

        this._textCacheCtx = {
          fontInvalid: true,
          font: '',
          layoutInvalid: true,
          layout: null,
          renderInvalid: true,
          render: new __WEBPACK_IMPORTED_MODULE_3__core_render_canvas_canvas_render__["a" /* default */]({canvas:doc.createElement('canvas')})
        };

        functions.syncFont.call(this);
        functions.syncLabelText.call(this);

        this.addObserver('textChanged', this.refresh, this, this);
        this.addObserver('fontSizeChanged', this.refresh, this, this);
        this.addObserver('fontFamilyChanged', this.refresh, this, this);
        this.addObserver('textColor', this.refresh, this, this);
        this.addObserver('textHorAlignChanged', this.refresh, this, this);
        this.addObserver('textVerAlignChanged', this.refresh, this, this);
        this.addObserver('textLineHeightChanged', this.refresh, this, this);
        this.addObserver('textLineNumChanged', this.refresh, this, this);
        this.addObserver('textRichInfo', this.refresh, this, this);

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
        this.addObserver('textRichInfoChanged', functions.syncTextRenderInvalid, this, this);
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
    var functions = (function () {
      function syncMap (sender, newVal, oldVal) {
        if (oldVal) {
          this.removeChildNode(oldVal, true);
        }
        var map = this.map;
        if (map) {
          this.addChildNodeToLayer(map, 0);
          if (map.getObserverByAllParams('xChanged', syncContainerZone, this, map) === null) {
            map.addObserver('xChanged', syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('yChanged', syncContainerZone, this, map) === null) {
            map.addObserver('yChanged', syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('rotateZChanged', syncContainerZone, this, map) === null) {
            map.addObserver('rotateZChanged', syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('scaleXChanged', syncContainerZone, this, map) === null) {
            map.addObserver('scaleXChanged', syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('scaleYChanged', syncContainerZone, this, map) === null) {
            map.addObserver('scaleYChanged', syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('inclineX', syncContainerZone, this, map) === null) {
            map.addObserver('inclineX', syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('inclineY', syncContainerZone, this, map) === null) {
            map.addObserver('inclineY', syncContainerZone, this, map);
          }
          if (map.getObserverByAllParams('frame', syncContainerZoneListener, this, map) === null) {
            map.addObserver('frame', syncContainerZoneListener, this, map);
          }
          this._needUpdateMapContainerZone = true;
        }
      }
      function syncContainerZone (sender) {
        this._needUpdateMapContainerZone = true;
      }
      function syncContainerZoneListener () {
        if (this._needUpdateMapContainerZone) {
          var map = this.map;
          if (map) {
            var rect = this.getRectInLocal();
            var leftTop = map.transformPVectorToL([rect.left, rect.top]);
            var leftBottom = map.transformPVectorToL([rect.left, rect.bottom]);
            var rightTop = map.transformPVectorToL([rect.right, rect.top]);
            var rightBottom = map.transformPVectorToL([rect.right, rect.bottom]);
            map.containerLeft = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
            map.containerRight = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
            map.containerTop = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);
            map.containerBottom = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);
            this._needUpdateMapContainerZone = false;
          }
        }
      }

      return {
        syncMap: syncMap,
        syncContainerZone: syncContainerZone
      }
    })();

    var GScene = (function () {
      var InnerGScene = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__core_node__["a" /* default */]);

      InnerGScene.prototype.defLayer = 1;
      InnerGScene.prototype.defAnchorX = 0;
      InnerGScene.prototype.defAnchorY = 0;
      InnerGScene.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.defineNotifyProperty('map', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.map, null));
        this.defineNotifyProperty('contentOffsetX', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.contentOffsetX, 0));
        this.defineNotifyProperty('contentOffsetY', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.contentOffsetY, 0));

        this._needUpdateMapContainerZone = true;

        functions.syncMap.call(this);

        this.addObserver('mapChanged', functions.syncMap, this, this);

        this.addObserver('widthChanged', functions.syncContainerZone, this, this);
        this.addObserver('heightChanged', functions.syncContainerZone, this, this);
        this.addObserver('anchorXChanged', functions.syncContainerZone, this, this);
        this.addObserver('anchorYChanged', functions.syncContainerZone, this, this);
      }

      InnerGScene.prototype.destroy = function () {
        this.map = null;
        this.super('destroy');
      }

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gmap__ = __webpack_require__(6);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */



/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      function syncImg () {
        if (this.img !== null && this.img !== '') {
          var img = this._img;
          img.url = this.img;
          img.needAdjustMapSize = true;
          if (this.getObserverByAllParams('render', renderImg, this, this) === null) {
            this.addObserver('render', renderImg, this, this);
          }
        } else {
          this.removeObserver('render', renderImg, this, this);
        }
        this.render();
      }
      function renderImg (sender, render) {
        var img = this._img;
        var image = this.findApplication().getFileLoader().loadImageAsync(
          img.url,
          imageLoadFinished,
          this
        );
        if (image !== null) {
          if (img.needAdjustMapSize) {
            this.width = image.width;
            this.height = image.height;
            img.needAdjustMapSize = false;
          }
          var rect = this.getRectInLocal();
          var left = rect.left < this.containerLeft ? this.containerLeft : rect.left;
          var top = rect.top < this.containerTop ? this.containerTop : rect.top;
          var width = (rect.right < this.containerRight ? rect.right : this.containerRight) - left;
          var height = (rect.bottom < this.containerBottom ? rect.bottom : this.containerBottom) - top;
          render.drawImageExt(image, left, top, width, height, left, top, width, height);
        }
      }
      function imageLoadFinished (url, success) {
        this.refresh();
      }
      
      return {
        syncImg: syncImg
      }
    })();

    var GImageMap = (function () {
      var InnerGImageMap = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__gmap__["a" /* default */]);

      InnerGImageMap.prototype.defImg = null;
      InnerGImageMap.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.defineNotifyProperty('img', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.img, this.defImg));

        this._img = {
          needAdjustMapSize: true,
          url: null,
          width: 0,
          height: 0
        };

        functions.syncImg.call(this);

        this.addObserver('imgChanged', functions.syncImg, this, this);
      }

      return InnerGImageMap
    })();

    return GImageMap;
  }
)());

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gmap__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__ = __webpack_require__(3);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */




/* harmony default export */ __webpack_exports__["a"] = ((
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

      function syncVertex () {
        this._renderContext.vertexInvalid = true;
      }

      function syncSize () {
        this._renderContext.sizeInvalid = true;
      }

      function syncCache () {
        this._renderContext.cacheInvalid = false;
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
          if (width > 0 && height > 0) {
            render.drawImageExt(renderContext.cacheFore.getCanvas(), x, y, width, height,
              this.containerLeft, this.containerTop, width, height);
          }
        } else {
          var x = this.containerLeft - renderContext.x;
          var y = this.containerTop - renderContext.y;
          var width = this.containerRight - this.containerLeft;
          var height = this.containerBottom - this.containerTop;
          if (width > 0 && height > 0) {
            render.drawImageExt(renderContext.cacheFore.getCanvas(), x, y, width, height,
              this.containerLeft, this.containerTop, width, height);
          }
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

        if (renderContext.vertexInvalid) {
          newX = Math.floor(this.containerLeft / tileWidth) * tileWidth;
          newY = Math.floor(this.containerTop / tileHeight) * tileHeight;
          renderContext.x = newX;
          renderContext.y = newY;
          renderContext.vertexInvalid = false;
        }

        if (renderContext.sizeInvalid) {
          newWidth = Math.ceil(this.containerRight / tileWidth)  * tileWidth - newX;
          newHeight = Math.ceil(this.containerBottom / tileHeight) * tileHeight - newY;
          renderContext.width = newWidth;
          renderContext.height = newHeight;
          renderContext.sizeInvalid = false;
        }
        var tileData = this.tileData;
        if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isNotArray(tileData)) {
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
              if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isArray(tileRow)) {
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
            if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isArray(tileRow)) {
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
        if (renderContext.vertexInvalid) {
          newX = (sCol - sRow - 1) * tileStepWidth;
          newY = (sCol + sRow) * tileStepHeight;
          renderContext.x = newX;
          renderContext.y = newY;
          renderContext.vertexInvalid = false;
        }
        if (renderContext.sizeInvalid) {
          newWidth = (eCol - eRow + 1) * tileStepWidth - newX;
          newHeight = (eCol + eRow + 2) * tileStepHeight - newY;
          renderContext.width = newWidth;
          renderContext.height = newHeight;
          renderContext.sizeInvalid = false;
        }
        var tileData = this.tileData;
        if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isNotArray(tileData)) {
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
              // 往上面绘制
              for (var row = sRow, startCol = sCol - 1, startTileX = -tileStepWidth, startTileY = -tileStepHeight;
                   startTileX < newWidth;
                   row -= 1, startCol += 1, startTileX += tileWidth) {
                if (row >= 0 && row < tileDataLen) {
                  var tileRow = tileData[row];
                  if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isArray(tileRow)) {
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
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                                tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                            } else if (tileY === edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
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
                              tileX + tileStepWidth, tileY, tileStepWidth, tileHeight);
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
              for (var row = sRow + 1, startCol = sCol, startTileX = -tileStepWidth, startTileY = tileStepHeight;
                   startTileY < newHeight;
                   row += 1, startCol += 1, startTileY += tileHeight) {
                if (row >= 0 && row < tileDataLen) {
                  var tileRow = tileData[row];
                  if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isArray(tileRow)) {
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
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                                tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                            } else if (tileY === edgeBottom) {
                              renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
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
                              tileX + tileStepWidth, tileY, tileStepWidth, tileHeight);
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
            cacheBack.clear();
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
            renderContext.cacheInit = true;
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
              if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isArray(tileRow)) {
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
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                          tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                      } else if (tileY === edgeBottom) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
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
            if (row >= 0 && row < tileDataLen) {
              var tileRow = tileData[row];
              if (__WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].isArray(tileRow)) {
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
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_BOTTOM_LEFT,
                          tileX, tileY + tileStepHeight, tileStepWidth, tileStepHeight);
                      } else if (tileY === edgeBottom) {
                        renderMapBlock.call(this, cacheFore, fileLoader, tileImg, tileImgClip, tileCell, BLOCK_TOP_LEFT,
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
        syncVertex: syncVertex,
        syncSize: syncSize,
        syncCache: syncCache,
        renderMap: renderMap
      }
    })();

    var GTiledMap = (function () {
      var InnerGTiledMap = __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].extend(__WEBPACK_IMPORTED_MODULE_1__gmap__["a" /* default */]);

      InnerGTiledMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('tileType', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.tileType, 1));
        this.defineNotifyProperty('tileWidth', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.tileWidth, 50));
        this.defineNotifyProperty('tileHeight', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.tileHeight, 50));
        this.defineNotifyProperty('tileImg', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.tileImg, {}));
        this.defineNotifyProperty('tileImgClip', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.tileImgClip, {}));
        this.defineNotifyProperty('tileData', __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__["a" /* default */].checkAndGet(conf.tileData, {}));

        this._renderContext = {
          vertexInvalid: true,
          x: 0,
          y: 0,
          sizeInvalid: true,
          width: 0,
          height: 0,
          cacheInit: false,
          cacheInvalid: true,
          cacheFore: new __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__["a" /* default */]({canvas: doc.createElement('canvas')}),
          cacheBack: new __WEBPACK_IMPORTED_MODULE_2__core_render_canvas_canvas_render__["a" /* default */]({canvas: doc.createElement('canvas')})
        }

        this.addObserver('tileTypeChanged', functions.syncVertex, this, this);
        this.addObserver('tileWidthChanged', functions.syncVertex, this, this);
        this.addObserver('tileHeightChanged', functions.syncVertex, this, this);
        this.addObserver('containerTopChanged', functions.syncVertex, this, this);
        this.addObserver('containerLeftChanged', functions.syncVertex, this, this);

        this.addObserver('tileWidthChanged', functions.syncSize, this, this);
        this.addObserver('tileHeightChanged', functions.syncSize, this, this);
        this.addObserver('containerTopChanged', functions.syncSize, this, this);
        this.addObserver('containerBottomChanged', functions.syncSize, this, this);
        this.addObserver('containerLeftChanged', functions.syncSize, this, this);
        this.addObserver('containerRightChanged', functions.syncSize, this, this);

        this.addObserver('tileTypeChanged', functions.syncCache, this, this);
        this.addObserver('tileWidthChanged', functions.syncCache, this, this);
        this.addObserver('tileHeightChanged', functions.syncCache, this, this);
        this.addObserver('containerTopChanged', functions.syncCache, this, this);
        this.addObserver('containerBottomChanged', functions.syncCache, this, this);
        this.addObserver('containerLeftChanged', functions.syncCache, this, this);
        this.addObserver('containerRightChanged', functions.syncCache, this, this);

        this.addObserver('render', functions.renderMap, this, this);
      }

      InnerGTiledMap.prototype.invalidAndRefresh = function () {
        this._renderContext.init = false;
        this._renderContext.Invalid = true;
        this.refresh();
      }

      return InnerGTiledMap;
    })();

    return GTiledMap;
  }
)());


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_lang_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_notifier__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gutil__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__gnode__ = __webpack_require__(20);
/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/15
 */





/* harmony default export */ __webpack_exports__["a"] = ((
  function () {
    var functions = (function () {
      function createNode (conf) {
        var node = new __WEBPACK_IMPORTED_MODULE_3__gnode__["a" /* default */](conf.node);
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
                  var animation = __WEBPACK_IMPORTED_MODULE_2__gutil__["a" /* default */].compileModelFrames(node, nodeFrames, node === this._node);
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
        compileActions: compileActions,
        runActionProgress: runActionProgress
      }
    })();

    /**
     * var exampleConf = {
     *   id: '模型id',
     *   name: '模型名称',
     *   root: {
     *     id: '',
     *     name: '',
     *     node: {
     *       x: '',
     *       y: '' ...
     *     },
     *     ctrl: {
     *       height: ''
     *     },
     *     children: [
     *       {
     *         node: {},
     *         info: {},
     *         ctrl: {},
     *         children: []
     *       }
     *     ]
     *   },
     *   actions: [
     *     {
     *       id: '',
     *       name: '',
     *       frames: {
     *
     *       }
     *     }
     *   ]
     * }
     */
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
            var animation = __WEBPACK_IMPORTED_MODULE_2__gutil__["a" /* default */].compileModelFrames(node, nodeActFrames, node === this._node);
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


/***/ })
/******/ ]);