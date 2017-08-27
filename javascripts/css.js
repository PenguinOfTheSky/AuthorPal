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
  topLeftNav: `
    #left {
      display: inline-flex;
      background-color: #222;
    }
    #left select option{
      color: white;
      background-color: rgb(0,0,0);
      border: none;
      font-size: 1rem;
    }
    #LyceliaButton {
      font-family:cursive;font-size:1rem;text-shadow:1px 1px white;
    }
    #LyceliaButton a {
      text-decoration: none;
      color: white;
    }
    #left > * {
      border: none;
      box-shadow: 0px 0px 1px 2px rgba(200,200,100,.5) inset;
      color: white;
      font-size: 1rem;
      background-color: rgba(0,0,0,0);
    }
    #left > *:hover {
      box-shadow: 0px 0px .1rem .2rem rgb(205,255,255) inset;
    }
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
      font-size: 1rem;
      ${Book.css.black};
    }
    .navButton:hover {
      background-color: rgb(100,100,255);
      box-shadow: 0px 1px 1px 2px rgb(0,0,20);
      background: linear-gradient(0deg, rgb(10,10,10), rgb(55,105,55) 40%, rgb(40,80,40));
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
    }`

}
