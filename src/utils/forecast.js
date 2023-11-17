const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e48cd5ba4cb0aacfbb093df615865811&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true},(error,{ body }) =>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.error){
            callback('Unable to find a location',undefined)
        }
        else{
            callback(undefined,body.current)
        }
    })
}

module.exports = forecast