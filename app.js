
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


// ============ Stock market Portfolio App ============


// initialize express:
	const express = require('express');
	const app = express();

// define path:
	const path = require('path');

// initialize handlebars:
	const exphbs = require('express-handlebars');

// need to run node server and tell app which port to listen on
	const PORT = process.env.PORT || 5000; // use web hosting port OR use localhost:5000

// set handlebars middleware:
	app.engine('handlebars', exphbs()); 
	app.set('view engine', 'handlebars'); 

// set handlebar routes (don't need to set routes for express in this instance)
	app.get('/', function (req, res) {
		res.render('home', {
			stuff: "This is stuff..."
		});
	});

// followed instructions for dir structure: https://www.npmjs.com/package/express-handlebars#basic-usage
	// views folder (home.handlebars) = webpages
	// layouts folder (main.handlebars) = templates. main has main stuff that you want on every page of your website

// tell app to listen for res/req objects on the specified port
	app.listen(PORT, () => console.log('Server listening on port ' + PORT)); // () => same thing as function()

// set static folder ('public') then create path and route to index.html page inside that folder; takes care of routing
	app.use(express.static(path.join(__dirname, 'public'))); // defines path to public directory