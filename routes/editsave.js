var express = require('express');
var router = express.Router();
var formidable=require('formidable');
const e = require('express');
var ssn;

var mongo=require('mongodb').MongoClient;
var url="mongodb+mongodb+srv://root-123:root-123@cluster0.32nza.azure.mongodb.net/nodedb?retryWrites=true&w=majority";

/* GET home page. */
router.get('/', function(req, res, next) 
{
     ssn=req.session;
     res.render('/appointment');
    
});


/* POST home page. */
router.post('/', function(req, res, next) 
{
        ssn=req.session;
        console.log(req.body.save);

     if(ssn.loginhid)
     {
        console.log('hid exist,, can update');
        console.log('login id',ssn.loginhid);
       //check which save button pressed
          if(req.body.save==1)
          {
            console.log('save1');
            var fname=req.body["fname"];
            var lname=req.body["lname"];
            var dob=req.body["dob"];
            var gender =req.body["gender"];
            var email=req.body["email"];
              //connect to DB  and find the user
              mongo.connect(url,function(err,db)
              {
                  if(err) throw err;
                  var dbo=db.db("FinalProject");

                var oldq={HID:ssn.loginhid};
                var newq={$set:{Fname:fname,Lname:lname,Dob:dob,Gender:gender,Email:email}};
                dbo.collection("Users").updateOne(oldq,newq,function(err,result){
                if(err) throw err;
                console.log("updated 1");
                db.close(); 
                });
                 
              });
            
          }
          else
          {
            console.log('save2');
            var mphone=req.body["mphone"];
            var hphone=req.body["hphone"];
            var unumber=req.body["unumber"];
            var address =req.body["address"];
            var city=req.body["city"];
            var zip=req.body["zip"];

            console.log(mphone);
             console.log(hphone);

             //- connect to DB  and find user
              mongo.connect(url,function(err,db)
              {
                  if(err) throw err;
                  var dbo=db.db("FinalProject");

                var oldq={HID:ssn.loginhid};
                var newq={$set:{Mphone:mphone,Hphone:hphone,Unitno:unumber,Address:address,City:city,Zip:zip}};
                dbo.collection("Users").updateOne(oldq,newq,function(err,result){
                if(err) throw err;
                console.log("updated 2");
                db.close(); 
                });

                                
              });
            
          }

        res.redirect('/appointment');
      }
      else
      {
        console.log('hid  notexist,, can not update');
        res.redirect('/appointment');

      }

});
module.exports = router;