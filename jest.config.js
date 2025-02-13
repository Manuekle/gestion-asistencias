export default {
  testMatch: [
    "**/test/**/*.test.js",
    "**/test/**/*.spec.js",
    "**/__tests__/**/*.js",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverage: false,
  passWithNoTests: true,
};
