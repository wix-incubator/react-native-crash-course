module.exports = {
  resolver: {
    sourceExts: process.env.RN_SOURCE_EXTENSIONS ? process.env.RN_SOURCE_EXTENSIONS.split(',').concat(['ts', 'tsx', 'js']) : ['js'],
  },
};
