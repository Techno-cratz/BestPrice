// server/index.js

const express = require("express");
const { spawn } = require("child_process");
const fs = require('fs');
const { response } = require("express");

const handler = require('./scripts/requestHandler')



const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json({limit: '1mb'}))



app.get('/test', (req, res) => {
  const shellScript = spawn('sh', ['./findPrice.sh']);
  console.log("Building Process")
  shellScript.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    let rawData = fs.readFileSync('./server/scripts/data/result.json');
    let result = JSON.parse(rawData); 
    console.log(result)
    res.json(result);
  });
})


app.get('/aa', (req, res) => {
  var dataToSend;
  // Write data to a json
  // TODO change to actual data coming from the server
  let testData = {
    items: [
      'apple', 'brown rice', 'grapes', 'milk', 'carrots', 'chicken', 'pasta'
    ]
  }
  fs.writeFileSync('./server/scripts/data/query.json', JSON.stringify(testData))

  // spawn new child process to call the python script
  const python = spawn('sh', ['./findPrice.sh']);
  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  console.log(dataToSend);
  // send data to browser
  res.send(dataToSend)
  });

})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.post('/api_getPrices', (req, res) => {
  console.log(req.body)
  itemsData = req.body;
  handler.writeDataToJson('./server/scripts/data/query.json', {items: itemsData})
  const shellScript = spawn('sh', ['./findPrice.sh']);
  console.log("Building Process")
  shellScript.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    let rawData = fs.readFileSync('./server/scripts/data/result.json');
    let result = JSON.parse(rawData); 
    console.log(result)
    res.json(result);
  });
})



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

