//FOR CSS

//Hamburger Bar
let hamburgerButton = document.getElementById("transaction");
let hamburgerBar = document.getElementById("hamburger-bar");
function toggleHamburger() {

    if (hamburgerBar.style.visibility === "visible") {
        hamburgerBar.style.visibility = "hidden";
    } else {
        hamburgerBar.style.visibility = "visible";
    }

}
hamburgerButton.addEventListener("click", toggleHamburger);

//Hide Other Sections
let sectionButtons = document.getElementsByClassName("section-button");

const getSections = () => {
    let sections = [];
    for (let element=0; element<sectionButtons.length; element++) {
        sections.push(sectionButtons[element].href.split("#")[1]);
    }
    return sections;
}

function hideOthers() {
    let sections = getSections();
    for (const section in sections) {
        let target = document.getElementById(sections[section]);
        const buttonId = this.id
        let button = document.getElementById(buttonId);
        console.log(button);
        if (this.href.split("#")[1] === sections[section]) {
            target.style.display = "flex";
            button.classList.add("active");
        }
        else {
            target.style.display = "none";
            button.classList.remove("active");
        }
    }
}

for (let button=0; button<sectionButtons.length; button++) {
    sectionButtons[button].addEventListener("click", hideOthers);
}

// FOR WEBSITE

//-----------------------------

//FORMATTER
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2
});

//JSON Converters
function toString(object) {
    return JSON.stringify(object);
}

function toObject(string) {
    return JSON.parse(string);
}

//Accessing Local Storage
function pushData(object) {
    return localStorage.setItem(object.key, toString(object))
}

function pullData(string) {
    return toObject(localStorage.getItem(`${string}`));
}
//-----------------------------

//Setting Initial Data
const initialData = [
    {name: "John Doe",
    money: 500,
    key: "johndoe"},
    {name: "John Two",
    money: 1000,
    key: "johntwo"},
    {name: "Filthy F Rich",
    money: 1000000,
    key: "filthyfrich"},
    {name: "Armin Arlert",
    money: 20,
    key: "arminarlert"},
    {name: "Rogier Silmuna",
    money: 1444,
    key: "rogiersilmuna"},
]

function getInitialKeys() {
    let initialKeys = [];
    for (let i=0; i<localStorage.length; i++) {
        object = pullData(localStorage.key(i));
        initialKeys.push(object.key);
    }
    return initialKeys
}
const initialKeys = getInitialKeys();

for (let i=0; i<initialData.length; i++) {
    if (!initialKeys.includes(initialData[i].key)) {
        pushData(initialData[i]);
    }
} 
console.log(localStorage);
//-----------------------------

//USER LIST FUNCTIONS
let usersTable = document.getElementById("users-table");
let rowCount = usersTable.rows.length;

//Add row function
function addRow(row, table, customer) {
    let newRow = table.insertRow(row);
    let name = newRow.insertCell(0);
    let money = newRow.insertCell(1);
    name.innerHTML = customer.name;
    money.innerHTML = formatter.format(customer.money);
    rowCount++;
}

//*** Required Function */
function list_users() {
    let usersList = [];
    for (let i=0; i<localStorage.length; i++) {
        const customer = pullData(localStorage.key(i));
        usersList.push(customer);
    }
    return usersList;
}

function resetTable() {
    let row = rowCount - 1;
    for (row ; row>0; row--) {
        document.getElementById("users-table").deleteRow(row);
    }
    rowCount = 1;
}

//Sorting Functions
function sortByName(list) {
    list.sort(function ( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      });
    return list;
}

function sortByMoney(list) {
    list.sort(function ( a, b ) {
        if ( a.money < b.money ){
          return -1;
        }
        if ( a.money > b.money ){
          return 1;
        }
        return 0;
      });
    return list;
}

//Add all rows from local storage
function makeTable(sortBy=false) {
    resetTable();
    let usersList = list_users();
    
    if (sortBy && typeof(sortBy) !== "object") {
        sortBy(usersList);
    }
    
    for (let i=0; i<usersList.length; i++) {
        const customer = usersList[i];
        addRow(rowCount, usersTable, customer);
    }
}
makeTable();

function makeTableByName() {
    makeTable(sortByName);
}

function makeTableByMoney() {
    makeTable(sortByMoney);
}

document.getElementById("sort-reset").addEventListener("click", makeTable);
document.getElementById("sort-by-name").addEventListener("click", makeTableByName);
document.getElementById("sort-by-money").addEventListener("click", makeTableByMoney);

//USER ADD FUNCTIONS

//Creates new Account

let name;
let balance;
let key;

//Check for identical names in the system
function isValid() {

    let fName = document.getElementById("fname").value.toLowerCase();
    fName = fName.charAt(0).toUpperCase() + fName.slice(1);
    let mName = document.getElementById("mname").value.toLowerCase(); 
    mName = mName.charAt(0).toUpperCase() + mName.slice(1);
    let lName = document.getElementById("lname").value.toLowerCase();
    lName = lName.charAt(0).toUpperCase() + lName.slice(1);
    let startingBalance =  document.getElementById("balance").value;

    let message;
    let validName = true;
    let fullName;
    if (mName) {
        fullName = `${fName} ${mName} ${lName}`;
    }
    else {
        fullName = `${fName} ${lName}`;
    }
    key = fullName.toLowerCase();
    key = key.replaceAll(" ", "");


    for (let i=0; i<localStorage.length; i++) {
        const customer = pullData(localStorage.key(i));
        if (customer.key === key) {
            validName = false;
            message = `An account with name of ${customer.name} already exists`
            break;
        }
    }

    if (validName !== false) {
        if (fName !== "" && lName !== "" && isPositive(startingBalance)) {
            let confirmation = confirm("Add new user to database?");
            if(confirmation === true) {
                name = fullName;
                balance = startingBalance;
                message = `An account for ${name} has been`
            }
            else {
                message = "Cancelled adding user to database"
                validName = false;
            }
        
        }
        else {
            validName = false;
            message = "Some required information is missing or invalid"
        }
    }

    alert(message);
    return validName;
}

//*** Required Function */
function create_user (user, balance=0) {
    const customer = new Object();
    customer.name = user;
    customer.money = parseInt(balance);
    customer.key = key;

    pushData(customer);
    makeTable();
    fillForms();
    console.log(`Added ${customer.name}`)
}

function goToUserList() {
    const sections = getSections();
    for (section in sections) {
        document.getElementById(sections[section]).style.display="none";
    }
    document.getElementById("user-list").style.display="flex";
}

function createUser() {
    if(isValid()) {
        create_user(name, balance);
        goToUserList();
        //Resets form values
        document.getElementById("fname").value = "";
        document.getElementById("mname").value = ""; 
        document.getElementById("lname").value = "";
        document.getElementById("balance").value = "";
    }
}

createUserButton = document.getElementById("create-user-button");
createUserButton.addEventListener("click", createUser);

//TRANSACTION FUNCTIONS

function loopAction(cb, list) {
    for (const element in list) {
        cb(list[element]);
    }
}

//Check if Positive
function isPositive(money){
    if (money >= 0) {
        if (money = "") {
            money = 0;
        }
        return true;
    }
    alert("Entered amount is a negative number");
    return false;
}

//Resets Form infomation
function resetForm(transaction) {
    let target = document.getElementById(`${transaction}-user`);
    let options = target.length-1;
    for (let i=options; i>=0; i--) {
        target[i].remove()
    }
}

const transactionsList = ["deposit", "withdraw", "sender", "receiver"];

function resetForms() {
    loopAction(resetForm, transactionsList);
}

//Fills in form information
function fillForm(transaction) {
    let usersList = list_users();

    for (user in usersList) {
        let target = document.getElementById(`${transaction}-user`);
        let option = document.createElement("option");
        option.text = usersList[user].name;
        option.value = usersList[user].key;
        target.add(option);
    }
}

//Fills the list of users in transactions
function fillForms() {
    resetForms();
    loopAction(fillForm, transactionsList);
    updateAllBalance();
}

fillForms();

//** Required function */
function get_balance(user) {
    let account = pullData(user);
    balance = account.money;
    return formatter.format(balance);
}

//Shows Balance of Current User
function showBalance() {
    let target = this;
    let user = target.options[target.selectedIndex].value;
    let transaction = this.id.split("-")[0];
    target = document.getElementById(`${transaction}-balance`);
    target.value = get_balance(user);
}

//Updates Balance
function updateBalance(transaction) {
    let target = document.getElementById(`${transaction}-user`);
    let user = target.options[target.selectedIndex].value;
    target = document.getElementById(`${transaction}-balance`);
    target.value = get_balance(user);
}

function updateAllBalance() {
    loopAction(updateBalance, transactionsList);
}

for (transaction in transactionsList) {
    let targetUser = document.getElementById(`${transactionsList[transaction]}-user`);
    targetUser.addEventListener("change", showBalance);
} 

//Deposit

function deposit(user, amount) {
    let account = pullData(user);
    account.money += parseInt(amount);
    pushData(account)
    const new_balance = account.money;
    return new_balance;
}

function depositMoney() {
    
    target = document.getElementById("deposit-user");
    const user = target.options[target.selectedIndex].value;
    const user_name = target.options[target.selectedIndex].text;
    const amount = document.getElementById("deposit-amount").value;
    if (isPositive(amount)) {
        let confirmation = confirm("Proceed with deposit?");
        if (confirmation === true) {
            const new_balance = deposit(user, amount);
            makeTable();
            updateAllBalance();
            alert(`Deposited ${formatter.format(amount)} to ${user_name}. Their balance is now ${formatter.format(new_balance)}`)
        }
    }
}

let depositButton = document.getElementById("deposit-button");
depositButton.addEventListener("click", depositMoney);

//Wthdraw

function hasEnough(user, amount) {
    let account = pullData(user);
    if(account.money >= amount) {
        return true;
    }
    alert("Insufficient balance");
    return false;
}

function withdraw(user, amount) {
    let account = pullData(user);
    account.money -= parseInt(amount);
    pushData(account)
    const new_balance = account.money;
    return new_balance;
}

function withdrawMoney() {

    target = document.getElementById("withdraw-user");
    const user = target.options[target.selectedIndex].value;
    const user_name = target.options[target.selectedIndex].text;
    const amount = document.getElementById("withdraw-amount").value;
    if (isPositive(amount) && hasEnough(user, amount)) {
        let confirmation = confirm("Proceed with withdrawal?");
        if (confirmation === true) {
            const new_balance = withdraw(user, amount);
            makeTable();
            updateAllBalance();
            alert(`Withdrawn ${formatter.format(amount)} from ${user_name}. Their balance is now ${formatter.format(new_balance)}`);
        }
    }
}

let withdrawButton = document.getElementById("withdraw-button");
withdrawButton.addEventListener("click", withdrawMoney);

//Transfer

//Checks is Both users are the same
function checkUsers(sender, receiver) {

    if (sender === receiver) {
        alert("The Sender and the Receiver are the same person");
        return false;
    }
    else {
        return true;
    }
}

function send(from_user, to_user, amount) {
    withdraw(from_user, amount);
    deposit(to_user, amount);
    return [get_balance(from_user), get_balance(to_user)];
}

function sendMoney() {
    let targer_sender = document.getElementById("sender-user");
    target_sender = targer_sender.options[targer_sender.selectedIndex];
    const from_user = target_sender.value;
    const from_user_name = target_sender.text;

    let target_receiver = document.getElementById("receiver-user");
    target_receiver = target_receiver.options[target_receiver.selectedIndex];
    const to_user = target_receiver.value;
    const to_user_name = target_receiver.text;

    const amount = document.getElementById("sender-amount").value;

    if (isPositive(amount) && hasEnough(from_user, amount) && checkUsers(from_user, to_user)) {
        let confirmation = confirm("Proceed with transfer?");
        if (confirmation === true) {
            const new_balances = send(from_user, to_user, amount);
            makeTable();
            updateAllBalance();
            alert(`${from_user_name} has sent ${formatter.format(amount)} to ${to_user_name}. ${from_user_name} has ${new_balances[0]} remaining while ${to_user_name} now has ${new_balances[1]}`);
        }
    }
}

let transferButton = document.getElementById("transfer-button");
transferButton.addEventListener("click", sendMoney);