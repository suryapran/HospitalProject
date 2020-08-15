var express = require('express');
var router = express.Router();
var formidable=require('formidable');
var nodemailer=require('nodemailer');
var ssn;
var maxno;
var page;
var hid;
var mongo=require('mongodb').MongoClient;
var url="mongodb+mongodb+srv://root-123:root-123@cluster0.32nza.azure.mongodb.net/nodedb?retryWrites=true&w=majority";


/* GET home page. */
router.get('/', function(req, res, next) {
  ssn=req.session;
  res.render('login', { title: 'Login Here',loginerror:ssn.loginError,Page:ssn.page });
});



/* POST home page. */
router.post('/', function(req, res, next) 
{
            ssn=req.session;
            var loginhid=req.body["loginhid"];
            var loginpass=req.body["loginpass"];
      
             //Connect to Db check the user present or not
             mongo.connect(url,function(err,db)
             {
                       if(err) throw err;
                       var dbo=db.db("FinalProject");
                       var query={HID:loginhid,Pass:loginpass}
                         dbo.collection("Users").find(query).count(function(err,result){
                         if(err) throw err;
                         console.log(result);
                       if(result==0) 
                       {
                       
                               console.log('User Not Exist .You can not login');
                               ssn.loginError="Your Hospital ID or Password is Invalid ";
                               res.redirect('/login');

                       }
                       else
                       {
                          console.log('User  Exist .You can  login and go to the pages');
                          console.log("page",ssn.page);
                          ssn.loginhid=req.body["loginhid"];
                          ssn.loginpass=req.body["loginpass"];
                          console.log('Login successfully ');
                          if(ssn.page=="appointment")
                          {
                            res.redirect('/appointment');
                          }
                          else if(ssn.page=="consult")
                          {
                            res.redirect('/consult');

                          }
                          else if(ssn.page=="history")
                          {
                            res.redirect('/phistory');
                          }
                          else
                          {
                            res.redirect('/');
                          }
                       }
                       
                   });
                   db.close();
             });

});

module.exports = router;