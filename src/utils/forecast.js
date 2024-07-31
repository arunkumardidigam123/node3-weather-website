const request=require('request')
const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=831d391cf757fd4fb4d1cb260fb29c39&query='+latitude+','+longitude+'&units=f';


// request({url,json:true},(error,response)=>{
//     if(error){
//         callback('unable to connect to weather service',undefined)
//     }else if(response.body.error){
//         callback('unable to find location',undefined)
//     }
//     else{
//         callback(undefined,'it is currently'+response.body.current.temperature+'degerrs out.there is a '+response.body.current.precip+'% chance of rain')
//     }
// })
// }

request({url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connect to weather service',undefined)
    }else if(body.error){
        callback('unable to find location',undefined)
    }
    else{
        callback(undefined,'it is currently'+body.current.temperature+'degerrs out.there is a '+body.current.precip+'% chance of rain')
    }
})
}
module.exports=forecast