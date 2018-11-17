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
         console.log(bearer_token);
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
      
       count : '20'
     },
     (reply) => {
  
     this.tuit=[];
         this.imagenes = [];
         if((reply.httpstatus == 200)&&(reply.statuses.length>0)){
           for(i=0;i<reply.statuses.length;i++){
           
             if(typeof reply.statuses[i].full_text !== "undefined"){
                this.tuit.push([reply.statuses[i].full_text]);
 
               }
             }
             console.log(this.tuit),
            this.armarGrid();
         }
         else{
          console.log(this.tuit),
            document.getElementById("comentario").innerHTML = '<div class="errorMsj">¡¡¡NO HAY COMENTARIOS !!!</div>';
         }
      //  document.getElementById("loading").style.display = 'none';
       }
   );
}

Hashtags.prototype.getNextResult = function(){
   return this.next;
}

Hashtags.prototype.armarGrid = function(){
   var contenido = '<ul id="idGrilla" class="grid">';
   for (var l = 0; l < this.tuit.length; l++) {
         contenido = contenido + '<li><div style="color:#FF0000;">'+this.tuit[l]+'</div></li>';
   }
   contenido = contenido + '</ul>';
   document.getElementById("comentario").innerHTML = contenido;
}

Hashtags.prototype.indexOfArray = function(val, array) {
  for(j = 0; j < array.length; j++) {
    if(array[j][0] == val)
      return true;
  }
  return false;
}

Hashtags.prototype.getImagenes = function(){
  return this.tuit;
}
