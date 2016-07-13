var Twit = require('twit');
var tracery = require('tracery-grammar');

var twitterCredentials = require('./twitter_credentials.json');
var twitter = new Twit(twitterCredentials);
var grammarData = require('./grammar.json');
var grammar = tracery.createGrammar(grammarData);
grammar.addModifiers(tracery.baseEngModifiers);
console.log(grammar.flatten('#origin#'));
