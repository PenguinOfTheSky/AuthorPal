TS.html.display.lineBody.callEditor = function (itemContent, type, parent, callback) {
  document.body.append(TS.lib.createNode('div', {
    id: 'editor',
    style: `width: ${parent.clientWidth}px; height: ${parent.clientHeight}px; position: absolute; z-index: 1; top: ${parent.offsetHeight}px; left: ${parent.offsetTop}px`
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
      aceEditor.$blockScrolling = Infinity
      aceEditor.setOptions({
        wrap: true,
        fontSize: "1rem"
      });
      aceEditor.setValue(itemContent);
  }
  let exitEditor = TS.lib.createNode('button', {
    innerText: 'Exit Editor',
    className: 'baseButtons2',
    onclick: function() {
      callback(aceEditor.getValue())
      document.querySelector('#editor').remove();
      this.remove()
    }
  })
  TS.refs.secondaryNavBar.shadowRoot.querySelector('#left').append(exitEditor)
}
