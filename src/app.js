const path = require('path')
const express = require('express')

const hbs = require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
// console.log(__dirname)

//console.log(path.join(__dirname,'../public'))
const app = express()

//define paths for express configuration
const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')
//setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)
//set up static directory to serve
app.use(express.static(publicdirectorypath))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'weather app',
        name: 'abhinav'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'about me',
        name: 'arun'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        helptext: 'this is helpful text',
        title: 'help',
        name: 'aravindh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'address must be provide by the user'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    // console.log(req.query.address)
    // res.send({
    //     forecast: 'it is snowkng',
    //     location: 'srpt',
    //     address:req.query.address
    // })
})
app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    // res.send('help article is not found')
    res.render('404', {
        title: '404',
        name: 'akash',
        errormessage: 'help articlenot found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'akash',
        errormessage: 'page not found'
    })
})
// app.get('',(req,res)=>{
//     res.send("<h1>weather</h1>")
// })
// app.get('/help',(req,res)=>{
//     res.send([{
//     name:'arun',
//     age:24},
// {
//     name:'aravidnha'
// }])
// })

// app.get('/about',(req,res)=>
// {
//     res.send('<h1>about</h1>')
// })

app.listen(3000, () => {
    console.log('server is up on port 3000')
})
