//function calcularPrecio(precioUnitario, cantidad) {
  //  const total= precioUnitario * cantidad;
    //return total;
//}
function puedeReservar(tazas) {
    return tazas > 0;
}



const botonReservar = document.querySelector("#boton-reservar");

const contadorTazas = document.querySelector("#contador-tazas");


botonReservar.addEventListener("click", function () {
const tazasActuales=Number(contadorTazas.textContent);

if (puedeReservar(tazasActuales)) {
    contadorTazas.textContent = tazasActuales - 1;

  Swal.fire({
            title: "¡Reserva exitosa!",
            text: "¡Tu taza de café ha sido reservada!",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#6716d1"
        });

}else{
    botonReservar.textContent = "Sin cupos";
    botonReservar.disabled = true;
}
});
