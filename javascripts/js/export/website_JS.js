TS.js.export['website_JS'] = function (file, preview, viewFrame) {
  if (preview) {
    
    TS.refs.container.append(viewFrame)
    let root = document.createDocumentFragment()
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
    return root
  }
}
