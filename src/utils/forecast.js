const request =require('request')
const forecast =(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=aa92fbb1c34cfecd2483dfdcab419850&query='+longitude+','+latitude+'&units=f'
request({url,json:true},(error, { body })=>{
    if(error){
        callback('Unable to connect to weather service!',undefined)
    }else if(body.error){
        callback('Unable to find the location.',undefined)

    }else{
        //it will dsiplay the current weather forecast for that location
        console.log(body.current)
    
    callback(undefined,
        body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature +' degrees out. It feels like '+
        body.current.feelslike +' degrees out. The humidity is ' + body.current.humidity + "%.")
    }
})

}
module.exports=forecast





//setting the json property in the option object will automatically parse teh object where response.body will already be an object.
//it will parse the json data manually
//const data=JSON.parse(response.body)
//console.log(data.current)