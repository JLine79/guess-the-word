const guessedLetters = document.querySelector(".guessed-letters")
const guess = document.querySelector(".guess")
const letter = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuesses = document.querySelector(".remaining")
const message = document.querySelector(".message")
const playAgain = document.querySelector(".play-again")
const word = "magnolia"

const blankLetters = function (word) {
    const wordGuess = []    
        for (let letter of word) {
        wordGuess.push("●")
    }    
    wordInProgress.innerText = wordGuess.join("")
}

blankLetters(word);

guess.addEventListener("click", function (e) {
    e.preventDefault();
    let inputValue = letter.value
    console.log(inputValue)
    letter.value = ""
})