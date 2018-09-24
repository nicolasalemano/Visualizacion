/**
 * Created by NICO on 21/09/2018.
 */

class Jugador{
    constructor(nombre, id){
        this.nombre=nombre;
        this.id=id;
        this.ficha;
        this.turno=false;

    }
    getID(){
        return this.id;
    }
    getNombre(){

        return this.nombre;
    }
    setNombre(nom){
        this.nombre=nom;
    }
    setID(id){
        this.id=id;
    }

    muestraCantidadFicha(px){
        console.log(this.ficha.getCartera());
        //ctx.font = "bold 22px sans-serif";
        //ctx.font = "bold 22px arial";
        ctx.font="32px arial";
        ctx.fillStyle="orange";
        ctx.fillRect(px-20,140,80,50);
        ctx.strokeText(this.ficha.getCartera(),px,175)
    }

    agregarFicha(){

      //  this.ficha=new Ficha(this);
        let posX,posY,src;
        let img=new Image();
        if(this.id==1){

            src="img/azul.png";
            posX=100;
            posY= 200;
            this.ficha=new Ficha(this,posX,posY);
            this.muestraCantidadFicha(posX+27);
        }
        else{

            src="img/roja.png";
             posX=1000;
             posY= 200;
            this.ficha=new Ficha(this,posX,posY);
            this.muestraCantidadFicha(posX+27);
        }
        img.src=src;
        img.onload = function(){
            //  ctx.clearRect(posTableroX, posTableroY, img.width, img.height);
            ctx.drawImage(this, posX, posY);
        }
        this.muestraCantidadFicha();

    }


    clickFicha(x,y){

    }


}