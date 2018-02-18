const fs = require('fs');
const json2csv = require('json2csv');
const puppeteer = require('puppeteer');

const {GITHUB_CREDS} = require('../config/creds');
const {GITHUB} = require('../config/puppeteer');

async function init() {
    try {
        console.log('Launching Headless Github Advanced Search...');
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = (await browser.pages())[0];
        // go to Github's login page
        await page.goto(GITHUB.url_login);
        // Focus on username input and type in username
        await page.click(GITHUB.username_selector);
        await page.keyboard.type(GITHUB_CREDS.username);
        // Focus on password input and type in password
        await page.click(GITHUB.password_selector);
        await page.keyboard.type(GITHUB_CREDS.password);
        // Click on Login button and wait for navigation
        console.log('Logging in...');
        await page.click(GITHUB.login_selector);
        await page.waitForNavigation();
        console.log('success! 🎉');
        // Go to advanced search url
        console.log('navigating to avdanced search results...');
        await page.goto(GITHUB.url_search);
        await page.waitFor(2000);
        console.log('success! 🎉');
        // Find out how many users are listed per page...
        const LIST_LENGTH = await page.evaluate((selector) => {
            return document.getElementsByClassName(selector).length;
        }, GITHUB.user.container);
        // Find out how many page results are there...
        const PAGE_COUNT = await page.evaluate((selector) => {
            return document.querySelector(selector).innerHTML;
        }, GITHUB.pagination_max);

        // const PAGE_COUNT = 2;

        let users = [];

        // for each results page, get search results data...
        for (let page_index = 1; page_index <= PAGE_COUNT; page_index++) {
            // console.log('page results', page_index);
            for (let user_index = 1; user_index <= LIST_LENGTH; user_index++) {
                // console.log('fetching user', user_index);
                const user_selectors = {
                    username: GITHUB.user.username.replace('INDEX', user_index),
                    fullname: GITHUB.user.fullname.replace('INDEX', user_index),
                    email: GITHUB.user.email.replace('INDEX', user_index),
                    bio: GITHUB.user.bio.replace('INDEX', user_index)
                };

                const newUser = {};

                for (const key of Object.keys(user_selectors)) {
                    newUser[key] = await page.evaluate((selector) => {
                        const element = document.querySelector(selector);
                        return element ? element.innerText : null;
                    }, user_selectors[key]);
                }
                if (newUser.email) {
                    newUser.firstname = newUser.fullname.split(' ')[0];
                    users.push(newUser);
                }
            }

            if (page_index != PAGE_COUNT) {
                await page.goto(GITHUB.search_results_for_page.replace('INDEX', page_index + 1));
                await page.waitFor(1500);
            }
        }
        writeToFile(users);
        // console.log(users);

        // for (let index = 0; index < array.length; index++) {
        //     const element = array[index];
            
        // }


        // await page.close();
        // await browser.close();
        console.log('ended session!');
    } catch (err) {
        console.log('Something went wrong!', err);
    }
}

function writeToFile(data) {
    const fields = ['firstname', 'email', 'username', 'fullname', 'bio'];
    const csv = json2csv({data, fields});

    fs.writeFile('List_of_GitHub_users.csv', csv, (err) => {
        if (err) console.log('something went wrong..', err);
        console.log('file saved!');
    });
}

if (GITHUB_CREDS.password === '[__BLANK__]') {
    console.error('⚠️ Before continuing you need to set a password for your github account.\n⚡️ You can find it in the config/GITHUB_CREDS.js file');
} else {
    init();
}