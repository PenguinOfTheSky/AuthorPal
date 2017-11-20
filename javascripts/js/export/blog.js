TS.js.export['blog'] = function (file, preview, viewFrame) {
  if (preview || !preview) {
    let comments = ``
    let script = document.createElement('script')
    try {
      script.innerHTML = file['#advanced']['#script']
    } catch (err){
      console.log("no script found at #advanced['#script'], continuing.")
    }
    
    let dig = function(obj, depth, parent) {
      
    }
    dig(TS.data.chosenFile, 0)
    let commentsNode = document.createComment(comments)
    if (!preview) {
      return {
        data: "/*" + comments + '*/\n' + "" + script.innerHTML + "",
        type: 'js'
      }
    }
    else if (preview) {
      viewFrame.contentDocument.open()
      viewFrame.contentDocument.write('<!DOCTYPE html>')
      viewFrame.contentDocument.close();
      viewFrame.contentDocument.body.append(commentsNode, script)
    }
  }
}
