/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(require('request'));
var crypto = Promise.promisifyAll(require('crypto'));


// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.getAsync(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = Promise.promisify(getGitHubProfile); // TODO


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytesAsync(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = Promise.promisify(generateRandomToken); // TODO


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFileAsync(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(null, funnyFile);
  });
};

var readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny);


var readFirst = function (filePath, callback) {
  fs.readFileAsync(filePath, 'utf8', function (err, file) {
    if (err) { return callback(err); }
    var allLines = file.split('\n').map(line => line);
    callback(null, allLines[0]);
  });
};

var readFirstAsync = Promise.promisify(readFirst);




var writeFile = function(filePath, data, callback) {
  fs.writeFileAsync(filePath, data, (err) => {
    if (err) { return callback(err); }
    callback(null);
  });
};

var writeFileAsync = Promise.promisify(writeFile);

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync,
  readFirstAsync: readFirstAsync,
  writeFileAsync: writeFileAsync
};
