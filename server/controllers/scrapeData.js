const puppeteer = require("puppeteer");

async function configureTheBrowser(url) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 0 })
  return page;
}

async function checkDetails(page) {
  let html = await page.evaluate(() => {

    // Rating
    let ratingElement = document.body.querySelector('.a-icon.a-icon-star').getAttribute('class');
    let integer = ratingElement.replace(/[^0-9]/g,'').trim();
    let parsedRating = parseInt(integer) / 10;

    return {
      product: document.querySelector("#productTitle").innerText,
      image: document.querySelector("#landingImage").src,
      rating: parsedRating,
    }
  })

  return html;
}

exports.getScrapeData = async (req, res) => {
  try {
    let page = await configureTheBrowser(req.body.url);
    let results = await checkDetails(page)
    res.send(results);
  } catch (error) {
    console.error(error)
  }
}
