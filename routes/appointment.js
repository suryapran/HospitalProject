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
     if(ssn.loginhid)
     {
        console.log('alreday login');
        console.log('login id',ssn.loginhid);
        var hid;var fname;var lname;var dob;var gender;var email;var mphone;
        var hphone;var unumber;var address;var city;var zip;

       
              mongo.connect(url,function(err,db)
              {
                  if(err) throw err;
                  var dbo=db.db("FinalProject");

                  var query={No:-1}

                      // find max no from Appointments table
                        dbo.collection("Appointments").find({},{projection:{_id:0,No:1,HID:1}}).sort(query).limit(1).toArray(function(err,result)
                        {
                                                    
                            if(err) throw err;
                            maxno=result[0].No; 
                            ssn.maxapno=maxno; 
                            console.log(maxno);
                            console.log(ssn.maxapno);
                            
                              
                        });

                         //connect to DB  and find user exist or not
                      query={HID:ssn.loginhid}
                        dbo.collection("Users").find(query).toArray(function(err,result)
                        {
                                if(err) throw err;
                                console.log(result);
                              if(result.length==0) 
                              {
                                      console.log('User Not Exist can not book an appointment');
                                      res.redirect('/login');

                              }
                              else
                              {
                                console.log('User exist you can book appointment ');
                                 hid=result[0].HID;
                                 fname=result[0].Fname;
                                 lname=result[0].Lname;
                                 dob=result[0].Dob;
                                 gender = result[0].Gender;
                                 email=result[0].Email;
                                 mphone=result[0].Mphone;
                                 hphone=result[0].Hphone;
                                 unumber=result[0].Unitno;
                                 address=result[0].Address;
                                 city=result[0].City;
                                 zip=result[0].Zip;

                                console.log(hid);
                                console.log(fname);
                                res.render('appointment', { title: 'Appointment',Hid:hid,Fname:fname,Lname:lname,Dob:dob,Gender:gender,Email:email,Mphone:mphone,Hphone:hphone,UnitNo:unumber,Address:address,City:city,Zip:zip});

                              }
                        });
                        
                     db.close();           
              });
              
      }
      else
      {
        ssn.page="appointment";
        ssn.loginError='Please login with Hospital ID and password';
        res.redirect('/login');

      }
});


/* POST home page. */
router.post('/', function(req, res, next) 
{
    ssn=req.session;
 
     if(ssn.loginhid)
     {
        console.log('in ap hid exist,, can book apointment');
        console.log('login id',ssn.loginhid);
        var dept=req.body["dept"];
        var dr=req.body["dr"];
        var dat=req.body["dat"];
        var time =req.body["time"];

        console.log(dept);
        console.log(time);
     
        //connect to DB  and insert appointment details
              mongo.connect(url,function(err,db)
              {
                  if(err) throw err;
                  var dbo=db.db("FinalProject");
                  console.log(maxno);
                  console.log(ssn.maxapno);
                  maxno=maxno+1;

                  var myObj={No:maxno,HID:ssn.loginhid,Department:dept,Doctor:dr,
                    Date:dat,Time:time}
                  
                    //insert the  data into dab
                  dbo.collection("Appointments").insertOne(myObj,function(err,res)
                  {
                      if(err) throw err;
                      console.log('Appointment documents Inserted successfully ');
                      db.close();
                  });
                                
              });
          req.session.destroy();
        res.redirect('/login');
      }
      else
      {
        console.log('hid  not exist,, can not book appointment');
        res.redirect('/appointment');

      }

});

module.exports = router;
