/* global TS */
/* global localforage */
TS.start = function (parent) {
  Object.assign(TS, {
    events: {},
    data: {},
    refs: {}
  });
  TS.refs.container = parent;
  
  //Load Data
  TS.js.indexedDB(function(opts) {
    let y = opts.index.get(['master_999'])
    y.onsuccess = function() {
      if (y.result) { 
        TS.data.local = y.result.data 
        TS.data.local.files['Example files'] = TS.js.templates['Example files']()
        begin()
      } else {
        TS.data.local = {
          files: {},
          preferences: {
            theme: 'midnight'
          }
        };
        TS.events.save(begin())
      }
    }
  })
  TS.events.updatedFile = function() { 
    if (TS.data.chosenFile.master_root) {
      TS.data.chosenFile.master_root.dateModified = (new Date).toLocaleString()
    }
  }
  TS.events.save = function (callback) {
    TS.js.indexedDB(function(opts) {
      store.put({id: 'master_999', data: TS.data.local})
      if (callback) callback()
    })
  };
  let begin = function () {
    TS.css = TS.css();
    let parentStyle = TS.lib.createNode("style", {
      innerHTML: TS.css.boxes.root()
    });
    document.body.append(parentStyle);
    let display = TS.html.display.start();
    let navBar = TS.html._navBars.mainNavBar(display);
    parent.append(navBar, display.element);
    TS.refs.topNav = navBar;
  };
};
