const express = require('express');
const app = express();
const path = require('path'); 
const fs = require('fs');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extented: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//home page
app.get('/', function(req, res){
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files});
    });
})

//create task page
app.post('/create', function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,`${req.body.details}`,function(err){
        res.redirect("/")
    });
})

//edit filename page
app.post('/edit', function(req, res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/");
    })
})

//show note page
app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){
        res.render("show", {filename: req.params.filename, filedata: filedata})
    })
})

//edit page show details page
app.get('/edit/:filename', function(req, res){
        res.render("edit", {filename: req.params.filename});
})


//This is dynamic routing
// app.get('/profile/:username', function(req, res){
//     res.send(`Welcome, ${req.params.username}`); //req.params(:)username(username) 
//     // req.params is a object
// })

//another scenario with 2 dynamic routes
// app.get('/author/:yourname/:score', function(req, res){
//     res.send(`Welcome ${req.params.yourname} your score is ${req.params.score}`); 
// })



app.listen(port, function() {
    console.log(`server running on port: ${port}`);
});
