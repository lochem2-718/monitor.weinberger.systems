let gulp = require('gulp')

// script stuff
let terser = require('gulp-terser')
let typescript = require('gulp-typescript')
let elm = require('gulp-elm')

// style stuff
let clean_css = require('gulp-clean-css')
let sass = require('gulp-sass')
sass.compiler = require('node-sass')

// convenience stuff
let src = gulp.src
let dest = gulp.dest

function compile_ts() {
    let tsOptions = {
        module: 'commonjs',
        esModuleInterop: true,
        target: 'es6',
        strict: true,
        moduleResolution: 'node',
        sourceMap: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true
    }
    let project = typescript.createProject('tsconfig.json')
    return src('src/**/*.ts')
            .pipe(project())
            .js
            .pipe(terser())
            .pipe(dest('dist'))
}

function compile_elm() {
    let elmOptions = {
        cwd: './client-app',
        optimize: true
    }
    let outputFile = 'main.js'
    let terserOptions = {
        compress: {
            drop_debugger: false,
            pure_getters: true,
            keep_fargs: false,
            pure_funcs: [ 'F2', 'F3','F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9' ],
            unsafe_comps: true,
            unsafe: true,
        },
        mangle: true,
    }
    return src('./client-app/**/Main.elm')
        .pipe(elm.bundle(outputFile, elmOptions))
        .pipe(terser(terserOptions))
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

function move_config() {
    return src('config/*')
        .pipe(dest('dist/config'))
}

exports.default = gulp.parallel(compile_style, compile_ts, compile_elm, move_images, move_icon)
exports.elm = compile_elm
exports.ts = compile_ts
exports.style = compile_style
exports.images = move_images
exports.icon = move_icon

