/*
  If using css to affect all divs, make sure to exclude .component class if desired
  */
/* global TS */
/* global marked */
Object.assign(TS.html.display, {
  start: function () {
    let box = document.createElement("div");
    Object.assign(box, {
      style: TS.css.boxes.wholeDisplayContainer(),
      id: "TS.html.display"
    });
    let root = box.attachShadow({
      mode: "open"
    });
    let currentID = "";
    let sorted = "";
    root.appendChild(TS.html.display.splash().box);
    let opts = {
      element: box,
      splash: function () {
        root.innerHTML = "";
        root.appendChild(TS.html.display.splash().box);
      },
      render: function (id) {
        currentID = id;
        root.innerHTML = "";
        sorted = TS.html.display.sort(id);
        root.appendChild(sorted.element);
      },
      swapTab: function (id) {
        currentID = id;
        sorted.opts.swapTab(id);
      },
      swapFocus: function (obj, target) {
        sorted.opts.focus(obj, target);
      }
    };
    TS.events.bodyChange = function (focused) {
      if (focused.length === 0) {
        root.innerHTML = "";
        sorted = TS.html.display.sort(currentID);
        root.appendChild(sorted.element);
      } else {
        currentID = focused[1];
        root.innerHTML = "";
        sorted = TS.html.display.sort(currentID);
        root.appendChild(sorted.element);
        sorted.opts.update(focused);
      }
    };
    return opts;
  },
  sort: function (id) {
    let box = document.createElement("div");
    Object.assign(box, {
      id: "TS.html.display.sort"
    });
    box.style = TS.css.boxes.wholeDisplayContainer();
    let root = box.attachShadow({
      mode: "open"
    });
    let mainDisplay = TS.html.display.renderedList(id);
    let topUI = TS.html._navBars.displayTopUI({
      mainDisplay: mainDisplay.opts,
      id: id
    });
    if (typeof (TS.data.chosenFile[id]) === "object") {
      topUI.opts.makeList([]);
    }
    root.appendChild(topUI.box);

    root.appendChild(mainDisplay.element);
    let opts = {
      update: mainDisplay.opts.update,
      swapTab: function (id) {
        mainDisplay.element.remove();
        mainDisplay.element = TS.html.display.renderedList(id).element;
        root.appendChild(mainDisplay.element);
      },
      focus: function (obj, pathName) {
        mainDisplay.element.remove();
        mainDisplay.element = mainDisplay.opts.focus(obj, pathName);
        root.appendChild(mainDisplay.element);
      }
    };
    return {
      element: box,
      opts: opts
    };
  },
  renderedList: function (id) {
    let focused = [];
    let box = Object.assign(document.createElement("div"), {
      name: "mainDisplayView",
      id: "TS.html.display.renderedList"
    });
    TS.refs.display = box;
    let root = box.attachShadow({
      mode: "open"
    });
    let style = document.createElement("style");
    style.innerHTML = TS.css.boxes.display();
    root.appendChild(style);
    let determine = function (item, itemName, path, {
      maxDepth,
      depth
    }) {
      let formatType;
      if (depth === undefined) depth = 0;
      //something funky here
      if (path === TS.data.chosenFile && itemName === "master_root") return 0;
      if (itemName[0] === "*") {
        formatType = function (a) {
          return a;
        };
      } else if (itemName[0] === "_") {
        formatType = function (a) {
          return a;
        };
      } else {
        formatType = function (a) {
          return marked(a);
        };
      }
      let line = Object.assign(document.createElement("div"), {
        className: "lineContainer "
      });
      if (typeof (item) === "object") line.className += " objectContainer";
      else line.className += " stringContainer";
      let lineBody;
      let title = TS.lib.createNode("div", {
        className: "title",
        draggable: "true",
        ondragstart: function (event) {
          TS.js.events.dragTitle(event);
        }
      });
      let titleContent = Object.assign(document.createElement("span"), {
        className: "titleContent",
        innerHTML: itemName,
        contentEditable: true,
        onblur: function () {
          if (path[this.innerText] === undefined) {
            let oldItemName = itemName;
            item = path[itemName];
            itemName = this.innerText;
            path[itemName] = item;
            delete path[oldItemName];
            if (path === TS.data.chosenFile) {
              TS.refs.displayOpts.render(itemName);
            }
          }
          if (itemName !== this.innerText)
            this.innerText = itemName;
        }
      });
      let buttonGroup = Object.assign(document.createElement("div"), {
        className: "buttonGroup"
      });
      let keyDelete = Object.assign(document.createElement("button"), {
        innerHTML: "<b>-</b>",
        className: "deleteLine",
        onclick: function () {
          let callback = function () {
            delete path[itemName];
            if (path === TS.data.chosenFile) {
              let x;
              for (let i in TS.data.chosenFile) {
                if (i !== "master_root") {
                  x = i;
                  break;
                }
              }
              focused = [TS.data.chosenFile[x], x, TS.data.chosenFile, {}];
            }
            if (focused.length > 0 && focused[1] !== itemName) {
              TS.events.bodyChange(focused);
            } else {
              TS.events.bodyChange([]);
            }
            TS.data.currentView = [focused[1]];
            TS.refs.treeNav[TS.data.currentView[0]].click();
          };
          document.body.appendChild(TS.html.modals.confirmationDelete(itemName, callback));
        },
        contentEditable: false
      });
      let focusMe = Object.assign(document.createElement("button"), {
        innerHTML: `&nbsp;&nbsp;`,
        className: "focusMe",
        onclick: function () {
          opts.focus(path, itemName);
        },
        contentEditable: false
      });
      title.appendChild(titleContent);
      title.appendChild(buttonGroup);
      buttonGroup.appendChild(keyDelete);
      if (depth > 0) buttonGroup.appendChild(focusMe);
      line.appendChild(title);
      lineBody = Object.assign(document.createElement("div"), {
        className: "lineBody"
      });
      if (typeof (item) === "string" && maxDepth === undefined) {
        let textField = Object.assign(document.createElement("div"), {
          className: "textField",
          contentEditable: true,
          onfocus: function () {
            this.innerText = path[itemName];
          },
          onblur: function () {
            path[itemName] = this.innerText;
            if (itemName[0] !== "*") {
              this.innerHTML = formatType(this.innerText);
            }
          }
        });
        if (itemName[0] === "*") {
          textField.innerText = item;
        } else {
          textField.innerHTML = formatType(item);
        }
        lineBody.appendChild(textField);
      } else if (typeof (item) === "object") {
        let add = Object.assign(document.createElement("button"), {
          className: "addLine",
          onclick: function () {
            TS.refs.container.appendChild(TS.html.modals.addLine(path[itemName], focused));
          },
          innerHTML: "+"
        });
        buttonGroup.appendChild(add);
        if (maxDepth === undefined || depth < maxDepth) {
          for (let x in item) {
            if (item.hasOwnProperty(x)) {
              lineBody.appendChild(determine(item[x], x, item, {
                maxDepth: maxDepth,
                depth: 1 + depth
              }));
            }
          }
        }
      }
      if (typeof (item) === "object" && Object.keys(item).length !== 0) {
        line.appendChild(lineBody);
      }
      if (itemName === TS.data.addedLine) {
        delete TS.data.addedLine;
        TS.data.scrollToLine = line;
        setTimeout(function () {
          let height = TS.data.scrollToLine.getBoundingClientRect().top - TS.refs.mainNavBar.clientHeight;
          if (TS.data.alignment === "top") {
            height -= TS.refs.secondaryNavBar.clientHeight;
          }
          TS.refs.display.scrollTop = height;
        }, 20);
      }
      return line;
    };
    root.appendChild(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {}));
    let opts = {
      showAll: function () {
        let curr = TS.data.currentView[0];
        focused = [TS.data.chosenFile[curr], curr, TS.data.chosenFile, {}];
        root.innerHTML = "";
        root.appendChild(style);
        root.appendChild(determine(TS.data.chosenFile[curr], curr, TS.data.chosenFile, {}));
      },
      fold: function (n) {
        root.innerHTML = "";
        root.appendChild(style);
        if (focused.length === 0)
          root.appendChild(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {
            maxDepth: n
          }));
        else {
          root.appendChild(determine(focused[0], focused[1], focused[2], {
            maxDepth: n
          }));
        }
      },
      focus: function (path, itemName) {
        root.innerHTML = "";
        root.appendChild(style);
        window.x = root;
        focused = [path[itemName], itemName, path, {}];
        root.appendChild(determine(path[itemName], itemName, path, {}));
        return box;
      },
      update: function (item) {
        focused = item;
        root.innerHTML = "";
        root.appendChild(style);
        if (focused.length > 0) root.appendChild(determine(...item));
        else root.appendChild(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {}));
      }
    };
    setTimeout(function () {
      let height = window.innerHeight - TS.refs.mainNavBar.clientHeight;
      if (TS.data.alignment === "top") {
        height -= TS.refs.secondaryNavBar.clientHeight;
      }
      TS.refs.display.style["max-height"] = height + "px";
    }, 20);
    return {
      element: box,
      opts: opts
    };
  }
});
