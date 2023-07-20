module.exports = {
	root: true,
	// env: {
	// 	node: true,
	// },
	extends: [
		// 'plugin:react/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'react-app',
		'react-app/jest',
		'prettier',
	],
	parserOptions: {
		project: ['./tsconfig.json'],
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	// parserOptions: {
	// 	ecmaVersion: 2020,
	// },
	// rules: {
	// 	'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	// 	'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	// },
};
