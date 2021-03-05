//Verse for Encouragement
//If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.
//-James 1:5

//Test Hands
let royalFlush = ["♥A","♥10","♥J","♥Q","♥K"];
let straightFlush = ["♥5", "♥6", "♥7", "♥8", "♥9"];
let straight = ["♦5", "♥6", "♥7", "♥8", "♥9"];
let flush = ["♦A", "♦3", "♦5", "♦7", "♦9"];
let fourKind = ["♧9","♤9","♥9","♦9", "♥Q"];
let fullHouse = ["♧9","♤9","♥9","♦Q", "♥Q"];
let threeKind = ["♧9","♤9","♥9","♦Q", "♥K"];
let twoPair = ["♧9","♤9","♥Q","♦Q", "♥K"];

//Creates the initial deck --- Status: Completed
const suits = ["♧", "♤", "♥", "♦"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];

function createDeck() {
    console.log("Opening a new pack of cards!")
    deck = [];
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
    shuffledDeck = [];
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
    let currentHand = [];
    if (shuffledDeck.length >= 5) {
        for (let i=0; i<5; i++) {
        currentHand.push(shuffledDeck.pop())
        //Sorts the hand before showing
        currentHand.sort(function(card1, card2) {
            let value1 = card1.slice(1);
            let value2 = card2.slice(1);
            let value1Index = values.indexOf(value1);
            let value2Index = values.indexOf(value2);
            return value1Index - value2Index;
        });
        }

        //Determines what kind of hand you have

        //For Testing Purposes Only. Comment out when done
        // currentHand = 
        // currentHand;
        // royalFlush;
        // straightFlush;
        // straight;
        // flush;
        // fourKind;
        // fullHouse;
        // threeKind;
        // twoPair;

        determineHand(currentHand);

        return currentHand;
    }
    else {
        console.log(`Not enough cards. Only ${shuffledDeck.length} cards left`)
    }
    
}

function determineHand(
    currentHand

    ) {
    let handType = "";

    //Counts the number of each suit
    let clubCount = 0;
    let spadeCount = 0;
    let heartCount = 0;
    let diamondCount = 0;
    for (const card in currentHand) {
        switch(currentHand[card][0]) {
            case "♧":
                clubCount++;
                break;
            case "♤":
                spadeCount++;
                break;
            case "♥":
                heartCount++
                break;
            case "♦":
                diamondCount++; 
                break;
        }
    }

    //Counts the numbers of duplicates
    let hasDuplicate = false;
    let duplicate1 = [];
    let duplicate2 = [];
    let duplicateHand = [];
    
    for (const card in currentHand) {
        duplicateHand.push(currentHand[card].slice(1)); //Makes an array of the values of the current hand
    }

    for (let card=0; card<duplicateHand.length; card++) {
        const firstIndex = duplicateHand.indexOf(duplicateHand[card]);
        const lastIndex = duplicateHand.lastIndexOf(duplicateHand[card]);
        if (firstIndex !== lastIndex && duplicate1.length === 0) {
            const indexDifference = lastIndex-firstIndex
            duplicate1 = duplicateHand.splice(firstIndex, (indexDifference+1));
            card -= indexDifference;
            // console.log(`${duplicate1[0]} has ${duplicate1.length} duplicates`); //For testing only. Comment out when done
            hasDuplicate = true;
        }
        else if (firstIndex !== lastIndex) {
            const indexDifference = lastIndex-firstIndex
            duplicate2 = duplicateHand.splice(firstIndex, (indexDifference+1));
            card -= indexDifference;
            // console.log(`${duplicate2[0]} has ${duplicate2.length} duplicates`); //For testing only. Comment out when done
        }
    }

    duplicateHand = [];
    for (const card in currentHand) {
        duplicateHand.push(currentHand[card].slice(1)); //Makes an array of the values of the current hand
    }

    //Possible hand types with duplicates
    if (hasDuplicate === true) {
        
        switch (true) {
        //Four of a Kind
            case (duplicate1.length === 4):
                handType = "Four of a Kind";
                break;
        //Full House
            case ((duplicate1.length === 3 && duplicate2.length == 2) || (duplicate1.length === 2 && duplicate2.length === 3)):
                handType = "Full House";
                break;
        //Flush
            case (isFlush()):
                handType = "Flush";
                break;
        //Three of a Kind
            case (duplicate1.length === 3 || duplicate2.length === 3):
                handType = "Three of a Kind";
                break;
        //Two Pair
            case (duplicate1.length === 2 && duplicate2.length === 2):
                handType = "Two Pair";
                break;
        //Pair
            default:
                handType = "Pair";
        }
    }
    //Possible hand types without duplicates
    else if (hasDuplicate === false) {

        switch (true) {
        //Royal Flush
            case (isFlush() && isRoyal(duplicateHand)):
                handType = "Royal Flush";
                break;
        //Straight Flush
            case (isFlush() && isStraight(duplicateHand)):
                handType = "Straight Flush";
                break;
        //Flush
            case (isFlush()):
                handType = "Flush";
                break;
        //Straight
            case (isStraight(duplicateHand)):
                handType = "Straight"
                break;
        //High Card
            default:
                handType = "High Card";
        }
    } 

    console.log(`Your hand is a ${handType}`);


    //Functions Used By Hand Checker

    //Checks if Flush
    function isFlush () {
        if ((clubCount === 5 || spadeCount === 5 || heartCount === 5 || diamondCount === 5)) {
            return true;
        }

        else {
            return false;
        }
    }

    //Checks if Straight
    function isStraight (hand) {
        let handSum = 0;
        const n = values.indexOf(hand[0]);

        for (const card in hand) {
            handSum += (values.indexOf(hand[card]))
        }

        if ((5*(n + 2)) === handSum) {
            return true;
        }
        else {
            return false;
        }
    }

    //Checks if Royal flush
    function isRoyal(hand) {
        const requirements = ["10","J","Q","K","A"];
        let royal;
        for (const element in requirements) {
            if (!hand.includes(requirements[element])) {
                royal = false;
                break;
            }
            else {
                royal = true;
            }
        }
        return royal;
    }
}