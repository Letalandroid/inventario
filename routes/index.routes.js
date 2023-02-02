const { Router } = require('express');
const router = Router();
const mysql = require('mysql');
const { read, add, eliminar, editar } = require('../operations');
const dotenv = require('dotenv');
const fetch = require('cross-fetch');
dotenv.config();

const connection = mysql.createConnection({
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	database: process.env.DATABASE,
});

router.get('/', (req, res) => {
	read(connection, (result) => {
		const data = Object.values(JSON.parse(JSON.stringify(result)));
		res.render('home', {
			title: '- Home',
			style: 'home',
			data,
		});
	});
});

router.post('/add', (req, res) => {
	const { nombre, cantidad, color } = req.body;

	add(nombre, cantidad, color, connection);

	read(connection, (result) => {
		const data = Object.values(JSON.parse(JSON.stringify(result)));
		res.render('home', {
			title: '- Home',
			style: 'home',
			data,
			message: {
				add: 'Producto agregado correctamente.',
			},
		});
	});
});

router.delete('/delete/:id', (req, res) => {
	const { id } = req.params;

	eliminar(id, connection);

	read(connection, (result) => {
		const data = Object.values(JSON.parse(JSON.stringify(result)));
		res.render('home', {
			title: '- Home',
			style: 'home',
			data,
			message: {
				delete: 'Producto eliminado correctamente.',
			},
		});
	});
});

router.get('/edit/:id', (req, res) => {
	read(connection, (result) => {
		let id, nombre, cantidad, color;
		const data = Object.values(JSON.parse(JSON.stringify(result)));

		data.map((value) => {
			if (value.id == req.params.id) {
				id = value.id;
				nombre = value.nombre;
				cantidad = value.cantidad;
				color = value.color;
			}
		});

		res.render('edit', {
			title: '- Edit',
			style: 'edit',
			data: {
				id,
				nombre,
				cantidad,
				color,
			},
		});
	});
});

router.put('/edit/:id', (req, res) => {
	const { id } = req.params;
	const { nombre, cantidad, color } = req.body;

	editar(id, nombre, cantidad, color, connection);

	read(connection, (result) => {
		const data = Object.values(JSON.parse(JSON.stringify(result)));
		res.render('home', {
			title: '- Home',
			style: 'home',
			data,
			message: {
				put: 'Producto editado correctamente.',
			},
		});
	});
});

module.exports = router;
