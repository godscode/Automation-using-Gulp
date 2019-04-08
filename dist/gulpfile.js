const gulp = require('gulp');
const jshint = require('gulp-jshint');


gulp.task('processHTML', (done)=> {
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
    done();
});

gulp.task('processJS', (done)=> {
    gulp.src('*.js')
    .pipe(jshint({
        esversion: 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist'));
    done();
});