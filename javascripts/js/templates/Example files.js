TS.js.templates['Example files'] = function() {
  let obj = {
    "master_root": {
      type: "folder",
      dateCreated: (new Date()).toLocaleString(),
      dateModified: (new Date()).toLocaleString(),
      version: "3.13.0",
      shadowTree: {}
    },
    "files": {
      "libraries": {
        "master_root": {
          type: "folder",
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          version: "3.13.0",
          shadowTree: {}
        },
        "files": {
          'lycelia jsdom': {
            "master_root": {
              templates: 'TS.js.templates.html5',
              exportFormat: "",
              type: "library",
              dateCreated: (new Date()).toLocaleString(),
              dateModified: (new Date()).toLocaleString(),
              version: "3.1.0",
              shadowTree: {}
            },
            "#general": {
              "title": `ex: Utility Functions or JS Plugins`,
              "blurb": ``,
              "required/suggested inputs": "example of how to run: libName(jquery, underscore)",
              "license": ``,
              "Contributors": ``,
              "Random Notes": `For more information on how to use this AuthorPal project visit the FAQ`
            },
            "view": {
              
            },
            "utility": {
              
            },
            "#root": {
              "#start": {
                object_root: {
                  type: 'function',
                  editor: 'javascript'
                },
                "main": `function(parent) {
                  //optional, can use to format inputs when setting up library
                }`
              }
            }
          }
        }
      }
    }
  }
  return obj
}
