/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (
  function () {
    var functions = {
      syncImg: function () {
        if (this.img !== null && this.img !== '') {
          if (LangUtil.isString(this.img)) {
            this._img.url = this.img;
            this._needUpdateImgSize = true;
          } else {
            this._img.url = this.img.url;
            this._img.x = this.img.x;
            this._img.y = this.img.y;
            this._img.width = this.img.width;
            this._img.height = this.img.height;
            this.width = this.img.width;
            this.height = this.img.height;
          }
          if (this.getObserverByAllParams('render', functions.renderImg, this, this) === null) {
            this.addObserver('render', functions.renderImg, this, this);
          }
        } else {
          this.removeObserver('render', functions.renderImg, this, this);
        }
      },
      renderImg: function () {
        var img = this._img;
        var image = this.findApplication().getFileLoader().loadImageAsync(
          img.url,
          functions.loadImageFinished,
          this
        );
        if (image !== null) {
          if (this._needUpdateImgSize) {
            img.x = 0;
            img.y = 0;
            img.width = image.width;
            img.height = image.height;
            this.width = img.width;
            this.height = img.height;
            this._needUpdateImgSize = false;
          }
          if (LangUtil.isString(this.img)) {
            var rect = this.getRectInSelf();
            render.drawImage(image, img.x, img.y, img.width, img.height, rect.left, rect.top, img.width, img.height);
          } else {
            render.drawImage(image, img.x, img.y);
          }
          render.drawImage();
        }
      },
      loadImageFinished: function (url, success) {
        if (success) {
          var image = this.findApplication().getFileLoader().loadImageAsync(url);
          if (image !== null) {
            if (LangUtil.isString(this.img)) {
              this._needUpdateImgSize = true;
            }
          }
        }
        this.refresh();
      }
    };

    var GTexture = (function () {
      var InnerGTexture = LangUtil.extend(Node);

      InnerGTexture.prototype.defImg = null;
      InnerGTexture.prototype.defAnchorX = 0.5;
      InnerGTexture.prototype.defAnchorY = 0.5;
      InnerGTexture.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('img', LangUtil.checkAndGet(conf.img, this.defImg));

        this._img = {};
        this._needUpdateImgSize = true;

        functions.syncImg.call(this);

        this.addObserver('imgChanged', functions.syncImg, this, this);
      }

      return InnerGTexture;
    })();

    return GTexture;
  }
)();