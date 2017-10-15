/**
 * util for text measure and layout
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (function () {
  var win = window;
  var reqAniFrame;
  if (win.requestAnimationFrame) {
    reqAniFrame = win.requestAnimationFrame;
  } else if (win.webkitRequestAnimationFrame) {
    reqAniFrame = win.webkitRequestAnimationFrame;
  } else if (win.msRequestAnimationFrame) {
    reqAniFrame = win.msRequestAnimationFrame;
  } else if (win.mozRequestAnimationFrame) {
    reqAniFrame = win.mozRequestAnimationFrame;
  } else if (win.oRequestAnimationFrame) {
    reqAniFrame = win.oRequestAnimationFrame;
  } else {
    reqAniFrame = null;
  }

  var aniTaskId = 0;
  var aniTaskList = [];
  var aniLoopId = 0;
  var aniLoopRun = false;

  function reqAniLoop() {
    aniTaskListUpdate();
    reqAniFrame(reqAniLoop);
  }
  
  function intervalAniLoop() {
    aniLoopId = win.setInterval(aniTaskListUpdate, 16);
  }

  function aniTaskListUpdate() {
    var len = aniTaskList.length;
    var i, task;
    for (i = 0; i < len; ++i) {
      task = aniTaskList[i];
      task.fn.call(task.target);
    }
  }

  var util = {};
  util.addAnimationTask = function (fn, target) {
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
  }

  util.removeAnimationTaskById = function (id) {
    for (var i = 0, len = aniTaskList.length; i < len; ++i) {
      var task = aniTaskList[i];
      if (task.id == id) {
        aniTaskList.splice(i, 1);
        i--;
        len--;
      }
    }
  }

  return util;
})();