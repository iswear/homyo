export default (
  function () {
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
            var prevProp;
            for (var i = 0, len = propFrames.length; i < len; ++i) {
              var propFrame = propFrames[i];
              var time = propFrame.time;
              var tween = propFrame.tween;
              var value = propFrame.value;
              var curve = propFrame.curve;
              if (i !== 0) {
                if (time !== 0) {
                  throw 'First property frame time should be zero:' + prop
                }
                prevProp = value
              }

              if (tween && time !== 0 && tweenSupportMap[prop]) {
                // 渐变动画
                
              } else {
                // 逐帧动画
              }
            } 
          }
        }
      }
      return null;
    }

    return {
      compilePropertiesFrames: compilePropertiesFrames
    };
  }
)()