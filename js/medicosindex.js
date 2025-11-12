import { inicializarDatos } from "./app.js";

console.log("medicosindex.js (Base64 compatible) cargado correctamente");
inicializarDatos();

export function mostrarMedicos() {
  const contenedor = document.getElementById("contenedorMedicos");
  if (!contenedor) {
    console.warn("No se encontró el contenedor de médicos en esta página.");
    return;
  }

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  console.log(`Renderizando ${medicos.length} médicos en index.html`);

  contenedor.innerHTML = "";

  medicos.forEach((medico) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "col-sm-6", "mb-4");

    const obrasTexto =
      medico.obrasSociales && medico.obrasSociales.length > 0
        ? medico.obrasSociales.join(", ")
        : "Sin cobertura";


    const rutaImagen = medico.foto?.startsWith("data:image")
      ? medico.foto
      : `img/${medico.foto || "default.jpg"}`;

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img 
          ${medico.foto?.startsWith("data:image") ? `src="${rutaImagen}"` : `data-src="${rutaImagen}"`}
          alt="${medico.nombreApellido}"
          class="card-img-top rounded-top"
          style="
            width: 100%;
            height: 260px;
            object-fit: cover;
            object-position: center;
            background-color: #f8f9fa;
            border-bottom: 1px solid #ddd;
          ">

        <div class="card-body text-center">
          <h5 class="card-title">${medico.nombreApellido}</h5>
          <p class="card-text"><strong>Especialidad:</strong> ${medico.especialidad}</p>
          <p class="card-text"><strong>Obras Sociales:</strong> ${obrasTexto}</p>
          <p class="card-text"><strong>Matrícula:</strong> ${medico.matricula}</p>
          <p class="card-text"><strong>Valor Consulta:</strong> $${medico.valor}</p>
          <p class="card-text">${medico.descripcion}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", mostrarMedicos);




