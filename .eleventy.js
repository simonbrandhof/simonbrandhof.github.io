const { EleventyI18nPlugin } = require("@11ty/eleventy");
const markdownIt = require("markdown-it");
const htmlmin = require('html-minifier')

module.exports = function(eleventyConfig) {

	eleventyConfig.setTemplateFormats(["html", "njk", "md"]);

	eleventyConfig.addPassthroughCopy({
		"src/img": "img",
		"src/admin/config.yml": "admin/config.yml",
		"src/media": "media",
		"src/site.webmanifest": "site.webmanifest"
	});

	// watch change changes of tailwind generated css
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.watchIgnores.delete("./build/css/");
	eleventyConfig.addWatchTarget("./build/css/");

	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en"
	});

	eleventyConfig.addFilter("md", function (content = "") {
		return markdownIt({ html: true }).render(content);
	});

	eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
		if (
			process.env.ELEVENTY_PRODUCTION &&
			outputPath &&
			outputPath.endsWith('.html')
		) {
			return htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			})
		}

		return content
	})

	return {
		dir: {
			input: "src",
			output: "build"
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk"
	}
};
