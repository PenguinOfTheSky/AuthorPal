/* global TS */
TS.cssTemplates.default = {
  hoverable: `
    box-shadow: 0px 0px .1rem .2rem rgba(0,30,155,.7);
  `,
  icon: `
    .icon {
    }
  `,
  link: `
      a {
        cursor: pointer;
        color: blue;
      }
    `,
  btn: `
    button, input, select {
      font-size:1rem;
    }
      input[type=button], button {
        border-radius: .4rem;
        margin: .2rem;
        background-color: gold;
      }
      button:hover, .btn:hover, .hoverable:hover, select:hover {
        box-shadow: 0px 0px .1rem .2rem rgba(0,30,155,.7);
      }`,
  border1: `box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, .5);
      box-sizing:border-box;`,
  border2: `
      border: 2px solid orange;
      border-radius:10px;
      box-shadow: 0px 0px 1px 2px black inset;`,
  border3: ``,
  backgroundTitle: ``,
  titleFont: ``,
  backgroundNav1: `
      color: rgb(255,255,255);
      background: linear-gradient(0deg, rgb(22,0,0), rgb(130,10,10) 40%, rgb(22,0,0));`,
  backgroundNav2: `background-color: #DFD;`,
  backgroundModals: `
      background: linear-gradient(0deg, rgb(10,120,0), rgb(0,145,55) 40%, rgb(20,110,40));`,
  backgroundMain: `
      color: rgb(253,255,255);
      background: linear-gradient(0deg, rgb(0,0,0), rgb(0,55,55) 40%, rgb(40,40,40));`,
  btnWarn: `
      .btnWarn {
        background-color : red;
      }`,
  btnExit: `
      #exit {
        border: 2px solid black;float:right;
        background-color: red;
      }`,
  btnSubmit: `
      .btnSubmit {
        background-color: orange;
      }`,
  btnBase1: `
      #left > * {
        color: white;
        border: none;
        font-size: 1rem;
        background: linear-gradient(0deg, rgb(50, 50, 50), rgb(4, 154, 154) 80%, rgb(40, 40, 40));
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
      .navButton {
        border: 1px solid #CCD;
        margin: 0.1rem;
        border-radius: 25% 25% 2% 2%;
        background: linear-gradient(0deg, rgb(55,55,55), rgb(0,255,155) 40%, rgb(77,77,77));
      }
      .navButton:hover {
        box-shadow: 0px 1px 1px 2px rgb(240,255,250);
      }
      .chosen {
        background: linear-gradient(0deg, rgb(0,0,0), rgb(0,255,55) 40%, rgb(40,40,40));
      }
      `,
  treeNav: `
      li {
        color: black;
      }
      li:hover {
        box-shadow: 0px 0px .1rem .2rem blue;
      }
    `,
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
};
