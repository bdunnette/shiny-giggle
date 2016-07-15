var Twit = require('twit');
var tracery = require('tracery-grammar');

var twitterCredentials = require('./twitter_credentials.json');
var twitter = new Twit(twitterCredentials);

var grammarData = require('./grammar.json');
var grammar = tracery.createGrammar(grammarData);
grammar.addModifiers(tracery.baseEngModifiers);

function generateTweet() {
    var tweet = grammar.flatten('#sentence#');
    return tweet;
}

function sendTweet() {
    var tweet = generateTweet();
    console.log("Sending tweet: " + tweet);
    twitter.post('statuses/update', {
        status: tweet
    }, function(err, data, response) {
        console.log(data)
    })
}

sendTweet();

var timer = setInterval(function() {
    sendTweet()
}, 600000);
