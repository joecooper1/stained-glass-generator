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
};
