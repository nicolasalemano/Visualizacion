/**
 * Created by NICO on 22/09/2018.
 */

class Juego{
    constructor(j1, j2){
        this.jugador1=j1;
        this.jugador2=j2;
        this.tablero =[];
        this.coordenadas=[];
     //   this.agregarTablero();
        this.turno=this.jugador1;
        this.col=[240,330,420,505,594,685,770,870];
        this.fil=[52,137,225,315,402,494];
    }

    agregarTablero(){

        let img=new Image();

        img.src="img/mesa.png";
        img.onload = function(){
            let posTableroX =  240;
            let posTableroY = 50;
          //  ctx.clearRect(posTableroX, posTableroY, img.width, img.height);
            ctx.drawImage(this, posTableroX, posTableroY);
        }
        this.construirTablero();


    }
     construirTablero(){

        for(let x=1;x<8;x++){
            this.tablero[x]=[];
            //this.coordenadas[102*x]=[];
            for (let y=1; y<7;y++){
                this.tablero[x][y]=0;
              //  this.coordenadas[102*x][86*y]=[];
            }
        }
// let f1=new Ficha(this.jugador1);
  //       let f2=new Ficha(this.jugador2);
         this.jugador1.agregarFicha();
         this.jugador2.agregarFicha();

    }
  getTablero(){
        return this.tablero;
    }
    fichaSeleccionada(e){
    let mouseX=e.layerX-e.currentTarget.offsetLeft;
    let mouseY=e.layerY-e.currentTarget.offsetTop;
                 console.log("MOUSE: ("+mouseX+","+mouseY+")");
        if(this.turno.ficha.isClicked(mouseX,mouseY)) {
            this.arrastrarFicha(e);
        }
    }

    arrastrarFicha(e){

        let x = e.currentTarget.offsetLeft + 13;
        let y = e.currentTarget.offsetTop + 30;

        if(this.turno.getID()== 1){
            canvas.style.cursor = 'url("img/azul.png") '+x+' '+y+',default';
        }else if(this.turno.getID()== 2){
            canvas.style.cursor = 'url("img/roja.png") '+x+' '+y+',default';
        }
    }
    //style.cursor = 'default';
    cursorDefault(e){
        let x=e.layerX-e.currentTarget.offsetLeft;
        let y=e.layerY-e.currentTarget.offsetTop;
        console.log("("+x+","+y+")");
        this.depositarFicha(x,y);
        canvas.style.cursor = 'default';
    }
    depositarFicha(x,y){
      //  posTableroX =  240;
      //  alert("entro");
       // posTableroY = 100;
        if((240>x<950)&&(0>y<105)){

            if((x>=240)&&(x<330)){
                this.agregarFicha(1,240);
            }else if((x>=330)&&(x<420)){
                this.agregarFicha(2,330);
            }else if((x>=420)&&(x<508)){
                this.agregarFicha(3,420)
            }else if((x>=508)&&(x<597)){
                this.agregarFicha(4,508);
            }else if((x>=597)&&(x<673)){
                this.agregarFicha(5,597);
            }else if((x>=673)&&(x<780)){
                this.agregarFicha(6,773);
            }else if((x>=780)&&(x<860)){
                this.agregarFicha(7,860);
            }
        }

    }
    agregarFicha(x, mouseX){
        let val=7;

        while(this.tablero[x][val]!=0){
            val--;
        }
        console.log("val: "+val);
        this.tablero[x][val]=this.turno.getID();
        if(this.turno==this.jugador1){
            this.turno=this.jugador2;
            this.jugador1.ficha.restaFicha();
            this.jugador1.muestraCantidadFicha(127);

        }else{
            this.turno=this.jugador1;
            this.jugador2.muestraCantidadFicha(1027);
            this.jugador2.ficha.restaFicha();
        }
        //494
       this.insertarFichaTablero(x, val);
    }

    insertarFichaTablero(x,y){
        let valX=this.col[x-1];
        let valY=this.fil[y-1];
        let src;
        let img=new Image();
        console.log("("+valX+","+valY+")");

        if(this.turno.getID() !=1){
            src="img/azul.png";
        }
        else{
            src="img/roja.png";
        }
        img.src=src;
        img.onload = function(){

            ctx.drawImage(this, valX, valY  );
        }
    }
}