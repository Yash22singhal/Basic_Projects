var userClickedPattern = [];

var gamePattern = [];

var buttonColours= ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    animatePress(randomChosenColour);
    playSound(randomChosenColour)
    gamePattern.push(randomChosenColour);
}

$(".btn").on('click', function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log("game : " + gamePattern);
    console.log("user : " + userClickedPattern);
    checkAnswer((userClickedPattern.length)-1);
})

function playSound(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed").dequeue().delay(100).queue(function () {
        $(this).removeClass("pressed");});
}

$('body').on('click', function(){
    if (!started){
        nextSequence();
        started = true;
    }
   
});

function startOver(){
    started = false;
    level = 0;
    gamePattern = []
}

function checkAnswer(currentLevel){
        if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
            if (gamePattern.length == userClickedPattern.length){
                setTimeout(function(){nextSequence()}, 1000);
            }
        }
        else{
            $("body").addClass("game-over").dequeue().delay(200).queue(function(){
                $(this).removeClass("game-over");});
            playSound("wrong");
            $("#level-title").text("GAME OVER, PRESS ANY KEY TO RESTART");
            startOver();
        }
        
}
