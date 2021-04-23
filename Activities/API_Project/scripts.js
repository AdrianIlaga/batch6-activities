// Trust in the LORD with all your heart, lean not in your own understanding. In all your ways submit to Him, and He will make your paths straight
// -Proverbs 3:5-6

// Variables-----------------------------------------------------------------------------------------------------------
const yourAPIKey = "AIzaSyBo9s4IfPIsyGLMb5GuGtMNdHxvoDyvpHY";   //Key 1
// const yourAPIKey = "AIzaSyCKkmCYKaEZ3W9C86SyEFNNcZCK8ZE58G8"; //Key 2
let currentQuery = "";
let startIndex = 0;
let totalItems = 0;
let maxPagination = 6; //Cannot be more than 40
const itemLimit = maxPagination * 50;
let ids = getIds();
let list_of_books = [];

// Initialized Functions------------------------------------------------------------------------------------------------
buildSaved();


// Conditions-----------------------------------------------------------------------------------------------------------
function notLastPage() {
    if((totalItems - startIndex) > maxPagination) {
        return true;
    }
    return false;
}

function notFirstPage() {
    if (startIndex !== 0) {
        return true;
    }
    return false;
}

function moreThanFour() {
    if ((totalItems/maxPagination) > 4) {
        return true;
    }
    return false;
}

function paginationRequired() {
    if (totalItems > maxPagination) {
        return true;
    }
    return false;
}


//Equations-----------------------------------------------------------------------------------------------------------------
function lastPageIndex() {
    return ((Math.ceil(totalItems/maxPagination) - 1 ) * maxPagination);
}

function getPageNum(index) {
    return (index/maxPagination) + 1
}

function getPageCount() {
    return (Math.ceil(totalItems/maxPagination));
}

//Local Storage---------------------------------------------------------------------------------------------------------------
function toString(object) {
    return JSON.stringify(object);
}

function toObject(string) {
    return JSON.parse(string);
}

//Accessing Local Storage
function pushData(object) {
    return localStorage.setItem(object.id, toString(object))
}

function pullData(string) {
    return toObject(localStorage.getItem(`${string}`));
}

function removeData(string) {
    return localStorage.removeItem(string)
}

function getIds() {
    let ids = [];
    for (let i=0; i<localStorage.length; i++) {
        const object = pullData(localStorage.key(i));
        ids.push(object.id);
    }
    return ids;
}

//Classes------------------------------------------------------------------------------------------------------------------------
class Book {
    constructor(
        title="Title Unavailable",
        authors=["Author Not Found"],
        cover="images/No_thumbnail.jpg", 
        categories=["Category Not Found"], 
        link="", 
        description="Description Unavailable",
        id,
        placeNumber,
        published = "Date Not Found") { 

        this.title = title;
        this.authors = authors;
        this.cover = cover;
        this.categories = categories;
        this.link = link;
        this.description = description;
        this.id = id;
        this.placeNumber = placeNumber;
        this.published = published
    }
}

//Build Book Functions----------------------------------------------------------------------------------------
function addCover(result, data) {
    let cover_div = document.createElement('div');
    cover_div.className = "result-item";
    let cover = document.createElement('img');
    cover.src = data;
    cover.className = "cover";
    cover_div.appendChild(cover);
    result.appendChild(cover_div);
}

function addTitle(result, data) {
    let title = document.createElement('p');
    title.innerHTML = data;
    title.className = "title";
    addResultItem(result, title);
}

function addDescription(result, data) {
    let description = document.createElement('p');
    description.innerHTML = data;
    description.className = "description";
    addResultItem(result, description);
}

function addAuthors(result, data) {
    let authors = document.createElement('p');
    let auth_text = String(data);
    auth_text = auth_text.replace(/,/g, ", ");
    authors.innerHTML = auth_text;
    authors.className = "authors"
    addResultItem(result, authors);
}

function addPublished(result, data) {
    let published  = document.createElement('p');
    published.innerHTML = data;
    published.className = "published";
    addResultItem(result, published);
}

function addCategories(result, data) {
    let categories = document.createElement('p');
    let cat_text = String(data);
    cat_text = cat_text.replace(/,/g, ", ");
    categories.innerHTML = cat_text;
    categories.className = "categories";
    addResultItem(result, categories);
}

function addLinks(result, data, id) {
    let link = document.createElement('a');
    link.href = data;
    link.setAttribute('target', '_blank');
    link.innerHTML = "Link"
    link.className = "actions";
    
    //Add/Remove Button
    let button;

    if(!ids.includes(id)){
        button = saveButton(id);
    } else {
        button = removeButton(id);
    }
    addResultItem(result, link, button);
}

    function saveButton(id) {
        let save_button = document.createElement('button');
        save_button.innerHTML = "Save"
        save_button.className = `button save-button ${id}`
        save_button.addEventListener("click", saveBook);
        return save_button;
    }

    function removeButton(id) {
        let remove_button = document.createElement('button');
        remove_button.innerHTML = "Remove"
        remove_button.className = `button remove-button ${id}`
        remove_button.addEventListener("click", removeBook);
        return remove_button;
    }

function addResultItem() {
    let result = arguments[0];

    let result_item = document.createElement('div');
    result_item.className = "result-item";

    let label = document.createElement('h4');
    let item = arguments[1];
    label.innerHTML = item.className[0].toUpperCase() + item.className.slice(1) + ":";
    label.className = "result-label";

    let content = document.createElement('div');
    content.className = "result-content"
    for(i = 1; i < arguments.length; i++) {
    content.appendChild(arguments[i]);
    }

    result_item.appendChild(label);
    result_item.appendChild(content);
    result.appendChild(result_item);
}

function buildBook(book, saved=false) {
    let results_area;

    if(saved) {
        results_area = document.getElementById(saved);
    } else {
        results_area = document.getElementById("results-area");
    }
    
    //Results division
    let result = document.createElement('div');
    result.className = `result`;
    result.value = {id:book.id, placeNumber:book.placeNumber};
    results_area.appendChild(result);
    //Book Cover
    addCover(result, book.cover);
    //Title
    addTitle(result, book.title);
    //Description
    // addDescription(result, book.description);
    //Authors
    addAuthors(result, book.authors);
    //Published
    addPublished(result, book.published);
    //Categories
    addCategories(result, book.categories);
    //Links
    addLinks(result, book.link, book.id);
}

// For Saved Books
function saveBook() {

    //Adds to Local Storage
    let result = this.parentElement.parentElement.parentElement
    let placeNumber = parseInt(result.value.placeNumber);
    let book = list_of_books[placeNumber];
    const time = new Date();
    book.time = time;
    console.log(book);
    pushData(book);
    ids = getIds();
    //Switches the Button
    let className = this.classList[2];
    let targets = document.getElementsByClassName(className);
    for(let target=0; target<targets.length; target++) {
        const save_button = targets[target];
        const targetDiv = save_button.parentElement;
        const remove_button = removeButton(className);
        targetDiv.replaceChild(remove_button, save_button);
    }
    //Adds to Saved Section
    buildSaved();
    alert("Book Saved");
}

function removeBook() {
    
    //Removes From Local Storage
    let id = this.classList[2];
    const book = pullData(id);
    removeData(id);
    ids = getIds();
    //Switches the Button
    let className = id;
    let targets = document.getElementsByClassName(className);
    for(let target=0; target<targets.length; target++) {
        const remove_button = targets[target];
        const targetDiv = remove_button.parentElement;
        const save_button = saveButton(className);
        targetDiv.replaceChild(save_button, remove_button);
    }
    console.log("Remove Buttons Replaced");
    //Removes from Saved Section
    buildSaved();
    alert("Book Removed");
}

// Search Functions-------------------------------------------------------------------------------------

    // Search Function
    async function search(query) {
        currentQuery = query;
        resetList();
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxPagination}&startIndex=${startIndex}&key=${yourAPIKey}`
        );
        const bookObjects = await response.json();
        totalItems = bookObjects.totalItems;
        
        //Caps the Total Search Items
        if (totalItems > itemLimit) {
            totalItems = itemLimit;
        }

        pushBooks(bookObjects);
        
    }

    // Places books in list
    async function pushBooks(bookObjects) {
        list_of_books = [];
        const books = await bookObjects.items;
        showResults();
        clearPagination();
        pagination();
        for (const book in books) {
            const bookId = books[book].id;
            // const volumeInfo = await getAllData(bookId);
            const volumeInfo = books[book].volumeInfo;
            // console.log(volumeInfo);
            let infoList = ["title", "authors", "imageLinks", "categories", "canonicalVolumeLink", "description", "id", "placeNumber", "publishedDate"];
            for(const info in infoList) {
                
                if(volumeInfo[infoList[info]] && infoList[info] === "imageLinks") {
                    infoList[info] = volumeInfo[infoList[info]]["thumbnail"];
                } 
                else if(infoList[info] === "id") {
                    infoList[info] = bookId;
                }
                else if(infoList[info] === "placeNumber") {
                    infoList[info] = book;
                }
                else if(volumeInfo[infoList[info]]) {
                    infoList[info] = volumeInfo[infoList[info]];
                }
                else {
                    infoList[info] = undefined;
                }
            };
            const new_book = new Book(
                infoList[0], //Title (String)
                infoList[1], //Authors (Array)
                infoList[2], //Image Links (String)
                infoList[3], //Categories (Array)
                infoList[4], //Link (String)
                infoList[5], //Description (String)
                infoList[6], //Object Id
                infoList[7], //Place Number
                infoList[8] //Published Date
            );
            list_of_books.push(new_book);
            // new_book.buildBook();
        };
        hideLoader();
        redirect("#results-section");

        list_of_books.forEach((book) => {
            // book.buildBook();
            buildBook(book);
        });

        console.log(list_of_books);
        
    }

        //Resets List of Books
        function resetList() {
            let results_area = document.getElementById("results-area");
            results_area.innerHTML = "";
        }

        //Get Book By Id
        async function getAllData(id) {
            response =  await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${yourAPIKey}`);
            data = await response.json();
            return data.volumeInfo;
        }

   
    //#################################################################
    //Implements Pagination if there are more than 6 results
    function pagination() {
        if(paginationRequired()) {
            console.log(`There are ${totalItems} results`)
            makePagButtons();
        }
    }

    //Clears Pagination
    function clearPagination() {
        const pagination = document.getElementsByClassName("pagination");
        for (i=0; i<pagination.length; i++) {
            pagination[i].innerHTML = "";
        }
    } 

    function makePagButtons() {
        // Previous Button
        makePrevButton();
        // Pages List
        makePagesButtons();
        // Next Button
        makeNextButton();
        
    }

    function makePrevButton() {
        const pagination = document.getElementsByClassName("pagination");
        for (i=0; i<pagination.length; i++) {
            const prev = document.createElement("button");
            prev.classList = "prev";
            prev.addEventListener("click", prevResults);
            prev.innerHTML = "Prev";
            if(!notFirstPage()) {
                prev.style.visibility = "hidden";
            }
            pagination[i].appendChild(prev);

         
        }
    }

    function makeNextButton() {
        const pagination = document.getElementsByClassName("pagination");
        for (i=0; i<pagination.length; i++) {
            const next = document.createElement("button");
            next.classList = "next";
            next.addEventListener("click", nextResults);
            next.innerHTML = "Next";
            if(!notLastPage()) {
                next.style.visibility = "hidden";
            }
            pagination[i].appendChild(next);

      
        }
    }
    
    function makePagesButtons() {
        const pagination = document.getElementsByClassName("pagination");
        function makeButton(index, has_ellipses) {
            for (let i=0; i < pagination.length; i++) {
                const button = document.createElement("button");
                button.className = "pag-button"
                button.value = index;
                button.innerHTML = getPageNum(button.value);
                button.addEventListener("click", () => {
                    pagListButtons(index);
                });

                const ellipses = document.createElement("p");
                ellipses.classList = "ellipses";
                ellipses.innerHTML = "...";   

                if (has_ellipses) {
                    pagination[i].appendChild(ellipses);
                }

                if (index == startIndex) {
                    button.classList.add("active-button")
                    console.log(button);
                }
                pagination[i].appendChild(button);  
            }  
        }
        let indeces = [];
        //If Pages are More Than Four
        if (moreThanFour()) {
            //If on First, Second, or Third
            if(startIndex >= 0 && startIndex < (3*maxPagination)) {
                indeces = [0, (maxPagination),  (2*maxPagination),  (3*maxPagination), lastPageIndex()]
            }
            // If on Pages 47-50
            else if(startIndex <= itemLimit && startIndex >= (itemLimit - 3*maxPagination)) {
                indeces = [0, lastPageIndex() - (3*maxPagination), lastPageIndex() - (2*maxPagination), lastPageIndex() - (maxPagination), lastPageIndex()]
            }
            else {
                indeces = [0, startIndex - maxPagination, startIndex, startIndex + maxPagination, lastPageIndex()]
            }
        }
        else {
            const pages = getPageCount();
            for(let i=0; i<pages; i++) {
                indeces.push(i*maxPagination);
            }
        }
 
        
        //Builds Page List Buttons
        for (let i=0; i < indeces.length; i++) {
            let has_ellipses = false;
            if ((i === 1) && (indeces[i]-indeces[0]) >= 2*maxPagination || 
                (i === 4) && (indeces[i]-indeces[3]) >= 2*maxPagination) {
                has_ellipses = true;      
            }
            makeButton(indeces[i], has_ellipses);                    
        }
    }
    

    //###############################################################################
    //Functions for Pag buttons
    //Previous Results Button
    function prevResults(){
        event.preventDefault()
        console.log("Prev Result Working");
        if (startIndex >= maxPagination) {
            showResultsLoader();
            startIndex -= maxPagination;
            search(currentQuery);
        }
    }
    //Next Results Button
    function nextResults(){
        event.preventDefault();
        console.log("Next Result Working");
        if (notLastPage()){
            showResultsLoader();
            startIndex += maxPagination;
            search(currentQuery);
        }
    }

    function pagListButtons(index) {
        event.preventDefault();
        console.log("Pag Button Working");
        showResultsLoader();
        startIndex = index;
        search(currentQuery);
    }

    //##################################################### 
    // Functions for Loaders
    function showSearchLoader() {
        let loaders = document.getElementsByClassName("loader1");
        for (let i=0; i<loaders.length; i++) {
            loaders[i].style.visibility = "visible";
        }
    }

    function showResultsLoader() {
        let loaders = document.getElementsByClassName("loader2");
        for (let i=0; i<loaders.length; i++) {
            loaders[i].style.visibility = "visible";
        }
    }

    function hideLoader() {

        let loaders = document.getElementsByClassName("loader");
        for (let i=0; i<loaders.length; i++) {
            loaders[i].style.visibility = "hidden";
        }
    }

    //#######################################################

    // Misc Function 

    function redirect(id) {
        window.location.replace(`${id}`);
    }

    function showResults() {
        let results = document.getElementById("results-section");
        resultsHeader();
        results.style.display = "flex";
    }

    function resultsHeader() {
        let header = document.getElementById("results-header");
        header.innerHTML = `Results for "${currentQuery}"`
    }


// Saved Functions-------------------------------------------------------------------------------------

function buildSaved() {
    let no_books = document.getElementById("no-books");
    let header = document.getElementById("saved-header");
    let saved_area = document.getElementById("saved-area");
    saved_area.innerHTML = "";
    let books = [];
    for (let i=0; i<localStorage.length; i++) {
        book = pullData(localStorage.key(i));
        books.push(book);
    }
    books = books.sort((a, b) => {
        return new Date(a.time) - new Date(b.time) ;
    });
    if(books.length > 0) {
        no_books.style.display = "none";
        header.style.display = "flex";
        for (let i=0; i<books.length; i++) {
            book = books[i];
            buildBook(book, "saved-area")
        }
    }
    else {
        header.style.display = "none";
        no_books.style.display = "flex";
    }


}
//Adding Event Listeners------------------------------------------------------------------------------------------------
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
    showSearchLoader();
    startIndex = 0;
    const query = document.getElementById("search").value;
    search(query);
});