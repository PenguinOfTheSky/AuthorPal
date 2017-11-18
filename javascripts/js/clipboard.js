{
  clipboard = {
    lastItem: null,
    lastText: "",
    itemList: [],
    textList: []
  }
  TS.js.clipboard = {
    copyItem: function(data) {
      clipboard.lastItem = data;
      clipboard.itemList.push(data)
      delete clipboard.itemList[5]
      console.log(clipboard)
    }
  }
}
