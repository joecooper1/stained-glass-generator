export default makePanes = (rows, columns, shape, deviation, angle, pieceWidth, pieceHeight, getRandomNumber) => {
    //Create an array of panes
  const panes = [];
  //Fill with panes of designated width and height, up to the width and height of the canvas (+ 1)
  for (let i = 0; i < rows + 2; i += 1) {
    //Set range of variation if shape is abstract
    const range = shape === "abstract" ? deviation : 0;
    //Set startpoint if shape is rect
    const startPoint =
      shape === "rect"
        ? //Not on the first or last row
          i === 0 || i === rows + 1
          ? 0
          : getRandomNumber((pieceHeight / 10) * angle)
        : 0;
    //Add a row
    panes.push([]);
    for (let j = 0; j < columns + 1; j += 1) {
      //Set coordinates of pane's central point
      //Vary by range, if shape is abstract
      panes[i].push({
        coords: {
          x: (j - 1) * pieceWidth + getRandomNumber(range),
          y:
            (i - 1) * pieceHeight +
            getRandomNumber(range) +
            startPoint +
            ((startPoint * -2) / columns) * j,
        },
        //Set hsl and rgb values to determine color of pane
        colorsHSL: { h: null, s: null, l: null },
        colorsRGB: { r: null, g: null, b: null },
      });
    }
  }

  return panes;
}