TS.html.modals.trash = function() {
  let item = TS.lib.createComponent({
    id: "TS.html.modals.trash",
    css: TS.css.modals.trash(),
    html: `
      <div id='centerModal' class='bgModal'>
        <div><b>Trash</b><button id='exit'>X</button></div><br>
        <div id='list'></div>
      </div>
    `,
    js: function ({box,root}) {
      TS.js.baseModal(box, root);
      let list = TS.lib.createNode('table', {
        innerHTML: `
        <tr><th>Name</th><th>Deleted</th><th>Modified</th><th><button>Restore</button></th><th><button>Delete</button></th></tr>`
      })
      TS.data.local.trash.forEach(ele => {
        ele = ele.master_root
        let line = TS.lib.createNode('tr', {
          className: 'trashLine',
          innerHTML: `<td>${ele.fileName}</td>
            <td>${ele.dateDeleted}</td>
            <td>${ele.dateModified || ''}</td>
            <td><input type='checkbox' id='restore'></td>
            <td><input type='checkbox' id='delete'></td>`
        })
        list.append(line)
      })
      root.querySelector('#list').append(list)
    }
  });
  return item.box;
}
