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
    root.append(TS.html.display.splash.main().box);
    let opts = {
      element: box,
      splash: function () {
        root.innerHTML = "";
        let splash = TS.html.display.splash.main()
        root.append(splash.box);
        return splash
      },
      render: function (id) {
        currentID = id;
        root.innerHTML = "";
        sorted = TS.html.display.sort(id);
        root.append(sorted.element);
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
        root.append(sorted.element);
      } else {
        currentID = focused[1];
        root.innerHTML = "";
        sorted = TS.html.display.sort(currentID);
        root.append(sorted.element);
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
    let topUI = TS.html._navBars.displayLeftNav({
      mainDisplay: mainDisplay.opts,
      id: id
    });
    if (typeof (TS.data.chosenFile[id]) === "object") {
      topUI.opts.makeList([]);
    }
    root.append(topUI.box, mainDisplay.element);
    let opts = {
      update: mainDisplay.opts.update,
      swapTab: function (id) {
        mainDisplay.element.remove();
        mainDisplay.element = TS.html.display.renderedList(id).element;
        root.append(mainDisplay.element);
      },
      focus: function (obj, pathName) {
        mainDisplay.element.remove();
        mainDisplay.element = mainDisplay.opts.focus(obj, pathName);
        root.append(mainDisplay.element);
      }
    };
    return {
      element: box,
      opts: opts
    };
  },
  renderedList: function (id) {
    let focused = [];
    let opts = {}
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
    root.append(style);
    let determine = function (item, itemName, path, {maxDepth, depth, unfocus}) {
      if (itemName == 'object_root' || itemName == 'master_root') return ''; //why is this being appended. Fixthis.
      let formatType;
      if (depth === undefined) depth = 0;
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
      if (typeof (item) === "object") {
        if (item.object_root && (item.object_root.type == 'collection' || item.object_root.type == 'library' )) {
          line.className += " objectContainer";
          
        } else {
          //line.className += " functionContainer";
        }
      }
      else line.className += " stringContainer";
      let lineBody = TS.html.display.lineBody.handler({path: path, itemName: itemName, depth: depth, item: item, maxDepth: maxDepth, determine: determine, formatType: formatType, line: line});
    
      let title = TS.html.display.titleBar({path: path, itemName: itemName, depth: depth, unfocus: unfocus, item: item, opts: opts, focused: focused, lineBody: lineBody})
      line.appendChild(title);
      line.appendChild(lineBody.element);
      if (typeof (item) === "object" && Object.keys(item).length !== 0) {
      //  line.appendChild(lineBody);
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
    root.append(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {}));
    Object.assign(opts, {
      showAll: function () {
        let curr = TS.data.currentView[0];
        focused = [TS.data.chosenFile[curr], curr, TS.data.chosenFile, {}];
        root.innerHTML = "";
        root.append(style, determine(TS.data.chosenFile[curr], curr, TS.data.chosenFile, {}));
      },
      fold: function (n) {
        root.innerHTML = "";
        root.append(style);
        if (focused.length === 0)
          root.append(determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {
            maxDepth: n
          }));
        else {
          root.append(determine(focused[0], focused[1], focused[2], {
            maxDepth: n
          }));
        }
      },
      focus: function (path, itemName, clickedFocus) {
        root.innerHTML = "";
        let obj = {};
        if (clickedFocus) obj.unfocus = true;
        focused = [path[itemName], itemName, path, {}];
        root.append(style, determine(path[itemName], itemName, path, obj));
        return box;
      },
      update: function (item) {
        focused = item;
        root.innerHTML = "";
        root.append(style, (focused.length > 0 ? determine(...item) : determine(TS.data.chosenFile[id], id, TS.data.chosenFile, {})));
      }
    });
    return {
      element: box,
      opts: opts
    };
  }
});
