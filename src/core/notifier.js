/**
 * provider and publish notification
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../utils/lang-util';

export default (
  function () {
    var functions = (function () {
      function notifyPropertyGetter (name) {
        return function () {
          return this.$properties[name];
        }
      }
      function notifyPropertySetter (name, eventName) {
        return function (val) {
          var oldVal = this.$properties[name];
          if (oldVal !== val) {
            this.$properties[name] = val;
            this.postNotification(eventName, this, [val, oldVal]);
          }
        }
      }

      return {
        notifyPropertyGetter: notifyPropertyGetter,
        notifyPropertySetter: notifyPropertySetter
      }
    })();

    var Notifier = (function () {
      var InnerNotifier = LangUtil.extend(null);

      InnerNotifier.prototype.init = function () {
        this.$properties = {};
        this._observers = {};
      }

      /**
       * 添加观察者
       * @param name 观察消息名称
       * @param fn 回调函数
       * @param target 回调this
       * @param sender 指定发送者
       * @param order 排序
       */
      InnerNotifier.prototype.addObserver = function (name, fn, target, sender, order) {
        var observers = this._observers[name];
        if (!observers) {
          observers = [];
          this._observers[name] = observers;
        }
        var order = order ? order : 1;
        var newObserver = {
          fn: fn,
          target: target,
          sender: sender,
          order: order
        };
        for (var i = 0, len = observers.length; i < len; ++i) {
          var observer = observers[i];
          if (observer.order > order) {
            observers.splice(i, 0, newObserver);
            return;
          }
        }
        observers.push(newObserver);
      }

      /**
       * 移除观察者
       * @param name 事件名称
       * @param fn 回调函数
       * @param target this
       * @param sender 发送者
       */
      InnerNotifier.prototype.removeObserver = function (name, fn, target, sender) {
        var observers = this._observers[name];
        if (observers) {
          var observer;
          for (var i = 0, len = observers.length; i < len; ++i) {
            observer = observers[i];
            if (observer.fn === fn && observer.target === target && observer.sender === sender) {
              observers.splice(i, 1);
              i--;
              len--;
            }
          }
        }
      }

      /**
       * 获取某个事件的所有观察者
       * @param name
       * @returns {*}
       */
      InnerNotifier.prototype.getObserverByName = function (name) {
        return this._observers[name];
      }

      InnerNotifier.prototype.getObserverByAllParams = function (name, fn, target, sender) {
        var observers = this._observers[name];
        if (observers) {
          var observer;
          for (var i = 0, len = observers.length; i < len; ++i) {
            observer = observers[i];
            if (observer.fn === fn && observer.target === target && observer.sender === sender) {
              return observer;
            }
          }
        }
        return null;
      }
      /**
       * 发送消息
       * @param name
       * @param params
       * @param sender
       */
      InnerNotifier.prototype.postNotification = function (name, sender, params) {
        var observers = this._observers[name];
        if (observers) {
          var len = observers.length;
          if (len > 0) {
            params = params ? params : [];
            params.unshift(sender);
            var observer;
            for (var i = 0; i < len; ++i) {
              observer = observers[i];
              if (observer.sender === sender || observer.sender === null) {
                observer.fn.apply(observer.target, params);
              }
            }
          }
        }
      }

      /**
       * 定义通知属性
       * @param name
       * @param value
       */
      InnerNotifier.prototype.defineNotifyProperty = function (name, value) {
        Object.defineProperty(this, name, {
          configurable: false,
          enumerable: false,
          get: functions.notifyPropertyGetter(name),
          set: functions.notifyPropertySetter(name, name + 'Changed')
        });
        if (!LangUtil.isUndefined(value)) {
          this[name] = value;
        }
      }

      /**
       * 添加自定义属性
       * @param name
       * @param container
       * @param value
       * @param setter
       * @param getter
       */
      InnerNotifier.prototype.defineCustomProperty = function (name, container, value, getter, setter) {
        Object.defineProperty(this, name, {
          configurable: false,
          enumerable: false,
          get: getter,
          set: setter
        });
        if (!LangUtil.isUndefined(value)) {
          container[name] = value;
        }
      }

      /**
       * 清理资源
       */
      InnerNotifier.prototype.destroy = function () {
        this.$properties = null;
        this._observers = null;
      }

      return InnerNotifier;
    })();

    return Notifier;
  }
)();