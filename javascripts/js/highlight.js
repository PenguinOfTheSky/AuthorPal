TS.js.highlight = function(str) {
  let arrObjects = ['console', 'function']
//  let regex = new RegExp('', 'g');
  str = str.replace(/(console|function)/g, function(found) {
    return '<span class="hl-object">' + found + '</span>'
  })
  return str;
}
