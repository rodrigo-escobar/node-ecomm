const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

const routers = require('./routes/routes');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

/* Starts the cookieSession hash */
app.use(
	cookieSession({
		keys: ['884419028HJFa'],
	})
);

/* Automatic Handle The Routes Object */
for (let router in routers) {
	app.use(routers[router]);
}

app.listen(3000, () => {
	console.log('listening');
});
