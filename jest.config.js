export default {
  testMatch: [
    "**/tests/**/*.test.js",
    "**/tests/**/*.spec.js",
    "**/__tests__/**/*.js",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.{js,jsx}", "!**/node_modules/**"],
  coverageReporters: ["json", "lcov", "text", "clover"],
  passWithNoTests: true,
};
