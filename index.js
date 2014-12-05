var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models/index.js");
var Hashids = require("hashids"),
    hashids = new Hashids("squishIT");

var id = hashids.encode(12345);

var app = express();

//app settings//
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));

//root route//
app.get("/", function(req, res){
	res.render("index");
});

app.post("/create", function(req, res){
	db.URL.findOrCreate({where: req.body}).done(function(err, myUrl, notMade){
		
		// if it was created and encrypted//
		if(notMade){
			var squishResults = hashids.encode(myUrl.id);
			myUrl.squish_code = squishResults;
			myUrl.save().done(function(err, data2){
				console.log("created token", myUrl.squish_code);
			 res.render("create", {"squish_code": data2.squish_code});
		})
		} else{
			res.render("create", {"squish_code": myUrl.squish_code})
		}
	})
				
	});

// app.post("/create", function(req, res){
// 	db.URL.create({"full_url": req.body.fullUrl}).done(function(err, data){
// 		// res.send(data);
// 		var dataId = data.id;
// 		var squishResults = hashids.encode(dataId);
// 		data.squish_code = squishResults;
// 		data.save().done(function(err, data2){
// 			console.log(data2);
// 			res.render("create", data2);
// 		});
// 	})
// 	// res.redirect("/create");
// });

app.get("/:id", function(req,res){
	req.params.id
	db.URL.find({where: {squish_code: req.params.id}}).then(function(row){
		res.redirect(row.full_url);
	})
})

// app.get("/create", function(req, res){
// 	res.render("create");
// })

///listener///
app.listen(3000, function(){
	console.log("ready to go!");
})
