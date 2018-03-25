/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (
  function () {
    var functions = (function () {
      function syncImg () {
        this.removeObserver('render', renderImg, this, this);
        this.removeObserver('render', renderImgClip, this, this);
        if (this.img !== null && this.img !== '') {
          if (LangUtil.isString(this.img)) {
            this._img.url = this.img;
            this._img.image = null;
            this._img.progress = 0;
            this.addObserver('render', renderImg, this, this);
          } else {
            this._img.url = this.img.url;
            this._img.image = null;
            this._img.progress = 0;
            this.addObserver('render', renderImgClip, this, this);
          }
        }
      }
      function syncImgRender (image) {
        if (LangUtil.isString(this.img)) {
          this.width = image.width;
          this.height = image.height;
          this._img.image = image;
        } else {
          this.width = this.img.width;
          this.height = this.img.height;
          this._img.image = image;
          this._img.x = this.img.x;
          this._img.y = this.img.y;
          this._img.width = this.img.width;
          this._img.height = this.img.height;
        }
        this.refresh();
      }
      function renderImg (sender, render) {
        var img = this._img;
        if (!img.image) {
          loadImage.call(this, img.url);
        } else {
          var rect = this.getRectInLocal();
          render.drawImage(img.image, rect.left, rect.top);
        }
      }
      function renderImgClip (sender, render) {
        var img = this._img;
        if (!img.image) {
          loadImage.call(this, img.url);
        } else {
          var rect = this.getRectInLocal();
          render.drawImageExt(img.image, img.x, img.y, img.width, img.height, rect.left, rect.top, img.width, img.height);
        }
      }
      function loadImage (url) {
        var fileLoader = this.findApplication().getFileLoader();
        var image = fileLoader.loadImageAsync(url);
        if (image !== null) {
          syncImgRender.call(this, image);
        } else {
          if (this._img.progress === 0) {
            fileLoader.loadImageAsync(url, loadImageFinished, this);
            this._img.progress = 1;
          }
        }
      }
      function loadImageFinished (url, success) {
        if (success) {
          var image = this.findApplication().getFileLoader().loadImageAsync(url);
          if (image !== null) {
            syncImgRender.call(this, image);
            this._img.progress = 2;
          } else {
            this._img.progress = 3;
          }
        } else {
          this._img.progress = 3;
        }
      }

      return {
        syncImg: syncImg,
        syncImgRender: syncImgRender,
        renderImg: renderImg,
        renderImgClip: renderImgClip,
        loadImage: loadImage,
        loadImageFinished: loadImageFinished
      }
    })();

    var GTexture = (function () {
      var InnerGTexture = LangUtil.extend(Node);

      InnerGTexture.prototype.defImg = null;
      InnerGTexture.prototype.defAnchorX = 0.5;
      InnerGTexture.prototype.defAnchorY = 0.5;
      InnerGTexture.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('img', LangUtil.checkAndGet(conf.img, this.defImg));

        this._img = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          url: null,
          image: null,
          progress: 0
        };

        functions.syncImg.call(this);

        this.addObserver('imgChanged', functions.syncImg, this, this);
      }

      return InnerGTexture;
    })();

    return GTexture;
  }
)();