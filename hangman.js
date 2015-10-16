var server = 'http://hangman.coursera.org/hangman/game';
var initObj = {
    'email': 'rickbyeh@gmail.com'
};

// send an object to start the game with email
function startGame() {
    $.get(server, initObj, function(data) {
        console.log(data);
    });

    $.getJSON(server, initObj, function(data) {
        console.log(data);
    });
}

function promptForLetter() {

}

function guessLetter(letter) {

}

startGame();