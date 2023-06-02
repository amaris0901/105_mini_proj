module.exports = (req, res) => {
    const postId = req.params.postId;

    connection.query("DELETE FROM posts WHERE id = ?", [postId], (err, rows) => {
        if(err) {
            return res.json({
                success: false,
                data: null,
                error: err.message,
            });
        } else {
            if (rows) {
                res.send({
                    success: true,
                    data: {
                        message: "Post deleted"
                    },
                });
            }
        }
    });
}