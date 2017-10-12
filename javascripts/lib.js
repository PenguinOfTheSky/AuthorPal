/* global TS */
TS.lib = {
  createNode: function (type, obj) {
    return Object.assign(document.createElement(type), obj);
  },
  appendChildren: function (parent, arr) {
    arr.forEach(ele => parent.appendChild(ele));
  },
  createComponent: function ({
    css,
    parent,
    id,
    html,
    js,
    devMode
  }) {
    if (devMode) {
      console.log(arguments[0]); // Todo: Do you really need this console log?
    }
    let box = TS.lib.createNode("div", {
      "id": id,
      "class": "component"
    });
    let root = box.attachShadow({
      mode: "open"
    });
    let style = TS.lib.createNode("style", {
      innerHTML: css
    });
    root.appendChild(style);
    root.innerHTML += html;
    let opts = {};
    js({
      box,
      root,
      style,
      parent,
      opts
    });
    return {
      box: box,
      opts: opts
    };
  }
};
