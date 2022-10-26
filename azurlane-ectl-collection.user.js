// ==UserScript==
// @name         Azur Lane ECTL Collection
// @namespace    http://www.david-gouveia.com/
// @version      1.0
// @description  Click on any ship's name to toggle ownership
// @author       David Gouveia
// @match        https://slaimuda.github.io/ectl/
// @icon         https://slaimuda.github.io/ectl/favicon.ico
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// ==/UserScript==

(function() {
  'use strict';

  GM_addStyle(".dim { opacity: 0.2; }");
  GM_addStyle("p.ship-name-display { cursor: pointer; }");

  let collection = new Set();

  const key = "ship-collection";

  function save() {
    const json = JSON.stringify([...collection]);
    GM_setValue(key, json);
  }

  function load() {
    const json = GM_getValue(key, "[]");
    try {
      collection = new Set(JSON.parse(json));
    } catch {
      console.log("Invalid data: " + json);
    }
  }

  function refresh(element) {
    if(collection.has(element.innerHTML)) {
      element.parentElement.classList.remove("dim");
    } else {
      element.parentElement.classList.add("dim");
    }
  }

  function toggle(element) {
    const name = element.innerHTML;
    if(collection.has(name)) {
      collection.delete(name);
    } else {
      collection.add(name);
    }
    save();
    refresh(element);
  }

  load();

  waitForKeyElements("p.ship-name-display", element => {
    element.onclick = () => toggle(element);
    refresh(element);
  }, false);

})();
