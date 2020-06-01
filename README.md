# d3bugger

d3bugger is a Chrome DevTools extension custom-made for debugging D3.js, created to expedite the development workflow of building D3.js visualizations. 

If you've ever tried to debug a complex D3.js visualization before, chances are you've run into difficulties such as not _really_ knowing what data is bound to an element or why an element is not where it should be, or having to scroll through hundreds of elements in the Chrome DevTools' Elements panel to take a closer look at one specific element in your visualization. D3.js aims to solve these difficulties by providing a way to quickly and easily view the HTML attributes, data bound, and ancestry of any D3 SVG Element in a visualization, all in the familiar environment of the Chrome inspector. With d3bugger, you can simply hover over or click on elements in a D3 visualization to get the important information you need about the element, as shown in the demo below.

![](img/demo.gif)

You can also control the interaction method (hover vs. click vs. off) using the buttons at the top of the panel, and you can toggle the highlight around the inspected element on and off using the button in the upper righthand corner.

## Try it out:

(Hopefully coming soon to the Chrome Web Store, but for now you can use d3bugger locally!)

1. To build D3 Debugger, first clone this repository.

```
git clone git@github.mit.edu:eyxiao/d3bugger.git
```

2. Navigate to **chrome://extensions** in your browser, enable developer mode by clicking on the **Developer Mode** toggle in the upper righthand corner, click "**Load unpacked extension...**", and select the cloned folder (d3bugger).

3. Now, you can inspect a page, and there should be a panel called '**D3 Debugger**' if you click the double arrow at the top left corner of the inspector. You can then go to a page with a D3 visualization and hover over elements in the visualization to inspect them!git 

Here are some example D3 visualizations you can try out d3bugger on:
- https://bl.ocks.org/mbostock/raw/4341417/
- https://bl.ocks.org/d3noob/raw/8952219/
- https://bl.ocks.org/vasturiano/raw/ded69192b8269a78d2d97e24211e64e0/
- https://pudding.cool/2020/03/census-history/

Feel free to try other visualizations too!

## What's next for d3bugger:
- Fixing small bugs
- Submitting to Chrome Web Store!


Made by Kathryn Jin and Elaine Xiao for [6.894: Interactive Data Visualization](http://vis.csail.mit.edu/classes/6.894/) at MIT.