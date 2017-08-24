Book.js = {
  templates: {
    textblock: function() {
      let obj = ``
      return obj
    },
    container: function() {
      let obj = {}
      return obj
    },
    character: function() {
      let obj = {
        "blurb": ``,
        "bio": {
          "timeline": ``,
          "appearance": ``,
          "personality": ``
        }
      }
      return obj
    },
    chapter: function() {
      let obj ={
        "blurb": ``,
        "locations": ``,
        "characters": ``,
        "atmosphere": ``,
        "list main points": ``,
        "deeper runthrough": {

        }
      }
      return obj
    },
    standard: function() {
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
    }
  }
}
