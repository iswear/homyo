/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
import LangUtil from '../../utils/lang-util';
import Notifier from '../notifier';

export default (
  function () {
    var doc = document;
    var FileLoader = (function () {
      var InnerFileLoader = LangUtil.extend(Notifier);

      InnerFileLoader.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this._loadingImages = {};
        this._loadedImages = {};
        this._loadingAudios = {};
        this._loadedAudios = {};
        this._loadingVideos = {};
        this._loadedVideos = {};
      }

      InnerFileLoader.prototype.loadImageAsync = function (url, fn, target) {
        if (!LangUtil.isUndefined(this._loadedImages[url])) {
          return this._loadedImages[url];
        } else {
          var image = this._loadingImages[url];
          if (!image) {
            image = doc.createElement('img');
            image.src = url;
            this._loadingImages[url] = image;
          }

          var self = this;
          function loadSuccess() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingImages[url];
            self._loadedImages[url]  = image;
            if (fn) {
              fn.call(target, url, true);
            }
          }

          function loadError() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingImages[url];
            self._loadedImages[url] = null;
            if (fn) {
              fn.call(target, url, false);
            }
          }

          image.addEventListener('load', loadSuccess, false);
          image.addEventListener('error', loadError, false);
          return null;
        }
      }

      InnerFileLoader.prototype.loadAudioAsync = function (url, fn, target) {
        if (!LangUtil.isUndefined(this._loadedAudios[url])) {
          return this._loadedAudios[url];
        } else {
          var audio = this._loadingAudios[url];
          if (!audio) {
            audio = doc.createElement('audio');
            audio.src = url;
            this._loadingAudios[url] = audio;
          }
          var self = this;
          function loadSuccess() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingAudios[url];
            self._loadedImages[url] = audio;
            if (fn) {
              fn.call(target, url, true);
            }
          }

          function loadError() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingAudios[url];
            self._loadedAudios[url] = null;
            if (fn) {
              fn.call(target, url, false);
            }
          }

          audio.addEventListener('load', loadSuccess, false);
          audio.addEventListener('error', loadError, false);
          return null;
        }
      }

      InnerFileLoader.prototype.loadVideoAsync = function (url, fn, target) {
        if (!LangUtil.isUndefined(this._loadedVideos[url])) {
          return this._loadedVideos[url];
        } else {
          var video = this._loadingVideos[url];
          if (!video) {
            video = doc.createElement('video');
            video.src = url;
            this._loadingVideos[url] = video;
          }
          var self = this;
          function loadSuccess() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingVideos[url];
            self._loadedVideos[url] = video;
            if (fn) {
              fn.call(target, url, true);
            }
          }

          function loadError() {
            this.removeEventListener('load', loadSuccess, false);
            this.removeEventListener('error', loadError, false);
            delete self._loadingVideos[url];
            self._loadedVideos[url] = null;
            if (fn) {
              fn.call(target, url, false);
            }
          }

          video.addEventListener('load', loadSuccess, false);
          video.addEventListener('error', loadError, false);
          return null;
        }
      }

      InnerFileLoader.prototype.removeImage = function (url) {
        if (this._loadingImages[url]) {
          delete this._loadingImages[url]
        }
        if (this._loadedImages[url]) {
          delete this._loadedImages[url];
        }
      }

      InnerFileLoader.prototype.removeAudio = function (url) {
        if (this._loadingAudios[url]) {
          delete this._loadingAudios[url];
        }
        if (this._loadedAudios[url]) {
          delete this._loadedAudios[url];
        }
      }

      InnerFileLoader.prototype.removeVideo = function (url) {
        if (this._loadingVideos[url]) {
          delete this._loadingVideos[url];
        }
        if (this._loadedVideos[url]) {
          delete this._loadedVideos[url];
        }
      }

      InnerFileLoader.prototype.destroy = function () {
        this._loadingImages = null;
        this._loadedImages = null;
        this._loadingAudios = null;
        this._loadedAudios = null;
        this._loadingVideos = null;
        this._loadedVideos = null;
        this.super('destroy')
      }

      return InnerFileLoader;
    })();

    return FileLoader;
  }
)();