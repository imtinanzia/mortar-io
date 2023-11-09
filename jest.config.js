module.exports = {
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./setupTests.js"],
};
