/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import LangUtil from '../../utils/lang-util';
import GeometryUtil from '../../utils/geometry-util';
import GMap from './g-map';

export default (
  function () {
    var functions = (function () {
      function syncBackgroundImageRender () {
        this.removeObserver('render', renderBackgroundImage, this, this);
        this.removeObserver('render', renderBackgroundImageClip, this, this);
        if (this.backgroundImage !== null && this.backgroundImage !== '') {
          if (LangUtil.isString(this.backgroundImage)) {
            this.addObserver('render', renderBackgroundImage, this, this);
          } else {
            this.addObserver('render', renderBackgroundImageClip, this, this);
          }
        }
      }

      function syncBackgroundImageContext () {
        if (this.backgroundImage !== null && this.backgroundImage !== '') {
          var ctx = this._backgroundImageCtx;
          var image = this.backgroundImage;
          ctx.invalid = true;
          if (LangUtil.isString(image)) {
            ctx.url = image;
          } else {
            ctx.url = image.url;
          }
        }
      }

      function renderBackgroundImage (sender, render, dirtyZones) {
        var image = loadImage.call(this);
        if (image !== null) {
          var mapRectInLocal = this.getMapRectInLocal();
          var offsetLeft = - mapRectInLocal.left;
          var offsetTop = - mapRectInLocal.top;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            var crossRect = GeometryUtil.getRectCross(mapRectInLocal, dirtyZone);
            render.drawImageExt(image,
              crossRect.left + offsetLeft, crossRect.top + offsetTop, crossRect.width, crossRect.height,
              crossRect.left, crossRect.top, crossRect.width, crossRect.height
            );
          }
        }
      }

      function renderBackgroundImageClip (sender, render, dirtyZones) {
        var image = loadImage.call(this);
        if (image !== null) {
          var ctx = this._backgroundImageCtx;
          var mapRectInLocal = this.getMapRectInLocal();
          var offsetLeft = ctx.x - mapRectInLocal.left;
          var offsetTop = ctx.y - mapRectInLocal.top;
          for (var i = 0, len = dirtyZones.length; i < len; ++i) {
            var dirtyZone = dirtyZones[i];
            var crossRect = GeometryUtil.getRectCross(mapRectInLocal, dirtyZone);
            render.drawImageExt(image,
              crossRect.left + offsetLeft, crossRect.top + offsetTop, crossRect.width, crossRect.height,
              crossRect.left, crossRect.top, crossRect.width, crossRect.height
            );
          }
        }
      }

      function loadImage () {
        var ctx = this._backgroundImageCtx;
        var image = this.findApplication().loadImage(ctx.url, true);
        if (ctx.invalid && image !== null) {
          if (LangUtil.isString(this.backgroundImage)) {
            ctx.x = 0;
            ctx.y = 0;
            ctx.width = image.width;
            ctx.height = image.height;
          } else {
            ctx.x = this.backgroundImage.x;
            ctx.y = this.backgroundImage.y;
            ctx.width = this.backgroundImage.width;
            ctx.height = this.backgroundImage.height;
          }
          ctx.invalid = false;
        }
        return image;
      }

      return {
        syncBackgroundImageRender: syncBackgroundImageRender,
        syncBackgroundImageContext: syncBackgroundImageContext
      };
    })();

    var GImageMap = (function () {
      var InnerGImageMap = LangUtil.extend(GMap);

      InnerGImageMap.prototype.defImg = null;
      InnerGImageMap.prototype.init = function (conf) {
        this.super('init', [conf]);
        this.defineNotifyProperty('backgroundImage', LangUtil.checkAndGet(conf.backgroundImage, null));
        this.defineNotifyProperty('backgroundScrollX', LangUtil.checkAndGet(conf.backgroundScrollX, false));
        this.defineNotifyProperty('backgroundScrollY', LangUtil.checkAndGet(conf.backgroundScrollY, false));

        this._backgroundImageCtx = {
          invalid: true,
          url: null,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        };

        functions.syncBackgroundImageRender.call(this);
        functions.syncBackgroundImageContext.call(this);

        this.addObserver('backgroundImageChanged', this.refresh, this, this);
        this.addObserver('backgroundScrollXChanged', this.refresh, this, this);
        this.addObserver('backgroundScrollYChanged', this.refresh, this, this);

        this.addObserver('backgroundImageChanged', functions.syncBackgroundImageRender, this, this);
        this.addObserver('backgroundImageChanged', functions.syncBackgroundImageContext, this, this);
      }

      return InnerGImageMap;
    })();

    return GImageMap;
  }
)();