/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import LangUtil from "../utils/lang-util";
import PropertyAnimation from "../core/animation/property-animation";
import QueueAnimation from "../core/animation/queue-animation";
import SchedulerAnimation from "../core/animation/scheduler-animation";

export default (function() {
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
              prevProps = LangUtil.clone(frame.data.props);
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
              if (!LangUtil.isUndefined(currProp) && prevProp !== currProp) {
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
                      new PropertyAnimation({
                        property: props[i2],
                        offset: deltaProp,
                        offsetFn: propertyCurveTweenUpdate(params)
                      })
                    );
                  } else {
                    asyncQueue.push(
                      new PropertyAnimation({
                        property: props[i2],
                        offset: deltaProp,
                        offsetFn: propertyLineTweenUpdate(deltaProp, deltaTime)
                      })
                    );
                  }
                } else {
                  asyncQueue.push(
                    new SchedulerAnimation({
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
              if (LangUtil.isUndefined(prevProp)) {
                console.error(
                  "First frame has some required node property:" + props[i2]
                );
                return null;
              }
              if (
                i === 0 ||
                (!LangUtil.isUndefined(currProp) && prevProp !== currProp)
              ) {
                asyncQueue.push(
                  new SchedulerAnimation({
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
              new QueueAnimation({
                animations: asyncQueue,
                sync: false
              })
            );
          }
        }
        if (syncQueue.length > 0) {
          return new QueueAnimation({
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
})();
