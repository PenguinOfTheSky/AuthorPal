/* global TS */
TS.js.templates = {
  default: {
    textblock: function () {
      return ``;
    },
    object: function () {
      return {};
    },
    array: function () {
      return [];
    }
  },
  website: {

  },
  "web component(js)": {
    container: function () {
      let obj = {};
      return obj;
    },
    textblock: function() {
      return ``;
    },
    function: function() {
      let obj = {
        object_root: {
          type: 'function',
          editor: 'js'
        },
        "main": `function() {
          
        }`
      }
      return obj
    },
    element: function() {
      let obj = {
        object_root: {
          type: 'function',
          shadowTree: ['#inputs', "main"],
          editor: 'js'
        },
        "main": `function() {
          let element = Object.assign(document.createElement(''), {
            
          });
          return element;
        }`
      }
      return obj
    }
  },
  staticWebsite: {
    "blog entry": function () {
      let obj = {
        "#type": "blog entry",
        date: (new Date()).toLocaleString(),
        title: ``,
        keywords: ``,
        category: ``,
        text: ``
      };
      return obj;
    },
    textblock: function () {
      return ``;
    },
    container: function () {
      return {};
    }
  },
  "novel outline": {
    textblock: function () {
      return ``;
    },
    container: function () {
      return {};
    },
    character_Short: function () {
      return `**blurb:**  
**appearance:**  
**personality:**  
**brief timeline:** `;
    },
    character_Long: function() {
      return {
        blurb: ``,
        appearance: ``,
        personality: ``,
        motivations: ``,
        timeline: {}
      }
    },
    chapter: function () {
      let obj = {
        "blurb": ``,
        "locations": ``,
        "characters": ``,
        "atmosphere": ``,
        "list main points": ``,
        "deeper runthrough": {

        }
      };
      return obj;
    }
  },
  topNavbar: {
    "book outline": function () {
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["novel outline"]',
          exportFormat: "outlineMarkdown",
          type: "book outline",
          version: "2.9",
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          shadowTree: {}
        },
        "general": {
          "title": ``,
          "premise": ``,
          "genre(s)": ``,
          "zeitgeist": ``,
          "Random Notes": ``
        },
        "#advanced": {
          "*head": `
            <title></title>
            <script src=""></script>
          `,
          styles: {
            "*chosenStyle": "*default",
            "*default": `<style>
              .headers {
                cursor: pointer;
                text-decoration: underline;
              }
              p { text-indent: 1rem; }
              h1 { text-align: center; }
              ._2 {margin-left: 3%;}
              ._3 { margin-left: 6%; }
              ._4 { margin-left: 9%; }
              ._5 { margin-left: 12%; }
              ._6 { margin-left: 15%; }
              ._7 { margin-left: 18%; }
              </style>`
          },
          "*script": ``
        },
        "characters": {
          "main": {},
          "supporting": {},
          "minor": {}
        },
        "locations": {},
        "chapters": {},
        "timeline(s)": {}
      };
      obj.master_root.shadowTree = TS.js.sortShadowTree(obj)
      return obj;
    },
    website: function () {
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["default"]',
          exportFormat: "", //fixthis
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          type: "website"
        },
        "general": {
          "title": ``,
          "namespace": ``,
          "blurb": ``,
          "license": ``,
          "Contributors": ``,
          "Random Notes": ``
        },
        main: {
          "start": function () {}
        },
        "head": {
          imports: ``,
          styleTag: ``,
          html: ``
        },
        "html": {
          "local vars": `
            //test
          `
        },
        "text": {},
        "css": {
          "local vars": ``
        },
        "js": {
          "local vars": ``
        }
      };
      return obj;
    },
    "Markdown Blog": function () {
      //Comes with __ available themes, creates a blog site with little fuss.
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["staticWebsite"]',
          exportFormat: "markdownBlog",
          type: "markdown blog",
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          version: "2.9",
          shadowTree: {}
        },
        "#general": {
          "title": ``,
          "blurb": ``,
          "license": ``,
          "Contributors": ``,
          "Random Notes": ``
        },
        "#advanced": {
          styles: {
            "*chosenStyle": "*default",
            "*default": `<style></style>`
          },
          "*head": `
            <title></title>
            <script src=''></script>
            <script> console.log('hello') </script>
          `,
          "*script": ``

        },
        "archive": {
          "January 20XX": {}
        },
        "homepage": {
          "*style": `<style>
          #main h1 {}
          /* optional. prefix styles with #main (the containing div)*/</style>`,
          "content": `Change this to "*content" instead of "content" if you don't want to use markdown formatting`,
          "*javascript": `<script>/* optional */</script>`
        },
        "about": {
          "*style": `<style>
          #main h1 {}
          /* optional style override/additions. prefix styles with #main (the containing div)*/</style>`,
          "content": ``,
          "*javascript": `<script>/* optional */</script>`
        }
      };
      return obj;
    },
    "web component(js)": function () {
      //for production of js-packaged webcomponent.
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["web component(js)"]',
          exportFormat: "web component(js)",
          type: "web component(js)",
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          version: "3.0.0",
          shadowTree: {}
        },
        "#general": {
          "title": `ex: navbar`,
          "blurb": `makes a navbar`,
          "inputs": "{color: somecolor} (inputs are required/not required)",
          "license": ``,
          "Contributors": ``,
          "Random Notes": `For more information on how to use this AuthorPal project visit the FAQ`
        },
        "#css": {
          
        },
        "#elements": {
          
        },
        "#javascript": {
          "#start": {
            object_root: {
              type: 'function',
              editor: 'js'
            },
            "main": `function(parent) {
              if (parent) parent.innerHTML = 'Hello World'
              console.log('hello world')
            }`
          }
        },
        "#advanced": {
          testScript: {
            object_root: {
              type: 'function',
              editor: 'js'
            },
            main: `function(component) {
  //for use in testing component.
  //for more information see the tutorial (pending)
  console.log(component)
  component = component(document.body)
  console.log(component)
  component["#javascript"]["#start"](document.body)

}`
          }
        }
      };
      return obj;
    }
  }
};
