// This is included and executed in the inspected page
// function inserted() {
// 	console.log('External script attached');
// }
// inserted();

var $ = require('jquery');
console.log("activate-hover.js has been injected")

window.addEventListener('message', (message) => {
	console.log("received message in injected script");
	if (message.data.name === "updateSelectionType" && message.data.message) {
		hoverSelection(message.data.message);
	}
})

// initialize as hover
hoverSelection("hover");

function hoverSelection(selType) {
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
	
	if (selType === "hover") {
		console.log("updated to hover in activate-hover");
		// clear other selection types from elements and bind hover to elements
		svgGraphicsElements.forEach((element, i) => {
			$(element).unbind("click.d3Ext");
			$(element).bind("mouseenter.d3Ext", function (event) { updateConsole($(this), event); });
			$(element).bind("mouseleave.d3Ext", function () { updateConsoleOut($(this)) });
		});
	} else if (selType === "click") {
		console.log("updated to click in activate-hover");
		svgGraphicsElements.forEach((element, i) => {
			$(element).unbind("mouseenter.d3Ext");
			$(element).unbind("mouseleave.d3Ext");
			$(element).bind("click.d3Ext", function (event) { updateConsole($(this), event); });
		});
	} else { // selType === "off"
		console.log("updated to off in activate-hover");
		svgGraphicsElements.forEach((element, i) => {
			$(element).unbind("click.d3Ext");
			$(element).unbind("mouseenter.d3Ext");
			$(element).unbind("mouseleave.d3Ext");
		});
	}
}

function updateConsole(selection) {
	//highlight selection
	$('*').removeClass("d3-debugger-hovered-svg");
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

	console.log(deconData);


	window.postMessage({
		type: "FROM_PAGE_TO_CONTENT_SCRIPT",
		message: deconData,
	}, "*");

	console.log("sent message");

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
	var resultJSON = {
		main: selection.tagName.toLowerCase(),
		attributes: []
	}
	$(selection.attributes).each(function () {
		nodeValueWithoutCustomClass = this.nodeValue.replace("d3-debugger-hovered-svg", "");
		if (nodeValueWithoutCustomClass.length > 0) {
			resultJSON.attributes.push(this.nodeName + "=\"" + nodeValueWithoutCustomClass + "\"");
		}
	});
	return resultJSON;
}

// function generateHTMLCode(selection) {
// 	var code = "<" + selection.tagName.toLowerCase() + " ";
// 	$(selection.attributes).each(function () {
// 		nodeValueWithoutCustomClass = this.nodeValue.replace("d3-debugger-hovered-svg", "");
// 		if (nodeValueWithoutCustomClass.length > 0) {
// 			code += this.nodeName + "=\"" + nodeValueWithoutCustomClass + "\" ";
// 		}
// 	});
// 	code = code.slice(0, -1);
// 	code += "></" + selection.tagName.toLowerCase() + ">";
// 	return code;
// }