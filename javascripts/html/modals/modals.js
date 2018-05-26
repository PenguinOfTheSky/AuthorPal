/* global TS */
Object.assign(TS.html.modals, {

  addLine: function (path) {
    let options = ``;
    if (TS.data.chosenFile.master_root === undefined) {
      TS.data.chosenFile.master_root = {};
      TS.data.chosenFile.master_root.templates = 'TS.js.templates["novel outline"]';
    }
    let x;
    eval("x =" + TS.data.chosenFile.master_root.templates)
    Object.assign(x, TS.data.chosenFile.master_root.userTemplates || {})
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
            if (!path.__order) {
              path.__order = Object.keys(item)
            }
            path.__order.push(name)
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
              TS.events.save()
              location.reload()
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
          <b>Save a backup of data</b>
          <button id='exit'>X</button>
          <br>
          Your files are saved automatically to your browser cache every time you offclick a text field but if you wipe your cookies you could lose them.
          To avoid that, save a backup copy to your computer using the button below. (upload it back to AuthorPal to recover lost data)
          Left-click to save to downloads folder or right-click to choose location on harddrive to save to.
          <a href="${url}" download="AuthorPal-${date.toDateString()}">Download Backup</a>
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
  createFile: function (fileManager) {
    console.log(fileManager)
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
            <option value='Blog'>Blog</option>
            <option value='web component(js)'>Web Component (js-based html5)</option>
            <option value='website_JS'>SPA Website (js-based html5 single-page-app)</option>
            <option value='library_JS'>Javascript Library</option>
            <option value='json'>JSON file</option>
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
            return false;
          } else {
              return true;
          }
        }
        root.querySelector("#createForm").onsubmit = function (event) {
          event.preventDefault();
          let name = this.querySelector("#name").value;
          let template = this.querySelector("#selectTemplate").value;
          let base = TS.data.local.files
          fileManager.path.forEach(ele => {
            base = base[ele].files
          })
          window.i = base;
          if (name !== "" && base[name] === undefined) {
            base[name] = TS.js.templates.topNavbar[template]();
            box.remove();
            fileManager.reload(fileManager.path)
            TS.events.save()
          } else {
            root.querySelector('#status').innerHTML = '<b class="btnWarn"> Name is Already Taken! </b>'
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
      text;
    let styleChoice;
    if (TS.data.chosenFile /*&& TS.data.chosenFile.master_root.exportFormat*/) {
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
          console.log('err444')
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
          fileDownload += `<a href="${url}" download="AP-${date.toDateString()}-${TS.data.chosenFileTitle}">Download style: ${ele}</a>`;
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
          <p>Allows  selected file to be downloaded in a rendered format if compatible.</p>
          <p>
          To save as a particular file name to a particular file, right-click the link and choose "save link as..." or configure your browser settings to do so automatically.</p>
          ${fileDownload || ""}
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
  trash: function() {TS.html.modals.trash()},
  downloadFile: function () {
    let textarea = Object.assign(document.createElement("textarea"), {
      innerText: `{\n  "${TS.data.chosenFileTitle + '_' + (Math.random().toFixed(3) * 1000)}": ${JSON.stringify(TS.data.chosenFile, 0, 2)}\n}`
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
          <b>Save backup of file</b>
          <button id='exit'>X</button>
          <br>
          <p> File can be sent to another's AuthorPal or used to restore old data.
          <a href="${url}" download="AP-${date.toDateString()}-${TS.data.chosenFileTitle}">Download Backup</a>
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
  }
})
