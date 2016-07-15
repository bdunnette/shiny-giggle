var Twit = require('twit');
var Markov = require('markov-strings');

var twitterCredentials = require('./twitter_credentials.json');
var twitter = new Twit(twitterCredentials);

var data = require('./tweets.json');
// Some options to generate Twitter-ready strings
const options = {
    maxLength: 140,
    minWords: 5,
    stateSize: 1,
    minScore: 3
};

// Instantiate the generator
const markov = new Markov(data, options);

function generateTweet() {
    var tweet = markov.generateSentenceSync();
    return tweet;
}

function sendTweet() {
    var tweet = generateTweet().string;
    console.log("Sending tweet: " + tweet);
    twitter.post('statuses/update', {
        status: tweet
    }, function(err, data, response) {
        // console.log(data)
    })
}

markov.buildCorpus()
    .then(() => {
        sendTweet();
        var timer = setInterval(function() {
            sendTweet()
        }, 600000);
    })
