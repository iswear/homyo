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

    var Application = LangUtil.extend(Notifier);

    Application.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.defineNotifyProperty('scaleMode', LangUtil.checkAndGet(conf.scaleMode, 0));
      this.defineNotifyProperty('root', LangUtil.checkAndGet(conf.root, null));
      this._render = new CanvasRender({canvas: conf.canvas, width: LangUtil.checkAndGet(conf.width, undefined), height: LangUtil.checkAndGet(conf.height, undefined)});

      this._prevLoopTime = 0;
      this._refresh = true;
      this._timerTaskId = 0;
      this._events = [];
      this._animationManager = new AnimationManager({});
      this._fileLoader = new FileLoader({});

      this._clientWidth = this._render.clientWidth;
      this._clientHeight = this._render.clientHeight;
      this._needUpdateTranform = true;
      this._transform = [1, 0, 0, 0, 1, 0];

      event_init.call(this);
      sync_transform.call(this);

      this.addObserver('scaleModeChanged', sync_transform, this, this);
    }

    Application.prototype.getAnimationManager = function () {
      return this._animationManager;
    }

    Application.prototype.getFileLoader = function () {
      return this._fileLoader;
    }

    Application.prototype.refresh = function () {
      this._refresh = true;
    }

    Application.prototype.loop = function () {
      var now = (new Date()).getTime(), deltaTime = 0;
      if (this._prevLoopTime != 0) {
        deltaTime = now - this._prevLoopTime;
        this._prevLoopTime = now;
        this._animationManager.run(deltaTime);
      } else {
        this._prevLoopTime = now;
      }
      // 每半秒钟检测是否需要变换
      if (deltaTime > 500) {
        check_renderSize.call(this);
        if (this._needUpdateTranform) {
          var render = this._render;
          var width = render.width, height = render.height;
          var clientWidth = render.clientWidth, clientHeight = render.clientHeight;
          switch (this.scaleMode) {
            case 1: {
              render.height = width * this._clientHeight / this._clientWidth;
              this.postNotification('resize', this, [width, render.height]);
              break;
            }
            case 2: {
              render.width = height * this._clientWidth / this._clientHeight;
              this.postNotification('resize', this, [render.width, height]);
              break;
            }
            case 3: {
              break;
            }
            default: {
              render.width = clientWidth;
              render.height = clientHeight;
              this.postNotification('resize', this, [clientWidth, clientHeight]);
              break;
            }
          }
          this._transform[0] = render.width / render.clientWidth;
          this._transform[4] = render.height / render.clientHeight;
          this._needUpdateTranform = false;
        }
      }
      if (this._refresh) {
        this._render.clear();
        this._render.globalAlpha = 1;
        this.root._dispatchRender(this._render, 1, this._transform, this._transform, this._needUpdateTranform);
        this._refresh = false;
      }
    }

    Application.prototype.run = function (fn) {
      if (this._timerTaskId === 0) {
        if (this.root !== null) {
          var root = this.root;
          root.application = this;
          this._timerTaskId = TimerUtil.addAnimationTask(this.loop, this);
          if (fn) {
            fn.call(this);
          }
          this.postNotification('resize', this, [this._render.width, this._render.height]);
        }
      }
    }

    Application.prototype.stop = function () {
      TimerUtil.removeAnimationTaskById(this._timerTaskId);
      this._timerTaskId = 0;
    }

    function Event() {
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

    Event.prototype.stopPropagation = function () {
      this.event.stopPropagation();
    }

    Event.prototype.preventDefault = function () {
      this.event.preventDefault();
    }

    function event_init() {
      var canvas = this._render.getCanvas();
      var doc = document;
      if (PlatformUtil.isMobile()) {
        EventUtil.addEventListener(doc, 'touchstart', this, event_touchStartDoc);
        EventUtil.addEventListener(doc, 'touchmove', this, event_touchMoveDoc);
        EventUtil.addEventListener(doc, 'touchend', this, event_touchEndDoc);
        EventUtil.addEventListener(doc, 'touchcancel', this, event_touchCancelDoc);
        EventUtil.addEventListener(canvas, 'touchstart', this, event_touchStartCanvas);
        EventUtil.addEventListener(canvas, 'touchmove', this, event_touchMoveCanvas);
        EventUtil.addEventListener(canvas, 'touchend', this, event_touchEndCanvas);
        EventUtil.addEventListener(canvas, 'touchcancel', this, event_touchCancelCanvas);
      } else {
        this._events.push(new Event());
        EventUtil.addEventListener(doc, 'keydown', this, event_keyDownDoc);
        EventUtil.addEventListener(doc, 'keypress', this, event_keyPressDoc);
        EventUtil.addEventListener(doc, 'keyup', this, event_keyUpDoc);
        EventUtil.addEventListener(doc, 'mousedown', this, event_mouseDownDoc);
        EventUtil.addEventListener(doc, 'mousemove', this, event_mouseMoveDoc);
        EventUtil.addEventListener(doc, 'mouseup', this, event_mouseUpDoc);
        EventUtil.addEventListener(canvas, 'click', this, event_clickCanvas);
        EventUtil.addEventListener(canvas, 'dblclick', this, event_dblclickCanvas);
        EventUtil.addEventListener(canvas, 'contextmenu', this, event_contextMenuCanvas);
        EventUtil.addEventListener(canvas, 'mousedown', this, event_mouseDownCanvas);
        EventUtil.addEventListener(canvas, 'mousemove', this, event_mouseMoveCanvas);
        EventUtil.addEventListener(canvas, 'mouseup', this, event_mouseUpCanvas);
        EventUtil.addEventListener(canvas, 'mousewheel', this, event_mouseWheelCanvas);
        EventUtil.addEventListener(canvas, 'wheel', this, event_mouseWheelCanvas);
      }
    }

    var win = window;

    var docEle = document.documentElement;

    function event_prehander_desktop(e) {
      var eArg = this._events[0];
      var canvasViewOffset = this._render.getCanvas().getBoundingClientRect();
      var offsetX = e.pageX - (canvasViewOffset.left - win.pageXOffset - docEle.clientLeft);
      var offsetY = e.pageY - (canvasViewOffset.top - win.pageYOffset - docEle.clientTop);
      if (offsetX !== eArg.offsetX || offsetY !== eArg.offsetY || e.wheelDelta !== 0) {
        this.move = true;
      } else {
        this.move = false;
      }
      eArg.id = 0;
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

    function event_prehandler_mobile(e, touch) {
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
    
    function event_touchStartDoc(e) {
      var ee = e ? e : win.event;
      var touches = ee.changedTouches;
      for (var i = 0, len = touches.length; i < len; ++i) {
        this.postNotification('touchstart', this, [ event_prehandler_mobile.call(this, ee, touches[i]) ]);
      }
    }
    
    function event_touchMoveDoc(e) {
      var ee = e ? e : win.event;
      var touches = ee.changedTouches;
      for (var i = 0, len = touches.length; i < len; ++i) {
        var eArg = event_prehandler_mobile(this, ee, touches[i]);
        if (eArg.move) {
          this.postNotification('touchmove', this, [ event_prehandler_mobile.call(this, ee, touches[i]) ]);
        }
      }
    }

    function event_touchEndDoc(e) {
      var ee = e ? e : win.event;
      var touches = ee.changedTouches;
      for (var i = 0, len = touches.length; i < len; ++i) {
        this.postNotification('touchend', this, [ event_prehandler_mobile.call(this, ee, touches[i]) ]);
      }
    }

    function event_touchCancelDoc(e) {
      var ee = e ? e : win.event;
      var touches = ee.changedTouches;
      for (var i = 0, len = touches.length; i < len; ++i) {
        this.postNotification('touchcancel', this, [ event_prehandler_mobile.call(this, ee, touches[i]) ]);
      }
    }

    function event_touchStartCanvas(e) {
      var ee = e ? e : win.event;
      var touches = ee.changedTouches;
      var root = this.root;
      for (var i = 0, len = touches.length; i < len; ++i) {
        var eArg = event_prehandler_mobile.call(this, ee, touches[i]);
        this.postNotification('touchstart', this, [ eArg ]);
        root._dispatchMouseTouchEvent('touchstart', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
    }

    function event_touchMoveCanvas(e) {
      var ee = e ? e : win.event;
      var touches = ee.changedTouches;
      var root = this.root;
      for (var i = 0, len = touches.length; i < len; ++i) {
        var eArg = event_prehandler_mobile.call(this, ee, touches[i]);
        if (eArg.move) {
          this.postNotification('touchmove', this, [ eArg ]);
          root._dispatchMouseTouchEvent('touchmove', eArg);
        }
        eArg.stopPropagation();
        eArg.preventDefault();
      }
    }

    function event_touchEndCanvas(e) {
      var ee = e ? e : win.event;
      var touches = ee.changedTouches;
      var root = this.root;
      for (var i = 0, len = touches.length; i < len; ++i) {
        var eArg = event_prehandler_mobile.call(this, ee, touches[i]);
        this.postNotification('touchend', this, [ eArg ]);
        root._dispatchMouseTouchEvent('touchend', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
    }

    function event_touchCancelCanvas(e) {
      var ee = e ? e : win.event;
      var touches = ee.changedTouches;
      var root = this.root;
      for (var i = 0, len = touches.length; i < len; ++i) {
        var eArg = event_prehandler_mobile.call(this, ee, touches[i]);
        this.postNotification('touchend', this, [ eArg ]);
        root._dispatchMouseTouchEvent('touchend', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      }
    }
    
    function event_keyDownDoc(e) {
      this.postNotification('keydown', this, [ event_prehander_desktop.call(this, e ? e : win.event) ]);
    }

    function event_keyPressDoc(e) {
      this.postNotification('keypress', this, [ event_prehander_desktop.call(this, e ? e : win.event) ]);
    }

    function event_keyUpDoc(e) {
      this.postNotification('keyup', this, [ event_prehander_desktop.call(this, e ? e : win.event) ]);
    }

    function event_mouseDownDoc(e) {
      this.postNotification('mousedown', this, [ event_prehander_desktop.call(this, e ? e : win.event) ]);
    }

    function event_mouseMoveDoc(e) {
      this.postNotification('mousemove', this, [ event_prehander_desktop.call(this, e ? e : win.event) ]);
    }

    function event_mouseUpDoc(e) {
      this.postNotification('mouseup', this, [ event_prehander_desktop.call(this, e ? e : win.event) ]);
    }

    function event_clickCanvas(e) {
      var eArg = event_prehander_desktop.call(this, e ? e : win.event);
      this.postNotification('click', this, [ eArg ]);
      this.root._dispatchMouseTouchEvent('click', eArg);
      eArg.stopPropagation();
      eArg.preventDefault();
    }

    function event_dblclickCanvas(e) {
      var eArg = event_prehander_desktop.call(this, e ? e : win.event);
      this.postNotification('dblclick', this, [ eArg ]);
      this.root._dispatchMouseTouchEvent('dblclick', eArg);
      eArg.stopPropagation();
      eArg.preventDefault();
    }

    function event_contextMenuCanvas(e) {
      var eArg = event_prehander_desktop.call(this, e ? e : win.event);
      this.postNotification('contextmenu', this, [ eArg ]);
      this.root._dispatchMouseTouchEvent('contextmenu', eArg);
      eArg.stopPropagation();
      eArg.preventDefault();
    }

    function event_mouseDownCanvas(e) {
      var eArg = event_prehander_desktop.call(this, e ? e : win.event);
      this.postNotification('mousedown', this, [ eArg ]);
      this.root._dispatchMouseTouchEvent('mousedown', eArg);
      eArg.stopPropagation();
      eArg.preventDefault();
    }

    function event_mouseMoveCanvas(e) {
      var eArg = event_prehander_desktop.call(this, e ? e : win.event);
      this.postNotification('mousemove', this, [ eArg ]);
      this.root._dispatchMouseTouchEvent('mousemove', eArg);
      eArg.stopPropagation();
      eArg.preventDefault();
    }

    function event_mouseUpCanvas(e) {
      var eArg = event_prehander_desktop.call(this, e ? e : win.event);
      this.postNotification('mouseup', this, [ eArg ]);
      this.root._dispatchMouseTouchEvent('mouseup', eArg);
      eArg.stopPropagation();
      eArg.preventDefault();
    }

    function event_mouseWheelCanvas(e) {
      var eArg = event_prehander_desktop.call(this, e ? e : win.event);
      this.postNotification('wheel', this, [ eArg ]);
      this.root._dispatchMouseTouchEvent('wheel', eArg);
      eArg.stopPropagation();
      eArg.preventDefault();
    }

    function check_renderSize() {
      var render = this._render;
      if (render.clientWidth !== this._clientWidth || render.clientHeight !== this._clientHeight) {
        this._clientWidth = render.clientWidth;
        this._clientHeight = render.clientHeight;
        this.refresh();
        sync_transform.call(this);
      }
    }

    function sync_transform() {
      this._needUpdateTranform = true;
    }

    return Application;

  }
)();
