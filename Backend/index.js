const cors=require('cors');
const express=require('express');
const mysql=require('mysql2');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

const connection=mysql.createConnection({
    host: "server2.bsthun.com",
    port: "6105",
    user: "lab_1arfnc",
    password: "GNYK8cVwqUS9Nyuz",
    database: "lab_blank01_1a3erol"
});
global.connection=connection;

connection.connect();
const port=8000;
const app=express();
app.use(express.json());

app.use(bodyParser.json({type:"application/json"}));
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }));
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send("Hello World!")
});
app.post("/register", require('./register'));
app.post("/login", require("./login"));
app.get("/me",require("./getUserById"));
app.post('/post', require('./createPost'));
app.patch('/post',require("./editPost"));
app.get('/post/:postId',require('./getPostById'));
app.delete('/post/:postId',require("./deletePost"));
app.get('/postsByUser',require("./getAllPostsByUser"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});