// var url = 'http://hangman.coursera.org/hangman/game';
var url = 'http://hangman-server.herokuapp.com';
// var url = 'http://localhost:12345';

var gameState = {
    game_key: undefined,
    phrase: '',
    state: '',
    missedLetters: []
};

// Function that starts the game
function startGame() {
    var initObj = JSON.stringify({
        'email': 'rickbyeh@gmail.com'
    });

    // Create URL to request a new game from server with JSONP
    var newGameUrl = url + '?data=' + initObj + '&callback=?';
    console.log(newGameUrl);

    $.getJSON(newGameUrl, processResponse);   
}

function updateBoard() {
    $('#gameBoard').text(gameState.phrase);
    if (endGameCheck()) {
        $('#guesses').text(gameState.num_tries_left);
    } else {
        if (gameState.state === 'won') {
            setTimeout(function() {
                alert('Congratulations, you won!');
            }, 750);
        } else if (gameState.state === 'lost') {
            alert('Doh!  You lost.  Try again!');
        } else {
            alert('Error');
        }
        $('.guessLetter').off(); // Turn off all click handlers for guessing
    }
}

function endGameCheck() {
    if (gameState.state === 'alive') {
        return true;
    } else {
        return false;
    }
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

    // Highlight color as red on incorrect guess
    if (obj.missedLetters) {
        if (gameState.missedLetters.length < obj.missedLetters.length) { // Miss
            $('#guess' + obj.missedLetters.pop().toUpperCase()).addClass('incorrect');
        }
    }

    gameState = obj;
    updateBoard();
}

// Function to reset the UI and start a new game
function resetGame() {
    $('.guessLetter').removeClass('disabled', 1000); // Reset letters to normal color
    $('.guessLetter').removeClass('incorrect', 1000);
    $('.guessLetter').off();
    $('.guessLetter').on('click', function() {
        guessLetter($(this).text());
        $(this).addClass('disabled');
    });
    startGame();
}

function initClickHandlers() {
    // var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    //                 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    //                 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    //                 'Y', 'Z'];

    // function closureFcn(letter) {
    //     return function() {
    //         guessLetter(letter);
    //         $(this).addClass('disabled');
    //     };
    // }

    // for (var i = 0; i < alphabet.length; i++) {
    //     $('#guess' + alphabet[i]).click(closureFcn(alphabet[i]));
    // }

    $('.guessLetter').on('click', function() {
        guessLetter($(this).text());
        $(this).addClass('disabled');
    });

    $('#newPuzzle').click(function() {
        resetGame();
    });
}

$(document).ready(function() {
    startGame();
    initClickHandlers();
});