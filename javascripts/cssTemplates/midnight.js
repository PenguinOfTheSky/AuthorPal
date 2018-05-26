/* global TS */
{
  "use strict";
  let font = `
    color: rgb(240,240,240);
  `;
  let hover = `box-shadow: 0px 0px .1rem .2rem rgba(255,210,75,.6);`;
  TS.cssTemplates.midnight = {
    hoverable: `
      ${hover}
    `,
    btn: `
      a {
        cursor: pointer;
        color: #3ad2f5;
      }
      button, input, select {
        font-size:1rem;
      }
      button, input, select, .btn {
        margin: .13rem;
        border: none;
        border-radius: .4rem;
        ${font}
        cursor: pointer;
        background-color: #000;
        box-shadow: .03rem .04rem .05rem .1rem rgba(255,255,255,.22);
      }
      input[type=radio] {
        transform: scale(1.5);
        filter: contrast(5);
      }
      button:hover, select:hover, .btn:hover, .hoverable:hover {
        ${hover}
      }
      .icon {
        fill: white;
        border-radius:25%;
        padding: .1rem;
        cursor:pointer;
      }
      .icon.fa {
        font-size:1.3rem;
      }
      .icon-medium.fa {
        font-size: 2rem;
      }
      .icon-large.fa {
        font-size: 4rem;
      }
      .btnSubmit {
        color: green;
      }
      .btnWarn {
        color : rgb(230,0,0);
      }
      `,
    border1: `box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, .5);
      box-sizing:border-box;`,
    border2: `
      border-left: .15rem solid rgba(250,250,250,.7);
      border-radius:.1rem;`,
    border3: `
      border-bottom-left-radius: 0.5rem;
    `,
    functionBorder: `
      margin: .4rem 0px;
      box-shadow: 0px 0px .05rem .1rem orange;
    `,
    backgroundTitle: `#000`,
    titleFont: `
      ${font}
    `,
    backgroundNav1: `
      color: rgb(255,255,255);
      background-color: #333;`,
    backgroundNav2: `background-color: #111;`,
    backgroundModals: `
      .bgModal {
        padding: 1rem;
        border-radius: 1rem;
        background-color : #171717;
      }
      `,
    backgroundMain: `
      ${font}
      background-color: #222`,
    btnExit: `
      #exit {
        float:right;
        color : rgb(230,0,0);
      }`,
    btnBase1: `
      .menuOptions:hover {
        ${hover}
      }
      #menu {
        cursor: default;
      }
      #left > * {
        border: none;
        ${font}
        font-size: 1rem;
        border-radius: 25%;
        padding: .25rem;
      }
      #left > *:hover {
        ${hover}
      }
    `,
    btnBase2: ``,
    btnNav1: `
      .chosen {
        background: linear-gradient(-20deg, rgb(10,10,10), rgb(40,95,95) 40%, rgb(40,40,40));
      }
      .navButton {
        color: white;
        background-color: #040404;
        border-radius: 20% 20% 1% 1%;
        margin: 0.1rem;
      }
      .navButton:hover {
        box-shadow: 0px 1px 1px 2px rgb(0,0,20);
        background: linear-gradient(0deg, rgb(0, 0, 0), rgb(4, 154, 154) 80%, rgb(40, 40, 40));
      }`,
    treeNav: `
      li:hover {
        ${hover}
      }
    `,
    textField: `
      ${font}
      background-color: #111;
    `,
  };
}
