Book.css = {
	centerText : `
	margin:20px;
	text-align:center;
  `,
  glass : `
  box-sizing:border-box;
    background-color: rgba(245, 250, 255, .1);
    box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, .5);
    border: 1px solid black;
  `,
  air: `
    background-color: rgba(245, 250, 255, .1);
    box-shadow: 1px 2px 2px 3px rgba(50, 140, 195, .1) inset;
    border: 1px solid rgb(155,160,170);
  `,
  black : `
    color: rgb(253,255,255);
    background: linear-gradient(0deg, rgb(0,0,0), rgb(0,55,55) 40%, rgb(40,40,40));
  `,
  gold : `
    background: linear-gradient(0deg, #efd100, #e2a233 38%, #f0c328 60%, #fff1a3 86%, #ffe13e 100%);
  `,
  green: `
    background: linear-gradient(0deg, rgb(0,200,0), rgb(0,255,55) 40%, rgb(40,240,40));
  `,
  mainButtons: function() {
    let str = `
    :host {
      display:inline-block;
      box-sizing: border-box;
      ${Book.css.glass};
      width: 100%;
    }
    .navButton {
      border-radius: 5px;
      ${Book.css.black};
    }
    .navButton:hover {
      background-color: rgb(100,100,255);
      box-shadow: 0px 1px 1px 2px rgb(0,0,20);
      background: linear-gradient(0deg, rgb(10,10,10), rgb(55,105,55) 40%, rgb(40,80,40));
    }
    #addColumn {
      border-radius: 5px;
      ${Book.css.green};
    }
    #addColumn:hover {
        background: linear-gradient(0deg, rgb(0,220,0), rgb(20,255,75) 40%, rgb(60,250,60));
        box-shadow: 0px 1px 1px 2px blue;
    }
    `
    return str
  }

}
