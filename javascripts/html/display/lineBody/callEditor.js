//possibly move file to better folder? called by titleBar.js
TS.html.display.lineBody.callEditor = function (itemContent, type, callback) {
  let editorContainer = TS.lib.createNode('div', {
    onblur: function() {
      callback(aceEditor.getValue())
      this.remove()
    },
    style: `width: ${TS.refs.display.clientWidth}px; height: ${TS.refs.display.clientHeight}px; position: absolute; z-index: 1; top: ${TS.refs.topNav.clientHeight}px; left: ${TS.refs.secondaryNavBar.clientWidth}px`
  })
  let exitEditor = TS.lib.createNode('button', {
    innerText: 'Exit Editor',
    className: 'baseButtons2',
    onclick: function() {
      callback(aceEditor.getValue())
      editorContainer.remove();
    }
  })
  let editor = TS.lib.createNode('div', {
    id: 'editor'
  })
  editorContainer.append(exitEditor,"<br>", editor)
  document.body.append(editorContainer)
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
      aceEditor.$blockScrolling = Infinity
      aceEditor.setOptions({
        wrap: true,
        fontSize: "1rem"
      });
      aceEditor.setValue(itemContent);
  }
}
