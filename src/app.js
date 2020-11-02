const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
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
        title: 'Weather App',
        name: 'NIL',
        title: 'Weather',
        name: 'Admin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'NIL',
        title: 'About',
        name: 'Admin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpfull text.',
        title: 'Help',
        name: 'Admin'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide address!'
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {

        if(error){
            return res.send({error})
        }
    
        forecast(lattitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
    
    
            res.send({
                forecast: forecastData,  
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Admin',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Admin',
        errorMessage: 'Page Not Found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})