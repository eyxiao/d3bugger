# FP-demystifying-d3

### Testing the extension:

To build d3bugger, first clone this repository and navigate to the cloned folder. Switch to the branch `extension`. Then, install dependencies via NPM.

```
git clone git@github.mit.edu:6894-sp20/FP-demystifying-d3.git
cd FP-demystifying-d3
git checkout extension
npm install
```

Then, navigate to chrome://extensions in your browser, enable developer mode by clicking on the Developer Mode toggle in the upper righthand corner,
click "Load unpacked extension...", and select the cloned folder (FP-demystifying-d3).

Now, you can inspect a page, and there should be a panel called 'D3 Debugger' if you click the double arrow at the top left corner of the inspector. You can then go to a page with a D3 visualization and hover over elements in the visualization to inspect them!

Sites we recommend testing on that have worked for us:
- https://bl.ocks.org/mbostock/raw/4341417/
- https://bl.ocks.org/d3noob/raw/8952219/
- https://pudding.cool/2020/03/census-history/

Feel free to try other visualizations too!


### Tips:

If the panel isn't responding (i.e. you're hovering over an element but the panel isn't updating with information), try reloading the page and see 
if the panel starts to update.

(We're currently trying to fix the above issue -- try testing on simpler visualizations that load faster. Basically this issue is due to our extension relying on injecting a script into the webpage, but if webpage's javascript takes too long to run, the injected script will run before/during the webpage javascript's execution, and the injected script might not catch the SVG elements being created by the webpage. When you reload the page, some webpage elements may be cached already, so the extension can pick them up.)