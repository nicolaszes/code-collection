var gulp = require('gulp');
var rev = require('gulp-rev');//给文件添加版本号
var revReplace = require('gulp-rev-replace');//更新index.html中的引用
var useref = require('gulp-useref');//合并js和css文件
var filter = require('gulp-filter');//过滤器：筛选，恢复
var uglify = require('gulp-uglify');//压缩js
var csso = require('gulp-csso');//压缩css
var imgmin = require('gulp-imagemin');//压缩图片
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


function compress(html) {
  var jsFilter = filter('**/*.js', {restore: true});
  var cssFilter = filter('**/*.css', {restore: true});
  var HtmlFilter = filter(['**/*', '!**/' + html],{restore: true});//排除首页

  return gulp.src('src/' + html)
    .pipe(useref())

    //压缩js
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)

    //压缩css
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)

    .pipe(HtmlFilter)
    .pipe(rev())
    .pipe(HtmlFilter.restore)
    .pipe(revReplace())
    .pipe(gulp.dest('dist'));
}


gulp.task('default', function () {
  gulp.src('src/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('src'));
});

//在命令行执行：gulp sass:watch，就可实现监听文件变化来自动编译
gulp.task('sass:watch', function () {
  gulp.watch('src/**/*.scss', ['default']);
});


gulp.task('index', function() {
  var html = 'index.html';
  compress(html);
});

gulp.task('projects', function() {
  var html = 'projects.html';
  compress(html);
});

gulp.task('portfolio', function() {
  var html = 'portfolio.html';
  compress(html);
});

gulp.task('tourism', function() {
  var html = 'tourism.html';
  compress(html);
});
