/**
 * Created by NICO on 23/09/2018.
 */

class Ficha{

    constructor(j,x,y){

      //  this.posX=parametro.posX;
       // this.posY=parametro.posY;
        this.cartera=21;
        this.jugador=j;
        this.radio=43;
        this.fx=x+43;
        this.fy=y+43 ;
    }



    getCartera(){
            return this.cartera;
    }

    restaFicha(){

        return this.cartera--;
    }
    isClicked(mouseX,mouseY){

        let x = (mouseX - this.fx);
        let y = (mouseY - this.fy);
        if(Math.sqrt(x*x + y*y) < this.radio){
            console.log("dentro: "+Math.sqrt(x*x + y*y));
        }
        else{
            console.log("fuera");
        }
        return Math.sqrt(x*x + y*y) < this.radio ? true : false;
    }
}