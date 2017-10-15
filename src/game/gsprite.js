/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/17
 */
import LangUtil from '../utils/lang-util';
import Node from '../core/node';

export default (
  function () {

    var GSprite = LangUtil.extend(Node);

    GSprite.prototype.defImg = null;
    GSprite.prototype.defMirror = 0;
    GSprite.prototype.init = function (conf) {
      this.super('init', [conf]);
      this.defineNotifyProperty('img', LangUtil.checkAndGet(conf.img, this.defImg));
      this.defineNotifyProperty('mirror', LangUtil.checkAndGet(conf.mirror, this.defMirror));

      this._img = {};
      this._needUpdateImgSize = true;

      sync_imgRender.call(this);

      this.addObserver('imgChanged', this.refresh, this, this);
      this.addObserver('mirrorChanged', this.refresh, this, this);
      this.addObserver('imgChanged', sync_imgRender, this, this);
    }

    function render_img(sender, render) {
      var img = this._img;
      var image = this.findApplication().getFileLoader().loadImageAsync(
        img.url,
        fn_loadImageFinished,
        this
      );
      if (image !== null) {
        if (this._needUpdateImgSize) {
          img.x = 0;
          img.y = 0;
          img.width = image.width;
          img.height = image.height;
          this._needUpdateImgSize = false;
        }
        var rect = this.getRectInSelf();
        var left = rect.left;
        var top = rect.top;
        var width = rect.width;
        var height = rect.height;
        switch (this.mirror) {
          case 1: {
            render.save();
            render.scale(-1, 1);
            render.drawImageExt(image, img.x, img.y, img.width, img.height, left - width, top, width, height);
            render.restore();
            break;
          }
          case 2: {
            render.save();
            render.scale(1, -1);
            render.drawImageExt(image, img.x, img.y, img.width, img.height, left, top - height, width, height);
            render.restore();
            break;
          }
          case 3: {
            render.save();
            render.scale(-1, -1);
            render.drawImageExt(image, img.x, img.y, img.width, img.height, left - width, top - height, width, height);
            render.restore();
            break;
          }
          default: {
            render.drawImageExt(image, img.x, img.y, img.width, img.height, left, top, width, height);
            break;
          }
        }
      }
    }

    function sync_imgRender() {
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
          this._needUpdateImgSize = false;
        }
        if (this.getObserverByAllParams('render', render_img, this, this) === null) {
          this.addObserver('render', render_img, this, this);
        }
      } else {
        this.removeObserver('render', render_img, this, this);
      }
    }

    function fn_loadImageFinished(url, success) {
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

    return GSprite;

  }
)();