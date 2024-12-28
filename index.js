const express = require('express');
const app = express();
const path = require('path') 

const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extented: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render("index");
})

//This is dynamic routing
app.get('/profile/:username', function(req, res){
    res.send(`Welcome, ${req.params.username}`); //req.params(:)username(username) 
    // req.params is a object
})

//another scenario with 2 dynamic routes
app.get('/author/:yourname/:score', function(req, res){
    res.send(`Welcome ${req.params.yourname} your score is ${req.params.score}`); 
})

app.listen(port, function() {
    console.log(`server running on port: ${port}`);
});
