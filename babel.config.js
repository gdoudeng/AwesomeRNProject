module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ["transform-remove-console"],
    },
  },
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@src": "./src",
          "@components": "./src/components",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
