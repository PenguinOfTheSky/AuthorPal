TS.js = {
templates: {
  default: {
    textblock: function() {
      return ``
    },
    object: function() {
      return {}
    },
    array: function() {
      return []
    }
  },
  website: {

  },
  staticWebsite: {
    "blog entry": function() {
      date = new Date()
      let obj = {
        date: date.toLocaleString(),
        title: ``,
        keywords: ``,
        text: ``
      }
      return obj;
    },
    textblock: function() {
      let obj = ``
      return obj
    },
    container: function() {
      let obj = {}
      return obj
    }
  },
  "novel outline": {
    textblock: function() {
      let obj = ``
      return obj
    },
    container: function() {
      let obj = {}
      return obj
    }
  },
  topNavbar: {
    "book outline": function() {
      TS.data.local.preferences.templates= 'TS.js.templates["novel outline"]'
      TS.data.local.preferences.exportFormat = "outlineMarkdown"
      let obj = {
        "general": {
          "title": ``,
          "premise": ``,
          "genre(s)": ``,
          "zeitgeist": ``,
          "Random Notes": ``
        },
        "characters":{
          "main": {
          },
          "supporting": {},
          "minor": {}
        },
        "locations":{},
        "chapters" : {},
        "timeline(s)": {}
      }
      return obj;
    },
    website: function() {
      TS.data.local.preferences.templates= 'TS.js.templates["default"]'
      let obj = {
        "general": {
          "title": ``,
          "namespace": ``,
          "blurb": ``,
          "license": ``,
          "Contributors": ``,
          "Random Notes": ``
        },
        main: {
          "start": function() {
          }
        },
        "head": {
          imports : ``,
          styleTag : ``,
          html : ``
        },
        "html":{
          "local vars" : `
            //test
          `
        },
        "text":{},
        "css" : {
          "local vars" : ``
        },
        "js": {
          "local vars" : ``
        }
      }
      return obj;
    },
    "Static Blog" : function() {
      //Comes with two available themes, creates a blog site with little fuss.
      TS.data.local.preferences.templates= 'TS.js.templates["staticWebsite"]'
      let obj = {
        "general": {
          "title": ``,
          "namespace": ``,
          "blurb": ``,
          "templates": "default",
          "license": ``,
          "Contributors": ``,
          "Random Notes": ``
        },
        main: {
          "start": function() {
          }
        },
        "head": {
          imports : `<script src="libs/localForage-master/dist/localforage.min.js"></script>`,
          styleTag : ``,
          html : ``
        },
        "html":{
          "local vars" : `
            //test
          `
        },
        "text":{
          "January 20XX" : {
            "Went shopping": {
              date: 1,
              text: "Was super fun"
            }
          }
        },
        "css" : {
        },
        "js": {
          "local vars" : ``
        }
      }
      return obj;
    }
  }
},
baseModal : function(box, root) {
  box.onclick = function() {
    box.remove();
  }
  root.querySelector('#centerModal').onclick = function(event) {
    event.stopPropagation()
  }
  root.querySelector('#exit').onclick = function() { box.remove() }
},
fileFormat: {
  outlineMarkdown: function(file) {
    let str = ``;
    let format = function(obj) {
      
    }
    return str;
  }
}
}
