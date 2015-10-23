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

function resetGame() {
    startGame();
    updateBoard();
}

function initClickHandlers() {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
                    "I", "J", "K", "L", "M", "N", "O", "P",
                    "Q", "R", "S", "T", "U", "V", "W", "X",
                    "Y", "Z"]

    // for (var i = 65; i <= 90 ; i++) {
    //     array.push(String.fromCharCode(i));
    // }

    function closureFcn(i) {
        return function() {
            guessLetter(alphabet[i]);
            $(this).addClass('disabled');
        }
    }

    for (var i = 0; i < alphabet.length; i++) {
        $('#guess' + alphabet[i]).click(closureFcn(i));
    }



    // $('#guessA').click(function(){ guessLetter('A'); $(this).addClass('disabled');} );
    // $('#guessB').click(function(){ guessLetter('B');} );
    // $('#guessC').click(function(){ guessLetter('C');} );
    // $('#guessD').click(function(){ guessLetter('D');} );
    // $('#guessE').click(function(){ guessLetter('E');} );
    // $('#guessF').click(function(){ guessLetter('F');} );
    // $('#guessG').click(function(){ guessLetter('G');} );
    // $('#guessH').click(function(){ guessLetter('H');} );
    // $('#guessI').click(function(){ guessLetter('I');} );
    // $('#guessJ').click(function(){ guessLetter('J');} );
    // $('#guessK').click(function(){ guessLetter('K');} );
    // $('#guessL').click(function(){ guessLetter('L');} );
    // $('#guessM').click(function(){ guessLetter('M');} );
    // $('#guessN').click(function(){ guessLetter('N');} );
    // $('#guessO').click(function(){ guessLetter('O');} );
    // $('#guessP').click(function(){ guessLetter('P');} );
    // $('#guessQ').click(function(){ guessLetter('Q');} );
    // $('#guessR').click(function(){ guessLetter('R');} );
    // $('#guessS').click(function(){ guessLetter('S');} );
    // $('#guessT').click(function(){ guessLetter('T');} );
    // $('#guessU').click(function(){ guessLetter('U');} );
    // $('#guessV').click(function(){ guessLetter('V');} );
    // $('#guessW').click(function(){ guessLetter('W');} );
    // $('#guessX').click(function(){ guessLetter('X');} );
    // $('#guessY').click(function(){ guessLetter('Y');} );
    // $('#guessZ').click(function(){ guessLetter('Z');} );
    $('#newPuzzle').click(function() {
        resetGame();
    });
}

$(document).ready(function() {
    startGame();
    initClickHandlers();
});