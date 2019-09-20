var express = require("express");
var myParser = require("body-parser");
var app = express();
app.use(myParser.urlencoded({extended : true}));
app.use(myParser.json());
var cors = require('cors');
app.use(cors());

app.use(myParser.text({ type: 'text/html' }));
let arr = [];

app.get("/",function(req,res) {
	res.send("yaay");
});

app.post("/lol",function(req,res) {
	console.log(req.body);
	arr.push(req.body);
	res.send("l");
});


app.get("/lol",function(req,res) {
	var x = {data:arr};	
	res.json(x);
});

app.listen(3002);
