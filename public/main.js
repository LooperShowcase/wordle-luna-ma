const NUMBER_OF_WORDS = 6;
const NUMBER_OF_CHARS = 5;

let containerDiv = document.getElementById("container");

for (let i = 0; i < NUMBER_OF_WORDS; i++) {
  let word = document.createElement("div");
  word.className = "word";

  for (let j = 0; j < NUMBER_OF_CHARS; j++) {
    let char = document.createElement("div");
    char.className = "char";
    word.appendChild(char);
  }
  containerDiv.appendChild(word);
}

let currentChar = 0;
let currentWord = 0;
addEventListener("keydown", (event) => {
  if (event.key === "Backspace" && currentChar > 0) {
    let wordDiv = containerDiv.children[currentWord];
    let charToDel = wordDiv.children[currentChar - 1];
    charToDel.innerHTML = "";
    currentChar--;
    animateCSS(charToDel, "pulse");
  } else if (isLetter(event.key)) {
    let letter = event.key;
    let wordDiv = containerDiv.children[currentWord];
    if (currentChar < NUMBER_OF_CHARS) {
      let charDiv = wordDiv.children[currentChar];
      charDiv.innerHTML = letter.toUpperCase();
      currentChar++;
      animateCSS(charDiv, "pulse");
    }
  } else if (
    event.key === "Enter" &&
    currentWord < NUMBER_OF_WORDS &&
    currentChar === 5
  ) {
    let wordDiv = containerDiv.children[currentWord];
    getWord();
    currentWord++;
    currentChar = 0;
    animateCSS(wordDiv, "tada");
  }
});

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    element.classList.add(`${prefix}animated`, animationName);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });

function getWord() {
  let wordDiv = containerDiv.children[currentWord];
  let word = "";
  for (let i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  console.log("word is:" + word);
  return word;
}
