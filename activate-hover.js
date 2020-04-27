// This is included and executed in the inspected page
// function inserted() {
// 	console.log('External script attached');
// }
// inserted();

// var $ = require('jquery');

var p = document.getElementsByTagName('circle');
console.log(p[0].__data__); // yay this works now

function hoverSelection() {
	// INJECT CSS
	/* create the link element */
	var linkElement = document.createElement('link');
	/* add attributes */
	linkElement.setAttribute('rel', 'stylesheet');
	linkElement.setAttribute('href', '../inserted-styles.css'); //TODO: fix this file path???
	linkElement.setAttribute('type', 'text/css');
	/* attach to the document head */
	document.getElementsByTagName('head')[0].appendChild(linkElement);


	$("circle").hover(function (event) { console.log(event.target.__data__); updateConsole($(this), event); }, function () { updateConsoleOut($(this)) });

	// $("circle").bind("click", function () { updateConsole($(this)) });
	// $("path").bind("click", function () { updateConsole($(this)) });


	// BIND HOVER FUNCTIONS
	// let svgGraphicsElements = ["circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "use"]
	// svgGraphicsElements.forEach((element, i) => {
	// 	$(element).hover(function () { updateConsole($(this)) }, function () { updateConsoleOut($(this)) });
	// })





	function updateConsole(selection) {
		//highlight selection
		selection.addClass("d3-debugger-hovered-svg");

		// getBoundData(selection);
		var tagJSON = getHTMLTag(selection);
		var attributesJSON = getHTMLAttributes(selection);
		var ancestryJSON = getAncestry(selection);

		chrome.extension.sendMessage({
			tag: JSON.stringify(tagJSON),
			attributes: JSON.stringify(attributesJSON),
			ancestry: JSON.stringify(ancestryJSON)
		});

	}

	function updateConsoleOut(selection) {
		selection.removeClass("d3-debugger-hovered-svg");
	}

	// function getBoundData(selection) {
	// 	d3.select(selection[0]).attr("class", "huh")
	// 	d3.select(selection[0]).attr("class", function (d) {
	// 		$("#console-bound-data").html(""); //first clear out existing contents
	// 		console.log(d)
	// 		Object.keys(d).forEach((key) => {
	// 			let keyText = "<b>" + key + "</b>"
	// 			let valueText = d[key]
	// 			let fullEntry = "<p>" + keyText + ": " + valueText + "</p>";
	// 			// console.log(fullEntry)
	// 			$("#console-bound-data").append(fullEntry);
	// 		})
	// 		return;
	// 	});
	// }

	function getHTMLTag(selection) {
		var tagJSON = {};
		tagJSON["tag"] = selection[0].tagName
		return tagJSON
	}

	function getHTMLAttributes(selection) {
		// $("#console-html-breakdown").html(""); //first clear out existing contents
		// // tag
		// let tagEntry = "<p><b>tag: </b>" + selection[0].tagName + "</p>";
		// $("#console-html-breakdown").append(tagEntry);
		attributeNames = [];
		let attributesJSON = {};

		$.each(selection[0].attributes, function (i, attr) {
			if (attr.specified) {
				attrValueWithoutCustomClass = attr.value.replace("d3-debugger-hovered-svg", "");
				if (attrValueWithoutCustomClass.length > 0) {
					attributesJSON[attr.name] = attrValueWithoutCustomClass;
					attributeNames.push(attr.name);
				}

			}
		});

		let sortedAttributeNames = attributeNames.sort();

		let sortedAttributesJSON = {};
		sortedAttributeNames.forEach((element, i) => {
			sortedAttributesJSON[element] = attributesJSON[element];
		})

		return sortedAttributesJSON;
		//attributes
		// $(selection[0].attributes).each(function () {
		// 	let fullEntry = "<p><b>" + this.nodeName + "</b> = " + this.nodeValue + "</p>";
		// 	// let frag = document.createRange().createContextualFragment(fullEntry);
		// 	chrome.extension.sendMessage({ attributeEntry: fullEntry });
		// 	// console.log(frag);

		// 	// $("#console-html-breakdown").append(fullEntry);
		// });
	}

	function getAncestry(selection) {
		$("#console-ancestry").html("") //clear

		let ancestry = selection.parents().toArray().reverse(); //parents
		ancestry.push(selection[0])

		let ancestryJSON = {} // maps indices to string of HTML per ancestor

		ancestry.forEach((ancestor, i) => {
			let parentHTMLCode = generateHTMLCode(ancestor)
			// $("#console-ancestry").append("<p id=" + "\"parent" + i + "\"></p>");
			// $("#parent" + i).text(parentHTMLCode).css("margin-left", i + "rem");
			ancestryJSON[i] = parentHTMLCode;

		})

		return ancestryJSON;

	}

	function generateHTMLCode(selection) {
		// console.log(selection.tagName)
		var code = "<" + selection.tagName.toLowerCase() + " ";
		$(selection.attributes).each(function () {
			nodeValueWithoutCustomClass = this.nodeValue.replace("d3-debugger-hovered-svg", "");
			if (nodeValueWithoutCustomClass.length > 0) {
				code += this.nodeName + "=\"" + nodeValueWithoutCustomClass + "\" ";
			}
		});
		code = code.slice(0, -1);
		code += "></" + selection.tagName.toLowerCase() + ">";
		// console.log(code)
		return code;
	}

}

hoverSelection();