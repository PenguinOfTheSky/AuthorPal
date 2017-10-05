TS.html._navBars = {
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
      let addColumn = Object.assign(document.createElement('button'), {
        innerText : '+new column',
        id : 'addColumn',
        onclick: function() {
          TS.data.chosenFile["EditThisName"] = {};
          TS.refs.displayOpts.render('EditThisName')
        }
      })
      root.appendChild(addColumn)
    }
    render()
    TS.events.columnChange = function(name) {
      TS.refs.displayOpts.render(name)
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
    TS.refs.displayOpts = display;
    TS.events.openFile = commands.open
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
          this.style = 'height: .4rem;text-align:center;margin-top: .2rem;'
        }
        else {
          topDiv.style.display = 'flex';
          this.style = 'height: .4rem;text-align:center;margin-top: 0rem;'
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
        <div id='tree'></div>
      `,
      js: function({style, box, parent, root, opts}) {
        root.querySelector('#show').onclick = function() {mainDisplay.showAll()}
        root.querySelector('#fold1').onclick = function() {mainDisplay.fold(1)}
        root.querySelector('#fold2').onclick = function() {mainDisplay.fold(2)}
        let treeButtons = root.querySelector('#tree')
        let ul = document.createElement('ul')
        ul.className = 'ul_0'
        let V_ul = {}
        let list = [ul]
        treeButtons.appendChild(ul)
        Object.assign(opts, {
          newButton : function(str) {
            let button = Object.assign(document.createElement('li'), {
              'innerHTML': str,
              className : 'rightButtons',
              onclick : function () {
                mainDisplay.swapDisplayObject(str)
              }
            })
            ul.appendChild(button)
          },
          makeList: function(path) {
            let V_target = V_ul;
            let target = TS.data.chosenFile;
            for (let i = 0; i < path.length; i++) {
              V_target = V_target[path[i]]
              target = target[path[i]]
            }
            let subUL = opts.subInit(target, path.length, path)
            list.push(subUL)
            list[list.length-2].insertBefore(subUL, V_target.nextSibling)
            return subUL
          },
          focus: function() {

          },
          subInit: function(obj, depth, path) {
            let subUL = TS.lib.createNode('ul', {
              className: `ul_${depth}`
            })
            let V_target = V_ul
            path.forEach(ele => {
              V_target = V_target[ele]
            })
            for (let str in obj) {
              let targ = path.concat([str])
              let li =  Object.assign(document.createElement('li'), {
                'innerHTML': str,
                className : `rightButtons li_${depth}`,
                onclick : function () {
                  TS.data.currentView = targ
                  TS.refs.displayOpts.swapFocus(obj, str)
                  let discard = list.slice(depth+1)
                  list = list.slice(0,depth+1)
                  if(discard.length>0) discard[0].remove()
                  if (depth <4 && typeof(obj[targ[targ.length-1]]) == 'object') {opts.makeList(targ)}
                }
              })
              V_target[str] = li;
              subUL.appendChild(li)
            }
            return subUL
          },
          init: function() {
            let obj = TS.data.chosenFile
            let focused;
            for (let str in obj) {
              let focus = this.makeList
              let li =  Object.assign(document.createElement('li'), {
                'innerHTML': str,
                className : 'rightButtons li_0',
                onclick : function () {
                  TS.data.currentView = [str]
                  TS.refs.displayOpts.swapTab(str, this)
                  //mainDisplay.swapDisplayObject(str)
                  list = [ul]
                  if (focused) focused.remove();
                  focused = focus([str])
                }
              })
              V_ul[str] = li;
              ul.appendChild(li)
            }
          },
          clear : function() {
            ul.innerHTML = ''
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
