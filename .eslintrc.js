module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'jest',
		'import',
	],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'plugin:@typescript-eslint/recommended',
				'airbnb-typescript/base',
				'plugin:import/typescript',
			],
			parserOptions: {
				project: "./tsconfig.json"
			}
		},
	],
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:jest/recommended',
		'plugin:jest/style',
		'plugin:node/recommended',
		'airbnb-base',
		'prettier',
	],
	env: {
		"jest/globals": true,
	},
	"settings": {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"]
		},
		"import/resolver": {
			"typescript": {
				"alwaysTryTypes": true,
			}
		}
	}
};
