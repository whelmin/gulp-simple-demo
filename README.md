## 一个简单的gulp例子

### 一、改进前的项目目录结构

使用 `tree` 命令可生成项目的目录结构 `tree -I node_modules --dirsfirst -n` (忽略 `node_modules` 目录，目录优先))

```
  .
  ├── css
  │   ├── one.css
  │   └── two.css
  ├── js
  │   ├── one.js
  │   └── two.js
  ├── README.md
  ├── gulpfile.js
  ├── index.html
  ├── package-lock.json
  ├── package.json
  ├── dist
  │   ├── css
  │   │   └── bundle-49a88438ed.css
  │   ├── js
  │   │   └── bundle-8da21370a0.js
  │   └── index.html
  └── .gitignore
```

`gulp` 的配置文件默认是 `gulpfile.js`，当 task 增多时，此文件就会变得庞大，查找任务和路径都会比较费时。因此应当分离 `gulpfile.js`。

### 二、改进过程

官方建议可以从降低配置文件的耦合度和分割 task 两方面入手，进行项目优化。

1. 新建 `workflow` 目录
   
  ```
    .
    ├── config
    │   └── base.gulp.config.js                // 配置文件
    └── tasks                                  // 多个task
        ├── build.js
        └── clean.js
  ```

2. 解决重复引入依赖的问题

  虽然 `CommonJS` 规范重复引入的模块并不会重复执行(模块输出的是原始值的拷贝), 但每个 `task` 里面都引用一次仍然显得冗余无意义。

  可以通过在 `gulpfile.js` 中统一引入依赖（借助 `gulp-load-plugins` 插件 ），然后通过参数传递到各个子任务文件中去。

  ```javascript
    const fs = require('fs');
    const gulp = require('gulp');
    const config = require('./workflow/config/base.gulp.config')();
    const $ = require('gulp-load-plugins')({ lazy: true });
    const args = require('yargs').argv;

    const taskList = fs.readdirSync('./workflow/tasks/');
    taskList.forEach(function (file) {
      require('./workflow/tasks/' + file)(gulp, config, $, args);
    });
  ```

### 三、改进后的项目目录结构

```
  .
  ├── src
  │   ├── css
  │   │   ├── one.css
  │   │   └── two.css
  │   ├── js
  │   │   ├── one.js
  │   │   └── two.js
  │   └── index.html
  ├── workflow
  │   ├── config
  │   │   └── base.gulp.config.js
  │   └── tasks
  │       ├── build.js
  │       ├── clean.js
  │       └── version.js
  ├── README.md
  ├── gulpfile.js
  ├── package-lock.json
  └── package.json
```

`gulp clean` 删除 `dist` 目录

`gulp build` 打包 `src` 到 `dist` 目录

`gulp version` 获取项目版本信息

打包后 `dist` 目录的结构和内容

```
  .
  ├── dist
  │   ├── css
  │   │   └── bundle-d6126fc5ff.css
  │   ├── js
  │   │   └── bundle-8da21370a0.js
  │   └── index.html
```

### 四、参考链接

[马斯特-重构你的gulpfile](http://pinkyjie.com/2015/03/24/refactor-your-gulpfile/)

[官方建议：抽离配置文件](https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-external-config-file.md)

[官方建议：分离多任务到单文件中去](https://github.com/gulpjs/gulp/blob/master/docs/recipes/split-tasks-across-multiple-files.md)