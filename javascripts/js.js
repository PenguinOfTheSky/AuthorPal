TS.js = {
  templates: {
    textblock: function() {
      let obj = ``
      return obj
    },
    container: function() {
      let obj = {}
      return obj
    },
    website: function() {
      let obj = {
        "general": {
          "title": ``,
          "blurb": ``,
          "license": ``,
          "Contributors": ``,
          "Random Notes": ``
        },
        "start": function() {

        },
        "outside dependencies": {
          js : ``,
          css : ``,
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
  }
}
