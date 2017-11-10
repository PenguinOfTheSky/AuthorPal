TS.html.display.lineBody.handler = function({itemName, path, item, depth, maxDepth, determine, formatType, line}) {
  let lineBody = Object.assign(document.createElement("div"), {
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
        this.innerHTML = formatType(this.innerText);
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
  } else if (typeof (item) === "object" && item.object_root && item.object_root.type == 'function') {
    /*switch (item.object_root.type) {
      case 'function': 
        TS.html.display.lineBody.function(vars) 
        break;
    } */
    
    let textField = Object.assign(document.createElement("div"), {
      className: "textField",
      contentEditable: true,
      onfocus: function () {
        this.innerText = item.main
      },
      onblur: function () {
        item.main = this.innerText;
        this.innerHTML = TS.js.highlight(this.innerText, item.object_root.editor);
        TS.events.save();
      },
      innerHTML: TS.js.highlight(item.main, item.object_root.editor)
    });
    lineBody.append(textField);
  //  line.append(lineBody);
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
  return lineBody;
}
