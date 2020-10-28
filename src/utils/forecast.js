const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c42ddcba22405d89e493abbb79b9aa2c&query=" + latitude + "," + longitude;
    request({ url, json: true }, (error, { body } = { }) => {
        if (error) {
            callback("Error: weather", undefined);
        } else if (body.error) {            
            callback("Error: weather request", undefined);
        } else {            
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ', feels like ' + body.current.feelslike + ", wind speed " + body.current.wind_speed);
        }
    });
};

module.exports = forecast;