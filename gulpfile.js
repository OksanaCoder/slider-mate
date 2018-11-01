var gulp = require('gulp');
    sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	cssmin = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	 cleanCSS = require('gulp-clean-css');
	 // babel = require('gulp-babel');

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/style/',
		img: 'build/images/',

	},
	src: {
		html: 'src/index.html',
		js: 'src/js/*.js',
		style: 'src/style/main.scss',
		img: 'src/images/**/*.*',
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		css: 'src/style/**/*.css',
		img: 'src/images/*.*',
	}

};


gulp.task('html', function () {
  return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
});

gulp.task('styles', function () {
	  gulp.src(path.src.style)
	  .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(cleanCSS())
         .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
});


gulp.task('scripts', function () {
	gulp.src(path.src.js)
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js));
});

gulp.task('images', function () {
	gulp.src(path.src.img)
		.pipe(imagemin([
		    imagemin.jpegtran({
				progressive: true
			}),
		    imagemin.optipng({
				optimizationLevel: 5
			}),
		    imagemin.svgo({
				plugins: [
					{

						removeViewBox: true
                    },
					{
						cleanupIDs: false
                    }
       			]
			})
		]))
		.pipe(gulp.dest(path.build.img));
});

// gulp.task('default', () =>
//     gulp.src(path.src.js)
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(gulp.dest(path.build.js))
// );

gulp.task('build', ['html', 'styles', 'scripts', 'images']);

gulp.task('watch', function () {
	gulp.watch(path.watch.style, ['styles']);
	gulp.watch(path.watch.css, ['styles']);
	gulp.watch(path.watch.img, ['images']);
	gulp.watch(path.watch.js, ['scripts']);

});

gulp.task('default', ['build', 'watch']);