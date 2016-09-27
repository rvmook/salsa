exports.browserify = {
	watch: ['./src/assets/scripts/**'],
	entryPath: './src/assets/scripts/',
	bundles: ['main.js'],
	dest: 'public/assets/scripts'
};

exports.clean = 'public';

exports.copyAssets = {
	src: [
		'src/assets/**',
		'!src/assets/svgs/**',
		'!src/assets/scripts/**',
		'!src/assets/styles/**'
	],
	dest: 'public/assets/'
};

exports.copyScripts = {
	src: ['src/assets/scripts/*.min.js'],
	dest: 'public/assets/scripts'
};

exports.hbs = {
	partials: ['./src/handlebars/global-partials'],
	basePath: './src/handlebars/',
	dataRequire: '../../src/handlebars/data.json',
	watch: ['./src/handlebars/**'],
	dist: 'public/',
	minifyHTML: {
		removeComments: true,
		removeTagWhitespace: true,
		removeOptionalTags: true,
		minifyJS: true,
		minifyCSS: true
	}
};

exports.styles = {
	src: './src/assets/styles/**/*.scss',
	dest: 'public/assets/styles'
};

exports.uglify = {
	preserveComments: 'some',
	compress: {}
};

exports.eslint = [
	'./gulp/**/*.js',
	'./src/assets/scripts/**/*.js',
	'!./src/assets/scripts/libs/**/*.js',
	'!./src/assets/scripts/*.min.js'
];

exports.rev = {
	settings:{
		dontRenameFile: [/^\/favicon.ico$/g, /.html/g, /.png/g, /.jpg/g, /.gls/g]
	},
	src:'public/**',
	dest:'public'
};