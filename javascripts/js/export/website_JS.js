TS.js.export['website_JS'] = function (file, preview, viewFrame) {
  if (preview) {
    let root = document.createDocumentFragment()
    let comments = ``
    let script = document.createElement('script')
    script.innerHTML = ` {
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
    script.innerHTML += ` \n try {
      me['#head']['#start']()
    } catch (err) {
      console.log(err)
    }`
    script.innerHTML += "\n }"
    let commentsNode = document.createComment(comments)
    viewFrame.contentDocument.open()
    viewFrame.contentDocument.write('<!DOCTYPE html>')
    viewFrame.contentDocument.close();
    viewFrame.contentDocument.body.append(commentsNode, script)
    window.i = viewFrame.contentDocument
    if (!preview) {
      return {
        data: viewFrame.contentDocument.document.outerHTML,
        type: 'html'
      }
    } else if (preview) {
    }
  }
}
