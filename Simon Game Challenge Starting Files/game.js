var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animateButton(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
    console.log("Game Pattern: ", gamePattern); 
    return randomChosenColour;
}
function animateButton(colour) {
    $("#" + colour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
function playSound(colour) {
    var soundFile = $("#" + colour).data("sound");
    var audio = new Audio(soundFile);
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100); 
}


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);
     animateButton(userChosenColour);
     playSound(userChosenColour);
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern);
    
});

$(document).on("keypress", function() {
    if (!gameStarted) {
        $("h1").text("Level " + level);
        nextSequence();
        gameStarted = true;

    }
    
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
            $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}