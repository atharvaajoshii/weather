const express = require("express")
const app = express()
const path = require("path");
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
        const apikey = "43cc5f6e914de109da40399f1326436c"
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

app.listen(5002, () => {
    console.log("runnung")
})
module.exports = app;