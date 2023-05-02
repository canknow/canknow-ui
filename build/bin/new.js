'use strict';

const utils = require('./utils');

process.on('exit', () => {
    console.log();
});

if (!process.argv[2]) {
    console.error('Please enter new components name');
    process.exit(1);
}

function lowerCamelCase(value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
}

const fs = require("fs");
const path = require('path');
const fileSave = require('file-save');
const upperCamelCase = require('uppercamelcase');
const componentName = lowerCamelCase(process.argv[2]);
const ComponentName = upperCamelCase(componentName);
const componentMiddleName = utils.toMiddleLine(ComponentName);
const PackagePath = path.resolve(__dirname, '../../src/components', componentName);
const files = [
    {
        filename: path.join(PackagePath, 'index.js'),
        content: `import ${ComponentName} from './src/${ComponentName}';

${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
    },
    {
        filename: path.join(PackagePath, `src/${ComponentName}.vue`),
        content: `<template>
  <div class="${componentMiddleName}"></div>
</template>

<script>
export default {
    name: '${ComponentName}'
};
</script>`
    },
    {
        filename: path.join(path.resolve(__dirname, '../../examples/src/docs'), `${componentName}.md`),
        content: `
:::demo
\`\`\`html
<template>
    <div>
        <${componentMiddleName}></${componentMiddleName}>
    </div>
</template>

<script>
    export default {
        name: '${ComponentName}Demo'
    }
</script>
\`\`\`
:::`
    },
    {
        filename: path.join(path.resolve(__dirname, '../../src/scss/components'), `${componentMiddleName}.scss`),
        content: `.${componentMiddleName} {}`
    },
];

// 添加到 components.json
const componentsFile = require('../../src/components.json');
if (componentsFile[ComponentName]) {
    console.log(`${ComponentName} 已存在.`);
}
componentsFile[ComponentName] = `./components/${componentName}/index.js`;
fileSave(path.join(__dirname, '../../src/components.json')).write(JSON.stringify(componentsFile, null, '  '), 'utf8').end('\n');

fs.appendFile("./src/scss/components/index.scss", `@import "${componentMiddleName}.scss";\n` , (error)  => {
    if (error)
        return console.log("追加样式引用失败" + error.message);
});

// 创建 package
files.forEach(file => {
    fileSave(file.filename).write(file.content, 'utf8').end('\n');
});

// 添加到 nav.config.json
const navConfigFile = require('../../examples/src/nav.config.json');
let groups = navConfigFile.menus[2].children;
groups.push({
    path: `/${componentMiddleName}`,
    name: componentName
});

fileSave(path.join(__dirname, '../../examples/src/nav.config.json'))
    .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
    .end('\n');

console.log('DONE!');
