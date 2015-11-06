var url = 'http://hangman.coursera.org/hangman/game';
var gameState = {};

// Function that starts the game
function startGame() {
    var initObj = JSON.stringify({
        'email': 'rickbyeh@gmail.com'
    });

    // Create URL to request a new game from server with JSONP
    var newGameUrl = url + '?data=' + initObj + '&callback=?';

    $.getJSON(newGameUrl, processResponse);   
}

function updateBoard() {
    $('#gameBoard').text(gameState.phrase);
    if (endGameCheck()) {
        $('#guesses').text(gameState.num_tries_left);
    }
}

function endGameCheck() {
    if (gameState.state === 'alive') {
        return true;
    } else if (gameState.state === 'won') {
        alert('Congratulations, you won!');
    } else if (gameState.state === 'lost') {
        alert('Doh!  You lost.  Try again!');
    } else {
        alert('Error');
    }

    return false;
}

// Function that guesses the letter provided as a parameter
function guessLetter(letter) {
    var guess = JSON.stringify({'guess': letter});
    var gameUrl = url + '/' + gameState.game_key;

    $.getJSON(gameUrl + '?data=' + guess + '&callback=?', processResponse);
}

// Function to process responses from server.
// Console logs the response object, and updates the global gameState object
function processResponse(obj) {
    console.log(obj);
    gameState = obj;
    updateBoard();
}

function resetGame() {
    $('.guessLetter').removeClass('disabled'); // Reset letters to normal color
    startGame();
}

function initClickHandlers() {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
                    "I", "J", "K", "L", "M", "N", "O", "P",
                    "Q", "R", "S", "T", "U", "V", "W", "X",
                    "Y", "Z"]

    // for (var i = 65; i <= 90 ; i++) {
    //     array.push(String.fromCharCode(i));
    // }

    function closureFcn(letter) {
        return function() {
            guessLetter(letter);
            $(this).addClass('disabled');
        }
    }

    for (var i = 0; i < alphabet.length; i++) {
        $('#guess' + alphabet[i]).click(closureFcn(alphabet[i]));
    }

    $('#newPuzzle').click(function() {
        resetGame();
    });
}

$(document).ready(function() {
    startGame();
    initClickHandlers();
});