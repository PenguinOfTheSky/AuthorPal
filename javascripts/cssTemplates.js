Book.cssTemplates = {
  default: {
    btn: `
      button {
        border-radius: .4rem;
        margin: .2rem;
        font-size: 1rem;
        background-color: rgb(200,100,200);
      }
      button:hover {
        box-shadow: 0px 0px .1rem .2rem rgba(235,255,255,.5) inset;
      }
    `,
    border1 : `box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, .5);
      box-sizing:border-box;`,
    border2: `
      border: 2px solid orange;
      border-radius:10px;
      box-shadow: 0px 0px 1px 2px black inset;
    `,
    border3: ``,
    backgroundNav1 : `
      color: rgb(255,255,255);
      background: linear-gradient(0deg, rgb(0,0,0), rgb(0,55,55) 40%, rgb(40,40,40));
    `,
    backgroundNav2 : ``,
    backgroundModals : `
      background: linear-gradient(0deg, rgb(0,230,0), rgb(0,55,55) 40%, rgb(40,80,60));

    `,
    backgroundMain: `
      color: rgb(253,255,255);
      background: linear-gradient(0deg, rgb(0,0,0), rgb(0,55,55) 40%, rgb(40,40,40));
    `,
    btnWarn: `
      .btnWarn {
        background-color : red;
      }
    `,
    btnExit: `
      #exit {
        border: 2px solid black;float:right;
        background-color: red;
      }
    `,
    btnSubmit: `
      .btnSubmit {
        background-color: orange;
      }
    `,
    btnBase1: ``,
    btnBase2: ``,
    btnNav1: ``,
    btnNav2: ``,
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
      }
    `
  }

}
