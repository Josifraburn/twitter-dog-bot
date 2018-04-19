const Twit = require('twit')
const fetch = require('node-fetch')
const fs = require('fs')
const base64 = require('base64-stream');
const tweetStatus = require('./tweetStatus');
const randomDogPic = require('./randomDogPic')
const config = require('./config')

let T = new Twit(config)


function tweetPicture() {
    let tweetPromise =  new Promise(async (resolve) => {
        T.post('media/upload', {media_data: await randomDogPic()}, function(err, data, response) {
            let mediaIdStr =  data.media_id_string
            let meta_params = { media_id: mediaIdStr}
            
            // console.log('here is the first error', err)

            T.post('media/metadata/create', meta_params, function(err, data, response) {
                // console.log('this is the second error', err)
                if(!err) {
                    let params = [mediaIdStr]
                    // T.post('statuses/update', params, function(err, data, response) {
                    // })
                    resolve(params)
                }
            })
        })
    })
    return(tweetPromise)
}


let stream = T.stream('user');


stream.on('connect', function() {
    console.log('Connected')
})
stream.on('follow', followed)
stream.on('tweet', tweetEvent)




function tweetEvent(tweetMSG) {
    let replyTo = tweetMSG.in_reply_to_screen_name;
    let text = tweetMSG.text;
    let from = tweetMSG.user.screen_name;

    console.log('us', replyTo + from , 'from');
    console.log(text);
    // console.log('It worked');
    if(replyTo == 'dogosondemand') {
    tweetPicture()
    .then(params => { 
        let newTweet = ('@' + from + ' ' + ' Here is a picture of a doggo!');
        tweetStatus(newTweet, params)
        console.log('after tweet')
    }) 
    }  
}


function followed(eventMessage) {
    let name = eventMessage.source.name;
    let screenName = eventMessage.source.screen_name;
    tweetStatus('@' + screenName + ' Thanks for following me!')
    console.log(screenName)
    T.post('friendships/create', {screen_name: screenName} , function(err, response){
        if(err) {
            console.log(err);
        } else {
            console.log(screenName, 'Followed')
        }
    })
}




// tweetStatus('Tweet at me for pictures of semi ugly dogs!');