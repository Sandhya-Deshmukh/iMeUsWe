// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };
module.exports = function (api) {
  api.cache(true);
  return {
      presets: [
          ['module:metro-react-native-babel-preset', { lazyImports: true }]
      ],
      // plugins: ['react-native-reanimated/plugin']
  };
};
