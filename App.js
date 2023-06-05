const express = require('express')
const bodyparser = require('body-parser')
require("dotenv").config()


const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))


app.get('/', async (req, res) => {

    res.render("search")    
})

app.post('/', async (req, res) => {
    let city = req.body.city;
    let query = city
    let apiKey = process.env.AUTH;
    let unit = 'metric';
    let data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + query + ',india&appid=' + apiKey + '&units=' + unit + '')
    data = await data.json();

    let icon = data.weather[0].icon
    icon = icon.slice(0, 2)
    let imageURL = `https://openweathermap.org/img/wn/${icon}d@2x.png`
    let temp = data.main.temp
    let discrip = data.weather[0].description

    res.render("result",{
        city : query,
        temperature : temp,
        discription : discrip,
        url : imageURL
    })
    console.log(icon)

})



app.listen(3000)