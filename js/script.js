const guessedLetters = document.querySelector(".guessed-letters")
const guessButton = document.querySelector(".guess")
const letterInput = document.querySelector(".letter")
const letterForm = document.querySelector(".guess-form")
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuessesElement = document.querySelector(".remaining")
const remainingGuessesSpan = document.querySelector(".remaining span") //No. guesses remaining
const message = document.querySelector(".message")
const playAgain = document.querySelector(".play-again")

let word = "magnolia"
let storedLetters = []
let remainingGuesses = 8

const getWord = async function () {
    const data = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const convertData = await data.text()
    /*console.log(convertData)*/
    const wordArray = convertData.split("\n")
    /*console.log(wordArray)*/
    const randomWord = Math.floor(Math.random() * wordArray.length)
    word = wordArray[randomWord].trim()
    blankLetters(word)
}

getWord() //start game

//blankLetters function: Create placeholders for each letter
const blankLetters = function (word) {
    const wordGuess = []    
        for (const letter of word) {
        wordGuess.push("●")
    }    
    wordInProgress.innerText = wordGuess.join("")
}

//Event (button click) function: Store letter on button click and clear form
guessButton.addEventListener("click", function (e) {
    e.preventDefault(); //empty message text
    message.innerText = "";
    const storedGuess = letterInput.value; //letter entered by player
    const validGuess = letterGuess(storedGuess); //check input is a letter
    if (validGuess) {
        makeGuess(storedGuess)
    }
    letterInput.value = "";
    letterForm.reset();
});

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

//makeGuess function: Submit valid letter and check against word
const makeGuess = function (letter) {
    letter = letter.toUpperCase()
    if (storedLetters.includes(letter)) { 
        message.innerText = "Oops! You've tried that one already." //alert letter already used
    }

    else {
        storedLetters.push(letter) //add to stored array
        showGuesses() //display letters guessed on page
        letterCountdown(letter) //reduce number of guesses remaining if letter is wrong
        wordUpdate(storedLetters) //add correct letter to placeholder in word
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

//update word with correctly guessed letters
const wordUpdate = function (storedLetters) {
    wordUpper = word.toUpperCase()
    const wordArray = wordUpper.split("")
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
guessCorrect()
}

//Count number of guesses
const letterCountdown = function (guess){
    const upperWord = word.toUpperCase()
    if (!upperWord.includes(guess)) {
        message.innerText = "Nope! Try again!"
        remainingGuesses -= 1
    }

    else {
        message.innerText = "You got one! Keep guessing!"
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Sorry, you've run out of guesses. The word was ${word}`
        remainingGuessesElement.innerText = ""
        startOver()
    }

    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`
    }

    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    }
}

//check if player guessed the word
const guessCorrect = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win")
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
        
        startOver()
    }
}

//Start game again
const startOver = function () {
    guessButton.classList.add("hide")
    remainingGuessesElement.classList.add("hide")
    guessedLetters.classList.add("hide")
    playAgain.classList.remove("hide")   
}

//Play again click event
playAgain.addEventListener("click", function () {
    //reset & add new word
    message.classList.remove("win")
    message.innerText = ""
    remainingGuessesElement.innerHTML = ""
    guessedLetters.innerHTML = ""
    wordInProgress.innerHTML = ""
    remainingGuesses = 8
    storedLetters = []
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    
    getWord()

    guessButton.classList.remove("hide")
    remainingGuessesElement.classList.remove("hide")
    guessedLetters.classList.remove("hide")
    playAgain.classList.add("hide")
})