/**
 *
 * Author: iswear(471291492@qq.com)
 * Date: 2017/8/18
 */
import LangUtil from '../utils/lang-util';
import GMap from './gmap';

export default (
  function () {
    var functions = (function () {
      function syncImg () {
        if (this.img !== null && this.img !== '') {
          var img = this._img;
          img.url = this.img;
          img.needAdjustMapSize = true;
          if (this.getObserverByAllParams('render', renderImg, this, this) === null) {
            this.addObserver('render', renderImg, this, this);
          }
        } else {
          this.removeObserver('render', renderImg, this, this);
        }
        this.render();
      }
      function renderImg (sender, render) {
        var img = this._img;
        var image = this.findApplication().getFileLoader().loadImageAsync(
          img.url,
          imageLoadFinished,
          this
        );
        if (image !== null) {
          if (img.needAdjustMapSize) {
            this.width = image.width;
            this.height = image.height;
            img.needAdjustMapSize = false;
          }
          var rect = this.getRectInLocal();
          var left = rect.left < this.containerLeft ? this.containerLeft : rect.left;
          var top = rect.top < this.containerTop ? this.containerTop : rect.top;
          var width = (rect.right < this.containerRight ? rect.right : this.containerRight) - left;
          var height = (rect.bottom < this.containerBottom ? rect.bottom : this.containerBottom) - top;
          render.drawImageExt(image, left, top, width, height, left, top, width, height);
        }
      }
      function imageLoadFinished (url, success) {
        this.refresh();
      }
      
      return {
        syncImg: syncImg
      }
    })();

    var GImageMap = (function () {
      var InnerGImageMap = LangUtil.extend(GMap);

      InnerGImageMap.prototype.defImg = null;
      InnerGImageMap.prototype.init = function (conf) {
        this.super('init', [ conf ]);
        this.defineNotifyProperty('img', LangUtil.checkAndGet(conf.img, this.defImg));

        this._img = {
          needAdjustMapSize: true,
          url: null,
          width: 0,
          height: 0
        };

        functions.syncImg.call(this);

        this.addObserver('imgChanged', functions.syncImg, this, this);
      }

      return InnerGImageMap
    })();

    return GImageMap;
  }
)();