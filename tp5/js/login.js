let login=false;







$(function() {
    

    var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#loginForm');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        login=!login;
    console.log("login: "+login);

        inicio();

        //return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
});


function inicio(){
    $('#btn-salir').on("click",function(){
        console.log("clic");
      
    });
console.log(login);

$("#login").on("click",function(){
    if(!login){
        
    }else{
       inicio="";
       inicio+="<div class='logo'>";
       inicio+="<h5>Usuario<img class='logo-imagen' src='images/usuario/usuario-plata.png'>  </h5> ";
       inicio+="</div>";

       inicio+=" <button class ='btn btn-dark' id='btn-salir'>Salir</button>";
       //inicio+=" <input type='submit' id='login' value=Salir' />";

    }

   $('#loginContainer').html(inicio);
   });

}


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
/*
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
    inicio+="<input type='submit' id='login' value='Iniciar' />";
    inicio+="<label for='checkbox'><input type='checkbox' id='checkbox' />Remember me</label>";
    inicio+="</fieldset>";
    inicio+="<span><a href='#'>Forgot your password?</a></span>";
    inicio+="<span><a href='#'>Registrarse</a></span>";
    inicio+=" </form>";
    inicio+="</div>";
*/