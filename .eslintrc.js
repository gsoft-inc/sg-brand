module.exports = {
    root: true,
    plugins: ["jest"],
    extends: [
        "@sharegate/eslint-config-recommended",
        "@sharegate/eslint-config-sort-imports",
        "@sharegate/eslint-config-lodash",
        "plugin:jest/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2018
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        "jest/globals": true
    }
};
