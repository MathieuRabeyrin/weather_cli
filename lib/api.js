const env = require("dotenv").config();
const fetch = require("node-fetch");
const { isUndefined } = require("util");
const filget = require("figlet");
const { table } = require("table");
const colors = require("colors");

module.exports = (city, units)=> {
    if (units != "metric" && units != "kelvin" && units != "imperial")
        units = "metric";
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=${units}`;

    let setTable = (data, unit) => {
        let tempUnit;
        let speedUnit;
        
        switch(unit) {
            case "metric": {
                tempUnit = "degrees";
                speedUnit = "km/h";
                break;
            }
            case "kelvin": {
                tempUnit = "kelvin";
                speedUnit = "km/h";
                break;
            }
            case "imperial": {
                tempUnit = "Fahrenheit";
                speedUnit = "mph";
                break;
            }
        }
        let weatherData = [
            ['temperature', `${data.main.temp}${tempUnit}`],
            ['description', data.weather[0].description],
            ['humidity', `${data.main.humidity}%`],
            ['country', data.sys.country],
            ['windSpeed', `${data.wind.speed}${speedUnit}`]
        ]
        return weatherData;
    }

    fetch(URL)
        .then(response =>  {
            return response.json();
        })
        .then(data => {
            filget(city, (err, render)=> {
                if (err)
                    return;
                console.log(colors.rainbow(render));
                console.log(table(setTable(data, units)));
            })
        })
        .catch(e => {
            console.error(e);
        })
}