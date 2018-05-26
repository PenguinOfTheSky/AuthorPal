TS.html.display.lineBody.handler = function({itemName, path, item, depth, maxDepth, determine, formatType, line}) {
  let tabDeny = function(node) {
    node.onkeydown = function(event) {
      if(event.key === 'DTab'){
        event.preventDefault();
        TS.js.insertText(node, '  ', TS.refs.display.shadowRoot.getSelection())
      } else if(event.key === 'DEnter'){
        event.preventDefault();
        let replaceText = '\n'
        if (TS.refs.display.shadowRoot.getSelection().anchorOffset == node.innerText.length) {
          replaceText += '\n'
        }
        TS.js.insertText(node, replaceText, TS.refs.display.shadowRoot.getSelection())
      }
    }
  }
  let update;
  let lineBody = Object.assign(document.createElement("div"), {
    className: "lineBody"
  });
  if (typeof (item) === "string" && maxDepth === undefined) {
    update = function(text) {
      if (!TS.data.chosenFile.master_root || !TS.data.chosenFile.master_root.version || TS.data.chosenFile.master_root.version < 3) {
        //for backwards-compatibility
        textField.innerHTML = formatType(text);
      } else {
        textField.innerText = text
      }
    }
    let textField = Object.assign(document.createElement("div"), {
      className: "textField",
      contentEditable: true,
      onfocus: function () {
        tabDeny(this)
        this.innerText = path[itemName];
      },
      onblur: function () {
        this.onkeydown = ''
        path[itemName] = this.innerText;
        update(this.innerText);
        TS.events.updatedFile()
        TS.events.save();
      }
    });
    if (itemName[0] === "*") {
      textField.innerText = item;
    } else {
      textField.innerHTML = formatType(item);
    }
    lineBody.append(textField);
  //  line.append(lineBody);
} else if (typeof (item) === "object" && item.object_root && item.object_root.type != 'collection' && item.object_root.type != 'library') {
    update = function(text, type) {
      if (typeof (item) === "object" && item.object_root && item.object_root.type != 'collection' && item.object_root.type != 'library') {
        if (item.object_root.type != 'plain text') {
          textField.innerHTML = TS.js.highlight(text, type);
        } else {
          textField.innerText = text
        }
      }

    }
    let textField = Object.assign(document.createElement("div"), {
      className: "textField",
      contentEditable: true,
      onfocus: function () {
        tabDeny(this)
        if (item.object_root.type == 'rich text') {}
        else if (item.object_root.type == 'function' || item.object_root.type == 'css' || item.object_root.type == 'html' || item.object_root.type == 'json') {

        }
        else this.innerText = item.main
      },
      onblur: function () {
        if (item.object_root.type == 'rich text') {
          item.main = this.innerHTML
        } else if (item.object_root.type == 'function' || item.object_root.type == 'css' || item.object_root.type == 'html' || item.object_root.type == 'json') {
          item.main = this.innerText
        } else {
          item.main = this.innerText;
        }
        if (item.object_root.type == 'plain text') {

        } else if (item.object_root.type == 'rich text') {
          update(this.innerHTML, item.object_root.editor)
        } else {
          update(this.innerText, item.object_root.editor)
        }
        TS.events.updatedFile()
        TS.events.save();
      }
    });
    if (item.object_root.type != 'plain text') {
      textField.innerHTML = TS.js.highlight(item.main, item.object_root.editor)
    } else {
      textField.innerText = item.main
    }
    if (maxDepth === undefined || depth == 0) lineBody.append(textField);
  } else if (typeof (item) === "object") {
    if (maxDepth === undefined || depth < maxDepth) {
      if (!path[itemName].__order) {
        path[itemName].__order = Object.keys(item)
      }
      let order = path[itemName].__order
      for (let x in order) {
        if (item.hasOwnProperty(order[x])) {
          lineBody.append(determine(item[order[x]], order[x], item, {
            maxDepth: maxDepth,
            depth: 1 + depth
          }));
        }
      }
    }
  }
  let opts = {
    update: function(text, type) {
      update(text, type)
    }
  }
  return {element: lineBody, opts: opts};
}
