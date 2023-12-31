//Variables:

const catalogo = async () => {
  try {
    const respuesta = await fetch("data/productos.json");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
  }
};

const plantillaProducto = ({ imagen, nombre, precio, descripcion }) => {
  const producto = document.createElement("li");
  const img = document.createElement("img");
  img.src = imagen;
  producto.appendChild(img);
  producto.innerHTML += `<h2> ${nombre}</h2><p>${precio}</p><p>${descripcion}</p>`;
};

const mostrarProductos = (productos) => productos.forEach((producto) => plantillaProducto(producto));

catalogo()
  .then((productos) => {
    mostrarProductos(productos);
  })
  .catch((error) => console.error(error));

document.addEventListener("DOMContentLoaded", () => {
  const productosContainer = document.querySelector("ul");

  // Cargar productos desde el archivo JSON
  fetch("data/productos.json")
    .then((response) => response.json())
    .then((productos) => {
      productos.forEach((producto, index) => {
        // Crear un elemento <li> para cada producto
        const li = document.createElement("li");

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;
        li.appendChild(nombre);

        const marca = document.createElement("h3");
        marca.textContent = producto.marca;
        li.appendChild(marca);

        // Crear la imagen
        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;
        li.appendChild(img);

        // Crear el título del producto
        const h3 = document.createElement("h3");
        h3.textContent = "$" + producto.precio.toLocaleString("es-AR");
        li.appendChild(h3);

        const agregarAlCarrito = document.createElement("button");
        agregarAlCarrito.textContent = "Agregar al Carrito";
        agregarAlCarrito.classList.add("agregar");
        agregarAlCarrito.setAttribute("data-product-id", index); // Usaremos el índice del producto como ID

        // AGREGAR AL CARRITO:
        agregarAlCarrito.onclick = function agregarAlCarrito() {
        
          const productoCopia = { ...producto };

          // Agrega la copia al carrito
          carrito.push(productoCopia);
          actualizarContadorCarrito()
          guardarCarritoEnLocalStorage()

          alert(productoCopia.nombre + " agregado al carrito");

          const carritoMostrar = [];

          carrito.forEach((producto) => {
            carritoMostrar.push(producto.nombre);
          });

          const olCarrito = document.getElementsByClassName("olCarrito")[0]; // Obtén el primer elemento de la colección

          if (olCarrito) {
            carritoMostrar.forEach((nombre) => {
              const li = document.createElement("li");
              li.textContent = nombre;
              olCarrito.appendChild(li);
            });
          }
        };
        li.appendChild(agregarAlCarrito);

        // Crear el botón "Ver más"
        const verMasBtn = document.createElement("button");
        verMasBtn.textContent = "Ver mas...";
        verMasBtn.setAttribute("data-product-id", index); // Usaremos el índice del producto como ID
        verMasBtn.classList.add("ver-mas");
        verMasBtn.onclick= () =>{
          verMas(producto)
        }
        li.appendChild(verMasBtn);

        // Agregar el <li> al contenedor de productos
        productosContainer.appendChild(li);
      });
    })
    .catch((error) => console.error(error));




});



function verMas(producto) {
  const productoAMostrar = document.querySelector(".detalleOculto");
  
  // Limpia el contenido previo del elemento
  productoAMostrar.innerHTML = '';
  
  // Crea elementos para mostrar la información del producto
  const nombreElement = document.createElement('h2');
  nombreElement.textContent = producto.nombre;
  nombreElement.classList = "nombreDetalle"

  productoAMostrar.display = "flex";  

  const botonCerrar = document.createElement("button")
  botonCerrar.textContent = "X";
  botonCerrar.classList = "botonCerrar"
  botonCerrar.onclick = () =>{
    const productoAMostrar = document.querySelector(".detalleOculto");
  productoAMostrar.style.display = "none";
  }


  const precioElement = document.createElement('p');
  precioElement.textContent = `$${producto.precio}`;
  precioElement.classList = "precioDetalle"

  const imagenElement = document.createElement('img');
  imagenElement.src = producto.imagen;
  imagenElement.classList = "imagenDetalle"
  imagenElement.alt = producto.nombre;

  const descripcionElement = document.createElement('p');
  descripcionElement.textContent = producto.descripcion;
  descripcionElement.classList = "descripcionDetalle"

  const botonAgregar = document.createElement("button");
  botonAgregar.textContent = "Agregar al carrito";
  botonAgregar.classList = "agregarDetalle"
  botonAgregar.onclick = function agregarAlCarrito() {
    const carritoDOM = document.getElementsByClassName("carritoOculto");
    for (let i = 0; i < carritoDOM.length; i++) {
      carritoDOM[i].style.display = "none";
    }
    // Haz una copia del producto
    const productoCopia = { ...producto };

    // Agrega la copia al carrito
    carrito.push(productoCopia);
    actualizarContadorCarrito()

    alert(productoCopia.nombre + " agregado al carrito");

    const carritoMostrar = [];

    carrito.forEach((producto) => {
      carritoMostrar.push(producto.nombre);
    });

    const olCarrito = document.getElementsByClassName("olCarrito")[0]; // Obtén el primer elemento de la colección

    if (olCarrito) {
      carritoMostrar.forEach((nombre) => {
        const li = document.createElement("li");
        li.textContent = nombre;
        olCarrito.appendChild(li);
      });
    }
  };
  

  // Agrega los elementos al elemento con clase "detalleOculto"
  productoAMostrar.appendChild(nombreElement);
  productoAMostrar.appendChild(precioElement);
  productoAMostrar.appendChild(imagenElement);
  productoAMostrar.appendChild(descripcionElement);
  productoAMostrar.appendChild(botonCerrar)
  productoAMostrar.appendChild(botonAgregar)
  // Muestra el elemento con la información del producto
  productoAMostrar.style.display = 'block';
}

