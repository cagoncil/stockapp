
// terminal commands:
	// npm init
	// node app.js
	// npm install express
	// npm install -D nodemon // use for development only, not for website
		// package.json:
		// "scripts": {"start": "node app", "dev": "nodemon app"}
		// now instead of 'node app.js', type 'npm run dev'
	// npm install express-handlebars
	// npm run dev
	// npm install request
	// npm install body-parser


// ============ Stock market Portfolio App ============


// initialize express:
	const express = require('express');
	const app = express();

// initialize handlebars:
	const exphbs = require('express-handlebars');

// define path:
	const path = require('path');

// initialize request:
	const request = require('request');

// initialize body parser:
	const bodyParser = require('body-parser');

// need to run node server and tell app which port to listen on
	const PORT = process.env.PORT || 5000; // use web hosting port OR use localhost:5000


// use body parser middleware:
	app.use(bodyParser.urlencoded({extended: false}));


// API KEY: pk_df3efbbccfc74aeca42118a808de91c6
// create callAPI function
function callAPI(APIisFinished, ticker) { // APIisFinished calls back function(finishedAPI)
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_df3efbbccfc74aeca42118a808de91c6', { json: true }, (err, res, body) => {
		if (err) {return console.log(err);}
		if (res.statusCode === 200) {
			// console.log(body);
			APIisFinished(body);
		}
	});
}



// set handlebars middleware:
	app.engine('handlebars', exphbs()); 
	app.set('view engine', 'handlebars'); 

// set handlebar index GET route (don't need to set routes for express in this instance)
	app.get('/', function (req, res) {
		// need callback function for API to work:
		callAPI(function(finishedAPI) {
			res.render('home', {
				stock: finishedAPI
			});
		}, "goog"); // sets homepage to google stock
		// old API code (doesn't work):
		// const api = callAPI(); // create variable for api to call it
		// res.render('home', {
			// stock: api
		// });
	});

	// set handlebar index POST route
	app.post('/', function (req, res) {
		callAPI(function(finishedAPI) {
			// posted_stuff = req.body.stock_ticker;
			res.render('stocklookup', {
				stock: finishedAPI
			});
		}, req.body.stock_ticker);
	});

// create about page route for about.html
	app.get('/about.html', function (req, res) {
		res.render('about');
	});

// followed instructions for dir structure: https://www.npmjs.com/package/express-handlebars#basic-usage
	// views folder (home.handlebars) = webpages
	// layouts folder (main.handlebars) = templates. main has main stuff that you want on every page of your website

// tell app to listen for res/req objects on the specified port
	app.listen(PORT, () => console.log('Server listening on port ' + PORT)); // () => same thing as function()

// set static folder ('public') then create path and route to index.html page inside that folder; takes care of routing
	app.use(express.static(path.join(__dirname, 'public'))); // defines path to public directory

