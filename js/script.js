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

//store letter on button click and clear form
guess.addEventListener("click", function (e) {
    e.preventDefault(); //empty message text
    message.innerText = ""
    const storedGuess = letter.value
    if (storedGuess !== undefined) {
        makeGuess(storedGuess)
    }
    letter.value = ""
})

//check letter is valid
const letterGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        message.innerText = "Have a guess!"
    } 

//check only one letter is entered
    else if (input.length > 1) {
        message.innerText = "One letter at a time, eager beaver!"
    } 

//check input is a letter
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Letters only please!"
    }

//return letter for array
    else {
        return input 
    }
}

const makeGuess = function (letter) {
    letter = letter.toUpperCase()
    if (storedLetters.includes(letter)) { 
        message.innerText = "Oops! You've tried that one already." //alert letter already used
    }

    else {
        storedLetters.push(letter)
        showGuesses()
        wordUpdate(storedLetters)
    }
}

//create list of guessed letters from stored array
const showGuesses = function () {
    guessedLetters.innerHTML = ""
    for (const letter of storedLetters) {
        const newLetter = document.createElement("li")
        newLetter.innerText = letter
        guessedLetters.append(newLetter)
    }
}

//update word in progress
const wordUpdate = function (storedLetters) {
    const wordUpper = word.toUpperCase()
    const wordArray = wordUpper.split("")
    /*console.log(wordArray)*/
    const guessedWord = []
    for (const letter of wordArray){
        if (storedLetters.includes(letter)){
            guessedWord.push(letter.toUpperCase())
        }

        else {
            guessedWord.push("●")
        }
    }
    wordInProgress.innerText = guessedWord.join("")
    guessCorrect(word)
}

//check if player guessed the word
const guessCorrect = function (word) {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win")
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats</p>`
    }
}