/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import LangUtil from '../utils/lang-util';
import SchedulerAnimation from '../core/animation/scheduler-animation';
import PropertyAnimation from '../core/animation/property-animation';
import QueueAnimation from '../core/animation/queue-animation';

export default (
  function () {
    var modelProperties = [
      {
        name: 'rotateZ',
        tween: true
      }, {
        name: 'scaleX',
        tween: true
      }, {
        name: 'scaleY',
        tween: true
      }, {
        name: 'inclineX',
        tween: true
      }, {
        name: 'inclineY',
        tween: true
      }, {
        name: 'width',
        tween: true
      }, {
        name: 'height',
        tween: true
      }, {
        name: 'anchorX',
        tween: true
      }, {
        name: 'anchorY',
        tween: true
      }, {
        name: 'alpha',
        tween: true
      }, {
        name: 'visible',
        tween: false
      }, {
        name: 'img',
        tween: false
      }
    ];

    var otherProperties = [
      {
        name: 'x',
        tween: true
      }, {
        name: 'y',
        tween: true
      }, {
        name: 'rotateZ',
        tween: true
      }, {
        name: 'scaleX',
        tween: true
      }, {
        name: 'scaleY',
        tween: true
      }, {
        name: 'inclineX',
        tween: true
      }, {
        name: 'inclineY',
        tween: true
      }, {
        name: 'width',
        tween: true
      }, {
        name: 'height',
        tween: true
      }, {
        name: 'anchorX',
        tween: true
      }, {
        name: 'anchorY',
        tween: true
      }, {
        name: 'alpha',
        tween: true
      }, {
        name: 'visible',
        tween: false
      }, {
        name: 'img',
        tween: false
      }
    ];

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
      compileFrames: function (node, frames, model) {
        var preStatus = {time: 0, tween: false}, properties = model ? modelProperties : otherProperties;
        for (var i = 0, len = properties.length; i < len; ++i) {
          var property = properties[i];
          preStatus[property] = node[property];
        }
        if (frames && frames.length > 0) {
          var syncQueue = [];
          for (var i = 0, len = frames.length; i < len; ++i) {
            var asyncQueue = [];
            var frame = frames[i];
            if (i === 0) {
              if (frame.time !== 0) {
                throw 'first frame time should be zero';
              } else {
                for (var j = 0, len2 = properties.length; j < len2; ++j) {
                  var property = properties[j];
                  var value = frame[property.name];
                  if (!LangUtil.isUndefined(value) && value !== preStatus[property.name]) {
                    asyncQueue.push(
                      new SchedulerAnimation({
                        fn: propertyUnTweenUpdate,
                        target: undefined,
                        interval: 0,
                        repeats: 1,
                        param: {
                          property: property.name,
                          value: value
                        }
                      })
                    );
                    preStatus[property.name] = value;
                  }
                }
              }
            } else {
              if (frame.tween) {
                for (var j = 0, len2 = properties.length; j < len2; ++j) {
                  var property = properties[j];
                  var value = frame[property.name];
                  if (!LangUtil.isUndefined(value) && value !== preStatus[property.name]) {
                    if (property.tween) {
                      var curve = frame[property.name + 'Curve'];
                      var targetOffset = value - preStatus[property.name];
                      var deltaTime = frame.time - preStatus.time;
                      if (curve) {
                        var params = [];
                        var xWidth = curve[6] - curve[0];
                        var yHeight = curve[7] - curve[1];
                        params[0] = 0;
                        params[2] = (curve[2] - curve[0]) / xWidth * deltaTime;
                        params[4] = (curve[4] - curve[0]) / xWidth * deltaTime;
                        params[6] = deltaTime;
                        params[1] = 0;
                        params[3] = (curve[3] - curve[1]) / yHeight * targetOffset;
                        params[5] = (curve[5] - curve[1]) / yHeight * targetOffset;
                        params[7] = targetOffset;
                        asyncQueue.push(
                          new PropertyAnimation({
                            property: property.name,
                            targetOffset: targetOffset,
                            offsetFn: propertyCurveTweenUpdate(params)
                          })
                        );
                      } else {
                        asyncQueue.push(
                          new PropertyAnimation({
                            property: property.name,
                            targetOffset: targetOffset,
                            offsetFn: propertyLineTweenUpdate(targetOffset, deltaTime)
                          })
                        );
                      }
                    } else {
                      var deltaTime = frame.time - preStatus.time;
                      asyncQueue.push(
                        new SchedulerAnimation({
                          fn: propertyUnTweenUpdate,
                          target: undefined,
                          interval: deltaTime,
                          repeats: 1,
                          param: {
                            property: property.name,
                            value: value
                          }
                        })
                      );
                    }
                    preStatus[property.name] = value;
                  }
                }
              } else {
                for (var j = 0, len2 = properties.length; j < len2; ++j) {
                  var property = properties[j];
                  var value = frame[property.name];
                  if (!LangUtil.isUndefined(value) && value !== preStatus[property.name]) {
                    var deltaTime = frame.time - preStatus.time;
                    asyncQueue.push(
                      new SchedulerAnimation({
                        fn: propertyUnTweenUpdate,
                        target: undefined,
                        interval: deltaTime,
                        repeats: 1,
                        param: {
                          property: property.name,
                          value: value
                        }
                      })
                    );
                    preStatus[property.name] = value;
                  }
                }
              }
            }
            syncQueue.push(new QueueAnimation({
              animations: asyncQueue,
              sync: false
            }));
            preStatus.time = frame.time;
            preStatus.tween = frame.tween;
          }
          return new QueueAnimation({
            animations: syncQueue,
            sync: true
          });
        } else {
          return null;
        }
      }
    };

    return GUtil;
  }
)();