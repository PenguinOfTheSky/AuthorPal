TS.html._navBars.file_button = function (callback, display) {
  let select = Object.assign(document.createElement("div"), {
    id: "menu",
    innerHTML: `Menu
    <div id='hiddenOptions' class='hidden'></div>`
  });
  let options = ["home", "open", "create", "delete", "save", "upload", "preferences", "export", "faq"];
  let values = ["Home", "Open File", "New File", "Delete File", "Download", "Upload", "Preferences", "Export File", "FAQ"];
  for (var j = 0; j < options.length; j++) {
    let option = Object.assign(document.createElement("div"), {
      className: "menuOptions",
      "value": options[j],
      "innerText": values[j],
      onclick: function () {
        switch (this.value) {
          case "devMode":
            window.open("devMode.html", "_blank");
            break;
          case "faq":
            window.open("FAQ.html", "_blank");
            break;
          case "home":
            display.splash();
            break;
          default:
            callback(this.value);
        }
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
