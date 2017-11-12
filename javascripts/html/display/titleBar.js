TS.html.display.titleBar = function({itemName, unfocus, path, item, depth, opts, focused, lineBody}) {
  let title = TS.lib.createNode("div", {
    className: "title",
    draggable: "true",
    ondragstart: function (event) {
      TS.js.events.dragTitle(event);
    },
    ondragend: function(event) {
      TS.js.events.dragTitle(event)
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
        TS.events.updatedFile()
        TS.events.save();
      };
      document.body.append(TS.html.modals.confirmationDelete(itemName, callback));
    },
    contentEditable: false
  });
  let unfocusBtn = Object.assign(document.createElement("button"), {
    innerHTML: "&nbsp;&nbsp;",
    title: `unfocus element`,
    className: "unfocusMe",
    onclick: function() {
      let targ = TS.data.chosenFile
      TS.data.currentView.forEach(function(ele, i) {
        if (i < TS.data.currentView.length -1) targ = targ[ele]
      })
      opts.focus(targ, TS.data.currentView[TS.data.currentView.length-1]);
    }
  });
  let openEditorChoices;
  let editor = TS.lib.createNode('div', {
    innerText: ` editors `,
    className: "editor",
    onmouseenter: function() {
      openEditorChoices = TS.html.display.editorChoices(titleContent.innerHTML, function(choice) {
        TS.html.display.lineBody.callEditor(item, choice, function(content) {
        item = content;
        path[itemName] = item;
        lineBody.opts.update(content, choice);
        TS.events.updatedFile()
        TS.events.save()
        })
      })
      this.append(openEditorChoices)
    },
    onmouseleave: function() {
        openEditorChoices.remove()
    }
  })

  let focusMe = Object.assign(document.createElement("button"), {
    innerHTML: `&nbsp;&nbsp;`,
    title: `focus this element`,
    className: "focusMe",
    onclick: function () {
      opts.focus(path, itemName, true);
    },
    contentEditable: false
  });
  let objectType;
  if (typeof(item) === "object") {
    if (item.object_root && item.object_root.type) {
      let div = TS.lib.createNode('div', {
        style: "text-align: center;display: inline-block; flex-grow: 1;"
      })
      div.append(TS.lib.createNode('button', {
        innerHTML: '<b>' + item.object_root.type + '</b>'
      }))
      objectType = div;
    }
    let add = Object.assign(document.createElement("button"), {
      className: "addLine",
      onclick: function () {
        TS.refs.container.append(TS.html.modals.addLine(path[itemName], focused));
      },
      innerHTML: "+"
    });
    buttonGroup.append(add);
  }
  title.append(titleContent, buttonGroup);
  if (objectType) {title.append(objectType)}
  buttonGroup.append(keyDelete);
  if (depth === 0 && unfocus) buttonGroup.append(unfocusBtn);
  if (depth > 0) buttonGroup.append(focusMe);
  if (typeof(item) ==='string') {
    buttonGroup.append(editor)
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
      className: 'btn icon',
      innerHTML: "&nbsp;&nbsp;"
    })
    buttonGroup.append(callEditor)
  }
  return title;
}
