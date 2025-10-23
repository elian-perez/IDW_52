import { inicializarMedicos } from "./app.js";

console.log("📋 medicosindex.js cargado correctamente");

inicializarMedicos();

export function mostrarMedicos() {
  const contenedor = document.getElementById("contenedorMedicos");
  if (!contenedor) {
    console.warn("No se encontró el contenedor de médicos en esta página.");
    return;
  }

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

  contenedor.innerHTML = "";

  medicos.forEach((medico) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "col-sm-6", "mb-4");

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="img/${medico.foto || 'default.jpg'}"
          class="card-img-top"
          alt="${medico.nombre}"
          style="width: 100%; height: 250px; object-fit: cover; background-color: #f8f9fa;">

        <div class="card-body text-center">
          <h5 class="card-title">${medico.nombre}</h5>
          <p class="card-text"><strong>Especialidad:</strong> ${medico.especialidad}</p>
          <p class="mb-1"><strong>Tel:</strong> ${medico.telefono}</p>
          <p><strong>Email:</strong> ${medico.email}</p>
          <a href="#turnos" class="btn btn-primary" onclick="alert('En Desarrollo. Disculpe la molestia.')">Solicitar turno</a>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", mostrarMedicos);
