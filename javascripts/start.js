TS.start = function(parent) {
  Object.assign(TS, {
    events: {},
    data : {},
    refs : {}
  })
  TS.refs.container = parent
  localforage.getItem('TS', function(err, value) {
    if (value == undefined) {
      value = JSON.stringify({
        files: {},
        preferences: {}
      })
      localforage.setItem('TS', value, function(err) {})
    }
    TS.data.local = JSON.parse(value)
    if (TS.data.local.preferences.theme == 'Sparky') {
      console.log('wtfinhellfire')
      TS.data.local.preferences.theme = 'default'
    }
    begin()
  })
  setInterval(function() {
    localforage.setItem('TS', JSON.stringify(TS.data.local), function(err){})
  }, 15000)
  //initialize objects.
  let begin = function() {
    TS.css = TS.css()
    let parentStyle = TS.lib.createNode('style', {
      innerHTML : TS.css.boxes.root()
    })
    document.body.appendChild(parentStyle)
    let display = TS.html.display.start();
    let navBar = TS.html._navBars.mainNavBar(display)
    parent.appendChild(navBar)
    TS.refs.topNav = navBar
    parent.appendChild(display.element)
  }
}
