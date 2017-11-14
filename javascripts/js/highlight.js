TS.js.highlight = function(str, language) {
  if (language == 'js' || language =='javascript') {
    if (str.length == 0) return ''
    let arrObjects = ['console', 'function']
  //  let regex = new RegExp('', 'g');
    str = str.replace(/(console|function)/g, function(found) {
      return '<span class="hl-object">' + found + '</span>'
    })
    str = str.replace(/\n/g, '<br>')
    return str;
  } else if (language == 'css') {
    return str ;
  } else if (language == 'rich text') {
    return str
  } else if (language == 'html') {
    str = str.replace(/[<"'=]/g, function(found) {
      if (found === '<') return "&#60;"
      else if (found ==='>') return "	&#62;"
      else if (found ==='"') return "&#34;"
      else if (found ==="'") return "&#39;"
      else if (found ==='=') return "&#61;"
    })
    //escape html
    return str
  } else if (language == 'markdown') {
    return marked(str)
  }
  
}
