const path= require('path')
const express = require('express')
const hbs=require('hbs')
const app = express()
const geocode=require('./utils/geocode')
const forecast =require('./utils/forecast')
//Define paths for express config
const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Mrunmayee Aundhekar'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Mrunmayee Aundhekar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
              helpText:'For help you can contact us at maundhekar090299@gmail.com.This is created by Mrunmayee Aundhekar.',
              title:'Help',
              name:'Mrunmayee Aundhekar'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    //console.log(req.query.address)
    geocode(req.query.address,(error,{longitude,latitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forecastData)=>{
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
    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products :[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        name:'Mrunmayee Aundhekar',
        errorMessage:'Help article not found!'
    })

})


app.get('*',(req,res)=>{
    res.render('404',{
title:'404 page',
name:'Mrunmayee Aundhekar',
errorMessage:'Page not found!'
          })
})


app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})









//__dirname:directory name,__filename:file's name(path is a core node module)
//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))
//console.log(__filename)
//express is a single function as opposed to something like an object and we caall it to create new express application
//we can serve the public directory by app.use() which is a way to customize your server
//const app stores our express application,express() (without arguments) is used to generate the application
//req incoming request,res to access methods hello express will be displayed on the browser
// app.get('',(req,res)=>{
//     //res.send('Hello Express!')
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help',(req,res)=>{
//     //res.send('Help page!')
//     res.send([{
//         name:'Andrew'
//     },{
//         name:'Sarah'
//     }])

// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })


//app.com,app.com/help,app.com/about app.com is the domain runs on single express server on multiple routes
//app.get() let's us configure what a server should dowhen someone tries to get the resource at a specific URL
//to start the server up we use app.listen()(3000 is the port we chose to listen on)
//express.static is a function that takes path to the folder we want to serve up
