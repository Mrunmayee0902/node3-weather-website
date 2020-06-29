console.log('Client side javascript file is loaded')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// //fetch is a browser based API


const weatherForm=document.querySelector('form')
const search= document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
//messageOne.textContent='From JavaScript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    
messageOne.textContent='Loading...'
messageTwo.textContent=''

fetch('http://localhost:3000/weather?address='+location).then((response)=>{

    response.json().then((data)=>{
        if (data.error){
         messageOne.textContent=data.error
        }else{
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast
       }
    })

})
})






















//Template engine is used to render dynamic web pages using express
//In this,handlebars template engine is used to render dynamic documents and reuse the created code(for styling)
//This javascript file will be seen in console in developer options
//here express converts the hbs view to html
//partials is the part of code which can be reused in other files
//For setting up my 404 error page use * (wild card character) :match anything that hasn't been matched so far//views are rendered