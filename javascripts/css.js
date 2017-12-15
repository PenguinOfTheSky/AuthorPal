/* global TS */
TS.css = function () {
let theme = TS.data.local.preferences.theme;
if (theme === undefined) {
  TS.data.local.preferences.theme = "default";
  theme = "default";
}
let _ = TS.cssTemplates[theme];
let defaultCSS = TS.cssTemplates["default"]
TS.events.updatePreferences = function () {
  TS.events.save(location.reload());
};
return {
  modal: `
  :host {
    background-color:rgba(150,150,150,.3);
    padding:5px;position: absolute; z-index: 4;top:0%;height:100%; width:100%;
    padding-top: 10%;
  }
  #centerModal {
    text-align:center;
    width:80%;
    margin: 0 auto;
  }
  ${_.backgroundModals}
  ${_.btn}
  ${_.btnExit}
`,
  boxes: {
    menu: function () {
      return ``;
    },
    root: function () {
      return `
      #root {
        height: 100%;
        max-height:100%;
        display: flex;
        flex-direction: column;
        box-sizing:border-box;
        ${_.backgroundMain}
      }`;
    },
    topLeftNav: function () {
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
      ${_.btn}
      ${_.btnSubmit}
      ${_.icon || defaultCSS.icon}
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
        margin-left: .1rem;
      }
      #left > img {
        width: 1.4rem;
        height: 1.4rem;
      }
      #left > * {
        display: inline-block;
        vertical-align: middle;
      }
      #hiddenOptions {
        padding-top:.3rem;
        visibility: hidden;
        position: absolute;
        z-index: 6;
        ${_.backgroundNav1}
      }
      .menuOptions {
        cursor: pointer;
        padding: .2rem;
      }
      #menu:hover #hiddenOptions {
        visibility: visible;
      }
      ${_.btnBase1}`;
    },
    topNavFileButtons: function () {
      return `
      :host {
        display:inline-block;
        ${_.backgroundNav1}
      }
      ${_.btn}
      ${_.btnNav1}
      .navButton > .btnWarn {
        display: none;
      }
      .navButton:hover > .btnWarn {
        display: inline-block;
      }
    `;
    },
    displayLeftNav: function () {
      let str = ``;
      str += `
      ${_.btn}
      :host {
        padding: .15rem;
        ${_.backgroundNav2}
        max-height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        width:20%;
        display:inline-block;
      }
      #left {
        display:inline-block;
        margin-right:.5rem;
      }
      #right {
        display: inline;
      }
      `;
      str += `
      
      ${_.btnBase2 || ''}
      ul {
        padding-left: 1rem;
      }
      ul li {
        cursor: pointer;
      }
      .ul_0 {
        list-style-type:none;
        padding:0;
        margin-left: .2rem;
      }
      ${_.treeNav || ""}
      `;
      return str;
    },
    wholeDisplayContainer: function () {
      let str = `
          display: flex;
          max-width:100%;
          width: 100%;
          max-height:100%;
          flex-grow:1;
        `;
      return str;
    },
    display: function () {
      let str = ``;
      str += `
        :host {
          display: inline-block;
          max-height: 100%;
          overflow-y: scroll;
          flex-grow:1;
          width: 80%;
        }`;
      str += `
      ${_.btn}
      .lineContainer {
        /*add background for margins?*/
        box-sizing:border-box;
      }
      .stringContainer {
      }
      .functionContainer {
        ${_.functionBorder || _.border2}
      }
      ${_.highlight || defaultCSS.highlight}
      .objectContainer {
        ${_.border2}
      }
      .objectContainer > .title > .titleContent {
        text-decoration: underline;
      }
      .editor {
        display: inline-block;
      }
      .editorTooltip {
        position: absolute;
        z-index: 1;
      }
      .title {
        line-height: 1.1rem;
        background: ${_.backgroundTitle || `linear-gradient(-2deg, rgb(120, 110, 110), rgb(160, 205, 205) 80%, rgb(140, 140, 140))`};
        font-weight: bold;
        display: flex;
        padding: 0.2rem;
        ${_.border3}
      }
      .titleContent {
        ${_.titleFont || "color: black"};
        padding:.35rem;
        
      }
      .lineBody {
        margin-left:.5rem;
        min-height:.5rem;
        display: block;
      }
      .textField {
        cursor: text;
        padding: 0.1rem 0.3rem;
        white-space:pre-wrap;
        min-height:.5rem;
        ${_.textField || `
          color: black;
          background-color: rgb(240,245,240);
          `}
      }
      .textField > p {
        margin: 0;
        margin-bottom: .2rem;
        line-height: 1.15;
      }
      .textField ul, .textField ol {
        display:flex;
        flex-direction: column;
        margin: .1rem;
        padding: 0px;
        padding-left: 1rem;
      }
      .unfocusMe {
        background-image: url("icons/iconmonstr-undo-1-240.png");
        background-size: cover;
      }
      .buttonGroup {
        margin-left: .4rem;
        vertical-align: middle;
        display:inline-flex;
      }
      .buttonGroup button, .buttonGroup img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0px;
        margin: auto;
      }
      .buttonGroup button:hover, .buttonGroup > img:hover {
        outline:none;
      }
      .buttonGroup button:first-child {
        border-top-left-radius: .4rem;
        border-bottom-left-radius: .4rem;
      }
      .buttonGroup button:last-child {
        border-top-right-radius: .4rem;
        border-bottom-right-radius: .4rem;
      }
      ${_.titleBar || ''}
      `;
      return str;
    },
    splash: function () {
      return `
      ${_.btn}
      :host {
        box-sizing:border-box;
        width: 100%;
        display: flex;
        max-height:100%;
      }
      #right {
        padding: 1%;
        overflow-y: auto;
        max-height: 100%;
        text-align: center;
        width: 100%;
      }
      hr {
        width: 100%;
      }
      h1,h2,h3,h4 {
        margin: .15rem;
      }
      h1,h2,h3,h4 {
        text-align:center;
      }
      .folder {
      }
      #filesList {
        display: flex;
        flex-wrap: wrap;
        margin: .5rem;
        justify-content: space-around;
      }
      .fileOrFolder img{
        align-self: center;
        position: relative;
      }
      .fileOrFolder span {
        width: 8rem;
        white-space: nowrap;
        height: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: .1rem;
        font-weight: 500;
      }
      .fileOrFolder span:hover {
        width: auto;
        min-width: 8rem;
        background-color: rgb(240,240,240);
        color: black;
        position: absolute;
        bottom: 0%;
        margin: 0 auto;
        z-index: 1;
      }
      .fileOrFolder {
        position: relative;
        width: 8rem;
        height: 3rem;
      }
      .fileOrFolder:hover {
        width: 8rem;
        ${_.hoverable}
      }
      #filesList > div {
        display: flex;
        flex-direction: column;
        margin: .5rem;
      }
      #filesListContainer img{
        width: 1.5rem;
        height: 1.5rem;
      }
      h1 {
        font-size: 1.6rem;
      }
      h2 {
        font-size: 1.3rem;
      }
      ${_.backgroundModals}
      `;
    }
  },
  modals: {
    exportFile: function () {
      return `
      button, input, select {
        font-size:1rem;
      }
      ${_.btn}
      ${TS.css.modal}
      ${_.btnExit}`;
    },
    createFile: function () {
      return `
      button, input, select {
        font-size:1rem;
      }
      ${_.btn}
      ${TS.css.modal}
      ${_.btnExit}
      ${_.btnSubmit}`;
    },
    addLine: function () {
      let str = `
      ${TS.css.modal}
      ${_.btnSubmit}
      select:active, select:hover {
        outline-color: red
      }
      option:active, option:hover {
        color: red
      }`;
      return str;
    },
    confirmationDelete: function () {
      return `
      ${TS.css.modal}
      ${_.btnWarn || ''}
      `;
    },
    preferencesFile: function () {
      return `
      ${TS.css.modal}
      ${_.btnSubmit}`;
    },
    saveFile: function () {
      return `
      ${TS.css.modal}`;
    },
    uploadFile: function () {
      return `${TS.css.modal}
    ${_.btnSubmit}`;
    },
    openFile: function () {
      return `
      ${TS.css.modal}`;
    },
    trash: function() {
      return `${TS.css.modal}
        table, th, td {
         border: 1px solid black;
        }
        table {
          border-collapse: collapse;
        }
        td, th {
          padding: .1rem;
        }
      `
    },
    fileContextNav: function() {
      return `
        .contextMenu {
          position: absolute;
          z-index: 1;
          display: none;
          padding: .5rem;
          ${_.border1}
        }
        
        .contextMenu:hover {
          
          display: inline-block;
        }
        .fileContextTitle {
          cursor: default;
        }
        .fileContextOpts {
          cursor: pointer;
        }
        .fileContextOpts:hover {
          ${_.hoverable || "background-color: blue;"}
        }
        ${_.backgroundModals}
      `
    }

  }
};
};
