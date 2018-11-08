const bodyParser = require('body-parser')
const express = require("express")
const needle = require("needle")
const app = express(); //server object
const router = express.Router();
const riotAPIController = require('./controllers/riotAPIController')

const port = 4000;
app.set('port',port);

app.listen(port, () => {
    console.log(`we are using port ${port}`);
})

app.use(async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
	
	// test call to get all patches
	var database = require("./database");
	console.log(await database.getAllPatches());
});

app.use('/', express.static('public'))

app.use('/api', router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/endpoint').post(function (req,res) {
    res.status(200).send("Successful POST request")
})

router.route('/endpoint').get(function(req, res) {
    res.status(200).send("Successful GET request")
});

router.get("/lastplayed/:summoner/:champion", riotAPIController.lastPlayed);
router.get("/statchanges/:champion/:patch",riotAPIController.statChanges);