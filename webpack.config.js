/**
 * Created by iswear on 2017/8/12.
 */
var path = require('path');

// module.exports = {
//   entry: './main.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   }
// };

module.exports = env => {
  if (env.profile === 'test') {
    return {
      entry: './test/game/main.js',
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/test')
      }
    }
  } else {
    return {
      entry: './main.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/build')
      }
    };
  }
};