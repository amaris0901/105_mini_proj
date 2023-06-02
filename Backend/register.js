const mysql = require("mysql2");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
	const username2 = req.body.username2;
    const email= req.body.email;
	const password1 = req.body.password1;
	const salt1 = await bcrypt.genSalt(10);
	console.log("Salt #1: ", salt1);
	const hash1 = await bcrypt.hash(password1, salt1);
	console.log("Hash #1: ", hash1);

	var sql = mysql.format(
		"INSERT INTO Users (username, email, password,hashed_password) VALUES (?, ?, ?,?)",
		[username2, email,password1,hash1]
	);

	connection.query(sql, (err, rows) => {
		if (err) {
			return res.json({
				success: false,
				data: null,
				error: err.message,
			});
		}

		res.json({
			success: true,
			message: "User has been created",
		});
	});
};