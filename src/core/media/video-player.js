import LangUtil from "../../utils/lang-util";
import Notifier from "../notifier";
import FileLoader from "../io/file-loader";

/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
export default (function () {
  var VideoPlayer = (function () {
    var InnerVideoPlayer = LangUtil.extend(Notifier);

    InnerVideoPlayer.prototype.init = function (conf) {
      this.super('init', [conf]);
      this._loader = LangUtil.checkAndGet(conf.loader, new FileLoader({}));
    }

    InnerVideoPlayer.prototype.play = function (url) {

    }

    InnerVideoPlayer.prototype.stop = function (url) {

    }

    InnerVideoPlayer.prototype.pause = function (url) {

    }

    InnerVideoPlayer.prototype.resume = function (url) {

    }

    return InnerVideoPlayer;
  });

  return VideoPlayer;
})();