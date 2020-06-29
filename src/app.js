const path= require('path')
const express = require('express')
const hbs=require('hbs')
const app = express()
const port=process.env.PORT || 3000
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


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})








