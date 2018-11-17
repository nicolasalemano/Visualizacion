class Juego {
    constructor(args = {}) {
        this.naveEspacial = new Nave({w: 55,h: 95,id: "naveEspacial",htmlDOM: '<div id="naveEspacial" class="naveEspacial"></div>'});
        this.width = 1000;
        this.height = 600;
        this.flecha = {left: 37,right: 39,arriba: 38,abajo: 40}
        this.keys = [];
        this.inicio = false;
        this.contador = 0;
        this.intervalo = [];
        this.puntaje = 0;        
        this.Controles();
    }

    comenzarJuego() {
        this.reinicioJuego();
        
        $(".juego").addClass("animacion-fondo");
        this.inicio = true;

        this.crearNave();     
        this.iniciarVuelo();  
        $("#inicio").hide( 1000 );  
        $("#puntaje").show();
        $(".controls").hide(1000);
    
        document.getElementById("naveEspacial").addEventListener("animationend", () => {
            let c = document.getElementById("naveEspacial").classList;            
            if (c.contains("explosion")) {
                this.mostrarFinJuego();                    
            }
        });
        this.puntaje = 0;
    }

    mostrarFinJuego(){
        this.reinicioJuego();
        let p = "<div id='finJuego' class='finJuego'>";
            p +=" <h1>FIN DEL JUEGO</h1>";               
            p +="<h3>Puntaje: "+this.puntaje+"</h3>";
            p +="</div>";                   
        $("#puntaje").hide();
         $(".controls").show( "slow");
          $("#inicio").show("slow");         
         document.getElementById("inicio").addEventListener("click", function () {
         juego.comenzarJuego();                 
        }); 
        $("#fin").append(p);
    }

    reinicioJuego() {
        let finJuego = document.getElementById("finJuego");

        if (finJuego) {
            finJuego.remove();
        }       
        this.keys = [];
        this.contador = 0;
        
        document.getElementById("puntaje").innerHTML = 0;
        document.getElementById("juego").classList.remove("animacion-fondo");

        $("#naveEspacial").remove();
        $(".enemigo").remove();

        this.naveEspacial = new Nave({
            w: 55,
            h: 95,
            id: "naveEspacial",
            htmlDOM: '<div id="naveEspacial" class="naveEspacial"></div>'
        });

        for (let i = 0; i < this.intervalo.length; i++) {
            clearInterval(this.intervalo[i]);
        }

        this.intervalo = [];
    }

    finJuegoExplosion() {
        this.inicio = false;
        this.naveEspacial.animacion("explosion");
        this.calcularMayorPuntaje();   
    }


    crearNave() {
        if (this.inicio) {

            this.naveEspacial.generarNave("480px", "50px");
            this.generearEnemigos();    
        }
    }

    iniciarVuelo() {
        let c = this;
        let i = setInterval(function () {
            if (!c.inicio) {
                clearInterval(i);
            }
            if (c.inicio) {
                let elem = document.getElementById("naveEspacial").style;
            
                let posX = parseInt(elem.left, 10);
                let posY = parseInt(elem.bottom, 10);
        
                if (c.keys[c.flecha.left]) {
                    c.left(elem, posX);
                } else if (c.keys[c.flecha.right]) {
                    c.right(elem, posX);
                }

                if (c.keys[c.flecha.arriba]) {
                    c.arriba(elem, posY);
                } else if (c.keys[c.flecha.abajo]) {
                    c.abajo(elem, posY);
                }
            }
        }, 20);

        this.intervalo.unshift(i);
    }

    crearNaveEnemiga() { 
        let enemigo = new Nave({
            w: 98,
            h: 100,
            id: "enemigo" + this.contador,
            htmlDOM: '<div class="enemigo" id="enemigo' + this.contador+ '"></div>'
        });
        this.contador++;
        return enemigo;
    }

    generearEnemigos() {
        if (this.inicio) {
            let c = this;
            let i = setInterval(function () {
                if (!c.inicio) {
                    clearInterval(i);
                }
                let enemigo = c.crearNaveEnemiga();
               
                enemigo.generarNave(parseInt(Math.random() * (975) + 15) + "px", "630px");             
              
                enemigo.animacion("vueloEnem");


                $("#" + enemigo.id).on("animationstart", function () {
                    let iter = setInterval(() => {
                        if (!c.inicio) {
                            clearInterval(iter);
                        }
                        else if (c.inicio&&c.colision(this)) {                            
                                c.finJuegoExplosion();
                        }
                    }, 20);

                    c.intervalo.unshift(iter);
                });

                $("#" + enemigo.id).on("animationend", function () {
                    this.remove();
                    if (c.inicio) {
                        c.puntaje += 10;
                        document.getElementById("puntaje").innerHTML = c.puntaje;
                    }
                });
            }, parseInt(Math.random() * (1500) + 345));
            this.intervalo.unshift(i);
        }
    }

    calcularMayorPuntaje() {
        let hs = document.getElementById("mayorPuntaje");
        let text="Mejor Puntaje ";
        if (hs.innerHTML < (text+this.puntaje)) {
            hs.innerHTML = "<b>"+text+this.puntaje+"<b>";
        }
    }


    colision(nave) {
        let datosNave = this.naveEspacial.posicion();
        let rect = nave.getBoundingClientRect();

        let datosEnemigo = {
            width: rect.width,
            height: rect.height,
            x: rect.x,
            y: rect.y
        }

        if (datosEnemigo.x+datosEnemigo.width >= datosNave.x && datosEnemigo.x < datosNave.x+datosNave.width) {
            if (datosEnemigo.y+datosEnemigo.height>=datosNave.y && datosEnemigo.y<datosNave.y+datosNave.height) {
                return true; 
            }
        }
        if (datosEnemigo.x<=datosNave.x && datosEnemigo.x+datosEnemigo.width>=datosNave.x+datosNave.width) {
            if (datosEnemigo.y<=datosNave.y&& datosEnemigo.y+datosEnemigo.height>=datosNave.y+datosNave.height) {
                return true;   
            }
        }
        if (datosNave.x<=datosEnemigo.x && datosNave.x+datosNave.width>=datosEnemigo.x+datosEnemigo.width) {
            if (datosNave.y<=datosEnemigo.y && datosNave.y+datosNave.height>=datosEnemigo.y+datosEnemigo.height) {
                return true;  
            }
        }
        return false;

}
        
 
      Controles() {
            let c = this;

            document.addEventListener("keydown", function (e) {         
                    c.keys[e.keyCode] = true;

                    let el = document.getElementById("naveEspacial");
                    
                    if (el) {
                        let elem = el.classList;
                   console.log("ss"+this.contador);
                        if (c.keys[c.flecha.left]) {
                            if (elem.contains("der")) {
                                
                                elem.remove("der");
                            }
                            if (elem.contains("izq")) {
                                elem.remove("izq");
                            }
                            elem.add("izq");
                        } else if (c.keys[c.flecha.right]) {
                            if (elem.contains("der")) {
                                elem.remove("der");
                            }
                            if (elem.contains("izq")) {
                                elem.remove("izq");
                            }
                            elem.add("der");
                        }
                    }                
            });

            document.addEventListener("keyup", function (e) {
                if (c.inicio) {
                    c.keys[e.keyCode] = false;
                    let el = document.getElementById("naveEspacial");
                    if (el) {
                        let elem = el.classList;
                        if (c.inicio) {
                            if(elem.contains("der")){
                                elem.remove("der");
                            }
                            if (elem.contains("izq")) {
                                elem.remove("izq");
                            }
                        }
                    }
                }
            });
        }



    left(elem, posX) {
        if (posX > 5) {
            posX -= 8;
            elem.left = posX + "px";
        }
    }

    right(elem, posX) {
        if (posX < this.width - this.naveEspacial.width - 8) {
            posX += 8;
            elem.left = posX + "px";
        }
    }

    arriba(elem, posY) {
        if (posY < this.height - this.naveEspacial.height - 13) {
            posY += 8;
            elem.bottom = posY + "px";
        }
    }

    abajo(elem, posY) {
        if (posY > 5) {
            posY -= 8;
            elem.bottom = posY + "px";
        }
    }
}