module.exports = function () {
  const cssDir = 'src/css';
  const jsDir = 'src/js';
  const html = 'src/index.html';
  const distDir = 'dist';
  const srcDir = 'src';
  const packageJson = 'package.json';
  return {
    cssDir: cssDir,
    jsDir: jsDir,
    distDir: distDir,
    srcDir: srcDir,
    packageJson: packageJson,
    html: html,
    js: jsDir + '/**.js',
    css: cssDir + '/**.css'
  };
};