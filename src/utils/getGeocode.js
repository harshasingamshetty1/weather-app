const request = require("request");
const geocode = (address, callback) => {
  const position_stack_URI = `http://api.positionstack.com/v1/forward?access_key=5455ed2bb32b88fb05c7a4a2f2177a7b&query=${address}&limit=1`;

  request({ url: position_stack_URI, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } 
    else if (response.body.error || response.body.data.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } 
    else {
      console.log(response.body);
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        location: response.body.data[0].label,
      });
    }
  });
};
module.exports = geocode;
