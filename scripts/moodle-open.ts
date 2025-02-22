// ==UserScript==
// @name         Open Virtual Class files instead of DL
// @namespace    https://github.com/arch-fan/tapermonkey-scripts
// @updateURL    https://raw.githubusercontent.com/arch-fan/tapermonkey-scripts/main/scripts/moodle-open.js
// @version      1.0.1
// @description  Overrides DL links of Moodle to open them instead of downloading them
// @author       arch-fan
// @match        https://*/virtual-class/mod/assign/view.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=salesianosalcala.com
// @require      file:///C:/Users/jlsp2/Documents/tapermonkey-scripts/scripts/moodle-open.js
// @grant        none
// ==/UserScript==

(() => {
  const filesContainer = document.querySelector(
    ".activity-description"
  ) as HTMLAnchorElement;

  for (const el of filesContainer.querySelectorAll("a")) {
    const url = new URL(el.href);

    url.searchParams.delete("forcedownload");

    el.href = url.toString();
  }
})();
