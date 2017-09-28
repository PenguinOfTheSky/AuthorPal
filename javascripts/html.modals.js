TS.html.modals = {
  preferencesFile : function() {
    let item =  TS.lib.createComponent({
      id: 'TS.html.modals.preferencesFile',
      css: TS.css.modals.preferencesFile(),
      html: `
        <div id='centerModal'>
        <button id='exit'>X</button>
        <b>Edit Preferences </b>
        <br>
        <form id = 'prefForm'>
          <b>Choose a style theme</b>
          <select id='themeSelect'>
            <option value='default'>default</option>
            <option value='sparky'>Sparky</option>
            <option value='Theme1'>Theme1</option>
          </select>
          <input type = 'submit' class='btnSubmit'>
        </form>
        (Must refresh afterwards to see new style theme)
        </div>
      `,
      js: function({style, box, parent, root}) {
        TS.js.baseModal(box, root)
        root.querySelector('#prefForm').onsubmit = function(event) {
          event.preventDefault()
          TS.data.local.preferences.theme = root.querySelector('#themeSelect').value
          TS.events.updatePreferences(root.querySelector('#themeSelect').value);
          box.remove();
          return 0;
        }
      }
    })
    return item.box;
  },
  addLine : function(path, focused) {
    let options = ``
    let x = eval(TS.data.chosenFile.master_root.templates)
    Object.keys(x).forEach(function(ele) {
      options +=`<option value='${ele}'>${ele}</option>`
    })
    let item =  TS.lib.createComponent({
      id: 'TS.html.modals.addLine',
      css: TS.css.modals.addLine(),
      html: `
        <div id='centerModal'>
         <form id='addLineForm'>
          <b>Create New Line</b>
          <button id='exit'>X</button>
          <br>
          <label>line name</label> <input required id ='name' type='text' placeholder='name'><br>
          <label>Select Template</label> <select id='selectTemplate'>
            ${options}
          </select><br>
          <input type='submit' value='Submit' class='btnSubmit'>
          <div id='status'></div>
         </form>
        </div>
      `,
      js: function({style, box, parent, root}) {
        TS.js.baseModal(box, root);
        root.querySelector('#addLineForm').onsubmit = function(event) {
          event.preventDefault();
          let name = this.querySelector('#name').value
          let template = this.querySelector('#selectTemplate').value
          if (name != '' && path[name] === undefined) {
            path[name] = x[template]()
            TS.events.bodyChange(focused)
          }
          box.remove();
          return false;
        }
      }
    })
    return item.box;
  },
  uploadFile : function() {
    let item =  TS.lib.createComponent({
      id: 'TS.html.modals.uploadFile',
      css: TS.css.modals.uploadFile(),
      html: `
        <div id='centerModal'>
          <b>Upload backup</b>
          <button id='exit' >X</button>
          <br>
          Warning, may overwrite projects already in your localStorage<br>
          <input id='fileUpload' type='file' value='Upload'>
          <input type = 'submit' id='submit' class='btnSubmit'>
        </div>
      `,
      js: function({style, box, parent, root}) {
        TS.js.baseModal(box, root)
        root.querySelector('#submit').onclick = function() {
          var input = root.querySelector('#fileUpload')
          var reader = new FileReader();
          if (input.files.length) {
              var textFile = input.files[0];
              reader.onload = function(e) {
                Object.assign(TS.data.local.files, JSON.parse(e.target.result))
              };
              reader.readAsText(textFile)
          } else {
              alert('Please upload a file before continuing')
          }
        }
      }
    })
    return item.box;
  },
  saveFile : function() {
    let textarea = Object.assign(document.createElement('textarea'), {
      innerText: JSON.stringify(TS.data.local.files,0,2)
    })
    var myblob = new Blob([textarea.innerText], {
      type: 'text/plain'
    });
    let url = URL.createObjectURL(myblob);
    let date = new Date()
    let item =  TS.lib.createComponent({
      id: 'TS.html.modals.saveFile',
      css: TS.css.modals.saveFile(),
      html: `
        <div id='centerModal'>
          <b>Save a Backup</b>
          <button id='exit'>X</button>
          <br>
          Your files are saved automatically to your localStorage every fifteen seconds but if you wipe your cookies you could lose them.
          To avoid that, save a backup copy to your computer using the button below.
          Left-click to save to downloads folder or right-click to choose location on harddrive to save to.
          <a href="${url}" download="AuthorPal-${date.toDateString()}">Download</a>
        </div>
      `,
      js: function({style, box, parent, root}) {
        TS.js.baseModal(box, root)
      }
    })
    return item.box;
  },
  createFile: function({commands}) {
    let item =  TS.lib.createComponent({
      id: 'TS.html.modals.createFile',
      css: TS.css.modals.createFile(),
      html: `
        <div id='centerModal'>
         <form id = 'createForm'>
          <button id='exit'>X</button>
          <b>Create New Project</b>
          <br>
          <label>Project name</label> <input required id ='name' type='text' placeholder='name'><br>
          <label>Select Template</label> <select id='selectTemplate'>
            <option value='book outline'>Book/creative work Outline</option>
            <option value='Markdown Blog'>Markdown Blog</option>
          </select><br>
          <input type='submit' value='Submit' class='btnSubmit'>
          <div id='status'></div>
         </form>
        </div>
      `,
      js: function({style, box, parent, root}) {
        TS.js.baseModal(box, root)
        root.querySelector('#createForm').onsubmit = function(event) {
          event.preventDefault();
          let name = this.querySelector('#name').value
          let template = this.querySelector('#selectTemplate').value
          if (name != '' && TS.data.local.files[name] === undefined) {
            TS.data.local.files[name] = TS.js.templates.topNavbar[template]()
            box.remove()
            TS.data.chosenFile = TS.data.local.files[name]
            commands.open()
          } else {
            let msg = Object.assign(document.createElement('b'), {
              innerText: ' | Name is already taken! | ',
              style: 'color: blue;'
            })
            root.appendChild(msg)
          }
          return false;
        }
      }
    })
    return item.box;
  },
  openFile: function({commands}) {
    let item =  TS.lib.createComponent({
      id: 'TS.html.modals.openFile',
      css: TS.css.modals.openFile(),
      html: `
        <div id='centerModal'>
          <button id='exit'>X</button>
        </div>
      `,
      js: function({style, box, parent, root}) {
        TS.js.baseModal(box, root)
        for (let x in TS.data.local.files) {
          let file = Object.assign(document.createElement('button'), {
            className:'fileBtn',
            innerText: x,
            onclick: function() {
              TS.data.chosenFile = TS.data.local.files[x]
              commands.open()
              box.remove()
            }
          })
          root.querySelector('#centerModal').appendChild(file)
        }
        if (Object.keys(TS.data.local.files).length == 0) root.querySelector('#centerModal').appendChild(TS.lib.createNode('h2', {innerHTML: 'no files found'}))
      }
    })
    return item.box;
  },
  confirmationDelete : function(name, callback) {
    let item =  TS.lib.createComponent({
      id: 'TS.html.modals.confirmationDelete',
      css: TS.css.modals.confirmationDelete(),
      html: `
        <div id='centerModal'>
          <button id='exit'>X</button>
          <h2>Are you sure you would like to delete "${name}"?</h2>
          <button id='yes' class='btnWarn'>Yes</button><button id='cancel'>Cancel</button>
        </div>
      `,
      js: function({style, box, parent, root}) {
        TS.js.baseModal(box, root)
        root.querySelector('#yes').onclick = function() {callback(); box.remove();}
        root.querySelector('#cancel').onclick = function() {box.remove();}
      }
    })
    return item.box;
  },
  exportFile : function(name, callback) {
    let fileDownload =``,
    filePreview =``,
    text;
    let styleChoice;
    if (TS.data.chosenFile && TS.data.chosenFile.master_root.exportFormat) {
      let formatted = TS.js.fileFormat[TS.data.chosenFile.master_root.exportFormat](TS.data.chosenFile)
      text = formatted
      let keys = Object.keys(formatted)
      try {
        styleChoice = TS.data.chosenFile['#advanced'].styles['*chosenStyle']
        styleChoice = TS.data.chosenFile['#advanced'].styles[styleChoice]
      } catch(err) {
        console.log('style incompatible')
        return 0;
      }
      keys.forEach(function(ele) {
        let textarea = Object.assign(document.createElement('textarea'), {
          innerText: `<head><title>${formatted[ele].head.title}</title>${styleChoice} </head>` +  formatted[ele].main + "<script>" + formatted[ele].script + "</script>"
        })
        var myblob = new Blob([textarea.innerText], {
          type: 'text/html'
        });
        let url = URL.createObjectURL(myblob);
        let date = new Date()
        fileDownload += `<a href="${url}" download="AuthorPal-${date.toDateString()}-style:${ele}">Download style: ${ele}</a>`
        filePreview += `<a href="#" id='preview_${ele}'>Preview style:${ele} </a>`
      })
    }
    let item =  TS.lib.createComponent({
      id: 'TS.html.modals.exportFile',
      css: TS.css.modals.exportFile(),
      html: `
        <div id='centerModal'>
          <button id='exit'>X</button>
          <h2>Export File</h2>
          <p>Unlike the download option that saves all your work in json format, this allows the selected file to be downloaded in a rendered format if compatible.</p>
          ${fileDownload || ""}<br>
          ${filePreview || ""}
        </div>
      `,
      js: function({style, box, parent, root}) {
        TS.js.baseModal(box, root)
        if (!fileDownload) {
          let i = document.createElement('i')
          i.innerText = "Either you haven't opened a file or your file is incompatible for export."
          root.querySelector('#centerModal').appendChild(i)
        } else {
          Object.keys(text).forEach(function(ele) {
            root.querySelector('#preview_'+ele).onclick = function() {
              let x = window.open()
              x.document.head.innerHTML += styleChoice
              console.log(styleChoice)
              x.document.body.innerHTML = text[ele].main
              x.document.title = text[ele].head.title
              let script = document.createElement('script')
              script.innerHTML = text[ele].script
              x.document.body.appendChild(script)
            }
          })
        }
      }
    })
    return item.box;
  }
}
