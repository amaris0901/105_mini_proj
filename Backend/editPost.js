module.exports = (req, res) => {
    const postId=req.body.postId;
    const title=req.body.title;
    const description=req.body.description;
     console.log(postId, title, description);
     connection.query("UPDATE posts SET title=?,description=? WHERE id = ?", [title,description,postId], (err, rows) => {
         if(err) {
             return res.json({
                 success: false,
                 data: null,
                 error: err.message,
             });
         } else {
             if (rows) {
                 res.json({
                     success: true,
                     data: {
                         message: "Post updated"
                     },
                 });
             }
         }
     });
 }