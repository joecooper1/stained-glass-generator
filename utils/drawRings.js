//Draw rings
export default drawRing = (
  pane,
  i,
  j,
  colorScheme,
  ctx,
  transparency,
  pieceWidth
) => {
  //Set fill style and stroke style and line width
  if (colorScheme === "hsl") {
    ctx.fillStyle = `hsla(${pane.colorsHSL.h}, ${pane.colorsHSL.s}%, ${pane.colorsHSL.l}%, ${transparency})`;
  } else {
    ctx.fillStyle = `rgba(${pane.colorsRGB.r}, ${pane.colorsRGB.g}, ${pane.colorsRGB.b}, ${transparency})`;
  }
  if ((i + j) % 2 === 0) {
    ctx.beginPath();
    ctx.arc(pane.coords.x, pane.coords.y, pieceWidth, 0, Math.PI * 2);
    ctx.fill();
  }
};
