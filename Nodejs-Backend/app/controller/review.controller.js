const db = require('../config/db.config.js');
const Review = db.reviews;
const puppeteer = require('puppeteer');

// Find a data by Id
exports.findById = async (req, res) => {
    const id = req.params.id;
    const url = 'https://www.amazon.com/product-reviews/' + id;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(url);
    await page.waitForSelector('body');

    let reviewData = await page.evaluate( async () =>  {
        let reviews = [];
        let Elms = await document.querySelectorAll('.review');
        
        Elms.forEach( async (element) => {
            let reviewJson = {};
            try {
                reviewJson.author = element.querySelector('span.a-profile-name').innerText;
                reviewJson.avatar = element.querySelector('div.a-profile-avatar > img').getAttribute("src");
                reviewJson.authorLink = "https://www.amazon.com/" + element.querySelector('a.a-profile').getAttribute("href");
                // reviewJson.verified = element.querySelector('span.a-size-mini.a-color-state.a-text-bold').innerText;
                reviewJson.verified = "No";
                if(element.querySelector('span.a-size-mini.a-color-state.a-text-bold').innerText === 'Verified Purchase'){
                    reviewJson.verified = "Yes";
                }
                
                reviewJson.pictureIncluded = "No";
                if(element.querySelector('div.review-image-tile-section')){
                    reviewJson.pictureIncluded = "Yes";
                }

                reviewJson.title = element.querySelector('.review-title').innerText;
                reviewJson.reviewLink = "https://www.amazon.com/" + element.querySelector('.review-title').getAttribute("href");
                reviewJson.rating = element.querySelector('.review-rating').innerText;
                reviewJson.rating = reviewJson.rating.substring(0,1);
                reviewJson.date = element.querySelector('.review-date').innerText;
                reviewJson.commentCount = element.querySelector('span.review-comment-total.aok-hidden').innerText;
                reviewJson.body = element.querySelector('span.a-size-base.review-text.review-text-content').innerText;
            }
            catch (err){
              console.log(err)
            }
            reviews.push(reviewJson);
        });
        return reviews;
    });

    await browser.close();
    res.send({reviews : reviewData});
}
