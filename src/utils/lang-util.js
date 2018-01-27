/**
 * util for class extend and so on
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (
  function () {

    /**
     * 缺省初始化函数
     * @param config 配置
     */
    var defaultInitFn = function (config) {}

    /**
     * 缺省销毁函数
     */
    var defaultDestroyFn = function () {}

    /**
     * 继承父级调用解决方案
     * @param fnName 函数名
     * @param args 参数
     * @returns {undefined}
     */
    var superCallFn = function (fnName, args) {
      if (arguments.length == 1 || !args) {
        args = [];
      }
      var that = this.__super_ ? this.__super_ : this;
      var prototype = that._super_;
      var ret = undefined;
      while (typeof prototype[fnName] === 'function') {
        if (that[fnName] === prototype[fnName]) {
          prototype = prototype._super_;
          continue;
        } else {
          this.__super_ = prototype;
          ret = prototype[fnName].apply(this, args);
          break;
        }
      }
      this.__super_ = null;
      return ret;
    }


    var util = {
      extend: function (base) {
        var obj = function (conf) {
          this.init(conf)
        }
        if (base) {
          obj.prototype = Object.create(base.prototype);
          obj.prototype._super_ = base.prototype;
        } else {
          obj.prototype._super_ = {};
        }
        if (obj.prototype.init === undefined) {
          obj.prototype.init = defaultInitFn;
        }
        if (obj.prototype.destroy === undefined) {
          obj.prototype.destroy = defaultDestroyFn;
        }
        if (obj.prototype.super === undefined) {
          obj.prototype.super = superCallFn;
        }
        return obj;
      },
      isUndefined: function (val) {
        return val === undefined;
      },
      isBoolean: function (val) {
        return typeof val === 'boolean';
      },
      isNumber: function (val) {
        return typeof val === 'number' && !isNaN(val);
      },
      isString: function (val) {
        return typeof val === 'string';
      },
      isArray: function (val) {
        return val instanceof Array;
      },
      isObject: function (val) {
        return typeof val === 'object';
      },
      isFunction: function (val) {
        return typeof val === 'function';
      },
      clone: function (val) {
        if (util.isArray(val)) {
          var rArr = [];
          for (var i = 0, size = val.length; i < size; ++i) {
            rArr.push(util.clone(val[i]));
          }
          return rArr;
        } else if (util.isObject()) {
          var rObj = {};
          for (var item in val) {
            if (val.hasOwnProperty(item)) {
              rObj[item] = util.clone(val[item]);
            }
          }
          return rObj;
        } else {
          return val;
        }
      },
      checkAndGet: function (val, defVal) {
        return util.isUndefined(val) ? defVal : val;
      }
    };

    return util;
  }
)();