Book.lib = {
  createNode : function(type, obj) {
    return Object.assign(document.createElement(type), obj)
  },
  appendChildren : function(parent, arr) {
    arr.forEach(ele => parent.appendChild(ele))
  },
  createComponent : function({reference, css, parent,id, html, js, devMode}) {
    if (devMode) {
      console.log(argumenBook[0])
    }
    let box = Book.lib.createNode('div', {
      "id" : reference,
      "class": 'component'
    })
    let root = box.attachShadow({mode: 'open'})
    let style = Book.lib.createNode('style', {
      innerHTML : css})
    let main = Book.lib.createNode('div', {
      id: id,
      innerHTML : html})
    root.appendChild(style)
    root.appendChild(main)
    let opBook = {}
    js({box, style, parent, opBook})
    return {box: box, opBook: opBook}
  }
}
