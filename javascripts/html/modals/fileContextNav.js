TS.html.modals.fileContextNav = function(event, ele) {
  let targ = ele
  let loc = [event.clientX, event.clientY], 
  name = ele.innerText,  
  origin = ele.dataset.origin,
  type = ele.classList;
  let div = TS.lib.createNode('div', {
    className: 'contextMenu bgModal',
    style: `left: ${loc[0]-9}px; top: ${loc[1]-9}px;display: inline-block;`
  })
  let style = TS.lib.createNode('style', {
    innerHTML: TS.css.modals.fileContextNav()
  })
  let btns = {
    title: TS.lib.createNode('div', {
      className: 'fileContextTitle',
      innerHTML: `<b>file: "${name}"</b><br><hr>`
    }),
    open: TS.lib.createNode('div', {
      className: 'fileContextOpts',
      innerText: 'open',
      onclick: function() {
        targ.click();
      }
    }),
    move: TS.lib.createNode('div', {
      className: 'fileContextOpts',
      innerText: 'Move/Rename selected file',
      onclick: function() {
        console.log('coming soon')
      }
    }),
    create: TS.lib.createNode('div', {
      className: 'fileContextOpts',
      innerText: 'Create a new file'
    }),
    delete: TS.lib.createNode('div', {
      className: 'fileContextOpts',
      innerText: 'delete',
      onclick: function() {
        let callback = function() {
          console.log(targ)
          //add support for nested files
          // innerHTML vs innerText, check safety
          delete TS.data.local.files[targ.innerHTML]
          TS.events.save()
        }
        document.body.append(TS.html.modals.confirmationDelete(targ.innerHTML, callback));
      }
    })
  }
  div.append(style)
  switch(true) {
    case type.contains('file'): 
      div.append(btns.title, btns.open, btns.move, btns.delete)
      break;
    case type.contains('folder'):
      div.append(btns.title, btns.rename, btns.open, btns.move, btns.delete)
      break;
    case !targ.style["z-index"]: 
      div.append(btns.create)
      break;
    
  }
  let undisplay = function() {
    div.style.display = ''
  }
  setTimeout(function() {
    undisplay()
  }, 100)
  return div;
}
