TS.html.display.editorChoices = function(name, callback) {
  let buttons = [];
  if (name[0] == '*') {
    let opts = ['javascript', 'css', 'json', 'html']
    opts.forEach(ele => {
      let aBtn = TS.lib.createNode('button', {
        innerText: ele,
        onclick: function() {callback(ele)}
      })
      buttons.push(aBtn)
    })
  } else {
    let opts = ['rich text', 'markdown', 'html']
    opts.forEach(ele => buttons.push(
      TS.lib.createNode('button', {
        innerText: ele,
        onclick: function() {
          callback(ele)
        }
      })
    ))
  }
  let div = TS.lib.createNode('div', {
    className: 'editorTooltip'
  })
  div.append(...buttons)
  return div
}
