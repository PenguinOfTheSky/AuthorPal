TS.js.highlight = function(str) {
  if (str.length == 0) return ''
  let arrObjects = ['console', 'function']
//  let regex = new RegExp('', 'g');
  str = str.replace(/(console|function)/g, function(found) {
    return '<span class="hl-object">' + found + '</span>'
  })
  str = str.replace(/\n/g, '<br>')
  return str;
}
