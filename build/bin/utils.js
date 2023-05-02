'use strict';
const join = require('path').join;
const fs = require('fs');

exports.toUnderLine = function (name) {
    let temp = name.replace(/[A-Z]/g, function (match) {
        return '_' + match.toLowerCase();
    });
    if(temp.slice(0, 1) === '_'){ //如果首字母是大写，执行replace时会多一个_，这里需要去掉
        temp = temp.slice(1);
    }
    return temp;
};
exports.toMiddleLine = function (name) {
    let temp = name.replace(/[A-Z]/g, function (match) {
        return '-' + match.toLowerCase();
    });
    if(temp.slice(0, 1) === '-'){ //如果首字母是大写，执行replace时会多一个_，这里需要去掉
        temp = temp.slice(1);
    }
    return temp;
};

/**
 *
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function deepFindFileInFolder(startPath) {
    const result=[];

    function find(path) {
        let files=fs.readdirSync(path);

        files.forEach((val,index) => {
            let fPath=join(path,val);
            let stats=fs.statSync(fPath);

            if(stats.isDirectory())
                find(fPath);
            if(stats.isFile())
                result.push(fPath);
        });

    }
    find(startPath);
    return result;
}

exports.deepFindFileInFolder = deepFindFileInFolder;