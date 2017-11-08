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
    style: 'margin-left: .3rem; margin-right: .3rem;',
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
            TS.refs.container.append(viewFrame)
            let root = document.createElement('root')
            let comments = ``
            let script = document.createElement('script')
            script.innerHTML = `let test = function(vars) {
              let me = `
            let dig = function(obj, depth, parent) {
              let spaces = "";
              for (let i = 0; i < depth; i++) {
                spaces += "  "
              }
              script.innerHTML += spaces + "{\n" + spaces + '  ';
              let keys = Object.keys(obj)
              keys.forEach((ele, i) => {
                if (ele === 'master_root' || ele === '#advanced') return 0;
                else if (ele === '#general' && depth === 0) {
                  for (let x in obj[ele]) {
                    comments += obj[ele][x] + "\n"
                  }
                } else {
                  if (typeof(obj[ele] == 'object')) {
                    if (obj[ele].object_root) {
                      if (obj[ele].object_root.type == 'function') {
                        
                        script.innerHTML += `${spaces + "  "} "${ele}": ${obj[ele].main}, \n`
                      }
                    } else {
                      script.innerHTML += `${spaces + "  "} "${ele}": `
                      dig(obj[ele], depth + 1)
                      script.innerHTML += ','
                    }
                  }
                }
              })
              script.innerHTML += spaces + "}"
            }
            dig(TS.data.chosenFile, 0)
            script.innerHTML += '\n  return me\n}\n let testScript = ' + TS.data.chosenFile['#advanced'].testScript.main + '\n' + 'testScript(test)'
            comments = document.createComment(comments)
            root.append(comments, script)
            
            viewFrame.contentDocument.body.append(root)
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
