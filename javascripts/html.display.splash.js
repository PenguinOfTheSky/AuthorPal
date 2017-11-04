/* global TS */
TS.html.display.splash = function () {
  return TS.lib.createComponent({
    id: "TS.html.display.splash",
    css: TS.css.boxes.splash(),
    html: `
      <div id='left' style='display:none;'>
        <img src='icons/iconmonstr-home-7-240.png' title='home' targetName = 'about'>
        <img src='icons/iconmonstr-note-20-240.png' title='files' targetName = 'filesListContainer'>
        <img src='icons/iconmonstr-gear-11-240.png' title='admin' targetName = 'admin'>
        <img src='icons/iconmonstr-help-3-240.png' title='help' targetName = 'help'>
      </div>
      <div id='right'>
        <div id='about'>
          <h1><a href='http://www.lycelia.com'><i>Lycelia</i></a>'s <i>AuthorPal</i> v2.10.0</h1>
          
        </div>
        <hr>
        <div id='filesListContainer' class='filesListContainer'>
          <h2>Your projects</h2>
          <div id='filesList'></div>
          <div style='text-align: center; '>
            <button id='createNewFile'> Create a new project </button>
            <img src='icons/iconmonstr-trash-can-15-240.png' style='vertical-align: middle;' class = 'dropzone' id='trash'>
          </div>
        </div><hr>
        <div id='admin'>
        <h2>Admin</h2>
          <form id = 'prefForm' style='padding:5%;'>
            <fieldset>
              <h3>Edit Preferences </h3>
              Themes change what AuthorPal looks like <br>
              <label for='themeSelect'>Chosen theme </label>
              <select id='themeSelect'>
                <option value='default'>default</option>
                <option value='sparky'>Sparky</option>
                <!-- <option value='Theme1'>Theme1</option> -->
                <option value='dark'>Dark</option>
                <option value='midnight'>Midnight</option>
              </select>
              <br>
              <button type = 'submit' class='btnSubmit'>Submit</button>
            </fieldset>
          </form>
        </div><hr>
        <div id = 'help'>
          <h2>Confused?</h2>
          <div style = 'text-indent:1rem;'>
            <b>To get started click Menu (top left) and create a new project by clicking "New File"</b>
            <p>To learn more see our <a href ='FAQ.html' target="_blank">FAQ</a>.
            Bug reports and feature requests can be filed at <a href='https://github.com/PenguinOfTheSky/AuthorPal'>https://github.com/PenguinOfTheSky/AuthorPal</a></p>
          </div>
        </div>
      </div>
    `,
    js: function (vars) {
      let root = vars.root
      root.querySelector('#themeSelect').value = TS.data.local.preferences.theme;
      root.querySelector('#left').onclick = function(event) {
        if (event.target.getAttribute('targetName')) {
          root.querySelector('#' + event.target.getAttribute('targetName') ).scrollIntoView(1)
        }
      }
      root.querySelector("#createNewFile").onclick = function() {
        TS.refs.container.append(TS.html.modals.createFile())
      }
      let files = TS.data.local.files;
      if (Object.keys(files).length > 0) {
        let list = document.createDocumentFragment();
        for (let x in files) {
          if (files.hasOwnProperty(x)) {
            let img = 'iconmonstr-note-20-240.png'
            let divClass = 'file fileOrFolder'
            if (files[x].master_root.type == 'folder') {
              img = 'iconmonstr-folder-19-240.png'
              divClass = 'folder fileOrFolder dropzone'
            }
            let helperContent = ``;
            let thisRoot = files[x].master_root
            if (thisRoot.type) helperContent += thisRoot.type
            if (thisRoot.dateCreated) helperContent += '\ncreated: ' + thisRoot.dateCreated
            if (thisRoot.dateModified) helperContent += '\nmodified: ' + thisRoot.dateCreated
            let div = TS.lib.createNode('div', {
              title: helperContent,
              "data-origin": 'testing',
              className: divClass,
              draggable: true,
              onclick: function(event) {
                TS.data.chosenFile = TS.data.local.files[x];
                TS.events.openFile(x);
              },
              oncontextmenu: function(e) {
                e.preventDefault()
                if (e.target !== this) e.target = this
                root.append(TS.html.modals.fileContextNav(e))
              }
            })
            div.append(TS.lib.createNode('img', {
              draggable: false,
              src: 'icons/' + img
            }), TS.lib.createNode('span', {
              contentEditable: true,
              innerText: x,
              onclick: function(e) {
                e.stopPropagation()
                e.preventDefault()
              }
            }))
            list.append(div) 
          }
        }
        root.querySelector("#filesList").append( list);
        root.querySelectorAll('.fileOrFolder').forEach(ele => {
          ele.ondragstart = function(e) {
            TS.refs.draggedItem = this
          }
          ele.ondrop = function(e) {
            e.preventDefault()
            console.log('pim')
          }
        })
      } else {
        root.querySelector("#filesList").innerHTML = "<i style='font-size: .9rem;'> No projects found </i>"
      }
      Object.assign(root.querySelector('#trash'), {
        onclick: function(e) {
          TS.refs.container.appendChild(TS.html.modals.trash())
        },
        ondragenter: function(e) {
          this.style.width = '2.5rem'
          this.style.height = '2.5rem'
        },
        ondragleave: function(e) {
          this.style.width = ''
          this.style.height = ''
        },
        ondragover: function(e) {
          e.preventDefault()
        },
        ondrop: function(e) {
          let item = TS.refs.draggedItem
          e.preventDefault()
          this.style.width = ''
          this.style.height = ''
          item.style.display = 'none'
          if (!TS.data.local.trash) TS.data.local.trash = []
          let name = item.querySelector('span').innerText
          if (!TS.data.local.files[name].master_root) {
            TS.data.local.files[name].master_root = {}
          }
          TS.data.local.files[name].master_root.dateDeleted = (new Date()).toLocaleString()
          TS.data.local.files[name].master_root.fileName = name
          TS.data.local.trash.push(TS.data.local.files[name])
          delete TS.data.local.files[name]
          TS.events.save()
        }
      })
      vars.opts.scroll = function(name) {
        root.querySelector('#' + name).scrollIntoView(1)
      }
    }
  });
};
