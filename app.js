//create a new node app
const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

const webpage = __dirname+"/home.html"

app.get("/",(req,res)=>{
    res.sendFile(webpage)
    //console.log(req)
})

app.post("/",(req,res)=>{
    console.log("Post recieved")
    console.log(req.body.city)
    const apiKey = "6a4ecd673b8949f1abd190407222712"
    const loc = req.body.city
    const url = "https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+loc
    https.get(url,(response)=>{
        console.log(response.statusCode)
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            const region = weatherData.location.region
            const country = weatherData.location.country

            const localtime = weatherData.location.localtime
            const dateGiven = localtime.split(" ")[0]
            const time = localtime.split(" ")[1]
            const splitDate = dateGiven.split("-")
            const date = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0]

            const temp = weatherData.current.temp_c
            const desc = weatherData.current.condition.text
            const iconURL = weatherData.current.condition.icon
            const feelsLike = weatherData.current.feelslike_c
            const humidity = weatherData.current.humidity
            const cloud = weatherData.current.cloud
            const uv = weatherData.current.uv
            const vis = weatherData.current.vis_km
            const wind_speed = weatherData.current.wind_kph
            const wind_dir = weatherData.current.wind_dir

            //sending all this data to the webpage
            const imageURL = "images/card_bg.jpg"
            res.write("<html><head><title>Weather Data</title></head>")
            res.write("<body style='font-family:Helvetica;background-image:url("+imageURL+");background-size:cover;'>")
            res.write("<div style='margin:2.5% 25% 0% 25%;width:50%;display:grid;place-items:center;align-items:center;background-color:rgba(209, 237, 255, 0.65);border-radius:50px;z-index:10;box-shadow:25px 25px 75px black;'><h1 style='margin:10%;'>Weather Today</h1>")
            res.write("<div style='margin-bottom:10%;width:100%;display:flex;place-contents:center;align-items:center;'>")
            res.write("<div style='width:25%;height:290px;padding-left:10%;padding-right:13.5%;border-right:2px solid darkslategrey;'><h2>"+temp+" &#8451;</h2><h3>"+desc+"</h3><img src="+iconURL+" alt='weather icon' width=80px height=80px><p>"+time+", "+date+"</p><p>"+loc+", "+country+"</p></div>")
            res.write("<div style='width:auto;height:290px;padding-left:10%;padding-right:10%;border-left:2px solid darkslategrey;'><p>Feels Like: "+feelsLike+" &#8451;</p>")
            res.write("<p>Humidity: "+humidity+" %</p>")
            res.write("<p>UV Index: "+uv+"</p>")
            res.write("<p>Cloud Cover: "+cloud+" %</p>")
            res.write("<p>Visibility: "+vis+" km</p>")
            res.write("<p>Wind Speed: "+wind_speed+" km/h</p>")
            res.write("<p>Wind Direction: "+wind_dir+"</p></div></div></div>")

            res.write("</body></html>")
            res.send()

        })
    })

})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is up and running on port 3000")
})


