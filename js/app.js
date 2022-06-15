//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event listners

eventListeners();
function eventListeners(){
    formulario.addEventListener('submit',agregarTweet);
    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}



//Functions
function agregarTweet(e){
    e.preventDefault();
    // Text area
    const tweet = document.querySelector('#tweet').value;
    if(tweet === ''){
        mostrarError('El mensaje no puede ir vacio');
        return;
    }
    // Agregar al array de tweets
    const tweetObj = {
        id: Date.now(),
        tweet
    };
    tweets = [...tweets, tweetObj];
    
    //Crear HTML
    crearHTML();
    //reset form
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    
    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function  crearHTML(){
    //Limpiar HTML
    limpiarHTML();
    //Muestra listado de tweets
    if (tweets.length >0){
        tweets.forEach( tweet => {
            //Boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            //Funcion de eliminar
            btnEliminar.onclick = () => borrarTweet(tweet.id);

            //crear el html de cada mensage
            const li =document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);

            //Insertar en el HTML
            listaTweets.appendChild(li);
        })
    }

    syncStorage();
}

function borrarTweet (id){
    //Eliminar un tweet
    tweets = tweets.filter( tweet => tweet.id !== id );
    crearHTML();
}

function syncStorage(){
    //Agrega los textos a local storage
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function limpiarHTML(){
    //Limpiar HTML
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}