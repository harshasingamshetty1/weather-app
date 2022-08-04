const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getGeocode = require('./utils/getGeocode');
const getWeather = require('./utils/getWeather');
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Harsha Singamshetty!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harsha Singamshetty!'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Harsha Singamshetty!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error : 'You must provide an address'
        });
    
    getGeocode(req.query.address, (error, response)=>{
        if(error){
            return res.send({
                error
            })
        }
        getWeather(response.latitude, response.longitude, (error, weatherResponse)=>{
            if(error)
                return res.send({
                    error
                })
            res.send({
                location: response.location,
                foreCast: weatherResponse.foreCastRes,
                Additional_Info: weatherResponse.body})
                
        })

    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harsha Singamshetty!',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harsha Singamshetty!',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})