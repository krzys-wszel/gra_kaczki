
// ========= GAME VARIABLES =========
let points;
let shots;
let bullets = 0;
let topScore = 0;
let escapeDuckSeconds = 0;
let counterToEscapeDuck;
let table;
let position;

// Duck
const duck = document.createElement('img');
$(duck).addClass('position-absolute');
$(duck).attr('id', 'duck');
$(duck).attr('src', '../img/duck_outline_target_yellow.png');

// Bullets
const bullet = $('<img>').attr({
    'src': '../img/bullet.png'
});
$(bullet).addClass('bullet');

// Game field
const gameField = document.createElement('table');
$(gameField).addClass('table w-100 h-100 position-relative').addClass('pistol');

for (let i = 0; i < 9; i++) {
    const tableRow = document.createElement('tr');
    $(gameField).append(tableRow);
    for (let i = 0; i < 14; i++) {
        const tableCell = document.createElement('td');
        $(tableRow).append(tableCell);
    }
}

// Clear Window in Game
const clearWindow = document.createElement('div');
$(clearWindow).addClass('d-flex flex-column justify-content-center align-items-center w-100 h-100 bg-empty');

// Menu Window
const menuWindow = document.createElement('div');
$(menuWindow).addClass('d-flex flex-column text-center justify-content-center align-items-center w-100 h-100 bg-menu');



// ========= FUNCTIONS =========
function startGame() {
    soundStart.play();
    $('.scores').css('display', 'flex');
    $('#score-window').css('border-bottom', '2px solid');
    $('#main-game').empty();
    $('#main-game').append(gameField);
    $('td').empty();
    points = 0;
    bullets = 3;
    $('#points').text(points);

    $('#bullets').empty();
    $('#bullets').append(bullet);
    $(bullet).clone().appendTo('#bullets');
    $(bullet).clone().appendTo('#bullets');

    table = $('table');   // Whole table is playing field
    $position = $('td');    // Table cell is position for target
    createFirstDuck();
    animateFirstDuck();
    escape();   //Start count to duck escape
}

function gameOver() {
    bullets = 0;
    escapeStop(); //Start count to duck escape

    $('#main-game').empty();
    $(clearWindow).empty();

    $('#main-game').append(clearWindow);
    if (points > topScore) {
        soundTopScore.play();
        $(clearWindow).append(nGameOver)
            .append(nTopScore)
            .append(nTryAgain);
        topScore = points;
        $('#top-score').text(topScore);
    } else {
        soundGameOver.play();
        $(clearWindow).append(nGameOver)
            .append(nTryAgain);
    }
}
function positionRandom() {
    return Math.floor(Math.random() * ($position.length - 56)) + 56;
}

function createFirstDuck() {
    let positionStart = positionRandom();
    $position[positionStart].append(duck);
}

function animateDuck() {
    $(duck).finish();
    $(duck).removeAttr('style');
    let yPos = $(duck).position().top;
    let lPos = $(duck).position().left;
    let xCenter = Math.floor(Math.random() * $('#main-game').width()) + 1;
    let el = event.target;
    let r = Math.round(Math.random());

    if (r == 1) {
        $(el).animate({
            right: '0px',
            top: yPos / 2
        }, 4000)
            .animate({
                right: xCenter,
                top: '-50px'
            }, 4000)
    } else {
        $(el).animate({
            left: '25px',
            top: yPos / 2
        }, 4000)
            .animate({
                left: xCenter,
                top: '-50px'
            }, 4000)
    }
}

function animateFirstDuck() {
    $(duck).finish();
    $(duck).removeAttr('style');
    let yPos = $(duck).position().top;
    let lPos = $(duck).position().left;
    let xCenter = Math.floor(Math.random() * $('#main-game').width()) + 1;
    let r = Math.round(Math.random());

    if (r == 1) {
        $(duck).animate({
            right: '0px',
            top: yPos / 2
        }, 4000)
            .animate({
                right: xCenter,
                top: '-50px'
            }, 4000)
    } else {
        $(duck).animate({
            left: '25px',
            top: yPos / 2
        }, 4000)
            .animate({
                left: xCenter,
                top: '-50px',
            }, 4000)
    }
}

function escape() {
    counterToEscapeDuck = setInterval(function () {
        escapeDuckSeconds++;
        if (escapeDuckSeconds == 8) {
            soundFlew.play();
            $(duck).remove();
            $($position[$position.length / 2]).append(nDuckFlewAway);
            setTimeout(function () {
                gameOver();
            }, 2000);
        }
    }, 1000);
}

function escapeStop() {
    clearInterval(counterToEscapeDuck);
    escapeDuckSeconds = 0;
}


// ========= TEXT NOTIFICATIONS =========

// Game Over
const nGameOver = document.createElement('p');
$(nGameOver).addClass('n-game-over');
$(nGameOver).text('Game Over');

// Duck is gone!
const nDuckFlewAway = document.createElement('p');
$(nDuckFlewAway).addClass('n-flew-away');
$(nDuckFlewAway).text('The duck flew away!');

// Try Again
const nTryAgain = document.createElement('p');
$(nTryAgain).addClass('n-try-again');
$(nTryAgain).addClass('pointer');
$(nTryAgain).text('Try Again');

// New Top Score
const nTopScore = document.createElement('p');
$(nTopScore).addClass('n-top-score');
$(nTopScore).text('Congratulations! You Gained new Top Score!');

// ========= MENU OPTIONS =========

// Start Game
const menuStart = document.createElement('p');
$(menuStart).attr('id', 'start');
$(menuStart).addClass('menu menu-start pointer');
$(menuStart).text('Start Game');

// Instruction
const menuInstruction = document.createElement('p');
$(menuInstruction).attr('id', 'instruction');
$(menuInstruction).addClass('menu menu-instruction pointer');
$(menuInstruction).text('Instructions');

// Credits
const menuCredits = document.createElement('p');
$(menuCredits).attr('id', 'credits');
$(menuCredits).addClass('menu menu-credits pointer');
$(menuCredits).text('Credits');

// Back
const menuBack = document.createElement('p');
$(menuBack).attr('id', 'back');
$(menuBack).addClass('menu menu-back pointer');
$(menuBack).text('Back to Menu');

// --------- Instruction
const instruction1 = document.createElement('p');
$(instruction1).addClass('p-instruction');
$(instruction1).text('This is Duck Hunt game');
const instruction2 = document.createElement('p');
$(instruction2).addClass('p-instruction');
$(instruction2).text('You need shoot to every duck on screen');
const instruction3 = document.createElement('p');
$(instruction3).addClass('p-instruction');
$(instruction3).text('Duck can fly away in 3 seconds!');
const instruction4 = document.createElement('p');
$(instruction4).addClass('p-instruction');
$(instruction4).text('You have 3 bullets max. If you hit the duck correctly, you recive one more bullet.');
const instruction5 = document.createElement('p');
$(instruction5).addClass('p-instruction');
$(instruction5).text('If duck fly away or you lost all bullets then you lose.');
const instruction6 = document.createElement('p');
$(instruction6).addClass('p-instruction');
$(instruction6).text('Good Luck!');

// --------- Credits
const credits1 = document.createElement('p');
$(credits1).addClass('p-credits');
$(credits1).text('Author: ');
const credits11 = document.createElement('span');
$(credits11).addClass('p-credits');
$(credits11).text('Bartlomiej Ambroziak');
const credits2 = document.createElement('p');
$(credits2).addClass('p-credits');
$(credits2).text('Images from: ');
const credits22 = document.createElement('span');
$(credits22).addClass('p-credits');
$(credits22).html('<a target="_blank" href="https://www.kenney.nl">https://www.kenney.nl</a>');




// ========= MAIN GAME ACTIONS =========

$('#main-game').append(menuWindow);
$(menuWindow).append(menuStart).append(menuInstruction).append(menuCredits);

$('#main-game').on('click', function (event) {
    if (event.target.id == 'start') {
        setTimeout(function () {
            startGame();
        }, 1);


    }
    if (event.target.id == 'instruction') {
        $(menuWindow).empty();
        $(menuWindow).append(instruction1).append(instruction2).append(instruction3)
            .append(instruction4).append(instruction5).append(instruction6).append(menuBack);
    }
    if (event.target.id == 'back') {
        $(menuWindow).empty();
        $(menuWindow).append(menuStart).append(menuInstruction).append(menuCredits);
    }
    if (event.target.id == 'credits') {
        $(menuWindow).empty();
        $(menuWindow).append(credits1).append(credits2).append(menuBack);
        $(credits1).append(credits11);
        $(credits2).append(credits22);
    }
});




$('#main-game').on('click', function (event) { // Target hit correct
    if (bullets > 0) {
        soundShot.play();

    }

    if (event.target.id == 'duck') {
        soundDuck.play();
        escapeStop();
        $(event.target).remove();
        points++;
        let posRandom = positionRandom();
        $('#points').text(points);
        $position[posRandom].append(duck);
        animateDuck();
        escape();

        // Max 3 bullets
        if (bullets < 3) {
            bullets += 1;
            $(bullet).clone().appendTo('#bullets');
        }

    } if (event.target.tagName == 'TD') {           // Hit outside the target

        if (bullets > 1) {
            bullets -= 1;
            $('.bullet').last().remove();


            // Bullets = 0 then Game Over
        } else {
            bullets -= 1;
            $('.bullet').last().remove();
            $(duck).remove();
            gameOver();
        }
    }
});


// ========= MENU ELEMENTS =========

$('#main-game').on('click', function (event) {
    if (event.target == nTryAgain) {
        startGame();
        createFirstDuck();
    }
});