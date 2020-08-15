//***************if deparment select doctr will enable**************************


// function sel() {
//     var e = document.getElementById("department");
//     var strUser1 = e.options[e.selectedIndex].value;
//     alert("value is "+strUser1);
//   }

//              or

$(document).ready(function()
{
   var dep,dep1;
      $("#department").change(function(){
         dep = $(this).children("option:selected").val();
         dep1="Department";
        
        if(dep!=dep1)
        {            
          if(dep=="Pediatrics")
          {
              $("#dr").prop("disabled", false);

              $("#dr option").eq(0).prop("selected",true);
              $("#dr option").eq(1).text("Dr Lynda");
              $("#dr option").eq(2).text("Dr George");
              $("#dr option").eq(3).text("Dr Priyanka");
              $("#dr option").eq(4).text("Dr Mariya");
       

          }
          else if(dep=="Urology")
          {
            $("#dr").prop("disabled", false);

            $("#dr option").eq(0).prop("selected",true);
            $("#dr option").eq(1).text("Dr Samuel");
            $("#dr option").eq(2).text("Dr Haari");
            $("#dr option").eq(3).text("Dr Susan");
            $("#dr option").eq(4).text("Dr Peeter");


          }
          else
          {
            $("#dr").prop("disabled", false);

            $("#dr option").eq(0).prop("selected",true);
            $("#dr option").eq(1).text("Dr Hima");
            $("#dr option").eq(2).text("Dr Sam");
            $("#dr option").eq(3).text("Dr Thomas");
            $("#dr option").eq(4).text("Dr Juli");
          }
             
           
           
            
          
        }
             
           
        
        else
        {         
             $("#dr").prop("disabled", true);
             $("#adate input").prop("disabled", true);
             $("#atime input").prop("disabled", true);
             $("#dr").val("Doctor");

        }
        
        });

        $("#dr").change(function(){
          
          var doc = $(this).children("option:selected").val();
          var doc1="Doctor";

          if(doc!=doc1  && dep!=dep1)
          {            
               $("#adate input").prop("disabled", false);
               $("#atime input").prop("disabled", false);
          }
          else
          {         
               $("#adate input").prop("disabled", true);
               $("#atime input").prop("disabled", true);
  
          }
          
          });

//add row for test$result dynamically
          $("#addrow1").click(function(){

              var markup="<tr>"+
               "<th >Test</th>"+
               "<td>"+
                 "<select name='consulttest' class='form-control selectpicker'>"+
                              "<option value='' >Choose Test</option>"+
                               "<option value='Complete Blood Count '>Complete Blood Count</option>"+
                               "<option value='Blood Test'>GC Test</option>"+
                               "<option value='Glucose Test'>Glucose Test</option>"+
                               "<option value='H1N1'>H1N1</option>"+
                               "<option value='COVID-19'>COVID-19</option>"+
                               "<option value='Urinalysis'>Urinalysis</option>"+
                               "<option value='DNA Fit'>DNA Fit</option>"+
                               "<option value='Drug Testing'>Drug Testing</option>"+
                               "<option value='ESR'>ESR</option>"+
                               "<option value='Flu Test'>Flu Test</option>"+
                 
                 "</select>"+
                 
               "</td>"+
               
            
             "</tr>"+
             "<tr >"+
               "<th >Result</th>"+
           
               "<td id='cresult'>"+
                 "<input name='consultresult' type='file'  >"+
               
               "</td> "+
               "<td id='cresult'>"+
                
                 "<button id='editb1' class='btn btn-primary'>Save</button>"+
               "</td> "+
             "</tr>";

              $("#consultestresult").append(markup);

              
          });
        


          //when patient id enter display patient details at consultation time
          $("#cphid").change(function(){
               if(($("#cphid").val())!="")
               {

               }
               else
               {
                    $('#cfname').val('');
                    $('#clname').val('');
                    $('#cgender').val('');
                    $('#cage').val('');

                    $("#cfname").prop("disabled", true);
                    $("#clname").prop("disabled", true);
                    $("#cgender").prop("disabled", true);
                    $("#cage").prop("disabled", true);
               }
               
          });

//when clickon edit button edit the details and click on save button to save
          $("#editb1").click(function()
      {
        
        $("#usertable1 input").prop("disabled", false);
        
      });
      $("#save").click(function()
      {
       
        $("#usertable1 input").prop("disabled", true);
        
      });
      $("#editb2").click(function()
      {
        
        $("#usertable2 input").prop("disabled", false);
        
      });
      $("#save2").click(function()
      {
       
        $("#usertable2 input").prop("disabled", true);
        
      });

      //alert message for new client hospital id

      
      $("#nsignup").click(function()
      {
       
       alert("Hospital ID will send to your Email  soon!!!.Plese Check Your Email")
      });
        //alert message for send request of appointment

      
        $("#sendrequest").click(function()
        {
         
         alert("You successfully send the request.We will replay you soon.Thank You!!")
        });
  


      //popup window for clinic department
      
      var modal = document.getElementById("departments");

      var btn = document.getElementById("clinicdpt");

    

      btn.onmouseover = function() {
        modal.style.display = "block";
        
      }
      
      //Confirmed password is match or not with password
        $("#cpass").mouseleave(function()
        {
          if($("#npass").val()!='')
          {
        if($("#cpass").val() !=  $("#npass").val())
        {
            alert("Confirmed Password is not match");
            $("#cpass").focus();
        }
        }
        
          
          
        });

});


