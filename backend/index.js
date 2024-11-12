const express = require("express");
const puppeteer = require("puppeteer");
require("dotenv").config();
const app = express();

const base = process.env.BASE_URL
const PORT = process.env.PORT 


async function searchBooks(q) {

    let browser = null;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
            executablePath: process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
        });
        const page = await browser.newPage();
        // await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36");
        await page.goto(`${base}/search?q=${encodeURIComponent(q)}&page=1`, { waitUntil: 'networkidle2', timeout: 90000});

        const books = await page.evaluate((baseUrl) => {
            const result = [];
            const bookElements = document.querySelectorAll(".files-new ul li");

            bookElements.forEach((element) => {
                const title = element.querySelector(".file-left img")?.getAttribute('title');
                const year = element.querySelector(".file-right .fi-year")?.textContent.trim();
                const size = element.querySelector(".file-right .fi-size")?.textContent.trim();
                const pageCount = element.querySelector(".file-right .fi-pagecount")?.textContent.trim();
                const image = element.querySelector(".file-left img")?.getAttribute('src');
                const bookUrl = `${baseUrl}${element.querySelector('.file-left a')?.getAttribute('href')}`;

                if (title && bookUrl) {
                    result.push({ title, year, size, pageCount, image, bookUrl });
                }
            });

            return result;
        }, base);
        return books;
    } catch (error) {
        console.error("Error fetching books:", error);
    } finally {
        if (browser) await browser.close();
    }
};

async function getDownloadLink(bookUrl) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(bookUrl, { waitUntil: 'networkidle2', timeout: 50000 });

    const initialDownloadSelector = '#download-button > a';
    await page.waitForSelector(initialDownloadSelector, { visible: true, timeout: 50000 });
    const initialDownloadLink = await page.$eval(initialDownloadSelector, element => element.href);

    await page.goto(initialDownloadLink, { waitUntil: 'networkidle2' });

    const finalDownloadSelector = '.btn-group a[type="button"]';
    await page.waitForSelector(finalDownloadSelector, { visible: true, timeout: 50000 });
    const finalDownloadLink = await page.$eval(finalDownloadSelector, element => element.href);

    await browser.close();
    return {finalDownloadLink}
}

app.get("/searchbooks", async (req, res) => {
    
    const query = req.query.q;
    if (!query) return res.status(400).json({error: "Missing query param 'q'"});

    const books = await searchBooks(query);
    res.json(books);
})

app.get("/ebook", async (req, res) => {

    const query = req.query.q;
    if (!query) return res.status(400).json({error: "Missing query 'q"});

    const downloadUrl = await getDownloadLink(query);
    res.json(downloadUrl)
})

app.get("/wakeup", (req, res) => res.send("Server is awake!"));

app.listen(PORT, () => {    
    console.log(`Server running on port ${PORT}`);
});
