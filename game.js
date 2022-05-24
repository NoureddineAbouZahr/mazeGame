
window.onload = function () {
    let savedScore = localStorage.getItem('score');
     window.minutesLabel = document.getElementById("minutes");
    window.secondsLabel = document.getElementById("seconds");
    window.totalSeconds=0;
    window.minutes1Label=document.getElementById('minutes1');
    window.seconds1Label=document.getElementById('seconds1');
    
   
    let game = {
        active: false,
        score: savedScore === null ? 0 : parseInt(savedScore),
        status: "Begin by moving your mouse over the \"S\"",
    }
    window.game = game;
    let start = document.getElementById("start");
    let end = document.getElementById("end");

    window.boundaries = Array.from(document.querySelectorAll("#game > .boundary"));

    boundaries[1].innerText = 'Score: ' + game.score;
    boundaries[1].style.textAlign = 'center'

    window.reset = document.getElementsByClassName("example")[0]

    reset.innerText = "Reset Score"
    reset.style = `
        text-align: center;
        font-weight: bold;
        user-select: none;
        cursor: pointer
    `
    reset.addEventListener('click', function () {
        game.score = 0;
        showScore();
    })

    window.state = document.getElementById("status")
    start.addEventListener('mouseover', startGame);
    end.addEventListener('mouseover', endGame);
    var gameelem = document.getElementById("game")
    gameelem.addEventListener('mouseleave', function () {
        if (game.active) {
            lose()
        }
    })
    boundaries.forEach(boundary => {
        boundary.addEventListener('mouseover', function () {
            if (game.active) {
                lose();
            }
        })
    })
    
}
function lose() {
    game.active = false;
    
    boundaries.forEach(boundary => {
        boundary.classList.add("youlose")

    })

    game.score -= 10;
    if (game.score < 0) {
        game.score = 0;
    }

    showScore();
    state.innerText = "You Lose!"
    state.style.color = "red"
    lastTime();
    resetLive();
    clearInterval(time);
    
}
function defualt() {//reset colors 
    boundaries.forEach(boundary => {
        boundary.classList.remove("youlose")
    })
}
function startGame() {
    game.active = true;
   totalSeconds=0;
    window.time=setInterval(setTime,1000);
    
    
   
    
    defualt(boundaries);
    state.innerText = "Begin by moving your mouse over the \"S\"."
    state.style.color = "black"
    
}
function endGame() {
    if (game.active) {
        game.active = false;
        state.innerText = "You Win!"
        state.style.color = "rgb(0,200,0)"
        game.score += 5;
 
        
    }
    lastTime();
    resetLive();

}
function showScore() {
    boundaries[1].innerText = 'Score: ' + game.score;
    localStorage.setItem('score', game.score)//saving score on reload
}
function setTime(){
    
    ++totalSeconds;
    secondsLabel.innerHTML=pad(totalSeconds%60);
    minutesLabel.innerHTML=pad(parseInt(totalSeconds/60));}
   

    

function pad(val){
var valString=val+"";
if(valString.length<2)
{
    return "0" +valString;
}
else{
    return valString;
}
}
function resetLive(){
    
    secondsLabel.innerHTML=pad(0);
    minutesLabel.innerHTML=pad(parseInt(0));
    clearInterval(time);
  
}
function lastTime(){
    minutes1Label.innerHTML=minutesLabel.innerHTML;
    seconds1Label.innerHTML=secondsLabel.innerHTML;
}
