TS.html._navBars.file_button = function (callback, display) {
  let select = Object.assign(document.createElement("div"), {
    id: "menu",
    style: 'cursor: default;',
    innerHTML: `Menu
    <div id='hiddenOptions' class='hidden'></div>`
  });
  let options = ["save", "upload", "export"];
  let values = ["Download", "Upload", "Export File"];
  for (var j = 0; j < options.length; j++) {
    let option = Object.assign(document.createElement("div"), {
      className: "menuOptions hoverable",
      "value": options[j],
      "innerText": values[j],
      onclick: function () {
        callback(this.value);
        this.parentNode.style.display = "none";
        let vis = this.parentNode;
        setTimeout(function () {
          vis.style.display = "";
        }, 134);
      }
    });
    select.querySelector("#hiddenOptions").append(option);
  }
  return select;
}
