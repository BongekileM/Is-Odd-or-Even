/**
 * Jest configuration file for the is-odd-or-even project.
 * Configures babel-jest as the transformer for JavaScript files,
 * sets the test environment to Node, and ensures mocks are cleared between tests.
 */

export default {
  // Use babel-jest to transform JavaScript files using Babel
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  // Set test environment to Node.js for a backend/CLI environment
  testEnvironment: "node",
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Uncomment below to enable verbose output for easier debugging during development
  // verbose: true,
  // Uncomment below to enable code coverage reporting
  // collectCoverage: true,
  // coverageDirectory: "coverage",
};
