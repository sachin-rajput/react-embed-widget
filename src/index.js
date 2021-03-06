//index.js

import React from "react";
import ReactDOM from "react-dom";

import 'semantic-ui-css/semantic.min.css'
import './../assets/css/style.css'

import { MedalWidget } from '@components'

export function initialize(element_id, sort = "gold", top = 10, debug = false) {
  
  console.log("Initializing Medal Widget for <div id=\"" + element_id + "\"> with Sort: " + sort);

  try {
    ReactDOM.render(
      <MedalWidget sort={sort} top={top} debug={debug}  />,
      document.getElementById(element_id)
    )
    console.log("Initializing Medal Widget for <div id=\"" + element_id + "\"> with Sort: " + sort + " complete.");
  } catch ( err ) {
    // alert("FAILED: Initializing Medal Widget for <div id=\"" + element_id + "\"> with Sort: " + sort + ".");
    console.error("FAILED: Initializing Medal Widget for <div id=\"" + element_id + "\"> with Sort: " + sort + ".");
    console.error(err);
  }
}
