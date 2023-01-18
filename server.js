const passwordRegEx = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/;
const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
//mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://PlayersUnite:qv2dldvyznKTklej@serverlessinstance0.d9v2d.mongodb.net/?retryWrites=true&w=majority";
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
    // create a document to insert`
    const result = await collection.insertOne(value);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
}

async function checkAccount(collection, nameOrEmail, password)
{
  let ok = "fail";
  let account = {"email":"", "username":""};
  await collection.find({$or: [{username : nameOrEmail},{email : nameOrEmail}]})
  .forEach( element =>
    {
      if(password == element.password)
      {
        ok = "success";
        account = element;
      }
    }
  );
  return {
    "status":ok,
    "email":account.email,
    "username":account.username
  };
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

app.post('/api/login', async function (req, res) {
  let collection = (client.db("playersUnite")).collection("accounts");
  let checkResponse = await checkAccount(collection, req.body.nameOrEmail, req.body.password);
  if(checkResponse.status == "success")
    res.status(200).json({ response: "success", email: checkResponse.email, username: checkResponse.username});
  else
    res.status(200).json({ response: "fail" });
})

app.get('/api/lobbies', async function (req, res) {
  let collection = (client.db("playersUnite")).collection("lobbies");

  lobbies = [];
  await collection.find().forEach(element => lobbies.push(element));
  res.status(200).json({ respons: "success", lobbies:lobbies});
})

app.post('/api/register', async function (req, res) {
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
    res.send({ response: "success" });
  } catch (error) {
    res.status(200).json({ response: "fail" });
  }
})

app.post('/api/addplayer', async function (req, res) {
  try {
    if(!req.body.username)
    throw "Error!";
    console.log("lol");
    let collection = (client.db("playersUnite")).collection("lobbies");
    lobby = await collection.findOne({ _id: ObjectId(req.body.lobbyID) });
    console.log(lobby.participants);
    if( !lobby.participants.includes(req.body.username) )
      await collection.updateOne({ _id: ObjectId(req.body.lobbyID) }, { $push: { participants: req.body.username }});
    res.send({ response: "success" });
  } catch (error) {
    res.status(200).json({ response: "fail" });
  }
})

app.post('/api/lobbyget', async function (req, res) {
  try {
    if(!req.body.lobbyID)
      throw "Error!";

    let collection = (client.db("playersUnite")).collection("lobbies");
    lobby = await collection.findOne({ _id: ObjectId(req.body.lobbyID) });
    res.send({ response: "success", lobby:lobby});
  } catch (error) {
    res.status(200).json({ response: "fail" });
  }
})

app.post('/api/lobby', async function (req, res) {
  try {
    if(req.body.game.length < 2)
    throw "Error!";
    else if(req.body.size < 2)
      throw "Error!";
    else if(req.body.description.length < 7)
      throw "Error!";

    let value = {
      game: req.body.game,
      description: req.body.description,
      participants: [req.body.admin],
      admin: req.body.admin,
      party_size: req.body.size
    }
    let collection = (client.db("playersUnite")).collection("lobbies");
    insertDB(collection, value).catch(console.dir);
    res.send({ response: "success" });
  } catch (error) {
    res.status(200).json({ response: "fail" });
  }
})

app.get('/api/lobbies', async function (req, res) {
  let collection = (client.db("playersUnite")).collection("lobbies");

  lobbies = [];
  await collection.find().forEach(element => lobbies.push(element));
  res.status(200).json({ respons: "success", lobbies:lobbies});
})

