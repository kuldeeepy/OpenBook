// const puppeteer = require("puppeteer")
import puppeteer from "puppeteer";

let param = new URLSearchParams(window.location.search);
let bookId = param.get("book_id")
let coverId = param.get("cover_id")

init()

async function init() {

    if (bookId) {

        if (bookId[0] === '/') {
    
            let res = await fetch(`https://openlibrary.org${bookId}/editions.json`);
            let data = await res.json()
    
            const {isbn_10, isbn_13} = data?.entries[0] || data?.entries[1];
            const info = isbn_10 || isbn_13 || data.entries[1]?.isbn_10 || data.entries[1]?.isbn_13
    
            // info ? fetchBookByIsbn(info, coverId) : notFoundError();
            fetchBookByIsbn(info, coverId)
            
        } else {
            fetchBookByIsbn(bookId, coverId)
        }
    } else {
        console.error("BookInfo not available!")
    }
}


// Fetching book info from (archive.org!
async function fetchBookByIsbn(bukId, bukCover) {  

    let resp = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${bukId}&format=json&jscmd=data`);
    // let resp = await fetch(`https://cors-anywhere.herokuapp.com/http://openlibrary.org/api/volumes/brief/isbn/${bukIsbn}.json`)
    let data = await resp.json();

    console.log(data[`ISBN:${bukId}`]);

    const {authors, cover, excerpts, publish_date, publishers, title} = data[`ISBN:${bukId}`];
    title ? fetchEbook(title) : null;

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

// Getting ebook link
async function fetchEbook(query) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://pdfdrive.com/search?q=${query}&page=1`, {waitUntil: 'domcontentloaded'});

    const books = await page.evaluate(() => {
        
        let result = []
        const bookElements = document.querySelectorAll(".files-new ul li");

        bookElements.forEach((element) => {
            let title = document.querySelector(".file-right h2")?.textContent.trim();
            let year = document.querySelector(".file-right .fi-year")?.textContent.trim();
            let size = document.querySelector(".file-right .fi-size")?.textContent.trim();
            let pageCount = document.querySelector(".file-right .fi-pagecount")?.textContent.trim();
            let image = document.querySelector(".file-left img")?.getAttribute("data-original")?.replace("-s", "");
            let bookUrl = `https://www.pdfdrive.com${element.querySelector('.file-left a')?.getAttribute('href')}`;

            result.push({title, year, size, pageCount, image, bookUrl})
        })

        return result;
    })

    await browser.close()

    for (let book of books) {
        const data = await getDownloadLink(book.bookUrl)
        book.downloadUrl = data.url;
        book.author = data.author;
    }

    return books;
}

// Download link
async function getDownloadLink(bookUrl) {
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(bookUrl, {waitUntil: 'domcontentloaded'});

    const downloadLink = await page.evaluate(() => {
        const mainButton = document.getElementById("previewButtonMain").getAttribute("data-preview");
        const authorEl = document.querySelector(".ebook-author a span");

        const data = {};

        if (mainButton && authorEl) {
            data.url = `https://pdfdrive.com/download.pdf?id=${mainButton.split('=')[1]}&h=${mainButton.split('&')[1].split('=')[1]}&u=cache&ext=pdf`
            data.author = authorEl.textContent.trim();
            return data
        }
        return data;
    })

    await browser.close()
    return downloadLink;
}


// Error handler
function notFoundError() {
    alert('Book is unavailable, redirecting you in 3s')
    setTimeout(() => {
        window.location.href = 'home.html'
    })
}