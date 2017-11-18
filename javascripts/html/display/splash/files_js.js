TS.html.display.splash.files_js = function(root) {
  let fileManager = {
    current: null,
    reload: function() {
      render()
    }
  }
  root.querySelector("#createNewFile").onclick = function() {
    TS.refs.container.append(TS.html.modals.createFile(fileManager))
  }
  let render = function() {
    let files = TS.data.local.files;
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
            onclick: function(event) {
              if (TS.data.local.files[x].master_root && TS.data.local.files[x].master_root.type == 'folder') {
                
              } else {
                TS.data.chosenFile = TS.data.local.files[x];
                TS.events.openFile(x);
              }
            },
            oncontextmenu: function(e) {
              e.preventDefault()
              // if (e.target !== this) return 0;
              root.append(TS.html.modals.fileContextNav(e, div))
            }
          })
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
              if (this.innerText !== x) { //add folder support later
                if (!TS.data.local.files[this.innerText]) {
                  TS.data.local.files[this.innerText] = TS.data.local.files[x]
                  delete TS.data.local.files[x]
                  x = this.innerText
                  TS.events.save()
                } else {
                  console.log('name taken')
                  this.innerText = x;
                }
              }
              console.log(this.innerText)
            }
          }))
          list.append(div) 
        }
      }
      root.querySelector("#filesList").innerHTML = ''
      root.querySelector("#filesList").append( list);
      root.querySelectorAll('.fileOrFolder').forEach(ele => {
        ele.ondragstart = function(e) {
          TS.refs.draggedItem = this
        }
        ele.ondrop = function(e) {
          e.preventDefault()
          console.log('pim')
        }
      })
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
      let item = TS.refs.draggedItem
      e.preventDefault()
      this.style.width = ''
      this.style.height = ''
      item.style.display = 'none'
      if (!TS.data.local.trash) TS.data.local.trash = []
      let name = item.querySelector('span').innerText
      if (!TS.data.local.files[name].master_root) {
        TS.data.local.files[name].master_root = {}
      }
      TS.data.local.files[name].master_root.dateDeleted = (new Date()).toLocaleString()
      TS.data.local.files[name].master_root.fileName = name
      TS.data.local.trash.push(TS.data.local.files[name])
      delete TS.data.local.files[name]
      TS.events.save()
    }
  })
}
