const {GMAIL_CREDS} = require('../config/creds');
const _progress = require('cli-progress');
const send = require('gmail-send')({});

/**
 * Your email address.
 */
const FROM_EMAIL = 'fournier.afa@gmail.com';
/** 
 * The body of the email.
*/
const MESSAGE_BODY = `Hey there,
I'll present myself, I'm Alex, a Full-Stack developer and book reader.

I don't want to waste your time, so allow me to go straight to the point.
I am currently looking for a new job, something new with challenges!

Thank you.
Alex,
your friendly web developer ;)
`
/** 
 * The list of people you want to send an email to.
 * @description Import your own array of people.
*/
const humans = [
    {
        name: 'Alex',
        email: 'a7ddgh+3jtw5f8onrg9s@sharklasers.com'
    },
];

/** 
 * The progress bar displayed in the terminal.
*/
let progress;

/**
 * Starts the mailing.
 */
init = () => {
    // displays a progress bar...
    console.log('Sending emails...');
    progress = new _progress.Bar({
        format: 'progress [{bar}] {percentage}% | {value}/{total}'
    }, _progress.Presets.shades_classic);
    progress.start(humans.length, 0);
    startSending();
}

/**
 * Iterate through all the `humans` we wish to send
 * an email to...
 */
startSending = () => {
    for (let i = 0; i < humans.length; i++) {
        sendEmail(humans[i]);
    }
}


/**
 * Checks if we've sent the last email.
 */
isLastEmail = (index) => {
    return index === (humans.length);
}

/**
 * Stops the progress.
 */
stopProgress = () => {
    progress.stop();
    console.log('Congrats, your emails were all sent 🎉');
}

/**
 * The function responsible to send an email
 * to a given `human`.
 */
sendEmail = (human) => {
    try {
        // updating the new email signature...
        send({
            user: FROM_EMAIL,
            from: 'Alexandre Fournier-Ahizoune',
            replyTo: FROM_EMAIL,
            pass: 'afa123AFA',
            subject: `Hey ${human.name}, it's Alex 👋`,
            to: human.email,
            text: MESSAGE_BODY,
        }, (err, res) => {
            if (err)
                console.error('Sending mail failed,', err);

            // update progress paint...
            progress.update(progress.value + 1);

            // check if it's the last email...
            if (isLastEmail(progress.value)) {
                // stop the progress...
                stopProgress();
                return;
            }
        })
    } catch (err) {
        console.log('something went very wrong,', err);
    }
}

if (GMAIL_CREDS.password === '[__BLANK__]') {
    console.error('⚠️ Before continuing you need to set a password for your gmail account.\n⚡️ You can find it in the config/creds.js file');
} else {
    init();
}