  /*
  If using css to affect all divs, make sure to exclude .component class if desired
  */
Book.html = function() {
  let CSS = Book.css,
  Lib = Book.lib,
  _; //Book.html, defined below.
  let obj = {
  display: {
    splash : function() {
      return Book.lib.createComponent({
      id: 'Book.html.display.splash',
      css: Book.css.boxes.splash(),
      js: function({style, box, parent}) {
      },
      html: `
        <h1>Lycelia's <i>AuthorPal</i> v1.20</h1>
        <div style = 'text-indent:1rem;'>
          <h2>To get started click File (top left) and create a new project </h2>
          <p>To learn more click FAQ above.
          Bug reports and feature requests can be filed at <a href='https://github.com/PenguinOfTheSky/AuthorPal'>https://github.com/PenguinOfTheSky/AuthorPal</a></p>
        </div>
      `
    })},
    start: function() {
      let box = document.createElement('div')
      Object.assign(box, {
        style: '',
        id: 'Book.html.display'
      })
      let root = box.createShadowRoot()
      let currentID = ''
      let sorted = ''
      root.appendChild(Book.html.display.splash().box)
      let opts = {
        element : box,
        render : function(id) {
          currentID = id
          root.innerHTML = ''
          sorted = Book.html.display.sort(id)
          root.appendChild(sorted.element)
        }
      }
      Book.events.bodyChange = function(focused) {
        if (focused.length == 0) {
          root.innerHTML = ''
          sorted = Book.html.display.sort(currentID)
          root.appendChild(sorted.element)
        } else {
          root.innerHTML = ''
          sorted = Book.html.display.sort(currentID)
          root.appendChild(sorted.element)
          sorted.opts.update(focused)
        }
      }
      return opts;
    },
    sort: function(id) {
      let box = document.createElement('div')
      Object.assign(box, {
        id: 'Book.html.display.sort'
      })
      box.style = Book.css.boxes.wholeDisplayContainer()
      let root = box.createShadowRoot()
      let mainDisplay = Book.html.display.renderedList(id)
      let topUI = Book.html._navBars.displayTopUI({mainDisplay: mainDisplay.opts, id : id})
      if (typeof(Book.data.chosenFile[id]) == 'object' ) {
        for (let item in Book.data.chosenFile[id]) {
          topUI.opts.newButton(item)
        }
      }
      root.appendChild(topUI.box)

      root.appendChild(mainDisplay.element)
      let opts = {
        update: mainDisplay.opts.update
      }
      return {element: box, opts: opts};
    },
    renderedList : function(id) {
      let focused = []
      let currentID = id;
      let box = Object.assign(document.createElement('div'), {
        name: 'mainDisplayView',
        id: 'Book.html.display.renderedList'
      })
      let root = box.createShadowRoot()
      let style = document.createElement('style');
      style.innerHTML = Book.css.boxes.display()
      root.appendChild(style)
      let determine = function(item, itemName, path, {maxDepth, depth}) {
        if (depth == undefined) depth = 0;
        let line = Object.assign(document.createElement('div'), {
          className: 'lineContainer '
        })
        if (typeof(item) == 'object') line.className += ' objectContainer'
        else line.className += ' stringContainer'
        let lineBody
        let title = Object.assign(document.createElement('div'), {
          className: 'title'
        })
        let titleContent = Object.assign(document.createElement('span'), {
          className: 'titleContent',
          innerHTML: itemName,
          contentEditable: true,
          onblur: function() {
            if (path[this.innerText] === undefined) {
              let oldItemName = itemName
              item = path[itemName]
              itemName = this.innerText;
              path[itemName] = item
              delete path[oldItemName];
              Book.events.columnChange()
            } else {
              console.log('name taken')
            }
          }
        })
        let buttonGroup = Object.assign(document.createElement('div'), {
          className: 'buttonGroup'
        })
        let keyDelete = Object.assign(document.createElement('button'), {
          innerText: 'Delete',
          className: 'deleteLine',
          onclick: function() {
            callback = function() {
              delete path[itemName]
              Book.events.columnChange()
              if (focused.length > 0 && focused[1] !== itemName) {Book.events.bodyChange(focused)}
              else Book.events.bodyChange([])
            }
            document.body.appendChild(Book.html.modals.confirmationDelete(itemName, callback))
          },
          contentEditable: false
        })
        let focusMe = Object.assign(document.createElement('button'), {
          innerText: 'Focus',
          className: 'focusMe',
          onclick: function() {
            opts.focus(path, itemName)
          },
          contentEditable: false
        })
        title.appendChild(titleContent)
        title.appendChild(buttonGroup)
        buttonGroup.appendChild(keyDelete)
        line.appendChild(title)
        lineBody = Object.assign(document.createElement('div'), {
          className: 'lineBody'
        })
        if (typeof(item) == 'string') {
          let textField = Object.assign(document.createElement('div'), {
            className: 'textField',
            innerHTML: marked(item),
            contentEditable: true,
            onfocus: function() {
              this.innerHTML = path[itemName]
            },
            onblur: function() {
              path[itemName] = this.innerText
              this.innerHTML = marked(this.innerText);
            }
          })
          lineBody.appendChild(textField)
        }
        else if (typeof(item) == 'object') {
          let add = Object.assign(document.createElement('button'), {
            className: 'addLine',
            onclick : function() {
              Book.refs.container.appendChild(Book.html.modals.addLine(path[itemName], focused))
            },
            innerHTML: '+New Line'
          })
          buttonGroup.appendChild(add)
          buttonGroup.appendChild(focusMe)
          if (maxDepth === undefined || depth < maxDepth) {
            for (let x in item) {
              lineBody.appendChild(determine(item[x], x, item, {maxDepth: maxDepth, depth: 1+depth}))
            }
          }
        }
        if (typeof(item) == 'object' && Object.keys(item).length == 0) {}
        else line.appendChild(lineBody)
        return line
      }
      root.appendChild(determine(Book.data.chosenFile[id], id, Book.data.chosenFile, {}))
      let opts = {
        showAll: function() {
          focused = []
          root.innerHTML = '';
          root.appendChild(style)
          root.appendChild(determine(Book.data.chosenFile[id], id, Book.data.chosenFile, {}))
        },
        fold: function(n) {
          root.innerHTML = '';
          root.appendChild(style)
          if (focused.length == 0)
            root.appendChild(determine(Book.data.chosenFile[id], id, Book.data.chosenFile, {maxDepth:n}))
          else {
            root.appendChild(determine(focused[0], focused[1], focused[2], {maxDepth:n}))
          }
        },
        focus: function(path, itemName) {
          root.innerHTML = '';
          root.appendChild(style)
          root.appendChild(determine(path[itemName], itemName, path, {}))
          focused = [path[itemName], itemName, path, {}]
        },
        swapDisplayObject: function(key) {
          root.innerHTML = '';
          root.appendChild(style)
          root.appendChild(determine(Book.data.chosenFile[id][key], key, Book.data.chosenFile[id], {}))
          focused = [Book.data.chosenFile[id][key], key, Book.data.chosenFile[id], {}]
        },
        update : function(item) {
          focused = item;
          root.innerHTML = '';
          root.appendChild(style)
          if (focused.length>0) root.appendChild(determine(...item))
          else root.appendChild(determine(Book.data.chosenFile[id], id, Book.data.chosenFile, {}))
        }
      }
      return {element: box, opts: opts};
    }
  },

  _navBars : {
    mainButtons : function(changeTab) {
      let box = document.createElement('div')
      Object.assign(box, {
        id: 'Book.html._navBars.mainButtons'
      })
      let root = box.attachShadow({ mode: 'open' });
      let render = function() {
        let style = document.createElement('style')
        style.innerText = Book.css.boxes.mainButtons()
        root.innerHTML = ``;
        root.appendChild(style)
        if (Book.data.chosenFile !== undefined) {
          for (let ele in Book.data.chosenFile) {
            let button = document.createElement('button')
            Object.assign(button, {
              className: 'navButton',
              innerText: ele,
              onclick: function() {
                changeTab(ele, this)
              }
            })
            root.appendChild(button)
          }
        }
        let addColumn = Object.assign(document.createElement('button'), {
          innerText : '+new column',
          id : 'addColumn',
          onclick: function() {
            Book.data.chosenFile["EditThisName"] = {};
            render()
          }
        })
        root.appendChild(addColumn)
      }
      render()
      Book.events.columnChange = function() {
        render();
      }
      return box;
    },
    mainNavBar: function(display) {
      let box = document.createElement('div')
      Object.assign(box, {
        id: 'Book.html._navBars.mainNavBar'
      })
      Book.refs.mainNavBar = box;
      let root = box.createShadowRoot();
      let style = document.createElement('style')
      style.innerHTML = Book.css.boxes.topLeftNav()
      root.appendChild(style)
      let buttons
      let chosenButton
      let commands = {
        file : function(choice) {
          let modal = Book.html.modals[choice + 'File']({commands: commands})
          Book.refs.container.appendChild(modal)
        },
        changeTab : function(choice, ele) {
          try {
            chosenButton.className = 'navButton'
          } catch(err) {}
          chosenButton = ele
          ele.className = 'navButton chosen'
          display.render(choice)
        },
        preferences : function() {
          console.log('preferences')
        },
        open : function() {
          buttons.remove();
          buttons = Book.html._navBars.mainButtons(commands.changeTab)
          topDiv.appendChild(buttons)
          let firstItem = Object.keys(Book.data.chosenFile)[0]
          display.render(firstItem)
        }
      }
      let topDiv = document.createElement('div');
      topDiv.id = 'topDiv'
      let collapsed = false;
      let bottomDiv = Object.assign(document.createElement('div'), {
        innerHTML: `<button id='collapseNav'>^</button>`,
        style: `height: .4rem;text-align:center;`,
        onclick: function() {
          collapsed = !collapsed;
          if (collapsed) {
            topDiv.style.display = 'none';
            this.style = 'height: .4rem;text-align:center;margin-top: .2rem;'
          }
          else {
            topDiv.style.display = 'flex';
            this.style = 'height: .4rem;text-align:center;margin-top: 0rem;'
          }
        }
      })
      let file = Book.html._navBars.file(commands.file)
      let faq = Book.html._navBars.faqButton()
      let Lycelia = Object.assign(document.createElement('button'), {
        innerHTML :`<a href='http://www.lycelia.com'><i>Lycelia</i></a>`,
        id: 'LyceliaButton'
      })
      let devMode = Book.lib.createNode('button', {
        innerHTML : 'devMode',
        onclick: function() {window.open('index2.html')}
      })
      buttons = Book.html._navBars.mainButtons()
      let left = Object.assign(document.createElement('div'), {
        id: 'left'
      })
      let leftItems = [file, Lycelia, faq, devMode]
      leftItems.forEach((ele) => left.appendChild(ele))
      topDiv.appendChild(left)
      root.appendChild(topDiv)
      root.appendChild(bottomDiv)
      return box;
    },
    displayTopUI : function ({mainDisplay, id}) {
      let item =  Book.lib.createComponent({
        id: 'Book.html._navBars.displayTopUI',
        css: Book.css.boxes.displayTopUI(),
        html: `
          <div id='left'>
            <button class='baseButtons2' id = 'show'>Show All</button>
            <button class='baseButtons2' id='fold1'>Fold >1</button>
            <button class='baseButtons2' id='fold2'>Fold >2</button>
          </div>
          <div id='right'></div>
        `,
        js: function({style, box, parent, root, opts}) {
          root.querySelector('#show').onclick = function() {mainDisplay.showAll()}
          root.querySelector('#fold1').onclick = function() {mainDisplay.fold(1)}
          root.querySelector('#fold2').onclick = function() {mainDisplay.fold(2)}
          let rightButtons = root.querySelector('#right')
          Object.assign(opts, {
            newButton : function(str) {
              let button = Object.assign(document.createElement('button'), {
                'innerHTML': str,
                className : 'rightButtons',
                onclick : function () {
                  mainDisplay.swapDisplayObject(str)
                }
              })
              rightButtons.appendChild(button)
            },
            clear : function() {
              rightButtons.innerHTML = ''
            }
          })
        }
      })
      Book.refs.secondaryNavBar = item.box;
      return item;
    },
    faqButton: function() {
      let button = Object.assign(document.createElement('button'), {
        onclick: function() {
          window.open('FAQ.html', '_blank')
        },
        innerText: 'FAQ'
      })
      return button;
    },
    file: function(callback) {
      let select = Object.assign(document.createElement('select'), {
        onclick: function() {
          if (this.selectedIndex > 0) {
            callback(this.value)
            this.selectedIndex = 0;
          }
        }
      })
      let options = ['file', 'open', 'create', 'save', 'upload', 'preferences']
      let values = ['File', 'Open', 'New File', 'Download', 'Upload', 'Preferences']
      for (var j = 0; j < options.length; j++) {
        let option = Object.assign(document.createElement('option'), {
          'value': options[j],
          'innerText': values[j]
        })
       select.appendChild(option);
      }
      return select;
    }
  },
  modals : {
    preferencesFile : function() {
      let item =  Book.lib.createComponent({
        id: 'Book.html.modals.preferencesFile',
        css: Book.css.modals.preferencesFile(),
        html: `
          <div id='centerModal'>
          <button id='exit'>X</button>
          <b>Edit Preferences </b>
          <br>
          <form id = 'prefForm'>
            <b>Choose a style theme</b>
            <select id='themeSelect'>
              <option value='default'>default</option>
              <option value='sparky'>Sparky</option>
              <option value='Theme1'>Theme1</option>
            </select>
            <input type = 'submit' class='btnSubmit'>
          </form>
          (Must refresh afterwards to see new style theme)
          </div>
        `,
        js: function({style, box, parent, root}) {
          Book.js.baseModal(box, root)
          root.querySelector('#prefForm').onsubmit = function(event) {
            event.preventDefault()
            Book.data.local.preferences.theme = root.querySelector('#themeSelect').value
            Book.events.updatePreferences(root.querySelector('#themeSelect').value);
            box.remove();
            return 0;
          }
        }
      })
      return item.box;
    },
    addLine : function(path, focused) {
      let item =  Book.lib.createComponent({
        id: 'Book.html.modals.addLine',
        css: Book.css.modals.addLine(),
        html: `
          <div id='centerModal'>
           <form id='addLineForm'>
            <b>Create New Line</b>
            <button id='exit'>X</button>
            <br>
            <label>line name</label> <input required id ='name' type='text' placeholder='name'><br>
            <label>Select Template</label> <select id='selectTemplate'>
              <option value='textblock'>Text block</option>
              <option value='container'>Container</option>
              <option value='character'>new character</option>
              <option value='chapter'>new chapter</option>
            </select><br>
            <input type='submit' value='Submit' class='btnSubmit'>
            <div id='status'></div>
           </form>
          </div>
        `,
        js: function({style, box, parent, root}) {
          Book.js.baseModal(box, root);
          root.querySelector('#addLineForm').onsubmit = function(event) {
            event.preventDefault();
            let name = this.querySelector('#name').value
            let template = this.querySelector('#selectTemplate').value
            if (name != '' && path[name] === undefined) {
              path[name] = Book.js.templates[template]()
              console.log(focused)
              Book.events.bodyChange(focused)
            }
            box.remove();
            return false;
          }
        }
      })
      return item.box;
    },
    uploadFile : function() {
      let item =  Book.lib.createComponent({
        id: 'Book.html.modals.uploadFile',
        css: Book.css.modals.uploadFile(),
        html: `
          <div id='centerModal'>
            <b>Upload backup</b>
            <button id='exit' >X</button>
            <br>
            Warning, may overwrite projects already in your localStorage<br>
            <input id='fileUpload' type='file' value='Upload'>
            <input type = 'submit' id='submit' class='btnSubmit'>
          </div>
        `,
        js: function({style, box, parent, root}) {
          Book.js.baseModal(box, root)
          root.querySelector('#submit').onclick = function() {
            var input = root.querySelector('#fileUpload')
            var reader = new FileReader();
            if (input.files.length) {
                var textFile = input.files[0];
                reader.onload = function(e) {
                  Object.assign(Book.data.local.files, JSON.parse(e.target.result))
                };
                reader.readAsText(textFile)
            } else {
                alert('Please upload a file before continuing')
            }
          }
        }
      })
      return item.box;
    },
    saveFile : function() {
      let textarea = Object.assign(document.createElement('textarea'), {
        innerText: JSON.stringify(Book.data.local.files,0,2)
      })
      var myblob = new Blob([textarea.innerText], {
        type: 'text/plain'
      });
      let url = URL.createObjectURL(myblob);
      let date = new Date()
      let item =  Book.lib.createComponent({
        id: 'Book.html.modals.saveFile',
        css: Book.css.modals.saveFile(),
        html: `
          <div id='centerModal'>
            <b>Save a Backup</b>
            <button id='exit'>X</button>
            <br>
            Your files are saved automatically to your localStorage every fifteen seconds but if you wipe your cookies you could lose them.
            To avoid that, save a backup copy to your computer using the button below.
            Left-click to save to downloads folder or right-click to choose location on harddrive to save to.
            <a href="${url}" download="AuthorPal-${date.toDateString()}">Download</a>
          </div>
        `,
        js: function({style, box, parent, root}) {
          Book.js.baseModal(box, root)
        }
      })
      return item.box;
    },
    createFile: function({commands}) {
      let item =  Book.lib.createComponent({
        id: 'Book.html.modals.createFile',
        css: Book.css.modals.createFile(),
        html: `
          <div id='centerModal'>
           <form id = 'createForm'>
            <button id='exit'>X</button>
            <b>Create New Project</b>
            <br>
            <label>Project name</label> <input required id ='name' type='text' placeholder='name'><br>
            <label>Select Template</label> <select id='selectTemplate'>
              <option value='standard'>standard</option>
            </select><br>
            <input type='submit' value='Submit' class='btnSubmit'>
            <div id='status'></div>
           </form>
          </div>
        `,
        js: function({style, box, parent, root}) {
          Book.js.baseModal(box, root)
          root.querySelector('#createForm').onsubmit = function(event) {
            event.preventDefault();
            let name = this.querySelector('#name').value
            let template = this.querySelector('#selectTemplate').value
            if (name != '' && Book.data.local.files[name] === undefined) {
              Book.data.local.files[name] = Book.js.templates.standard()
              box.remove()
              Book.data.chosenFile = Book.data.local.files[name]
              commands.open()
            } else {
              let msg = Object.assign(document.createElement('b'), {
                innerText: ' | Name is already taken! | ',
                style: 'color: blue;'
              })
              root.appendChild(msg)
            }
            return false;
          }
        }
      })
      return item.box;
    },
    openFile: function({commands}) {
        let item =  Book.lib.createComponent({
          id: 'Book.html.modals.openFile',
          css: Book.css.modals.openFile(),
          html: `
            <div id='centerModal'>
              <button id='exit'>X</button>
            </div>
          `,
          js: function({style, box, parent, root}) {
            Book.js.baseModal(box, root)
            for (let x in Book.data.local.files) {
              let file = Object.assign(document.createElement('button'), {
                className:'fileBtn',
                innerText: x,
                onclick: function() {
                  Book.data.chosenFile = Book.data.local.files[x]
                  commands.open()
                  box.remove()
                }
              })
              root.querySelector('#centerModal').appendChild(file)
            }
          }
        })
        return item.box;
      },
    confirmationDelete : function(name, callback) {
        let item =  Book.lib.createComponent({
          id: 'Book.html.modals.confirmationDelete',
          css: Book.css.modals.confirmationDelete(),
          html: `
            <div id='centerModal'>
              <button id='exit'>X</button>
              <h2>Are you sure you would like to delete "${name}"?</h2>
              <button id='yes' class='btnWarn'>Yes</button><button id='cancel'>Cancel</button>
            </div>
          `,
          js: function({style, box, parent, root}) {
            Book.js.baseModal(box, root)
            root.querySelector('#yes').onclick = function() {callback(); box.remove();}
            root.querySelector('#cancel').onclick = function() {box.remove();}
          }
        })
        return item.box;
      }
  }
}
_ = obj;
return obj
}
