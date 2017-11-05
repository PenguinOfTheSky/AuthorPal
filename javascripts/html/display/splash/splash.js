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
          <h1><a href='http://www.lycelia.com'><i>Lycelia</i></a>'s <i>AuthorPal</i> v3.0.0</h1>
          
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
          <form id = 'prefForm' style='padding:5%;' onsubmit="console.log()">
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
      return TS.html.display.splash.js(vars)
    }
  });
};
