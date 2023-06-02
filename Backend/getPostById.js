var jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    const token = req.cookies.UserToken;
	var decoded = jwt.verify(token, "ZJGX1QL7ri6BGJWj3t");
    console.log(decoded.user.id);
    connection.query("SELECT * FROM posts WHERE userId = ?", [decoded.user.id], ( err, rows) => {
        if (err) {
            return res.json({
                success: false,
                data: null,
                message: err.message,
            }); 
        } else {
            res.json({
                success: true,
                data: rows,
                message: 'Posts of specific user fetched.',
            });
        }
    });
};