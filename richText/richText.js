/*<!doctype html>
<html>
<head>
<title>Rich Text Editor</title>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">*/
let x = document.currentScript.innerText || "richText"
 window[x] = function(opts) {
   //requires font-awesome 4
  //example: richText({target: '#textarea1' or a node})
  let {target} = opts
  var oDoc, sDefTxt;

  x.initDoc = function() {
    oDoc = document.getElementById("textBox");
    sDefTxt = oDoc.innerHTML;
    if (document.querySelector('#switchBox').checked) { setDocMode(true); }
  }

  x.formatDoc = function(sCmd, sValue) {
    if (validateMode()) { document.execCommand(sCmd, false, sValue); oDoc.focus(); }
  }

  x.validateMode = function() {
    if (!document.querySelector('#switchBox').checked) { return true ; }
    alert("Uncheck \"Show HTML\".");
    oDoc.focus();
    return false;
  }

  x.setDocMode = function(bToSource) {
    var oContent;
    if (bToSource) {
      oContent = document.createTextNode(oDoc.innerHTML);
      oDoc.innerHTML = "";
      var oPre = document.createElement("pre");
      oDoc.contentEditable = false;
      oPre.id = "sourceText";
      oPre.contentEditable = true;
      oPre.appendChild(oContent);
      oDoc.appendChild(oPre);
    } else {
      if (document.all) {
        oDoc.innerHTML = oDoc.innerText;
      } else {
        oContent = document.createRange();
        oContent.selectNodeContents(oDoc.firstChild);
        oDoc.innerHTML = oContent.toString();
      }
      oDoc.contentEditable = true;
    }
    oDoc.focus();
  }

  x.printDoc = function() {
    if (!validateMode()) { return; }
    var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
    oPrntWin.document.open();
    oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
    oPrntWin.document.close();
  }
  //populate div
  if (typeof(target) == 'string') {
    target = document.querySelector(target)
  }
  console.log(target)
  target.innerHTML = `
  <style type="text/css">
  .intLink { cursor: pointer; }
  button.intLink {
    border: 0;
    background: none;
    margin: 0;
    padding: 0;
  }
  #toolBar1 select { font-size:10px; }
  #textBox {
    width: 540px;
    height: 200px;
    border: 1px #000000 solid;
    padding: 12px;
    overflow: scroll;
  }
  #textBox #sourceText {
    padding: 0;
    margin: 0;
    min-width: 498px;
    min-height: 200px;
  }
  #editMode label { cursor: pointer; }
  </style>
  </head>
  <body onload="initDoc();">
  <input type="hidden" name="myDoc">
  <div id="toolBar1">
  <select onchange="${x}.formatDoc('formatblock',this[this.selectedIndex].value);this.selectedIndex=0;">
  <option selected>- formatting -</option>
  <option value="h1">Title 1 &lt;h1&gt;</option>
  <option value="h2">Title 2 &lt;h2&gt;</option>
  <option value="h3">Title 3 &lt;h3&gt;</option>
  <option value="h4">Title 4 &lt;h4&gt;</option>
  <option value="h5">Title 5 &lt;h5&gt;</option>
  <option value="h6">Subtitle &lt;h6&gt;</option>
  <option value="p">Paragraph &lt;p&gt;</option>
  <option value="pre">Preformatted &lt;pre&gt;</option>
  </select>
  <select onchange="${x}.formatDoc('fontname',this[this.selectedIndex].value);this.selectedIndex=0;">
  <option class="heading" selected>- font -</option>
  <option>Arial</option>
  <option>Arial Black</option>
  <option>Courier New</option>
  <option>Times New Roman</option>
  </select>
  <select onchange="${x}.formatDoc('fontsize',this[this.selectedIndex].value);this.selectedIndex=0;">
  <option class="heading" selected>- size -</option>
  <option value="1">Very small</option>
  <option value="2">A bit small</option>
  <option value="3">Normal</option>
  <option value="4">Medium-large</option>
  <option value="5">Big</option>
  <option value="6">Very big</option>
  <option value="7">Maximum</option>
  </select>
  <select onchange="${x}.formatDoc('forecolor',this[this.selectedIndex].value);this.selectedIndex=0;">
  <option class="heading" selected>- color -</option>
  <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
  <option value="black">Black</option>
  </select>
  <select onchange="${x}.formatDoc('backcolor',this[this.selectedIndex].value);this.selectedIndex=0;">
  <option class="heading" selected>- background -</option>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="black">Black</option>
  </select>
  </div>
  <div id="toolBar2">
  <button class="intLink fa fa-print" title="Print" onclick="${x}.printDoc();"></button>
  <button class="intLink fa fa-undo"
  title="Undo" onclick="${x}.formatDoc('undo');"></button>
  <button class="intLink fa fa-repeat" title="Redo" onclick="${x}.formatDoc('redo');"></button>
  <button class="intLink fa fa-fast-backward" title="Remove formatting"
    onclick="${x}.formatDoc('removeFormat');"></button>
  <button class="intLink fa fa-bold" title="Bold" onclick="${x}.formatDoc('bold');" ></button>
  <button class="intLink fa fa-italic" title="Italic" onclick="${x}.formatDoc('italic');"></button>
  <button class="intLink fa fa-underline" title="Underline" onclick="${x}.formatDoc('underline');"></button>
  <button class="intLink fa fa-align-left" title="Left align" onclick="${x}.formatDoc('justifyleft');"></button>
  <button class="intLink fa fa-align-center" title="Center align" onclick="${x}.formatDoc('justifycenter');"></button>
  <button class="intLink fa fa-align-right" title="Right align" onclick="${x}.formatDoc('justifyright');"></button>
  <button class="intLink fa fa-list-ol" title="Numbered list" onclick="${x}.formatDoc('insertorderedlist');"></button>
  <button class="intLink fa fa-list-ul" title="Dotted list" onclick="${x}.formatDoc('insertunorderedlist');"></button>
  <button class="intLink fa fa-quote-left" title="Quote" onclick="${x}.formatDoc('formatblock','blockquote');"></button>
  <button class="intLink fa fa-outdent" title="Delete indentation" onclick="${x}.formatDoc('outdent');"></button>
  <button class="intLink fa fa-indent" title="Add indentation" onclick="${x}.formatDoc('indent');" > </button>
  <button class="intLink fa fa-link" title="Hyperlink" onclick="${x}.var sLnk=prompt('Write the URL here','http:\/\/');if(sLnk&&sLnk!=''&&sLnk!='http://'){formatDoc('createlink',sLnk)}"></button>
  <button class="intLink fa fa-cut" title="Cut" onclick="${x}.formatDoc('cut');"></button>
  <button class="intLink fa fa-copy" title="Copy" onclick="${x}.formatDoc('copy');"></button>
  <button class="intLink fa fa-clipboard" title="Paste" onclick="${x}.formatDoc('paste');"></button>
  </div>
  <div id="textBox" contenteditable="true"><p>Lorem ipsum</p></div>
  <p id="editMode" style='display: none;'><input type="checkbox" name="switchMode" id="switchBox" onchange="${x}.setDocMode(this.checked);" /> <label for="switchBox">Show HTML</label></p>
  `
}
