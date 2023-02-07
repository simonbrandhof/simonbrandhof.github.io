const { EleventyI18nPlugin } = require("@11ty/eleventy");
const markdownIt = require("markdown-it");
const htmlmin = require('html-minifier');
const Image = require('@11ty/eleventy-img');

function imageShortcode(src, alt, sizes="(min-width: 1024px) 100vw, 50vw") {
	let options = {
		widths: [300, 600, 1500],
		formats: ["webp", "jpeg"],
		outputDir: 'build/img',
		urlPath: '/img'
	};

	// generate images, while this is async we don’t wait
	Image(src, options);

	let imageAttributes = {
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	let metadata = Image.statsSync(src, options);
	return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
	eleventyConfig.setTemplateFormats(["html", "njk", "md"]);
	eleventyConfig.addNunjucksShortcode("image", imageShortcode);
	eleventyConfig.addPassthroughCopy({
		"src/img": "img",
		"src/admin/config.yml": "admin/config.yml",
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
