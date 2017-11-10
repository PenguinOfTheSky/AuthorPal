TS.js.templates.html5 = {
  container: function () {
    let obj = {};
    return obj;
  },
  textblock: function() {
    return ``;
  },
  "css": function() {
    let obj = {
      object_root: {
        type: 'css',
        editor: 'css'
      },
      "main": ``
    }
    return obj
  },
  function: function() {
    let obj = {
      object_root: {
        type: 'function',
        editor: 'javascript'
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
        editor: 'javascript'
      },
      "main": `function() {
        let element = Object.assign(document.createElement(''), {
          
        });
        return element;
      }`
    }
    return obj
  }
}
