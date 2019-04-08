const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();


// Copying all the files and folders found in 'images'as a folder to dist folder
gulp.task('copy', (done) => {
    gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
    done();
  });

//Processing and copying all html files to dist
gulp.task('processHTML',(done)=> {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done(); 
});


//Processing and copying all javascript files to dist
//LINTING THE CODE by making it compatible to older browser versions with Jshint
//TRANSPILING THE CODE using Babel (DOESNT WORK!!!!!!!!!) ?
//MINIFYING THE CODE using Uglify   (DOESNT WORK!!!!!!!!!)
gulp.task('processJS',(done)=> {
    gulp.src('src/*.js')                      //  ./**/Project*\\[*.*\\]/test/**/*.js
    .pipe(jshint({
        esversion : 8
    }))
    .pipe(jshint.reporter('default'))

   /** 
    .pipe(babel({
        presets : ['env']
    }))
    .pipe(uglify())
    */
    
    .pipe(gulp.dest('dist'));
    done();
});

//LIVE RELOAD
gulp.task('browserSync', ()=> {

    browserSync.init({
        server: './dist',
        port: 8080,
        ui: {
            port: 8081
        }
    });
});

//Watching the files changes in the src folder and pass through Process HTML & JS, 
// also watchig the files changes in dist folder and do a browser reload.
gulp.task('watch', ()=> {
   gulp.watch('src/*.js',gulp.parallel('processJS'));
   gulp.watch('src/*.html',gulp.parallel('processHTML'));
 
   gulp.watch('./dist/*.js').on('change', browserSync.reload); 
   gulp.watch('./dist/*.html').on('change', browserSync.reload);
});




// BUILD A DEFAULT TASK TO RUN ALL THE TASKS
 gulp.task('default', gulp.parallel('copy','processHTML', 'processJS','browserSync','watch'));


 //gulp.task('default', gulp.series('processHTML', 'processJS','browserSync'),'watch');