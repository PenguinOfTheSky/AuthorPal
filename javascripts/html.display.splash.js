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
          <h1><a href='http://www.lycelia.com'><i>Lycelia</i></a>'s <i>AuthorPal</i> v2.9.4</h1>
          
        </div>
        <hr>
        <div id='filesListContainer' class='filesListContainer'>
          <h2>Your projects</h2>
          <ul id='filesList'></ul>
          <button id='createNewFile'> Create a new project </button>
        </div><hr>
        <div id='admin'>
        <h2>Admin</h2>
          <form id = 'prefForm' style='padding:5%;'>
            <fieldset>
              <h3>Edit Preferences </h3>
              <label for='themeSelect'><b>Themes change what AuthorPal looks like </b></label>
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
      let files = TS.data.local.files;
      if (Object.keys(files).length > 0) {
        let list = ``;
        for (let x in files) {
          if (files.hasOwnProperty(x)) {
            let liClass = 'file'
            if (files[x].master_root.type == 'folder') liClass = 'folder'
            list += `<li data-origin = 'testing', class='${liClass}' title='${files[x].master_root.type || ''}'>${x}</li>`;
          }
        }
        list += "</ul>";
        root.querySelector("#filesList").innerHTML = list;
        root.querySelector("#filesList").onclick = function (event) {
          if (event.target.classList.contains('file')) {
            TS.data.chosenFile = TS.data.local.files[event.target.innerText];
            TS.events.openFile(event.target.innerText);
          }
        };
      } else {
        root.querySelector("#filesList").innerHTML = "<i style='font-size: .9rem;'> No projects found </i>"
      }
      root.querySelector('#filesListContainer').addEventListener('contextmenu', function(event) {
        event.preventDefault()
        root.append(TS.html.modals.fileContextNav(event))
      })
      vars.opts.scroll = function(name) {
        root.querySelector('#' + name).scrollIntoView(1)
      }
    }
  });
};
