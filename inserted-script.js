// This is included and executed in the inspected page
// function inserted() {
// 	console.log('External script attached');
// }
// inserted();


function selectCircles() {
	console.log("working")

	$("circle").bind("click", function () { updateConsole($(this)) });


	function updateConsole(selection) {
		// getBoundData(selection);
		getHTMLAttributes(selection);
		getAncestry(selection);
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

	function getHTMLAttributes(selection) {
		// console.dir(selection)
		// console.log(selection)
		$("#console-html-breakdown").html(""); //first clear out existing contents
		// tag
		let tagEntry = "<p><b>tag: </b>" + selection[0].tagName + "</p>";
		$("#console-html-breakdown").append(tagEntry);

		var attributesJSON = {};
		// var name = $(this).attr("name");
		$.each(selection[0].attributes, function (i, attr) {
			if (attr.specified) {
				attributesJSON[attr.name] = attr.value;
			}
		});

		console.log(JSON.stringify(attributesJSON));


		chrome.extension.sendMessage({ attributes: JSON.stringify(attributesJSON) });

		console.log(JSON.parse(JSON.stringify(attributesJSON)));

		// let attributes = JSON.parse(JSON.stringify(selection[0].attributes));
		// console.log(attributes)
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

		ancestry.forEach((ancestor, i) => {
			let parentHTMLCode = generateHTMLCode(ancestor)
			$("#console-ancestry").append("<p id=" + "\"parent" + i + "\"></p>");
			let indentation = "".repeat(i * 4);
			$("#parent" + i).text(indentation + parentHTMLCode).css("margin-left", i + "rem");

		})
	}

	function generateHTMLCode(selection) {
		// console.log(selection.tagName)
		var code = "<" + selection.tagName.toLowerCase() + " ";
		$(selection.attributes).each(function () {
			code += this.nodeName + "=\"" + this.nodeValue + "\" ";
		});
		code = code.slice(0, -1);
		code += "></" + selection.tagName.toLowerCase() + ">";
		// console.log(code)
		return code;
	}

}

selectCircles();