// var path = require('path');
// var gre = require('../app');
//
// gre.token('id', () => {
//     return 'guid'
// })
//
// let g = gre.create({
//     format: 'prod',
//     project: path.dirname(__dirname)
// })
//
// g.log('hello');
// g.trace('hello', 'world');
// g.debug('hello',  'world', 123);
// g.info('hello',  'world', 123, {foo:'bar'});
// g.warn('hello', 'world', 123, {foo:'bar'});
// g.error('hello', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);

var gre = require('../app');
var os = require('os');

gre.token('hostname', () => os.platform())

// 自定义格式输出
var g = gre.create('[:time[hh:mm:ss]][:hostname][:file::line] :message');

g.log('hello');
g.trace('hello', 'world');
g.debug('hello',  'world', 123);
g.info('hello',  'world', 123, {foo:'bar'});
g.warn('hello', 'world', 123, {foo:'bar'});
g.error('hello', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
