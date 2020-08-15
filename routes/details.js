var express = require('express');
var router = express.Router();
var formidable=require('formidable');
var ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
var ssn;

var mongo=require('mongodb').MongoClient;
var url="mongodb+mongodb+srv://root-123:root-123@cluster0.32nza.azure.mongodb.net/nodedb?retryWrites=true&w=majority";

/* POST home page. */
router.post('/', function(req, res, next) 
{
        ssn=req.session;
       var  fname=" ";var lname=" ";var dob=" ";var gender=" ";

     if(ssn.loginhid)
     {
        console.log('Patient hid exist,, can consult');
        console.log('Dr id',ssn.loginhid);
        var hid=req.body["hid"];
        hid=hid.toUpperCase();
        ssn.patienthid=hid;
        console.log("Patient hid",hid);
        var patienthid=hid;
      
           
            mongo.connect(url,function(err,db)
            { 
                console.log("Patient hid",ssn.patienthid);
                
                 if(err) throw err;
                 var dbo=db.db("FinalProject");
                   //connect to DB  and find the user details
                 var query={HID:hid}
                       dbo.collection("Users").find(query).toArray(function(err,result)
                       {
                               if(err) throw err;
                               console.log(result);
                             if(result.length==0) 
                             {
                             
                                     console.log('User Not Exist can not consult');
                                     res.redirect('/consult');
                             }
                             else
                             {
                               console.log('User exist you can view details in consult ');
                              
                                fname=result[0].Fname;
                                lname=result[0].Lname;
                                dob=result[0].Dob;
                                gender = result[0].Gender;
                                console.log("dob",dob);
 
                              let ageFromDate = new AgeFromDate(new Date(dob)).age;
                              console.log("value from AgeFromDate", ageFromDate);
                                     
                                var age =ageFromDate;

                              console.log("aGe",age);
                               res.render('consult', { title: 'Consult',Hid:hid,Fname:fname,Lname:lname,Age:age,Gender:gender,Patienthid:ssn.patienthid});

                             }
                       });
               db.close();
            });
      }
      else
      {
        console.log('Dr hid  not exist,, can not consult');
        res.redirect('/consult');

      }

});
module.exports = router;