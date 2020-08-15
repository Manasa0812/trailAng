var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/trailpro');
var col=db.get('signup');
var reg=db.get('register');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/postsign',function(req,res){
	console.log(req.body);
	col.insert(req.body,function(err,docs){
		if(err){
			console.log(err);
		}else{
			console.log(docs);
			res.send(docs);
		}
	})
})

router.post('/postlogin',function(req,res) {
	col.findOne({"em":req.body.em,"pwd":req.body.pwd},function(err,docs){
		if(docs){
			console.log("logged successfully");
			res.send(docs);
		}else{
			console.log("error in logging");
		}
	})
});
router.get('/trail1',function(req,res){
	res.render('trail1');
});
router.get('/out',function(req,res){
	res.redirect('/');
});

router.post('/postreg',function(req,res){
	reg.insert(req.body,function(err,docs){
		if(err){
			console.log("error")
		}else{
			console.log("success");
			res.send(docs);
		}
	})
});
router.get('/getreg',function(req,res){
	reg.find({},function(err,docs){
		if(err){
			console.log(err)
		}else{
			console.log("done");
			// console.log(docs);
			res.send(docs);
		}
	});
});

router.delete('/deletedata:myid',function(req,res){
  reg.remove({"_id":req.params.myid},function(err,docs){
  	if(err){
  		console.log(err);
  	}else{
  		console.log("working");
  		res.send(docs);
  	}
  })
});

router.put('/updateuser:mineid',function(req,res){
	id=req.params.mineid;
	console.log(id);
	// console.log(req.body);

	reg.update({"_id":id},{$set:req.body},function(err,docs){
		if(err){
        console.log(err);
		}else{
			console.log(docs);
			console.log("updated");
			res.send(docs);
			}
	})
})

module.exports = router;
