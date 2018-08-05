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
      function syncImageRender () {
        this.removeObserver('render', renderImage, this, this);
        this.removeObserver('render', renderImageClip, this, this);
        if (this.image !== null && this.image !== '') {
          if (LangUtil.isString(this.image)) {
            this.addObserver('render', renderImage, this, this);
          } else {
            this.addObserver('render', renderImageClip, this, this);
          }
        }
      }

      function syncImageContext () {
        if (this.image !== null && this.image !== '') {
          var ctx = this._imageCtx;
          var image = this.image;
          ctx.progress = 0;
          if (LangUtil.isString(image)) {
            ctx.url = image;
          } else {
            ctx.url = image.url;
          }
        }
      }

      function renderImage (sender, render, dirtyZones) {
        var ctx = this._imageCtx;
        var image = loadImage.call(this, ctx.url);
        if (image !== null) {
          var rectInLocal = this.getRectInLocal();
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left - rectInLocal.left, dirtyZone.top - rectInLocal.top, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }
      
      function renderImageClip (sender, render, dirtyZones) {
        var ctx = this._imageCtx;
        var image = loadImage.call(this, ctx.url);
        if (image !== null) {
          var rectInLocal = this.getRectInLocal();
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            render.drawImageExt(image,
              dirtyZone.left - rectInLocal.left + ctx.x, dirtyZone.top - rectInLocal.top + ctx.y, dirtyZone.width, dirtyZone.height,
              dirtyZone.left, dirtyZone.top, dirtyZone.width, dirtyZone.height);
          }
        }
      }

      function loadImage (url) {
        var fileLoader = this.findApplication().getFileLoader();
        var image = fileLoader.loadImageAsync(url);
        if (image !== null) {
          loadImageSuccess.call(this, image);
          return image;
        } else {
          if (this._imageCtx.progress === 0) {
            fileLoader.loadImageAsync(url, loadImageFinished, this);
            this._imageCtx.progress = 1;
          }
          return null;
        }
      }

      function loadImageFinished (url, success) {
        if (success) {
          var image = this.findApplication().getFileLoader().loadImageAsync(url);
          if (image !== null) {
            loadImageSuccess.call(this, image);
          } else {
            loadImageFailed.call(this);
          }
        } else {
          loadImageFailed.call(this);
        }
      }

      function loadImageSuccess (image) {
        if (this._imageCtx.progress !== 2) {
          this._imageCtx.progress = 2;
          if (LangUtil.isString(this.image)) {
            this.width = image.width;
            this.height = image.height;
          } else {
            this.width = this.image.width;
            this.height = this.image.height;
            this._imageCtx.x = this.image.x;
            this._imageCtx.y = this.image.y;
            this._imageCtx.width = this.image.width;
            this._imageCtx.height = this.image.height;
          }
          this.refresh();
        }
      }

      function loadImageFailed () {
        this._imageCtx.progress = 3;
      }

      return {
        syncImageRender: syncImageRender,
        syncImageContext: syncImageContext
      }
    })();

    var GTexture = (function () {
      var InnerGTexture = LangUtil.extend(Node);

      InnerGTexture.prototype.defImage = null;
      InnerGTexture.prototype.defAnchorX = 0.5;
      InnerGTexture.prototype.defAnchorY = 0.5;
      InnerGTexture.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('image', LangUtil.checkAndGet(conf.image, this.defImage));

        this._imageCtx = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          url: null,
          progress: 0
        };

        functions.syncImageRender.call(this);
        functions.syncImageContext.call(this);

        this.addObserver('imageChanged', this.refresh, this, this);

        this.addObserver('imageChanged', functions.syncImageRender, this, this);
        this.addObserver('imageChanged', functions.syncImageContext, this, this);
      }

      return InnerGTexture;
    })();

    return GTexture;
  }
)();