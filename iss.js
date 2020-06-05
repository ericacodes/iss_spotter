const request = require('request');
const fetchMyIP = function(callback) {
  request('https://api6.ipify.org?format=json', (error, response, body) => {
    if (error) { // error is defined
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) { // statusCode is not 200
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('https://ipvigilante.com/' + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data; // const latitude = JSON.parse(body).data.latitude same for longitude
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body).response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coordsObj) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coordsObj, (error, flyovers) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyovers);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };