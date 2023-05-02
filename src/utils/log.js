import log from 'canknow-ui-core/src/utils/log';

export default {
  warn (text) {
    return log.warning(`[${process.env.VUE_APP_NAME} Warn]` + text);
  },
  error (text) {
    return log.warning(`[${process.env.VUE_APP_NAME} Error]` + text);
  },
  migrating (text) {
    return log.warning(`[${process.env.VUE_APP_NAME} Migrating]` + text);
  }
};
