/**
 * provider and publish notification
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/12
 */
import LangUtil from '../utils/lang-util';

export default (
  function () {
    
    var Notifier = LangUtil.extend(null);

    Notifier.prototype.init = function () {
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
    Notifier.prototype.addObserver = function (name, fn, target, sender, order) {
      var observers = this._observers[name];
      if (!observers) {
        observers = [];
        this._observers[name] = observers;
      }
      var order = order ? order : 0;
      var observer;
      var newObserver = {
        fn: fn,
        target: target,
        sender: sender,
        order: order
      };
      for (var i = 0, len = observers.length; i < len; ++i) {
        observer = observers[i];
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
    Notifier.prototype.removeObserver = function (name, fn, target, sender) {
      var observers = this._observers[name];
      if (observers) {
        var observer;
        for (var i = 0, len = observers.length; i < len; ++i) {
          observer = observers[i];
          if (observer.fn === fn && observer.target === target && observer.sender === sender) {
            observers.splice(1, 0);
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
    Notifier.prototype.getObserverByName = function (name) {
      return this._observers[name];
    }

    Notifier.prototype.getObserverByAllParams = function (name, fn, target, sender) {
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
    Notifier.prototype.postNotification = function (name, sender, params) {
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
    Notifier.prototype.defineNotifyProperty = function (name, value) {
      Object.defineProperty(this, name, {
        configurable: false,
        enumerable: false,
        get: notifyPropertyGetter(name),
        set: notifyPropertySetter(name, name + 'Changed')
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
    Notifier.prototype.defineCustomProperty = function (name, container, value, getter, setter) {
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
    Notifier.prototype.destroy = function () {
      this.$properties = null;
      this._observers = null;
    }
    
    function notifyPropertyGetter(name) {
      return function () {
        return this.$properties[name];
      }
    }
    
    function notifyPropertySetter(name, eventName) {
      return function (val) {
        var oldVal = this.$properties[name];
        if (oldVal !== val) {
          this.$properties[name] = val;
          this.postNotification(eventName, this, [val, oldVal]);
        }
      }
    }

    return Notifier;
  }
)();