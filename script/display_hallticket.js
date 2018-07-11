String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

function display_hallticket(data){
  console.log('Another file');
  for(var i in data){
    var roll_no = i; 
    var details = data[i]; 
    var student_name = details['student_name'];
    var subjects = details['subjects']; 
    hallticket = ``;

    var hallticket = 
    `<div class="hallticket" style="page-break-before:always">
      <div class="only-on-print">
        <h1 class="title" align="center">MANIPAL UNIVERSITY</h1>
        <h3 class="sub-title" align="center">DUBAI CAMPUS</h3>
        <h3 class="exam-type" align="center">END SEMESTER EXAMINATION</h3>
        <h3 class="exam-period" align="center">OCT • 2017</h3>
        <h5 class="hallticket-title">HALLTICKET</h5>
      </div>

      <table class="student-info">
        <tr>
          <th>Name</th>
          <td>${student_name}</td>
        </tr>
        <tr>
          <th>Program</th>
          <td>${branch}</td>
        </tr>
        <tr>
          <th>Semester</th>
          <td>${semester}</td>
        </tr>
        <tr>
          <th>Examination Number</th>
          <td>${i}</td>
        </tr>
      </table>
      
      <div class="only-on-print">
        <ul class="rules">
          <li class="title">RULES</li>
          <li class="rules-info">Please use this examination number in all your answer sheets. Please note that your answer sheets should contain only this number and no other identification or roll number etc.</li>
          <li class="rules-info">Your seating arrangements in the examination hall is also based on this examination number. Please check your room number and seat numbers based on your examination number</li>
          <li class="rules-info">Based on available records you are eligible to appear for the following examinations</li>
        </ul>
      </div>
      
      <div class="only-on-print">
        <table class="exam-info">
          <tr class="exam-info-header">
            <th>Date</th>
            <th>Time</th>
            <th>Code</th>
            <th>Title</th>
            <th>Invigilator</th>
          </tr>`
          
        for(var j in subjects){
          hallticket+=
          `<tr>
            <td class="exam-date">${Math.floor(Math.random() * 29)+1} OCT <br> 2017</td>
            <td class="exam-time">9:00 AM<br> 12:00 PM</td>
            <td class="subject-code">${j.replaceAll("-", " ")}</td>
            <td class="subject-name">${subjects[j]['course_title']}</td>
            <td class="inv-sign"></td>
          </tr>`;
        }
          
          
      hallticket +=     
        `</table>
      </div>

      <div class="only-on-print">
        <table class="signs">
          <tr>
            <th><span class="signs-chairperson">Chairperson</span> <br> <span class="soeit">School of Engineering and IT</span></th>
            <th><span class="student">Signature of the student</span></th>
          </tr>
        </table>
      </div>
    </div>`;
      
    $('#print-these').append(hallticket); 
  }
}