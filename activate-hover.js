// This is included and executed in the inspected page
// function inserted() {
// 	console.log('External script attached');
// }
// inserted();

var $ = require('jquery');


function hoverSelection() {
	// INJECT CSS
	/* create the link element */
	var linkElement = document.createElement('link');
	/* add attributes */
	linkElement.setAttribute('rel', 'stylesheet');
	// linkElement.setAttribute('href', 'inserted-styles.css'); //TODO: fix this file path???
	linkElement.setAttribute('type', 'text/css');
	/* attach to the document head */
	document.getElementsByTagName('head')[0].appendChild(linkElement);


	// BIND HOVER FUNCTIONS
	let svgGraphicsElements = ["circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "use"]
	svgGraphicsElements.forEach((element, i) => {
		$(element).hover(function (event) { updateConsole($(this), event); }, function () { updateConsoleOut($(this)) });
	})


	function updateConsole(selection) {
		//highlight selection
		selection.addClass("d3-debugger-hovered-svg");

		var tagJSON = getHTMLTag(selection);
		var attributesJSON = getHTMLAttributes(selection);
		var ancestryJSON = getAncestry(selection);
		var dataJSON = getData(selection);

		var deconData = {
			tag: JSON.stringify(tagJSON),
			attributes: JSON.stringify(attributesJSON),
			ancestry: JSON.stringify(ancestryJSON),
			data: JSON.stringify(dataJSON)
		};

		// console.log(deconData);


		window.postMessage({
			type: "FROM_PAGE_TO_CONTENT_SCRIPT",
			message: deconData,
		}, "*");
		
		// console.log("sent message");

	}

	function updateConsoleOut(selection) {
		selection.removeClass("d3-debugger-hovered-svg");
	}

	////////////////// get panel properties /////////////////

	function getData(selection) {
		return selection[0].__data__;
	}

	function getHTMLTag(selection) {
		var tagJSON = {};
		tagJSON["tag"] = selection[0].tagName
		return tagJSON
	}

	function getHTMLAttributes(selection) {
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
	}

	function getAncestry(selection) {
		$("#console-ancestry").html("") //clear

		let ancestry = selection.parents().toArray().reverse(); //parents
		ancestry.push(selection[0])

		let ancestryJSON = {} // maps indices to string of HTML per ancestor

		ancestry.forEach((ancestor, i) => {
			let parentHTMLCode = generateHTMLCode(ancestor)
			ancestryJSON[i] = parentHTMLCode;

		})

		return ancestryJSON;

	}

	function generateHTMLCode(selection) {
		var code = "<" + selection.tagName.toLowerCase() + " ";
		$(selection.attributes).each(function () {
			nodeValueWithoutCustomClass = this.nodeValue.replace("d3-debugger-hovered-svg", "");
			if (nodeValueWithoutCustomClass.length > 0) {
				code += this.nodeName + "=\"" + nodeValueWithoutCustomClass + "\" ";
			}
		});
		code = code.slice(0, -1);
		code += "></" + selection.tagName.toLowerCase() + ">";
		return code;
	}

}

hoverSelection();