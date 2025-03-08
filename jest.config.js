export default {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
  testMatch: ["**/*.test.js"], // Only run files ending with .test.js
};




  