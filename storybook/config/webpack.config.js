const path = require("path");
const createMdxCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");
const remarkSlug = require("remark-slug");
const remarkExternalLinks = require("remark-external-links");

function supportCssModules(config) {
    const cssRules = config.module.rules.find(rule => rule.test.toString() === "/\\.css$/");
    const cssLoader = cssRules.use[1];
    const postCssLoader = cssRules.use[2];

    cssRules.exclude = /\.module\.css$/;

    config.module.rules.push({
        test: /\.module\.css$/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    ...cssLoader.options,
                    modules: true
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    ...postCssLoader.options
                }
            }
        ]
    });
}

function supportDocsAddon(config) {
    const babelOptions = {
        plugins: ["@babel/plugin-transform-react-jsx"]
    };

    const mdxPlugins = {
        remarkPlugins: [
            remarkSlug,
            remarkExternalLinks
        ]
    };

    config.module.rules.push({
        test: /\.(stories)\.mdx$/,
        use: [
            {
                loader: "babel-loader",
                options: babelOptions
            },
            {
                loader: "@mdx-js/loader",
                options: {
                    compilers: [createMdxCompiler({})],
                    ...mdxPlugins
                }
            }
        ]
    });

    config.module.rules.push( {
        test: /\.mdx$/,
        exclude: /\.(stories).mdx$/,
        use: [
            {
                loader: "babel-loader",
                options: babelOptions
            },
            {
                loader: "@mdx-js/loader",
                options: {
                    ...mdxPlugins
                }
            }
        ]
    });
}

function addAliases(config) {
    const storybookAlias = config.resolve.alias || {};

    config.resolve.alias = {
        ...storybookAlias,
        "@stories": path.resolve(__dirname, "../stories/"),
        "@utils": path.resolve(__dirname, "../stories/utils/"),
        "@components": path.resolve(__dirname, "../stories/components/"),
        "@react-components": path.resolve(__dirname, "../../packages/react-components/components/")
    };
}

function bundleCustomReactComponents(config) {
    // Otherwise webpack babel-loader will only handle files in /storybook.
    config.module.rules[0].include.push(path.resolve(__dirname, "../..", "packages/react-components/components"));
}

// NOTE: the source-loader config has not been added to this webpack config, we dont seem to need it.
// For more info about the docs addon config: https://github.com/storybookjs/storybook/blob/next/addons/docs/README.md#manual-configuration
module.exports = async ({ config }) => {
    supportCssModules(config);
    addAliases(config);
    supportDocsAddon(config);
    bundleCustomReactComponents(config);

    return config;
};
