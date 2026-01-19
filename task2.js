function capitalize(str) {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
  if (!str || typeof str !== "string") return "";
  return str.split("").reverse().join("");
}

function countVowels(str) {
  if (!str || typeof str !== "string") return 0;
  const vowels = str.match(/[aeiouAEIOU]/g);
  return vowels ? vowels.length : 0;
}

module.exports = {
  capitalize,
  reverseString,
  countVowels
};
