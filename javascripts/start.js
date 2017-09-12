Book.start = function(parent) {
  var indexedDB = window.indexedDB
  var open = indexedDB.open("MyBooks", 1);
  Object.assign(Book, {
    events: {},
    data : {},
    refs : {}
  })
  Book.refs.container = parent
  localforage.getItem('Book', function(err, value) {
    if (value == undefined) {
      value = JSON.stringify({
        files: {},
        preferences: {}
      })
      localforage.setItem('Book', value, function(err) {})
    }
    Book.data.local = JSON.parse(value)
    if (Book.data.local.preferences.theme == 'Sparky') {
      console.log('wtfinhellfire')
      Book.data.local.preferences.theme = 'default'
    }
    begin()
  })
  setInterval(function() {
    localforage.setItem('Book', JSON.stringify(Book.data.local), function(err){})
  }, 15000)
  //initialize objects.
  let begin = function() {
    Book.css = Book.css()
    Book.html = Book.html()
    let parentStyle = Book.lib.createNode('style', {
      innerHTML : Book.css.boxes.root()
    })
    document.body.appendChild(parentStyle)
    let display = Book.html.display.start();
    let navBar = Book.html._navBars.mainNavBar(display)
    parent.appendChild(navBar)
    Book.refs.topNav = navBar
    parent.appendChild(display.element)
  }
}
