const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const hbs = require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public/index2.html'))

// used to store our express application
// we use different methods to configure our servers 
const app = express()

console.log(path.join(__dirname))

const publicDirectory = path.join(__dirname,'../public/')

//setup handlebars engine and views location
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.set('views',viewsPath)
// app.set('views', path.join(__dirname, '../views'));

hbs.registerPartials(partialsPath)

app.set('view engine','hbs')

app.use(express.static(publicDirectory))

app.get('',(req,res) => {
    //render method is used to render a html page
    res.render('index',{
        title: 'Weather App',
        name: 'Klajdi Leskaj'
    })
})

app.get('/about',(req,res) => {
    //render method is used to render a html page
    res.render('about',{
        title: 'About Page',
        name: 'Klajdi Leskaj'
    })
})

app.get('/products',(req,res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search name'
        })
    }



    //render method is used to render a html page
    res.send({
        products: []
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must have provide an address!'
        })
    }
    geocode(req.query.address,(error,{ latitude,longitude,location } = {}) =>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This my help text'
    })
})
// app.get('/help',(req,res) => {
//     res.send({
//         firstname: 'Klajdi',
//         lastname: 'Leskaj'
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Klajdi Leskaj',
        errorMessage: 'Help page not found'
    })})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Klajdi Leskaj',
        errorMessage: 'Page not found'
    })
})

//this command start the app on 3000
//process of starting the app is async
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})