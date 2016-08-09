var path = require('path');
var gre = require('../app');

gre.token('id', () => {
    return 'guid'
})

let g = gre.create({
    format: 'prod',
    project: path.dirname(__dirname)
})

g.log('hello');
g.trace('hello', 'world');
g.debug('hello',  'world', 123);
g.info('hello',  'world', 123, {foo:'bar'});
g.warn('hello', 'world', 123, {foo:'bar'});
g.error('hello', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
