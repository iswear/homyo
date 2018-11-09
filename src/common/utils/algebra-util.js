export default (
  function () {
    function newton(params, st, t) {
      var count = 0;
      while (count < 5) {
        var t_ = 1 - t;
        var result = params[0] * Math.pow(t_, 3) + 3 * params[2] * Math.pow(t_) + 3 * params[4] * t_ * 
      }
    }

    return {
      newton: newton
    }
  }
)()