let juego = new Juego();


document.getElementById('inicio').style.visibility='visible';

document.getElementById("inicio").addEventListener("click", function () {
    juego.comenzarJuego();
});

