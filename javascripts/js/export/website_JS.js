TS.js.export['website_JS'] = function (file, preview, viewFrame) {
  if (!preview) {
    viewFrame.style.display = 'none'
  }
  if (preview || !preview) {
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
        if (ele === 'master_root' || ele === '#advanced' || (ele[0] === '_' && ele[1] ==='_')) return 0;
        else if (ele === '#general' && depth === 0) {
          for (let x in obj[ele]) {
            if ((x[0] === '_' && x[1] ==='_')) continue;
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
              } else {
                script.innerHTML += `${spaces + "  "} "${ele}": \`${obj[ele].main}\`, \n`
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
    script.innerHTML += ` \n
      me['#head']['#start']()
    `
    script.innerHTML += "\n }"
    let commentsNode = document.createComment(comments)
    let css = document.createElement('style')
    let digCSS = function(obj) {
      if (typeof(obj) == 'object') {
        if (obj.object_root) {
          if (obj.object_root.type == 'css') {
            css.innerHTML += obj.main
          } else if (obj.object_root.type='collection') {
            for (let i in obj) {
              digCSS(obj[i])
            }
          }
        }
      }
    }
    try {
      //backwards compat line
      if (!file['#head']['#css'].object_root) {
        file['#head']['#css'].object_root = {
          type: 'collection'
        }
      }
      digCSS(file['#head']['#css'])
    } catch(err) {
      console.log("no css found")
    }
    let head = file['#head']["imports/title/etc"].main
    viewFrame.contentDocument.open()
    viewFrame.contentDocument.write('<!DOCTYPE html>')
    viewFrame.contentDocument.close();
    try {
      viewFrame.contentDocument.insertBefore(commentsNode, viewFrame.contentDocument.firstChild)
      viewFrame.contentDocument.head.innerHTML = head
      viewFrame.contentDocument.head.append(css)
      viewFrame.contentDocument.body.append(script)
    } catch (err) {
      console.log(err)
    }

    if (!preview) {
      //needs work. check for iframe memory leak (is it getting removed?)
      return {
        data: ("<!DOCTYPE html> \n <html> \n <!--\n" + comments + "\n-->"+  viewFrame.contentDocument.head.outerHTML + "\n<body>\n" +  script.outerHTML + '\n</body>\n</html>'),
        type: 'html'
      }
    } else if (preview) {
    }
  }
}
