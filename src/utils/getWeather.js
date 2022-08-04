const request = require("request");

const getWeather = (latitude, longitude, callback)=>{
    const weatherStack_url = `http://api.weatherstack.com/current?access_key=4046177359a9106daf46d2e8f9514e1f&query=${latitude},${longitude}`

    request({url: weatherStack_url, json:true},(error, response, body)=>{
        // console.log(body);
        if(error)
            callback('Cannot Connect to the weather API !', undefined)

        else if(body.error)
            callback('Unable to find the location!', undefined);            
        else{
            foreCastRes = `${response.body.current.weather_descriptions[0]}. The current temperature in:  ${response.body.location.name} is = ${response.body.current.temperature} and it feels like: ${ body.current.feelslike} `
            console.log(response.body.current.weather_descriptions[0],". The current temperature in: ", response.body.location.name, " is = ", response.body.current.temperature, " and it feels like: ", body.current.feelslike);
            callback(undefined, {body, foreCastRes})
        
        }    // console.log(response); 
    })    
}

module.exports = getWeather