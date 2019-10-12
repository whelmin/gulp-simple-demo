/**
 * version 任务, 获取项目的版本
 *
 * @param {*} gulp 'gulp'
 * @param {*} config 'workflow/config/configgulp.config.js'
 * @param {*} $ 'gulp-load-plugins' // 自动加载 package.json 里的所有以 gulp-* 开头的
 * @param {*} args 'yargs' 用来接受命令行参数的
 */
const fs = require('fs');

module.exports = function (gulp, config, $, args) {
  gulp.task('version', function (done) {
    console.log('Current project version: ', getPackageJsonVersion());
    done();
    function getPackageJsonVersion () {
      // We parse the json file instead of using require because require caches
      // multiple calls so the version number won't be updated
      return JSON.parse(fs.readFileSync(config.packageJson, 'utf8')).version;
    };
  });
};