const express = require("express")
const app = express()
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, ".env")
});
const axios = require('axios')

app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"../views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")));

app.get('/', (req, res) => {
    res.render("index",{weather:null})
})

app.post('/weather', async (req, res) => {
    try {
        const city = req.body.city;
        const apikey = process.env.apikey;
        const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
        const result = await axios.get(apiurl)
        res.render("index",{weather:result.data})

    } catch (error) {
    res.render("index", {
        weather: null,
        error: "City not found"
    });
}
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})
// module.exports = app;