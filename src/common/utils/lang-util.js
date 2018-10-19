/**
 * util for class extend and so on
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */

export default (
  function () {

    var util = (function() {
      /**
       * 缺省初始化函数
       * @param config 配置
       */
      function defaultInitFn (conf) {
        
      }

      /**
       * 缺省销毁函数
       */
      function defaultDestroyFn() {
        
      }

      /**
       * 继承父级调用解决方案
       * @param fnName 函数名
       * @param args 参数
       * @returns {undefined}
       */
      function superCallFn (fnName, args) {
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

      function extend (base) {
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
        if (this.defineNotifyProperty) {
          console.log('fafe' + item)
          for (item in this) {
            var prefix = this[item].charAt(0)
            if (prefix === "_" || prefix === "$") {
              continue;
            }
            this.defineNotifyProperty(item, this[item])
            delete this[item]
          }
        }
        return obj;
      }

      function isUndefined (val) {
        return val === undefined;
      }

      function isNotUndefined (val) {
        return !isUndefined(val);
      }

      function isBoolean (val) {
        return typeof val === 'boolean';
      }

      function isNotBoolean (val) {
        return !isBoolean(val);
      }

      function isNumber (val) {
        return typeof val === 'number' && !isNaN(val);
      }

      function isNotNumber (val) {
        return !isNumber(val);
      }

      function isString (val) {
        return typeof val === 'string';
      }

      function isNotString (val) {
        return !isNotString(val);
      }

      function isArray (val) {
        return val instanceof Array;
      }

      function isNotArray (val) {
        return !isArray(val);
      }

      function isObject (val) {
        return typeof val === 'object';
      }

      function isNotObject (val) {
        return !isObject(val);
      }

      function isFunction (val) {
        return typeof val === 'function';
      }

      function isNotFunction (val) {
        return !isFunction(val);
      }

      function clone (val) {
        if (util.isArray(val)) {
          var rArr = [];
          for (var i = 0, size = val.length; i < size; ++i) {
            rArr.push(util.clone(val[i]));
          }
          return rArr;
        } else if (util.isObject(val)) {
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
      }

      function checkAndGet (val, defVal) {
        return isUndefined(val) ? defVal : val;
      }

      return {
        extend: extend,
        isUndefined: isUndefined,
        isNotUndefined: isNotUndefined,
        isBoolean: isBoolean,
        isNotBoolean: isNotBoolean,
        isNumber: isNumber,
        isNotNumber: isNotNumber,
        isString: isString,
        isNotString: isNotString,
        isArray: isArray,
        isNotArray: isNotArray,
        isObject: isObject,
        isNotObject: isNotObject,
        isFunction: isFunction,
        isNotFunction: isNotFunction,
        clone: clone,
        checkAndGet: checkAndGet
      }
    })();

    return util;
  }
)();