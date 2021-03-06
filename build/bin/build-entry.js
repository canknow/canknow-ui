const Components = require('../../src/components.json');
const fs = require('fs');
const render = require('json-templater/string');
const path = require('path');
const endOfLine = require('os').EOL;

const OUTPUT_PATH = path.join(__dirname, '../../src/components.js');
const IMPORT_TEMPLATE = 'import {{ComponentName}} from \'./components/{{componentName}}/index.js\';';
const INSTALL_COMPONENT_TEMPLATE = '  {{ComponentName}}';
const MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */

{{include}}

export default {
{{install}}
};
`;

const ComponentNames = Object.keys(Components);

const includeComponentTemplate = [];
const installTemplate = [];

ComponentNames.forEach(ComponentName => {
    const componentName = ComponentName.charAt(0).toLowerCase() + ComponentName.slice(1);
    includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
        ComponentName: ComponentName,
        componentName: componentName
    }));

    installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
        ComponentName: ComponentName,
        componentName: componentName
    }));
});

const template = render(MAIN_TEMPLATE, {
    include: includeComponentTemplate.join(endOfLine),
    install: installTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);
