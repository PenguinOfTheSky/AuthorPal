TS.js.indexedDB = function(fn, callback) {
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  var open = indexedDB.open("test", 1);
  // Create the schema
  open.onupgradeneeded = function() {
      var db = open.result;
      var store = db.createObjectStore("AP", {keyPath: "id"});
      var index = store.createIndex("idIndex", ["id"]);
  };

  open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    window.db = db
    var tx = db.transaction("AP", "readwrite");
    var store = tx.objectStore("AP");
    window.store = store
    let x = store.getAll()
    x.onsuccess = function() {console.log(x.result)}
    var index = store.index("idIndex");
    if (fn) fn(callback);
    tx.oncomplete = function() {
        db.close();
    };
  }
}
