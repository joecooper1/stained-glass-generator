//Draw polygon
export default function drawPolygon(
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
) {
  //Set height and width of the panes, in terms of how many blocks they cover
  //This is always one, but could be increased in future to create different sized panes
  const wide = 1;
  const high = 1;
  //Set fill style and stroke style and line width
  if (colorScheme === "hsl") {
    ctx.fillStyle = `hsla(${pane.colorsHSL.h}, ${pane.colorsHSL.s}%, ${pane.colorsHSL.l}%, ${transparency})`;
  } else {
    ctx.fillStyle = `rgba(${pane.colorsRGB.r}, ${pane.colorsRGB.g}, ${pane.colorsRGB.b}, ${transparency})`;
  }

  //Plot points
  ctx.beginPath();
  //Start point
  ctx.moveTo(pane.coords.x, pane.coords.y);
  ctx.lineTo(panes[i - wide][j].coords.x, panes[i - wide][j].coords.y);
  ctx.lineTo(
    panes[i - wide][j - high].coords.x,
    panes[i - wide][j - high].coords.y
  );
  ctx.lineTo(panes[i][j - high].coords.x, panes[i][j - high].coords.y);
  ctx.lineTo(pane.coords.x, pane.coords.y);
  //Fill
  ctx.fill();
  ctx.beginPath();
  //Start point
  ctx.moveTo(panes[i][j - high].coords.x, panes[i][j - high].coords.y);
  ctx.lineTo(
    panes[i - wide][j - high].coords.x,
    panes[i - wide][j - high].coords.y
  );
  ctx.lineTo(panes[i - wide][j].coords.x, panes[i - wide][j].coords.y);
  if (wide > 1 || high > 1) {
    ctx.lineTo(pane.coords.x, pane.coords.y);
  }
  if (lineWidth > 0) ctx.stroke();

  //If rectangle and not top two rows
  if (shape === "rectangle" && i > 2 && angle > 0) {
    //If the pane above it is actually lower, rerender the above pane
    if (panes[i - 1][j - 1].coords.y < panes[i - 2][j - 1].coords.y) {
      drawPolygon(
        panes[i - 1][j],
        i - 1,
        j,
        panes,
        colorScheme,
        ctx,
        transparency,
        angle,
        lineWidth,
        shape
      );
      //Redraw the top line
      ctx.beginPath();
      ctx.moveTo(panes[i - 1][j].coords.x, panes[i - 1][j].coords.y);
      ctx.lineTo(panes[i - 1][j + 1].coords.x, panes[i - 1][j + 1].coords.y);
      //For some reason these lines have to be drawn one pixel thicker
      ctx.lineWidth = lineWidth + 1;
      if (lineWidth > 0) ctx.stroke();
    }
  }
}
