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
