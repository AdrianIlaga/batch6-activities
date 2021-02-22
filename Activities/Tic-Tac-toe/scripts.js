const xClass = 'x';
const oClass = 'o';
const empty = '';
const cellElements = document.querySelectorAll(".cell")
const board = document.getElementById("board")
let occupiedCells = 0;
let circleTurn;
let gameFinished = false;
let boardState = [
    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty]
];

//Moves storage
let moves = [];
let movesCounter = 0

startGame();

function startGame() {
    circleTurn = false;
    setBoardClass();
}

cellElements.forEach(cell => {
    cell.addEventListener('click', clickHandler, {once:true})
});

function clickHandler() {
    if(gameFinished === false) {
    const cell = this;
    const currentClass = circleTurn ? oClass : xClass;
    //Places the Mark
    placeMark (cell, currentClass); //Done
    //Updates the Board State
    updateBoard(cell, currentClass); //Done
    //Logs the Move
    // logMove(); 
    //Checks if there's a winner
    checkWinner(currentClass);
    //Switches Turn
    switchTurn(); //Done
    setBoardClass(); //Done
    }
    //Disables further moves when game is finished
    else {
        board.classList.remove(xClass, oClass);
        console.log("The Game is finished. Please restart to play again")
    }
}



//FUNCTIONS FOR CLICK HANDLER

    //Add either o or x class
    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    //Switches the turn
    function switchTurn() {
        circleTurn = !circleTurn
    }

    //Changes the class of the board to either o or x depending on circleTurn
    function setBoardClass() {
        board.classList.remove(xClass, oClass);
        if (gameFinished === false) {
            if (circleTurn) {
                board.classList.add(oClass);
            }
            else {
                board.classList.add(xClass);
            }
        }

    }

    //Updates the Board State
    function updateBoard(cell, currentClass) {
        const row = cell.dataset.row;
        const column = cell.dataset.column;
        boardState[row][column] = currentClass;
    }

    //Saves the Boardstate Every Turn    !UNFINISHED
    // function logMove() {
    //     const move = boardState
    //     moves[movesCounter] = move;
    //     movesCounter ++;
    //     console.log(moves)
    // }

    //Check the Board for Winner 
    function checkWinner(currentClass) {
        let winner = currentClass.toUpperCase();

        //Horizontal Win 
        for (let row=0; row<boardState.length; row++) {
            let a = boardState[row][0];
            let b = boardState[row][1];
            let c = boardState[row][2];
            if(a && a===b && b===c && gameFinished === false) {
                console.log(winner + " " + "is the winner! (Row)")
                gameFinished = true;
                break;
            }
        }

        //Vertical Win
        for (let column=0; column<boardState.length; column++) {
            let a = boardState[0][column];
            let b = boardState[1][column];
            let c = boardState[2][column];
            if(a && a===b && b===c && gameFinished === false) {
                console.log(winner + " " + "is the winner! (Column)")
                gameFinished = true;
                break
            }
        }

        //Diagonal Win (Left)
        if (gameFinished === false) {
            let a = boardState[0][0];
            let b = boardState[1][1];
            let c = boardState[2][2];
            if(a && a===b && b===c) {
                console.log(winner + " " + "is the winner! (Diagonal Left)")
                gameFinished = true;
            }
        }
        //Diagonal Win (Right)
        if (gameFinished === false) {
            let a = boardState[0][2];
            let b = boardState[1][1];
            let c = boardState[2][0];
            if(a && a===b && b===c) {
                console.log(winner + " " + "is the winner! (Diagonal Right)")
                gameFinished = true;
            }
        }

        // Draw
        for (let row=0; row<boardState.length; row++) {
            for (let column=0; column<boardState.length; column++) {
                if(boardState[row][column] !== empty) {
                    occupiedCells += 1
                }
            }
        }
        if (occupiedCells === 9 && gameFinished === false) {
            gameFinished = true;
            console.log("It's a draw")
        }
        else {
            occupiedCells = 0;
        }
    }