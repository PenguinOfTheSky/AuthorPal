Book.start = function(parent) {
  Object.assign(Book, {
    events: {},
    data : {},
    refs : {}
  })
  Book.refs.container = parent
  if (localStorage.Book === undefined) {
    localStorage.Book = JSON.stringify({
      files: {},
      preferences: {}
    })
  }
  Book.data.local = JSON.parse(localStorage.Book)
  setInterval(function() {
    localStorage.Book = JSON.stringify(Book.data.local)
  }, 15000)
  //initialize objects.
  Book.css = Book.css()
  Book.html = Book.html()
  let parentStyle = Book.lib.createNode('style', {
    innerHTML : `
      #root {
        min-height:100%;
        background: linear-gradient(0deg, rgb(0, 0, 0), rgb(0, 55, 55) 40%, rgb(40, 40, 40));
      }
    `
  })
  document.body.appendChild(parentStyle)
  let display = Book.html.display.start();
  let navBar = Book.html._navBars.mainNavBar(display)
  parent.appendChild(navBar)
  let navFiller = document.createElement('div')
  let script = document.createElement('script')
  script.innerHTML = `document.currentScript.parentNode.style.height = document.currentScript.parentNode.parentNode.firstChild.clientHeight + 3 + 'px';
  `

  navFiller.appendChild(script)
  parent.appendChild(navFiller)
  Book.refs.topNavFiller = navFiller
  Book.refs.topNav = navBar
  parent.appendChild(display.element)
}
