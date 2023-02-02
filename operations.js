const table = 'productos'; // Change this line

const read = (connection, callback) => {
	connection.query(`select * from ${table}`, (err, result) => {
		if (err) throw err;
		callback(result);
	});
};

const add = (nombre, cant, color, connection) => {
	connection.query(
		`insert into ${table} (nombre, cantidad, color) values ('${nombre}', '${cant}', '${color}');`,
		(err) => {
			if (err) throw err;
		}
	);
};

const eliminar = (id, connection) => {
	connection.query(`delete from ${table} where id=${id}`, (err) => {
		if (err) throw err;
	});
};

const editar = (id, nombre, cantidad, color, connection) => {
	connection.query(
		`update ${table} set nombre='${nombre}', cantidad='${cantidad}', color='${color}' where id=${id}`,
		(err) => {
			if (err) throw err;
		}
	);
};

module.exports = { read, add, eliminar, editar };
