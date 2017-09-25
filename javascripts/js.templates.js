
TS.js.templates = {
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
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["novel outline"]',
          exportFormat: "outlineMarkdown",
          type: 'book outline'
        },
        "#general": {
          "title": ``,
          "premise": ``,
          "genre(s)": ``,
          "zeitgeist": ``,
          "Random Notes": ``
        },
        "#advanced": {
          styles: {
            "*chosenStyle": '*default',
            "*default": `<style>
              .headers {
                cursor: pointer;
                text-decoration: underline;
              }
              p {
                text-indent: 1rem;
              }
              h1 {
                text-align: center;
              }
              ._2 {
                margin-left: 3%;
              }
              ._3 {
                margin-left: 6%;
              }
              ._4 {
                margin-left: 9%;
              }
              ._5 {
                margin-left: 12%;
              }
              ._6 {
                margin-left: 15%;
              }
              </style>`
          }
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
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["default"]',
          exportFormat: "", //fixthis
          type: 'website'
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
    "Markdown Blog" : function() {
      //Comes with __ available themes, creates a blog site with little fuss.
      let obj = {
        "master_root": {
          templates: 'TS.js.templates["staticWebsite"]',
          exportFormat: "markdownBlog",
          type: 'markdown blog'
        },
        "#general": {
          "title": ``,
          "blurb": ``,
          "license": ``,
          "Contributors": ``,
          "Random Notes": ``
        },
        "#advanced": {
          imports : `<!--import scripts like jquery if required -->
          <script src="#"></script>`,
          styleTag : `<!--blog comes pre-styled, but you can override styles if necessary --> <style></style>`,
          html : `<!--things like <title> are set from general-> title, but you can override here.-->`,
          script: `/* for general js scripting. Scripts can also be written by adding the '*' prefix (see faq)*/
          `
        },
        "text":{
          "January 20XX" : {
            "Went shopping": {
              date: 1,
              text: "Was super fun"
            }
          }
        }
      }
      return obj;
    }
  }
}
