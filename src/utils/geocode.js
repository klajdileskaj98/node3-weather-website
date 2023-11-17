const request = require('request')


const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2xhamRpbGVza2FqIiwiYSI6ImNsb3dzbWtsdjFidzUybXEweWRid3JhM3UifQ.IhyJCiaDOEJjPNN9psb3yg&limit=1'
    request({url,json: true},(error,{ body }) => {
            if(error){
                callback('Unable to connect to location services!',undefined)
            }
            else if(body.features.length === 0){
                callback('Unable to find location. Try another location!',undefined)
            }
            else{
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitute: body.features[0].center[0],
                    location:  body.features[0].place_name
                })
            }
        })
}



module.exports = geocode

