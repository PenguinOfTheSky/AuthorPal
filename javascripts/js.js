Object.assign(TS.js,{
baseModal : function(box, root) {
  box.onclick = function() {
    box.remove();
  }
  root.querySelector('#centerModal').onclick = function(event) {
    event.stopPropagation()
  }
  window.x = root.querySelector('#exit')
  root.querySelector('#exit').onclick = function() {
    box.remove() }
},
fileFormat: {
  markdownBlog: function(file) {
    let title;
    try {
      title = file["#general"].title
    }catch(err) {}
    let body1 = ``
    let navbar1 = `<div class='topNavbar'>`
    let templates = {};
    { //populate navbar
      let keys = Object.keys(file);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] != '#general' && keys[i] != '#advanced' && keys[i] !== 'master_root') {
          { //populate templates
            let str = `<div id = '_Template_${keys[i]}'>`
            if (keys[i] != '#general' && keys[i] != '#advanced' && keys[i] !== 'master_root') {
              //skip
            } else if (keys[i] === 'homepage') {
              templates.homepage = marked(file[keys[i]].main)
            } else if (keys[i] === '') {

            } else {

            }
            str += `</div>`
          }
          navbar1 += `<button class='navButton'>${keys[i]}</button>`
        }
      }
      navbar1 += '</div>'
      body1 += navbar1 + '<div id="main">' + templates.homepage + '</div>'
    }
    let script1 = `
      document.querySelectorAll('.navButton').forEach(function(ele) {
        ele.onclick=function() {
          document.querySelector('#main').innerHTML =''
          document.querySelector(#'main').innerHTML = templates[this.innerText]
        }
      })`
    return {default:
      { head: {
        title: title
      }, main: body1, script: script1}
    }
  },
  outlineMarkdown: function(file) {
    let str = ``;
    let title;
    try {
      title = file.general.title
    } catch(err) {
      title = ''
    }
    if (title) {str+= `<h1>${title}</h1>`}
    let tableOfContents = `
    <h2 id='tableOfContents'>Table of Contents</h2>`
    let format = function(obj, depth, path, parent) {
      if (typeof(obj) != 'object') {
        str += `<div class='content _${depth}'>`
        if (parent[0] === '*') str += obj //add _ support later.
        else str += marked(obj)
        str += '</div>'
        return 0;
      }
      tableOfContents += '<ul>'
      let keys = Object.keys(obj)
      keys.forEach(ele=> {
        if (ele === 'master_root' || ele ==='#advanced') return 0;
        tableOfContents += `<li><a href="#${path + ele}">${ele}</a></li>`
        str += `<h${depth} id='${path + ele}' class='headers _${depth}'>${ele}</h${depth}>`
        format(obj[ele], depth + 1, path + ele, ele)
      })
      tableOfContents += '</ul>'
    }
    format(file, 2, "_", '')
    let script = `
      document.querySelectorAll('.headers').forEach(ele => {ele.onclick = function() {
            window.scrollTo(0, 0);}
          })`
    return {default: { head: {title: title}, main: tableOfContents + str, script: script}};
  }
}
})
