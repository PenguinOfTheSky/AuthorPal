//possibly move file to better folder? called by titleBar.js
TS.html.display.lineBody.callEditor = function (itemContent, type, callback) {
  let editorContainer = TS.lib.createNode('div', {
    id: "TS.html.display.lineBody.callEditor",
    style: `width: ${TS.refs.display.offsetWidth}px; height: ${TS.refs.display.clientHeight}px;max-height: ${TS.refs.display.clientHeight}px; position: absolute; z-index: 1;right: 0px; bottom: 0px;background-color:#111; font-size:1rem;`
  })
  let exitEditor = TS.lib.createNode('div', {
    style: 'min-height: 1.6rem;'
  })
  let exitEditor_button = TS.lib.createNode('button', {
    innerText: 'Exit Editor',
    onclick: function() {
      callback(aceEditor.getValue())
      editorContainer.remove();
    },
    style: 'float: right; border: none; background-color: #333; color: #FAFAFA; font-size: 1rem;'
  })
  exitEditor.append(exitEditor_button)
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
      let iframe = D.make('iframe', {
        style: 'width:100%;height:100%;',
        src: './richText/richText.html'
      })
      D.find('#editor').append(iframe)
      //add safety script deleter here?
      let set = function() {
        setTimeout(function() {
          if (iframe.contentDocument.querySelector('#textBox')) iframe.contentDocument.querySelector('#textBox').innerHTML = itemContent
          else set();
        }, 20)
      }
      set()
      aceEditor = {
        getValue: function() {
          let text = iframe.contentDocument.querySelector('#textBox').innerHTML
          iframe.remove()

          return text;
        },
        setValue: function() {// code insertion todo?
        }
      }
      /*  $('#editor').summernote();
        $('#editor').summernote({
          focus: true
        });
        document.querySelector('.note-editor').style = `
          width: 100%; height: 100%;
        `
        $('#editor').summernote('code', itemContent);
        aceEditor = {
          getValue: function() {
            let text = $('#editor').summernote('code')
            $('#editor').summernote('destroy');

            return text;
          },
          setValue: function() {// code insertion todo?
          }
        } */
      break;
    case 'markdown':
      let textfield = TS.lib.createNode('textarea', {
        value: itemContent,
        id: 'markdownText',
        style: 'color: white; background-color: #111; font-size: 1rem; width: 100%; height: 100%;'
      })
      editor.append(textfield)
      break;
    default:
      aceEditor = ace.edit("editor");
      aceEditor.setTheme("ace/theme/monokai");
      if (type == 'js') type = 'javascript'
      aceEditor.getSession().setMode("ace/mode/" + type);
      aceEditor.$blockScrolling = Infinity
      aceEditor.setOptions({
        wrap: true,
        fontSize: "1rem",
        tabSize: 2
      });
      aceEditor.setValue(itemContent);
  }
  if (type == 'markdown') {
    aceEditor = {
      getValue: function() {
        return editor.querySelector('#markdownText').value
      }
    }
    editor.style.width = '48%'
    editor.style.display = 'inline-block'
    let showMd = TS.lib.createNode('div', {
      style: 'color: #FCFCFC; font-size:1rem; display:inline-block;margin-left:2%;vertical-align:top;overflow: auto; max-width:50%;height: 90%;max-height:93%;',
      innerHTML: marked(itemContent)
    })
    editorContainer.append(showMd)
    editor.onkeyup = function(event) {
      clearTimeout(TS.events.updateMarkdown)
      TS.events.updateMarkdown = setTimeout(function() {
        showMd.innerHTML = marked(document.querySelector('#markdownText').value)
      }, 300)
    }
  }
}
