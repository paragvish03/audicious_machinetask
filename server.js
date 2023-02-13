const express = require('express')
const {sequelize} = require('./models')
const cookie = require('cookie-parser')


const app = express() 

app.use(express.urlencoded({extended: true }));
app.use(express.static('public')); 
app.use(express.json())
app.use(cookie())  
app.set('view engine','ejs')
require('./route/user.routes')(app)

app.get('/',(req,res)=>{
    res.render('login')
})

app.get('/newuser',(req,res)=>{
    res.render('register')
})

app.listen(3500, async()=>{ 
    console.log('server is running on this port on 3500')
    await sequelize.sync({force:false})
})