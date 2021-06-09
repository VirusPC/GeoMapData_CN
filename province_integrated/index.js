const path = require("path");
const fsPromises = require('fs/promises');

async function provinceToCenter() {
  const china = await fsPromises.readFile(path.resolve(__dirname, "china.json"), "utf-8");
  const chinaJSON = JSON.parse(china);
  const p2c = processGeoJSON(chinaJSON);
  fsPromises.writeFile(path.resolve(__dirname, "province2Center.json"), JSON.stringify(p2c));
}

const processGeoJSON = (json) => {
  const data = []
  json.features.forEach((d) => {
    let { name, center, centroid } = d.properties;
    if (name) {
      name = name
        .replaceAll("市", "")
        .replaceAll("省", "")
        .replaceAll("自治区", "")
        .replaceAll("壮族", "")
        .replaceAll("维吾尔", "")
        .replaceAll("回族", "")
        .replaceAll("特别行政区", "");
      data.push({
        prov: name,
        x: center[0],
        y: center[1]
      });
    }
  });
  return data;
};

module.exports = provinceToCenter;