
// Al cargar la página, ejecutamos la función
document.addEventListener("DOMContentLoaded", cargarUsuarios);

function cargarUsuarios() {
  fetch("https://dummyjson.com/users")
    .then(response => response.json())
    .then(data => {
      mostrarUsuarios(data.users);
    })
    .catch(error => {
      console.error("Error al cargar los usuarios:", error);
    });
}

function mostrarUsuarios(usuarios) {
  const cuerpoTabla = document.getElementById("usuariosBody");

  usuarios.forEach(usuario => {
    // Excluimos campos sensibles como password, dirección completa, etc.
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.firstName} ${usuario.lastName}</td>
      <td>${usuario.email}</td>
      <td>${usuario.phone}</td>
      <td>${usuario.age}</td>
      <td><img src="${usuario.image}" alt="foto" width="50" /></td>
    `;

    cuerpoTabla.appendChild(fila);
  });
}
