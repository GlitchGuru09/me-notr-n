const express = require('express');
const app = express();

const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extented: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.send('working');
})

app.listen(port, function() {
    console.log(`server running on port: ${port}`);
});
