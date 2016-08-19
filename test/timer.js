var gre = require('../app');


// 自定义格式输出
var g = gre.create('[:time[hh:mm:ss]][:file::line] :message');

setInterval(() => {
    g.info('hello');
}, 1000)
