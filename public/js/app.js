// console.log('client sidejs')

// fetch('http://puzzle.mead.io/puzzle').then((response ) => {
//     response.json().then((data)=>{
//     console.log(data)
// })
// })

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#msg1')
//message1.textContent='from js'
const message2=document.querySelector('#msg2')


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    message1.textContent='loading..'
    message2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                message1.textContent=data.error
            }
        else{
            message1.textContent=data.location
            message2.textContent=data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
            
        }
    })
    })
    // console.log(location)
})