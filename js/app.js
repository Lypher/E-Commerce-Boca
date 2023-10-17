const carrito = []

const catalogo = async () => {
    try {
        const respuesta = await fetch("data/productos.json")
        return await respuesta.json()
    } catch (error) {
        console.error(error)
    }
}

 const verDetalle =(evento) =>{
    console.log(evento.target)
 }

 const plantillaProducto = ({imagen,nombre,precio,descripcion}) => {
     const producto = document.createElement("li")
     const img = document.createElement("img")
     img.src= imagen
     producto.appendChild(img)
     producto.innerHTML += `<h2> ${nombre}</h2><p>${precio}</p><p>${descripcion}</p>`
     producto.addEventListener("click",verDetalle)
    // document.querySelector("#productos").appendChild(producto)
 }


const mostrarProductos = productos => productos.forEach(producto => plantillaProducto (producto));

 catalogo().then(productos => {
     mostrarProductos (productos)
 }).catch(error => console.error(error));


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
          li.appendChild(nombre)

          const marca = document.createElement("h3");
          marca.textContent = producto.marca;
          li.appendChild(marca)

          // Crear la imagen
          const img = document.createElement("img");
          img.src = producto.imagen;
          img.alt = producto.nombre;
          li.appendChild(img);

          // Crear el título del producto
          const h3 = document.createElement("h3");
                   h3.textContent = "$" + producto.precio.toLocaleString('es-AR');
          li.appendChild(h3);

          const agregarAlCarrito = document.createElement("button")
          agregarAlCarrito.textContent = "Agregar al Carrito"
          agregarAlCarrito.classList.add("agregar");
          agregarAlCarrito.setAttribute("data-product-id", index); // Usaremos el índice del producto como ID

          //AGREGAR AL CARRITO:
          agregarAlCarrito.onclick = function agregarAlCarrito() {
            
            const carritoDOM = document.getElementsByClassName("carritoOculto");
            for (let i = 0; i < carritoDOM.length; i++) {
            carritoDOM[i].style.display = "none"}
            // Haz una copia del producto
            const productoCopia = { ...producto };
        
            // Agrega la copia al carrito
            carrito.push(productoCopia);
        
            alert(productoCopia.nombre + " agregado al carrito");
        
            const carritoMostrar = []
        
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
        }
          li.appendChild(agregarAlCarrito);
          

          // Crear el botón "Ver más"
          const verMasBtn = document.createElement("button");
          verMasBtn.textContent = "Ver mas...";
          verMasBtn.setAttribute("data-product-id", index); // Usaremos el índice del producto como ID
          verMasBtn.classList.add("ver-mas");
          li.appendChild(verMasBtn);

          // Agregar el <li> al contenedor de productos
          productosContainer.appendChild(li);
        });
      })
      .catch((error) => console.error(error));
    
    // Agregar un manejador de eventos para los botones "Ver más"
    productosContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("ver-mas")) {
        const productId = event.target.getAttribute("data-product-id");
        mostrarDescripcion(productId);
      }
    });
    
    // Función para mostrar la descripción del producto
    function mostrarDescripcion(productId) {
      fetch("data/productos.json")
        .then((response) => response.json())
        .then((productos) => {
          const producto = productos[productId];
          if (producto) {
            alert(producto.descripcion); // Cambia esto por la forma en que deseas mostrar la descripción
          } else {
            console.log("Producto no encontrado.");
          }
        })
        .catch((error) => console.error(error));
    }
  });

  function MostrarCarrito() {
    console.log("MostrarCarrito() llamada");

    const carritoDOM = document.getElementsByClassName("carritoOculto");
    for (let i = 0; i < carritoDOM.length; i++) {
        if (carritoDOM[i].style.display === "none" || carritoDOM[i].style.display === "") {
            carritoDOM[i].style.display = "flex";
        } else {
            carritoDOM[i].style.display = "none";
        }
    }

    const olCarrito = document.getElementsByClassName("olCarrito")[0]; // Obtén el primer elemento de la colección

    // Borra el contenido existente de olCarrito
    olCarrito.innerHTML = '';

    const carritoMostrar = [];
    let precioTotal = 0; // Inicializa el precio total en 0

    carrito.forEach((producto) => {
        carritoMostrar.push({nombre: producto.nombre, precio: producto.precio});
        precioTotal += producto.precio; // Agrega el precio del producto al precio total
    });

    if (carritoMostrar.length === 0) {
        // Si el carrito está vacío, muestra un mensaje "Carrito vacío"
        const parrafoVacio = document.createElement("p");
        parrafoVacio.textContent = "(Carrito vacío)";
        olCarrito.appendChild(parrafoVacio);
    } else {
        // Si el carrito no está vacío, muestra los elementos del carrito
        carritoMostrar.forEach((nombre) => {
            const li = document.createElement("li");
            li.textContent =  `${nombre.nombre} ($${nombre.precio})`;
            olCarrito.appendChild(li);
        });

        // Muestra el precio total
        const liPrecioTotal = document.createElement("li");
        liPrecioTotal.textContent = `Precio Total: $${precioTotal}`;
        liPrecioTotal.className = "preciototal"
        olCarrito.appendChild(liPrecioTotal);

        const botonComprar = document.createElement("button")
        botonComprar.textContent = "Finalizar Compra"
        botonComprar.className = "finalizarCompra"
        botonComprar.onclick = finalizarCompra = () =>{
          alert("Compra Realizada con exito!")
          location.reload()
        }
        olCarrito.appendChild(botonComprar)
    }
}


