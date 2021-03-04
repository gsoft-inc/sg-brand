const path = require("path");

module.exports = {
    rootDir: path.resolve(__dirname, ".."),
    roots: ["<rootDir>/packages/react-components"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": path.resolve("jest/babel-transform.js")
    },
    // https://github.com/facebook/jest/issues/6229#issuecomment-403539460
    transformIgnorePatterns: [
        "/node_modules/(?!(@babel|@juggle)).+\\.js$"
    ],
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
        "\\.svg": "<rootDir>/jest/svgr-mock.js",
        "@utils/(.*)$": "<rootDir>/jest/utils/$1",
        "@react-components/(.*)$": "<rootDir>/packages/react-components/src/$1"
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "<rootDir>/jest/setup-jest.js"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/packages/react-components/dist"
    ],
    verbose: true
};

