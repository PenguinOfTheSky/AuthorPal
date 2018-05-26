TS.html.display.titleBar = function({itemName, unfocus, path, item, depth, opts, focused, lineBody}) {
  let title = TS.lib.createNode("div", {
    name: 'TS.html.display.titleBar',
    className: "title"
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
    className: "buttonGroup",
  });
  let keyDelete = Object.assign(document.createElement("button"), {
    innerHTML: "<icon class='fa fa-minus'></icon>",
    className: "deleteLine btnWarn icon",
    title: 'delete',
    onclick: function () {
      let callback = function () {
        delete path[itemName];
        let lastItem
        for (let i = 0; i <path.__order.length; i++) {
          if (path[path.__order[i]] === undefined) delete path.__order[i]
          if (path.__order[i]!==undefined) {
            lastItem = i;
          }
          if (path.__order[i] === itemName) {
            path.__order.splice(i, 1)
          }
        }
        path.__order.length = lastItem+1
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
        if (TS.data.currentView[0] === undefined) return;
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
    title: 'copy (currently nonfunctional)',
    onclick: function () {
      TS.js.clipboard.copyItem({item: item, path: path, itemName: itemName})
    }
  });
  buttonGroup.append(copy)
  let objectType = TS.lib.createNode('div',{
    style: "display: flex; flex-grow:1;"
  })
  if (typeof(item) === "object") {
    if (item.object_root && item.object_root.type) {
      let div = TS.lib.createNode('div', {
        style: "text-align: center;display: inline-block; flex-grow: 1;"
      })
      div.append(TS.lib.createNode('span', {
        innerHTML: item.object_root.type
      }))
      objectType.append(div);
    }
    let div = TS.lib.createNode('div', {
      style: "text-align: right;display: inline-block; flex-grow: 1;"
    })
    if (!path.__order) {
      path.__order = Object.keys(path)
    }
    let position = path.__order
    for (let i = 0; i < position.length; i++) {
      if (itemName == position[i]) {
        position = i+1;
        break;
      }
    }
    let prevOrderValue = position
    div.append(TS.lib.createNode('input', {
      value: position,
      type:'number',
      maxlength: 2,
      style: 'width: 2.1rem;',
      onchange: function() {
        if (+this.value < 0) this.value = 0
        let key = path.__order.splice(prevOrderValue - 1, 1)
        path.__order.splice(+this.value - 1, 0, key)
        let targ = TS.data.chosenFile
        TS.data.currentView.forEach(function(ele, i) {
          if (i < TS.data.currentView.length -1) targ = targ[ele]
        })
        opts.focus(targ, TS.data.currentView[TS.data.currentView.length-1]);
        TS.events.updatedFile()
        TS.events.save()
      }
    }))
    objectType.append(div)
    let add = Object.assign(document.createElement("button"), {
      className: "addLine btnSubmit icon",
      title: 'add child',
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
  //console.log('string')
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
      className: '',
      title: 'editor',
      innerHTML: "<icon class='icon fa fa-pencil-square-o'></icon>"
    })
    buttonGroup.append(callEditor)
  }
  return title;
}
