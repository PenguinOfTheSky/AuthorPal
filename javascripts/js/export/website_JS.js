TS.js.export['website_JS'] = function (file, preview, viewFrame) {
  if (preview) {
    let root = document.createDocumentFragment()
    let comments = ``
    let script = document.createElement('script')
    script.innerHTML = ` {
      let me = `
    let dig = function(obj, depth, parent) {
      let spaces = "";
      if (depth > 15) return 0;
      for (let i = 0; i < depth; i++) {
        
        spaces += "  "
      }
      script.innerHTML += spaces + "{\n" + spaces + '  ';
      let keys = Object.keys(obj)
      keys.forEach((ele, i) => {
        if (ele === 'master_root' || ele === '#advanced') return 0;
        else if (ele === '#general' && depth === 0) {
          for (let x in obj[ele]) {
            if (typeof(obj[ele][x]) =='string') {
              //for backwards compat
              obj[ele][x] = {
                object_root: {
                  type: 'plain text',
                  editor: 'text'
                },
                "main": obj[ele][x]
              }
            } 
            if (obj[ele][x].object_root.type == 'plain text') {
              comments += x + ' :=> ' + obj[ele][x].main + "\n\n"
            }
          }
        } else {
          
          if (typeof(obj[ele]) == "object") {
            if (obj[ele].object_root) {
              if (obj[ele].object_root.type == 'function') {
                
                script.innerHTML += `${spaces + "  "} "${ele}": ${obj[ele].main}, \n`
              } else if (obj[ele].object_root.type == 'html') {
                script.innerHTML += `${spaces + "  "} "${ele}": \`${obj[ele].main}\`, \n`
              } else if (obj[ele].object_root.type == 'collection') {
                script.innerHTML += `${spaces + "  "} "${ele}": `
                dig(obj[ele], depth + 1)
                script.innerHTML += ','
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
    viewFrame.contentDocument.insertBefore(commentsNode, viewFrame.contentDocument.firstChild)
    viewFrame.contentDocument.body.append( script)
    if (!preview) {
      return {
        data: viewFrame.contentDocument.document.outerHTML,
        type: 'html'
      }
    } else if (preview) {
    }
  }
}
