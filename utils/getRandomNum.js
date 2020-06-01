//Get random number within range
export const getRandomNumber = (range = 30) => {
  return Math.floor(Math.random() * (range + 1) - range / 2);
};
