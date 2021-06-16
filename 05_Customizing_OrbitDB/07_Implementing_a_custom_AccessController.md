# Implementing a custom Access controllers

And after these things, let us now consider
how we might implement a custom access controller.

Starting with the rules, that we want
to implement:

- The creator should be the only one to upload notes pieces.
- Anyone can comment by default.
- The author of a comment and the creator can delete a comment.
- The creator can ban somebody from commenting on the entire database.

## Implementation

Similarly to the `Store`s,
Access Controllers are implemented
using inherited classes.
Let's implement a `NotesAccessController.js`
file with these Isomorphic bookends:

```js
function accessController(AccessController) {
  class NotesAccessController extends AccessController {

    static get type () { return "notesaccesscontroller" }

    async canAppend(entry, identityProvider) {

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

```
All ACs inherit from an AccessController class,
which defines [an interface](https://github.com/orbitdb/orbit-db-access-controllers/blob/main/src/access-controller-interface.js).

And they all get access to the `orbitdb` instances which
will be used later.

## Architecture of the AC
But first let us think about, how we want to construct the AC
and how moderating should work.

So, let's define some requirements:
1. Only the owner can add notes to a DB.
2. The owner can choose at creation whether to use a blacklist or whitelist mode.

### Whitelist mode
Whitelist means that everybody is blocked by default
and has to be added to a whitelist to make comments.

### Blacklist mode
Blacklist means that everybody is allowed to comment
by default and has to be added to a blacklist to make
comments.

### Acccess Controller Database
To store the whitelist and blacklist in a database
inside the AC, with a `ipfs-access-controller`.

#### `ipfs-access-controller`
This is the most primitive AC, it
only has a single creator, who is the
only identity, that can make changes to the DB.

## Creating the AC
When creating a db, you pass in a object as
options, that contains a `accessController` key.
The object at this key is passed as `options`
to the `NotesAccessController.create` function
as the second argument after the `orbitdb` instance.
