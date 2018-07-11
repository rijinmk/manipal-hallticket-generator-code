var settings = {
  branch: 'branch', 
  semester: 'semester', 
  c_letters: ["C","D","E"],
  c_numbers: [9,10,11,12,13,14,15,16,17,18,19],
  s_letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
  s_numbers: [24,25,26,27,28,29,30],
}

var course_data = {}; 
var student_data = {};

$('#branch-select').on('change',function(){
  settings['branch'] = $('#branch-select option:selected').text();
  if(settings['branch'] != 'branch' && settings['semester'] != 'semester'){
    $('#generate-holder #generate-set-2').fadeIn();
    $('#generate-4').fadeIn();
  }else{
    $('#generate-holder #generate-set-2').fadeOut();
    $('#generate-4').fadeOut();
  }
});

$('#semester-select').on('change',function(){
  settings['semester'] = $('#semester-select option:selected').text();
  if(settings['branch'] != 'branch' && settings['semester'] != 'semester'){
    $('#generate-holder #generate-set-2').fadeIn();
    $('#generate-4').fadeIn();
  }else{
    $('#generate-holder #generate-set-2').fadeOut();
    $('#generate-4').fadeOut();
  }
});

$('#default-settings-yes').click(function(){
  $("#generate-holder #generate-set-3").slideUp(); 
});

$('#default-settings-no').click(function(){
  $("#generate-holder #generate-set-3").slideDown(); 
});

$('#courses-settings-yes').click(function(){
  $("#generate-holder #generate-set-3-1").slideDown(); 
  $('#generate-holder #generate-set-3').css('padding-bottom','110px'); 
});

$('#courses-settings-no').click(function(){
  $("#generate-holder #generate-set-3-1").slideUp(); 
  $('#generate-holder #generate-set-3').css('padding-bottom','100px'); 
});

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//COURSES
$( "#slider-range-courses-letters" ).slider({
    range: true,
    min: 0,
    max: 25,
    values: [ 3, 7 ],
    slide: function( event, ui ) {
      $('#range-courses-letters').text('Column letters where the courses reside: '+letters[ui.values[0]] + " to " + letters[ui.values[1]]); 
      settings['c_letters'] = []; 
      for(var i=ui.values[0]; i<=ui.values[1]; i++){
        settings['c_letters'].push(letters[i]); 
      }
    }
  });
  
  $( "#slider-range-courses-numbers" ).slider({
      range: true,
      min: 1,
      max: 100,
      values: [ 30, 40 ],
      slide: function( event, ui ) {
        $('#range-courses-numbers').text('Row numbers where the courses reside: '+ui.values[0] + " to " + ui.values[1]); 
        settings['c_numbers'] = []; 
        for(var i=ui.values[0]; i<=ui.values[1]; i++){
          settings['c_numbers'].push(i);
        }
      }
    });
  
  //STUDENTS
  $( "#slider-range-students-letters" ).slider({
      range: true,
      min: 0,
      max: 25,
      values: [ 0, 4 ],
      slide: function( event, ui ) {
        $('#range-students-letters').text('Column letters where the students reside: '+letters[ui.values[0]] + " to " + letters[ui.values[1]]); 
        settings['s_letters'] = []; 
        for(var i=ui.values[0]; i<=ui.values[1]; i++){
          settings['s_letters'].push(letters[i]); 
        }
      }
    });
    
    $( "#slider-range-students-numbers" ).slider({
      range: true,
      min: 1,
      max: 100,
      values: [ 24, 90 ],
      slide: function( event, ui ) {
        $('#range-students-numbers').text('Row numbers where the students reside: '+ui.values[0] + " to " + ui.values[1]); 
        settings['s_numbers'] = []; 
        for(var i=ui.values[0]; i<=ui.values[1]; i++){
          settings['s_numbers'].push(i); 
        }
      }
    });
    
    function parse_data(xlf,sheet){
      var xl = xlf[sheet];

      //GENERATING COURSE DATA
      // var course_data = {}; 
      for(var i=0; i<settings['c_numbers'].length; i++){
        //console.log(xl[cl+cn].v);
        //RAW DATA
        var sno = settings['c_letters'][0];
        var c_code = settings['c_letters'][1];
        var c_title = settings['c_letters'][2];
        //SHEET DATA
        try{
          var sheet_sno = xl[sno+settings['c_numbers'][i]].v;
          var course_code = xl[c_code+settings['c_numbers'][i]].v;
          var course_title =  xl[c_title+settings['c_numbers'][i]].v;  
        }catch(e){
          alert('Error please check the inputs properly');
          break; 
        }
        course_data[sheet_sno] = {course_code, course_title}; 
      }
      
      //GENERATING STUDENT DATA
      // var student_data = {};
      for(var i=0; i<settings['s_numbers'].length; i++){
        // RAW DATA
        var s_slcm = settings['s_letters'][1];
        var s_gender = settings['s_letters'][2];
        var s_regno = settings['s_letters'][3];
        var s_name = settings['s_letters'][4];
        
        // SHEET DATA
        var student_slcm = xl[s_slcm+settings['s_numbers'][i]].v;
        var student_gender = xl[s_gender+settings['s_numbers'][i]].v;
        var student_regno = xl[s_regno+settings['s_numbers'][i]].v;
        var student_name = xl[s_name+settings['s_numbers'][i]].v;
        
        var subjects = {}
        for(var j=5; j<settings['s_letters'].length; j++){
          var cell = xl[settings['s_letters'][j]+settings['s_numbers'][i]].v;
          //subject[course_data[cell]['code']] = course_data[cell]; 
          subjects[course_data[cell]['course_code']] = course_data[cell];
        }
        student_data[student_regno] = {student_name, student_slcm, student_gender, subjects};
      }
      /*
      var settings = {
        branch: 'branch', 
        semester: 'semester', 
        c_letters: ["C","D","E"],
        c_numbers: [9,10,11,12,13,14,15,16,17,18,19],
        s_letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
        s_numbers: [24,25,26,27,28,29,30],
      }
      */
      var cref = database.ref('HALLTICKET/ENGINEERING/'+settings['branch']+'/Semester/'+settings['semester']+'/');
      cref.set(student_data);  
    }
      
    //DRAG AND DROP FUNCTION
    var xl_ext = ['xls','xlt','xlm','xlsx','xlsm','xltx','xltm','xlsb','xla','xlam','xll','xlw']; 
    var isXL = 0; var rABS = true; var sheet_name; 
    var dropzone = document.getElementById('dropzone');
    dropzone.addEventListener('dragenter',function(){
      this.style.background = "#FA5B75";
    });  
    dropzone.addEventListener('dragleave',function(){
      this.style.background = "#432C51";
    });  
    dropzone.addEventListener('drop',function(e){
      e.stopPropagation(); 
      e.preventDefault(); 
      var file = e.dataTransfer.files[0];
      var fileName = file.name; 
      var fileSplit = fileName.split('.'); 
      var extension = fileSplit[fileSplit.length-1];
      for(var i=0; i<xl_ext.length; i++){
        if(xl_ext[i] == extension){
          isXL = 1; 
          break;
        }else{
          isXL = 0; 
        }
      } 
      if(isXL){
        this.style.background = "#998A2F";
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
          var n_Sheets = 0; 
          $('#select_sheet select').html('<option>Select a sheet</option>');
          for(var i in workbook.Sheets){
            n_Sheets++; 
            $('#select_sheet select').append(`<option>${i}</option>`);
          }
          $('#select_sheet').fadeIn();
          $('#select_sheet').on('change',function(){
            sheet_name = $('#select_sheet option:selected').text(); 
            $(this).fadeOut();
            console.log(settings);
            parse_data(workbook.Sheets,sheet_name);
          });
        };
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
      }else{
        this.style.background = "#E54661";
      }
    });  