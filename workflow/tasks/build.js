/**
 * build 任务
 *
 * @param {*} gulp 'gulp'
 * @param {*} config 'workflow/config/configgulp.config.js'
 * @param {*} $ 'gulp-load-plugins' // 自动加载 package.json 里的所有以 gulp-* 开头的
 * @param {*} args 'yargs' 用来接受命令行参数的
 */
module.exports = function (gulp, config, $, args) {
  gulp.task('build', function () {
    const jsFilter = $.filter(config.js, { restore: true });
    const cssFilter = $.filter(config.css, { restore: true });
    // 排除 index.html, 不对 index.html 添加 hash 值
    const excludeIndexHtmlFilter = $.filter([`${config.srcDir}/**`, `!${config.html}`], { restore: true });
    if (args.dev) {
      // build dev env
      console.log('build dev env');
    }
    if (args.test) {
      // build test env
      console.log('build test env');
    }
    if (args.release) {
      // build release env
      console.log('build release env');
    }
    return gulp.src(config.html)
      // 分析带有useref注释的语句，将包括的js、css文件放进文件流
      .pipe($.useref())
      // 将js文件筛选出来
      .pipe(jsFilter)
      // 将js文件进行压缩
      .pipe($.uglify())
      // 通过restore将js文件重新扔回文件流里面
      .pipe(jsFilter.restore)

      // css文件处理
      .pipe(cssFilter)
      .pipe($.autoprefixer())
      .pipe($.csso())
      .pipe(cssFilter.restore)

      // 给文件添加版本号
      .pipe(excludeIndexHtmlFilter)
      .pipe($.rev())
      .pipe(excludeIndexHtmlFilter.restore)
      // 更新文件里的引用
      .pipe($.revReplace())

      // dest表示已经结束，将文件流扔入到'dist目录下'
      .pipe(gulp.dest(config.distDir));
  });
};