function accessController(AccessController) {
  class NotesAccessController extends AccessController {

    static get type () { return "notesaccesscontroller" }

    async canAppend(entry, identityProvider) {

    }

    async block (identity) {

    }

    static async create(orbitdb, options) {
      return new NotesAccessController(orbitdb, options)
    }

    constructor(orbitdb, options) {
      this._orbitdb = orbitdb
      this._options = options
    }
  }
}

try {
    const AccessController = require('orbit-db-access-controllers/src/access-controller-interface')
    module.exports = accessController(AccessController)
} catch (e) {
    window.NotesAccessController = accessController(window.AccessController)
}
