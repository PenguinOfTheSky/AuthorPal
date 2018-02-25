TS.js.export.exportHandler = function(file, preview, viewFrame) {
  //preview true/false
  if (!file.master_root) return 0;
  switch(file.master_root.type) {
    case "blog":
      return TS.js.export['blog'](file, preview, viewFrame)
      break;
    /*case "book outline":
      // return TS.js.export['book outline'](file, preview, viewFrame)
      let url
      if (TS.data.chosenFile && TS.data.chosenFile.master_root.exportFormat) {
        let formatted = TS.js.fileFormat[TS.data.chosenFile.master_root.exportFormat](TS.data.chosenFile);
        text = formatted;
        let keys = Object.keys(formatted);
        try {
          styleChoice = TS.data.chosenFile["#advanced"].styles["*chosenStyle"];
          styleChoice ="<style>" +  TS.data.chosenFile["#advanced"].styles[styleChoice].main + "</style>";
        } catch (err) {
          return 0;
        }
        keys.forEach(function (ele) {
          let textarea = Object.assign(document.createElement("textarea"), {
            innerText: `<head> ${TS.data.chosenFile["#advanced"]["*head"].main || ''}
            <script>${TS.data.chosenFile["#advanced"]["*script"].main} </script>
             ${styleChoice} </head>` + formatted[ele].main + "<script>" + formatted[ele].script + "</script>"
          });
          console.log(textarea.innerText)
          var myblob = new Blob([textarea.innerText], {
            type: "text/html"
          });
          url = URL.createObjectURL(myblob);
        });
      }
      if (!url) return 0;
      else return url;
      break; */
    case "website_JS":
      return TS.js.export['website_JS'](file, preview, viewFrame)
      break;
    case "json": 
      return TS.js.export['json'](file, preview, viewFrame)
      break;
    case "web component(js)":
      return TS.js.export['web component(js)'](file, preview, viewFrame)
      break;
    default: 
      console.log("no recognized type")
      return 0;
  }
}
