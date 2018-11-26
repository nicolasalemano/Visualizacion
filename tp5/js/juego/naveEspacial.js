class Nave {
    constructor(args = {}) {
        this.width = args.w;
        this.height = args.h;
        this.element = args.htmlDOM;
        this.interval = [];
        this.id = args.id;
    }
    setPos(x, y) {
        let css = document.getElementById(this.id).style;
        css.left = x;
        css.bottom = y;
    }
    generarNave(x,y){
        $("#juego").append(this.element);              
        this.setPos(x,y);
    }

    animacion(a){

        let elem = document.getElementById(this.id);
        elem.classList.add(a);
    }
    posicion() {    
        let pos = {};
        let a=$("#"+this.id).get(0).getBoundingClientRect();
        pos.width=a.width;
        pos.height=a.height;
        pos.x = a.x;
        pos.y = a.y;   

        return pos;
    }


}