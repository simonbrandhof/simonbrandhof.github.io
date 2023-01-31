module.exports = function(eleventyConfig) {
	eleventyConfig.setTemplateFormats(["html", "njk", "md"]);
	eleventyConfig.addPassthroughCopy({
		"src/img": "img",
		"src/admin/config.yml": "admin/config.yml",
		"src/media": "media",
		"src/site.webmanifest": "./"
	});

	return {
		dir: {
			input: "src",
			output: "build"
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk"
	}
};
