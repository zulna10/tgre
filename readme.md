gre
---
日志输出


### Install
```sh
npm i gre --save
```

### Example 1
```js
var gre = require('gre');
// dev模式
var g = gre.create();

g.log('hello');
g.trace('hello', 'world');
g.debug('hello',  'world', 123);
g.info('hello',  'world', 123, {foo:'bar'});
g.warn('hello', 'world', 123, {foo:'bar'});
g.error('hello', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
```
==> Result :  
![result](img/1.png)

### Example 2
```js
var gre = require('gre');
// tiny模式 最小化输出
var g = gre.create('tiny');

g.log('hello');
g.trace('hello', 'world');
g.debug('hello',  'world', 123);
g.info('hello',  'world', 123, {foo:'bar'});
g.warn('hello', 'world', 123, {foo:'bar'});
g.error('hello', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
```
==> Result :  
![result](img/2.png)

### Example 3
```js
var gre = require('gre');
// prod模式
g = gre.create({
    format: 'prod',
    project: path.dirname(__dirname)
})

g.log('hello');
g.trace('hello', 'world');
g.debug('hello',  'world', 123);
g.info('hello',  'world', 123, {foo:'bar'});
g.warn('hello', 'world', 123, {foo:'bar'});
g.error('hello', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
```
==> Result :  
![result](img/3.png)

### Options
```js
{
    // 格式化字符串
    format: 'dev',
    // 是否彩色输出
    color: true,
    // 默认时间格式化字符串
    dateformat: 'yyyy-MM-dd hh:mm:ss'
}
```
