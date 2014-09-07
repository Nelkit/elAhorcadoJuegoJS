var lienzo;

var palabras = [
    'camino','españa','uva', 'jose'
]

var Tablero = function(con, img, x, y)
{
    this.contexto = con;
    this.intentos = 0;
    this.maximo = 5;
    this.imagenURL = img;
    this.imagenOK = false;
    this.imagen = new Image();
    this.imagen.src = this.imagenURL;
    this.imagen.onload = this.confirmarFondo();
    this.x = x;
    this.y = y;
}

Tablero.prototype.confirmarFondo = function()
{
    this.imagenOK = true;
}

Tablero.prototype.dibujar = function()
{
    this.contexto.drawImage(this.imagen,this.x,this.y);
}

var Texto = function(cont, text, x, y, color)
{
    this.contexto = cont;
    this.contexto.font ="3em Georgia";
    this.contexto.fillStyle = "#8b4f11";
    this.texto = text;
    this.x = x;
    this.y = y;
}

Texto.prototype.dibujar = function ()
{
    this.contexto.fillText(this.texto,this.x,this.y);
}

function iniciar()
{
    var aleatorioNum = getRandom(0, 4);

    var canvas = document.getElementById("lienzo");
    canvas.width = 694;
    canvas.height = 490;

    var contexto = canvas.getContext("2d");
    lienzo = new Tablero(contexto,"fondo.png",0,0);
    cabeza = new Tablero(contexto,"cabeza-normal.png",150,110);
    poste = new Tablero(contexto,"poste.png",0,104);
    torso = new Tablero(contexto,"torso.png",157,280);
    piernas = new Tablero(contexto,"piernas.png",141,335);
    brazos = new Tablero(contexto,"brazos.png",141,285);
    camposPalabra = new Texto(contexto,seleccionaPalabraAdiv(aleatorioNum), 350,450);

    mostrarBtn();

    var inputLetra = document.getElementById("letra");
    var boton = document.getElementById("btn-aceptar");
    var correctas = 0;

    boton.addEventListener('click', function () {
        var numTamano = palabras[aleatorioNum].length;
        var palabraFormar = '';
        var bien = 0;

        for (var i = 0; i <= numTamano; i++) {
            var letraPalabra = palabras[aleatorioNum].charAt(i);
            var palabraIngresada = inputLetra.value;


            if(letraPalabra == palabraIngresada){
                palabraFormar = palabraFormar.concat(letraPalabra+' ');
                bien=bien+1;
            }else{
                palabraFormar = palabraFormar.concat('    ');
            }
        };

        if (bien==0)
        {
            lienzo.intentos = lienzo.intentos+1;
            if (lienzo.intentos>0)
            {
                poste.dibujar();
                if(lienzo.intentos>1)
                {
                    cabeza.dibujar();
                    if(lienzo.intentos>2)
                    {
                        torso.dibujar();
                        if(lienzo.intentos>3)
                        {
                            brazos.dibujar();
                            if(lienzo.intentos>4)
                            {
                                piernas.dibujar();
                                if(lienzo.intentos>5)
                                {
                                    alert("Perdiste!!!");
                                }
                            }
                        }
                    }
                }
            }
        }
        palabra = new Texto(contexto,palabraFormar,350,440);
        palabra.dibujar();

        if (bien==1) {
            correctas = correctas+1;
        };

        if (correctas==numTamano) {
            alert("Ganaste!!!");
        };
    });

}

window.onload = function() {
    lienzo.dibujar();
    camposPalabra.dibujar();

}

function seleccionaPalabraAdiv(aleatorio) {

    var numTamano = palabras[aleatorio].length;
    var palabraAdivinar = '';

    for (var i = 1; i <= numTamano; i++) {
        palabraAdivinar = palabraAdivinar.concat('_ ');
    };

    return palabraAdivinar;
}

function getRandom(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function mostrarBtn() {
    var inputLetra = document.getElementById("letra");
    var boton = document.getElementById("btn-aceptar");
    inputLetra.addEventListener('input',function() {
        if (inputLetra.value){
            boton.style.display = "inline-block";
        }else{
            boton.style.display = "none";
        }
    });
}

function procesaLetra () {
    alert("hola");
}
