/**
 * the core class for app
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

import LangUtil from '../utils/lang-util';
import TimerUtil from '../utils/timer-util';
import EventUtil from '../utils/event-util';
import PlatformUtil from '../utils/platform-util';
import GeometryUtil from '../utils/geometry-util';
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
      var InnerApplication = LangUtil.extend(Notifier);

      InnerApplication.prototype.defScaleMode = 0;
      InnerApplication.prototype.defEnableDirtyZone = false;
      InnerApplication.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('scaleMode', LangUtil.checkAndGet(conf.scaleMode, this.defScaleMode));
        this.defineNotifyProperty('enableDirtyZone', LangUtil.checkAndGet(conf.enableDirtyZone, this.defEnableDirtyZone));

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
        this._dirtyZones = [];

        this._prevLoopTime = 0;
        this._preCheckTime = 0;
        this._refresh = true;
        this._timerTaskId = 0;
        this._events = [];
        this._animationManager = new AnimationManager({});
        this._fileLoader = new FileLoader({});

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
        if (GeometryUtil.isRectNotCross(renderZone, dirtyZone)) {
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
            if (GeometryUtil.isRectNotCross(zone, dirtyZone)) {
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
)();
