const { createMacro } = require('babel-plugin-macros');
const generateIconModule = require('./helpers');

module.exports = createMacro(scanIcons, {
  configName: 'fa-dynamic',
});

function scanIcons({ references, state, babel, config }) {
  references.default.forEach((referencePath) => {
    const fileOpts = state.file.opts;
    const [firstArgumentPath] = referencePath.parentPath.get('arguments');

    const module = generateIconModule({ root: fileOpts.root, ...config });
    const scripts = babel.template(module, {
      preserveComments: true,
      placeholderPattern: false,
      ...fileOpts.parserOpts,
      sourceType: 'module',
    })();

    const scanIconsCallPath = firstArgumentPath.parentPath;
    scanIconsCallPath.replaceWithMultiple(scripts);
  });
}
