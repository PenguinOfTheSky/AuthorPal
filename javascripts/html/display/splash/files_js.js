TS.html.display.splash.files_js = function(root) {
  let fileManager = {
    current: null,
    reload: function(path) {
      render(path)
    }
  }
  let dragged = {
    item: null,
    path: null,
    ref: null
  }
  root.querySelector("#createNewFile").onclick = function() {
    TS.refs.container.append(TS.html.modals.createFile(fileManager))
  }
  let render = function(path) {
    if (!path) path = []
    root.querySelector('#path').innerText = "~/" + path.join('/')
    let files = TS.data.local.files;
    path.forEach(ele => {
      files = (files[ele] || files.files[ele])
    })
    if (path.length > 0) files = files.files
    if (Object.keys(files).length > 0) {
      let list = document.createDocumentFragment();
      for (let x in files) {
        if (files.hasOwnProperty(x)) {
          let img = 'iconmonstr-note-20-240.png'
          let divClass = 'file fileOrFolder'
          if (files[x].master_root.type == 'folder') {
            img = 'iconmonstr-folder-19-240.png'
            divClass = 'folder fileOrFolder dropzone'
          }
          let helperContent = ``;
          let thisRoot = files[x].master_root
          if (thisRoot.type) helperContent += thisRoot.type
          if (thisRoot.dateCreated) helperContent += '\ncreated: ' + thisRoot.dateCreated
          if (thisRoot.dateModified) helperContent += '\nmodified: ' + thisRoot.dateModified
          let div = TS.lib.createNode('div', {
            title: helperContent,
            "data-origin": 'testing',
            className: divClass,
            draggable: true,
            ondragstart: function() {
              dragged = {
                path: path,
                item: x,
                ref: this
              }
            },
            onclick: function(event) {
              if (files[x].master_root && files[x].master_root.type == 'folder') {
                path.push(x)
                render(path)
              } else {
                TS.data.chosenFile = files[x];
                TS.events.openFile(files[x], x);
              }
            },
            oncontextmenu: function(e) {
              e.preventDefault()
              // if (e.target !== this) return 0;
              root.append(TS.html.modals.fileContextNav(e, div))
            }
          })
          if (files[x].master_root.type == 'folder') {
            Object.assign(div, {
              ondragenter: function(e) {
                div.style["box-shadow"] = "0px 0px .1rem .2rem white inset"
              },
              ondragleave: function(e) {
                div.style["box-shadow"] = ""
              },
              ondragover: function(e) {
                e.preventDefault()
              },
              ondrop: function(e) {
                div.style["box-shadow"] = ""
                let move = function(n) {
                  let name = dragged.item;
                  if (files[x].files[dragged.item]) {
                    if (files[x].files[dragged.item + '_' + n]) {
                      move(n+1)
                      return 0;
                    } else {
                      name = dragged.item + '_' + n
                    }
                  } 
                  files[x].files[name] = files[dragged.item]
                  delete files[dragged.item]
                  dragged.ref.remove()
                  TS.events.save()
                }
                move(1)
              }
            })
          }
          div.append(TS.lib.createNode('img', {
            draggable: false,
            src: 'icons/' + img
          }), TS.lib.createNode('span', {
            contentEditable: true,
            innerText: x,
            onclick: function(e) {
              e.stopPropagation()
              e.preventDefault()
            },
            onblur: function(e) {
              if (this.innerText !== x) { 
                if (!files[this.innerText]) {
                  files[this.innerText] = files[x]
                  delete files[x]
                  x = this.innerText
                  TS.events.save()
                } else {
                  console.log('name taken')
                  this.innerText = x;
                }
              }
            }
          }))
          list.append(div) 
        }
      }
      root.querySelector("#filesList").innerHTML = ''
      root.querySelector("#filesList").append( list);
      
    } else {
      root.querySelector("#filesList").innerHTML = "<i style='font-size: .9rem;'> No projects found </i>"
    }
  }
  render()
  Object.assign(root.querySelector('#trash'), {
    onclick: function(e) {
      TS.refs.container.appendChild(TS.html.modals.trash())
    },
    ondragenter: function(e) {
      this.style.width = '2.5rem'
      this.style.height = '2.5rem'
    },
    ondragleave: function(e) {
      this.style.width = ''
      this.style.height = ''
    },
    ondragover: function(e) {
      e.preventDefault()
    },
    ondrop: function(e) {
      let item = dragged.ref
      let base = TS.data.local.files
      dragged.path.forEach(ele=> {
        base = base[ele]
      })
      let files = base
      if (dragged.path.length > 0) files = files.files
      e.preventDefault()
      this.style.width = ''
      this.style.height = ''
      item.style.display = 'none'
      if (!TS.data.local.trash) TS.data.local.trash = []
      let name = item.querySelector('span').innerText
      if (!files[name].master_root) {
        files[name].master_root = {}
      }
      files[name].master_root.dateDeleted = (new Date()).toLocaleString()
      files[name].master_root.fileName = name
      TS.data.local.trash.push(files[name])
      delete files[name]
      TS.events.save()
    }
  })
}
