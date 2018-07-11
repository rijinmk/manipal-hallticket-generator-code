$('.login-button').click(function(){
  var email = document.getElementById('email').value; 
  var password = document.getElementById('password').value; 
  if(email && password){
    auth.signInWithEmailAndPassword(email, password).catch(function(error){
      alert(error.message); 
    }); 
  }else{
    alert('Please fill in both details'); 
  }
}); 