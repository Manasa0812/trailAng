var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/trailpro');
var col=db.get('signup');
var reg=db.get('register');
var bday=db.get('birthday');


var moment=require('moment');
var nodemailer=require('nodemailer');
var random=require('randomstring');
var wf=require('word-freq');


// get bday page
router.get('/birthday',function(req,res){
	res.render('birthday');
	
});

router.get('/birthdaydata',function(req,res){
	var today=moment().format('DD-MM');
	bday.find({"dob":today},function(err,docs){
		if(err){
			console.log(er);
		}else{
			console.log(docs);
			console.log("found");
			 res.send(docs);
		}
	});
});
 router.post('/postbday',function(req,res){
 	// var today=moment().format('DD-MM');
  var data={
  	name:req.body.name,
  	em:req.body.em,
  	dob:moment(req.body.dob).format('DD-MM')
  }
  // console.log(today);
  bday.insert(data,function(err,docs){
  	if(err){
  		console.log(err)
  	}else{
  		console.log(docs);
  		res.send(docs);
  	}
  });
  // console.log(data);
 });






router.get('/Todaybday',function(req,res){

	var today=moment().format('DD-MM');
	reg.find({"dob":today},function(err,docs){
		if(err){
			console.log(err);
		}else{
			console.log(docs);
			console.log("found");
			 res.send(docs);
		}
	});
});


router.get('/yesbday',function(req,res){

	var yesterday=moment().subtract(1,'days').format('DD-MM');
	reg.find({"dob":yesterday},function(err,docs){
		if(err){
			console.log(err);
		}else{
			console.log(docs);
			console.log("found");
			 res.send(docs);
		}
	});
});


router.get('/tombday',function(req,res){

	var tomorrow=moment().add(1,'days').format('DD-MM');
	reg.find({"dob":tomorrow},function(err,docs){
		if(err){
			console.log(err);
		}else{
			console.log(docs);
			console.log("found");
			 res.send(docs);
		}
	});
});

// end of bday---------------------------------------------------------------------------------------------------------------------------------------------------------------



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
	var data={
		name:req.body.name,
		cllg:req.body.cllg,
		branch:req.body.branch,
		year:req.body.year,
		type:req.body.type,
		join:req.body.join,
		mob:req.body.mob,
		email:req.body.email,
		age:req.body.age,
		gen:req.body.gen,
		dob:moment(req.body.dob).format('DD-MM'),
		add:req.body.address
	}
	reg.insert(data,function(err,docs){
		if(err){
			console.log("error");
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
  });
});

router.put('/updateuser:mineid',function(req,res){
	var id=req.params.mineid;
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
	});
});
router.get('/forgot',function(req,res){
  res.render('forgot');
});
router.post('/postmail',function(req,res){
  console.log(req.body.inf);
  var otp=random.generate(5);
  col.find({"em":req.body.inf},function(err,docs){
  	if(err){
  		console.log(err);
  	}else{
         console.log(docs);
         col.update({"em":req.body.inf},{$set:{"pwd":otp}},function(err,docs){
          if(err){
 	         console.log(err);
          }else{
          	console.log("updated");
             res.send(docs);
          }
        });
}
});
});



router.get('/freq',function(req,res){
	res.render('freq');
});
router.post('/posttext',function(req,res){
    console.log(req.body);
    var str=req.body;
    var frequency=wf.freq(str);
    console.log(frequency);
});
module.exports = router;



// col.update({"em":req.body.inf},{$set:{"pwd":otp}},function(err,docs){
//  if(err){
//  	console.log(err);
//  }else{
//     res.send(docs);
//  }
// });