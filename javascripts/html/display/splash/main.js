/* global TS */
TS.html.display.splash.main = function () {
  return TS.lib.createComponent({
    id: "TS.html.display.splash",
    css: TS.css.boxes.splash(),
    html: TS.html.display.splash.splash_html(),
    js: function (vars) {
      return TS.html.display.splash.js(vars)
    }
  });
};
