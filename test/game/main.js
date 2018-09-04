import homyo from '../../main'

(function () {
  var Application = homyo.core.Application;
  var GTexture = homyo.game.Texture;

  var application = new Application({
    canvas: document.getElementById('main'),
    root: new GTexture({
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536657006&di=f6e8dc17d395fd0841a24aa1f068ce3c&imgtype=jpg&er=1&src=http%3A%2F%2Fp2.qhimg.com%2Ft0193dcb0a279f6ec8f.jpg',
    })
  });

  application.run();
})();