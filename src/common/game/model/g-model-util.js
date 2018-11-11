import SchedulerAnimation from "../../core/animation/scheduler-animation";
import PropertyAnimation from "../../core/animation/property-animation";
import QueueAnimation from "../../core/animation/queue-animation";
import AlgebraUtil from "../../utils/algebra-util";

export default (
  function () {
    function propertySchedularUpdate (binder, param) {
      binder.node[param.property] = param.value
    }

    function propertyLineUpdate (v) {
      return function (binder, dt, st) {
        return st * v;
      }
    }

    function propertyCurveUpdate (params) {
      return function (binder, dt, st) {
        var t = AlgebraUtil.newton(params, st, 0.5);
        var t_ = 1 - t;
        return params[1] * Math.pow(t_, 3) + 3 * params[3] * Math.pow(t_, 2) * t + 3 * params[5] * t_ * Math.pow(t, 2) + params[7] * Math.pow(t, 3);
      }
    }

    function compilePropertiesFrames (node, nodeFrames) {
      if (node && nodeFrames) {
        var tweenSupportMap = {
          x: true,
          y: true,
          scaleX: true,
          scaleY: true,
          shearX: true,
          shearY: true,
          rotateZ: true,
          alpha: true,
          visible: true,
          texture: false
        };
        var asyncQueue = [];
        for (var prop in nodeFrames) {
          var propFrames = nodeFrames[prop]
          if (propFrames && propFrames.length > 0) {
            var syncQueue = [];
            var prevTime;
            var prevValue;
            for (var i = 0, len = propFrames.length; i < len; ++i) {
              var propFrame = propFrames[i];
              var time = propFrame.time;
              var value = propFrame.value;
              var tween = propFrame.tween;
              var curve = propFrame.curve;
              if (i === 0) {
                prevTime = 0
                prevValue = value
              }
              var deltaValue = value - prevValue;
              var deltaTime = time - prevTime;
              if (tween && tweenSupportMap[prop] && deltaValue !== 0) {
                // 渐变动画
                if (curve && curve.length === 8) {
                  var width = curve[6] - curve[0];
                  var height = curve[7] - curve[1];
                  var params = [
                    0,
                    0,
                    (curve[2] - curve[0]) / width * deltaTime,
                    (curve[3] - curve[1]) / height * deltaValue,
                    (curve[4] - curve[0]) / width * deltaTime,
                    (curve[5] - curve[1]) / height * deltaValue,
                    deltaTime,
                    deltaValue
                  ];
                  syncQueue.push(new PropertyAnimation({
                    property: prop,
                    offset: deltaValue,
                    offsetFn: propertyCurveUpdate(params)
                  }));
                } else {
                  syncQueue.push(new PropertyAnimation({
                    property: prop,
                    offset: deltaValue,
                    offsetFn: propertyLineUpdate(deltaValue / deltaTime)
                  }));
                }
              } else {
                // 逐帧动画
                syncQueue.push(new SchedulerAnimation({
                  callbackFn: propertySchedularUpdate,
                  callbackTarget: null,
                  interval: deltaTime,
                  repeats: 1,
                  param: {
                    property: prop,
                    value: value
                  }
                }));
              }
              if (syncQueue.length > 0) {
                asyncQueue.push(new QueueAnimation({
                  animations: syncQueue,
                  sync: true
                }));
              }
            } 
          }
        }
        if (asyncQueue.length > 0) {
          return new QueueAnimation({
            animations: asyncQueue,
            sync: false
          });
        }
      }
      return null;
    }

    return {
      compilePropertiesFrames: compilePropertiesFrames
    };
  }
)()