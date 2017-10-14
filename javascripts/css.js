/* global TS */
TS.css = function () {
  let theme = TS.data.local.preferences.theme;
  if (theme === undefined) {
    TS.data.local.preferences.theme = "default";
    theme = "default";
  }
  let _ = TS.cssTemplates[theme];
  TS.data.alignment = _.alignment;
  if (typeof (_) === "function") _ = _();
  TS.events.updatePreferences = function () {
    TS.events.save(location.reload());
  };
  return {
    modal: `
    :host {
      background-color:rgba(150,150,150,.3);
      padding:5px;position: fixed; z-index: 4;top:0%;height:100%; width:100%;
      padding-top: 25%;
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
      menu: function () {
        return ``;
      },
      root: function () {
        return `
        #root {
          min-height:100%;
          display: flex;
          flex-direction: column;
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
        #left > * {
          display: inline-block;
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
      mainButtons: function () {
        return `
      :host {
        display:inline-block;
        ${_.backgroundNav1}
      }
      ${_.btn}
      ${_.btnNav1}
      `;
      },
      displayLeftNav: function () {
        let str = ``;
        if (_.alignment === "top") {
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
        `;
        } else {
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
          `;
        }
        str += `
        ${_.btn}
        ${_.btnBase2}
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
            flex-grow:1;
          `;
        return str;
      },
      display: function () {
        let str = ``;
        let maxHeight = document.body.clientHeight - TS.refs.mainNavBar.clientHeight;
        str += `
          :host {
            display: inline-block;
            max-height: ${maxHeight}px;
            overflow-y: scroll;
            flex-grow:1;
          }`;
        str += `
        ${_.btn}
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
          padding: .25rem;
          border-radius: .2rem;
        }
        .titleContent {
          color: ${_.titleColor || "black"};
          margin: auto;
          padding:.5rem;
        }
        .lineBody {
          margin-left:.5rem;
          min-height:.5rem;
          display: block;
        }
        .textField {
          white-space: pre-wrap;
          cursor: text;
          padding: .1rem;
          padding-left: .2rem;
          padding-right: .2rem;
          min-height:.5rem;
          ${_.textField || `
            color: black;
            background-color: rgb(240,245,240);
            `}
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
          background-image: url("icons/iconmonstr-crosshair-8-240.png");
          background-size: cover;
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
          vertical-align: middle;
          display:inline-block;
        }
        .buttonGroup button {
          border-radius: 0px;
          color: white;
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
        }`;
        return str;
      },
      splash: function () {
        return `
        ${_.link}
        :host {
          box-sizing:border-box;
          padding: 1%;
        }
        hr {
          width: 100%;
        }
        h1,h2 {
          text-align:center;
          margin: .15rem;
        }
        h1 {
          font-size: 1.6rem;
        }
        h2 {
          font-size: 1.3rem;
        }
        @media screen and (min-width: 550px) {
          #filesList {
            list-style-position: inside;
            column-count: 3;
          }
        }
        #filesList li:hover{
          cursor: pointer;
          text-decoration: underline;
        }`;
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
        ${_.btnWarn}
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
      }

    }
  };
};
