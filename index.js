/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-26
 */
require('dotenv').config({ silent: true });

require('babel-register')({
  'presets': ['es2015', 'stage-0'],
  'plugins': [
    'add-module-exports',
    [
      'babel-plugin-relative-import',
      {
        'rootPathSuffix': 'server/'
      }
    ]
  ]
});

require('./server');
