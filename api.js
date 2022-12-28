//Build weather application

/*  --------------------------THEORY--------------------------
# What are APIs?
-> set of commands, functions, protocols and objects that
programmers use to create software or interact with an 
external system
-> api is sort of a contract between the data provider 
and the developer
-> it tells which data can be accessed from their website
and what are the methods and protocols used to access them
-> eg. jquery is an API, which gives us access to a bunch of methods 
and functions that allow us to create software more easily
than vanilla JS
-> API is basically what allows Our Server to make requests to
and get responses from Another Server.

# API Keywords
-> Enpoint
The Endpoint of an API is basically the starting url from where you 
can access the database they're hosting
-> Paths
endpoint will be the root, and path tells the different branches
(these need to be planned ahead and exist already)
comes after a forward slash after the endpoint (url)
-> Parameters
every search possibility can't be planned ahead, a path for it
cannot be created. so we have parameters
comes after a question mark after the endpoint & path (if any)
the parameters are set as a key-value pair with an equal sign in b/w
more than one parameters is given by separating each key-value
pair with an ampersand symbol
--> paths and parameters basically help to narrow down 
the data that we can access from the api
-> Authentication
used by servers to keep track of how often a developer is 
using their server, so as to either charge the developers for 
using their data, or to limit the amount of data they can access

Using an authenticated API-
-> sign up to the website
-> create an API key (used when making requests to the api)
-> eg. Use OpenWeatherMap, API key = 6d7e0c593a9c5765f80ca1f31fd6e354
https://api.openweathermap.org/data/2.5/weather?q=London&appid=cc413b628f4e41b2d4854b91bfc1a3dc

-> Postman:
application that's used to easily work with APIs. 
We just have to give the endpoint, list the keys and values (parameters)
and make the get request, instead of having to edit the url with parameters 
in the address bar of the browser itself, because sometimes there could be
too many parameters, and so the url could be very long.

-> JSON:
JavaScript Object Notation, it's like JS objects but in foldable string format
Other formats to get data in are XML and HTML. 


*Basically, our client will be requesting data from our server, and some of this data
would actually be coming from other servers. So our server will be making the requests
to the other server for data through APIs, and getting the data as responses (json/xml/html). 
This data will then be given as responses from our server to our client.


/*
--------------------------Heirified Assignment--------------------------
Use this api-
https://www.weatherapi.com/

API key = 6a4ecd673b8949f1abd190407222712

Example-
https://api.weatherapi.com/v1/current.json?key=6a4ecd673b8949f1abd190407222712&q=Cochin

=> raw json: 
{"location":{"name":"Cochin","region":"Kerala","country":"India","lat":9.97,"lon":76.23,"tz_id":"Asia/Kolkata","localtime_epoch":1672168629,"localtime":"2022-12-28 0:47"},
"current":{"last_updated_epoch":1672168500,"last_updated":"2022-12-28 00:45","temp_c":27.0,"temp_f":80.6,"is_day":0,
"condition":{"text":"Mist","icon":"//cdn.weatherapi.com/weather/64x64/night/143.png","code":1030},
"wind_mph":2.2,"wind_kph":3.6,"wind_degree":10,"wind_dir":"N","pressure_mb":1013.0,"pressure_in":29.91,"precip_mm":0.3,"precip_in":0.01,
"humidity":89,"cloud":50,"feelslike_c":31.0,"feelslike_f":87.9,"vis_km":4.0,"vis_miles":2.0,"uv":1.0,"gust_mph":4.0,"gust_kph":6.5}}

pretty json:
{
    "location": {
        "name": "Cochin",
        "region": "Kerala",
        "country": "India",
        "lat": 9.97,
        "lon": 76.23,
        "tz_id": "Asia/Kolkata",
        "localtime_epoch": 1672169529,
        "localtime": "2022-12-28 1:02"
    },
    "current": {
        "last_updated_epoch": 1672169400,
        "last_updated": "2022-12-28 01:00",
        "temp_c": 27.0,
        "temp_f": 80.6,
        "is_day": 0,
        "condition": {
            "text": "Mist",
            "icon": "//cdn.weatherapi.com/weather/64x64/night/143.png",
            "code": 1030
        },
        "wind_mph": 2.2,
        "wind_kph": 3.6,
        "wind_degree": 10,
        "wind_dir": "N",
        "pressure_mb": 1013.0,
        "pressure_in": 29.91,
        "precip_mm": 0.3,
        "precip_in": 0.01,
        "humidity": 89,
        "cloud": 50,
        "feelslike_c": 31.0,
        "feelslike_f": 87.9,
        "vis_km": 4.0,
        "vis_miles": 2.0,
        "uv": 1.0,
        "gust_mph": 4.0,
        "gust_kph": 6.5
    }
}



// app.get ("/",(req,res)=>{

//     //make get request to the weatherapi server and then fetch data back as json and parse it to get relevant data that we want to display
//     //use native https node module for this
//     //const url = "https://api.weatherapi.com/v1/current.json?key=6a4ecd673b8949f1abd190407222712&q=Chennai"

//     const apiKey = "6a4ecd673b8949f1abd190407222712"
//     var loc
//     const url = "https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+loc

//     https.get(url,(response)=>{
//         console.log(response.statusCode)
        
//         //to get the actual data
//         response.on('data', (data)=>{
//             //gives data in hexadecimal format
//             console.log(data)
//             //give the data as a JS object
//             var weatherData = JSON.parse(data)
//             console.log(weatherData)
//             //give a JS object as string (JSON)
//             console.log(JSON.stringify(weatherData))

//             //Parsing the JSON
//             //get specific data from the object => give its path in the object to access it
//             var location = weatherData.location.name
//             var temperature = weatherData.current.temp_c
//             console.log("Location: "+location)
//             console.log("Current temperature: "+temperature+" Degrees Celsius")
//             //an easier way of getting this path is using a chrome extension called JSON Viewer Pro
//             var description = weatherData.current.condition.text
//             var iconURl = weatherData.current.condition.icon
//             console.log("Current weather description: "+description)

//             //sending the data as response onto our webpage
//             //res.send("<html><title>My Weather Details</title><body><h1>My Weather App</h1><p>The current temperature at "+location+" is "+temperature+" degrees Celsius.</p><p>The weather</p></body></html>")
//             res.write("<html><title>My Weather Details</title>")
//             res.write("<body><h1>My Weather App</h1>")
//             res.write("<p>The current temperature at "+location+" is "+temperature+" degrees Celsius.</p>")
//             res.write("<p>The weather is " + description + ".</p></body></html>")
//             res.write("<image src="+iconURl+">")
//             res.send()
//         }) 
//     })

//     //res.send("Server is up and running")

// })



//status code: 200, successful response from the server
//status code: 404, something was wrong with the request made to the server.
//                , resource couldn't be found (path speficied doesn't exist)
//status code: 401, or api key was invalid/inactive
*/
