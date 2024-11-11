const express = require("express");
const puppeteer = require("puppeteer");
const chromium = require('chrome-aws-lambda');
const fs = require('fs');
const path = require('path');
require("dotenv").config();
const app = express();

const base = process.env.BASE_URL;

app.get("/wakeup", (req, res) => res.send("Server is awake!"));

let browser;
async function launchBrowser() {
    if (!browser) {
        browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });
    }
}

// Fetching ebook
app.get("/ebook", async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
    }

    try {
        await launchBrowser();
        const page = await browser.newPage();
        await page.setRequestInterception(true);

        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.goto(`${base}/search?q=${query}&page=1`, { waitUntil: 'domcontentloaded', timeout: 60000 });

        const books = await page.evaluate((baseUrl) => {
            let result = [];
            const bookElements = document.querySelectorAll(".files-new ul li");

            bookElements.forEach((element) => {
                let title = element.querySelector(".file-right h2")?.textContent.trim();
                let year = element.querySelector(".file-right .fi-year")?.textContent.trim();
                let size = element.querySelector(".file-right .fi-size")?.textContent.trim();
                let pageCount = element.querySelector(".file-right .fi-pagecount")?.textContent.trim();
                let image = element.querySelector(".file-left img")?.getAttribute("data-original")?.replace("-s", "");
                let bookUrl = `${baseUrl}${element.querySelector('.file-left a')?.getAttribute('href')}`;

                result.push({ title, year, size, pageCount, image, bookUrl });
            });

            return result;
        }, base);  

        await page.close();

        // Fetch download link and author for each book
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

// Getting downloadLink 
async function getDownloadLink(bookUrl) {
    await launchBrowser();
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.goto(bookUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const downloadLink = await page.evaluate((baseUrl) => {
        const mainButton = document.getElementById("previewButtonMain")?.getAttribute("data-preview");
        const authorEl = document.querySelector(".ebook-author a span");

        const data = {};

        if (mainButton && authorEl) {
            data.url = `${baseUrl}/download.pdf?id=${mainButton.split('=')[1]}&h=${mainButton.split('&')[1].split('=')[1]}&u=cache&ext=pdf`;
            data.author = authorEl.textContent.trim();
        }
        return data;
    }, base);  

    await page.close(); 
    return downloadLink;
}

process.on("exit", async () => {
    if (browser) await browser.close();
});
process.on("SIGINT", async () => {
    if (browser) await browser.close();
    process.exit();
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
