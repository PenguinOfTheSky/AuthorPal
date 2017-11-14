/* global TS */
TS.html.display.splash = function () {
  return TS.lib.createComponent({
    id: "TS.html.display.splash",
    css: TS.css.boxes.splash(),
    html: TS.html.display.splash.html(),
    js: function (vars) {
      return TS.html.display.splash.js(vars)
    }
  });
};
