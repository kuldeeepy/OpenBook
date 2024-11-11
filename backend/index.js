const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;

app.get("/wakeup", (req, res) => res.send("Server is awake!"))

app.get("/ebook", async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
    
        await page.goto(`https://pdfdrive.com/search?q=${query}&page=1`, { waitUntil: 'domcontentloaded' });
    
        const books = await page.evaluate(() => {
            let result = [];
            const bookElements = document.querySelectorAll(".files-new ul li");
    
            bookElements.forEach((element) => {
                let title = element.querySelector(".file-right h2")?.textContent.trim();
                let year = element.querySelector(".file-right .fi-year")?.textContent.trim();
                let size = element.querySelector(".file-right .fi-size")?.textContent.trim();
                let pageCount = element.querySelector(".file-right .fi-pagecount")?.textContent.trim();
                let image = element.querySelector(".file-left img")?.getAttribute("data-original")?.replace("-s", "");
                let bookUrl = `https://www.pdfdrive.com${element.querySelector('.file-left a')?.getAttribute('href')}`;
    
                result.push({ title, year, size, pageCount, image, bookUrl });
            });

            return result;
        });

        await browser.close();

        for (let book of books) {
            const data = await getDownloadLink(book.bookUrl);
            book.downloadUrl = data.url;
            book.author = data.author;
        }

        return res.json(books); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting the ebook!" });
    }
});

async function getDownloadLink(bookUrl) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(bookUrl, { waitUntil: 'domcontentloaded' });

    const downloadLink = await page.evaluate(() => {
        const mainButton = document.getElementById("previewButtonMain")?.getAttribute("data-preview");
        const authorEl = document.querySelector(".ebook-author a span");

        const data = {};

        if (mainButton && authorEl) {
            data.url = `https://pdfdrive.com/download.pdf?id=${mainButton.split('=')[1]}&h=${mainButton.split('&')[1].split('=')[1]}&u=cache&ext=pdf`;
            data.author = authorEl.textContent.trim();
            return data;
        }
        return data;
    });

    await browser.close();
    return downloadLink;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
