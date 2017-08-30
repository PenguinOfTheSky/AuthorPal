Book.html = {
  display: {
    start: function() {
      let box = document.createElement('div')
      Object.assign(box, {
        style: /*Book.css.centerText+  cascades to rest of textbox, need to confine the centering*/Book.css.glass + 'padding-top:.6rem;',
        id: 'Book.html.display'
      })
      let root = box.createShadowRoot()
	    let style = document.createElement('style');
      style.innerText = `
	      h4 {
            text-align:center;
		        color:white;
        }`
      root.appendChild(style)
      let startMessage = document.createElement('div')
      startMessage.innerHTML = `<h4>To get started click the buttons above ^ </h4>
        Lycelia's <i>AuthorPal</i>
        Version <span style="color:blue">1.06</span> <br>
        Confused? Click FAQ or go to <a style="color:grey" href='https://github.com/PenguinOfTheSky/AuthorPal'>https://github.com/PenguinOfTheSky/AuthorPal</a>
      `
      let currentID = ''
      let sorted = ''
      root.appendChild(startMessage)
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
        style: Book.css.air,
        id: 'Book.html.display.sort'
      })
      let root = box.createShadowRoot()

      let mainDisplay = Book.html.display.renderedList(id)

      let topUI = Book.html._navBars.displayTopUI({mainDisplay: mainDisplay.opts, id : id})
      if (typeof(Book.data.chosenFile[id]) == 'object' ) {
        for (let item in Book.data.chosenFile[id]) {
          topUI.options.newButton(item)
        }
      }
      root.appendChild(topUI.main)
      let navFiller = document.createElement('div')
      let script = document.createElement('script')
      script.innerHTML = `document.currentScript.parentNode.style.height = document.currentScript.parentNode.parentNode.firstChild.clientHeight + 3 + 'px';`
      navFiller.appendChild(script)
      root.appendChild(navFiller)
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
        style: "overflow-x: scroll;border: 1px solid blue;",
        name: 'mainDisplayView'
      })
      let root = box.createShadowRoot()
      let style = document.createElement('style');
      style.innerText = Book.css.display
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
          style: "color:black;margin: auto;padding:.5rem;",
          innerHTML: itemName,
          contentEditable: true,
          onblur: function() {
            if (path[this.innerHTML] === undefined) {
              path[this.innerHTML] = item
              delete path[itemName];
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
            delete path[itemName]
            Book.events.columnChange()
            if (focused.length > 0 && focused[1] !== itemName) Book.events.bodyChange(focused)
            else Book.events.bodyChange([])
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
            innerHTML: item,
            isRaw: "false",
            contentEditable: true,
            onblur: function() {
              if (this.getAttribute('isRaw') == "false")
              path[itemName] = this.innerHTML
              else {
                path[itemName] = this.innerText
                this.innerHTML = this.innerText;
                this.setAttribute('isRaw', 'false')
                this.className = 'textField'
              }
            }
          })
          let htmlEdit = Object.assign(document.createElement('button'), {
            innerText: 'editHTML',
            className: 'editHTML',
            onclick: function() {
              textField.setAttribute('isRaw', 'true');
              textField.className = 'textField isRaw'
              textField.innerText = path[itemName];
            },
            contentEditable: false
          })
          buttonGroup.appendChild(htmlEdit)
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
        style.innerText = Book.css.mainButtons()
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
        setTimeout(function() {Book.refs.topNavFiller.style.height = box.clientHeight + 'px';}, 20) //find a better way to do this.
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
      let root = box.createShadowRoot();
      let style = document.createElement('style')
      style.innerHTML = Book.css.topLeftNav()
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
          box.onmouseover = function() {
            box.style = `${Book.css.glass} display:flex; max-width:100%;`
            Book.refs.topNavFiller.style.height = box.clientHeight + 'px'
            clearTimeout(Book.events.hideNavBar)
            clearInterval(Book.events.hideNavBarAnim)
          }
          box.onmouseout = function() {
            console.log('test')
            Book.events.hideNavBar = setTimeout(function(){
              let height = box.clientHeight
              let bodyHeight = document.body.clientHeight
              let increment = height/40;
              Book.events.hideNavBarAnim = setInterval(function() {
                height -= increment
                box.style = `${Book.css.glass} display:flex; max-width:100%;height:${height}px;overflow-y:hidden;`
                Book.refs.topNavFiller.style.height = height + 'px'
                if (height <= .017 * bodyHeight) {
                  clearInterval(Book.events.hideNavBarAnim)
                  box.style = `${Book.css.glass} display:flex; max-width:100%;height:${height}px;border-top:${height}px groove purple;overflow-y:hidden;`
                }
              }, 20)
            },300)
          }
          buttons.remove();
          buttons = Book.html._navBars.mainButtons(commands.changeTab)
          root.appendChild(buttons)
          let firstItem = Object.keys(Book.data.chosenFile)[0]
          display.render(firstItem)
        }
      }
      let file = Book.html._navBars.file(commands.file)
      let faq = Book.html._navBars.faqButton()
      let Lycelia = Object.assign(document.createElement('button'), {
        innerHTML :`<a href='http://www.lycelia.com'><i>Lycelia</i></a>`,
        id: 'LyceliaButton'
      })
      buttons = Book.html._navBars.mainButtons()
      let left = Object.assign(document.createElement('div'), {
        id: 'left'
      })
      let leftItems = [file, Lycelia, faq]
      leftItems.forEach((ele) => left.appendChild(ele))
      root.appendChild(left)
      return box;
    },
    displayTopUI : function({mainDisplay, id}) {
      let doc = Object.assign(document.createElement('div'), {
      style :  `background-color: white; min-height:1.5rem;display:flex;position:fixed;`
      })
      let root = doc.createShadowRoot();
      let style = Object.assign(document.createElement('style'), {
        innerHTML: Book.css.displayUI
      })
      root.appendChild(style)
      let baseButtons = Object.assign(document.createElement('div'), {
        id: 'baseButtonsDiv'
      })
      let showAll = Object.assign(document.createElement('button'), {
        innerHTML : 'Show all',
        className: 'leftButtons',
        style: `background-color: rgba(255,205,200,.6); `,
        onclick : function () {
          mainDisplay.showAll()
        }
      })
      let fold1 =Object.assign(document.createElement('button'), {
        innerHTML : 'Fold > 1',
        className: 'leftButtons',
        style: `background-color: rgba(200,205,255,.6);`,
        onclick : function () {
          mainDisplay.fold(1)
        }
      })
      let fold2 = Object.assign(document.createElement('button'), {
        innerHTML : 'Fold > 2',
        className: 'leftButtons',
        style: `background-color: rgba(170,185,255,.8);`,
        onclick : function () {
          mainDisplay.fold(2)
        }
      })
      baseButtons.appendChild(showAll)
      baseButtons.appendChild(fold1)
      baseButtons.appendChild(fold2)
      root.appendChild(baseButtons)
      let rightButtons = Object.assign(document.createElement('div'), {
        style: 'display:inline-block;'
      })
      root.appendChild(rightButtons)
      let options = {
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
      }
      return {options: options, main: doc}
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
      let values = ['File', 'Open', 'New', 'Download', 'Upload', 'Preferences']
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
          let box = Object.assign(document.createElement('div'), {
            id: 'Book.html.modals.saveFile',
            style: Book.css.black
              + 'box-shadow: 1px 1px 3px 4px black; padding:5px;position: absolute; z-index: 5;top:10%;min-height:20%; width:80%;left:0;right:0;margin: 0 auto;'
          })
          let root = box.createShadowRoot();
          let div = Object.assign(document.createElement('div'), {
            innerHTML : `
              <b>Edit Preferences (Not currently functional, coming soon!)</b>
              <button id='exit' style='float:right;${Book.css.gold}'>X</button>
              <br>
              <div>
                <label>Choose navbar alignment</label>
                <select id='navbarSelect'>
                  <option value='top'>Top</option>
                  <option value='left'>Left</option>
                </select>
              </div>
              <input type = 'submit' id='submit'>
            `,
            style: 'text-align: center;'
          })

          root.appendChild(div)
          div.querySelector('#exit').onclick = function() {
            box.remove();
          }
          return box
        },
    addLine : function(path, focused) {
      let box = Object.assign(document.createElement('div'), {
        id: 'Book.html.modals.addLine'
      })
      let root = box.createShadowRoot();
      let style = document.createElement('style')
      style.innerText = Book.css.add()
      root.appendChild(style)
      let form = Object.assign(document.createElement('form'), {
        style: `width: 100%;height:100%;font-align: center;`,
        innerHTML :
          `<legend>Create New Line</legend>
          <button id='exit' style='float:right;${Book.css.gold}'>X</button>
          <br>
          <label>line name</label> <input required id ='name' type='text' placeholder='name'><br>
          <label>Select Template</label> <select id='selectTemplate' style="${Book.css.gold}">
            <option value='textblock'>Text block</option>
            <option value='container'>Container</option>
            <option value='character'>new character</option>
            <option value='chapter'>new chapter</option>
          </select><br>
          <input type='submit' value='Submit' style="${Book.css.gold}">
          <div id='status'></div>`,
        onsubmit: function(event) {
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
      })


      root.appendChild(form)
      form.querySelector('#exit').onclick = function() {
        box.remove();
      }
      return box;
    },
    uploadFile : function() {
          let box = Object.assign(document.createElement('div'), {
            id: 'Book.html.modals.saveFile',
            style: Book.css.black
              + 'box-shadow: 1px 1px 3px 4px black; padding:5px;position: absolute; z-index: 5;top:10%;min-height:20%; width:80%;left:0;right:0;margin: 0 auto;'
          })
          let root = box.createShadowRoot();
          let div = Object.assign(document.createElement('div'), {
            innerHTML : `
              <b>Upload backup</b>
              <button id='exit' style='float:right;${Book.css.gold}'>X</button>
              <br>
              Warning, may overwrite projects already in your localStorage<br>
              <input id='fileUpload' type='file' value='Upload'>
              <input type = 'submit' id='submit'>
            `,
            style: 'text-align: center;'
          })
          div.querySelector('#submit').onclick=function() {
            var input = div.querySelector('#fileUpload')

            // Create a reader object
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
          root.appendChild(div)
          div.querySelector('#exit').onclick = function() {
            box.remove();
          }
          return box
        },
    saveFile : function() {
      let box = Object.assign(document.createElement('div'), {
        id: 'Book.html.modals.saveFile',
        style: Book.css.black
          + 'box-shadow: 1px 1px 3px 4px black; padding:5px;position: absolute; z-index: 5;top:10%;min-height:20%; width:80%;left:0;right:0;margin: 0 auto;'
      })
      let root = box.createShadowRoot();
      let textarea = Object.assign(document.createElement('textarea'), {
        innerText: JSON.stringify(Book.data.local.files,0,2)
      })
      var myblob = new Blob([textarea.innerText], {
        type: 'text/plain'
      });
      let url = URL.createObjectURL(myblob);
      let date = new Date()
      let div = Object.assign(document.createElement('div'), {
        innerHTML : `
          <b>Save a Backup</b>
          <button id='exit' style='float:right;${Book.css.gold}'>X</button>
          <br>
          Your files are saved automatically to your localStorage every sixty seconds but if you wipe your cookies you could lose them.
          To avoid that, save a backup copy to our computer using the button below.
          Left-click to save to downloads folder or right-click to choose location on harddrive.
          <a href="${url}" download="AuthorPal-${date.toDateString()}">Download</a>
        `,
        style: 'text-align: center;'
      })
      root.appendChild(div)
      div.querySelector('#exit').onclick = function() {
        box.remove();
      }
      return box
    },
    createFile : function({commands}) {
      let box = Object.assign(document.createElement('div'), {
        id: 'Book.html.modals.createFile'
      })
      let root = box.createShadowRoot();
      let style = document.createElement('style')
      style.innerText = Book.css.add()
      root.appendChild(style)
      let form = Object.assign(document.createElement('form'), {
        style: `width: 100%;height:100%;font-align: center;`,
        innerHTML :
          `<legend>Create New Project</legend>
          <button id='exit' style='float:right;${Book.css.gold}'>X</button>
          <br>
          <label>Project name</label> <input required id ='name' type='text' placeholder='name'><br>
          <label>Select Template</label> <select id='selectTemplate' style="${Book.css.gold}">
            <option value='standard'>standard</option>
          </select><br>
          <input type='submit' value='Submit' style="${Book.css.gold}">
          <div id='status'></div>`,
        onsubmit: function(event) {
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
      })
      root.appendChild(form)
      form.querySelector('#exit').onclick = function() {
        box.remove();
      }
      return box;
    },
    openFile: function({commands}) {
      let background = Object.assign(document.createElement('div'), {
        id: 'Book.html.modals.openFile',
        onclick: function() {
          this.remove()
        },
        style: "background-color: rgba(0,0,0,.4);"
          + 'box-shadow: 1px 1px 3px 4px black; padding:5px;position: absolute; z-index: 4;top:0;height:100%; width:100%;'

      })
      let box = Object.assign(document.createElement('div'), {
        id: 'Book.html.modals.openFile',
        onclick: function(event) {
          event.stopPropagation()
        },
        style: Book.css.black
          + 'box-shadow: 1px 1px 3px 4px black; padding:5px;position: absolute; z-index: 5;top:10%;min-height:20%; width:80%;left:0;right:0;margin: 0 auto;'

      })
      let root = box.createShadowRoot();
      let exit =  Object.assign(document.createElement('button'), {
        style: Book.css.gold + 'border: 2px solid red;float:right;',
        innerText:'X',
        onclick: function() {
          background.remove()
        }
      })
      root.appendChild(exit)
      for (let x in Book.data.local.files) {
        let file = Object.assign(document.createElement('button'), {
          style: Book.css.gold + 'font-size:1rem;margin:1px;',
          innerText: x,
          onclick: function() {
            Book.data.chosenFile = Book.data.local.files[x]
            commands.open()
            background.remove()
          }
        })
        root.appendChild(file)
      }
      background.appendChild(box)
      return background;
    }
  }
}
