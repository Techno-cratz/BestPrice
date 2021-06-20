const fs = require('fs');
const { spawn } = require("child_process");

function writeDataToJson(path, data) {
  // Writes data to the given path
  fs.writeFileSync(path, JSON.stringify(data))
}

async function execPython(script) {
  /*
  Executes the given python script
  :param script: the script to execute
  :returns none
  */
  const python = spawn('sh', [script]);

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  });
  console.log("Process Ending")
}

function readJson(path) {
  /*
  Reads the json objects
  :param path: the path of the json
  :return itemList: list of the items and prices
  */
  let rawData = fs.readFileSync(path);
  let result = JSON.parse(rawData);
  return result;
}

const handlePriceRequest = async (itemsSend) => {
  /*
  Handle the calling of the python scripts
  :param itemsSend: list of items to query price
  :returns object with the result
  */
  // Build the object, write it to json, call the python scripts
  // Return the json file with the list of prices
  data = {items: itemsSend};
  writeDataToJson('./server/scripts/data/query.json', data);
  await execPython('./findPrice.sh');
  return readJson('./server/scripts/data/result.json')
}

module.exports = { handlePriceRequest, writeDataToJson };