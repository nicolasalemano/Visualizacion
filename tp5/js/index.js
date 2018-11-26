let login=false;
/*
$(document).ready(function (){
    evento.preventDefault();
    
alert("SS");
login();




});

*/
function logion(){
console.log(login);
let inicio="  <a href='#' id='loginButton'><span>Login</span><em></em></a>";
    inicio+="<div style='clear:both'></div>";
    inicio+="<div id='loginBox'>  ";
    inicio+="<form id='loginForm'>";
    inicio+="<fieldset id='body'>";
    inicio+="<fieldset>";
    inicio+="<label for='email'>Email Address</label>";
    inicio+="<input type='text' name='email' id='email' />";
    inicio+="</fieldset>";
    inicio+="<fieldset>";
    inicio+="<label for='password'>Password</label>";
    inicio+="<input type='password' name='password' id='password' />";
    inicio+="</fieldset>";
    inicio+="<input type='submit' id='login' value='Sign in' />";
    inicio+="<label for='checkbox'><input type='checkbox' id='checkbox' />Remember me</label>";
    inicio+="</fieldset>";
    inicio+="<span><a href='#'>Forgot your password?</a></span>";
    inicio+="<span><a href='#'>Registrarse</a></span>";
    inicio+=" </form>";
    inicio+="</div>";

    if(!login){
        
    }else{
       inicio="";
       inicio+="<div class='logo'>";
       inicio+="<h5>Usuario<img class='logo-imagen' src='images/usuario/usuario-plata.png'>  </h5> ";
       inicio+="</div>";

    }

   $('#loginContainer').html(data);

}