request = require('request')
// WEATHER STACK API
// TEMPERATURE OF LOCATION BY LAT AND LONG
const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=32ebc9ca40885574e1d7193779eef6a4&query='+ lattitude +','+ longitude +'&units=f'
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error) {
            callback('Unable to fnd location!', undefined)
        }else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const weather = body.current.weather_descriptions[0]
            callback(undefined, weather + '. It is currently ' + temperature + ' degress. but feels like ' + feelslike + ' degrees.')
        }
    })
}
module.exports = forecast