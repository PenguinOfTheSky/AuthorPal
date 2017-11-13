TS.js.export['web component(js)'] = function (file, preview, viewFrame) {
  if (preview || !preview) {
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
    script.innerHTML += "\n  return me\n}"
    if (TS.data.chosenFile['#root']['#testScript'].main && preview) {
      script.innerHTML += '\n let testScript = ' + TS.data.chosenFile['#root']['#testScript'].main + '\n' + 'try { \n  testScript(test) \n} catch(err) {\n console.log(err) \n}'
    }
    let commentsNode = document.createComment(comments)
    if (!preview) {
      return {
        data: "/*" + comments + '*/\n' + "" + script.innerHTML + "",
        type: 'js'
      }
    }
    else if (preview) {
      viewFrame.contentDocument.open()
      viewFrame.contentDocument.write('<!DOCTYPE html>')
      viewFrame.contentDocument.close();
      viewFrame.contentDocument.body.append(commentsNode, script)
    }
  }
}
