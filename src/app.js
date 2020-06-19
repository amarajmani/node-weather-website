const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // basic code to use express

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //either makes views in public dir or use another path
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs') // to set handlebars
app.set('views', viewsPath) // to set path for views
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath)) // to use static html files

app.get('', (req, res) => {
    res.render('index',{ // to send response by hbs
        title: 'Weather app',
        name: 'Amar'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Amar'
    })
})    

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Amar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error: error
                })
            }
            res.send({ // to send res by any page
                forecast: forecastData,
                location, 
                address: address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({ // to send res by any page
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error', {
        title: '404',
        name: 'Amar',
        errorMessage: 'Help Article Not found'
    })
})

app.get('*', (req, res) =>{
    res.render('error',{
        title: '404',
        name: 'Amar',
        errorMessage:'Error 404: Page Not Found'
    })
})

app.listen(3000, () => { // to start a server
    console.log('Server is up and running')
})