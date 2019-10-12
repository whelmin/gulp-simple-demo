const fs = require('fs');
const gulp = require('gulp');
const config = require('./workflow/config/base.gulp.config')();
const $ = require('gulp-load-plugins')({ lazy: true });
const args = require('yargs').argv;

const taskList = fs.readdirSync('./workflow/tasks/');
taskList.forEach(function (file) {
  require('./workflow/tasks/' + file)(gulp, config, $, args);
});