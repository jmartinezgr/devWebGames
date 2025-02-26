function moveNoButton() {
    let noButton = document.getElementById('no');
    let yesButton = document.getElementById('yes');

    let noWidth = noButton.offsetWidth;
    let noHeight = noButton.offsetHeight;
    let yesRect = yesButton.getBoundingClientRect(); 

    let x, y;
    let isOverlapping;

    do {
        // Generar nueva posición aleatoria
        x = Math.random() * (window.innerWidth - noWidth);
        y = Math.random() * (window.innerHeight - noHeight);

        // Verificar si hay solapamiento con el botón "Sí"
        if(
            x + noWidth < yesRect.left || 
            x > yesRect.right ||          
            y + noHeight < yesRect.top || 
            y > yesRect.bottom            
        ) {
            isOverlapping = false;
        }else{
            console.log("Se solapa");
        }

    } while (isOverlapping); 

    // Aplicar la nueva posición
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
}

document.getElementById('no').addEventListener('mouseover', function () {
    let noButton = document.getElementById('no');
    

    if (window.getComputedStyle(noButton).display !== "flex") {
        noButton.style.display = "flex";
        noButton.style.justifyContent = "center";
        noButton.style.alignItems = "center";
    }
});

function acceptLove() {
    alert('¡Sabía que dirías que sí! 💖😍');

    let msg = document.getElementById('msg');
    let noButton = document.getElementById('no');
    let yesButton = document.getElementById('yes');
    let container = document.getElementsByClassName('container')[0]; 

    // Reemplazar la clase 'container' con 'containerFinal'
    container.classList.replace('container', 'containerFinal');

    // Ocultar botones
    noButton.style.display = 'none';
    yesButton.style.display = 'none';

    // Cambiar mensaje
    msg.innerHTML = '¡Gracias por aceptar! 😍';
}
