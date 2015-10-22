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
    $('#guesses').text(gameState.num_tries_left);
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

$(document).ready(function() {
    startGame();
});