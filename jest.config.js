module.exports = {
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: [
      "controllers/**/*.js",
      "routes/**/*.js",
      "middleware/**/*.js",
      "index.js"
    ]
  };
  