import Application from '../common/core/application'
import Node from '../common/core/node'
import View from '../common/ui'

export default (function () {
  var app = new Application({

  });
  var root = new Node({
    x: 0,
    y: 0,
  });
  var uiRoot = new Node({
    x: 0,
    y: 0
  });
  var gameRoot = new Node({
    x: 0,
    y: 0,
  });

  var context = {
    game: {
      properties: {

      },
      binder: [

      ]
    },
    ui: {
      yaya: {
        
      }
    },
    map: {

    },
    object: {

    }
  }

  root.addChild(uiRoot);
  root.addChild(gameRoot);
  app.run();
})();