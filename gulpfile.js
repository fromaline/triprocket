const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const path = require('path'),
  del = require('del'),
  fs = require('fs')

const browserSync = require('browser-sync').create(),
  reload = browserSync.reload

const gulp = require('gulp'),
  watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify-es').default,
  plumber = require('gulp-plumber'),
  data = require('gulp-data')

const rollup = require('gulp-better-rollup'),
  babel = require('rollup-plugin-babel'),
  resolve = require('rollup-plugin-node-resolve'),
  commonjs = require('rollup-plugin-commonjs'),
  nodeResolve = require('rollup-plugin-node-resolve'),
  globals = require('rollup-plugin-node-globals')

const postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssDeclarationSorter = require('css-declaration-sorter'),
  postcssPresetEnv = require('postcss-preset-env'),
  cssnano = require('cssnano'),
  gulpStylelint = require('gulp-stylelint')

const sass = require('gulp-sass')
sass.compiler = require('node-sass')

const pug = require('gulp-pug')

const svgmin = require('gulp-svgmin'),
  svgSprite = require('gulp-svg-sprite')

const paths = {
  src: {
    root: path.join(__dirname, 'src'),
    templates: path.join(__dirname, 'src', 'templates'),
    data: path.join(__dirname, 'src', 'data'),
    js: path.join(__dirname, 'src', 'js'),
    css: path.join(__dirname, 'src', 'scss'),
    svg: path.join(__dirname, 'src', 'svg'),
  },
  dist: {
    root: path.join(__dirname, 'dist'),
    js: path.join(__dirname, 'dist', 'assets', 'js'),
    css: path.join(__dirname, 'dist', 'assets', 'css'),
    images: path.join(__dirname, 'dist', 'assets', 'images'),
  },
}

const postcssPlugins = [
  postcssPresetEnv({
    stage: 0,
    autoprefixer: false,
    features: {
      block_reusable: true,
    },
  }),
  cssDeclarationSorter({ order: 'smacss' }),
]

if (isProd) {
  postcssPlugins.push(
    cssnano({
      presets: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
    autoprefixer({ grid: true })
  )
}

const templating = () => {
  return gulp
    .src(path.join(paths.src.templates, 'pages', '*.pug'))
    .pipe(
      plumber({
        handleError: function (err) {
          console.log(err)
          this.emit('end')
        },
      })
    )
    .pipe(
      data(function (file) {
        return JSON.parse(
          fs.readFileSync(
            path.join(
              paths.src.data,
              `${path.basename(file.path).replace(/\.[^/.]+$/, '')}.json`
            )
          )
        )
      })
    )
    .pipe(
      pug({
        doctype: 'html',
      })
    )
    .pipe(gulp.dest(paths.dist.root))
    .pipe(browserSync.stream())
}

const styles = () => {
  const info = {
    name: 'style.css',
  }

  const sassStream = gulp
    .src(path.join(paths.src.css, 'style.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(info.name))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream())

  return sassStream
}

const stylelint = () => {
  const info = {
    src: [
      'src/scss/**/*.scss',
      '!src/scss/plugins/**/*.scss',
      '!src/scss/foundation/**/*.scss',
    ],
  }
  return gulp.src(info.src).pipe(
    gulpStylelint({
      failAfterError: false,
      reporters: [{ formatter: 'string', console: true }],
    })
  )
}

const js = () => {
  const js = gulp
    .src(path.join(paths.src.js, 'core.js'))
    .pipe(
      plumber({
        handleError: function (err) {
          console.log(err)
          this.emit('end')
        },
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      rollup(
        {
          plugins: [
            nodeResolve({ preferBuiltins: false }),
            babel({
              exclude: ['node_modules/**', '*.json'],
              presets: [['@babel/preset-env']],
            }),
            resolve(),
            commonjs(),
            globals(),
          ],
        },
        'umd'
      )
    )
    .pipe(uglify({ compress: isProd }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream())

  return js
}

const svg = () => {
  return gulp
    .src(path.join(paths.src.svg, '*.svg'))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: 'sprite.svg',
          },
        },
      })
    )
    .pipe(gulp.dest(paths.dist.images))
}

const clean = () => {
  const files = [
    path.join(paths.dist.js, 'core.js'),
    path.join(paths.dist.js, 'core.js.map'),
    path.join(paths.dist.css, 'style.css'),
    path.join(paths.dist.css, 'style.css.map'),
    path.join(paths.dist.root, '*.html'),
  ]

  return del(files)
}

const selectedClean = files => {
  return del(files)
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html',
      injectChanges: false,
    },
    open: false,
    ghostMode: false,
    notify: false,
  })

  watch(
    './src/js/**/*',
    gulp.series(
      selectedClean.bind(this, [
        path.join(paths.dist.js, 'core.js'),
        path.join(paths.dist.js, 'core.js.map'),
      ]),
      js
    )
  )

  watch(
    ['./src/scss/**/*', './.stylelintrc.json'],
    gulp.series(
      selectedClean.bind(this, [
        path.join(paths.dist.css, 'style.css'),
        path.join(paths.dist.css, 'style.css.map'),
      ]),
      stylelint,
      styles
    )
  )

  watch('./.stylelintrc.json', gulp.series(stylelint))

  watch(
    ['./src/templates/**/*', './src/data/**/*'],
    gulp.series(
      selectedClean.bind(this, [path.join(paths.dist.root, '*.html')]),
      templating
    )
  )

  watch(
    ['./src/svg/*.svg'],
    gulp.series(
      selectedClean.bind(this, [path.join(paths.dist.images, 'sprite.svg')]),
      svg
    )
  )
}

const liveReload = () => {
  watch(
    ['./dist/**/.html', './dist/assets/js/*.js', './dist/assets/images/*'],
    gulp.series(reload)
  )
}

const baseTask = gulp.series(clean, gulp.parallel(styles, js, templating, svg))

const dev = gulp.series(baseTask, watchFiles, liveReload)

const build = gulp.series(baseTask)

exports.dev = dev
exports.build = build
