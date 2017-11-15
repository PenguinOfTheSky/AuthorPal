/* global TS */
Object.assign(TS.html.modals, {
  preferencesFile: function () {
    let item = TS.lib.createComponent({
      id: "TS.html.modals.preferencesFile",
      css: TS.css.modals.preferencesFile(),
      html: `
        <div id='centerModal' class='bgModal'>
        <button id='exit'>X</button>
        <b>Edit Preferences </b>
        <br>
        <form id = 'prefForm'>
          <label for='themeSelect'><b>Choose a style theme below</b></label>
          <select id='themeSelect'>
            <option value='default'>default</option>
            <option value='sparky'>Sparky</option>
            <!-- <option value='Theme1'>Theme1</option> -->
            <option value='dark'>Dark</option>
            <option value='midnight'>Midnight</option>
          </select>
          <button type = 'submit' class='btnSubmit'>Submit</button>
        </form>
        </div>
      `,
      js: function ({
        box,
        root
      }) {
        TS.js.baseModal(box, root);
        root.querySelector("#themeSelect").value = TS.data.local.preferences.theme;
        root.querySelector("#prefForm").onsubmit = function (event) {
          event.preventDefault();
          TS.data.local.preferences.theme = root.querySelector("#themeSelect").value;
          TS.events.updatePreferences(root.querySelector("#themeSelect").value);
          box.remove();
          return 0;
        };
      }
    });
    return item.box;
  },
  addLine: function (path) {
    let options = ``;
    if (TS.data.chosenFile.master_root === undefined) {
      TS.data.chosenFile.master_root = {};
      TS.data.chosenFile.master_root.templates = 'TS.js.templates["novel outline"]';
    }
    let x;
    eval("x =" + TS.data.chosenFile.master_root.templates)
    Object.keys(x).forEach(function (ele) {
      options += `<option value='${ele}'>${ele}</option>`;
    });
    let item = TS.lib.createComponent({
      id: "TS.html.modals.addLine",
      css: TS.css.modals.addLine(),
      html: `
        <div id='centerModal' class='bgModal'>
         <form id='addLineForm'>
          <b>Create New Line</b>
          <button id='exit'>X</button>
          <br>
          <label>line name</label> <input required id ='name' type='text' placeholder='name'><br>
          <label>Either select a template</label> <select id='selectTemplate'>
            ${options}
          </select><br>
          or <button id='clone'>Clone another file/container</button><br>
          or <button id='copy'>Copy-paste json </button><br>
          <input type='submit' value='Submit' class='btnSubmit'>
          <div id='status'></div>
         </form>
        </div>
      `,
      js: function ({box,root}) {
        TS.js.baseModal(box, root);
        root.querySelector('#addLineForm').onkeypress = function(event) {
          if(event.charCode == 13){
            event.preventDefault();
            root.querySelector("#addLineForm").querySelector('.btnSubmit').click();
            return false; // returning false will prevent the event from bubbling up.
          } else {
              return true;
          }
        }
        root.querySelector("#addLineForm").onsubmit = function (event) {
          event.preventDefault();
          let name = this.querySelector("#name").value;
          let template = this.querySelector("#selectTemplate").value;
          if (name !== "" && path[name] === undefined) {
            path[name] = x[template]();
            TS.data.addedLine = name;
            let i = TS.data.chosenFile;
            TS.data.currentView.forEach(function (ele, n) {
              if (n < TS.data.currentView.length - 1) i = i[ele];
            });
            TS.refs.displayOpts.swapFocus(i, TS.data.currentView[TS.data.currentView.length - 1]);
            TS.events.save();
          }
          box.remove();
          return false;
        };
      }
    });
    return item.box;
  },
  uploadFile: function () {
    let item = TS.lib.createComponent({
      id: "TS.html.modals.uploadFile",
      css: TS.css.modals.uploadFile(),
      html: `
        <div id='centerModal' class='bgModal'>
          <b>Upload backup</b>
          <button id='exit' >X</button>
          <br>
          Warning, may overwrite projects already in your localStorage<br>
          <input id='fileUpload' type='file' value='Upload'>
          <input type = 'submit' id='submit' class='btnSubmit'>
        </div>
      `,
      js: function ({
        box,
        root
      }) {
        TS.js.baseModal(box, root);
        root.querySelector("#submit").onclick = function () {
          var input = root.querySelector("#fileUpload");
          var reader = new FileReader();
          if (input.files.length) {
            var textFile = input.files[0];
            reader.onload = function (e) {
              Object.assign(TS.data.local.files, JSON.parse(e.target.result));
              TS.events.save(location.reload())
            };
            reader.readAsText(textFile);
          } else {
            alert("Please upload a file before continuing"); // Todo: remove the alert, maybe create some modal or solve it differently
          }
        };
      }
    });
    return item.box;
  },
  saveFile: function () {
    let textarea = Object.assign(document.createElement("textarea"), {
      innerText: JSON.stringify(TS.data.local.files, 0, 2)
    });
    var myblob = new Blob([textarea.innerText], {
      type: "text/plain"
    });
    let url = URL.createObjectURL(myblob);
    let date = new Date();
    let item = TS.lib.createComponent({
      id: "TS.html.modals.saveFile",
      css: TS.css.modals.saveFile(),
      html: `
        <div id='centerModal' class='bgModal'>
          <b>Save a Backup</b>
          <button id='exit'>X</button>
          <br>
          Your files are saved automatically to your browser cache every time you offclick a text field but if you wipe your cookies you could lose them.
          To avoid that, save a backup copy to your computer using the button below. (upload it back to project to recover lost data)
          Left-click to save to downloads folder or right-click to choose location on harddrive to save to.
          <a href="${url}" download="AuthorPal-${date.toDateString()}">Download</a>
        </div>
      `,
      js: function ({
        box,
        root
      }) {
        TS.js.baseModal(box, root);
      }
    });
    return item.box;
  },
  createFile: function () {
    let item = TS.lib.createComponent({
      id: "TS.html.modals.createFile",
      css: TS.css.modals.createFile(),
      html: `
        <div id='centerModal' class='bgModal'>
         <form id = 'createForm'>
          <button id='exit'>X</button>
          <b>Create New Project</b>
          <br>
          <label>Project name</label> <input required id ='name' type='text' placeholder='name'><br>
          <label>Select Template</label> <select id='selectTemplate'>
            <option value='folder'>Folder</option>
            <option value='book outline'>Book/creative work Outline</option>
            <option value='Markdown Blog'>Markdown Blog</option>
            <option value='web component(js)'>Web Component (js-based html5)</option> 
            <option value='website_JS'>SPA Website (js-based html5 single-page-app)</option> 
            <option value='library'>Library</option>
          </select><br>
          <input type='submit' value='Submit' class='btnSubmit'>
          <div id='status'></div>
         </form>
        </div>
      `,
      js: function ({box,root}) {
        TS.js.baseModal(box, root);
        root.querySelector('#createForm').onkeypress = function(event) {
          if(event.charCode == 13){
            event.preventDefault();
            root.querySelector("#createForm").querySelector('.btnSubmit').click();
            return false; // returning false will prevent the event from bubbling up.
          } else {
              return true;
          }
        }
        root.querySelector("#createForm").onsubmit = function (event) {
          event.preventDefault();
          let name = this.querySelector("#name").value;
          let template = this.querySelector("#selectTemplate").value;
          if (name !== "" && TS.data.local.files[name] === undefined) {
            TS.data.local.files[name] = TS.js.templates.topNavbar[template]();
            box.remove();
            TS.events.openFile(name);
            TS.events.save()
          } else {
            let msg = Object.assign(document.createElement("b"), {
              innerText: " | Name is already taken! | ",
              style: "color: blue;"
            });
            root.appendChild(msg);
          }
          return false;
        };
      }
    });
    return item.box;
  },
  deleteFile: function () {
    let item = TS.lib.createComponent({
      id: "TS.html.modals.deleteFile",
      css: TS.css.modals.openFile(),
      html: `
        <div id='centerModal' class='bgModal'>
          <button id='exit'>X</button>
          <h2> Choose the file you wish to delete </h2>
        </div>
      `,
      js: function ({box,root}) {
        TS.js.baseModal(box, root);
        for (let x in TS.data.local.files) {
          if (TS.data.local.files.hasOwnProperty(x)) {
            let file = Object.assign(document.createElement("button"), {
              className: "fileBtn",
              innerText: x,
              onclick: function () {
                TS.refs.container.appendChild(TS.html.modals.confirmationDelete(x, function () {
                  delete TS.data.local.files[x];
                  TS.events.save(function () {
                    location.reload();
                  });
                }));
                box.remove();
              }
            });
            root.querySelector("#centerModal").appendChild(file);
          }
        }
        if (Object.keys(TS.data.local.files).length === 0) root.querySelector("#centerModal").appendChild(TS.lib.createNode("h2", {
          innerHTML: "no files found"
        }));
      }
    });
    return item.box;
  },
  confirmationDelete: function (name, callback) {
    let item = TS.lib.createComponent({
      id: "TS.html.modals.confirmationDelete",
      css: TS.css.modals.confirmationDelete(),
      html: `
        <div id='centerModal' class='bgModal'>
          <button id='exit'>X</button>
          <h2>Are you sure you would like to delete "${name}"?</h2>
          <button id='yes' class='btnWarn'>Yes</button><button id='cancel'>Cancel</button>
        </div>
      `,
      js: function ({box,root}) {
        TS.js.baseModal(box, root);
        root.querySelector("#yes").onclick = function () {
          callback();
          box.remove();
        };
        root.querySelector("#cancel").onclick = function () {
          box.remove();
        };
      }
    });
    return item.box;
  },
  exportFile: function () { //fixThis
    let fileDownload = ``,
      filePreview = ``,
      text;
    let styleChoice;
    if (TS.data.chosenFile && TS.data.chosenFile.master_root.exportFormat) {
      if (TS.data.chosenFile.master_root.type !='book outline') {
        let hidden = document.createElement('iframe', {
          style: 'display: none;'
        })
        TS.refs.container.append(hidden)
        let data = TS.js.export.exportHandler(TS.data.chosenFile, 0, hidden)
        hidden.remove()
        var myblob = new Blob([data.data], {
          type: `text/${data.type}`
        });
        let url = URL.createObjectURL(myblob);
        let date = new Date();
        fileDownload += `<a href="${url}" download="AuthorPal-${date.toDateString()}}">Download .${data.type}</a>`;
      } else {
        let formatted = TS.js.fileFormat[TS.data.chosenFile.master_root.exportFormat](TS.data.chosenFile);
        text = formatted;
        let keys = Object.keys(formatted);
        try {
          styleChoice = TS.data.chosenFile["#advanced"].styles["*chosenStyle"];
          styleChoice = "<style>" + TS.data.chosenFile["#advanced"].styles[styleChoice].main + "</style>";
        } catch (err) {
          return 0;
        }
        keys.forEach(function (ele) {
          let textarea = Object.assign(document.createElement("textarea"), {
            innerText: `<head> ${TS.data.chosenFile["#advanced"]["*head"].main}
            <script>${TS.data.chosenFile["#advanced"]["*script"].main} </script>
             ${styleChoice} </head>` + formatted[ele].main + "<script>" + formatted[ele].script + "</script>"
          });
          var myblob = new Blob([textarea.innerText], {
            type: "text/html"
          });
          let url = URL.createObjectURL(myblob);
          let date = new Date();
          fileDownload += `<a href="${url}" download="AuthorPal-${date.toDateString()}-style:${ele}">Download style: ${ele}</a>`;
          filePreview += ``;
        });
      }
    }
    let item = TS.lib.createComponent({
      id: "TS.html.modals.exportFile",
      css: TS.css.modals.exportFile(),
      html: `
        <div id='centerModal' class='bgModal'>
          <button id='exit'>X</button>
          <h2>Export File</h2>
          <p>Unlike the download option that saves all your work in json format, this allows the selected file to be downloaded in a rendered format if compatible.</p>
          ${fileDownload || ""}<br>
          ${filePreview || ""}
        </div>
      `,
      js: function ({box, root}) {
        TS.js.baseModal(box, root);
        if (!fileDownload) {
          let i = document.createElement("i");
          i.innerText = "Either you haven't opened a file or your file is incompatible for export.";
          root.querySelector("#centerModal").appendChild(i);
        }
      }
    });
    return item.box;
  },
  fileContextNav: function(event, ele) {
    let targ = ele
    let loc = [event.clientX, event.clientY], 
    name = ele.innerText,  
    origin = ele.dataset.origin,
    type = ele.classList;
    let div = TS.lib.createNode('div', {
      className: 'contextMenu bgModal',
      style: `left: ${loc[0]-9}px; top: ${loc[1]-9}px;display: inline-block;`
    })
    let style = TS.lib.createNode('style', {
      innerHTML: TS.css.modals.fileContextNav()
    })
    let btns = {
      title: TS.lib.createNode('div', {
        className: 'fileContextTitle',
        innerHTML: `<b>file: "${name}"</b><br><hr>`
      }),
      open: TS.lib.createNode('div', {
        className: 'fileContextOpts',
        innerText: 'open',
        onclick: function() {
          targ.click();
        }
      }),
      move: TS.lib.createNode('div', {
        className: 'fileContextOpts',
        innerText: 'Move/Rename selected file',
        onclick: function() {
          console.log('coming soon')
        }
      }),
      create: TS.lib.createNode('div', {
        className: 'fileContextOpts',
        innerText: 'Create a new file'
      }),
      delete: TS.lib.createNode('div', {
        className: 'fileContextOpts',
        innerText: 'delete',
        onclick: function() {
          let callback = function() {
            console.log(targ)
            //add support for nested files
            // innerHTML vs innerText, check safety
            delete TS.data.local.files[targ.innerHTML]
            TS.events.save()
          }
          document.body.append(TS.html.modals.confirmationDelete(targ.innerHTML, callback));
        }
      })
    }
    div.append(style)
    switch(true) {
      case type.contains('file'): 
        div.append(btns.title, btns.open, btns.move, btns.delete)
        break;
      case type.contains('folder'):
        div.append(btns.title, btns.rename, btns.open, btns.move, btns.delete)
        break;
      case !targ.style["z-index"]: 
        div.append(btns.create)
        break;
      
    }
    let undisplay = function() {
      div.style.display = ''
    }
    setTimeout(function() {
      undisplay()
    }, 100)
    return div;
  },
  trash: function() {TS.html.modals.trash()}
})
