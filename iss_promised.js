const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api6.ipify.org?format=json');
};

const fetchCoordsByIP = body => {
  return request('https://ipvigilante.com/' + JSON.parse(body).ip);
};

const fetchISSFlyOverTimes = body => {
  const { latitude, longitude } = JSON.parse(body).data
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.pasrse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };