TS.js.templates["novel outline"] = {
  "plain text": function () {
    return ``;
  },
  "rich text": function() {
    let obj = {
      object_root: {
        type: 'rich text',
        editor: 'rich text'
      },
      "main": ``
    }
    return obj
  },
  "markdown": function() {
    let obj = {
      object_root: {
        type: 'markdown',
        editor: 'markdown'
      },
      "main": ``
    }
    return obj
  },
  container: function () {
    return {
      object_root: {
        type: 'collection'
      }
    };
  },
  character: function () {
    let obj = {
      object_root: {
        type: 'markdown',
        editor: 'markdown'
      },
      "main": `**blurb:**  \n**appearance:**  \n**personality:**  \n**brief timeline:** `
    }
    return obj;
  },
  chapter: function () {
    let obj = {
      object_root: {
        type: 'collection'
      },
      "blurb": {
        object_root: {
          type: 'markdown',
          editor: 'markdown'
        },
        "main": ``
      },
      "locations": {
        object_root: {
          type: 'markdown',
          editor: 'markdown'
        },
        "main": ``
      },
      "characters": {
        object_root: {
          type: 'markdown',
          editor: 'markdown'
        },
        "main": ``
      },
      "list main points": {
        object_root: {
          type: 'markdown',
          editor: 'markdown'
        },
        "main": ``
      },
      "deeper runthrough": {
        object_root: {
          type: 'collection'
        }
      }
    };
    return obj;
  }
}
