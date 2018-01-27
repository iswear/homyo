/**
 * util for text measure and layout
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (function () {
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
})();