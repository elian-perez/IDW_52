console.log("📋 medicos.js cargado correctamente");

function mostrarMedicos() {
  const tabla = document.getElementById("tablaMedicos");
  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

  tabla.innerHTML = ""; // limpiar antes de mostrar

  medicos.forEach(medico => {
    const fila = `
      <tr>
        <td>${medico.id}</td>
        <td>${medico.nombre}</td>
        <td>${medico.especialidad}</td>
        <td>${medico.telefono}</td>
        <td>${medico.email}</td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

mostrarMedicos();
