const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZ2l1ZnMiLCJhIjoiY2tnanNleG9zMTE1NjJ0dGVoNDYxYjN1aCJ9.g7HcuUP1UkV0keFxt1StuQ&limit=1"
    request({ url, json: true }, (error, { body } = { }) => {
        if (error) {
            callback("Error: geocode", undefined);
        } else if (body == undefined || body.features == undefined || body.features.length < 1 || body.features[0].center == undefined || body.features[0].center.length !== 2) {
            callback('Error geocode response', undefined);            
        } else {            
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;