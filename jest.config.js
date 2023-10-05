module.exports = {
  "preset": 'react-native',
  "verbose": true,
  "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
  ],
  "transform": {
      "^.+\\.(ts|tsx|js)$": "babel-jest",
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "transformIgnorePatterns": [
      'node_modules/(?!@react-native|react-native|react-native-ui-lib)',
  ],
  "testPathIgnorePatterns": [
      "\\.snap$",
      "<rootDir>/node_modules/",
      "<rootDir>/e2e"
  ],
  "cacheDirectory": ".jest/cache"
};
