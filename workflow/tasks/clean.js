/**
 * clean 任务
 *
 * @param {*} gulp 'gulp'
 * @param {*} config 'workflow/config/configgulp.config.js'
 * @param {*} $ 'gulp-load-plugins' // 自动加载 package.json 里的所有以 gulp-* 开头的
 * @param {*} args 'yargs' 用来接受命令行参数的
 */
const del = require('del');

module.exports = function (gulp, config, $, args) {
  gulp.task('clean', function () {
    return del([config.distDir]);
  });
};