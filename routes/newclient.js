var express = require('express');
var router = express.Router();
var formidable=require('formidable');
var nodemailer=require('nodemailer');
var ssn;
var maxno;
var hid;
var mongo=require('mongodb').MongoClient;
var url="mongodb+mongodb+srv://root-123:root-123@cluster0.32nza.azure.mongodb.net/nodedb?retryWrites=true&w=majority";


/* GET home page. */
router.get('/', function(req, res, next) 
{
                ssn=req.session;

                mongo.connect(url,function(err,db)
                {
                      if(err) throw err;
                       //connect to DB  and find max No
                      var dbo=db.db("FinalProject");
                      var query={No:-1}
                      dbo.collection("Users").find({},{projection:{_id:0,No:1,HID:1}}).sort(query).limit(1).toArray(function(err,result)
                      {
                                                  
                          if(err) throw err;
                          maxno=result[0].No;  
                          hid=result[0].HID; 
                          ssn.oldmax=maxno;
                          ssn.oldhid=hid;
                          db.close();
                  
                      });
                                    
                  });
              res.render('newclient', { title: 'New Client' ,duperror:ssn.dupError});
});



/* POST home page. */
router.post('/', function(req, res, next) 
{
            ssn=req.session;
            ssn.newmax=maxno+1;
            ssn.email=req.body["email"];
            // read data from new user page  and store in  variable
            var fname=req.body["fname"];
            var lname=req.body["lname"];
            var dob=req.body["dob"];
            const request = req.body;
              let gender = request.gender;
            var email=req.body["email"];
            var mphone=req.body["mphone"];
            var hphone=req.body["hphone"];
            var unumber=req.body["unumber"];
            var utype=req.body["utype"];
            var address=req.body["address"];
            var city=req.body["city"];
            var zip=req.body["zip"];
            var PorE=req.body["PorE"];
              if(PorE=="on")
              {
                ssn.newhid="E"+ssn.newmax;
              }
              else
              {
                ssn.newhid="P"+ssn.newmax;
              }
            var cpass=req.body["cpass"];
            let cdate = new Date();
     
             //send HID to Email
             var transport=nodemailer.createTransport(
               {
                  service:'gmail',
                  auth:{
                          user:'suryagayathri1981@gmail.com',
                          pass:'/.,AnjalI'
                       }
               });
          
              var mailOptions={
                            from:'suryagayathri1981@gmail.com',
                            to:email,
                            subject:'Hospital ID',
                            html:"You Successfully Registered in Medicare.<b>Your Hospital ID is : "+ssn.newhid+" </b></br>You should keep the Hospital ID when you visit in Hospital ."
                           };

             //Connect to Db for inserting the new user data
             mongo.connect(url,function(err,db)
             {
                       if(err) throw err;
                       var dbo=db.db("FinalProject");

                       //check the same user in db or not
                       var query={Fname:fname,Lname:lname,Dob:dob}
                         dbo.collection("Users").find(query).count(function(err,result){
                         if(err) throw err;
                         console.log(result);
                       if(result==0) 
                       {
                       
                               var myObj={No:ssn.newmax,HID:ssn.newhid,Pass:cpass,Fname:fname,
                                 Lname:lname,Dob:dob,Gender:gender,Email:ssn.email,
                                 Mphone:mphone,Hphone:hphone,Unitno:unumber,Unittype:utype,Address:address,
                                 City:city,Zip:zip,Date:cdate}
                               
                                 //insert the  data into dab
                               dbo.collection("Users").insertOne(myObj,function(err,res){
                                   if(err) throw err;
                                   console.log('One documents Inserted successfully ');
                                   db.close();
                               });

                               transport.sendMail(mailOptions,function(err,info)
                                {
                                    if(err)
                                    {
                                        console.log(err);
                                
                                    }
                                    else
                                    {
                                        console.log('Email sent'+info);
                                    }
                                
                                });
                               res.redirect('/login');

                       }
                       else
                       {
                           console.log('User alreday Exist ');
                           ssn.dupError="User alreday exist.Use different Email ";
                           res.redirect('/newclient');
                       }
                       
                   });
             });

});



module.exports = router;