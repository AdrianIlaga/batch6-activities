// Verse for Encouragement
// If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.
// - James 1:5

// CHESS PIECES

//NUMBERING THE CHESS BOARD
//Array for board
const row = ["8", "7", "6", "5", "4", "3", "2", "1"]; //Top to bottom
const column = ["a", "b", "c", "d", "e", "f", "g", "h"]; //Left to right

//Chess Board Pieces
let boardElements = document.getElementsByClassName("inner-box");
for (let element=0; element<boardElements.length; element++) {
    const id = boardElements[element].id;
    let idCopy = id.slice();
    const locationRow = row.indexOf(idCopy[1]);
    const locationColumn = column.indexOf(idCopy[0]);
    boardElements[element].dataset.location = "" + locationRow + "" + locationColumn;
    // console.log(id + " " + boardElements[element].dataset.location);
}


//Creating Chess Pieces
const pieceInfo = {
    King : {
        blackLocations: ["e8"],
        blackCode: "&#9818;",
        whiteLocations: ["e1"],
        whiteCode: "&#9812;",
        moveSet: [-11, -10, -9, -1, 1, 9, 10, 11]   
    },
    Queen : {
        blackLocations: ["d8"],
        blackCode: "&#9819;",
        whiteLocations: ["d1"],
        whiteCode: "&#9813;",
        moveSet: [-11, -10, -9, -1, 1, 9, 10, 11]
    },
    Bishop : {
        blackLocations: ["c8", "f8"],
        blackCode: "&#9821;",
        whiteLocations: ["c1", "f1"],
        whiteCode: "&#9815;",
        moveSet: [-11, -9, 9, 11]
    },
    Knight : {
        blackLocations: ["b8","g8"],
        blackCode: "&#9822;",
        whiteLocations: ["b1", "g1"],
        whiteCode: "&#9816;",
        moveSet: [-21, -19, -12, -8, 8, 12, 19, 21]
    },
    Rook : {
        blackLocations: ["a8", "h8"],
        blackCode: "&#9820;",
        whiteLocations: ["a1", "h1"],
        whiteCode: "&#9814;",
        moveSet: [-10, -1, 1, 10]
    },
    Pawn : {
        blackLocations: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
        blackCode: "&#9823;",
        moveSet: [
            //Black: 
            10, //Movement
            20, //Starting Move
            11, 9, //Eating
            //White:
            -10, //Movement
            -20, //Starting Move
            -11, -9 //Eating
        ],
        whiteLocations: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
        whiteCode: "&#9817;",
    }
};


//Class for creating piece
function Piece (piece, color, count, code) {
    this.piece = piece;
    this.color = color;
    this.name = color + piece + count
    this.code = code
    this.hasMoved = true;
}

//Place Pieces on Board
function placePieces() {
    let keys = Object.keys(pieceInfo)    
    for (const key in keys) { 
        //Runs twice, one for black, one for white       
        for (let i=0; i<2; i++) {             
          
            let color;
            let locations;
            let code;
            let count = 1;

            switch (i) {
                case 0:
                    color = "black"
                    code = pieceInfo[keys[key]].blackCode
                    locations = pieceInfo[keys[key]].blackLocations;
                    break;
                case 1:
                    color = "white"
                    code = pieceInfo[keys[key]].whiteCode
                    locations = pieceInfo[keys[key]].whiteLocations;
                    break;
            }
            
            //Creates piece object and place it on the board
            for (const location in locations) {
                const piece = new Piece(keys[key], color, count, code);
                const id = locations[location];
                const element = document.querySelector("#" + id);
                element.value = piece;
                element.innerHTML = element.value.code;
                count++;
            }
        }
    }
}

placePieces();

//GLOBAL CHESS VARIABLES
let hasClicked = false; //Checks if a piece has been clicked or not
let selectedPiece; //Contains the piece object
let selectedBox; //Contains the box selected
let selectedBoxId; //Contains the id of the selected box
let whoseTurn = 'white' //Contains whose turn it is

//Array for Eaten pieces
let capturedWhites = [];
let capturedBlacks = [];

//ADDING EVENT LISTNERS
const innerBoxes = document.getElementsByClassName("inner-box");

for (let box in innerBoxes) {
    // console.log(innerBoxes[box]);
    innerBoxes[box].addEventListener("click", movement);
}

//MOVEMENT FUNCTION  
function movement() {

    //Selecting a piece                Note: Add checker to see what moves the piece can make
    if (this.innerHTML && hasClicked === false) {
        //Gets info on current box
        getInfo(this);
        //Checks if same turn
        if (checkTurn(this.value.color)) {
            console.log("Selected a Piece");
            console.log(selectedBoxId + selectedPiece.name);
            selectedBox.classList.add("selected");
            hasClicked = true;
        }
    }

    //Selecting another piece          Note: Add checker to limit the moves to only those possible
    else if(this.innerHTML && hasClicked === true && selectedBox !== this) {
        //If piece is same color
        if (checkTurn(this.value.color)) {
            console.log("Selected Another Piece");
            selectedBox.classList.remove("selected");
            getInfo(this);
            console.log(selectedPiece.code + this.id);
            selectedBox.classList.add("selected");
        }
        //If piece is different color   (Eating Logic)
        else {
            console.log("Nom Nom Nom")
            //Stores eaten piece to array
            capturePiece(this.value);
            //Removes piece from previous box and places them here
            selectedBox.classList.remove("selected");
            updatePiece(selectedPiece);
            placeInfo(this);
            removeInfo();
            resetInfo();
            switchTurn();
        }
    }

    //Deseleting a piece
    else if(selectedBox === this) {
        console.log("Deselected a Piece")
        selectedBox.classList.remove("selected");
        resetInfo();
        
    }

    //For setting down a piece on empty box
    else if(!this.innerHTML && hasClicked === true) {
        console.log("Set Down a Piece");
        updatePiece(selectedPiece);
        placeInfo(this);
        selectedBox.classList.remove("selected");
        removeInfo();
        console.log(this.id + selectedPiece.code);
        resetInfo();  
        switchTurn();
    }

    //For Clicking an empty box
    else {
        console.log("No Piece Selected")
        resetInfo();
    }

}

//Functions for movement function

    //Functions for movement

        //Gets info from current box
        function getInfo (box) {
            selectedBox = box;
            selectedPiece = selectedBox.value;
            selectedBoxId = selectedBox.id;
        }

        //Resets all the variables
        function resetInfo () {
            selectedPiece = "";
            selectedBox = "";
            selectedBoxId = "";
            hasClicked = false;
        }

        //Puts info of previous box to current box
        function placeInfo(newBox) {
            newBox.value = selectedPiece;
            newBox.innerHTML = newBox.value.code;
        }

        //Removes info from previous box
        function removeInfo () {
            originalBox = document.getElementById(selectedBoxId);
            originalBox.innerHTML = "";
            originalBox.value = "";
        }

        //Updates info on piece
        function updatePiece (piece) {
            piece.hasMoved = true;
        }

        //Checks whose turn it is
        function checkTurn(color = selectedPieceColor){
            if (whoseTurn === color) {
                return true;
            }
            else {
                return false;
            }
        }

        //Switches the turn
        function switchTurn() {
            switch (whoseTurn) {
                case 'white':
                    whoseTurn = 'black';
                    break;
                case 'black': 
                    whoseTurn = 'white';
                    break;
            }
        }

    //Functions for eating
        //Stores captures piece in respective arrays
        function capturePiece (piece) {
            if (piece.color === 'white') {
                capturedWhites.push(piece);
                console.log(capturedWhites);
            }
            else if (piece.color === 'black') {
                capturedBlacks.push(piece);
                console.log(capturedBlacks);
            }
        }