const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const requests = require("requests");
const dotenv = require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const sendData = { location: "Location", country: "Country", temp: "Temp", disc: "Description", feel: "Feel-like", humidity: "Humidity", speed: "speed" };
    res.render("home", { sendData: sendData });
});

app.post("/", async (req, res) => {
    let location = await req.body.city;
    const response = requests(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`)
        .on('data', await function (chunk) {
            const objData = JSON.parse(chunk);
            const sendData = {};
            sendData.location = objData.name;
            sendData.country = objData.sys.country;
            sendData.temp = Math.floor(objData.main.temp);
            sendData.disc = objData.weather[0].description;
            sendData.feel = objData.main.feels_like;
            sendData.humidity = objData.main.humidity;
            sendData.speed = objData.wind.speed;
            res.render("home", { sendData: sendData });
        });
});

app.listen(3000, () => {
    console.log("server started at port 3000.");
});