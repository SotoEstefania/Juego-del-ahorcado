function clase(str){
    return document.querySelector(str);
}

var palabras = [["argentina", "Su bandera tiene un sol"], ["bahamas","Islas caribeñas"], ["brasil", "Un país grande"], ["canada", "Su animal oficial es el castor"], ["dinamarca", "Se conecta con Suecia por un puente"], ["ecuador", "País sudamericano"], ["filipinas", "Su capital es Manila"], ["finlandia","Europa del Norte"], ["grecia", "La cuna de los filósofos"], ["guatemala","País centroamericano"], ["honduras", "Tiene costa en el mar Caribe"], ["irlanda", "Se lo apoda 'Isla Esmeralda'"], ["islandia","Isla cerca de Groenlandia"], ["jamaica", "Es una isla caribeña"], ["kazajistan", "Limita con China y Rusia"], ["luxemburgo", "Un país europeo muy pequeño"], ["madagascar","Famosa avenida de los Baobabs"], ["mauritania", "Se encuentra en África occidental"], ["mongolia","Su capital es Ulan Bator"], ["myanmar","También llamada Birmania"], ["nicaragua", "Un país centroamericano"], ["portugal", "Se encuentra en la Península Ibérica"], ["rumania", "Tiene muchas historias sobre vampiros"], ["sudafrica", "País africano"], ["taiwan","Isla al este de China"], ["turquia", "Un atractivo turístico son los globos aerostáticos en Capadocia"], ["uganda", "Abarca las montañas Rwenzori"], ["venezuela", "Parque Nacional de la Sierra Nevada"],["yemen", "Limita con Arabia Saudita"], ["zimbabue","Comparte las Cataratas Victoria con otro país"]];
// Palabra a averiguar
var palabra = "";
var guion;
//Imagenes
var imagenGlobos = clase('.imagen-globos');
var imagenAhorcado= clase('.imagen-ahorcado');
// Num aleatorio
var random;
// Elemento html de la palabra
var parrafoPalabra = clase(".parrafo-palabra");
// Contador de intentos
var intentos = clase('.intentos');
var conteoAciertos = 0;
var conteoErrores = 6;
// Boton de reset
const nuevojuego = clase(".nuevo-juego");
// Botones inicar, agragar, pista y desistir
const btnIniciar = clase(".btn-iniciar");
const btnInicioAgregar = clase(".btn-inicio-agregar");
const btnPista = clase('.btn-pista');
const btnDesistir = clase('.desistir');
// Abecedario
const letrasAbecedario = document.querySelectorAll('#btn-letra');
var boton;
var letra;
var intentosFin = clase('.intentos-finjuego');
var spanPista = clase('.span-pista');
// Secciones
const sectionIniciar = clase('.section-iniciar');
const sectionJuegoAhorcado = clase('.section-juego-ahorcado');
const sectionAgregar = clase('.section-agregar-palabra');
const divAhorcado = clase('.div-imagen-ahrcado');
const divGlobos = clase('.div-imagen-globos');
const toggle = document.getElementById('toggle');
var inputAgregarPalabra = clase('.input-agregar-palabra');
var inputAgregarPista = clase('.input-agregar-pista');
var descripcionAgregar = clase('.descripcion-agregar-palabra');
const btnAgregarJugar = clase('.btn-agregar-jugar');
const btnCancelar = clase('.btn-cancelar');




//Para que funcione el switch de imagenes
toggle.onclick = function(){
    toggle.classList.toggle('active');
}

//Seccion agregar palabra
function SectionAgregarPalabra(){
    btnAgregarJugar.disabled='true';
    sectionIniciar.style.display='none';
    sectionAgregar.style.display='flex';
    inputAgregarPalabra.value='';
    inputAgregarPista.value='';
}

function esValido(c) {
    c = c.charCodeAt(0);
    return (c >= 97 && c <= 122) || (c >=65 && c <=90);
}
function validarEntrada(cadena) {
    for (var i = 0; i < cadena.length; i++) {
    if (!esValido(cadena[i])) {
        break;
        }
    }
    return i == cadena.length;
}   
function validarInput(elem) {
    var txt = elem.value;
    if (!validarEntrada(txt)||inputAgregarPalabra.value=="") {
        elem.classList.add('invalido');
        btnAgregarJugar.disabled=true;
        descripcionAgregar.textContent='Máximo 10 caracteres. Sólo letras.';
        } else {
        elem.classList.remove('invalido');
        btnAgregarJugar.disabled=false;        
    }
}

function agregarJugar(){
    palabras.push([inputAgregarPalabra.value,inputAgregarPista.value]);
    if(toggle.classList.contains("active")){
        iniciarJuegoAhorcado();
    }else{
        iniciarJuegoGlobos();
    }
    palabraAzar();
}

function cancelar(){
    sectionIniciar.style.display='flex';
    sectionAgregar.style.display='none';
    inputAgregarPalabra.value='';
    inputAgregarPista.value='';
    inputAgregarPalabra.classList.remove('invalido');
    descripcionAgregar.textContent='Las palabras que agregues se eliminarán cuando actualices la pgina.';
}

btnInicioAgregar.onclick= SectionAgregarPalabra;
btnAgregarJugar.onclick = agregarJugar;
btnCancelar.onclick = cancelar;

// Iniciar juego
btnIniciar.onclick = function(){
    if(toggle.classList.contains("active")){
        iniciarJuegoAhorcado();
    }else{
        iniciarJuegoGlobos();
    }
    palabraAzar();   
}

function iniciarJuegoAhorcado(){

    sectionIniciar.style.display='none';
    sectionAgregar.style.display='none';
    sectionJuegoAhorcado.style.display='flex';
    divAhorcado.style.display='flex';
    divGlobos.style.display='none'
    toggle.style.display='none';
}

function iniciarJuegoGlobos(){

    sectionIniciar.style.display='none';
    sectionAgregar.style.display='none';
    sectionJuegoAhorcado.style.display='flex';
    divAhorcado.style.display='none';
    divGlobos.style.display='flex'
    toggle.style.display='none';
}

//Generar palabra al azar
function palabraAzar(){
    imagenAhorcado.src='img/Ahorcado6.png';
    imagenGlobos.src='img/Globos6.png';
    conteoAciertos=0;
    conteoErrores=6;
    spanPista.innerHTML='';
    btnPista.disabled=false;
    intentosFin.innerHTML=('Intentos restantes: '+ conteoErrores);
    for(i=0;i<letrasAbecedario.length;i++){
        letrasAbecedario[i].disabled=false;
    }
    parrafoPalabra.textContent='';
    random = Math.floor(Math.random()*palabras.length);
    palabra = palabras[random][0].toUpperCase();
    for(i=0;i<palabra.length; i++){
        let espacio = document.createElement('span');
        guion=document.createTextNode('_');
        espacio.appendChild(guion);
        parrafoPalabra.appendChild(espacio);
    } 
   
    spanPista.innerHTML = palabras[random][1];
    spanPista.style.visibility='hidden';
    console.log(palabras.indexOf(palabras[[random][0]]));
    console.log(palabra);
    console.log(palabras);
    console.log(palabras.indexOf(palabras[random]));
    palabras.splice(palabras.indexOf(palabras[random]),1); 
}

nuevojuego.onclick=palabraAzar;

//Dar pista y dehabilitar boton pista
 btnPista.onclick=darPista;
 function darPista(){
    spanPista.style.visibility='visible';
    btnPista.disabled=true;
}

//Funcion al hacer click en letras
for(i=0;i<letrasAbecedario.length;i++){
    letrasAbecedario[i].addEventListener('click', clickLetras);
}
function clickLetras(event){
    const guiones = document.querySelectorAll('.parrafo-palabra span');
    boton = event.target;
    boton.disabled=true;
    letra=boton.innerHTML.toUpperCase();
    let acierto = false;
    for(i=0;i<palabra.length;i++){
        if(letra==palabra[i]){
            acierto=true;
            guiones[i].innerHTML=letra;
            conteoAciertos++;
        }
    }
    if(acierto==false){
        conteoErrores--;
        var Asource = `img/Ahorcado${conteoErrores}.png`;
        imagenAhorcado.src = Asource;
        var Gsource = `img/Globos${conteoErrores}.png`;
        imagenGlobos.src = Gsource;
        intentosFin.innerHTML=('Intentos restantes: '+ conteoErrores);
    }
    
    if(conteoErrores==0){
        intentosFin.innerHTML=('Fin del juego! La palabra era:');
        parrafoPalabra.innerHTML=(palabra);
        gameOver();
    }else if(conteoAciertos==palabra.length){
        intentosFin.innerHTML=('Felicitaciones, ganaste!');
        imagenGlobos.src='img/Globoswin.png';
        gameOver();
    }
}



//Termino el juego, deshabilitar letras
function gameOver(){
    for(i=0;i<letrasAbecedario.length;i++){
        letrasAbecedario[i].disabled=true;
    }
    btnPista.disabled=true;
    spanPista.innerHTML='';
}


// Desistir y volver al inicio
btnDesistir.onclick= desistir;
function desistir(){
    sectionIniciar.style.display='flex';
    sectionAgregar.style.display='none';
    sectionJuegoAhorcado.style.display='none';
    toggle.style.display='flex';
    conteoErrores=6;
}
