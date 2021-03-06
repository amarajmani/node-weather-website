const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e451e393dfb6e3bb411f2923a53f2623&query=' + latitude + ',' + longitude + '&units=f'

    request ({url, json: true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect to weather service!', undefined)        
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] +' at '+ body.location.localtime +'. It is currently ' + body.current.temperature + ' degrees out, but if feels like ' + body.current.feelslike + ' degrees out. Wind Speed is ' + body.current.wind_speed + '.')
        }
    })
}

module.exports = forecast