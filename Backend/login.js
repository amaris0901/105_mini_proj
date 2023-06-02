const mysql=require('mysql2');
const bcrypt=require('bcrypt');
var jwt = require("jsonwebtoken");

module.exports=(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    var sql = mysql.format("SELECT * FROM Users WHERE username = ?", [username]);

    connection.query(sql,(err,rows)=>{
        if(err){
            return res.json({
				success: false,
				data: null,
				error: err.message,
			});
        }
        numRows=rows.length;
        if(numRows==0){
            res.json({
				success: false,
				message: "Username not found in the system.",
			});
        }
        else{
            const valid = bcrypt.compare(password, rows[0].hashed_password);

            if(valid){
                const token = jwt.sign(
					{
						user: rows[0],
					},
					"ZJGX1QL7ri6BGJWj3t",
					{ expiresIn: "1h" }
				);
                res.cookie("UserToken", token);
                res.json({
                success: true,
                message: "Login credential is correct",
                user: rows[0],
            });
            
            }
            else{
                res.json({
					success: true,
					message: "Login credential is incorrect",
				});
            }
            
        }
    })
}