//Verse for Encouragement
//If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.
//-James 1:5

console.log("Welcome back creator!");

//Creates the initial deck --- Status: Completed
const suits = ["♧", "♤", "♥", "♦"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];

function createDeck() {
    for (const suit in suits) {
        for (const value in values) {
            deck.push(suits[suit] + values[value]);
        }
    }
    console.log(deck);
}

createDeck()


//Shuffles the Deck --- Status: Completed
let shuffledDeck = [];

function shuffleDeck() {
    for (let i=0; i<52; i++) {
        shuffleIndex = Math.floor(Math.random() * Math.floor(deck.length));
        shuffledCard = deck[shuffleIndex];
        shuffledDeck.push(shuffledCard);
        deck.splice(shuffleIndex, 1);
    }
    console.log(shuffledDeck);
    return shuffledDeck;
}

shuffleDeck();


//Arranges the Shuffled Deck by Suit --- Status: Completed
function arrangeBySuit() {
    let arrangedDeck = shuffledDeck.slice()
    arrangedDeck.sort(function(card1, card2) {
        let value1 = card1[0];
        let value2 = card2[0];
        let value1Index = suits.indexOf(value1);
        let value2Index = suits.indexOf(value2);
        return value1Index - value2Index;
    })
    console.log(arrangedDeck);

    return arrangedDeck;
}

arrangeBySuit();


//Arranges the Deck by Ascending Order --- Status: Completed
function arrangeByAscending() {
    let arrangedDeck = shuffledDeck.slice()
    arrangedDeck.sort(function(card1, card2) {
        let value1 = card1.slice(1);
        let value2 = card2.slice(1);
        let value1Index = values.indexOf(value1);
        let value2Index = values.indexOf(value2);
        return value1Index - value2Index;
    })
    console.log(arrangedDeck);
}
arrangeByAscending();

//Arranges the Deck by Descending Order --- Status: Completed
function arrangeByDescending() {
    let arrangedDeck = shuffledDeck.slice()
    arrangedDeck.sort(function(card1, card2) {
        let value1 = card1.slice(1);
        let value2 = card2.slice(1);
        let value1Index = values.indexOf(value1);
        let value2Index = values.indexOf(value2);
        return value2Index - value1Index;
    })
    console.log(arrangedDeck);
}
arrangeByDescending();

//For Dealing a Card
//Assigns the name of Suit
// switch(variable1) {
//     case "♧":
//         namePart2 = "Clubs"
//         break;
//     case "♤":
//         namePart2 = "Spades"
//         break;
//     case "♥":
//         namePart2 = "Hearts"
//         break;
//     case "♦":
//         namePart2 = "Diamonds"
//         break;  
// }
//Assigns the name of value
// switch(variable2) {
//     case "A":
//         namePart1 = "Ace";
//         break;
//     case "2":
//         namePart1 = "Two";
//         break;
//     case "3":
//         namePart1 = "Three";
//         break;
//     case "4":
//         namePart1 = "Four";
//         break;
//     case "5":
//         namePart1 = "Five";
//         break;
//     case "6":
//         namePart1 = "Six";
//         break;
//     case "7":
//         namePart1 = "Seven";
//         break;
//     case "8":
//         namePart1 = "Eight";
//         break;
//     case "9":
//         namePart1 = "Nine";
//         break;
//     case "10":
//         namePart1 = "Ten";
//         break;
//     case "J":
//         namePart1 = "Jack";
//         break;
//     case "Q":
//         namePart1 = "Queen";
//         break;
//     case "K":
//         namePart1 = "King";
//         break;
// }
