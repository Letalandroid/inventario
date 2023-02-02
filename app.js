const express = require('express');
const app = express();
const indexRoutes = require('./routes/index.routes');
const path = require('path');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const mysql = require('mysql');
const morgan = require('morgan');
const methodoverride = require('method-override');
dotenv.config();

// Middlewars
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodoverride('_method'));

// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine(
	'.hbs',
	exphbs.engine({
		layoutsDir: path.join(app.get('views'), 'layouts'),
		defaultLayout: 'index',
		extname: '.hbs',
	})
);

// MySql DB
const connection = mysql.createConnection({
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	database: process.env.DBDATABASE,
});

connection.connect((err) => {
	if (err) throw err;
	console.log('🟢 DB connected');
});

// Routes
app.use(indexRoutes);

module.exports = app;
