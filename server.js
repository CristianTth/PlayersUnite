const passwordRegEx = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/;
const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
//mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://PlayersUnite:3MTIii3NH99HxT2B@serverlessinstance0.d9v2d.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

async function insertDB(collection, value) {
  try {
    // create a document to insert
    const result = await collection.insertOne(value);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

app.post('/api/ping', function (req, res) {
  if(typeof req.body.request == "string")
  switch (req.body.request)
  {
    case 'registerAccount':
      try {
        if(req.body.username.length < 4)
          throw "Error!";
        else if(!emailRegEx.test(req.body.email))
          throw "Error!";
        else if(req.body.password!=req.body.confirmPassword)
          throw "Error!";
        else if(!passwordRegEx.test(req.body.password))
          throw "Error!";

        let value = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }
        let collection = (client.db("playersUnite")).collection("accounts");
        insertDB(collection, value).catch(console.dir);
        res.send({ status: "success" });
      } catch (error) {
        res.status(200).json({ status: "fail" });
      }
      break;
    default:
      console.log("Unknown request");
      res.status(200).json({ response: "fail" });
  }
  else
    res.status(200).json({ response: "fail" });
})
