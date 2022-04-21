const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
    const city = req.body.cName;
    const apiKey = "be9850a12b83cf581daad1b1529f03a6";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=" + unit +""

    https.get(url, function (response){
        console.log(response.statusCode);

        response.on("data", function (data){
            const wData = JSON.parse(data);
            const temp = wData.main.temp;
            const wDescription = wData.weather[0].description;
            const icon = wData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            /*Humidity, pressure, wind speed*/
           const wHumidity = wData.main.humidity;
           const wPressure = wData.main.pressure;
           const Wwspeed = wData.wind.speed;

            res.set("Content-Type", "text/html"); //for working tags in res.write method

            res.write("<h3>" + "The weather is "  + wDescription + "</h3>" + '\n' );
            res.write("<h1>" + "The temperature in " + city + " is " + temp + " degrees Celcius" + "</h1>" + '\n');
            res.write('<img src = "'+imageURL+'"><\/img>');

            res.write('<h2>' + 'Humidity: '  + wHumidity + '% \n'  +'</h2>');
            res.write('<h2>' + 'Pressure: ' + wPressure + 'hPa' +'\n' + '</h2>');
            res.write('<h2>' + 'Speed of wind: ' + Wwspeed + 'meter/sec' +'\n' + '</h2>');

            res.end();
        })

    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

