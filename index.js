const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, flyovers) => {
  if (error) {
    console.log('It didn\'t work', error);
  }
  printFlyovers(flyovers);
});

const printFlyovers = flyovers => {
  for (const pass of flyovers) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log('It didn\'t work!', error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, coordsObj) => {
    if (error) {
      console.log('It didn\'t work!', error);
      return;
    }
    console.log('It worked! Returned Coords:', coordsObj);

    fetchISSFlyOverTimes(coordsObj, (error, fly) => {
      if (error) {
        console.log('It didn\'t work!', error);
        return;
      }
      console.log('It worked! Returned ISS flyover times: \n', fly);
      console.log(typeof fly);
    });
  });
});
*/


