
let param = new URLSearchParams(window.location.search);
let bookId = param.get("book_id")
let coverId = param.get("cover_id")

if (bookId) {

    if (bookId[0] === '/') {

        let res = await fetch(`https://openlibrary.org${bookId}/editions.json`);
        let data = await res.json()

        const {isbn_10, isbn_13} = data.entries[0] || data.entries[1];

        const info = isbn_10 || isbn_13 || data.entries[1]?.isbn_10 || data.entries[1]?.isbn_13
        
        fetchBookByIsbn(info, coverId)
    } else {
        fetchBookByIsbn(bookId, coverId)
    }
} else {
    console.error("BookInfo not available!")
}

// Fetching book details!

async function fetchBookByIsbn(bukId, bukCover) {  


    let resp = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${bukId}&format=json&jscmd=data`);
    // let resp = await fetch(`https://cors-anywhere.herokuapp.com/http://openlibrary.org/api/volumes/brief/isbn/${bukIsbn}.json`)
    let data = await resp.json();

    console.log(data);
    

    const {authors, cover, excerpts, publish_date, publishers, title} = data[`ISBN:${bukId}`];

    let img = !cover ? `https://covers.openlibrary.org/b/id/${bukCover}-L.jpg` : cover.large; 

    let bookDiv = document.createElement("div");
    bookDiv.className = 'book';

    bookDiv.innerHTML = `
        <h2>${title}</h2>
        <p>by ${authors[0]?.name}</p>
        <img src="${img}" loading="lazy" alt="${title}">
        <button>Read Now</button>
    `
    document.getElementById("container").appendChild(bookDiv)
}

