/* global TS */
{
  "use strict";
  let font = `
    color: rgb(240,240,240);
  `;
  let hover = `background-color: rgba(0,30,155,.7);`;
  TS.cssTemplates.dark = {
    link: `
      a {
        cursor: pointer;
        color: blue;
      }
    `,
    alignment: "left",
    btn: `
      button, input, select {
        font-size:1rem;
      }
      button, .btn, select {
        border: none;
        border-radius: .4rem;
        ${font}
        font-size: 1rem;
        padding: 0.3rem 0.6rem;
        background-color: #444;
      }
      button:hover, .btn:hover {
        ${hover}
      }
      .icon {
        fill: white;
        border-radius:25%;
        padding: .1rem;
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
    border1: `
      border-bottom: 1px solid #888;
      box-sizing:border-box;`,
    border2: `padding:.6rem;`,
    border3: `
      border-bottom-left-radius: 0.5rem;
      border-bottom: 1px solid #888;`,
    backgroundTitle: `#444`,
    titleBar: `
      .focusMe {
      }
    `,
    titleFont: `
      ${font}
    `,
    backgroundNav1: `
      color: rgb(255,255,255);
      background-color: #111;`,
    backgroundNav2: `
      padding: .55rem;
      background-color: #111;`,
    backgroundModals: `
      .bgModal {
        padding: 1rem;
        border-radius: 1rem;
        background : #222;
      }
      `,
    backgroundMain: `
      ${font}
      background-color: #222`,
    btnExit: `
      #exit {
        border: 2px solid black;float:right;
        background-color : rgb(230,0,0);
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
        padding: .25rem;
      }
      #left > *:hover {
        ${hover}
      }
    `,
    btnBase2: `
      .baseButtons2 {
        background: #444;
      }
      .baseButtons2:hover {
        ${hover}
      }
      `,
    btnNav1: `
      .chosen {
        background-color: purple;
        font-weight: 500;
      }
      .navButton {
        color: white;
      }
      .navButton:hover {
      }`,
    treeNav: `
      li {
        ${font}
      }
      li:hover {
        ${hover}
      }
    `,
    textField: `
      ${font}
      background-color: #666;
    `
  };
}
