/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Global Variables:
let playerOne = {
    name: "Player 1",
    globalScore: 0,
    roundScore: 0
}
let playerTwo = {
    name: "Player 2",
    globalScore: 0,
    roundScore: 0
}
let player = playerOne;
let currentScore = document.getElementById("current-0");
let totalScore = document.getElementById("score-0");
let playerPanel = document.getElementsByClassName("player-0-panel")[0];

//Sound Effects:
let rollSFX = new Audio("sounds/dice_SFX.mp3");
let loseSFX = new Audio("sounds/lose_SFX.wav");
let holdSFX = new Audio("sounds/hold_SFX.wav");
let winSFX = new Audio("sounds/win_SFX.mp3");

//Dice Roll Animation
function animateRoll () {
    let rollAnimation = document.getElementsByClassName("dice")[0];
    rollAnimation.classList.add("animate-roll");
    rollAnimation.style.animation = 'none';
    rollAnimation.offsetHeight;
    rollAnimation.style.animation = null;
}

//Dice Roll Function
function rollDice () {
    console.log(player.name);
    animateRoll();
    rollSFX.play();
    let dice;
    dice = Math.floor(Math.random() * Math.floor(6)) + 1;
    showDice(dice);
    if (dice > 1) {
        player.roundScore += dice;
        currentScore.innerHTML = "" + player.roundScore;
    }
    else {
        loseSFX.play();
        switchPlayer();
    }
}

//Hold Function
function hold () {
    
    player.globalScore += player.roundScore;
    totalScore.innerHTML = player.globalScore;
    player.roundScore = 0;
    if (player.globalScore >= 100) {
        winSFX.play();
        console.log(`${player.name} has won!`)
        let winScreen = document.getElementsByClassName("win-screen")[0];
        let message = document.getElementById("message");
        message.innerHTML = `${player.name} has won!`
        console.log(winScreen)
        winScreen.style.display = "flex";
    }
    else {
        holdSFX.play();
        switchPlayer();
    } 
}

//Show Dice Function
function showDice (dice) {
    let dicePic = document.getElementsByClassName("dice")[0];
    dicePic.src = `images/dice-${dice}.png`;
}

function switchPlayer () {
    player.roundScore = 0;
    currentScore.innerHTML = player.roundScore;
    playerPanel.classList.remove("active");
    switch (player) {
        case playerOne:
            player = playerTwo;
            currentScore = document.getElementById("current-1");
            totalScore = document.getElementById("score-1");
            playerPanel = document.getElementsByClassName("player-1-panel")[0];
            break;
        case playerTwo:
            player = playerOne;
            currentScore = document.getElementById("current-0");
            totalScore = document.getElementById("score-0");
            playerPanel = document.getElementsByClassName("player-0-panel")[0];
            break;
    }
    playerPanel.classList.add("active");
    console.log("Switching Player")
}

function newGame () {
    //Reset Player One
    playerOne.globalScore = 0;
    playerOne.roundScore = 0;
    document.getElementById("score-0").innerHTML = 0;
    document.getElementById("current-0").innerHTML = 0;
    //Reset Player Two
    playerTwo.globalScore = 0;
    playerOne.roundScore = 0;
    document.getElementById("score-1").innerHTML = 0;
    document.getElementById("current-1").innerHTML = 0;
    //Removes Active from P2 and sets active to P1
    document.getElementsByClassName("player-1-panel")[0].classList.remove("active");
    document.getElementsByClassName("player-0-panel")[0].classList.add("active");
    //Set Variables to Player One
    player = playerOne;
    currentScore = document.getElementById("current-0");
    totalScore = document.getElementById("score-0");
    playerPanel = document.getElementsByClassName("player-0-panel")[0];
    //Hides win message
     let winScreen = document.getElementsByClassName("win-screen")[0];
     winScreen.style.display = "none";
}

// Adding Event Listners
//ROLL
let rollButton = document.getElementsByClassName("btn-roll")[0];
rollButton.addEventListener("click", rollDice);
//HOLD
let holdButton = document.getElementsByClassName("btn-hold")[0];
holdButton.addEventListener("click", hold);
//NEW GAME
const buttons = document.getElementsByClassName("btn-new");
for (let button = 0; buttons.length; button++) {
    buttons[button].addEventListener("click", newGame);
}