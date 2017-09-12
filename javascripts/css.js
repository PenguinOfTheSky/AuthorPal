Book.css = function() {
  let preferences = Book.data.local.preferences
  
  console.log(preferences)
  preferences.color = preferences.color || 'dark'
  preferences.alignment = preferences.alignment || 'top'
  let schema = {
    light: {
      textColor1: `rgb(5,5,5)`,
      background1: `linear-gradient(0deg, rgb(255,255,255), rgb(255,55,55) 40%, rgb(250,40,40))`
    },
    dark: {
      textColor1: `rgb(253,255,255)`,
      background1: `linear-gradient(0deg, rgb(0,0,0), rgb(0,55,55) 40%, rgb(40,40,40))`
    }
  }
  return {
    glass : `
      box-sizing:border-box;
      background:linear-gradient(0deg, rgb(0, 0, 0), rgb(0, 55, 55) 40%, rgb(40, 40, 40));
      box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, .5);
      border: 1px solid black;
    `,
    air: `
      background-color: rgba(245, 250, 255, .1);
      box-shadow: 1px 2px 2px 3px rgba(50, 140, 195, .1) inset;
      border: 1px solid rgb(155,160,170);
    `,
    black : `
      color: ${schema[preferences.color].textColor1};
      background: ${schema[preferences.color].background1};;
    `,
    gold : `
      background: linear-gradient(0deg, #efd100, #e2a233 38%, #f0c328 60%, #fff1a3 86%, #ffe13e 100%);
    `,
    green: `
      background: linear-gradient(0deg, rgb(0,200,0), rgb(0,255,55) 40%, rgb(40,240,40));
    `,
    body: function() { //this doesn't appear to be used anywhere.
      return `
        #root {
          background:blue;
        }
      `
    },
    topLeftNav: function() {
      let str = `
        :host {
          box-sizing:border-box;
          background-color:#111;
          padding-top:.3rem;
          box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, .5);
          border: 1px solid black;
          width:100%;
          position: fixed;
          background:linear-gradient(0deg, rgb(0, 0, 0), rgb(0, 55, 55) 40%, rgb(40, 40, 40));
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
        #left :last-child {
          border-top-right-radius: .7rem;
        }
        #left select option{
          max-width: 2rem;
          color: white;
          background-color: rgb(0,0,0);
          border: none;
          font-size: 1rem;
        }
        #LyceliaButton {
          font-family:cursive;
          font-size:1rem;
          text-shadow:1px 1px white;
        }
        #LyceliaButton a {
          text-decoration: none;
          color: white;
        }
        #left > * {
          color: white;
          border: none;
          font-size: 1rem;
          background: linear-gradient(0deg, rgb(30, 0, 0), rgb(60, 10, 5) 80%, rgb(40, 5, 0));
        }
        #left > *:hover {
          background: linear-gradient(0deg, rgb(0, 0, 0), rgb(4, 154, 154) 80%, rgb(40, 40, 40));
        }
      `
      return str
    },
    mainButtons: function() {
      let str = `
      :host {
        box-sizing: border-box;
        display:inline;
        background-color:#111;
        width: 100%;
        clear: left;
      }
      .navButton {
        border-top: 0.1rem solid white;
        border-left: 0.1rem solid #add;
        border-right: 0.1rem solid grey;
        border-bottom: 0.1rem solid grey;
        font-size: 1rem;
        margin: 0.2rem;
        color: rgb(253,255,255);
        background: linear-gradient(0deg, rgb(0,0,0), rgb(0,55,55) 40%, rgb(40,40,40));
      }
      .navButton:hover {
        box-shadow: 0px 1px 1px 2px rgb(0,0,20);
        background: linear-gradient(0deg, rgb(0, 0, 0), rgb(4, 154, 154) 80%, rgb(40, 40, 40));
      }
      .chosen {
        background: linear-gradient(-20deg, rgb(10,10,10), rgb(40,95,95) 40%, rgb(40,40,40));
      }
      #addColumn {
        border-radius: 5px;
        font-size: 1rem;
        ${Book.css.green};
      }
      #addColumn:hover {
          background: linear-gradient(0deg, rgb(0,220,0), rgb(20,255,75) 40%, rgb(60,250,60));
          box-shadow: 0px 1px 1px 2px blue;
      }
      `
      return str
    },
    displayUI: `
        :host {
          background-color: blue;
        }
        #baseButtonsDiv {
          display:inline-flex;
          margin-right:.5rem;
        }
        #baseButtonsDiv button:first-child {
          border-top-left-radius: .4rem;
          border-bottom-left-radius: .4rem;
        }
        #baseButtonsDiv button:last-child {
          border-top-right-radius: .4rem;
          border-bottom-right-radius: .4rem;
        }
        button {
          font-size: 1rem;
          box-shadow: 0px 1px 1px 2px rgb(20, 20, 20, .5);
          margin:0px;
        }
        button:hover {
          box-shadow: 0px 0px .1rem .2rem rgba(255,185,0,.8) inset;
        }
        .rightButtons {
          background-color: rgba(20,255,20,.5);
        }`,
    display : function() {
      let str = `
        .lineContainer {
          background: linear-gradient(0deg, rgb(0, 0, 0), rgb(0, 55, 55) 40%, rgb(40, 40, 40));
          box-sizing:border-box;
        }
        .stringContainer {
        }
        .objectContainer {
            border: 2px solid orange;
            border-radius:10px;
            box-shadow: 0px 0px 1px 2px black inset;
            padding:1px;
        }
        .objectContainer > .title > .titleContent {
          text-decoration: underline;
        }
        .title {
          line-height: 1.1rem;
          background: linear-gradient(-2deg, rgb(120, 110, 110), rgb(160, 205, 205) 80%, rgb(140, 140, 140));
          font-weight: bold;
          padding: .15rem;
          border-radius: .2rem;
        }
        .lineBody {
          margin-left:.5rem;
          min-height:.5rem;
          background-color: rgb(230,230,0);
          display: block;
        }
        .textField {
          color: black;
          cursor: text;
          background-color: rgb(240,245,240);
          min-height:.5rem;
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
        }
        `
      return str
    },
    add : function() {
      let str =  `
        button, input, select {
          font-size:1rem;
        }
        :host {
          color: rgb(253,255,255);
          background: linear-gradient(0deg, rgb(0,0,0), rgb(0,55,55) 40%, rgb(40,40,40));
          padding:5px;
          position: fixed;
          z-index: 5;
          top:10%;
          min-height:20%;
          width:80%;
          left:0;
          right:0;
          margin: 0 auto;
        }
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
        :host {
          text-align:center;
        }
        input {
          border-radius: .4rem;
          margin: .2rem;
          font-size: 1rem;
          color: white;
        }
        input:hover {
          box-shadow: 0px 0px .1rem .2rem rgba(235,255,255,.5) inset;
        }
        h2 {

        }
        #yes {
          background-color : red;
        }
        #cancel {
          background-color: rgb(0,50,255);
        }
      `
    }
  }
}
