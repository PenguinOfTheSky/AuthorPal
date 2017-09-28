TS.css = function() {
let theme = TS.data.local.preferences.theme
if (theme == undefined) {
  console.log('theme undefined')
  TS.data.local.preferences.theme = 'default'
  theme = 'default'
}
let _ = TS.cssTemplates[theme];
if (typeof(_) == 'function') _ = _()
TS.events.updatePreferences = function(newTheme) {
  localforage.setItem('Book', JSON.stringify(TS.data.local), function(err){})
  _ = TS.cssTemplates[newTheme];
  if (typeof(_) == 'function') _ = _()
}
return {
  modal: `
    :host {
      background-color:rgba(150,150,150,.3);
      padding:5px;position: fixed; z-index: 4;top:20%;height:100%; width:100%;
    }
    #centerModal {
      text-align:center;
      width:80%;
      margin: 0 auto;
      ${_.backgroundModals}
    }
    ${_.select}
    ${_.btn}
    ${_.btnExit}
  `,
  boxes: {
    root: function() {
      return `
        #root {
          min-height:100%;
          ${_.backgroundMain}
        }`
    },
    topLeftNav: function() {
      return `
        :host {
          padding-top:.3rem;
          width:100%;
          ${_.border1}
          ${_.backgroundNav1}
        }
        :host(:hover) {
          box-shadow: 0px 0px .1rem .2rem rgba(255, 255, 255, .1) inset;
        }
        #topDiv {
          display:block;
          flex-wrap:wrap;
        }
        #collapseNav {
          font-weight:900;
          background-color:rgba(0,0,0,0);font-size:1rem;
          padding:none;
          color:white;
          top:-.3rem;
          position:relative;
          border:none;
          max-height:.9rem;
        }
        #collapseNav:hover {
          box-shadow: 0px 0px .1rem .2rem rgba(100,255,188,.6) inset;
        }
        #left {
          display: inline-block;
          margin-right:.1rem;
        }
        ${_.btnBase1}`
    },
    mainButtons: function() {
      return `
      :host {
        box-sizing: border-box;
        display:inline;
        ${_.backgroundNav1}
        width: 100%;
        clear: left;
      }
      ${_.btn}
      ${_.btnNav1}
      #addColumn {
        border-radius: 5px;
        font-size: 1rem;
        background: linear-gradient(0deg, rgb(0,200,0), rgb(0,255,55) 40%, rgb(40,240,40));
      }
      #addColumn:hover {
          background: linear-gradient(0deg, rgb(0,220,0), rgb(20,255,75) 40%, rgb(60,250,60));
          box-shadow: 0px 1px 1px 2px blue;
      }`
    },
    displayTopUI: function() {
      let str =``
      if (_.alignment == 'top') {
        str += `
        :host {
          ${_.backgroundNav2}
          min-height:1.5rem;
          display:block;
          width:100%;
        }
        #left {
          display:inline-block;
          margin-right:.5rem;
        }
        #right {
          display: inline;
        }
        `}
        else {
          str += `
          :host {
            ${_.backgroundNav2}
            min-height:1.5rem;
            max-width:20%;
            display:inline-block;
          }
          #left {
            display:inline-block;
            margin-right:.5rem;
          }
          #right {
            display: inline;
          }
          `
        }
        str += `
        ${_.btn}
        ${_.btnBase2}
        #left button:first-child {
          border-top-left-radius: .4rem;
          border-bottom-left-radius: .4rem;
        }
        #left button:last-child {
          border-top-right-radius: .4rem;
          border-bottom-right-radius: .4rem;
        }
        .rightButtons {
          ${_.btnNav2}
        }`
        return str;
    },
    wholeDisplayContainer : function() {
      if (_.alignment !='top') {
        return `display:flex;`
      } else return ``;
    },
    display : function() {
      let str = ``;
      if (_.alignment !='top') {
        let maxHeight = document.body.clientHeight - TS.refs.mainNavBar.clientHeight;
        str += `
        :host {
            display: inline-block;
            max-height: ${maxHeight}px;
            overflow-y: scroll;
            flex-grow:1;
          }`
      } else {
        let maxHeight = document.body.clientHeight - TS.refs.mainNavBar.clientHeight //- TS.refs.secondaryNavBar.clientHeight; error, undefined at point of call (find a fix!)
        str += `
        :host {
            max-height: ${maxHeight}px;
            overflow-y: scroll;
          }`
      }
      str += `
        .lineContainer {
          background: linear-gradient(30deg, rgb(0, 0, 0), rgb(33, 155, 55) 40%, rgb(40, 40, 40));
          box-sizing:border-box;
        }
        .stringContainer {
        }
        .objectContainer {
          ${_.border2}
          padding:1px;
        }
        .objectContainer > .title > .titleContent {
          text-decoration: underline;
        }
        .title {
          line-height: 1.1rem;
          background: ${_.backgroundTitle || `linear-gradient(-2deg, rgb(120, 110, 110), rgb(160, 205, 205) 80%, rgb(140, 140, 140))`};
          font-weight: bold;
          padding: .15rem;
          border-radius: .2rem;
        }
        .titleContent {
          color: ${_.titleColor || 'black'};
          margin: auto;
          padding:.5rem;
        }
        .lineBody {
          margin-left:.5rem;
          min-height:.5rem;
          background-color: rgb(230,230,0);
          display: block;
        }
        .textField {
          white-space: pre-wrap;
          color: black;
          cursor: text;
          padding: .1rem;
          background-color: rgb(240,245,240);
          min-height:.5rem;
        }
        .textField > p {
          margin: 0;
          margin-bottom: -1rem;
        }
        .textField ul, .textField ol {
          display:flex;
          flex-direction: column;
          margin: .1rem;
          padding: 0px;
          padding-left: 1rem;
          margin-bottom: -1rem;
        }
        .textField:focus {
          background-color: rgb(255,255,255);
          box-shadow:0px 0px 1px 1px black ;
        }
        .addLine {
          background-color: #5cb85c;
          border-color: #4cae4c;
        }
        .addLine:hover {
          background-color: #449d44;
          border-color: #398439;
        }
        .deleteLine {
          background-color: #d9534f;
          border-color: #d43f3a;
        }
        .deleteLine:hover {
          background-color: #c9302c;
          border-color: #ac2925;
        }
        .focusMe {
          background-color: #337ab7;
          border-color: #2e6da4;
        }
        .focusMe:hover {
          background-color: #286090;
          border-color: #204d74;
        }
        .editHTML {
          background-color: #5bc0de;
          border-color: #46b8da;
        }
        .editHTML:hover {
          background-color: #31b0d5;
          border-color: #269abc;
        }
        .isRaw {
          box-shadow: 0px 0px 1px 3px rgba(222, 0, 222, .5) inset;
        }
        .buttonGroup {
          margin-left: .4rem;
          line-height: 1.1rem;
          vertical-align: middle;
          display:inline-flex;
        }
        .buttonGroup button {
          font-weight: bold;
          color: white;
          padding: .15rem;
          margin: auto;
        }
        .buttonGroup button:hover {
          outline:none;
        }
        .buttonGroup button:first-child {
          border-top-left-radius: .4rem;
          border-bottom-left-radius: .4rem;
        }
        .buttonGroup button:last-child {
          border-top-right-radius: .4rem;
          border-bottom-right-radius: .4rem;
        }`
      return str;
    },
    splash: function() {
      return `
        ${_.link}
        :host {
          padding: 5%;
        }
        h1 {
          text-align:center;
        }`
    }
  },
  modals : {
    exportFile: function() {
      return `
        button, input, select {
          font-size:1rem;
        }
        ${_.btn}
        ${TS.css.modal}
        ${_.btnExit}`
    },
    createFile : function() {
      return `
        button, input, select {
          font-size:1rem;
        }
        ${_.btn}
        ${TS.css.modal}
        ${_.btnExit}
        ${_.btnSubmit}`
    },
    addLine : function() {
      let str =  `
        ${TS.css.modal}
        ${_.btnSubmit}
        select:active, select:hover {
          outline-color: red
        }
        option:active, option:hover {
          color: red
        }`
      return str
    },
    confirmationDelete : function() {
      return `
        ${TS.css.modal}
        ${_.btnWarn}
        `
    },
    preferencesFile : function() {
      return `
        ${TS.css.modal}
        ${_.btnSubmit}`
    },
    saveFile : function() {
      return `
        ${TS.css.modal}`
    },
    uploadFile : function() {
      return `${TS.css.modal}
      ${_.btnSubmit}`
    },
    openFile: function() {
      return `
        ${TS.css.modal}`
    }

  }
}
}
