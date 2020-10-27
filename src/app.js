const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express confing
const pulicDicrectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const paritalsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars views and location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(paritalsPath);

// Setup static directory to server
app.use(express.static(pulicDicrectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrei Darie'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrei Darie'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrei Darie',
        helpMessage: 'Weather app help'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided"
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                location,
                forcast: forecastData,
                address: req.query.address
            });
        });
    });    
});

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         });        
//     }


//     res.send({ 
//         products: [] 
//     });
// });

app.get('/help/*', (req, res) => {    
    res.render('404', {
        title: '404',
        name: 'Andrei Darie',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrei Darie',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});