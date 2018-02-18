# ⚠️ Warning, this code is old and is not maintained.
### puppeteer.js
- `[GitHub]` fetches a list of users with an email available for a given city and writes them to a `.csv` file.

### automails.js
- `[Gmail]` sends a custom email to a list of `people`.
```javascript
people = [
    {
        name: 'John Doe',
        email: 'john@doeInc.co'
    },
    ...
]
```

# Getting started
- Edit your login info for both GitHub and Gmail in the `config/creds.js` file.
- Update the `url_search` param of `GITHUB` in the `config/puppeteer.js` file to match your desired search query.

    - Navigate to the project's directory and simply run:

        `node src/pupeteer.js` to launch the GitHub user scraping script.

- Once you've scraped a list of users and that you've made sure they were save to a csv file, go import the list of people in the `puppeteer.js` file.

    **⚠️ Check the people Object definition above.**

    - Then, simply run:

        `node src/automails.js` to send emails to a list of people.