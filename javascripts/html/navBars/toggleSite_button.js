TS.html._navBars.toggleSite_button = function() {
  let fileDownload = ``,
    filePreview = ``,
    text;
  let styleChoice;
  let output;
  let previous;
  let view = false;
  let img = TS.lib.createNode('img', {
    src: 'icons/iconmonstr-eye-6.svg',
    title: 'view site',
    className: 'icon',
    style: 'margin-left: .3rem; margin-right: .3rem; display: none;',
    onclick: function() {
      let iframeStyle = `position: absolute; z-index:999; background-color: white; width: 100%; height: ${TS.refs.display.clientHeight}px; margin-top: ${TS.refs.mainNavBar.clientHeight}px;`
      switch (TS.data.chosenFile.master_root.type) {
        case 'web component(js)':
          if (view) {
            this.src = "icons/iconmonstr-eye-6.svg"
            previous.remove()
          } else {
            this.src = "icons/iconmonstr-eye-10.svg"
            let viewFrame = TS.lib.createNode('iframe', {
              className: 'iframe-preview',
              style: iframeStyle
            })
            previous = viewFrame;
            let output = TS.js.exportHandler(TS.data.chosenFile, true, viewFrame)
            
            viewFrame.contentDocument.body.append(output)
          }
          view = !view
          break;
        default: 
        if (TS.data.chosenFile && TS.data.chosenFile.master_root.exportFormat) {
          let formatted = TS.js.fileFormat[TS.data.chosenFile.master_root.exportFormat](TS.data.chosenFile);
          text = formatted;
          let keys = Object.keys(formatted);
          try {
            styleChoice = TS.data.chosenFile["#advanced"].styles["*chosenStyle"];
            styleChoice = TS.data.chosenFile["#advanced"].styles[styleChoice];
          } catch (err) {
            return 0;
          }
          keys.forEach(function (ele) {
            let textarea = Object.assign(document.createElement("textarea"), {
              innerText: `<head> ${TS.data.chosenFile["#advanced"]["*head"] || ''}
              <script>${TS.data.chosenFile["#advanced"]["*script"]} </script>
               ${styleChoice} </head>` + formatted[ele].main + "<script>" + formatted[ele].script + "</script>"
            });
            var myblob = new Blob([textarea.innerText], {
              type: "text/html"
            });
            let url = URL.createObjectURL(myblob);
            output = URL.createObjectURL(myblob);
            filePreview += `<a href="${url}" target='_blank' id='preview_${ele}'>Preview style:${ele} </a>`;
          });
        }
        if (!output) return 0;
        
        if (view) {
          this.src = "icons/iconmonstr-eye-6.svg"
          previous.remove()
        } else {
          this.src = "icons/iconmonstr-eye-10.svg"
          let viewFrame = TS.lib.createNode('iframe', {
            src: output,
            className: 'iframe-preview',
            style: iframeStyle
          })
          previous = viewFrame;
          TS.refs.container.append(viewFrame)
        }
        view = !view
      }
    }
  })
  return img
}
