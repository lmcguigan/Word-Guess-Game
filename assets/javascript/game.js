//these variables used to track whether the modals are up so that the onkeyup doesn't run unless they've moved on
var isIntroModalUp = true;
var isGuessModalUp = false;

//get the intro modal
var modal = document.getElementById('myModal');

//get the x that closes the intro modal
var span = document.getElementsByClassName("close")[0];

//get the guessedIt modal - appears only when user has guessed whole word correctly
var guessedItPop = document.getElementById('guessedIt');

//get the wonGame modal - appears only when user has guessed all words
var wonGamePop = document.getElementById("wonGame");

//get the lostGame modal - appears only when user has run out of guesses
var lostGamePop = document.getElementById("lostGame");

//when user clicks the x, close the intro modal
span.onclick = function () {
    modal.style.display = "none";
    isIntroModalUp = false;
}

// When the user clicks anywhere outside of the intro modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        isIntroModalUp = false;
    }
}
//array to store all the letters of the alphabet to check if user input is actually a letter
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//word array stores all the sub-arrays that contain the letters of each word
var words = new Array();
words[0] = new Array("c", "i", "r", "c", "l", "e");
words[1] = new Array("s", "q", "u", "a", "r", "e");
words[2] = new Array("t", "r", "i", "a", "n", "g", "l", "e");
words[3] = new Array("s", "p", "h", "e", "r", "e");
words[4] = new Array("p", "y", "r", "a", "m", "i", "d");
words[5] = new Array("c", "o", "n", "e");
words[6] = new Array("c", "y", "l", "i", "n", "d", "e", "r");
words[7] = new Array("c", "u", "b", "e");
words[8] = new Array("t", "r", "a", "p", "e", "z", "o", "i", "d");
words[9] = new Array("r", "e", "c", "t", "a", "n", "g", "l", "e");
words[10] = new Array("r", "h", "o", "m", "b", "u", "s");
words[11] = new Array("p", "a", "r", "a", "l", "l", "e", "l", "o", "g", "a", "m");

//On start, computer chooses random number between 0 and words.length as index to choose the randomWord
var randomWord = words[Math.floor(Math.random() * words.length)];

//Starting Values for Counter Variables
var guessesRemaining = 15;
var wins = 0;
var remainingWords = words.length;

//Empty Arrays for Correct Guesses and Incorrect Guesses
var trackCorrectGuesses = [];
var incorrectGuesses = [];

//the current variable helps us keep track of what the current randomWord is so we can remove it from the array when user has guessed it
var current = words.indexOf(randomWord);

//Load _ for each letter
for (var i = 0; i < randomWord.length; i++) {
    trackCorrectGuesses.push("_")
}
var nospaces = document.getElementById("wordspaces");
nospaces.innerHTML = trackCorrectGuesses.join(" ");
var guessNoSpace = document.getElementById("guesslist");
guessNoSpace.innerHTML = incorrectGuesses.join(" ");
document.getElementById("remainCount").innerHTML = guessesRemaining;
document.getElementById("winCount").innerHTML = wins;
document.getElementById("remainWords").innerHTML = remainingWords;
//When every letter in the array has been guessed, win counts increases by one
document.onkeyup = function (event) {
    var letter = event.key.toLowerCase();
    var alphabetPosition = alphabet.indexOf(letter);
    //Letter is not in randomWords
    //Does not allow for key selection outside alphabet to effect the game
    //Only allows guessing after closing modals
    if (randomWord.indexOf(letter) === -1 && alphabet.indexOf(letter) !== -1 && isIntroModalUp === false && isGuessModalUp === false) {
        //taking the letter out of the alphabet array makes it so user can't guess same incorrect letter twice
        alphabet.splice(alphabetPosition, 1);
        //pushes incorrect letter to incorrectGuesses Array
        incorrectGuesses.push(letter);
        guessNoSpace.innerHTML = incorrectGuesses.join(" ");
        nospaces.innerHTML = trackCorrectGuesses.join(" ");
        guessesRemaining--;
        document.getElementById("remainCount").innerHTML = guessesRemaining;
    }
    //Letter is in randomWord
    else if (randomWord.indexOf(letter) !== -1 && alphabet.indexOf(letter) !== -1 && isIntroModalUp === false && isGuessModalUp === false) {
        //replace _ with letter
        for (var q = 0; q < randomWord.length; q++) {
            if (randomWord[q] === letter) {
                trackCorrectGuesses[q] = letter;
            }
        }
        //taking the letter out of the alphabet array makes it so user can't keep racking up points by guessing same correct letter
        alphabet.splice(alphabetPosition, 1);
        nospaces.innerHTML = trackCorrectGuesses.join(" ");
        if ((trackCorrectGuesses.indexOf("_") === -1) && (remainingWords > 0)) {
            guessedItPop.style.display = "block";
            isGuessModalUp = true;
            remainingWords--;
            wins++;
            document.getElementById("winCount").innerHTML = wins;
        }
    }
    var closebutton = document.getElementById("closeit");

    closebutton.onclick = function () {
        isGuessModalUp = false;
        //removes the guessed word from the words array
        words.splice(current, 1);
        //replenish the alphabet for each new word
        alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        document.getElementById("remainWords").innerHTML = remainingWords;
        guessedIt.style.display = "none";
        randomWord = words[Math.floor(Math.random() * words.length)];
        current = words.indexOf(randomWord);
        trackCorrectGuesses = [];
        incorrectGuesses = [];
        guessNoSpace.innerHTML = incorrectGuesses.join(" ");
        for (var i = 0; i < randomWord.length; i++) {
            trackCorrectGuesses.push("_")
            nospaces.innerHTML = trackCorrectGuesses.join(" ");
        }
    }
    nospaces.innerHTML = trackCorrectGuesses.join(" ");

    //end game when they run out of guesses.
    if (guessesRemaining === 0) {
        lostGamePop.style.display = "block";
        document.getElementById("wordspaces").style.display = "none";
        document.getElementById("scoreboard").style.display = "none";
        document.getElementById("guessedbox").style.display = "none";
    }
    var reloadbutton = document.getElementById("reload");
    reloadbutton.onclick = function () {
        location.reload();
    }

    var reloadtwobutton = document.getElementById("reloadtwo");
    reloadtwobutton.onclick = function () {
        location.reload();
    }

    if (remainingWords === 0) {
        wonGamePop.style.display = "block";
        wins++;
        document.getElementById("wordspaces").style.display = "none";
        document.getElementById("scoreboard").style.display = "none";
        document.getElementById("guessedbox").style.display = "none";
    }
}
