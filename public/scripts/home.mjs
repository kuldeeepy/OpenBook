import { getBestSellers, getReligious, getRomance, getFinance, getFantasy, getScienceFic, getForKids } from "./service.mjs";

const imageUrl = 'https://covers.openlibrary.org/b/id'
const fallBack = 'https://sulkurl.com/b8s'


async function init() {

    try {
        
        let bestSellers = await getBestSellers();
        displayBestsellers(bestSellers)

        let religious = await getReligious();
        displayReligious(religious)

        let romantic = await getRomance();
        displayRomance(romantic)

        let finance = await getFinance();
        displayFinance(finance)

        let fantasy = await getFantasy();
        displayFantasy(fantasy)

        let scifi = await getScienceFic();
        displayScienceFi(scifi)

        let kids = await getForKids();
        displayKids(kids)

    } catch (error) {
        console.error("We're really sorry, something broke from our end!")
    }
}

init()

// share book info
function readBook(info) {
    window.location.href = `./book.html?book_id=${info.id}&cover_id=${info.img}`
}

// for-kids buks
function displayKids(buks) {
    
    let collection = document.querySelector('.kids');

    buks?.forEach((buk) => {
        
        let book = document.createElement("div");
        // let title = buk.title.length >= 18 ? buk.title.slice(0,15) + '..' : buk.title

        let image = `${imageUrl}/${buk.cover_id}-M.jpg`
        book.innerHTML = `
            <img src="${buk.cover_id ? image : fallBack}" loading="lazy" alt="${buk.title}">
            <button>Read</button>
        `
        collection.appendChild(book)

        book.querySelector("button").addEventListener("click", () => {

            readBook({id: buk.availability?.isbn ? buk.availability.isbn : buk.key, img: buk.cover_id})
        })
    })
}

// sci-fi buks
function displayScienceFi(buks) {
    
    let collection = document.querySelector('.sci-fi');

    buks?.forEach((buk) => {
        
        let book = document.createElement("div");
        // let title = buk.title.length >= 18 ? buk.title.slice(0,15) + '..' : buk.title

        let image = `${imageUrl}/${buk.cover_id}-M.jpg`
        book.innerHTML = `
            <img src="${buk.cover_id ? image : fallBack}" loading="lazy" alt="${buk.title}">
            <button>Read</button>
        `
        collection.appendChild(book)
        
        book.querySelector("button").addEventListener("click", () => {

            readBook({id: buk.availability?.isbn ? buk.availability.isbn : buk.key, img: buk.cover_id})
        })
    })
}

// fantasy buks
function displayFantasy(buks) {
    
    let collection = document.querySelector('.fantasy');

    buks?.forEach((buk) => {
        
        let book = document.createElement("div");
        // let title = buk.title.length >= 18 ? buk.title.slice(0,15) + '..' : buk.title

        let image = `${imageUrl}/${buk.cover_id}-M.jpg`
        book.innerHTML = `
            <img src="${buk.cover_id ? image : fallBack}" loading="lazy" alt="${buk.title}">
            <button>Read</button>
        `
        collection.appendChild(book)

        book.querySelector("button").addEventListener("click", () => {

            readBook({id: buk.availability?.isbn ? buk.availability.isbn : buk.key, img: buk.cover_id})
        })
    })
}

// finance buks
function displayFinance(buks) {
    
    let collection = document.querySelector('.finance');

    buks?.forEach((buk) => {
        
        let book = document.createElement("div");
        // let title = buk.title.length >= 18 ? buk.title.slice(0,15) + '..' : buk.title

        let image = `${imageUrl}/${buk.cover_id}-M.jpg`
        book.innerHTML = `
            <img src="${buk.cover_id ? image : fallBack}" loading="lazy" alt="${buk.title}">
            <button>Read</button>
        `
        collection.appendChild(book)

        book.querySelector("button").addEventListener("click", () => {

            readBook({id: buk.availability?.isbn ? buk.availability.isbn : buk.key, img: buk.cover_id})
        })
    })
}

// romantic buks
function displayRomance(buks) {
    
    let collection = document.querySelector('.romance');

    buks?.forEach((buk) => {
        
        let book = document.createElement("div");
        // let title = buk.title.length >= 18 ? buk.title.slice(0,15) + '..' : buk.title

        let image = `${imageUrl}/${buk.cover_id}-M.jpg`
        book.innerHTML = `
            <img src="${buk.cover_id ? image : fallBack}" loading="lazy" alt="${buk.title}">
            <button>Read</button>
        `
        collection.appendChild(book)

        book.querySelector("button").addEventListener("click", () => {

            readBook({id: buk.availability?.isbn ? buk.availability.isbn : buk.key, img: buk.cover_id})
        })
    })
}

// religious buks
function displayReligious(buks) {
    
    let collection = document.querySelector('.religious');

    buks?.forEach((buk) => {
        
        let book = document.createElement("div");
        // let title = buk.title.length >= 18 ? buk.title.slice(0,15) + '..' : buk.title

        let image = `${imageUrl}/${buk.cover_id}-M.jpg`
        book.innerHTML = `
            <img src="${buk.cover_id ? image : fallBack}" loading="lazy" alt="${buk.title}">
            <button>Read</button>
        `
        collection.appendChild(book)

        book.querySelector("button").addEventListener("click", () => {

            readBook({id: buk.availability?.isbn ? buk.availability.isbn : buk.key, img: buk.cover_id})
        })
    })
}

// best-seller buks
function displayBestsellers(buks) {
    
    let collection = document.querySelector('.bestseller');

    buks?.forEach((buk) => {

        let book = document.createElement("div");
        // let title = buk.title.length >= 18 ? buk.title.slice(0,15) + '..' : buk.title

        let image = `${imageUrl}/${buk.cover_id}-M.jpg`
        book.innerHTML = `
            <img src="${buk.cover_id ? image : fallBack}" loading="lazy" alt="${buk.title}">
            <button>Read</button>
        `
        collection.appendChild(book)

        book.querySelector("button").addEventListener("click", () => {

            readBook({id: buk.availability?.isbn ? buk.availability.isbn : buk.key, img: buk.cover_id})
        })
    })
}