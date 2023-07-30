var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSquence();
        started=true;
    }
});

function nextSquence(){

    userClickedPattern=[];
    level++;

    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);   
    
    var randomChosenColour=buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function() {
    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSquence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over,Press Any Button To Restart");

        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}