{
  'use strict'
  let amethyst = "#96c" //use by typing ${amethyst};
  let wisteria = "#C9A0DC"
  let clouds = "#ecf0f1"
  let silver = "#bdc3c7"
  TS.cssTemplates.Theme1 = {
    link: ``,
    btn: `
      button {
        border-radius: .4rem;
        margin: .2rem;
        font-size: 1rem;
      }
      button:hover {
        box-shadow: 0px 0px .1rem .2rem ${clouds} inset;
      }`,
    border1 : `box-shadow: 1px 2px 1px 2px ${silver};
      box-sizing:border-box;`,
    border2: `
      border: 2px solid ${amethyst};
      border-radius:10px;
      box-shadow: 0px 0px 1px 2px ${silver} inset;`,
    border3: ``,
    backgroundTitle: ``,
    titleColor: ``,
    backgroundNav1 : `
      background: ${silver};`,
    backgroundNav2 : `background-color: ${clouds};`,
    backgroundModals : `
      background: ${wisteria};
      border-radius:5px;
      border: 2px solid ${amethyst};`,
    backgroundMain: `
      color:${amethyst};
      background :${clouds};`,
    btnWarn: `
      .btnWarn {
        background-color : red;
      }`,
    btnExit: `
      #exit {
        color:${clouds};
        border: 2px solid ${clouds};
        float:right;
        background-color: ${amethyst};
      }`,
    btnSubmit: `
      .btnSubmit {
        background-color: orange;
      }`,
    btnBase1: `
      #left > * {
        color: ${clouds};
        border: 3px groove ${silver};
        font-size: 1rem;
        background: ${amethyst};
      }
      #left > *:hover {
        background: ${wisteria};
      }
      #left select option{
        max-width: 2rem;
        color: white;
        background-color: rgb(0,0,0);
        border: none;
        font-size: 1rem;
      }
      #left :last-child {
        border-top-right-radius: .7rem;
      }
    `,
    btnBase2: `
      #show {
        background-color: rgba(255,205,200,.6);
      }
      #fold1 {
        background-color: rgba(200,205,255,.6);
      }
      #fold2 {
        background-color: rgba(170,185,255,.8);
      }`,
    btnNav1: `
      .chosen {
        background: linear-gradient(-20deg, rgb(10,10,10), rgb(40,95,95) 40%, rgb(40,40,40));
      }
      .navButton {
        border-top: 0.1rem solid white;
        border-left: 0.1rem solid #add;
        border-right: 0.1rem solid grey;
        border-bottom: 0.1rem solid grey;
        margin: 0.1rem;
        background: ${wisteria};
      }
      .navButton:hover {
        box-shadow: 0px 1px 1px 2px rgb(0,0,20);
        background: ${amethyst};
      }`,
    btnNav2: `
    background-color: ${amethyst};`,
    select: `
      select {
        color: white;
        border: none;
        font-size: 1rem;
        background: linear-gradient(0deg, rgb(30, 0, 0), rgb(60, 10, 5) 80%, rgb(40, 5, 0));
      }
      select option {
        color: white;
        background-color: rgb(0,0,0);
        border: none;
        font-size: 1rem;
      }
      select option:checked {
        color: white;
        background-color: rgb(0,33,0);
      }`
    }
}
