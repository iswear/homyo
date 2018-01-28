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

    var functions = {
      eventInit: function () {
        var canvas = this._render.getCanvas();
        var doc = document;
        if (PlatformUtil.isMobile) {
          EventUtil.addEventListener(doc, 'touchstart', this, functions.eventTouchStartDoc);
          EventUtil.addEventListener(doc, 'touchmove', this, functions.eventTouchMoveDoc);
          EventUtil.addEventListener(doc, 'touchend', this, functions.eventTouchEndDoc);
          EventUtil.addEventListener(doc, 'touchcancel', this, functions.eventTouchCancelDoc);
          EventUtil.addEventListener(canvas, 'touchstart', this, functions.eventTouchStartCanvas);
          EventUtil.addEventListener(canvas, 'touchmove', this, functions.eventTouchMoveCanvas);
          EventUtil.addEventListener(canvas, 'touchend', this, functions.eventTouchEndCanvas);
          EventUtil.addEventListener(canvas, 'touchcancel', this, functions.eventTouchCancelCanvas);
        } else {
          this._events.push(new Event());
          EventUtil.addEventListener(doc, 'keydown', this, functions.eventKeyDownDoc);
          EventUtil.addEventListener(doc, 'keypress', this, functions.eventKeyPressDoc);
          EventUtil.addEventListener(doc, 'keyup', this, functions.eventKeyUpDoc);
          EventUtil.addEventListener(doc, 'mousedown', this, functions.eventMouseDownDoc);
          EventUtil.addEventListener(doc, 'mousemove', this, functions.eventMouseMoveDoc);
          EventUtil.addEventListener(doc, 'mouseup', this, functions.eventMouseUpDoc);
          EventUtil.addEventListener(canvas, 'click', this, functions.eventClickCanvas);
          EventUtil.addEventListener(canvas, 'dblclick', this, functions.eventDblClickCanvas);
          EventUtil.addEventListener(canvas, 'contextmenu', this, functions.eventContextMenuCanvas);
          EventUtil.addEventListener(canvas, 'mousedown', this, functions.eventMouseDownCanvas);
          EventUtil.addEventListener(canvas, 'mousemove', this, functions.eventMouseMoveCanvas);
          EventUtil.addEventListener(canvas, 'mouseup', this, functions.eventMouseUpCanvas);
          EventUtil.addEventListener(canvas, 'mousewheel', this, functions.eventMouseWheelCanvas);
          EventUtil.addEventListener(canvas, 'wheel', this, functions.eventMouseWheelCanvas);
        }
      },
      eventPreProcessDesktop: function (e) {
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
      },
      eventPreProcessMobile: function (e, touch) {
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
      },
      eventTouchStartDoc: function (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          this.postNotification('touchstart', this, [ functions.eventPreProcessMobile.call(this, ee, touches[i]) ]);
        }
      },
      eventTouchMoveDoc: function (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          var eArg = functions.eventPreProcessMobile(this, ee, touches[i]);
          if (eArg.move) {
            this.postNotification('touchmove', this, [ eArg ]);
          }
        }
      },
      eventTouchEndDoc: function (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          this.postNotification('touchend', this, [ functions.eventPreProcessMobile.call(this, ee, touches[i]) ]);
        }
      },
      eventTouchCancelDoc: function (e) {
        var ee = e ? e : win.event;
        var touches = ee.changedTouches;
        for (var i = 0, len = touches.length; i < len; ++i) {
          this.postNotification('touchcancel', this, [ functions.eventPreProcessMobile.call(this, ee, touches[i]) ]);
        }
      },
      eventTouchStartCanvas: function (e) {
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
      },
      eventTouchMoveCanvas: function (e) {
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
      },
      eventTouchEndCanvas: function  () {
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
      },
      eventTouchCancelCanvas: function (e) {
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
      },
      eventKeyDownDoc: function (e) {
        this.postNotification('keydown', this, [ functions.eventPreProcessDesktop.call(this, e ? e : win.event) ]);
      },
      eventKeyPressDoc: function (e) {
        this.postNotification('keypress', this, [ functions.eventPreProcessDesktop.call(this, e ? e : win.event) ]);
      },
      eventKeyUpDoc: function (e) {
        this.postNotification('keyup', this, [ functions.eventPreProcessDesktop.call(this, e ? e : win.event) ]);
      },
      eventMouseDownDoc: function (e) {
        this.postNotification('mousedown', this, [ functions.eventPreProcessDesktop.call(this, e ? e : win.event) ]);
      },
      eventMouseMoveDoc: function (e) {
        this.postNotification('mousemove', this, [ functions.eventPreProcessDesktop.call(this, e ? e : win.event) ]);
      },
      eventMouseUpDoc: function (e) {
        this.postNotification('mouseup', this, [ functions.eventPreProcessDesktop.call(this, e ? e : win.event) ]);
      },
      eventClickCanvas: function (e) {
        var eArg = functions.eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('click', this, [ eArg ]);
        this.root._dispatchMouseTouchEvent('click', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      },
      eventDblClickCanvas: function (e) {
        var eArg = functions.eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('dblclick', this, [ eArg ]);
        this.root._dispatchMouseTouchEvent('dblclick', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      },
      eventContextMenuCanvas: function (e) {
        var eArg = functions.eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('contextmenu', this, [ eArg ]);
        this.root._dispatchMouseTouchEvent('contextmenu', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      },
      eventMouseDownCanvas: function (e) {
        var eArg = functions.eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mousedown', this, [ eArg ]);
        this.root._dispatchMouseTouchEvent('mousedown', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      },
      eventMouseMoveCanvas: function (e) {
        var eArg = functions.eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mousemove', this, [ eArg ]);
        this.root._dispatchMouseTouchEvent('mousemove', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      },
      eventMouseUpCanvas: function (e) {
        var eArg = functions.eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('mouseup', this, [ eArg ]);
        this.root._dispatchMouseTouchEvent('mouseup', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      },
      eventMouseWheelCanvas: function (e) {
        var eArg = functions.eventPreProcessDesktop.call(this, e ? e : win.event);
        this.postNotification('wheel', this, [ eArg ]);
        this.root._dispatchMouseTouchEvent('wheel', eArg);
        eArg.stopPropagation();
        eArg.preventDefault();
      },
      checkRenderSize: function () {
        var render = this._render;
        if (render.clientWidth !== this._clientWidth || render.clientHeight !== this._clientHeight) {
          this._clientWidth = render.clientWidth;
          this._clientHeight = render.clientHeight;
          this.refresh();
          functions.syncTransform.call(this);
        }
      },
      syncTransform: function () {
        this._needUpdateTranform = true;
      }
    };

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
        this._render = new CanvasRender({canvas: conf.canvas, width: LangUtil.checkAndGet(conf.width, undefined), height: LangUtil.checkAndGet(conf.height, undefined)});

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
        } else {
          this._preCheckTime += deltaTime;
        }
        if (this._refresh) {
          this._render.setTransform(1, 0, 0, 1, 0, 0);
          this._render.clear();
          this.root._dispatchRender(this._render, 1, this._transform, this._transform, this._needUpdateTranform);
          this._refresh = false;
        }
      }

      InnerApplication.prototype.run = function (fn) {
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

      InnerApplication.prototype.stop = function () {
        TimerUtil.removeAnimationTaskById(this._timerTaskId);
        this._timerTaskId = 0;
      }

      return InnerApplication;
    })();

    return Application;
  }
)();
