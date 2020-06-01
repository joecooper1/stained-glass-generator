//Get random number within range
export default function getRandomNumber(range = 30) {
  return Math.floor(Math.random() * (range + 1) - range / 2);
};
