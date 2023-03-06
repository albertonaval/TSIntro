const button = document.querySelector("button")! //El valor de button=== null porque no lo ha detectado aun, para evitar esto le ponemos un ! y eliminamos el null o introducimos el button en un condicial de true, lo que indica que solo se ejecutara si el valor del boton no es null

function clickHandler(message: string) {
    console.log('Clicked ===> ' + message)
}


//if (button) {
    button.addEventListener('click', (clickHandler.bind(null, 'Hola')))
//}