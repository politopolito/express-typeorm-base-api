module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"jest",
		"import",
	],
	parserOptions: {
		project: "./tsconfig.json"
	},
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:jest/recommended",
		"plugin:jest/style",
		"airbnb-base",
		"prettier",
		"plugin:@typescript-eslint/recommended",
		"airbnb-typescript/base",
		"plugin:import/typescript",
	],
	env: {
		"jest/globals": true,
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [ ".ts", ".tsx" ]
		},
		"import/resolver": {
			"typescript": {
				"alwaysTryTypes": true,
			}
		}
	},
	rules: {
		curly: "error",
		quotes: [ "error", "double" ],
		"array-bracket-spacing": [ "error", "always" ],
		"object-curly-newline": "error",
		"object-curly-spacing": [ "error", "always", { "arraysInObjects": true } ],
	}
};
