TS.html.display.splash.js = function(vars) {
  let root = vars.root
  root.querySelector('#themeSelect').value = TS.data.local.preferences.theme;
  root.querySelector('#prefForm').onsubmit = function(e) {
    e.preventDefault() 
    TS.data.local.preferences.theme = root.querySelector('#themeSelect').value;
    let reload = function() {location.reload()}
    TS.events.save(reload);
    
  }
  TS.html.display.splash.files_js(root)
  vars.opts.scroll = function(name) {
    root.querySelector('#' + name).scrollIntoView(1)
  }
}
