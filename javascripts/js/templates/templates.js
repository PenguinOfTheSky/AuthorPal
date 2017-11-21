/* global TS */
Object.assign(TS.js.templates, {
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
  staticWebsite: {
    "blog entry": function () {
      let obj = {
        object_root: {
          type: 'collection',
          subtype: "blog entry"
        },
        date: TS.js.templates.html5['plain text']((new Date()).toLocaleString()),
        title: TS.js.templates.html5['plain text'](),
        keywords: TS.js.templates.html5['plain text'](),
        category: TS.js.templates.html5['plain text'](),
        text: TS.js.templates.html5['markdown']()
      };
      return obj;
    },
    "plain text": function () {
      return TS.js.templates.html5['plain text']();
    },
    collection: function () {
      return TS.js.templates.html5['collection'];
    },/*
    "rich text": function() {
      return TS.js.templates.html5['rich text']();
    }, */
    "markdown": function() {
      return TS.js.templates.html5['markdown']();
    }
  },
  topNavbar: {
    "book outline": function () {
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["novel outline"]',
          exportFormat: "outlineMarkdown",
          type: "book outline",
          version: "3.7",
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          shadowTree: {}
        },
        "general": {
          "title": TS.js.templates.html5['markdown'](),
          "premise": TS.js.templates.html5['markdown'](),
          "genre(s)": TS.js.templates.html5['markdown'](),
          "zeitgeist": TS.js.templates.html5['markdown'](),
          "Random Notes": TS.js.templates.html5['markdown']()
        },
        "#advanced": {
          "*head": {
            object_root: {
              type: 'html',
              editor: 'html'
            },
            "main": `
              <title></title>
              <script src=""></script>`
          },
          styles: {
            "*chosenStyle": "*default",
            "*default": {
              object_root: {
                type: 'css',
                editor: 'css'
              },
              "main": `
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
              `
            }
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
          type: "website",
          version: 1
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
        "#head": {
          "#head": `<script src=''>jquery/other ext. scripts</script>`,
          "#css": {
            "general": `
            html, body{
              height: 100;
            }`
          }
          
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
    "Blog": function () {
      //Comes with __ available themes, creates a blog site with little fuss.
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["staticWebsite"]',
          exportFormat: "blog",
          type: "blog",
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          version: "3.4",
          shadowTree: {}
        },
        "#general": {
          "title": TS.js.templates.html5['plain text'](),
          "blurb": TS.js.templates.html5['plain text'](),
          "license": TS.js.templates.html5['plain text'](),
          "Contributors": TS.js.templates.html5['plain text'](),
          "Random Notes": TS.js.templates.html5['plain text']()
        },
        "#advanced": {
          "imports/title/etc": {
            object_root: {
              type: 'html',
              editor: 'html'
            },
            "main": `<title>My first Site</title>\n<script src=''>jquery/other ext. scripts<\/script>`
          },
          "#css": {
            "#chosenStyle": TS.js.templates.html5['plain text']("default"),
            "default": {
              object_root: {
                type: 'css',
                editor: 'css'
              },
              "main": `html, body {\n\ \ height: 100%;\n}`
            }
          },
          "#script": {
            object_root: {
              type: 'function',
              editor: 'js'
            },
            "main": `function() {
  //optional. runs after everything has loaded.
  //to preload something to body, include it in imports/title/etc
  //access other functions/etc with me.variable.variable.variable or me["variable"]
  console.log('hello world')
}`
          }
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
          templates: 'TS.js.templates["html5"]',
          exportFormat: "web component(js)",
          type: "web component(js)",
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          version: "3.1.0",
          shadowTree: {}
        },
        "#general": {
          "title": TS.js.templates.html5['plain text'](`ex: navbar`),
          "blurb": TS.js.templates.html5['plain text'](`makes a navbar`),
          "inputs": TS.js.templates.html5['plain text']("{color: somecolor} (inputs are required/not required)"),
          "license": TS.js.templates.html5['plain text'](``),
          "Contributors": TS.js.templates.html5['plain text'](``),
          "Random Notes": TS.js.templates.html5['plain text'](`For more information on how to use this AuthorPal project visit the FAQ`)
        },
        "#css": {
          
        },
        "view": {
          
        },
        "js": {
          
        },
        "#root": {
          "#start": {
            object_root: {
              type: 'function',
              editor: 'js'
            },
            "main": `function(parent) {
              if (parent) parent.innerHTML = 'Hello World'
              console.log('hello world')
            }`
          },
          "#testScript": {
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
              component["#root"]["#start"](document.body)

            }`
          }
        }
      };
      return obj;
    }, 
    website_JS: function () {
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["html5"]',
          exportFormat: "", //fixthis
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          type: "website_JS",
          version: 3.7
        },
        "#general": {
          "title": TS.js.templates.html5['plain text'](),
          "blurb": TS.js.templates.html5['plain text'](),
          "license": TS.js.templates.html5['plain text'](),
          "Contributors": TS.js.templates.html5['plain text'](),
          "Random Notes": TS.js.templates.html5['plain text']()
        },
        "#head": {
          "imports/title/etc": {
            object_root: {
              type: 'html',
              editor: 'html'
            },
            "main": `<title>My first Site</title>\n<script src=''>jquery/other ext. scripts<\/script>`
          },
          "#css": {
            "object_root": {
              type: 'collection'
            },
            "general": {
              object_root: {
                type: 'css',
                editor: 'css'
              },
              "main": `html, body {\n\ \ height: 100%;\n}`
            }
          },
          "#start": {
            object_root: {
              type: 'function',
              editor: 'js'
            },
            "main": `function() {
  //runs after everything has loaded.
  //to preload something to body, include it in imports/title/etc
  //access other functions/etc with me.variable.variable.variable or me["variable"]
  document.body.innerHTML = 'Hello World'
  console.log('hello world')
}`
          }
        },
        "js": {},
        "view": {},
        "data": {},
        "json": {},
        "text": {},
        "lib1": {
          'jtml': {
            object_root: {
              type: 'function',
              editor: 'javascript'
            },
            "main": `function(arr) {
  /*
    give arr in form [
      'h1', {innerText: 'hello world'},
      'h2', {innerText: 'Onwards', ref: 'firstChapter',
      'p', {children: [
        'span', {innerText: 'hello'}
        ]}
    ]
    optional: ref, children, must give at least a blank {}
  */
    let elements = {
        html: document.createDocumentFragment(),
        refs: {}
    };
for (let i = 0; i < arr.length; i+=2) {
    let children = null;
    if (arr[i+1].children) {
        children = arr[i+1].children
        delete arr[i+1].children
    }
    let ele = Object.assign(document.createElement(arr[i]), arr[i+1])
    elements.html.append(ele)
    console.log(ele, arr[i+1])
  if (arr[i+1].ref) {
      elements.ref[refs[arr[i+1]].ref] = ele
  } 
    if (arr[i+1].children) {
      let children = me.lib1.jtml(arr[i+1].children)
      ele.append(children.html)
      Object.assign(elements.refs, children.refs)
  } 
}
    return elements;
}`
          }
        }
      };
      return obj;
    },
    "library_JS": function () {
      //for production of js-packaged webcomponent.
      let obj = {
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
      };
      return obj;
    },
    "folder": function () {
      //for production of js-packaged webcomponent.
      let obj = {
        "master_root": {
          type: "folder",
          dateCreated: (new Date()).toLocaleString(),
          dateModified: (new Date()).toLocaleString(),
          version: "3.4.0",
          shadowTree: {}
        },
        "files": {}
      }
      return obj
    }
  }
});
