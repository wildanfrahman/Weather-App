const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
require("dotenv").config;

app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.APIKey;
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let weather;
  let error = null;

  try {
    const response = await axios.get(apiURL);
    weather = response.data;
  } catch {
    weather = null;
    error = "error, coba lagi";
  }
  res.render("index", { weather, error });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server berjalan di port ${port}`);
});
