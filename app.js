const express = require("express");

const https = require("https");

const app = express();

app.get('/', function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?zip=670703,IN&appid=bc369596b7ddb1c3b075d46288929547&units=metric&bbox=lon-right#";

  https.get(url, function(response){

    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const object = {
        name: "Clinto Abraham Ayamkudiyil",
        favFood: "chicken halleem"
      };
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const placeName = weatherData.name;
      const imageURL ="http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p> The weather is currently " + weatherDescription + "</p>");
      res.write("<h1> The temperature in " + placeName + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
      console.log(JSON.stringify(object));
    });
  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
