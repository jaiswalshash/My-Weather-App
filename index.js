const express = require("express");
const http = require("https");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  var Location = req.body.cityName;
  var unit = "metric";
  var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + Location + "&units=" + unit + "&appid=ed6ba3dae6762ae86dde18eafe7af222"

  http.get(URL, function(response) {
    response.on("data", function(data){
      var weatherData = JSON.parse(data);
      var description = weatherData.weather[0].description;
      var temperature = weatherData.main.temp;
      var icon = weatherData.weather[0].icon;
      var link =  "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<p>The weather is currently " + description +".<p>");
      res.write("<h1> The temperature in " + Location + " is " + temperature + " degree Celsius. </h1>")
      res.write("<img src =" + link +">");
      res.send();
    })
  });
})


app.listen(3000, function() {
  console.log("The server is up and running");
});
