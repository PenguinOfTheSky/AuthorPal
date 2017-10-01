  /*
  If using css to affect all divs, make sure to exclude .component class if desired
  */
Object.assign(TS.html,
{
  display: {
    splash : function() {
      return TS.lib.createComponent({
      id: 'TS.html.display.splash',
      css: TS.css.boxes.splash(),
      js: function({style, box, parent}) {
      },
      html: `
        <h1><a href='http://www.lycelia.com'><i>Lycelia</i></a>'s <i>AuthorPal</i> v2.0.5</h1>
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
        id: 'TS.html.display'
      })
      let root = box.createShadowRoot()
      let currentID = ''
      let sorted = ''
      root.appendChild(TS.html.display.splash().box)
      let opts = {
        element : box,
        render : function(id) {
          currentID = id
          root.innerHTML = ''
          sorted = TS.html.display.sort(id)
          root.appendChild(sorted.element)
        }
      }
      TS.events.bodyChange = function(focused) {
        if (focused.length == 0) {
          root.innerHTML = ''
          sorted = TS.html.display.sort(currentID)
          root.appendChild(sorted.element)
        } else {
          root.innerHTML = ''
          sorted = TS.html.display.sort(currentID)
          root.appendChild(sorted.element)
          sorted.opts.update(focused)
        }

      }
      return opts;
    },
    sort: function(id) {
      let box = document.createElement('div')
      Object.assign(box, {
        id: 'TS.html.display.sort'
      })
      box.style = TS.css.boxes.wholeDisplayContainer()
      let root = box.createShadowRoot()
      let mainDisplay = TS.html.display.renderedList(id)
      let topUI = TS.html._navBars.displayTopUI({mainDisplay: mainDisplay.opts, id : id})
      if (typeof(TS.data.chosenFile[id]) == 'object' ) {
        for (let item in TS.data.chosenFile[id]) {
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
        id: 'TS.html.display.renderedList'
      })
      TS.refs.display = box;
      let root = box.createShadowRoot()
      let style = document.createElement('style');
      style.innerHTML = TS.css.boxes.display()
      root.appendChild(style)
      let determine = function(item, itemName, path, {maxDepth, depth}) {
        let formatType
        if (depth == undefined) depth = 0;
        if (itemName[0] === '*') {
          formatType = function(a) {return a}
        } else if (itemName[0] === '_') {
          formatType = function(a) {return a}
        }else {
          formatType = function(a) {return marked(a)}
        }
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
              TS.events.columnChange()
            } else {
              console.log('name taken')
              this.innerText = oldItemName
            }
          }
        })
        let buttonGroup = Object.assign(document.createElement('div'), {
          className: 'buttonGroup'
        })
        let keyDelete = Object.assign(document.createElement('button'), {
          innerHTML: '<b>-</b>',
          className: 'deleteLine',
          onclick: function() {
            callback = function() {
              delete path[itemName]
              TS.events.columnChange()
              if (focused.length > 0 && focused[1] !== itemName) {TS.events.bodyChange(focused)}
              else TS.events.bodyChange([])
            }
            document.body.appendChild(TS.html.modals.confirmationDelete(itemName, callback))
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
        buttonGroup.appendChild(focusMe)
        line.appendChild(title)
        lineBody = Object.assign(document.createElement('div'), {
          className: 'lineBody'
        })
        if (typeof(item) == 'string' && maxDepth == undefined) {
          let textField = Object.assign(document.createElement('div'), {
            className: 'textField',
            contentEditable: true,
            onfocus: function() {
              this.innerText = path[itemName]
            },
            onblur: function() {
              path[itemName] = this.innerText
              if (itemName[0] === '*') {}
              else {this.innerHTML = formatType(this.innerText);}
            }
          })
          if (itemName[0]==='*') {
            textField.innerText = item
          } else {
            textField.innerHTML = formatType(item)
          }
          lineBody.appendChild(textField)
        }
        else if (typeof(item) == 'object') {
          let add = Object.assign(document.createElement('button'), {
            className: 'addLine',
            onclick : function() {
              TS.refs.container.appendChild(TS.html.modals.addLine(path[itemName], focused))
            },
            innerHTML: '+New Line'
          })
          buttonGroup.appendChild(add)
          if (maxDepth === undefined || depth < maxDepth) {
            for (let x in item) {
              lineBody.appendChild(determine(item[x], x, item, {maxDepth: maxDepth, depth: 1+depth}))
            }
          }
        }
        if (typeof(item) == 'object' && Object.keys(item).length == 0) {}
        else line.appendChild(lineBody)
        if (itemName === TS.data.addedLine) {
          delete TS.data.addedLine
          TS.data.scrollToLine = line;
          setTimeout(function(){
            let height = TS.data.scrollToLine.getBoundingClientRect().top - TS.refs.mainNavBar.clientHeight
            if (TS.data.alignment == 'top') {height -= TS.refs.secondaryNavBar.clientHeight}
            TS.refs.display.scrollTop = height;
          }, 20)
        }
        return line
      }
      root.appendChild(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {}))
      let opts = {
        showAll: function() {
          focused = []
          root.innerHTML = '';
          root.appendChild(style)
          root.appendChild(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {}))
        },
        fold: function(n) {
          root.innerHTML = '';
          root.appendChild(style)
          if (focused.length == 0)
            root.appendChild(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {maxDepth:n}))
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
          root.appendChild(determine(TS.data.chosenFile[id][key], key, TS.data.chosenFile[id], {}))
          focused = [TS.data.chosenFile[id][key], key, TS.data.chosenFile[id], {}]
        },
        update : function(item) {
          focused = item;
          root.innerHTML = '';
          root.appendChild(style)
          if (focused.length>0) root.appendChild(determine(...item))
          else root.appendChild(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {}))
        }
      }
      let x = this
      setTimeout(function() {
        let height = window.innerHeight - TS.refs.mainNavBar.clientHeight
        if (TS.data.alignment == 'top') {height -= TS.refs.secondaryNavBar.clientHeight}
        TS.refs.display.style["max-height"] = height + 'px'
      },20)
      return {element: box, opts: opts};
    }
  },

  _navBars : {
    mainButtons : function(changeTab) {
      let box = document.createElement('div')
      Object.assign(box, {
        id: 'TS.html._navBars.mainButtons'
      })
      let root = box.attachShadow({ mode: 'open' });
      let render = function() {
        let style = document.createElement('style')
        style.innerText = TS.css.boxes.mainButtons()
        root.innerHTML = ``;
        root.appendChild(style)
        if (TS.data.chosenFile !== undefined) {
          for (let ele in TS.data.chosenFile) {
            if (ele == 'master_root') continue;
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
            TS.data.chosenFile["EditThisName"] = {};
            render()
          }
        })
        root.appendChild(addColumn)
      }
      render()
      TS.events.columnChange = function() {
        render();
      }
      return box;
    },
    mainNavBar: function(display) {
      let box = document.createElement('div')
      Object.assign(box, {
        id: 'TS.html._navBars.mainNavBar'
      })
      TS.refs.mainNavBar = box;
      let root = box.createShadowRoot();
      let style = document.createElement('style')
      style.innerHTML = TS.css.boxes.topLeftNav()
      root.appendChild(style)
      let buttons, chosenButton;
      let commands = {
        file : function(choice) {
          let modal = TS.html.modals[choice + 'File']({commands: commands})
          TS.refs.container.appendChild(modal)
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
        },
        open : function() {
          buttons.remove();
          buttons = TS.html._navBars.mainButtons(commands.changeTab)
          topDiv.appendChild(buttons)
          let firstItem = Object.keys(TS.data.chosenFile)[0]
          if (firstItem ==='master_root') firstItem = Object.keys(TS.data.chosenFile)[1]
          display.render(firstItem)
        }
      }
      let topDiv = document.createElement('div');
      topDiv.id = 'topDiv'
      let collapsed = false;
      let bottomDiv = Object.assign(document.createElement('div'), {
        innerHTML: `<button id='collapseNav'>^</button>`,
        style: `height: .4rem;text-align:center;`,
        onclick: function(event) {
          if(event.target.id !== "collapseNav")
            return;
          collapsed = !collapsed;
          if (collapsed) {
            topDiv.style.display = 'none';
            this.children[0].style = 'height: .4rem;text-align:center;margin-top: .2rem;'
          }
          else {
            topDiv.style.display = 'flex';
            this.children[0].style = 'height: .4rem;text-align:center;margin-top: 0rem;'
          }
        }
      })
      let file = TS.html._navBars.file(commands.file)
      let faq = TS.html._navBars.faqButton()
      buttons = TS.html._navBars.mainButtons()
      let left = Object.assign(document.createElement('div'), {
        id: 'left'
      })
      let leftItems = [file, faq]
      leftItems.forEach((ele) => left.appendChild(ele))
      topDiv.appendChild(left)
      root.appendChild(topDiv)
      root.appendChild(bottomDiv)
      return box;
    },
    displayTopUI : function ({mainDisplay, id}) {
      let item =  TS.lib.createComponent({
        id: 'TS.html._navBars.displayTopUI',
        css: TS.css.boxes.displayTopUI(),
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
      TS.refs.secondaryNavBar = item.box;
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
            switch (this.value) {
              case "devMode":
                window.open('devMode.html');break;
              default:
                callback(this.value)
            }
            this.selectedIndex = 0;
          }
        }
      })
      let options = ['menu', 'open', 'create', 'save', 'upload', 'preferences', 'export', 'devMode']
      let values = ['Menu', 'Open File', 'New File', 'Download', 'Upload', 'Themes', 'Export File', "Dev. Mode"]
      for (var j = 0; j < options.length; j++) {
        let option = Object.assign(document.createElement('option'), {
          'value': options[j],
          'innerText': values[j]
        })
       select.appendChild(option);
      }
      return select;
    }
  }
}
)
