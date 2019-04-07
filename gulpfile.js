const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();


// Copying all the files and folders found in 'images'as a folder to dist folder
gulp.task('copy', () => {
    return gulp
      .src('images/**/*')
      .pipe(gulp.dest('dist/images'));
  });

//Processing and copying all html files to dist
gulp.task('processHTML', (done)=> {
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
    done();
});

//Processing and copying all javascript files to dist
//LINTING THE CODE by making it compatible to older browser versions with Jshint
//TRANSPILING THE CODE using Babel
//MINIFYING THE CODE using Uglify
gulp.task('processJS', (done)=> {
    gulp.src('*.js')
    .pipe(jshint({
        esversion : 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
        presets : ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
    done();
});

//Watching the files changes in the src folder and pass through Process HTML & JS, 
// also watchig the files changes in dist folder and do a browser reload.
gulp.task('watch', (done)=> {
    gulp.watch('*.js', [processJS]);
    gulp.watch('*.html', [processHTML]);

    gulp.watch('./dist/*.js', browserSync.reload);
    gulp.watch('./dist/*.html', browserSync.reload);
    done();
});

//LIVE RELOAD
gulp.task('browserSync', (done)=> {
    browserSync.init({
        server: './dist',
        port: 8080,
        url: {
            port: 8081
        }
    });
    done();
});

// BUILD A DEFAULT TASK TO RUN ALL THE TASKS
gulp.task('default', gulp.series('copy','processHTML', 'processJS', 'browserSync'),'watch');