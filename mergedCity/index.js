const path = require("path");
const fsPromises = require('fs/promises');

async function readFile(filePath) {
  const data = await fsPromises.readFile(filePath, "utf-8");
  const dataJSON = JSON.parse(data);
  console.log(dataJSON.features[0].properties.name);
  return dataJSON;
}

async function readDir(dirPath){
  const dirs = await fsPromises.readdir(dirPath)
  const dataJSONs = await Promise.all(dirs.map(p => path.resolve(dirPath, p)).map(readFile));
  return dataJSONs;
}

async function mergeData(dirPath) {
  const dataJSONs = await readDir(dirPath);
  const baseJSON = {
    "type": "FeatureCollection", 
    "features": []
  }
  for(const provJSON of dataJSONs) {
    baseJSON.features = baseJSON.features.concat(provJSON.features);
  }
  console.log("total city number: ", baseJSON.features.length);
  return baseJSON;
}

async function transformData() {
  const result = await mergeData(path.resolve(__dirname, '../province'));
  const resultString = JSON.stringify(result);
  fsPromises.writeFile(path.resolve(__dirname, 'cities.json'), resultString);
}

module.exports = transformData;