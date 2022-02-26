//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners () {
  // Cuando agregas un curso presionando "Agragar al carrito"
  listaCursos.addEventListener('click', agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso)

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; // Resetea,o el arreglo

    limpiaHtml();// Elimina todo en el carrito
  })
}

// Funciones
function agregarCurso (e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    
    leerDatosCurso(cursoSeleccionado);   
  }
}
// Elimina cursos del carrito
function eliminarCurso (e) {
  console.log(e.target.classList);
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute('data-id');

    // Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    
    carritoHtml();// Itera sobre el carrito y muestra su html
  }
}

// Lee el contenido del html al que le di click y extrae la informacion del curso
function leerDatosCurso (curso) {

  const infoCurso = {
    image: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad:1
  }
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
  if (existe) {
    // Actualizamos la cantidad 
    const cursos = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado        
      } else {
        return curso; // Retorna los objetos que no son duplicados
      }
    }); 
    articulosCarrito = [...cursos];

  } else {
    // Agregamos el curso al carrito
    // Agrega elementos al arreglo de carrito
  articulosCarrito = [...articulosCarrito, infoCurso];
  }
  console.log(articulosCarrito);
  carritoHtml();
}

// Muestra el carrito de compras en el html
function carritoHtml () {

  // Limpiar el html
  limpiaHtml();

  //Recorre el carrito y genera el html
  articulosCarrito.forEach(curso => {
    const { image, titulo, precio, cantidad, id } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
       <td> 
           <img src="${image}" width="100">
       </td>
       <td>
           ${titulo}
       </td>
       <td>
           ${precio}
       </td>
       <td>
           ${cantidad}
       </td>
       <td>
           <a href="#" class="borrar-curso" data-id="${id}" > x </a>
       <td/>
    `;
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos del tbody
function limpiaHtml () {

  //Forma lenta
  //contenedorCarrito.innerHTML = '';
  
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}