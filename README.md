# d3bugger

## Testing the extension:

1. To install D3 Debugger, first clone this repository locally.

```
git clone git@github.com:eyxiao/d3bugger.git
```

2. Navigate to **chrome://extensions** in your browser, enable developer mode by clicking on the **Developer Mode** toggle in the upper righthand corner, click "**Load unpacked extension...**", and select the cloned folder (d3bugger).

3. Now, you can inspect a page, and there should be a panel called '**D3 Debugger**' if you click the double arrow at the top left corner of the inspector. You can then go to a page with a D3 visualization and hover over elements in the visualization to inspect them!

Here are some example D3 visualizations you can try out d3bugger on:
- https://bl.ocks.org/mbostock/raw/4341417/
- https://bl.ocks.org/d3noob/raw/8952219/
- https://pudding.cool/2020/03/census-history/

Feel free to try other visualizations too!

If you have any trouble setting up the extension or testing it, feel free to reach out to through email: eyxiao@mit.edu, kjin@mit.edu.

## Project Development Process
This project looked very different at the beginning of our design process; in fact, it was not a Chrome extension at all. At the very start of our ideation, the goal we fixed on was straightforward: create a tool that D3 developers could use to better debug their D3 visualizations. Our original conception of this idea was to create a webpage including a file upload system, code editor, a display for the visualization, and a panel for navigating and displaying information. After wireframing and beginning to build this monster of a webpage, a response to our Piazza post linked us to two Chrome extensions: a KnockoutJS debugger and a D3 Deconstructor. Inspiration struck, and we quickly pivoted our project to creating a D3 debugger Chrome extension, with the same overarching goal in mind.

Most of the learning curve, then, was in understanding how Chrome extensions work in the intricacies of passing messages and data between the inspected page and the panel, as well as figuring out how the amalgam of scripts work. The other major hurdle was learning how to access the data bound to D3 elements, which was a challenge for two reasons. 1) We didn't realize that the data is simply bound to the `__data__` attribute of an element, so we sunk many, many hours into trying and failing to integrate the D3 Deconstructor (Chrome extension) code into our own extension. 2) Once we discovered `__data__`, we found that it was very finnicky to access via an injected script, and it took us a while to incorporate it correctly.

The rest of the development process was relatively straightforward, as we fleshed out the interface and the panel features, also adding other functionality like choosing interaction methods. We also had some other issues to debug with how the script is inserted into the page. 

## Team Work Breakdown
We each contributed equally to ideation, design, and feature and prototype development. Kathryn established the initial setup of the Chrome extension: hooking up the scripts together and initializing a message-passing framework; Elaine then refactored and streamlined this framework. Kathryn wrote the initial code to retrieve and display the inspected element in the panel; Elaine fleshed out these features. Elaine developed the majority of the styling and interactive elements in the panel. Kathryn wrote the hover function, and Elaine added the functionality to switch to Click interaction or turn it off.  

