/**
 * the core class for app
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

import LangUtil from '../utils/lang-util';
import TimerUtil from '../utils/timer-util';
import EventUtil from '../utils/event-util';
import PlatformUtil from '../utils/platform-util';
import Notifier from './notifier';
import CanvasRender from './render/canvas/canvas-render';
import AnimationManager from './animation/manager';
import FileLoader from './io/file-loader';

export default (
  function () {
    var win = window;
    var docEle = document.documentElement;

    var functions = (function () {
      function eventInit () {
        var canvas = this._render.getCanvas();
        var doc = document;
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
      function eventPreProcessDesktop (e) {
        var eArg = this._events[0];
        var canvasViewOffset = this._render.getCanvas().getBoundingClientRect();
        var offsetX = e.pageX - (canvasViewOffset.left - win.pageXOffset - docEle.clientLeft);
        var offsetY = e.pageY - (canvasViewOffset.top - win.pageYOffset - docEle.clientTop);
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
        var offsetX = e.pageX - (canvasViewOffset.left - win.pageXOffset - docEle.clientLeft);
        var offsetY = e.pageY - (canvasViewOffset.top - win.pageYOffset - docEle.clientTop);
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
        var root = this.root;
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
        var root = this.root;
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
        var root = this.root;
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
        var root = this.root;
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
        this.root._dispatchMouseTouchEvent('click', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
      function eventDblClickCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('dblclick', this, [eArg]);
        this.root._dispatchMouseTouchEvent('dblclick', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
      function eventContextMenuCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('contextmenu', this, [eArg]);
        this.root._dispatchMouseTouchEvent('contextmenu', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
      function eventMouseDownCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mousedown', this, [eArg]);
        this.root._dispatchMouseTouchEvent('mousedown', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
      function eventMouseMoveCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mousemove', this, [eArg]);
        this.root._dispatchMouseTouchEvent('mousemove', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
      function eventMouseUpCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mouseup', this, [eArg]);
        this.root._dispatchMouseTouchEvent('mouseup', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
      function eventMouseWheelCanvas (e) {
        var eArg = eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('wheel', this, [eArg]);
        this.root._dispatchMouseTouchEvent('wheel', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
      function checkRenderSize () {
        var render = this._render;
        if (this._needUpdateTranform) {
          var width = render.width, height = render.height;
          var clientWidth = render.clientWidth, clientHeight = render.clientHeight;
          switch (this.scaleMode) {
            case 1: {
              render.height = width * clientHeight / clientWidth;
              this.postNotification('resize', this, [width, height]);
              break;
            }
            case 2: {
              render.width = height * clientWidth / clientHeight;
              this.postNotification('resize', this, [width, height]);
              break;
            }
            case 3: {
              break;
            }
            default: {
              render.width = clientWidth;
              render.height = clientHeight;
              this.postNotification('resize', this, [width, height]);
              break;
            }
          }
          this._renderCache.width = render.width
          this._renderCache.height = render.height
          this._transform[0] = width / clientWidth;
          this._transform[4] = height / clientHeight;
          this._needUpdateTranform = false;
          this.refresh();
        } else {
          if (render.clientWidth !== this._clientWidth || render.clientHeight !== this._clientHeight) {
            this._clientWidth = render.clientWidth;
            this._clientHeight = render.clientHeight;
            this._needUpdateTranform = true;
          }
        }
      }
      function syncTransform () {
        this._needUpdateTranform = true;
      }

      return {
        eventInit: eventInit,
        syncTransform: syncTransform,
        checkRenderSize: checkRenderSize
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
      var InnerApplication = LangUtil.extend(Notifier);

      InnerApplication.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('root', LangUtil.checkAndGet(conf.root, null));
        this.defineNotifyProperty('scaleMode', LangUtil.checkAndGet(conf.scaleMode, 0));
        this.root.application = this;
        this._render = new CanvasRender({canvas: conf.canvas, width: LangUtil.checkAndGet(conf.width, undefined), height: LangUtil.checkAndGet(conf.height, undefined)});
        this._renderCache = new CanvasRender({canvas: document.createElement('canvas')});

        this._prevLoopTime = 0;
        this._preCheckTime = 0;
        this._refresh = true;
        this._timerTaskId = 0;
        this._events = [];
        this._animationManager = new AnimationManager({});
        this._fileLoader = new FileLoader({});

        this._clientWidth = this._render.clientWidth;
        this._clientHeight = this._render.clientHeight;
        this._needUpdateTranform = true;
        this._transform = [1, 0, 0, 0, 1, 0];

        functions.eventInit.call(this);
        functions.syncTransform.call(this);

        this.addObserver('scaleModeChanged', functions.syncTransform, this, this);
      }

      InnerApplication.prototype.getAnimationManager = function () {
        return this._animationManager;
      }

      InnerApplication.prototype.getFileLoader = function () {
        return this._fileLoader;
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
          this._refresh = false;
          this._renderCache.setTransform(1, 0, 0, 1, 0, 0);
          this._renderCache.clear()
          this.root._dispatchRender(this._renderCache, 1, this._transform, this._transform, this._needUpdateTranform);
          this._render.clear();
          this._render.drawImage(this._renderCache.getCanvas(), 0, 0);
        }
      }

      InnerApplication.prototype.run = function () {
        if (this._timerTaskId === 0) {
          if (this.root !== null) {
            this._timerTaskId = TimerUtil.addAnimationTask(this.loop, this);
            this.postNotification('resize', this, [this._render.width, this._render.height]);
          }
        }
      }

      InnerApplication.prototype.stop = function () {
        TimerUtil.removeAnimationTaskById(this._timerTaskId);
        this._timerTaskId = 0;
      }

      InnerApplication.prototype.destroy = function () {
        if (this.root) {
          this.root.destroy();
          this.root = null;
        }
        if (this._render) {
          this._render.destroy();
          this._render = null;
        }
        if (his._renderCache) {
          this._renderCache.destroy();
          this._renderCache = null;
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
)();
