/* global TS */
TS.cssTemplates.splat = {
  hoverable: `
    box-shadow: 0px 0px .1rem .2rem rgb(0,30,155);
  `,
  highlight: ` 
    .highlight-one {
      color: #99F;
    }
    .highlight-two {
      color: #FAA;
    }
  `,
  link: ``,
  btn: `
    .hover:hover {
      box-shadow: 0px 0px .1rem .2rem rgba(0,30,155,.7);
    }
    
    button, input, select, select option {
      font-size:1rem;
    }
    input[type=button], button, select, .btn {
      color: white;
      border-radius: .4rem;
      border: none;
      padding: .05rem;
      background-color: rgb(15,50,250);
    }
    button:hover, select:hover, .btn:hover, .hoverable:hover {
      box-shadow: 0px 0px .1rem .2rem rgba(255,255,235,1), 0px 0px .1rem rgba(245,245,255,.7) inset;
    }
    input[type=button]:active, button:active, select:active, .btn:active {
      box-shadow: 0px 0px .1rem .2rem rgba(255,255,0,.5);
    }
    .icon {
      color: white;
      padding:.2rem;
      border-radius: .4rem;
    }
    .icon.fa {
      font-size: 1.3rem;
    }
    .icon-medium.fa {
      font-size: 2rem;
    }
    .icon-large.fa {
      font-size: 4rem;
    }
    .btnWarn {
      background-color : red;
    }
    .btnSubmit {
      background-color: green;
    }
    a {
      cursor: pointer;
      color: blue;
    }`,
  border1: `box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, 0.5);
      box-sizing:border-box;`,
  border2: `
      margin: .5rem 0px;
      box-shadow: 0px 0px 0.1rem 0.2rem rgb(55,155,255);`,
  border3: ``,
  backgroundTitle: ``,
  titleFont: ``,
  backgroundNav1: `
      color: rgb(255,255,255);
      background: linear-gradient(0deg, rgb(22,0,0), rgb(130,10,10) 40%, rgb(22,0,0));`,
  backgroundNav2: `background-color: #DFD;`,
  backgroundModals: `
    .bgModal {
      border-radius:1rem;
      border: .1rem inset #111;
      box-shadow: .05rem .05rem .3rem .1rem black;
      padding: .7rem;
      background: linear-gradient(0deg, rgb(10,120,0), rgb(0,145,55) 40%, rgb(20,110,40));
    }
      `,
  backgroundMain: `
      color: rgb(253,255,255);
      background: linear-gradient(0deg, rgb(0,0,0), rgb(0,55,55) 40%, rgb(40,40,40));`,
  btnExit: `
      #exit {
        border: 2px solid black;float:right;
        background-color: red;
      }`,
  btnSubmit: ``,
  btnBase1: `
    #left {
      font-size:1.4rem;
      }`,
  btnBase2: ``,
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
    `
};
