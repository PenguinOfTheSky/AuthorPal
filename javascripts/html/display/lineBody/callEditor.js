//possibly move file to better folder? called by titleBar.js
TS.html.display.lineBody.callEditor = function (itemContent, type, callback) {
  let editorContainer = TS.lib.createNode('div', {
    style: `width: 100%; height: 100%; position: absolute; z-index: 1; display: flex; flex-direction: column;top: 0px;`
  })
  /*
  old style : width: ${TS.refs.display.clientWidth}px; height: ${TS.refs.display.clientHeight}px; position: absolute; z-index: 1; top: ${TS.refs.topNav.clientHeight}px; left: ${TS.refs.secondaryNavBar.clientWidth}px; display: flex; flex-direction: column;
  */
  let exitEditor = TS.lib.createNode('button', {
    innerText: 'Exit Editor',
    onclick: function() {
      callback(aceEditor.getValue())
      editorContainer.remove();
    },
    style: 'float: right; border: none; background-color: #333; color: #FAFAFA;'
  })
  let buttonBar = TS.lib.createNode('div', {
    style: 'background-color: #191919;'
  })
  buttonBar.append(exitEditor)
  let editor = TS.lib.createNode('div', {
    id: 'editor', 
    style: 'height: 100%; width: 100%;'
  })
  editorContainer.append(buttonBar, editor)
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
      if (type == 'js') type = 'javascript'
      aceEditor.getSession().setMode("ace/mode/" + type);
      aceEditor.$blockScrolling = Infinity
      aceEditor.setOptions({
        wrap: true,
        fontSize: "1rem"
      });
      aceEditor.setValue(itemContent);
  }
}
