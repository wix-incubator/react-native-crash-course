module.exports = {
  getSourceExts: () => process.env.RN_SRC_EXT ?
    process.env.RN_SRC_EXT.split(',') : []
};
