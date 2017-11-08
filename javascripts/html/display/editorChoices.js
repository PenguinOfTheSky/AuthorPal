TS.html.display.editorChoices = function(name, preferred) {
  if (preferred) {
    switch (preferred) {
      
    }
  }
  let buttons = [];
  let addEditor = function(type) {
    document.body.append(TS.lib.createNode('div', {
      id: 'editor',
      style: `width: ${TS.refs.display.clientWidth}px; height: ${TS.refs.display.clientHeight}px; position: absolute; z-index: 1; top: ${TS.refs.topNav.clientHeight}px; left: ${TS.refs.secondaryNavBar.clientWidth}px`
    }))
    let aceEditor;
    switch (type) {
      case 'rich text':
        $(document).ready(function() {
          $('#editor').summernote();
          $('#editor').summernote({
            focus: true
          });
          document.querySelector('.note-editor').style = `
            width: ${TS.refs.display.clientWidth}px; height: ${TS.refs.display.clientHeight}px; position: absolute; z-index: 1; top: ${TS.refs.topNav.clientHeight}px; left: ${TS.refs.secondaryNavBar.clientWidth}px
          `
          $('#editor').summernote('code', lineBody.querySelector('.textField').innerHTML);
          aceEditor = {
            getValue: function() {
              let text = $('#editor').summernote('code')
              $('#editor').summernote('destroy');

              return text;
            },
            setValue: function() {// code insertion todo?
            }
          }
        });
        break;
      default:
        aceEditor = ace.edit("editor");
        aceEditor.setTheme("ace/theme/monokai");
        aceEditor.getSession().setMode("ace/mode/" + type);
        aceEditor.setOptions({
          wrap: true,
          fontSize: "1rem"
        });
        aceEditor.setValue(item);
    }
    let exitEditor = TS.lib.createNode('button', {
      innerText: 'Exit Editor',
      className: 'baseButtons2',
      onclick: function() {
        item = aceEditor.getValue();
        path[itemName] = item;
        if (itemName[0] == '*') {
          lineBody.querySelector('.textField').innerText = item;
        } else {
          lineBody.querySelector('.textField').innerHTML = marked(item);
        }
        document.querySelector('#editor').remove();
        this.remove()
      }
    })
    TS.refs.secondaryNavBar.shadowRoot.querySelector('#left').append(exitEditor)
  }
  if (name[0] == '*') {
    let opts = ['javascript', 'css', 'json', 'html']
    opts.forEach(ele => {
      let aBtn = TS.lib.createNode('button', {
        innerText: ele,
        onclick: function() {addEditor(ele)}
      })
      buttons.push(aBtn)
    })
  } else {
    let opts = ['rich text', 'markdown', 'html']
    opts.forEach(ele => buttons.push(
      TS.lib.createNode('button', {
        innerText: ele,
        onclick: function() {
          addEditor(ele)
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
