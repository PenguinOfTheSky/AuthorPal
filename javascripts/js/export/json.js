TS.js.export['json'] = function (fileOrig, preview, viewFrame) {
  //can't recall if already cloned so...
  let file = JSON.parse(JSON.stringify(fileOrig))
  delete file.master_root
  if (!preview) {
    viewFrame.style.display = 'none'
  }
  if (preview || !preview) {
    let root = document.createDocumentFragment()
    viewFrame.contentDocument.open()
    viewFrame.contentDocument.write('<!DOCTYPE html>')
    viewFrame.contentDocument.close();
    let textarea = Object.assign(document.createElement('textarea'), {
      value: JSON.stringify(file, 0, 2),
      style: `width: 100%;height:93vh;`
    })
    viewFrame.contentDocument.body.append(textarea)
    if (!preview) {
      return {
        data: JSON.stringify(file, 0, 2),
        type: 'json'
      }
    } else if (preview) {
    }
  }
}
