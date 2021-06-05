const path = require("path");
const fsPromises = require('fs/promises');

async function cityToCenter() {
  const cities = await fsPromises.readFile(path.resolve(__dirname, "cities.json"), "utf-8");
  const citiesJSON = JSON.parse(cities);
  const c2c = citiesJSON.features.map(d => ({
    "city": d.properties.name,
    "x": d.properties.center[0],
    "y": d.properties.center[1]
  }))
  fsPromises.writeFile(path.resolve(__dirname, "city2Center.json"), JSON.stringify(c2c));
}

module.exports = cityToCenter;