/**
 * the core class for app
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

import EventUtil from '../utils/event-util';
import GeometryUtil from '../utils/geometry-util';
import LangUtil from '../utils/lang-util';
import PlatformUtil from '../utils/platform-util';
import TimerUtil from '../utils/timer-util';

import Notifier from './notifier';

import AnimationManager from './animation/manager';
import FileLoader from './io/file-loader';
import CanvasRender from './render/canvas/canvas-render';

export default (function () {
    var win = window;
    var doc = document;

    var functions = (function () {
      function eventPreProcessDesktop (e, fromCanvas) {
        var eArg = this._events[0];
        var canvasViewOffset = this._render.getCanvas().getBoundingClientRect();
        var offsetX = (e.pageX - (canvasViewOffset.left + win.pageXOffset)) * this._scaleX;
        var offsetY = (e.pageY - (canvasViewOffset.top + win.pageYOffset)) * this._scaleY;
        if (offsetX !== eArg.offsetX || offsetY !== eArg.offsetY || e.wheelDelta !== 0) {
          this.move = true;
        } else {
          this.move = false;
        }
        eArg.id = 1;
        eArg.event = e;
        eArg.target = null;
        eArg.fromCanvas = fromCanvas || eArg.fromCanvas;

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

      function eventPreProcessMobile (e, touch, fromCanvas) {
        var eArg = this._events[touch.identifier];
        if (!eArg) {
          eArg = new Event();
          this._events[touch.identifier] = eArg;
        }
        var canvasViewOffset = this._render.getCanvas().getBoundingClientRect();
        var offsetX = (e.pageX - (canvasViewOffset.left + win.pageXOffset)) * this._scaleX;
        var offsetY = (e.pageY - (canvasViewOffset.top + win.pageYOffset)) * this._scaleY;
        if (offsetX !== eArg.offsetX || offsetY !== eArg.offsetY || e.wheelDelta !== 0) {
          this.move = true;
        } else {
          this.move = false;
        }
        eArg.id = touch.identifier;
        eArg.event = e;
        eArg.touch = touch;
        eArg.target = null;
        eArg.fromCanvas = fromCanvas || eArg.fromCanvas;

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
          var eArg = eventPreProcessMobile.call(this, ee, touches[i], false);
          if (!eArg.fromCanvas) {
            this.postNotification('touchstart', [eArg]);
          }
          eArg.reset();
        }
      }

      function eventTouchMoveDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = eventPreProcessMobile(this, ee, touches[i], false);
          if (!eArg.fromCanvas) {
            this.postNotification('touchmove', [eArg]);
          }
          eArg.reset();
        }
      }

      function eventTouchEndDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = eventPreProcessMobile.call(this, ee, touches[i], false);
          if (!eArg.fromCanvas) {
            this.postNotification('touchend', [eArg]);
          }
          eArg.reset();
        }
      }

      function eventTouchCancelDoc (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = eventPreProcessMobile.call(this, ee, touches[i], false);
          if (!eArg.fromCanvas) {
            this.postNotification('touchcancel', [eArg]);
          }
          eArg.reset();
        }
      }

      function eventTouchStartCanvas (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        var root = this._root;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = eventPreProcessMobile.call(this, ee, touches[i], true);
          this.postNotification('touchstart', [eArg]);
          root._dispatchMouseTouchEvent('touchstart', eArg);
        }
      }

      function eventTouchMoveCanvas (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        var root = this._root;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = eventPreProcessMobile.call(this, ee, touches[i], true);
          if (eArg.move) {
            this.postNotification('touchmove', [eArg]);
            root._dispatchMouseTouchEvent('touchmove', eArg);
          }
        }
      }

      function eventTouchEndCanvas (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        var root = this._root;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = eventPreProcessMobile.call(this, ee, touches[i], true);
          this.postNotification('touchend', [eArg]);
          root._dispatchMouseTouchEvent('touchend', eArg);
        }
      }

      function eventTouchCancelCanvas (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        var root = this._root;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = eventPreProcessMobile.call(this, ee, touches[i], true);
          this.postNotification('touchend', [eArg]);
          root._dispatchMouseTouchEvent('touchend', eArg);
        }
      }

      function eventKeyDownDoc (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, false);
        if (!eArg.fromCanvas) {
          this.postNotification('keydown', [eArg]);
        }
        eArg.reset();
      }

      function eventKeyPressDoc (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, false);
        if (!eArg.fromCanvas) {
          this.postNotification('keypress', [eArg]);
        }
        eArg.reset();
      }

      function eventKeyUpDoc (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, false);
        if (!eArg.fromCanvas) {
          this.postNotification('keyup', [eArg]);
        }
        eArg.reset();
      }

      function eventMouseDownDoc (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, false);
        if (!eArg.fromCanvas) {
          this.postNotification('mousedown', [eArg]);
        }
        eArg.reset();
      }

      function eventMouseMoveDoc (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, false);
        if (!eArg.fromCanvas) {
          this.postNotification('mousemove', [eArg]);
        }
        eArg.reset();
      }

      function eventMouseUpDoc (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, false);
        if (!eArg.fromCanvas) {
          this.postNotification('mouseup', [eArg]);
        }
        eArg.reset();
      }

      function eventClickCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, true);
        this.postNotification('click', [eArg]);
        this._root._dispatchMouseTouchEvent('click', eArg);
      }

      function eventDblClickCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, true);
        this.postNotification('dblclick', [eArg]);
        this._root._dispatchMouseTouchEvent('dblclick', eArg);
      }

      function eventContextMenuCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, true);
        this.postNotification('contextmenu', [eArg]);
        this._root._dispatchMouseTouchEvent('contextmenu', eArg);
        eArg.preventDefault();
      }

      function eventMouseDownCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, true);
        this.postNotification('mousedown', [eArg]);
        this._root._dispatchMouseTouchEvent('mousedown', eArg);
      }

      function eventMouseMoveCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, true);
        this.postNotification('mousemove', [eArg]);
        this._root._dispatchMouseTouchEvent('mousemove', eArg);
      }

      function eventMouseUpCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, true);
        this.postNotification('mouseup', [eArg]);
        this._root._dispatchMouseTouchEvent('mouseup', eArg);
      }

      function eventMouseWheelCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event, true);
        this.postNotification('wheel', [eArg]);
        this._root._dispatchMouseTouchEvent('wheel', eArg);
      }

      function initEvent () {
        var canvas = this._render.getCanvas();
        if (PlatformUtil.isMobile) {
          EventUtil.addEventListener(doc, 'touchstart', this, eventTouchStartDoc);
          EventUtil.addEventListener(doc, 'touchmove', this, eventTouchMoveDoc);
          EventUtil.addEventListener(doc, 'touchend', this, eventTouchEndDoc);
          EventUtil.addEventListener(doc, 'touchcancel', this, eventTouchCancelDoc);
          EventUtil.addEventListener(canvas, 'touchstart', this, eventTouchStartCanvas);
          EventUtil.addEventListener(canvas, 'touchmove', this, eventTouchMoveCanvas);
          EventUtil.addEventListener(canvas, 'touchend', this, eventTouchEndCanvas);
          EventUtil.addEventListener(canvas, 'touchcancel', this, eventTouchCancelCanvas);
        } else {
          this._events.push(new Event());
          EventUtil.addEventListener(doc, 'keydown', this, eventKeyDownDoc);
          EventUtil.addEventListener(doc, 'keypress', this, eventKeyPressDoc);
          EventUtil.addEventListener(doc, 'keyup', this, eventKeyUpDoc);
          EventUtil.addEventListener(doc, 'mousedown', this, eventMouseDownDoc);
          EventUtil.addEventListener(doc, 'mousemove', this, eventMouseMoveDoc);
          EventUtil.addEventListener(doc, 'mouseup', this, eventMouseUpDoc);
          EventUtil.addEventListener(canvas, 'click', this, eventClickCanvas);
          EventUtil.addEventListener(canvas, 'dblclick', this, eventDblClickCanvas);
          EventUtil.addEventListener(canvas, 'contextmenu', this, eventContextMenuCanvas);
          EventUtil.addEventListener(canvas, 'mousedown', this, eventMouseDownCanvas);
          EventUtil.addEventListener(canvas, 'mousemove', this, eventMouseMoveCanvas);
          EventUtil.addEventListener(canvas, 'mouseup', this, eventMouseUpCanvas);
          EventUtil.addEventListener(canvas, 'mousewheel', this, eventMouseWheelCanvas);
          EventUtil.addEventListener(canvas, 'wheel', this, eventMouseWheelCanvas);
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
        this.fromCanvas = true;

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

      InnerEvent.prototype.reset = function () {
        this.fromCanvas = false;
      }

      return InnerEvent;
    })();

    var Application = (function () {
      var InnerApplication = LangUtil.extend(Notifier);

      InnerApplication.prototype.defScaleMode = 0;
      InnerApplication.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.scaleMode = LangUtil.checkAndGet(conf.scaleMode, this.defScaleMode);

        this._root = LangUtil.checkAndGet(conf.root, null);
        this._root.application = this;

        this._render = new CanvasRender({canvas: conf.canvas, width: LangUtil.checkAndGet(conf.width, undefined), height: LangUtil.checkAndGet(conf.height, undefined)});
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
          manager: new AnimationManager({})
        };
        this._loaderCtx = {
          callbacks: {},
          loader: new FileLoader({})
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
        if (GeometryUtil.isZoneNotCross(renderZone, dirtyZone)) {
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
          for (var i = dirtyZones.length - 1; i >= 0; --i) {
            var zone = dirtyZones[i];
            if (GeometryUtil.isZoneCross(zone, dirtyZone)) {
              dirtyZone.left = Math.min(zone.left, dirtyZone.left);
              dirtyZone.right = Math.max(zone.right, dirtyZone.right);
              dirtyZone.top = Math.min(zone.top, dirtyZone.top);
              dirtyZone.bottom = Math.max(zone.bottom, dirtyZone.bottom);
              dirtyZone.width = dirtyZone.right - dirtyZone.left;
              dirtyZone.height = dirtyZone.bottom - dirtyZone.top;
              dirtyZones.splice(i, 1);
              insert = false;
            } 
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
        // DEBUG
        // dirtyCtx.dirty = true
        // dirtyCtx.zones.push({
        //   left: this._renderZone.left,
        //   top: this._renderZone.top,
        //   right: this._renderZone.right,
        //   bottom: this._renderZone.bottom,
        //   width: this._renderZone.width,
        //   height: this._renderZone.height
        // })
        // DEBUG
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
            this._timerTaskId = TimerUtil.addAnimationTask(this.loop, this);
            this.postNotification('resize', [this._render.width, this._render.height]);
          }
        }
      }

      InnerApplication.prototype.stop = function () {
        TimerUtil.removeAnimationTaskById(this._timerTaskId);
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
)();
