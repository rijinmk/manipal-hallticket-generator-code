$(document).ready(function(){
  $('.login-input-animation').focus(function(){
    var curr_label = this.parentElement.children[0];
    if(!this.value){
      curr_label.style.top = "8px";
      curr_label.style.zIndex = "2";  
    }
  }); 
  
  $('.login-input-animation').blur(function(){
    var curr_label = this.parentElement.children[0];
    if(!this.value){
      curr_label.style.top = "32px"; 
      curr_label.style.zIndex = "-1"; 
    }
  }); 
}); 