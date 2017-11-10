TS.js.templates["novel outline"] = {
  textblock: function () {
    return ``;
  },
  container: function () {
    return {};
  },
  character_Short: function () {
    return `**blurb:**  
**appearance:**  
**personality:**  
**brief timeline:** `;
  },
  character_Long: function() {
    return {
      blurb: ``,
      appearance: ``,
      personality: ``,
      motivations: ``,
      timeline: {}
    }
  },
  chapter: function () {
    let obj = {
      "blurb": ``,
      "locations": ``,
      "characters": ``,
      "atmosphere": ``,
      "list main points": ``,
      "deeper runthrough": {

      }
    };
    return obj;
  }
}
