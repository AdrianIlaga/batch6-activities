//Verse for Encouragement
//If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.
//-James 1:5

//Creates the initial deck --- Status: Completed
const suits = ["♧", "♤", "♥", "♦"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const score = ["14", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
let deck = [];

function createDeck() {
    console.log("Opening a new pack of cards!")
    for (const suit in suits) {
        for (const value in values) {
            deck.push(suits[suit] + values[value]);
        }
    }
    console.log(deck);
}

// createDeck()


//Shuffles the Deck --- Status: Completed
let shuffledDeck = [];

function shuffleDeck() {
    console.log("Shuffling the deck")
    for (let i=0; i<52; i++) {
        shuffleIndex = Math.floor(Math.random() * Math.floor(deck.length));
        shuffledCard = deck[shuffleIndex];
        shuffledDeck.push(shuffledCard);
        deck.splice(shuffleIndex, 1);
    }
    // console.log(shuffledDeck);
    return shuffledDeck;
}

// shuffleDeck();


//Arranges the Shuffled Deck by Suit --- Status: Completed
function arrangeBySuit() {
    console.log("Arranging by suit")
    let arrangedDeck = shuffledDeck.slice();
    arrangedDeck.sort(function(card1, card2) {
        let value1 = card1[0];
        let value2 = card2[0];
        let value1Index = suits.indexOf(value1);
        let value2Index = suits.indexOf(value2);
        return value1Index - value2Index;
    });
    // console.log(arrangedDeck);
    return arrangedDeck;
}

// arrangeBySuit();


//Arranges the Deck by Ascending Order --- Status: Completed
function arrangeByAscending() {
    console.log("Arranging from Ace to King")
    let arrangedDeck = shuffledDeck.slice()
    arrangedDeck.sort(function(card1, card2) {
        let value1 = card1.slice(1);
        let value2 = card2.slice(1);
        let value1Index = values.indexOf(value1);
        let value2Index = values.indexOf(value2);
        return value1Index - value2Index;
    });
    // console.log(arrangedDeck);
    return arrangedDeck;
}

// arrangeByAscending();


//Arranges the Deck by Descending Order --- Status: Completed
function arrangeByDescending() {
    console.log("Arranging from King to Ace")
    let arrangedDeck = shuffledDeck.slice()
    arrangedDeck.sort(function(card1, card2) {
        let value1 = card1.slice(1);
        let value2 = card2.slice(1);
        let value1Index = values.indexOf(value1);
        let value2Index = values.indexOf(value2);
        return value2Index - value1Index;
    })
    // console.log(arrangedDeck);
    return arrangedDeck;
}

// arrangeByDescending();


//For Dealing a Card

function dealCard() {
    if(shuffledDeck.length > 0) {
        const card = shuffledDeck.pop()
        const suit = card[0];
        const value = card.slice(1);
        let namePart1 = "";
        let namePart2 = "";

        //Identifies the name of value
        switch(value) {
            case "A":
                namePart1 = "Ace";
                break;
            case "2":
                namePart1 = "Two";
                break;
            case "3":
                namePart1 = "Three";
                break;
            case "4":
                namePart1 = "Four";
                break;
            case "5":
                namePart1 = "Five";
                break;
            case "6":
                namePart1 = "Six";
                break;
            case "7":
                namePart1 = "Seven";
                break;
            case "8":
                namePart1 = "Eight";
                break;
            case "9":
                namePart1 = "Nine";
                break;
            case "10":
                namePart1 = "Ten";
                break;
            case "J":
                namePart1 = "Jack";
                break;
            case "Q":
                namePart1 = "Queen";
                break;
            case "K":
                namePart1 = "King";
                break;
        }

        //Identifies the name of suit
        switch(suit) {
            case "♧":
                namePart2 = "Clubs"
                break;
            case "♤":
                namePart2 = "Spades"
                break;
            case "♥":
                namePart2 = "Hearts"
                break;
            case "♦":
                namePart2 = "Diamonds"
                break;  
        }
    
        console.log(`${namePart1} of ${namePart2}`)
        console.log(`${shuffledDeck.length} cards remaining`);
    }

    else {
        console.log("There are no more cards remaining. Open a new pack... baka!")
    }
  
}

function dealFiveCards() {
    if (shuffledDeck.length >= 5) {
        const currentHand = [];
        for (let i=0; i<5; i++) {
        currentHand.push(shuffledDeck.pop())
        currentHand.sort(function(card1, card2) {
            let value1 = card1.slice(1);
            let value2 = card2.slice(1);
            let value1Index = values.indexOf(value1);
            let value2Index = values.indexOf(value2);
            return value1Index - value2Index;
        });
        }

        //Determines what kind of hand you have
        determineHand(currentHand);

        return currentHand;
    }
    else {
        console.log(`Not enough cards. Only ${shuffledDeck.length} cards left`)
    }
    
}

function determineHand(hand) {
    
}