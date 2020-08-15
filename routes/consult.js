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
            hid="";
            ssn=req.session;
            var  fname=" ";var lname=" ";var dob=" ";var gender=" ";var age=" ";
            console.log("Patient id", ssn.patienthid);

            if(ssn.loginhid)
            {
              console.log("First charactor",ssn.loginhid.substring(0, 1));
              //check this is Doctor or not
              if(ssn.loginhid.substring(0, 1)!='E')
              {
                ssn.page="consult";
                ssn.loginError='You can not Login in Consultation';
                res.redirect('/login');
              }
              console.log('Dr login,can consult');
                  console.log(' dr login id',ssn.loginhid);
                  mongo.connect(url,function(err,db)
                  {
                      if(err) throw err;
                      var dbo=db.db("FinalProject");
                      var query={No:-1}

                      // find max no from consult table
                      dbo.collection("Consultation").find({},{projection:{_id:0,No:1,HID:1}}).sort(query).limit(1).toArray(function(err,result)
                      {
                                                  
                          if(err) throw err;
                          maxno=result[0].No; 
                          ssn.maxapno=maxno; 
                          console.log(maxno);
                          console.log(ssn.maxapno);
                          
                              
                      });
                      db.close();
                  });
            }
            else
            {
              ssn.page="consult";
              ssn.loginError='Please login with Hospital ID and password';
              res.redirect('/login');

            }

            res.render('consult', { title: 'Consultation',Hid:hid,Fname:fname,Lname:lname,Age:age,Gender:gender});
                               
});



/* POST home page. */
router.post('/', function(req, res, next) 
{
            ssn=req.session;
            console.log("Patient id", ssn.patienthid);
     
            if(ssn.loginhid)
            {
               console.log('in ct dr hid exist,, can consult ');
               console.log(' dr login id',ssn.loginhid);

                var i;var q1;var q2;
                var addquery="";
             
                 // read data from consultation page  and store in  variable
                var drname=req.body["drname"];
                var dept=req.body["dept"];
                var illness=req.body["illness"];
                var treatment=req.body["treatment"];
                var medicine=req.body["medicine"];
                var dat=req.body["dat"];
                var test=req.body["consulttest"];
                var result=req.body["consultresult"];

                console.log("value1",test);
                console.log("value2",result);

               if(test!=null)
               {
                console.log("test need");
                var testlength=test.length;

               }
               else
               {
                console.log("test not need");
               }

                console.log(drname);
                console.log(illness);
                console.log("consultDate",dat);
                console.log(test);
                console.log(result);
      
       
               //connect to DB  and insert consultation details in db
                  mongo.connect(url,function(err,db)
                  {
                         if(err) throw err;
                         var dbo=db.db("FinalProject");
                         var myObj;
                         console.log(maxno);
                         console.log(ssn.maxapno);
                         maxno=maxno+1;
                         console.log("test length",testlength);
                       
                 
                           myObj={No:maxno,HID:ssn.patienthid,DHID:ssn.loginhid,Doctor:drname,Department:dept,
                            Illness:illness,Treatment:treatment,Medicine:medicine,Date:dat}
                          
                  

                         console.log("myobj",myObj);
                          //insert the  data into dab
                         dbo.collection("Consultation").insertOne(myObj,function(err,res)
                         {
                             if(err) throw err;
                             console.log('Consultation documents Inserted successfully ');
                             db.close();
                         });
             
                  });

                req.session.destroy();
               res.redirect('/login');
             }
             else
             {
               console.log('hid  notexist,, can not Consult');
               res.redirect('/login');
       
             }
});


module.exports = router;