module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"jest",
		"import",
		"modules-newlines",
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
		"no-console": "off", // FOR TESTING ONLY

		/**
		 * Consistency & readability
		 */
		"class-methods-use-this": "off",
		"no-param-reassign": "off",
		curly: "error",
		"import/no-cycle": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "_.*" }],

		/**
		 * Styling
		 */
		"@typescript-eslint/quotes": [ "error", "double", { avoidEscape: true, allowTemplateLiterals: true } ],
		"array-bracket-spacing": [ "error", "always" ],
		"object-curly-newline": ["error", {
			multiline: true,
			minProperties: 2,
			consistent: true ,
		}],
		"object-property-newline": ["error", { allowAllPropertiesOnSameLine: false }],
		"comma-spacing": ["error", { before: false, after: true }],
		"comma-dangle": ["error", "always-multiline"],
		"key-spacing": ["error", { beforeColon: false, afterColon: true, mode: "strict", align: "colon" }],
		"object-curly-spacing": ["error", "always", { arraysInObjects: true } ],
		"function-paren-newline": ["error", { minItems: 3 }],
		"modules-newlines/import-declaration-newline": "error",
		"modules-newlines/export-declaration-newline": "error",
	}
};
