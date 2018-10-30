import LangUtil from '../utils/lang-util'
import Notifier from './notifier'

export default (
  function () {
    var Proxy = LangUtil.extend(Notifier);
    Proxy.prototype.init = function (conf) {
      this.super('init', [conf]);
      for (var name in conf) {
        this[name] = conf[name]
      }
    }

    Proxy.prototype.get = function (name) {
      return this[name];
    }

    Proxy.prototype.set = function (name, value) {
      if (this[name] === value) {
        return;
      }
      if (this[name] === undefined) {
        this.defineNotifyProperty(name, value);
      } else {
        this[name] = value;
      }
    }

    return Proxy;
  }
)();