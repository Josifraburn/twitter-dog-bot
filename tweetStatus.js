const Twit = require('twit')
const config = require('./config')

let T = new Twit(config)


function tweetStatus(message, params) {
    let tweet = {
        status: message,
        media_ids: params,
    }
    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if(err){
            console.log('It didnt work!')
            console.log(err)
            console.log()
        } else {
            console.log('It is working!')
        };
    }
}


module.exports = tweetStatus;