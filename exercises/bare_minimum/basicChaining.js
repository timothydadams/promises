/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var p = require('./promisification.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  //read first line of the readFilePath
    //then pass it to gitHub function
      //then write json response to writeFilePath


  p.readFirstAsync(readFilePath).then(name => p.getGitHubProfileAsync(name))
    .then(item=>console.log(item));

    //my writeFile is not working!
    //p.writeFileAsync(writeFilePath, item)).catch();






};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
