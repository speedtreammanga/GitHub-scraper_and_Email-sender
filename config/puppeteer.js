
const GITHUB = {
    url_login: 'https://github.com/login',
    // the url search to fetch the people we want.
    url_search: 'https://github.com/search?utf8=%E2%9C%93&q=location%3AMontreal+language%3AJavaScript&type=Users&ref=advsearch&l=&l=JavaScript',
    username_selector: '#login_field',
    password_selector: '#password',
    login_selector: '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block',
    search_selector: 'body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.d-flex.flex-justify-between.flex-auto > div:nth-child(1) > div > div > form > label > input.form-control.header-search-input.js-site-search-focus',
    search_results_class: '#js-pjax-container > div > div.columns > div.column.three-fourths.codesearch-results > div > div.d-flex.flex-justify-between.border-bottom.pb-3 > h3',
    search_pagination: '#user_search_results > div.paginate-container > div',
    pagination_max: '#user_search_results > div.paginate-container > div > a:nth-child(9)',
    search_results_for_page: 'https://github.com/search?l=JavaScript&p=INDEX&q=location%3AMontreal+language%3AJavaScript&ref=advsearch&type=Users&utf8=%E2%9C%93',
    user: {
        container: 'user-list-item',
        username: '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > a',
        fullname: '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > span',
        email: '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > ul > li:nth-child(2) > a',
        bio: '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > p',
    }
}

/**
 * Used to be useful for the old way of sending emails
 * @see sendmails.js for the old way.
 */
const GMAIL = {
    login: {
        url: 'https://accounts.google.com/signin/v2/sl/pwd?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin',
        email_sel: '#identifierId',
        email_next_sel: '#identifierNext',
        password_sel: '#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input',
        password_next_sel: '#passwordNext',
    },
    drafts: {
        sel: 'div.byl > div.TK > .aim:nth-child(4) > div.TO > div > div.aio.UKr6le > span > a',
        url: 'https://mail.google.com/mail/u/0/#drafts',
        count: 400,
        tbody: '.ae4.UI > div.Cp > div > table.F.cf.zt > tbody',
        single_draft: '.ae4.UI > div.Cp > div > table.F.cf.zt > tbody tr:nth-child(INDEX)',
    },
    mail: {
        // compose_sel: '.aic > .z0 > .T-I.J-J5-Ji.T-I-KE.L3',
        // to_sel: '.AD textarea'
        subject_sel: 'form > div.aoD.az6 > input.aoT',
        send_sel: '.T-I.J-J5-Ji.aoO.T-I-atl.L3',
    }

}

module.exports = {
    GITHUB,
    GMAIL,
}