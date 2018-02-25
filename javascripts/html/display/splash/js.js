TS.html.display.splash.js = function(vars) {
  let root = vars.root
  root.querySelector('#prefForm').themeSelect.value = TS.data.local.preferences.theme;
  root.querySelector('#prefForm').onsubmit = function(e) {
    e.preventDefault() 
    console.log(this)
    window.b = this
    TS.data.local.preferences.theme = this.themeSelect.value;
    let reload = function() {
      location.reload()
    }
    TS.events.save(reload);
    
  }
  TS.html.display.splash.files_js(root)
  vars.opts.scroll = function(name) {
    root.querySelector('#' + name).scrollIntoView(1)
  }
}
