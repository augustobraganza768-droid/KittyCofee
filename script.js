
/* =====================================================
   KITTYCOFEE ☕🎀
   CARRITO DE COMPRAS + SISTEMA DE RESERVAS
===================================================== */


/* =====================================================
   VARIABLES DEL CARRITO
===================================================== */

let carrito = [];


/* =====================================================
   ELEMENTOS DEL HTML
===================================================== */

const botonesAgregar = document.querySelectorAll(".boton-agregar");

const productosCarrito = document.querySelector("#productos-carrito");

const contadorCarrito = document.querySelector("#contador-carrito");

const cantidadProductos = document.querySelector("#cantidad-productos");

const totalCarrito = document.querySelector("#total-carrito");

const carritoVacio = document.querySelector("#carrito-vacio");

const botonVaciarCarrito = document.querySelector("#vaciar-carrito");

const botonFinalizarCompra = document.querySelector("#finalizar-compra");


/* =====================================================
   AGREGAR PRODUCTOS AL CARRITO
===================================================== */

botonesAgregar.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const nombre = boton.dataset.producto;
        const precio = Number(boton.dataset.precio);

        const productoExistente = carrito.find(function (producto) {

            return producto.nombre === nombre;

        });


        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });

        }


        actualizarCarrito();


        Swal.fire({
            title: "¡Agregado! ☕🎀",
            text: `${nombre} fue agregado a tu carrito.`,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#9046cf"
        });

    });

});


/* =====================================================
   ACTUALIZAR CARRITO
===================================================== */

function actualizarCarrito() {

    productosCarrito.innerHTML = "";


    /* ---------------------------------------------
       SI EL CARRITO ESTÁ VACÍO
    --------------------------------------------- */

    if (carrito.length === 0) {

        productosCarrito.innerHTML = `
            <p id="carrito-vacio">
                Tu carrito está vacío. 💗
            </p>
        `;

        contadorCarrito.textContent = "0";

        cantidadProductos.textContent = "0";

        totalCarrito.textContent = "0";

        return;
    }


    /* ---------------------------------------------
       VARIABLES PARA EL TOTAL
    --------------------------------------------- */

    let total = 0;
    let cantidadTotal = 0;


    /* ---------------------------------------------
       MOSTRAR CADA PRODUCTO
    --------------------------------------------- */

    carrito.forEach(function (producto, indice) {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        cantidadTotal += producto.cantidad;


        const item = document.createElement("div");

        item.classList.add("item-carrito");


        item.innerHTML = `

            <div>

                <h3>${producto.nombre}</h3>

                <p>
                    Precio: $${producto.precio}
                </p>

                <p>
                    Cantidad:
                    <strong>${producto.cantidad}</strong>
                </p>

                <p>
                    Subtotal:
                    <strong>$${subtotal}</strong>
                </p>

            </div>


            <div>

                <button
                    class="boton-disminuir"
                    data-indice="${indice}">
                    ➖
                </button>


                <button
                    class="boton-aumentar"
                    data-indice="${indice}">
                    ➕
                </button>


                <button
                    class="boton-eliminar"
                    data-indice="${indice}">
                    🗑️ Eliminar
                </button>

            </div>

        `;


        productosCarrito.appendChild(item);

    });


    /* ---------------------------------------------
       ACTUALIZAR INFORMACIÓN
    --------------------------------------------- */

    contadorCarrito.textContent = cantidadTotal;

    cantidadProductos.textContent = cantidadTotal;

    totalCarrito.textContent = total;


    /* ---------------------------------------------
       ACTIVAR BOTONES DEL CARRITO
    --------------------------------------------- */

    activarBotonesCarrito();

}


/* =====================================================
   BOTONES + / - / ELIMINAR
===================================================== */

function activarBotonesCarrito() {

    const botonesAumentar =
        document.querySelectorAll(".boton-aumentar");


    const botonesDisminuir =
        document.querySelectorAll(".boton-disminuir");


    const botonesEliminar =
        document.querySelectorAll(".boton-eliminar");


    /* ---------------------------------------------
       AUMENTAR CANTIDAD
    --------------------------------------------- */

    botonesAumentar.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const indice = Number(boton.dataset.indice);

            carrito[indice].cantidad++;

            actualizarCarrito();

        });

    });


    /* ---------------------------------------------
       DISMINUIR CANTIDAD
    --------------------------------------------- */

    botonesDisminuir.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const indice = Number(boton.dataset.indice);

            carrito[indice].cantidad--;


            if (carrito[indice].cantidad <= 0) {

                carrito.splice(indice, 1);

            }


            actualizarCarrito();

        });

    });


    /* ---------------------------------------------
       ELIMINAR PRODUCTO
    --------------------------------------------- */

    botonesEliminar.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const indice = Number(boton.dataset.indice);

            carrito.splice(indice, 1);

            actualizarCarrito();

        });

    });

}


/* =====================================================
   VACIAR CARRITO
===================================================== */

botonVaciarCarrito.addEventListener("click", function () {

    if (carrito.length === 0) {

        Swal.fire({
            title: "Carrito vacío 🛒",
            text: "No tienes productos para eliminar.",
            icon: "info",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#9046cf"
        });

        return;
    }


    Swal.fire({

        title: "¿Vaciar carrito? 🛒",

        text: "Se eliminarán todos los productos.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Sí, vaciar",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#9046cf",

        cancelButtonColor: "#f26a8d"

    }).then(function (resultado) {

        if (resultado.isConfirmed) {

            carrito = [];

            actualizarCarrito();


            Swal.fire({

                title: "Carrito vacío 💗",

                text: "Todos los productos fueron eliminados.",

                icon: "success",

                confirmButtonText: "Aceptar",

                confirmButtonColor: "#9046cf"

            });

        }

    });

});


/* =====================================================
   FINALIZAR COMPRA
===================================================== */

botonFinalizarCompra.addEventListener("click", function () {

    if (carrito.length === 0) {

        Swal.fire({

            title: "Tu carrito está vacío 🛒",

            text: "Agrega una bebida antes de finalizar la compra.",

            icon: "info",

            confirmButtonText: "Ver bebidas",

            confirmButtonColor: "#9046cf"

        });

        return;
    }


    const total = totalCarrito.textContent;


    Swal.fire({

        title: "¡Compra preparada! ☕🎀",

        text: `El total de tu pedido es $${total}. ¡Gracias por elegir KittyCofee!`,

        icon: "success",

        confirmButtonText: "Aceptar",

        confirmButtonColor: "#9046cf"

    });

});


/* =====================================================
   SISTEMA DE RESERVAS
===================================================== */

const formularioReserva =
    document.querySelector("#formulario-reserva");

const cantidadReserva =
    document.querySelector("#cantidad");

const botonReservar =
    document.querySelector("#boton-reservar");

const contadorTazas =
    document.querySelector("#contador-tazas");

const respuestaReserva =
    document.querySelector("#respuesta-reserva");


/* =====================================================
   FUNCIÓN PARA VALIDAR RESERVA
===================================================== */

function puedeReservar(tazas) {

    const cantidad = Number(tazas);

    const tazasDisponibles =
        Number(contadorTazas.textContent);


    /* Campo vacío */

    if (tazas === "") {

        return {
            valido: false,
            mensaje: "Debes ingresar una cantidad."
        };

    }


    /* No es un número */

    if (isNaN(cantidad)) {

        return {
            valido: false,
            mensaje: "Debes ingresar un número válido."
        };

    }


    /* Menor o igual a cero */

    if (cantidad <= 0) {

        return {
            valido: false,
            mensaje: "La cantidad debe ser mayor a 0."
        };

    }


    /* Máximo 2 tazas */

    if (cantidad > 2) {

        return {
            valido: false,
            mensaje: "Puedes reservar un máximo de 2 tazas por persona."
        };

    }


    /* No hay suficientes tazas */

    if (cantidad > tazasDisponibles) {

        return {
            valido: false,
            mensaje: `Solo quedan ${tazasDisponibles} tazas disponibles.`
        };

    }


    return {
        valido: true,
        cantidad: cantidad
    };

}


/* =====================================================
   EVENTO DEL FORMULARIO DE RESERVA
===================================================== */

formularioReserva.addEventListener("submit", function (evento) {

    evento.preventDefault();


    const resultado =
        puedeReservar(cantidadReserva.value);


    /* ---------------------------------------------
       RESERVA NO VÁLIDA
    --------------------------------------------- */

    if (!resultado.valido) {

        Swal.fire({

            title: "Reserva no disponible 💗",

            text: resultado.mensaje,

            icon: "error",

            confirmButtonText: "Intentar nuevamente",

            confirmButtonColor: "#9046cf"

        });

        return;
    }


    /* ---------------------------------------------
       CALCULAR TAZAS RESTANTES
    --------------------------------------------- */

    const tazasActuales =
        Number(contadorTazas.textContent);


    const nuevasTazas =
        tazasActuales - resultado.cantidad;


    contadorTazas.textContent = nuevasTazas;


    /* ---------------------------------------------
       RESPUESTA VISUAL
    --------------------------------------------- */

    respuestaReserva.textContent =
        `¡Reserva confirmada! ☕🎀 Reservaste ${resultado.cantidad} taza${resultado.cantidad > 1 ? "s" : ""}.`;


    /* ---------------------------------------------
       SWEETALERT
    --------------------------------------------- */

    Swal.fire({

        title: "¡Reserva exitosa! ☕🎀",

        text:
            `Reservaste ${resultado.cantidad} taza${resultado.cantidad > 1 ? "s" : ""}. ¡Te esperamos en KittyCofee!`,

        icon: "success",

        confirmButtonText: "¡Perfecto!",

        confirmButtonColor: "#9046cf"

    });


    /* ---------------------------------------------
       LIMPIAR FORMULARIO
    --------------------------------------------- */

    formularioReserva.reset();


    /* ---------------------------------------------
       SI NO QUEDAN TAZAS
    --------------------------------------------- */

    if (nuevasTazas === 0) {

        botonReservar.textContent =
            "Sin cupos";

        botonReservar.disabled = true;

        cantidadReserva.disabled = true;


        respuestaReserva.textContent =
            "¡Se agotaron las tazas disponibles para hoy! ☕💗";

    }

});


/* =====================================================
   INICIALIZAR CARRITO
===================================================== */

actualizarCarrito();
