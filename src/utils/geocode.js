const request= require('request')

const geocode =(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXJ1bmt1bWFyZGlkaWdhbTEyM2dtYWlsY29tIiwiYSI6ImNsejN2b2Q3NjM4aXIyanFseWtwN2lndzMifQ.bmZ-vwl3wsRuhAA0M8H-xA&limit=1'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to coonect to location services',undefined)
        }else if(body.features.length===0){
            callback('uanble to find location',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    }
    
   

   module.exports = geocode