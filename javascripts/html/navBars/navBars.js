/* global TS */
Object.assign(TS.html._navBars, {
  topNavFileButtons: function () {
    let box = document.createElement("div");
    Object.assign(box, {
      id: "TS.html._navBars.topNavFileButtons"
    });
    let root = box.attachShadow({
      mode: "open"
    });

    let style = document.createElement("style");
    style.innerText = TS.css.boxes.topNavFileButtons();
    let openedFiles = TS.lib.createNode("div", {
      id: "openedFiles"
    });
    root.append(openedFiles, style);
    let openFiles = {};
    let opts = {
      add: function (name) {
        if (openFiles[name] !== undefined) return 0;
        openFiles[name] = true;
        if (TS.data.chosenFileButton) {
          TS.data.chosenFileButton.className = 'navButton'
        }
        let btn = TS.lib.createNode("button", {
          className: 'navButton chosen',
          innerText: name,
          onclick: function () {
            TS.events.openFile(name, true);
            if (TS.data.chosenFileButton) {
              TS.data.chosenFileButton.className = 'navButton'
            }
            this.className = 'navButton chosen'
            TS.data.chosenFileButton = this
          }
        });
        TS.data.chosenFileButton = btn;
        root.querySelector("#openedFiles").append(btn);
        return root;
      }
    };
    return {
      element: box,
      opts: opts
    };
  },
  mainNavBar: function (display) {
    let box = document.createElement("div");
    Object.assign(box, {
      id: "TS.html._navBars.mainNavBar"
    });
    TS.refs.mainNavBar = box;
    let root = box.attachShadow({
      mode: "open"
    });
    let style = document.createElement("style");
    style.innerHTML = TS.css.boxes.topLeftNav();
    root.append(style);
    let buttons;
    let commands = {
      file: function (choice) {
        let modal = TS.html.modals[choice + "File"]({
          commands: commands
        });
        TS.refs.container.append(modal);
      },
      changeTab: function (choice) {
        display.render(choice);
      },
      preferences: function () {},
      open: function (file, name) {
        toggle.style.display='inline-block';
        TS.data.chosenFile = file;
        let firstItem = Object.keys(TS.data.chosenFile)[0];
        if (firstItem === "master_root") {
          firstItem = Object.keys(TS.data.chosenFile)[1];
        }
        display.render(firstItem);
        TS.refs.treeNav[firstItem].click();
        buttons.opts.add(name);
      }
    };
    TS.refs.displayOpts = display;
    TS.events.openFile = commands.open;
    let topDiv = document.createElement("div");
    topDiv.id = "topDiv";
    buttons = TS.html._navBars.topNavFileButtons(commands.changeTab);
    let collapsed = false;
    let bottomDiv = Object.assign(document.createElement("div"), {
      innerHTML: `<button id='collapseNav'>^</button>`,
      style: `height: .4rem;text-align:center;`,
      onclick: function (event) {
        if (event.target.id !== "collapseNav")
          return;
        collapsed = !collapsed;
        if (collapsed) {
          topDiv.style.display = "none";
          this.style = "height: .4rem;text-align:center;margin-top: .2rem;";
        } else {
          topDiv.style.display = "flex";
          this.style = "height: .4rem;text-align:center;margin-top: 0rem;";
        }
      }
    });
    let file = TS.html._navBars.file_button(commands.file, display);
    let toggle = TS.html._navBars.toggleSite_button() 
    let left = Object.assign(document.createElement("div"), {
      id: "left",
      innerHTML: `
        <img src='icons/iconmonstr-home-7-240.png' title='home' targetName = 'about' class='hoverable'>
        <img src='icons/iconmonstr-note-20-240.png' title='files' targetName = 'filesListContainer' class='hoverable'>
        <img src='icons/iconmonstr-gear-11-240.png' title='admin' targetName = 'admin' class='hoverable'>
        <img src='icons/iconmonstr-help-3-240.png' title='help' targetName = 'help' class='hoverable'>
         `,
      onclick: function(e) {
        if (e.target.getAttribute('targetName')) {
          let d = display.splash();
          d.opts.scroll(e.target.getAttribute('targetName'))
        }
      }
    });
    left.append(file, toggle)
    topDiv.append(left, buttons.element);
    root.append(topDiv, bottomDiv)
    return box;
  },
  displayLeftNav: function ({mainDisplay}) {
    let item = TS.lib.createComponent({
      id: "TS.html._navBars.displayLeftNav",
      css: TS.css.boxes.displayLeftNav(),
      html: `
        <div id='foldOpts'>
          <button class='baseButtons2' id = 'show' title='unfold'>~</button>
          <button class='baseButtons2' id='fold1' title='Hide >1 deep'>\></button>
          <button class='baseButtons2' id='fold2' title='Hide >2 deep'>\>\></button>
        </div>
        <button id='always-fold'><input type='checkbox' onclick='this.checked = !this.checked'> Always-fold </button>
        <div id='tree'></div>
      `,
      js: function ({root, opts}) {
        root.querySelector("#show").onclick = function () {
          mainDisplay.showAll();
        };
        root.querySelector("#fold1").onclick = function () {
          mainDisplay.fold(1);
        };
        root.querySelector("#fold2").onclick = function () {
          mainDisplay.fold(2);
        };
        root.querySelector('#always-fold input').checked = TS.data.foldPreference
        root.querySelector('#always-fold').onclick = function(e) {
          let checked = !(this.querySelector('input').checked)
          this.querySelector('input').checked = checked
          TS.data.foldPreference = checked;
          if (checked == true) mainDisplay.fold(99)
          else (mainDisplay.showAll())
        }
        let treeButtons = root.querySelector("#tree");
        let ul = document.createElement("ul");
        ul.className = "ul_0";
        TS.data.currentView = [];
        let vUl = {};
        let list = [ul];
        TS.refs.treeNav = vUl;
        treeButtons.append(ul);
        Object.assign(opts, {
          makeList: function (path) {
            let vTarget = vUl;
            let target = TS.data.chosenFile;
            for (let i = 0; i < path.length; i++) {
              vTarget = vTarget[path[i]];
              target = target[path[i]];
            }
            let subUL = opts.subInit(target, path.length, path);
            if (path.length > 0) {
              list.push(subUL);
              list[list.length - 2].insertBefore(subUL, vTarget.nextSibling);
            } else {
              treeButtons.replaceChild(subUL, list[0]);
              list[0] = subUL;
            }
            return subUL;
          },
          subInit: function (obj, depth, path) {
            let subUL = TS.lib.createNode("ul", {
              className: `ul_${depth}`
            });
            let vTarget = vUl;
            path.forEach(ele => {
              vTarget = vTarget[ele];
            });
            for (let str in obj) {
              if (str === "master_root") continue;
              if (str ==='object_root') {
                if (obj[str].type != 'collection') break;
              }
              let targ = path.concat([str]);
              let li = Object.assign(document.createElement("li"), {
                innerHTML: str,
                className: `rightButtons li_${depth}`,
                onclick: function () {
                  TS.data.currentView = targ;
                  TS.refs.displayOpts.swapFocus(obj, str);
                  if (TS.data.foldPreference == true) {
                    mainDisplay.fold(99);
                  }
                  let discard = list.slice(depth + 1);
                  list = list.slice(0, depth + 1);
                  if (discard.length > 0) discard[0].remove();
                  if (depth < 4 && typeof (obj[targ[targ.length - 1]]) === "object") {
                    opts.makeList(targ);
                  }
                }
              });
              vTarget[str] = li;
              subUL.append(li);
            }
            return subUL;
          }
        });
        let addColumn = Object.assign(document.createElement("button"), {
          innerText: "+new column",
          id: "addColumn",
          onclick: function () {
            TS.data.chosenFile["EditThisName"] = {};
            TS.refs.displayOpts.render("EditThisName");
            TS.refs.treeNav["EditThisName"].click();
          }
        });
        root.append(addColumn);
      }
    });
    TS.refs.secondaryNavBar = item.box;
    return item;
  }
});
