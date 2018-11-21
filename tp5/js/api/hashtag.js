function Hashtags(){
   this.tuit=[];
   this.cb = new Codebird;
  this.cb.setConsumerKey("Nb4JAkS9MB4JQB8Y7bw58Z13f", "fwhpcF7LVpaowqSHIuCHuRCZ2mfvQDZU5izk2MdpOdZASurQqV");
   this.cb.setToken("34728593-FiBXhIVjQ1aftiwJhfrixlU2KZ0EF302AbQGixYUB", "L0StWgFwXhAhIGInWQmrRpQSavVN1qYiota4q8b2TDb9G");
   this.cb.setProxy("https://cb-proxy.herokuapp.com/");
   this.next='';
}

Hashtags.prototype.autorizar = function(){
  
   this.cb.__call(
     'oauth2_token',
     {},
     function (reply, rate, err) {
         var bearer_token = reply.access_token;
       
       }
   );

 hashtags.search();
}

Hashtags.prototype.search = function(){
  console.log("aca");
   this.cb.__call(
     'search_tweets',
     {
       httpmethod:"GET",    
       q: 'Battlefield V',
       tweet_mode:'extended',
       lang:'es',
       count : '20'
     },
     (reply) => {    
     this.tuit=[];         
         if((reply.httpstatus == 200)&&(reply.statuses.length>0)){
           for(i=0;i<reply.statuses.length;i++){           
             if(typeof reply.statuses[i].full_text !== "undefined"){              
                 this.tuit.push([reply.statuses[i].full_text,reply.statuses[i].user.profile_image_url_https,reply.statuses[i].user.location,reply.statuses[i].user.name]);
               }
             }
            
            this.armarGrid();

           
         }

         else{
            document.getElementById("comentario").innerHTML = '<div class="errorMsj">¡¡¡NO HAY COMENTARIOS !!!</div>';
         }         
       }
   );
}

Hashtags.prototype.getNextResult = function(){
   return this.next;
}

Hashtags.prototype.armarGrid = function(){
  var contenido='<table class="table table-dark table-striped table-curved scroll">';
  contenido+='<thead class="ranking-titulo">';
  contenido+='</thead>';
  contenido+='<tbody>';
   //0=texto
   //1=imagen perfil
   //2=locacion del usuario
   //3=nombre
   for (var l = 0; l < this.tuit.length; l++) {
     contenido+='<tr>';
        contenido+='<td class="col-2 "  ';
          contenido+='<div class="col ">';
            //contenido+='<div  class="" >';
              //contenido+='<div class="">';
                 contenido+='<p class="" style="font-size:10px"><img src="'+this.tuit[l][1]+'"><br>'+this.tuit[l][3]+'<br>'+this.tuit[l][2]+'</p>';
              //contenido+='</div>';
          //contenido+='</div>';
        contenido+='</td>';
        contenido+='<td class="col-10 lab"  ';//id="contenedor">
          contenido+='<div class="col ">';//x9 animacion-mensajes
            contenido+='<div  class="animacion-contenedor" >';
              contenido+='<div class="animacion-comentario">';            
                 contenido+='<p >'+this.tuit[l][0]+'</p>';
            contenido+='</div>';
          contenido+='</div>';
        contenido+='</td>';
      contenido+='</tr>';
   }
  
  contenido+='</tbody>';
  contenido+='</table>'; 
   document.getElementById("comentario").innerHTML = contenido;
}


