const htmlmin = require("html-minifier-terser");
const Image = require("@11ty/eleventy-img");
const path = require("path");

async function imageShortcode(src, alt, sizes = "100vw", loading = "lazy", fetchpriority = "auto") {
  let metadata = await Image(src, {
    widths: [300, 600, 1200],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./public/img/",
    urlPath: "/img/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  let imageAttributes = {
    alt,
    sizes,
    loading,
    decoding: "async",
    fetchpriority
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function(code) {
    return code; // already minified
  });

  eleventyConfig.addShortcode("readFile", function(filePath) {
    const fs = require("fs");
    return fs.readFileSync(filePath, "utf8");
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  eleventyConfig.addPassthroughCopy({ "src/assets/css/style.css": "assets/css/style.css" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js/main.js": "assets/js/main.js" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "layouts",
      data: "data"
    }
  };
};
