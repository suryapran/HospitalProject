var express = require('express');
var router = express.Router();
var formidable=require('formidable');
var ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
var ssn;
var maxno; 
var mongo=require('mongodb').MongoClient;
var url="mongodb+mongodb+srv://root-123:root-123@cluster0.32nza.azure.mongodb.net/nodedb?retryWrites=true&w=majority";

/* POST home page. */
router.post('/', function(req, res, next) 
{
        ssn=req.session;
      var  fname=" ";var lname=" ";var dob=" ";var gender=" ";
      let dat = new Date();

     if(ssn.loginhid)
     {
        
        console.log('Dr id',ssn.loginhid);
        if(ssn.patienthid)
        {

            console.log('Patient hid exist,, can enter t&r',ssn.patienthid);
        }

            mongo.connect(url,function(err,db)
            { 
                console.log("Patient hid",ssn.patienthid);
                
                 if(err) throw err;
                 var dbo=db.db("FinalProject");
                   
                   var query={No:-1}

                      // find max no from consult table
                      dbo.collection("TestResult").find({},{projection:{_id:0,No:1,HID:1}}).sort(query).limit(1).toArray(function(err,result)
                      {
                                                  
                          if(err) throw err;
                          maxno=result[0].No; 
                          maxno=maxno+1;
                          ssn.maxapno=maxno; 
                          console.log("maxno",maxno);
                          console.log("maxno",ssn.maxapno);
                          
                              
                    
                        console.log("maxno",maxno);
                          console.log("maxno",ssn.maxapno);
                   //connect to DB  and insert test result details
                      var myObj={No:ssn.maxapno,HID:ssn.patienthid,Date:dat,
                            Test:req.body.consulttest,Result:req.body.consultresult
                            }
                            dbo.collection("TestResult").insertOne(myObj,function(err,res)
                         {
                             if(err) throw err;
                             console.log('Test Result documents Inserted successfully ');
                             db.close();
                             
                         });
                        });
                         res.redirect('/consult');  

            });
      }
      else
      {
        console.log('Dr hid  not exist,, can not consult');
        res.redirect('/consult');

      }

});
module.exports = router;