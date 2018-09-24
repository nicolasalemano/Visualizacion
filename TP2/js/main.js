/**
 * Created by NICO on 22/09/2018.
 */

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let j1 = new Jugador('jugador1', 1);
let j2=new Jugador("jugador2",2);

let juego=new Juego(j1,j2);
juego.agregarTablero();


canvas.addEventListener("mousedown", function(event){

    juego.fichaSeleccionada(event);



});

canvas.addEventListener("mouseup", function(event){
    juego.cursorDefault(event);
    //let token = fourInARow.playerOnTurn.selectedToken;
    //if(!fourInARow.gameOver && token && token != -1){
      //  fourInARow.playToken(event);
   // }
});