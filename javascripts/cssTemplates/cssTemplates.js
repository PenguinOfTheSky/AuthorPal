TS.cssTemplates.default = {
    alignment: 'top',
    link: ``,
    btn: `
      input[type=button], button {
        border-radius: .4rem;
        margin: .2rem;
        font-size: 1rem;
        background-color: gold;
      }
      button:hover {
        box-shadow: 0px 0px .1rem .2rem rgba(235,255,255,.5) inset;
      }`,
    border1 : `box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, .5);
      box-sizing:border-box;`,
    border2: `
      border: 2px solid orange;
      border-radius:10px;
      box-shadow: 0px 0px 1px 2px black inset;`,
    border3: ``,
    backgroundTitle: ``,
    titleColor: ``,
    backgroundNav1 : `
      color: rgb(255,255,255);
      background: linear-gradient(0deg, rgb(0,0,0), rgb(10,10,10) 40%, rgb(0,0,0));`,
    backgroundNav2 : `background-color: #DFD;`,
    backgroundModals : `
      background: linear-gradient(0deg, rgb(0,230,0), rgb(0,55,55) 40%, rgb(40,80,60));`,
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
        border: 3px groove #DDD;
        font-size: 1rem;
        background: linear-gradient(0deg, rgb(30, 0, 0), rgb(60, 10, 5) 80%, rgb(40, 5, 0));
      }
      #left > *:hover {
        background: linear-gradient(0deg, rgb(0, 0, 0), rgb(4, 154, 154) 80%, rgb(40, 40, 40));
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
        background: linear-gradient(0deg, rgb(0,0,0), rgb(0,255,55) 40%, rgb(40,40,40));
      }
      .navButton:hover {
        box-shadow: 0px 1px 1px 2px rgb(0,0,20);
        background: linear-gradient(0deg, rgb(0, 0, 0), rgb(4, 154, 154) 80%, rgb(40, 40, 40));
      }`,
    btnNav2: `
    background-color: rgba(20,255,20,.8);`,
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
TS.cssTemplates.sparky = {
    link: `
      a {
        color: rgb(190,190,255);
      }
    `,
    alignment: 'left',
    btn: `
      button {
        border-radius: .4rem;
        margin: .2rem;
        font-size: 1rem;
        background-color: rgb(200,100,200);
      }
      button:hover {
        box-shadow: 0px 0px .1rem .2rem rgba(235,255,255,.5) inset;
      }`,
    border1 : `box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, .5);
      box-sizing:border-box;`,
    border2: `
      border: 2px solid orange;
      border-radius:10px;
      box-shadow: 0px 0px 1px 2px black inset;`,
    border3: ``,
    backgroundTitle: ``,
    titleColor: ``,
    backgroundNav1 : `
      color: rgb(255,255,255);
      background: linear-gradient(0deg, rgb(0,0,0), rgb(220,10,10) 40%, rgb(0,0,0));`,
    backgroundNav2 : `background-color: #DFD;`,
    backgroundModals : `
      background : radial-gradient(circle at 2.01% 21.96%, #c21500, transparent 100%),radial-gradient(circle at 81.61% 78.78%, #ffc500, transparent 100%),radial-gradient(circle at 85.27% 6.83%, #b8faff, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)`,
    backgroundMain: `
      color: rgb(253,255,255);
      background : radial-gradient(circle at 2.01% 21.96%, #c21500, transparent 100%),radial-gradient(circle at 81.61% 78.78%, #ffc500, transparent 100%),radial-gradient(circle at 85.27% 6.83%, #b8faff, transparent 100%),radial-gradient(circle at 50% 50%, #ffffff, #ffffff 100%)`,
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
        border: 3px groove #DDD;
        font-size: 1rem;
        background: linear-gradient(0deg, rgb(30, 0, 120), rgb(60, 10, 145) 80%, rgb(40, 5, 120));
      }
      #left > *:hover {
        background: linear-gradient(0deg, rgb(0, 0, 0), rgb(4, 154, 154) 80%, rgb(40, 40, 40));
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
        background: linear-gradient(0deg, rgb(0,0,0), rgb(0,255,55) 40%, rgb(40,40,40));
      }
      .navButton:hover {
        box-shadow: 0px 1px 1px 2px rgb(0,0,20);
        background: linear-gradient(0deg, rgb(0, 0, 0), rgb(4, 154, 154) 80%, rgb(40, 40, 40));
      }`,
    btnNav2: `
    background-color: rgba(20,255,20,.8);`,
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
