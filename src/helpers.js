const fs = require('fs');
const path = require('path');

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function camelCase(str) {
  return str
    .split('-')
    .map((s, index) => {
      return (
        (index === 0 ? s[0].toLowerCase() : s[0].toUpperCase()) +
        s.slice(1).toLowerCase()
      );
    })
    .join('');
}

const checkValidEntry = ({ include, exclude, entry }) => {
  const shouldInclude = !include || include.test(entry);
  const shouldExclude = exclude && exclude.test(entry);
  return shouldInclude && !shouldExclude;
};

const scanIcons = (dir, options) => {
  const { include, exclude, match } = options;

  function readFilesRecursively(dir) {
    try {
      const files = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      entries.forEach((entry) => {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...readFilesRecursively(entryPath));
        } else {
          const isValidEntry = checkValidEntry({
            include,
            exclude,
            entry: entryPath,
          });

          if (isValidEntry && match) {
            const code = fs.readFileSync(entryPath, {
              encoding: 'utf-8',
            });
            const matches = code.match(match) || [];
            files.push(...matches);
          }
        }
      });
      return files;
    } catch (error) {
      console.error(`Dynamically icon loading error: ${error}`);
      return [];
    }
  }
  return readFilesRecursively(dir);
};

const styles = {
  fas: 'solid',
  fat: 'thin',
  fal: 'light',
  fad: 'duotone',
  far: 'regular',
};

const generateIconImportExpression = ({ iconList, license }, style) => {
  let importIcons = iconList
    .map((icon) => {
      const [prefix, name] = icon.match(/(\w-?)+/gi);
      const iconStyle = styles[prefix];
      if (iconStyle !== style) return;

      const iconName = `fa${capitalize(camelCase(name))}`;
      const dynamicIconName = `dynamic${capitalize(iconName)}${capitalize(
        iconStyle
      )}`;

      console.log({ dynamicIconName });

      return `${iconName} as ${dynamicIconName}`;
    })
    .filter(Boolean);

  importIcons = [...new Set(importIcons)].join(', ');

  if (!importIcons.length) return '';

  return `import { ${importIcons} } from '@fortawesome/${license}-${style}-svg-icons';`;
};

const generateDynamicIconList = (iconList) => {
  let dynamicIcons = iconList.map((icon) => {
    const [prefix, name] = icon.match(/(\w-?)+/gi);
    const iconName = `fa${capitalize(camelCase(name))}`;
    const iconStyle = styles[prefix];

    return `dynamic${capitalize(iconName)}${capitalize(iconStyle)}`;
  });

  return [...new Set(dynamicIcons)].join(', ');
};

const generateModuleScript = ({ iconList, license = 'free' }) => {
  const generateIconExpressionByStyle = generateIconImportExpression.bind(
    null,
    { iconList, license }
  );
  const dynamicIconList = generateDynamicIconList(iconList);

  return `
			import { library as iconLibrary } from '@fortawesome/fontawesome-svg-core';
			${generateIconExpressionByStyle(styles.far)}
			${generateIconExpressionByStyle(styles.fad)}
			${generateIconExpressionByStyle(styles.fal)}
			${generateIconExpressionByStyle(styles.fat)}
			${generateIconExpressionByStyle(styles.fas)}
			iconLibrary.add(${dynamicIconList});
			`;
};

const generateIconModule = ({ root, path: relativePath, pattern, license }) => {
  const directoryPath = path.join(root, relativePath);
  let iconRegexPattern = /['"]fa[srbtld]['"], *["'](?:\w-?)+["']/gim;

  if (pattern) {
    iconRegexPattern = new RegExp(pattern, 'gim');
  }

  const iconList = scanIcons(directoryPath, { match: iconRegexPattern });
  const scripts = generateModuleScript({ iconList, license });

  return scripts;
};

module.exports = generateIconModule;
