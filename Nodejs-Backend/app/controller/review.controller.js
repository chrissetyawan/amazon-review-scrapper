const db = require('../config/db.config.js');
const Review = db.reviews;
const puppeteer = require('puppeteer');

// Find a data by Id
exports.findById = async (req, res) => {
    const id = req.params.id;
    const pageNumber = req.query.pageNumber;
    const reviewerType = req.query.reviewerType;
    const filterByStar = req.query.filterByStar;

    const url = 'https://www.amazon.com/product-reviews/' + id + 
                    "?pageNumber=" + pageNumber +
                    "&reviewerType=" + reviewerType +
                    "&filterByStar=" + filterByStar +
                    "&sortBy=recent";
                    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(url);
    await page.waitForSelector('body');

    let data = await page.evaluate( async () =>  {
        let reviews = [];
        let Elms = await document.querySelectorAll('.review');
        Elms.forEach( async (element) => {
            let reviewJson = {};
            try {
                reviewJson.author = element.querySelector('span.a-profile-name').innerText;
                reviewJson.avatar = element.querySelector('div.a-profile-avatar > img').getAttribute("src");
                reviewJson.authorLink = "https://www.amazon.com/" + element.querySelector('a.a-profile').getAttribute("href");
                
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

        // let rating = {};
        // Elms = await document.querySelectorAll('tr.a-histogram-row');
        // Elms.forEach( async (element) => {
        //     const name = element.querySelector('td.aok-nowrap > span.a-size-base > a').innerText.trim().replace('%', '');
        //     if (name === '5 star')
        //         rating.five = element.querySelector('td.a-text-right.a-nowrap > span.a-size-base > a').innerText.replace('%', '');
        //     if (name === '4 star')
        //         rating.four = element.querySelector('td.a-text-right.a-nowrap > span.a-size-base > a').innerText.replace('%', '');
        //     if (name === '3 star')
        //         rating.three = element.querySelector('td.a-text-right.a-nowrap > span.a-size-base > a').innerText.replace('%', '');
        //     if (name === '2 star')
        //         rating.two = element.querySelector('td.a-text-right.a-nowrap > span.a-size-base > a').innerText.replace('%', '');
        //     if (name === '1 star')
        //         rating.one = element.querySelector('td.a-text-right.a-nowrap > span.a-size-base > a').innerText.replace('%', '');
        // })

        // let total = document.body.querySelector('.a-size-base.a-color-secondary').innerText.replace('customer ratings', '').trim();
        // total = total.replace(',', '').replace('.', '')
        // rating.total2 = total
        // rating.one = parseInt(rating.one / 100 * total);
        // rating.two = parseInt(rating.two / 100 * total);
        // rating.three = parseInt(rating.three / 100 * total);
        // rating.four = parseInt(rating.four / 100 * total);
        // rating.five = parseInt(rating.five / 100 * total);
        // rating.total = rating.one + rating.two + rating.three + rating.four + rating.five
        // return {reviews, rating};

        let reviewSummary = "";
        try {
            reviewSummary = document.body.querySelector('.a-section.a-spacing-medium > span.a-size-base').innerText.trim();
        }
        catch (err){
            console.log(err)
        }
        return { reviews, reviewSummary }
    });

    await browser.close();
    res.send({ reviewSummary : data.reviewSummary, reviews : data.reviews  });
}
