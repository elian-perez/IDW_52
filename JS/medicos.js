console.log("📋 medicos.js cargado correctamente");

export function mostrarMedicos() {
  const tabla = document.getElementById("tablaMedicos");
  if (!tabla) {
    console.warn("No se encontró el elemento 'tablaMedicos' en esta página.");
    return;
  }

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

  tabla.innerHTML = ""; 

  medicos.forEach((medico) => {
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
