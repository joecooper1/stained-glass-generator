import {
  getRandomNumber,
  makePanes,
  setColors,
  scatterPanes,
  drawPolygon,
  drawCircle,
  drawRing,
} from "./utils/exports";

module.exports = function drawStainedGlass(
  ctx,
  height,
  width,
  {
    pieceSize = 25,
    lineWidth = 1,
    lineColor = "black",
    deviation = 25,
    shape = "abstract",
    colorScheme = "rgb",
    colorConsistency = 30,
    transparency = 1,
    scatter = 2,
    angle = 0,
  } = {}
) {
  //Check options are valid, and default or limit if not
  if (colorScheme !== "rgb" && colorScheme !== "hsl") colorScheme = "rgb";
  if (
    shape !== "abstract" &&
    shape !== "rect" &&
    shape !== "circle" &&
    shape !== "rings"
  )
    shape = "abstract";

  //Make deviation a reasonable amount by making it no bigger than the pieceSize
  let maxDeviation;
  if (pieceSize[0]) {
    maxDeviation = (pieceSize[0] + pieceSize[1]) / 2;
  } else maxDeviation = pieceSize;
  if (deviation > maxDeviation) deviation = maxDeviation;

  //Limit colorConsistency to 0-200
  if (colorConsistency > 200) colorConsistency = 200;
  else if (colorConsistency < 0) colorConsistency = 0;

  //If shape is rings, set transparency to 0.5
  if (shape === "rings") transparency = 0.5;

  //Limit lineWidth to 0-10
  if (lineWidth < 0) lineWidth = 0;
  else if (lineWidth > 10) lineWidth = 10;

  //Limit scatter to 0-10
  if (scatter < 0) scatter = 0;
  else if (scatter > 10) scatter = 10;

  //If size is a single value, set width and height the same
  //Else if size is an array, set width as size[0] and height as size[1]
  let pieceWidth;
  let pieceHeight;
  if (!pieceSize[0]) {
    pieceWidth = pieceSize;
    pieceHeight = pieceSize;
  } else {
    pieceWidth = pieceSize[0];
    pieceHeight = pieceSize[1];
  }

  //Limit angle and modify
  if (angle < 0) angle = 0;
  else if (angle > 10) angle = 10;
  angle = angle * (pieceHeight / 10);

  //If shape is not rect, pieceHeight must equal pieceWidth
  if (shape !== "rect") pieceHeight = pieceWidth;

  //Determine number of rows and columns
  let rows = Math.floor(height / pieceHeight + 2);
  let columns = Math.floor(width / pieceWidth + 2);

  //Make array of panes
  const panes = makePanes(
    rows,
    columns,
    shape,
    deviation,
    angle,
    pieceWidth,
    pieceHeight,
    getRandomNumber
  );

  //Set colors for panes
  for (let i = 0; i < panes.length; i++) {
    for (let j = 0; j < panes[i].length; j++) {
      const pane = panes[i][j];
      //Set colors
      setColors(
        pane,
        i,
        j,
        panes,
        colorConsistency,
        colorScheme,
        getRandomNumber
      );
    }
  }

  //Scatter
  if (scatter) scatterPanes(panes, scatter, colorScheme);

  //Draw
  for (let i = 1; i < panes.length - 1; i++) {
    for (let j = 1; j < panes[i].length - 1; j++) {
      const pane = panes[i][j];
      //Draw pane
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      if (shape === "circle")
        drawCircle(pane, colorScheme, ctx, pieceWidth, transparency);
      else if (shape === "rings")
        drawRing(pane, i, j, colorScheme, ctx, transparency, pieceWidth);
      else
        drawPolygon(
          pane,
          i,
          j,
          panes,
          colorScheme,
          ctx,
          transparency,
          angle,
          lineWidth,
          shape
        );
    }
  }

  //Draw ring outlines
  if (shape === "rings") {
    for (let i = 0; i < panes.length - 2; i++) {
      for (let j = 0; j < panes[i].length - 2; j++) {
        const pane = panes[i][j];
        //Every other shape
        if ((i + j) % 2 === 0) {
          //Draw circles
          ctx.beginPath();
          ctx.arc(pane.coords.x, pane.coords.y, pieceWidth, 0, Math.PI * 2);
          if (lineWidth > 0) ctx.stroke();
          //Draw lines
          if (i % 2 > 0) {
            ctx.beginPath();
            ctx.moveTo(panes[i][j + 2].coords.x, panes[i][j + 2].coords.y);
            ctx.lineTo(pane.coords.x, pane.coords.y);
            ctx.lineTo(panes[i + 2][j].coords.x, panes[i + 2][j].coords.y);
            if (lineWidth > 0) ctx.stroke();
          }
        }
      }
    }
  }
};
