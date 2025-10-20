export default {
	printWidth: 160,
	singleQuote: true,
	useTabs: true,
	overrides: [
		{
			files: ['*.json', '*.jsonc'],
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};
