//VARIABLES

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let image1 = new Image();
image1.src=canvas.toDataURL();
let click=false;
let pintarActivo=true;

let colorActivo = "#000000";
let lastX = -1;
let lastY = -1;
let colorActivoAux=null;



//limpiar, poner hoja en blanco

limpiar();
let nuevoCanvas=document.getElementById("limpiar");
nuevoCanvas.addEventListener("click",function(){
    limpiar();
});
function limpiar(){

    let imageData = ctx.createImageData(width=620, height=500);

    for(x=0; x<width; x++){
        for(y=0; y<height; y++){
                setPixel(imageData, x, y, 255, 245, 255, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}
//fin poner hoja en blanco

//restaurar imagen
btnRestaurar();

function btnRestaurar(){
    let imageData=ctx.getImageData(0,0,620,500);
    var restore = document.getElementById("restaurarImagen");
    restore.addEventListener("click", changeImage);

}

//fin restaurar imagen



function changeImage(imageData){
    ctx.drawImage(image1, 0, 0);
    ctx.putImageData(imageData, 0,0);
}
//Carga Imagen dentro del canvas
document.getElementById('carga').addEventListener('change', function(e){

    let read = new FileReader();
    read.onload = function(e){
        let imagenCarga = new Image();
        imagenCarga.onload = function(){
            limpiar();
            if(imagenCarga.height > canvas.height){
                let por_height = (canvas.height/imagenCarga.height) * 100;
                imagenCarga.width = (imagenCarga.width *por_height) / 100;
                imagenCarga.height = (imagenCarga.height*por_height) / 100;
            }
            if(imagenCarga.width > canvas.width && imagenCarga.width > imagenCarga.height){
                let por_width = (canvas.width/imagenCarga.width) * 100;
                imagenCarga.width = ( imagenCarga.width*por_width) / 100;
                imagenCarga.height = (imagenCarga.height*por_width) / 100;
            }
            ctx.drawImage(imagenCarga,0,0,imagenCarga.width,imagenCarga.height);
            image1.src = canvas.toDataURL();
        }
        imagenCarga.src = e.target.result;
    }
    read.readAsDataURL(e.target.files[0]);
});
//fin carga imagen

//guardar Imagen

let guardar=document.getElementById("guardarImagen");
guardar.addEventListener("click",function(){
    guardarImagen(this);
})
function guardarImagen(e){


    let img=canvas.toDataURL("image/jpg");
    e.href=img;

}
//fin Guardar imagen


//pintar

let pint=document.getElementById("lapiz");
let bor=document.getElementById("goma");

pint.addEventListener("click", function(){
    pintarActivo=true;
});

bor.addEventListener("click", function(){
    pintarActivo=false;
});

canvas.addEventListener("mousedown",function(){
    click = true;
})

canvas.addEventListener("mouseup",function(){
    click = false;
    lastX = -1;
    lastY = -1;
    image1.src = canvas.toDataURL();
})

canvas.addEventListener("mousemove",function(event){
    if(click){
        if(pintarActivo){
            colorActivo = getColor();
            pintar(event);

        }else if(!pintarActivo){
                colorActivo = "#ffffff";
            pintar(event);
        }
    }
});


document.getElementById("color").addEventListener("change", function(event) {
    colorActivo = getColor();
});


function pintar(event) {

    ctx.lineWidth = 6;

    ctx.strokeStyle = colorActivo ;
    ctx.lineCap = "round";
    let x = event.layerX - 10;
    let y = event.layerY;

    ctx.beginPath();
    if(lastX != -1){
        ctx.moveTo(lastX, lastY);
    }else{
        ctx.moveTo(x,y);
    }
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
}


//fin pintar

function setPixel(imageData, x, y, r, g, b, a){
    let index = (x + y * imageData.width) * 4;
    imageData.data[index] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

function getRed(imageData, x, y){
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
}

function getGreen(imageData, x, y){
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
}

function getBlue(imageData, x, y){
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
}


//-------------------pasaje de exa a rgba-----------------
function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){

        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}
function getColor(){
    return hexToRgbA(document.getElementById('color').value)
}
//fin

