// Trust in the LORD with all your heart, lean not in your own understanding. In all your ways submit to Him, and He will make your paths straight
// -Proverbs 3:5-6

// Variables
const yourAPIKey = "AIzaSyBo9s4IfPIsyGLMb5GuGtMNdHxvoDyvpHY";
let currentQuery = "";
//Classes
class Book {
    constructor(
        title="Title Unavailable",
        authors=["Author Not Found"],
        cover="images/No_thumbnail.jpg", 
        categories=["Category Not Found"], 
        link="", 
        description="Description Unavailable") { 

        this.title = title;
        this.authors = authors;
        this.cover = cover;
        this.categories = categories;
        this.link = link;
        this.description = description;
    }

    buildBook() {
        let results_area = document.getElementById("results-area");
        //Results division
        let result = document.createElement('div');
        result.className = "result";
        results_area.appendChild(result);
        //Book Cover
        let cover = document.createElement('img');
        cover.src = this.cover;
        cover.className = "cover";
        result.appendChild(cover);
        //Title
        let title = document.createElement('p');
        title.innerHTML = this.title;
        title.className = "title";
        result.appendChild(title);
        //Authors
        let authors = document.createElement('p');
        let auth_text = String(this.authors);
        auth_text.replace(/,/g, ", ");
        authors.innerHTML = auth_text;
        authors.className = "authors"
        result.appendChild(authors);
        //Categories
        let categories = document.createElement('p');
        let cat_text = String(this.categories);
        cat_text.replace(/,/g, ", ");
        categories.innerHTML = cat_text;
        categories.className = "categories";
        result.appendChild(categories);
        //Link
        let link = document.createElement('a');
        link.href = this.link;
        link.setAttribute('target', '_blank');
        link.innerHTML = "Link"
        link.className = "link";
        result.appendChild(link);
    }
}

//Arrays
let list_of_books = [];

//Functions

    // Search Function
    async function search(query) {
        currentQuery = query;
        resetList();
        let startIndex = 0;
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=12&key=${yourAPIKey}`
        );

        pushBooks(response);
        console.log(list_of_books);
    }

    // Places books in list
    async function pushBooks(response) {
        list_of_books = [];
        const bookObjects = await response.json();
        const books = await bookObjects.items;
        
        books.forEach(book => {
            const volumeInfo = book.volumeInfo;
            let infoList = ["title", "authors", "imageLinks", "categories", "canonicalVolumeLink", "decription"];
            for(const info in infoList) {
                
                if(volumeInfo[infoList[info]] && infoList[info] === "imageLinks") {
                    infoList[info] = volumeInfo[infoList[info]]["thumbnail"];
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
                infoList[5] //Description (String)
            );
            list_of_books.push(new_book);
            new_book.buildBook();
        });
    }

    //Resets List of Books
    function resetList() {
        let results_area = document.getElementById("results-area");
        results_area.innerHTML = "";
    }

//Adding Event Listeners
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
    const query = document.getElementById("search").value;
    search(query);
});