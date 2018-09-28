import LangUtil from "../../utils/lang-util";
import Notifier from "../notifier";
import FileLoader from "../io/file-loader";

/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */

export default (function () {
  var AudioPlayer = (function () {
    var InnerAudioPlayer = langUtil.extend(notifier);

    InnerAudioPlayer.prototype.init = function (conf) {
      this.super('init', [conf]);
      this._loader = langUtil.checkAndGet(conf.loader, new FileLoader({}));
    }

    InnerAudioPlayer.prototype.playMusic = function (url) {

    }

    InnerAudioPlayer.prototype.stopMusic = function (url) {

    }

    InnerAudioPlayer.prototype.pauseMusic = function (url) {

    }

    InnerAudioPlayer.prototype.resumeMusic = function (url) {

    }

    InnerAudioPlayer.prototype.playEffect = function (url) {

    }

    InnerAudioPlayer.prototype.stopEffect = function (url) {

    }

    InnerAudioPlayer.prototype.pauseEffect = function (url) {

    }

    InnerAudioPlayer.prototype.resumeMusic = function (url) {
      
    }

    return InnerAudioPlayer;
  })();
  
  return AudioPlayer;
})();