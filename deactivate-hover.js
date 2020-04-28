// TODO fix this

var svgGraphicsElements2 = ["circle", "ellipse", "image", "line", "path", "polygon", "polyline", "rect", "text", "use"]
svgGraphicsElements2.forEach((element, i) => {
    $(element).unbind('mouseenter mouseleave')
})