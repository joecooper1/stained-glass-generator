# **Stained-Glass Generator**

A package that creates a random stained-glass pattern, based on inputted options, applied on an HTML canvas.

---

## **Contents**

- [Installation](#installation)
- [Use](#use)
- [Options](#options)

---

## **Installation**

```shell
$ npm install @joecooper1/stained-glass
```

---

## **Use**

First, import it into your file:

```javascript
import drawStainedGlass from '@joecooper1/stained-glass';
```

You'll need to create your own HTML canvas. You can do anything you like to it - eg give it a background image - before apllying the stained glass effect. Or you can draw the stained glass, and then draw something else on top of it.

> For info on how to use the canvas, try <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial" target="_blank">`here`</a>.

Once your canvas is set up, just call the function using the canvas reference, here called 'ctx'.

You'll also need to input the height and width of the canvas, in that order.

```javascript
drawStainedGlass(ctx, height, width, [options] -> {})
```

That's it! But if you want to customise it, check out the options.

---

## **Options**

The fourth argument to be passed in to the function is the options. It takes the form of an object with various parameters, all of which are optional.

Here they are:

Option | Input | Range | Effect
------------|-------------|-------------|------------
**shape** | string | 'abstract', 'rectangle', 'circle', 'ring' | Determines the shapes that make up the pattern. Defaults to abstract.
**pieceSize** | integer / [integer, integer] | 5 and up | Determines the size of each pane in pixels. Input can be given as a single integer, or as an array containing the width and the height. Defaults to 25.
**lineWidth** | integer | 0 - 10 | Determines the thickness of the lines seperating each pane. Defaults to 1. **Tip** - *try settings it to 0 when the size of the panes is small.*
**lineColor** | string | any valid color | Sets the color for the lines to be drawn in. Defaults to black.
**deviation** | integer | 0 and up | Determines how irregular the shapes are. Only applies to the abstract pattern. **Tip** - *Putting it higher than the size of the pieces will produce probably bad effects.*
**colorScheme** | string | 'rgb', 'hsl' | Determines what type of color values will be used to make the colors. The difference is slight, but in general 'rgb' produces a subtler pattern than 'hsl', which can be quite brash. Defaults to rgb.
**colorConsistency** | integer | 0 - 200 | Determines how varied the colors will be. 0 means perfectly uniform, 200 means completely random. Defaults to 30.
**scatter** | integer | 0 - 10 | Scatters the light across the panes, sort of. 10 scatters light a lot, 0 not at all. Only works for abstract pattern on hsl settings for now, because it looks gross on everything else. Defaults to 5.
**transparency** | number | 0 - 1 | Determines the transparency of the glass. Defaults to 1, or to 0.5 if the pattern is rings.
**angle** | integer | 0 - 10 | Determines the angle of horizontal lines. Only works for the rectangle pattern. Work in progress - for now it does not work 100%.





