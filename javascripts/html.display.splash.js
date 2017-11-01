/* global TS */
TS.html.display.splash = function () {
  return TS.lib.createComponent({
    id: "TS.html.display.splash",
    css: TS.css.boxes.splash(),
    html: `
      <div id='left'>
        <img src='icons/iconmonstr-home-7-240.png' title='home' targetName = 'about'>
        <img src='icons/iconmonstr-note-20-240.png' title='files' targetName = 'filesListContainer'>
        <img src='icons/iconmonstr-gear-11-240.png' title='admin' targetName = 'admin'>
        <img src='icons/iconmonstr-help-3-240.png' title='help' targetName = 'help'>
      </div>
      <div id='right'>
        <div id='about'>
          <h1><a href='http://www.lycelia.com'><i>Lycelia</i></a>'s <i>AuthorPal</i> v2.9.0</h1>
          <div style = 'text-indent:1rem;'>
            <b>To get started click Menu (top left) and create a new project by clicking "New File"</b>
            <p>To learn more see our <a href ='FAQ.html' target="_blank">FAQ</a>.
            Bug reports and feature requests can be filed at <a href='https://github.com/PenguinOfTheSky/AuthorPal'>https://github.com/PenguinOfTheSky/AuthorPal</a></p>
          </div>
        </div>
        <hr>
        <div id='filesListContainer' class='filesListContainer' style='display:none;'>
          <h2>Your projects</h2>
          <ul id='filesList'>
        </div><hr>
        <div id='admin'>
        </div>
        <div id = 'help'>
        </div>
      </div>
    `,
    js: function (vars) {
      let root = vars.root
      root.querySelector('#left').onclick = function(event) {
        if (event.target.getAttribute('targetName')) {
          root.querySelector('#' + event.target.getAttribute('targetName') ).scrollIntoView(1)
        }
      }
      let files = TS.data.local.files;
      if (files) {
        let list = ``;
        for (let x in files) {
          if (files.hasOwnProperty(x)) {
            let liClass = 'file'
            if (files[x].master_root.type == 'folder') liClass = 'folder'
            list += `<li data-origin = 'testing', class='${liClass}' title='${files[x].master_root.type || ''}'>${x}</li>`;
          }
        }
        list += "</ul>";
        root.querySelector("#filesListContainer").style.display = "";
        root.querySelector("#filesList").innerHTML = list;
        root.querySelector("#filesList").onclick = function (event) {
          if (event.target.classList.contains('file')) {
            TS.data.chosenFile = TS.data.local.files[event.target.innerText];
            TS.events.openFile(event.target.innerText);
          }
        };
      }
      root.querySelector('#filesListContainer').addEventListener('contextmenu', function(event) {
        event.preventDefault()
        root.append(TS.html.modals.fileContextNav(event))
      })
    }
  });
};
