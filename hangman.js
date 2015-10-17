var initObj = {
    'email': 'rickbyeh@gmail.com'
};
var initObjString = JSON.stringify(initObj);

var gameState = {};
var url = 'http://hangman.coursera.org/hangman/game';
var gameUrl ;


// send an object to start the game with email
function startGame() {
    var newGameUrl = url + '?data=' + initObjString + '&callback=?';

    $.getJSON(newGameUrl, processResponse);
    
}

function guessLetter(letter) {
    var guess = JSON.stringify({
        'guess': letter
    });

    $.getJSON(gameUrl + '?data=' + guess + '&callback=?', processResponse);
}


function processResponse(obj) {
    console.log(obj);
    gameState = obj;
    gameUrl = url + '/' + gameState.game_key;
}

$(document).ready(function() {
    startGame();
});