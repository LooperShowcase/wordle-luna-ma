const express = require("express");
const app = express();
const word = "LUCKY";
app.get("/wordle/:guess", function (req, res) {
  const letterMap = {
    L: 1,
    U: 1,
    C: 1,
    K: 1,
    Y: 1,
  };
  const resArr = ["", "", "", "", ""];
  const userGuess = req.params.guess;
  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] === word[i]) {
      resArr[i] = "green";
      let currentChar = word[i];
      letterMap[currentChar]--;
    }
  }

  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] !== word[i]) {
      let currentChar = userGuess[i];
      if (letterMap[currentChar] === undefined) {
        resArr[i] = "grey";
      } else if (letterMap[currentChar] > 0) {
        resArr[i] = "yellow";
        letterMap[currentChar]--;
      } else {
        resArr[i] = "grey";
      }
    }
  }
  res.send(resArr);
});

app.use(express.static("public"));

app.listen(3000);
