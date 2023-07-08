var buttonColors = ["red", "blue", "green", "yellow"];
var pattern = [];
var playerPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    var random = Math.floor(Math.random() * (3 - 0 + 1) + 0);
    var chosenColor = buttonColors[random];
    pattern.push(chosenColor);

    animateSound(chosenColor);

    level++;
    $("h1").text("level " + level);
}

function animateSound(color){
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function checkAnswer(current){
    if(playerPattern[current] === pattern[current]){
        if(playerPattern.length == pattern.length){
            playerPattern = [];
            setTimeout(function(){
            nextSequence();
             }, 1000);
        }
    }else {
        pattern = [];
        playerPattern = [];
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game over, Press Any Key To Start")
        $("body").css("background-color", "red");
        setTimeout(function(){
            $("body").css("background-color", "#011F3F");
        }, 300);

        restart();
    }    
} 
    

function restart(){
    level = 0;
    pattern = [];
    playerPattern = [];
    started = false;
    gameStart();
}

function gameStart(){
    $("body").keypress(function(){
        if(started == false){
            nextSequence();
            started = true;
        }
    });
}

$(".btn").click(function(){
    animateSound(this.id);
    playerPattern.push(this.id);
    checkAnswer(playerPattern.length - 1);
});

gameStart();

