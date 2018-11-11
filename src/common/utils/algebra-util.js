export default (
  function () {
    function newton(p, st, t) {
      var count = 0;
      while (count < 5) {
        var _t = 1 - t;
        var result = p[0] * Math.pow(_t, 3) + 3 * p[2] * Math.pow(_t, 2) * t +  3 * p[4] * _t * Math.pow(t, 2) + p[6] * Math.pow(t, 3) - st;
        if (Math.abs(result) < 0.5) {
          break;
        } else {
          var _result = (-3 * p[0] + 3 * p[2]) * Math.pow(_t, 2) + (-6 * p[2] + 6 * p[4]) * t * _t + (3 * p[6] - 3 * p[4]) * Math.pow(t, 2);
          if (_result === 0) {
            t = t + 0.1 > 1 ? t - 0.1 : t + 0.1;
          } else {
            t -= result / _result;
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
    }

    return {
      newton: newton
    }
  }
)()