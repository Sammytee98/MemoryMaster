var buttonColors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Start the game on the first keypress
$(document).keypress(function() {
    if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
});

// Detect user button clicks
$('.btn').click(function() {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Check the user's answer after each click
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    // Verify if the user's current input matches the game pattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // Check if the user completed the sequence
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        
    }
    else{
        // Play 'wrong' sound and trigger game-over effects 
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');

        // Remove the game-over effect after a short delay
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);

        // Reset the game if user loses
        startOver();
    }
}


function nextSequence() {
    userClickedPattern = []; // Reset user's pattern for the next level
    level++;
    $('#level-title').text('level ' + level);

    // Choose a random color for the next sequence and add it to the game pattern
    var randomNumber =  Math.floor(Math.random() * buttonColors.length);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Animate the choosen color
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Play sound associated with color
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// Animate button press effect
function animatePress (currentColor) {
    $('#' + currentColor).addClass('pressed');

    setTimeout(function() {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

// Reset game variables for a new start
function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }