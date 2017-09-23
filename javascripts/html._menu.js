//Currently not in use. Possibility for future.
TS.html._menu = function() {
  let item =  TS.lib.createComponent({
    id: 'TS.html._menu',
    css:
    _menu : function() {
      return `
        ${_.btn}
        .dropbtn {
            background-color: #4CAF50;
            color: white;
            padding: 16px;
            font-size: 16px;
            border: none;
            cursor: pointer;
        }
        .dropbtn:hover, .dropbtn:focus {
            background-color: #3e8e41;
        }
        .dropdown {
            position: relative;
            display: inline-block;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }

        /* Links inside the dropdown */
        .dropdown-content button {
            color: black;
            display: inline-flex;
            padding: .2rem;
            box-shadow: 0 0 .1rem .2rem rgba(240,40,40,.2) inset;
            flex-grow: 1;
            text-decoration: none;
            display: block;
        }

        .dropdown-content button:hover {background-color: #f1f1f1}
        .dropdown:hover .dropdown-content {
          display:flex;
          flex-wrap: wrap;
          min-width:350px;
        }
      `
    },
    html: `
    <div class="dropdown" id='menu'>
      <button class="dropbtn">Dropdown</button>
      <div class="dropdown-content">
        <button class = 'openModal' value ='open'>Open File</button>
        <button class = 'openModal' value ='open'>Create File</button>
        <button class = 'openModal' value ='upload'>Upload</button>
        <button class = 'openModal' value ='download'>Download</button>
        <button class = 'openModal' value ='preferences'>User Preferences</button>
        <button class = 'openModal' value ='settings'>File Settings</button>
        <button href="#">Create File</button>
        <button href="#">Upload</button>
      </div>
    </div>
    `,
    js: function({style, box, parent, root}) {
    }
  })
  return item.box;
}
