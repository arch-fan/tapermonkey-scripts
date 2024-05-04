// ==UserScript==
// @name         Danbooru Tags to Stable Diffusion
// @namespace    https://github.com/arch-fan/tapermonkey-scripts
// @updateURL    https://raw.githubusercontent.com/arch-fan/tapermonkey-scripts/main/scripts/danbooru.js
// @version      1.0.1
// @description  Parse the tags of a image from danbooru to a stable diffusion prompteable tags
// @author       arch-fan
// @match        https://danbooru.donmai.us/posts*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=donmai.us
// @require      file:///C:/Users/jlsp2/Documents/tapermonkey-scripts/scripts/danbooru.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js
// @grant        none
// ==/UserScript==

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName
 * @param {HTMLElementTagNameMap[K] | undefined} options
 */
const createComponent = (tagName, options) => {
	const el = document.createElement(tagName)

	_.merge(el, options)

	return el
}

// Main
;(() => {
	/**
	 * @type {NodeListOf<HTMLDivElement> | null}
	 */
	const $$tagsDivs = document.querySelectorAll(
		"aside#sidebar > section#tag-list > div.tag-list ul",
	)

	for (const $tagDiv of $$tagsDivs) {
		$tagDiv.style.marginBottom = "0"
		/**
		 * @type {string[]}
		 */
		const tags = []

		const $$tags = $tagDiv.querySelectorAll("li > span:last-child > a")

		for (const $tag of $$tags) {
			tags.push($tag.textContent.replace(/[()"']/g, "\\$&"))
		}

		const $container = Container()
		const $copyButton = CopyButon()
		const tagsText = tags.join(",")
		const $p = createComponent("p", { textContent: tagsText })

		$copyButton.addEventListener("click", () =>
			navigator.clipboard.writeText(tagsText),
		)

		$container.appendChild($p)
		$container.appendChild($copyButton)

		$tagDiv.insertAdjacentElement("afterend", $container)
	}
})()

function CopyButon() {
	return createComponent("button", {
		innerText: "Copy",
		className: "copy-button",
		style: {
			top: "2px",
			right: "2px",
			background: "transparent",
			color: "white",
		},
	})
}

function Container() {
	return createComponent("div", {
		style: {
			backgroundColor: "#333",
			display: "flex",
			flexDirection: "column",
			padding: "8px",
			border: "2px solid white",
			borderRadius: "8px",
			boxShadow:
				"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
			marginBottom: "2em",
			marginTop: "8px",
		},
	})
}
