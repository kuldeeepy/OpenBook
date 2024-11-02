
const endpoint = 'https://openlibrary.org/subjects'
let offset = 0;

// Kids
export async function getForKids() {

    let resp = await fetch(`${endpoint}/kids.json?limit=10&offset=${offset}`);
    let data = await resp.json();

    if (data.works) {
        return data.works
    } else {
        console.error('Error: No kids-book found!')
    }
    
}

// Science-Fiction
export async function getScienceFic() {

    let resp = await fetch(`${endpoint}/sci-fi.json?limit=10&offset=${offset}`);
    let data = await resp.json();

    if (data.works) {
        return data.works
    } else {
        console.error('Error: No sci-fi - books found!')
    }
    
}

// Fantasy
export async function getFantasy() {

    let resp = await fetch(`${endpoint}/fantasy.json?limit=10&offset=${offset}`);
    let data = await resp.json();

    if (data.works) {
        return data.works
    } else {
        console.error('Error: No fantasy-books found!')
    }
    
}

// Finance
export async function getFinance() {

    let resp = await fetch(`${endpoint}/finance.json?limit=10&offset=${offset}`);
    let data = await resp.json();

    if (data.works) {
        return data.works
    } else {
        console.error('Error: No finance-books found!')
    }
    
}

// Romance
export async function getRomance() {

    let resp = await fetch(`${endpoint}/romance.json?limit=10&offset=${offset}`);
    let data = await resp.json();

    if (data.works) {
        return data.works
    } else {
        console.error('Error: No romance-books found!')
    }
    
}

// Religious
export async function getReligious() {

    let resp = await fetch(`${endpoint}/religious.json?limit=10&offset=${offset}`);
    let data = await resp.json();

    if (data.works) {
        return data.works
    } else {
        console.error('Error: No religious-books found!')
    }
    
}

// Best-sellers 
export async function getBestSellers() {

    let resp = await fetch(`${endpoint}/bestsellers.json?limit=10&offset=${offset}`);
    let data = await resp.json();

    if (data.works) {
        return data.works
    } else {
        console.error('Error: No best-sellers found!')
    }
    
}