//Scatter
export const scatterPanes = (panes, scatter, colorScheme) => {
    for (let i = 0; i < panes.length; i++) {
      for (let j = 0; j < panes[i].length; j++) {
        const pane = panes[i][j];
        const probability = (20 - scatter) / 20;
        //If scatter is true, increase brightness at random
        if (scatter) {
          if (colorScheme === "rgb") {
            for (let color in pane.colorsRGB) {
              if (Math.random() > probability) pane.colorsRGB[color] += 100;
            }
          } else {
            if (Math.random() > probability) pane.colorsHSL.l += 20;
            if (pane.colorsHSL.l > 90) pane.colorsHSL.l -= 40;
          }
        }
      }
    }
  };