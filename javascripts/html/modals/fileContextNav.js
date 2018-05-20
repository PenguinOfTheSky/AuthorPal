TS.html.modals.fileContextNav = function(event, obj) {
  let ele = obj.ref
  let targ = ele
  let loc = [event.clientX, event.clientY],
  name = obj.name,
  origin = obj.files,
  type = ele.classList;
  let div = TS.lib.createNode('div', {
    className: 'contextMenu bgModal',
    style: `left: ${loc[0]-9}px; top: ${loc[1]-9}px;display: inline-block;`,
    onclick: function() {
      this.remove()
    }
  })
  let style = TS.lib.createNode('style', {
    innerHTML: TS.css.modals.fileContextNav()
  })
  let btns = {
    title: TS.lib.createNode('div', {
      className: 'fileContextTitle',
      innerHTML: `<b>file: "${name}"</b><br><hr>`
    }),
    export: TS.lib.createNode('div', {
      className: 'fileContextOpts',
      innerText: 'export',
      onclick: function() {
        TS.data.chosenFile = obj.files[obj.name]
        TS.data.chosenFileTitle = obj.name
        TS.refs.container.append(TS.html.modals["exportFile"]())
      }
    }),
    download: TS.lib.createNode('div', {
      className: 'fileContextOpts',
      innerText: 'download backup of file',
      title: "can be sent to someone else's authorpal",
      onclick: function() {
        TS.data.chosenFile = obj.files[obj.name]
        TS.data.chosenFileTitle = obj.name
        TS.refs.container.append(TS.html.modals["downloadFile"]())
      }
    }),
    copy: TS.lib.createNode('div', {
      className: 'fileContextOpts',
      innerText: 'Copy',
      onclick: function() {
        TS.data.local.copiedFile = {}
        TS.data.local.copiedFile[obj.name] = obj.files[obj.name]
        TS.events.save()
      }
    }),
    cut: TS.lib.createNode('div', {
      className: 'fileContextOpts',
      innerText: 'Cut',
      onclick: function() {
        TS.data.local.copiedFile = {}
        TS.data.local.copiedFile[obj.name] = obj.files[obj.name]
        delete obj.files[obj.name]
        TS.events.save()
      }
    })
  }
  div.append(style)
  switch(true) {
    case type.contains('file'):
      div.append(btns.title, btns.copy, btns.cut, btns.export, btns.download)
      break;
    case type.contains('folder'):
      div.append(btns.title, btns.copy, btns.cut, btns.download)
      break;
    default:
      console.log('test')
  }
  let undisplay = function() {
    div.style.display = ''
  }
  setTimeout(function() {
    undisplay()
  }, 100)
  return div;
}
