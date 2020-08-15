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
      console.log('patient id from consult ',ssn.patienthid);
          if(ssn.patienthid)
          {
                ssn.loginhid =ssn.patienthid;
                console.log('login  id changed to patient id ',ssn.patienthid);
          }
          if(ssn.loginhid)
          {
              console.log('alreday login,see patient history');
                  console.log('login id',ssn.loginhid);

                  var hid="";var fname;var lname;var dob;var gender;var email;var mphone;
                  var hphone;var unumber;var address;var city;var zip;

                  var cno; var cdate; var cdr;  var cdept;  var cill;
                  var  treat;var med; var test1; var res1;
                  cno=0;                 

                  mongo.connect(url,function(err,db)
                  {
                    
                      if(err) throw err;
                      var dbo=db.db("FinalProject");
                      var query={HID:ssn.loginhid}
                            dbo.collection("Users").find(query).toArray(function(err,result1)
                            {
                                    if(err) throw err;
                                    console.log(result1);
                                  if(result1.length==0) 
                                  {
                                  
                                          console.log('User Not Exist in users not view history');
                                          req.session.destroy();
                                          rres.redirect('/login');

                                  }
                                  else
                                  {
                                    console.log('this is history ');

                                     hid=result1[0].HID;

                                     console.log("hid befro 2 query",ssn.loginhid);
                                      query={HID:ssn.loginhid}
                                      dbo.collection("Consultation").find(query).toArray(function(err,result2)
                                      {
                                              if(err) throw err;
                                              console.log(result2);
                                            if(result2.length==0) 
                                            {
                                            
                                                    console.log('User Not Exist in consultation not view consultation history');
                                                    res.render('phistory', { title:'Patient History',Result1:result1});

                                            }
                                            else
                                            {
                                              console.log('this is consultation history ');
                                              console.log('ssn.loginhid ',ssn.loginhid);
                                              dbo=db.db("FinalProject");
                                              cno=cno+1;
                                            var  query3={HID:ssn.loginhid}
                                            console.log('query3 ',query3,dbo);
                                            dbo.collection("TestResult").find(query3).toArray(function(err,result3)
                                              { console.log('find from tr ');
                                                      if(err) throw err;
                                                      console.log(result3);
                                                    if(result3.length==0) 
                                                    {
                                                    
                                                            console.log('User Not Exist in test and result not view test and result history');
                                                            res.render('phistory', { title:'Patient History',Result1:result1,Result2:result2,Clength:result2.length});
        
                                                    }
                                                    else
                                                    {
                                                      console.log('this is Test and result history ');
                                                      console.log('Tlength ',result3.length);
        
                                                      cno=cno+1;
                                
                                                      res.render('phistory', { title:'Patient History',Cno:cno,Result1:result1,Result2:result2,Clength:result2.length,Result3:result3,Tlength:result3.length});
                                                     
                                                    }
                                                });

                                            }
                                        });
                                
                                  }
                            });
                    });
            }
            else
            {
              ssn.page="history";
              ssn.loginError='Please login with Hospital ID and password';
              res.redirect('/login');

            }

});

module.exports = router;
