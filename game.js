var gamePattern = [] ;
var count = 0 ;
var userClickedPattern = [] ;
var start = false;
var buttonColours = ["red", "blue", "green", "yellow"]; 

function checkAnswer(currentLevel){
    if ( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    // in case the wrong sequence 
    else{
        // first action
        playSound('wrong');
        $("body").addClass("game-over");
        $("h1").text('Game over ! , Press Any Key to Reset ');
        // the second action 
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
        // reset the game 
        startOver();
    }
}

function playSound(name) { 
    var song ="sounds/"+name+".mp3";
    var audio = new Audio(song);
    audio.play();
}

function flash(randomChosenColour){
    $('#'+randomChosenColour).fadeIn(100).fadeIn(100).fadeOut(100).fadeIn(100); // used to make flash
}

function animatePress(currentColour){
    document.querySelector("#"+currentColour).classList.add('pressed');
    setTimeout(function(){document.querySelector("#"+currentColour).classList.remove('pressed');},100);
}

function nextSequence(){
    userClickedPattern = [] ; // to start a clear the old pattern & to new pattern or (sequence) 
    count++; // level of the game 
    $('h1').text('level '+count);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    flash(randomChosenColour);
    playSound(randomChosenColour);
}

function startOver(){
    gamePattern = [];
    count = 0 ;
    start = false ;    
}

$(document).keypress(function (e) { 
    if (!start){
        $("h1").text("level "+count);
        nextSequence();
        start = true ;
    }
});

    
$('.btn').click(function (e) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


