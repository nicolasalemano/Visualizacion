

function greyScale(){
    btnRestaurar();
    let imageData=ctx.getImageData(0,0,620,500);
    for ( x = 0; x < canvas.width; x++) {
        for ( y = 0; y < canvas.height; y++) {
            index = (x + y * imageData.width) * 4;
            var BlackAndWhite = (getRed(imageData, x, y)+ getGreen(imageData, x , y)+ getBlue(imageData, x , y))/3;
            imageData.data[index+0]=BlackAndWhite;
            imageData.data[index+1]=BlackAndWhite;
            imageData.data[index+2]=BlackAndWhite;
            imageData.data[index+3]=255;

        }
    }
    changeImage(imageData);
}

btnGreyScale();

function btnGreyScale(){

    var escalaGris = document.getElementById("greyScale");
    escalaGris.addEventListener("click", function(){
        greyScale();
    });
}

function negativo(){
    btnRestaurar();
    let imageData=ctx.getImageData(0,0,620,500);
    for ( x = 0; x < canvas.width; x++) {
        for ( y = 0; y < canvas.height; y++) {
            index = (x + y * imageData.width) * 4;
            imageData.data[index+0]=255-getRed(imageData, x, y);
            imageData.data[index+1]=255-getGreen(imageData, x, y);
            imageData.data[index+2]=255-getBlue(imageData, x, y);
            imageData.data[index+3]=255;
        }
    }

    changeImage(imageData);

}

btnNegativo();

function btnNegativo(){
    var negative = document.getElementById("negativo");
    negative.addEventListener("click", function(){
        negativo();
    });
}

function blur(){
    let imageData=ctx.getImageData(0,0,620,500);
    var valR = 0;
    var valG = 0;
    var valB = 0;
    var arr = [1,1,1,1,1,1,1,1,1];

    for (x=0; x<imageData.width; x++){
        for (y=0; y<imageData.height; y++){
            valR = multiplicarColor(imageData,arr,getRed)/9;
            valG = multiplicarColor(imageData,arr,getGreen)/9;
            valB = multiplicarColor(imageData,arr,getBlue)/9;
            setPixel(imageData, x, y, valR,valG,valB, 255);
        }

    }
    changeImage(imageData);
    console.log("gin");
}


function multiplicarColor(imageData,arrPos,getColor){

    var valor = ( getColor(imageData,x-1,y-1)*arrPos[0] +  getColor(imageData,x-1,y)*arrPos[1] +  getColor(imageData,x-1,y+1)*arrPos[2] +
                 getColor(imageData,x,y-1)*arrPos[3] + getColor(imageData,x,y)*arrPos[4]  + getColor(imageData,x,y+1)*arrPos[5] +
                 getColor(imageData,x+1,y-1)*arrPos[6] +  getColor(imageData,x+1,y)*arrPos[7] +  getColor(imageData,x+1,y+1)*arrPos[8]);

    return valor;
}



function btmBlur(){
    let imageData=ctx.getImageData(0,0,620,500);
    var Blur = document.getElementById("blur");
    Blur.addEventListener("click", function(){
        blur();
    });
}

btmBlur();

//bordes


function  borde(){
    let imageData=ctx.getImageData(0,0,620,500);
    var valRx =0;
    var valGx =0;
    var valBx =0;
    var valRy =0;
    var valGy =0;
    var valBy =0;

    var arrH = [-1,-2,-1,0,0,0,1,2,1];
    var arrV = [-1,0,1,-2,0,2,-1,0,1];
    //HORIZONTAL  = ((-1,0,1),(-2,0,2),(-1,0,1));
    //VERTICAL   = ((-1,-2,-1),(0,0,0),(1,2,1));
    for (x=1; x<imageData.width-1; x++){
        for (y=1; y<imageData.height-1; y++){
            valRx = multiplicarColor(imageData,arrH,getRed);
            valRy = multiplicarColor(imageData,arrV,getRed);
            valGx = multiplicarColor(imageData,arrH,getGreen);
            valGy = multiplicarColor(imageData,arrV,getGreen);
            valBx = multiplicarColor(imageData,arrH,getBlue);
            valBy = multiplicarColor(imageData,arrV,getBlue);
            fila = (valRx + valGx + valBx)/3;
            columna = (valRy + valGy + valBy)/3;
            setPixel(imageData, x, y,255-(fila+columna),255-(fila+columna),255-(fila+columna), 255);
        }
    }

    ctx.putImageData(imageData,0, 0);
}


btnBorde();

function btnBorde(){

    var bor = document.getElementById("borde");
    bor.addEventListener("click", function(){
        borde();
    });
}

//bordes






function sepia(){
    btnRestaurar();
    let imageData=ctx.getImageData(0,0,620,500);
    for ( x = 0; x < canvas.width; x++) {
        for ( y = 0; y < canvas.height; y++) {
            index = (x + y * imageData.width) * 4;
            let calculoRed= (getRed(imageData, x, y) * 0.393) + (getGreen(imageData, x, y) * 0.769) + (getBlue(imageData, x, y) * 0.189)
            let calculoGreen= (getRed(imageData, x, y) * 0.349) + (getGreen(imageData, x, y) * 0.686) + (getBlue(imageData, x, y) * 0.168)
            let calculoBlue=(getRed(imageData, x, y) * 0.272) + (getGreen(imageData, x, y) * 0.534) + (getBlue(imageData, x, y) * 0.131)

            imageData.data[index+0]=calculoRed+30;
            imageData.data[index+1]=calculoGreen+25;
            imageData.data[index+2]=calculoBlue;
            imageData.data[index+3]=255;
        }
    }

    changeImage(imageData);
}

btnSepia();

function btnSepia(){
    let imageData=ctx.getImageData(0,0,620,500);
    var Sepia = document.getElementById("sepia");
    Sepia.addEventListener("click", function(){
        sepia();
    });
}

function binarizacion (){
    btnRestaurar();
    let imageData=ctx.getImageData(0,0,620,500);
    for ( x = 0; x < canvas.width; x++) {
        for ( y = 0; y < canvas.height; y++) {
            var binarizacion =110;
            var v = (0.2126 * getRed(imageData, x, y) + 0.7152 * getGreen(imageData, x, y) + 0.0722 * getBlue(imageData, x, y) >= binarizacion) ? 255 : 0;
            index = (x + y * imageData.width) * 4;
            imageData.data[index+0]=v;
            imageData.data[index+1]=v;
            imageData.data[index+2]=v;
            imageData.data[index+3]=255;
        }
    }

    changeImage(imageData);

}

function btnBinarizacion(){
    var binary = document.getElementById("binarizacion");
    binary.addEventListener("click", function(){
        binarizacion();
    });
}



btnBinarizacion();

function brillo(brightnessValue){
    let imageData=ctx.getImageData(0,0,620,500);
    for ( x = 0; x < canvas.width; x++) {
        for ( y = 0; y < canvas.height; y++) {
            index = (x + y * imageData.width) * 4;
            imageData.data[index+0]=brightnessValue*getRed(imageData, x, y);
            imageData.data[index+1]=brightnessValue*getGreen(imageData, x, y);
            imageData.data[index+2]=brightnessValue*getBlue(imageData, x, y);
            imageData.data[index+3]=255;
        }
    }

    changeImage(imageData);

}
btnBrillo();

function btnBrillo(){
    var brightness = document.getElementById("brillo");
    brightness.addEventListener("click", function(){
        var rango = document.getElementById("range");
        rango.addEventListener("change", function(){

            brillo(this.value-49.7);

        });
    });
}

function saturacion (saturationValue){
    let imageData=ctx.getImageData(0,0,620,500);
    for ( x = 0; x < canvas.width; x++) {
        for ( y = 0; y < canvas.height; y++) {
            index = (x + y * imageData.width) * 4;
            var luzRed = 0.3086;
            var luzGreen = 0.6094;
            var luzBlue = 0.0820;
            var az = (1 - saturationValue)*luzRed + saturationValue;
            var bz = (1 - saturationValue)*luzGreen;
            var cz = (1 - saturationValue)*luzBlue;
            var dz = (1 - saturationValue)*luzRed;
            var ez = (1 - saturationValue)*luzGreen + saturationValue;
            var fz = (1 - saturationValue)*luzBlue;
            var gz = (1 - saturationValue)*luzRed;
            var hz = (1 - saturationValue)*luzGreen;
            var iz = (1 - saturationValue)*luzBlue + saturationValue;
            var saturadoRed = (az * getRed(imageData, x, y) + bz * getGreen(imageData, x, y) + cz * getBlue(imageData, x, y));
            var saturadoGreen = (dz * getRed(imageData, x, y) + ez * getGreen(imageData, x, y) + fz * getBlue(imageData, x, y));
            var saturadodBlue = (gz * getRed(imageData, x, y)+ hz * getGreen(imageData, x, y) + iz * getBlue(imageData, x, y));
            imageData.data[index+0]=saturadoRed;
            imageData.data[index+1]=saturadoGreen;
            imageData.data[index+2]=saturadodBlue;
            imageData.data[index+3]=255;
        }
    }
    changeImage(imageData);
}

btnSaturacion();

function btnSaturacion(){
    var saturation = document.getElementById("saturacion");
    saturation.addEventListener("click", function(){
        var rango = document.getElementById("range");
        rango.addEventListener("change", function(){
            saturacion(this.value-49);

        });
    });
}

function contraste(contrastValue){

    let imageData=ctx.getImageData(0,0,620,500);
    for ( x = 0; x < canvas.width; x++) {
        for ( y = 0; y < canvas.height; y++) {
            var factor = (259 * (contrastValue + 255)) / (255 * (259 - contrastValue));
            index = (x + y * imageData.width) * 4;
            imageData.data[index+0]=factor*(getRed(imageData, x, y)-128)+128;
            imageData.data[index+1]=factor*(getGreen(imageData, x, y)-128)+128;
            imageData.data[index+2]=factor*(getBlue(imageData, x, y)-128)+128;
            imageData.data[index+3]=255;
        }
    }
    changeImage(imageData);
}

btnContraste();

function btnContraste(){
    let imageData=ctx.getImageData(0,0,620,500);


    let contrast = document.getElementById("contraste");
    contrast.addEventListener("click", function(){
        let rango = document.getElementById("range");
        rango.addEventListener("change", function(){

            contraste(this.value-50);

        });
    });
}