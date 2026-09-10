// "Hazme una funcion para mi sitio web de cafe que reciba la cantidad de tazas que un
//  cliente quiere reservar y me diga si puede reservar o no.La regla es que no se 
// puede reservar mas de 2 tazas por persona"
//Inteligencia Artificial

 function puedeReservar(tazas, personas) {
    const maximoTazas = personas * 2;

    if (tazas <= maximoTazas) {
        return "¡Reserva confirmada! ☕💕";
    } else {
        return "No puedes reservar tantas tazas. Máximo 2 por persona.";
    }
}

// Ejemplos
console.log(puedeReservar(4, 2)); // ¡Reserva confirmada! ☕💕
console.log(puedeReservar(5, 2)); // No puedes reservar tantas tazas..

//Esta funcion va a recibir su parametro desde el value de un input HTML, asi que 
//va a llegar como texto, nesecito que valide todos los casos posibles; que el campo no este vacio
//que lo que llego sea un numero, que sea mayor a 0 y que sea menor o igual a 2.

function puedeReservar(valor) {
         if (valor.trim() === "") { 
            return false; 
        } 
        const cantidad = Number(valor); 
        if (isNaN(cantidad)) { 
            return false;
         } 
         if (cantidad <= 0) { 
            return false; 
        } 
        if (cantidad > 2) {
             return false;
             } 
             return true; 
            }
