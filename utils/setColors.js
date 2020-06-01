//A function that sets the colors for a pane
export default function setColors(
  pane,
  i,
  j,
  panes,
  colorConsistency,
  colorScheme,
  getRandomNumber
) {
  //Set range for color changes based on consistency
  const range = colorConsistency;
  //Set temporary rgb and hsl values
  let tempHSL = { h: null, s: null, l: null };
  let tempRGB = { r: null, g: null, b: null };
  //If top corner
  if (i === 0 && j === 0) {
    if (colorScheme === "hsl") {
      tempHSL.h = Math.floor(Math.random() * 360);
      tempHSL.s = Math.floor(Math.random() * 50) + 40;
      tempHSL.l = Math.floor(Math.random() * 40) + 30;
    } else {
      for (let color in tempRGB) {
        tempRGB[color] = Math.floor(Math.random() * 255);
      }
    }
  }
  //If not top corner
  if (j > 0) {
    //Get colors from above
    if (colorScheme === "hsl") {
      tempHSL = panes[i][j - 1].colorsHSL;
    } else {
      tempRGB = panes[i][j - 1].colorsRGB;
    }
  }
  if (i > 0) {
    //Get colors from left
    if (colorScheme === "hsl") {
      for (let color in tempHSL) {
        //If no color has been set, get color from left
        if (!tempHSL[color]) tempHSL[color] = panes[i - 1][j].colorsHSL[color];
        //If color has been set, get color from left, add to it and divide
        else
          tempHSL[color] =
            (tempHSL[color] + panes[i - 1][j].colorsHSL[color]) / 2;
      }
    } else {
      for (let color in tempRGB) {
        //If no color has been set, get color from left
        if (!tempRGB[color]) tempRGB[color] = panes[i - 1][j].colorsRGB[color];
        //If color has been set, get color from left, add to it and divide
        else
          tempRGB[color] =
            (tempRGB[color] + panes[i - 1][j].colorsRGB[color]) / 2;
      }
    }
  }

  //Add random amount to colors
  for (let color in tempRGB) {
    //If not null, add random number
    tempRGB[color] += getRandomNumber(range);
  }
  tempHSL.h += getRandomNumber(range);
  tempHSL.s += getRandomNumber(5);
  tempHSL.l += getRandomNumber(5);

  //Limit values to within a certain range
  //Limit rgb colors to be above 50
  for (let color in tempRGB) {
    if (tempRGB[color] < 50) tempRGB[color] += range / 2;
    if (tempRGB[color] > 240) tempRGB[color] -= range / 2;
  }
  //Limit saturation to within 30-80
  if (tempHSL.s < 30) tempHSL.s += 5;
  else if (tempHSL.s > 80) tempHSL.s -= 5;
  //Limit lightness to within 30-70
  if (tempHSL.l < 30) tempHSL.l += 5;
  else if (tempHSL.l > 80) tempHSL.l -= 5;

  //Assign color values to pane
  for (let color in pane.colorsRGB) {
    pane.colorsRGB[color] = tempRGB[color];
  }
  for (let color in pane.colorsHSL) {
    pane.colorsHSL[color] = tempHSL[color];
  }
};
