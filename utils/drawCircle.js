//Draw circle
export default function drawCircle(
  pane,
  colorScheme,
  ctx,
  pieceWidth,
  transparency
) {
  //Set fill style and stroke style and line width
  if (colorScheme === "hsl") {
    ctx.fillStyle = `hsla(${pane.colorsHSL.h}, ${pane.colorsHSL.s}%, ${pane.colorsHSL.l}%, ${transparency})`;
  } else {
    ctx.fillStyle = `rgba(${pane.colorsRGB.r}, ${pane.colorsRGB.g}, ${pane.colorsRGB.b}, ${transparency})`;
  }
  ctx.beginPath();
  ctx.arc(pane.coords.x, pane.coords.y, pieceWidth / 2, 0, Math.PI * 2);
  ctx.fill();
}
