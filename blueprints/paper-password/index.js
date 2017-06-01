/* eslint-env node */
module.exports = {
  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },
  afterInstall() {
    return this.addPackagesToProject([
      {name: 'ember-paper'},
      {name: 'ember-font-awesome'}
    ]);
  }
};
