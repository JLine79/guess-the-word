const guessedLetters = document.querySelector(".guessed-letters")
const guess = document.querySelector(".guess")
const letter = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuesses = document.querySelector(".remaining")
const message = document.querySelector(".message")
const playAgain = document.querySelector(".play-again")
const word = "magnolia"
const storedLetters = []

//create placeholders for each letter
const blankLetters = function (word) {
    const wordGuess = []    
        for (let letter of word) {
        wordGuess.push("●")
    }    
    wordInProgress.innerText = wordGuess.join("")
}

blankLetters(word);

//store letter on click and clear form
guess.addEventListener("click", function (e) {
    e.preventDefault();
    let inputValue = letter.value
    console.log(inputValue)
    letter.value = ""
    message.innerText = ""
    const storedGuess = letterGuess(inputValue)
    if (storedGuess !== undefined) {
        makeGuess(storedGuess)
    }
    /*console.log(storedGuess)*/
})

//check letter is valid
const letterGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        message.innerText = "Have a guess!"
    } 
    
    else if (input.length > 1) {
        message.innerText = "One letter at a time, eager beaver!"
    } 
    
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only please!"
    }

    else {
        return input 
    }
}

const makeGuess = function (letter) {
    letter.toUpperCase()
    if (!storedLetters.includes(letter)) {
        storedLetters.push(letter)
    }

    else {
        message.innerText = "Oops! You've tried that one already."
    }
    console.log(storedLetters)
}