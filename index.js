/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-26
 */

require('babel-register')({
  'presets': ['es2015', 'stage-0'],
  'plugins': [
    [
      'babel-plugin-relative-import',
      {
        'rootPathSuffix': 'server/'
      }
    ]
  ]
});

require('./server');
