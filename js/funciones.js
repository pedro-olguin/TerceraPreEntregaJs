const cuentaNumCarrito = document.querySelector("#numCarrito");

// Toma un producto y lo agrega al carrito
function agregarAlCarrito(productoElegido) {
  //Reviso si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("productos"));
  let cantidadProductoFinal;
  //Si no hay localstorage lo creo
  if (!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(productoElegido);
    localStorage.setItem("productos", JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  } else {
    //Si hay localstorage me fijo si el producto esta
    const indiceProducto = memoria.findIndex(
      (producto) => producto.id === productoElegido.id
    );
    const nuevaMemoria = memoria;

    //Si el producto no esta en el carrito lo agrego
    if (indiceProducto === -1) {
      const nuevoProducto = getNuevoProductoParaMemoria(productoElegido);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      //Si el producto está en el carrito le agrego 1 a la cantidad.
      nuevaMemoria[indiceProducto].cantidad++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("productos", JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}
//==========================================================================================

function restarAlCarrito(productoElegido) {
  let memoria = JSON.parse(localStorage.getItem("productos"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(
    (producto) => producto.id === productoElegido.id
  );
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if (cantidadProductoFinal === 0) {
    nuevaMemoria.splice(indiceProducto, 1);
  }
  localStorage.setItem("productos", JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

//=============================================================================================================================

// le agrega la cantidad a un producto
function getNuevoProductoParaMemoria(producto) {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

//=======================================================================================================

//actualiza el numerito del carrito del header

function actualizarNumeroCarrito() {
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("productos"));
  if (memoria && memoria.length > 0) {
    cuenta = memoria.reduce((acc, n) => acc + n.cantidad, 0);
    return (cuentaNumCarrito.innerText = cuenta);
  }
  cuentaNumCarrito.innerText = 0;
}

// Reinicia el carrito
function reiniciarCarrito() {
  localStorage.removeItem("productos");
  actualizarNumeroCarrito();
  cantidadDeProductos.innerText = "-";
  precioProductos.innerText = "-";
}
actualizarNumeroCarrito();

//Comprar Carrito

function comprarCarrito() {
  const datos = JSON.parse(localStorage.getItem("formContacto"));
  Swal.fire({
    title: `${datos.nombre} Gracias por tu compra!!"`,
    text: `Nos estaremos comunicando al telefono ${datos.telefono} para gestionar el pago`,
    icon: "success",
  });

  localStorage.removeItem("formContacto");
  localStorage.removeItem("productos");
  crearTarjetasCarrito();
}
