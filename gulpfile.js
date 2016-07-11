var gulp = require('gulp');

gulp.task('static-files', function() {
    gulp.src(["www/*", "./node_modules/react/dist/react.js", "node_modules/react-dom/dist/react-dom.js"])
        .pipe(gulp.dest('dist/client/'))
})