# d3bugger

d3bugger is a Chrome DevTools extension custom-made for debugging data visualizations built with **d3.js**.

![](img/demo.gif)

## Testing the extension:

1. To build D3 Debugger, first clone this repository and navigate to the cloned folder.

```
git clone git@github.mit.edu:6894-sp20/FP-demystifying-d3.git
cd FP-demystifying-d3
npm install
```

2. Navigate to **chrome://extensions** in your browser, enable developer mode by clicking on the **Developer Mode** toggle in the upper righthand corner, click "**Load unpacked extension...**", and select the cloned folder (FP-demystifying-d3).

3. Now, you can inspect a page, and there should be a panel called '**D3 Debugger**' if you click the double arrow at the top left corner of the inspector. You can then go to a page with a D3 visualization and hover over elements in the visualization to inspect them!

Here are some example D3 visualizations you can try out d3bugger on:
- https://bl.ocks.org/mbostock/raw/4341417/
- https://bl.ocks.org/d3noob/raw/8952219/
- https://bl.ocks.org/vasturiano/raw/ded69192b8269a78d2d97e24211e64e0/
- https://pudding.cool/2020/03/census-history/

Feel free to try other visualizations too!

## What's next for d3bugger:
- Fixing small bugs
- Submitting to Chrome Web Store!


Made by Kathryn Jin and Elaine Xiao for [6.894: Interactive Data Visualization](http://vis.csail.mit.edu/classes/6.894/).

Questions/comments/feedback? Contact eyxiao@mit.edu or kjin@mit.edu.
