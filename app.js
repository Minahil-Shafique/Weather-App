const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

  app.post("/", function (req, res) {
    const query = req.body.cityName;

    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&units=metric&appid={api-key}";

    https.get(url, function (httpsRes) {
      console.log(httpsRes.statusCode);

      httpsRes.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write(
          "<br><p>The weather is currently " + weatherDescription + "</p>"
        );
        res.write(
          "<br><h1>The temperature in " +
            query +
            " is " +
            temperature +
            " degrees Celsius.</h1>"
        );
        res.write("<img src=" + imageURL + ">");
        res.send();
      });
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
