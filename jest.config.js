module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)/.*|@expo-vector-icons|react-native-vector-icons|@react-navigation|expo-router|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|axios)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
