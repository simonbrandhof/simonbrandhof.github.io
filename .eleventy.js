module.exports = function(eleventyConfig) {
	eleventyConfig.setTemplateFormats(["html", "njk", "md"]);
	eleventyConfig.addPassthroughCopy({
		"src/_includes/assets/img": "img",
		"src/admin/config.yml": "admin/config.yml",
		"src/media": "media"
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
