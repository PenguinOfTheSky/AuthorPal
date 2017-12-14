TS.html.display.titleBar = function({itemName, unfocus, path, item, depth, opts, focused, lineBody}) {
  let title = TS.lib.createNode("div", {
    name: 'TS.html.display.titleBar',
    className: "title",
    draggable: "true",
    ondragstart: function (event) {
      TS.js.events.dragTitle(event);
    },
    ondragend: function(event) {
      TS.js.events.dragTitle(event)
    }
  });
  title.append(document.querySelector('#font-awesome').cloneNode(1))
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
        let targPath = TS.data.currentView
        let obj = TS.data.chosenFile
        for (let i = 0; i < targPath.length-1; i++) {
          obj = obj[targPath[i]]
        }
        if (path === TS.data.chosenFile) {
          TS.refs.displayOpts.render(itemName);
        } else {
          TS.refs.displayOpts.swapFocus(obj, targPath[targPath.length-1]);
        }
      }
      if (itemName !== this.innerText)
        this.innerText = itemName;
      TS.events.updatedFile()
      TS.events.save();
    }
  });
  let buttonGroup = Object.assign(document.createElement("div"), {
    className: "buttonGroup"
  });
  let keyDelete = Object.assign(document.createElement("button"), {
    innerHTML: "<icon class='fa fa-minus'></icon>",
    className: "deleteLine btnWarn",
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
        TS.events.updatedFile()
        TS.events.save();
      };
      document.body.append(TS.html.modals.confirmationDelete(itemName, callback));
    },
    contentEditable: false
  });
  let unfocusBtn = Object.assign(document.createElement("button"), {
    innerHTML: "<icon class='fa fa-undo'></icon>",
    title: `unfocus element`,
    className: "unfocusMe icon",
    onclick: function() {
      let targ = TS.data.chosenFile
      TS.data.currentView.forEach(function(ele, i) {
        if (i < TS.data.currentView.length -1) targ = targ[ele]
      })
      opts.focus(targ, TS.data.currentView[TS.data.currentView.length-1]);
    }
  });

  let focusMe = Object.assign(document.createElement("button"), {
    innerHTML: "<icon class='fa fa-search-plus'></icon>",
    title: `focus this element`,
    className: "focusMe icon",
    onclick: function () {
      opts.focus(path, itemName, true);
    },
    contentEditable: false
  });
  let copy = Object.assign(document.createElement("button"), {
    className: "icon",
    innerHTML: `<icon class='fa fa-clone'></icon>`,
    onclick: function () {
      TS.js.clipboard.copyItem({item: item, path: path, itemName: itemName})
    }
  });
  buttonGroup.append(copy)
  let objectType;
  if (typeof(item) === "object") {
    if (item.object_root && item.object_root.type && item.object_root.type != 'collection') {
      let div = TS.lib.createNode('div', {
        style: "text-align: center;display: inline-block; flex-grow: 1;"
      })
      div.append(TS.lib.createNode('button', {
        innerHTML: item.object_root.type
      }))
      objectType = div;
    } 
    
    let add = Object.assign(document.createElement("button"), {
      className: "addLine",
      onclick: function () {
        TS.refs.container.append(TS.html.modals.addLine(path[itemName], focused));
      },
      innerHTML: "<icon class='fa fa-plus'></icon>"
    });
    
    
    if (item.object_root && item.object_root.editor) {}
    else {
      buttonGroup.append(add);
    } 
  }
  title.append(titleContent, buttonGroup);
  if (objectType) {title.append(objectType)}
  buttonGroup.append(keyDelete);
  if (depth === 0 && unfocus) buttonGroup.append(unfocusBtn);
  if (depth > 0) buttonGroup.append(focusMe);
  if (typeof(item) ==='string') {
  console.log('string')
  } else if (item.object_root && item.object_root.editor){
    let callEditor = TS.lib.createNode('button', {
      onclick: function() {
        TS.html.display.lineBody.callEditor(item.main, item.object_root.editor, function(content) {
          item.main = content;
          lineBody.opts.update(content, item.object_root.editor);
          TS.events.updatedFile()
          TS.events.save()
        })
      },
      style: 'background-image: url("icons/iconmonstr-edit-6-240.png"); background-size: cover;',
      className: 'icon',
      innerHTML: "&nbsp;&nbsp;"
    })
    buttonGroup.append(callEditor)
  }
  return title;
}
