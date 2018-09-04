import homyo from '../../main'

(function () {
  var Application = homyo.core.Application;
  var PropertyAnimation = homyo.core.animation.PropertyAnimation;
  var GTexture = homyo.game.Texture;

  var root = new GTexture({
    x: 200,
    y: 300,
    width: 200,
    height: 200,
    visible: true,
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536657006&di=f6e8dc17d395fd0841a24aa1f068ce3c&imgtype=jpg&er=1&src=http%3A%2F%2Fp2.qhimg.com%2Ft0193dcb0a279f6ec8f.jpg',
  });

  var application = new Application({
    canvas: document.getElementById('main'),
    root: root
  });

  application.run();
  // root.runAnimation(new PropertyAnimation({
  //   property: 'x',
  //   targetOffset: 400,
  //   offsetFn: function (animation, deltaTime, sumTime) {
  //     return 10 * sumTime / 1000;
  //   }
  // }), null, null, false);
  
  
  document.onclick = function () {
    console.log('yaya')
    root.x += 10;
  }

})();