TS.js.exportHandler = function(file, preview, viewFrame) {
  //preview true/false
  window.i = viewFrame
  console.log('fish')
  if (!file.master_root) return 0;
  switch(file.master_root.type) {
    case "markdown blog":
    
      break;
    case "website_JS":
      return TS.js.export['website_JS'](file, preview, viewFrame)
      break;
    case "web component(js)":
      return TS.js.export['web component(js)'](file, preview, viewFrame)
      break;
    default: 
      console.log("no recognized type")
      return 0;
  }
}
