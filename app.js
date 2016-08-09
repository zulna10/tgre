/**
 * gre
 */

var is = require('aimee-is');
var path = require('path');
var colors = require('colors');
var tracer = require('tracer');
var Config = require('vpm-config');
var extend = require('aimee-extend');
var dateformat = require('date-format');
var regKey = /\:(\w+)/g;
var regTimeFormat = /\:time(\[.*?\])/;

var g = {

    makeTracerConfig(config) {
        let obj = {}
        this.config = config;
        obj.format = this.getFormat()
        obj.preprocess = config.preprocess;
        obj.filter = {
            log: colors.cyan,
            info: colors.green,
            warn: colors.yellow,
            debug: colors.blue,
            trace: colors.magenta,
            error: [ colors.red, colors.bold ]
        }
        return obj
    },

    // 查找tracer支持的keys
    getKeys(string) {
        return string.match(regKey)
    },

    // 获取日志文件相对项目的路径
    getRelativePath(data) {
        if(this.config.project){
            let pro = this.config.project
            let project = path.basename(pro)
            let relative = path.relative(pro, data.path)
            return path.join(project, relative)
        }
        return data.path
    },

    // 构建tracer支持的格式化规则
    getFormat() {
        let format = this.config.rules[this.config.format] || this.config.format
        let timeFormat = format.match(regTimeFormat) || ['','']
        let keys = format.match(regKey)

        // 时间格式化字符串
        format = format.replace(timeFormat[1], '');

        // 构建token
        keys.forEach(key => {
            let token = key.slice(1)
            // Tracer支持的keys
            if(this.config.keys.includes(token)){
                format = format.replace(key, `{{${token}}}`)
            }
            // 用户自定义的token
            else if(this.config.token[token]){
                format = format.replace(key, this.config.token[token](token === 'time' ? timeFormat[1]: null))
            }
            // 未知token
            else{
                format = format.replace(key, token)
            }
        })
        return format
    }
}

class Gre {

    constructor(options) {
        this.config = new Config;
        this.config.init({
            format: 'dev',
            color: true,
            project: null,
            dateformat: 'yyyy-MM-dd hh:mm:ss',
            keys: ['title', 'file', 'path', 'line', 'pos', 'message'],
            token: {
                time: (string) => {
                    string = string.replace(/[\[\]]/g, '')
                    return dateformat(string || this.config.get('dateformat'))
                }
            },
            rules: {
                dev: '[:file::line] :message',
                tiny: ':message',
                prod: '[:time[yyyy-MM-dd hh:mm:ss]][:title][:path::line] :message',
                full: '[:time[yyyy-MM-dd hh:mm:ss.SSS]][:title][:path::line] :message',
                time: '[:time[hh:mm:ss]][:file::line] :message',
                fulltime: '[:time][:file::line] :message'
            },
            preprocess: data => data.path = g.getRelativePath(data)
        })
        if(is.string(options)){
            this.config.set('format', options)
        }
        if(is.plainObject(options)){
            this.config.merge(options)
        }
    }

    // 自定义token
    token(key, fn) {
        this.config.set(`token.${key}`, fn)
        return this
    }

    // 创建一个tracer实例
    create(options, tracerOptions) {
        if(is.string(options)){
            this.config.set('format', options)
        }
        if(is.plainObject(options)){
            this.config.merge(options)
        }
        let config = this.config.get();
        let _config = g.makeTracerConfig(config);
        return config.color ?
            tracer.colorConsole(extend(tracerOptions, _config)):
            tracer.console(extend(tracerOptions, _config));
    }
}

let gre = new Gre('dev');
gre.Gre = Gre;
module.exports = gre['default'] = gre;
