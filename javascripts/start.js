/* global TS */
/* global localforage */
TS.start = function (parent) {
  Object.assign(TS, {
    events: {},
    data: {},
    refs: {}
  });
  TS.refs.container = parent;
  localforage.getItem("Book", function (err, value) {
    if (value == null || value == 'null') {
      value = JSON.stringify({
        files: {},
        preferences: {}
      });
      localforage.setItem("Book", value, function () {});
    }
    TS.data.local = JSON.parse(value);
    if (TS.data.local.preferences.theme === "Sparky") {
      TS.data.local.preferences.theme = "default";
    }
    begin();
  });
  TS.events.save = function (callback) {
    //TS.start
    TS.js.indexedDB(function(cb) {
      db.put({all: TS.data.local})
    }, function() {
      console.log(store)
      console.log('fish')
    })
    localforage.setItem("Book", JSON.stringify(TS.data.local), function () {
      if (callback) callback();
    });
  };
  setInterval(function () {
    TS.events.save();
  }, 15000);
  //initialize objects.
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
