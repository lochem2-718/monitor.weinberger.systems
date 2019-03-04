let gulp = require('gulp')

// script stuff
let terser = require('gulp-terser')
let typescript = require('gulp-typescript')

// style stuff
let clean_css = require('gulp-clean-css')
let sass = require('gulp-sass')
sass.compiler = require('node-sass')

// convenience stuff
let src = gulp.src
let dest = gulp.dest

function compile_scripts() {
    let compilerOptions = {
        module: "commonjs",
        esModuleInterop: true,
        target: "es6",
        strict: true,
        moduleResolution: "node",
        sourceMap: true
    }
    return src('src/**/*.ts')
            .pipe(typescript(compilerOptions, typescript.reporter.fullReporter(true)))
            .pipe(terser())
            .pipe(dest('dist'))
}

function compile_style() {
    return src('src/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(clean_css())
        .pipe(dest('dist'))
}

function move_images() {
    return src('src/public/images/*')
        .pipe(dest('dist/public/images'))
}

function move_icon() {
    return src('src/public/favicon.ico')
        .pipe(dest('dist/public'))
}

exports.default = gulp.parallel(compile_style, compile_scripts, move_images, move_icon)
exports.scripts = compile_scripts
exports.style = compile_style
exports.images = move_images
exports.icon = move_icon

