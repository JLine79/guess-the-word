const guessedLetters = document.querySelector(".guessed-letters")
const guess = document.querySelector(".guess")
const letter = document.querySelector(".letter")
const letterForm = document.querySelector(".guess-form")
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuessesElement = document.querySelector(".remaining")
const message = document.querySelector(".message")
const playAgain = document.querySelector(".play-again")
let word;
const storedLetters = []
let remainingGuesses = 8
const remainingGuessesSpan = document.querySelector(".remaining span")

const getWord = async function () {
    const data = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const convertData = await data.text()
    /*console.log(convertData)*/
    const wordArray = convertData.split("\n")
    /*console.log(wordArray)*/
    const randomWord = Math.floor(Math.random() * wordArray.length)
    word = wordArray[randomWord]
    word.trim()
    blankLetters(word)
}

getWord()

//blankLetters function: Create placeholders for each letter
const blankLetters = function (word) {
    const wordGuess = []    
        for (let letter of word) {
        wordGuess.push("●")
    }    
    wordInProgress.innerText = wordGuess.join("")
}

//Event (button click) function: Store letter on button click and clear form
guess.addEventListener("click", function (e) {
    e.preventDefault(); //empty message text
    message.innerText = "";
    const storedGuess = letter.value; //letter entered by player
    const validGuess = letterGuess(storedGuess); //check input is a letter
    if (validGuess) {
        makeGuess(storedGuess)
    }
    letter.value = "";
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
    const letterField = document.querySelector(".guess-form")
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
    letterField.reset() //reset letter entry box
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
        word = word.toUpperCase()
        const wordArray = word.split("")
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

//Count number of guesses
const letterCountdown = function (guess){
    const upperWord = guess.toUpperCase()
    if (word.includes(upperWord)) {
        message.innerText = "You got one! Keep guessing!"
    }

    else {
        message.innerText = "Nope! Try again!"
        remainingGuesses -= 1
    }

    if (remainingGuesses === 0) {
        message.innerText = `Sorry, you've run out of guesses. The word was ${word}`
        remainingGuessesElement.innerText = ""
    }

    if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = "1 guess"
    }

    if (remainingGuesses > 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    }
}

//check if player guessed the word
const guessCorrect = function (word) {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win")
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats</p>`
    }
}

