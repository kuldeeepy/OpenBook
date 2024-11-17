const express = require("express");
const puppeteer = require("puppeteer");
const { connect } = require("puppeteer-real-browser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

const base = process.env.BASE_URL;
const PORT = process.env.PORT || 6969;

app.get("/wakeup", (req, res) => res.send("Server is awake!"));

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ Error: "Missing query param 'q'" });

  let books = null;
  query.length >= 2 ? (books = await searchBooks(query)) : null;
  if (!books || books.length === 0)
    return res
      .status(404)
      .json({ Error: "Book not found, try different one!" });

  res.json(books);
});

app.get("/ebook", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing query 'url'" });

  const downloadUrl = await getDownloadLink(url);
  if (!downloadUrl.ebook)
    return res
      .status(404)
      .json({ Error: "Ebook not found, try different one!" });
  res.json(downloadUrl);
});

const searchBooks = async (title) => {
  const { page, browser } = await connect({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  // const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  try {
    await page.goto(`${base}/?s=${title}&page=1`, {
      waitUntil: "networkidle2",
    });
    // await page.type('input[name="q"]', title);
    // await page.keyboard.press('Enter');
    await page.waitForSelector("#genesis-content", { timeout: 0 });

    const books = await page.evaluate((baseUrl) => {
      return Array.from(
        document.querySelectorAll("#genesis-content .post")
      ).map((book) => ({
        title: book.querySelector(".entry-title a")?.textContent.trim(),
        year: book.querySelector(".entry-meta .entry-time")?.textContent.trim(),
        thumbnail: book
          .querySelector(".entry-image-link img")
          ?.getAttribute("src"),
        url: `${book.querySelector(".entry-image-link")?.getAttribute("href")}`,
      }));
    }, base);

    return books;
  } catch (error) {
    handleErrors(error, "searchBooks");
  } finally {
    await browser.close();
  }
};

const getDownloadLink = async (bookUrl) => {
  const { page, browser } = await connect({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  try {
    await page.goto(bookUrl, { waitUntil: "networkidle2" });
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await page.mouse.move(100, 100);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Short delay

    const buttonSelector = `form[action="${base}/Fetching_Resource.php"]`;
    await page.waitForSelector(buttonSelector);
    await page.mouse.move(120, 120);
    await page.click(buttonSelector);

    const newTarget = await browser.waitForTarget(
      (target) => target.opener() === page.target(),
      { timeout: 10000 }
    );
    const newPage = await newTarget.page();

    let lastValidLink = null;

    newPage.on("response", async (response) => {
      const url = response.url();
      // console.log("Response URL:", url);

      if (url.includes("fs4.oceanofpdf.com") || url.includes(".pdf")) {
        lastValidLink = url;
      }
    });

    const maxWaitTime = 30000;
    const interval = 1000;
    let elapsedTime = 0;

    while (!lastValidLink && elapsedTime < maxWaitTime) {
      await new Promise((resolve) => setTimeout(resolve, interval));
      elapsedTime += interval;
    }

    if (lastValidLink) return { ebook: lastValidLink };
    if (!lastValidLink) return { Error: "Sorry ebook not found!" };
  } catch (error) {
    // console.error("Error in downloadBookOne function:", error);
    return { Error: "Sorry ebook not found!" };
  } finally {
    await browser.close();
  }
};

// async function searchBooks(q) {

//     let browser = null;
//     try {
//         browser = await puppeteer.launch({
//             headless: "new",
//             args: [
//                 '--no-sandbox',
//                 '--disable-setuid-sandbox',
//             ],
//             executablePath: process.env.NODE_ENV === "production"
//                 ? process.env.PUPPETEER_EXECUTABLE_PATH
//                 : puppeteer.executablePath(),
//         });
//         const page = await browser.newPage();
//         console.log('Browser Opened')
//         await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36");
//         await page.goto(`${base}/search?q=${encodeURIComponent(q)}&page=1`, { waitUntil: 'networkidle2', timeout: 50000});
//         console.log('Site Opened')
//         // await page.evaluate(() => window.scrollBy(0, window.innerHeight));
//         // await page.waitForSelector('.files-new ul li', {waitUntil: "networkidle0"})
//         const books = await page.evaluate(async (baseUrl) => {
//             const result = [];
//             const bookElements = document.querySelectorAll(".files-new ul li");
//             console.log('grabbed element')
//             bookElements.forEach((element) => {
//                 const title = element.querySelector(".file-left img")?.getAttribute('title');
//                 const year = element.querySelector(".file-right .fi-year")?.textContent.trim();
//                 const size = element.querySelector(".file-right .fi-size")?.textContent.trim();
//                 const pageCount = element.querySelector(".file-right .fi-pagecount")?.textContent.trim();
//                 const image = element.querySelector(".file-left img")?.getAttribute('src');
//                 const bookUrl = `${baseUrl}${element.querySelector('.file-left a')?.getAttribute('href')}`;

//                 if (title && bookUrl) {
//                     result.push({ title, year, size, pageCount, image, bookUrl });
//                 }
//             });

//             return result;
//         }, base);
//         console.log('Books fetched!')
//         return books;
//     } catch (error) {
//         handleErrors(error, "searchBooks")
//     } finally {
//         if (browser) await browser.close();
//     }
// };

// async function getDownloadLink(bookUrl) {

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(bookUrl, { waitUntil: 'networkidle2', timeout: 30000 });

//     const initialDownloadSelector = '#download-button > a';
//     // await page.waitForSelector(initialDownloadSelector, { visible: true, timeout: 30000 });
//     const initialDownloadLink = await page.$eval(initialDownloadSelector, element => element.href);

//     await page.goto(initialDownloadLink, { waitUntil: 'networkidle2' });

//     const finalDownloadSelector = '.btn-group a[type="button"]';
//     await page.waitForSelector(finalDownloadSelector, { visible: true, timeout: 0 });
//     let finalDownloadLink = await page.$eval(finalDownloadSelector, element => element.href);

//     finalDownloadLink = finalDownloadLink?.split('ext')[0] + "ext=pdf"
//     await browser.close();
//     return {finalDownloadLink}
// }

const handleErrors = (error, functionName) => {
  console.error(`Error in ${functionName}:`, error.message);
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
