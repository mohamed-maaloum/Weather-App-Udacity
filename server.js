// Setup empty JS object to act as endpoint for all routes
projectData = {};

const weatherAppData = [];
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port,listening);

function listening(){
    console.log("server running !")
    console.log(`running on localhost : ${port}`);
}


// Creating a POST route to get data recieved from the WEB API and storing it inside the server endpoint
app.post('/addData', addData);

function addData(req,res){
  console.log(req.body);
  projectData = {
    city:req.body.city,
    temp: req.body.temp,
    newDate:req.body.date,
    feelings:req.body.feelings,
  }

 // weatherAppData.push(projectData)
  console.log(weatherAppData)
}

//Creating a GET route to send the data requested from the app to update the UI
app.get('/updateUI', getUpdatedUI);

function getUpdatedUI(req, res) {
  //console.log(req.body);
  res.send(projectData)
  console.log("update : "+projectData);
}
