TS.html._navBars.toggleSite_button = function() {
  let fileDownload = ``,
    filePreview = ``,
    text;
  let styleChoice;
  let output;
  let previous;
  let view = false;
  TS.data.toggleSite = view
  let img = TS.lib.createNode('button', {
    id: 'togglePreview',
    title: 'view project export preview',
    className: 'icon fa fa-eye',
    style: 'margin-left: .3rem; margin-right: .3rem; display: none;',
    onclick: function() {
      let iframeStyle = `position: absolute; z-index:999; background-color: white; width: 100%; height: ${TS.refs.display.clientHeight}px; margin-top: ${TS.refs.mainNavBar.clientHeight}px;`
      switch (TS.data.chosenFile.master_root.type) {
        case "website_JS":
        case 'web component(js)':
          if (view) {
            this.className = 'btn icon fa fa-eye'
            previous.remove()
          } else {
            this.className = 'btn icon fa fa-eye-slash'
            let viewFrame = TS.lib.createNode('iframe', {
              className: 'iframe-preview',
              style: iframeStyle
            })
            previous = viewFrame;
            TS.refs.container.append(viewFrame)
            let output = TS.js.export.exportHandler(TS.data.chosenFile, true, viewFrame)
          }
          view = !view
          break;
          case 'json':
            if (view) {
              this.className = 'btn icon fa fa-eye'
              previous.remove()
            } else {
              this.className = 'btn icon fa fa-eye-slash'
              let viewFrame = TS.lib.createNode('iframe', {
                className: 'iframe-preview',
                style: iframeStyle
              })
              previous = viewFrame;
              TS.refs.container.append(viewFrame)
              let output = TS.js.export.exportHandler(TS.data.chosenFile, true, viewFrame)
            }
            view = !view
            break;
          //case "book outline":
        default:
        let output = true //? checking
        if (!TS.data.chosenFile.master_root.exportFormat && TS.data.chosenFile.master_root.templates == `TS.js.templates["novel outline"]`) {
          TS.data.chosenFile.master_root.exportFormat = "outlineMarkdown"
        }
        if (TS.data.chosenFile && TS.data.chosenFile.master_root.exportFormat) {
          let formatted = TS.js.fileFormat[TS.data.chosenFile.master_root.exportFormat](TS.data.chosenFile);
          text = formatted;
          let keys = Object.keys(formatted);
          try {
            console.log(TS.data.chosenFile.master_root.templates)
            if (!TS.data.chosenFile["#advanced"] && TS.data.chosenFile.master_root.templates == `TS.js.templates["novel outline"]`) {
              TS.data.chosenFile["#advanced"] = (TS.js.templates.topNavbar["book outline"]())["#advanced"]
            }
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
          this.classList = "icon fa fa-eye"
          previous.remove()
        } else {
          this.classList = 'icon fa fa-eye-slash'
          let viewFrame = TS.lib.createNode('iframe', {
            src: output,
            className: 'iframe-preview',
            style: iframeStyle
          })
          previous = viewFrame;
          TS.refs.container.append(viewFrame)
        }
        view = !view
        TS.data.toggleSite = view
      }
    }
  })
  TS.refs.togglePreview = img
  return img
}
