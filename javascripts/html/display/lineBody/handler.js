TS.html.display.lineBody.handler = function({itemName, path, item, depth, maxDepth, determine, formatType, line}) {
  let tabDeny = function(node) {
    node.onkeydown = function(event) {
      if(event.key === 'Tab'){
        event.preventDefault();
        TS.js.insertText(node, '  ', TS.refs.display.shadowRoot.getSelection())
      } else if(event.key === 'Enter'){
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
      textField.innerHTML = TS.js.highlight(text, type);
    }
    let textField = Object.assign(document.createElement("div"), {
      className: "textField",
      contentEditable: true,
      onfocus: function () {
        tabDeny(this)
        this.innerText = item.main
      },
      onblur: function () {
        item.main = this.innerText;
        update(this.innerText, item.object_root.editor)
        TS.events.updatedFile()
        TS.events.save();
      },
      innerHTML: TS.js.highlight(item.main, item.object_root.editor)
    });
    if (maxDepth === undefined) lineBody.append(textField);
  } else if (typeof (item) === "object") {
    if (maxDepth === undefined || depth < maxDepth) {
      for (let x in item) {
        if (item.hasOwnProperty(x)) {
          lineBody.append(determine(item[x], x, item, {
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
