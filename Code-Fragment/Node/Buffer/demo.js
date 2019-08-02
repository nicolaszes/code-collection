"use strict";
exports.__esModule = true;
/** @format */
var crypto = require('crypto');
var fs = require('fs');
exports.getFileInfo = function (filePath) {
    return new Promise(function (resolve, reject) {
        var start = new Date().getTime();
        var md5sum = crypto.createHash('md5');
        var stream = fs.createReadStream(filePath);
        var content = [];
        stream.on('data', function (chunk) {
            var buf = Buffer.from(chunk);
            md5sum.update(buf);
            content.push(buf);
        });
        stream.on('end', function () {
            var md5 = md5sum.digest('hex');
            resolve({ buf: Buffer.concat(content), md5: md5 });
            console.error('文件:' +
                filePath +
                ',MD5签名为:' +
                md5 +
                '.耗时:' +
                (new Date().getTime() - start) / 1000.0 +
                '秒');
        });
        stream.on('error', function (error) {
            reject(error);
        });
    });
};
exports.getFileInfo('/Users/zhangshuai/Downloads/阳光电影www.ygdy8.com.调音师.BD.720p.国印双语中字.mkv');
