import { inicializarDatos } from "./app.js";

console.log("🏥 obrasindex.js cargado correctamente");
inicializarDatos();

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorObras");

  if (!contenedor) {
    console.warn("⚠️ No se encontró el contenedor de obras en esta página.");
    return;
  }

  const obras = JSON.parse(localStorage.getItem("obras")) || [];
  console.log(`💾 Renderizando ${obras.length} obras sociales desde localStorage`);

  contenedor.innerHTML = "";

  obras.forEach((obra) => {
    const card = document.createElement("div");
    card.classList.add("col-md-3", "col-sm-6", "mb-4");

    card.innerHTML = `
      <div class="card h-100 shadow-sm border-0 text-center p-3">
        <img 
          src="img/${obra.imagen || "default.jpg"}" 
          alt="${obra.nombre}" 
          class="card-img-top mx-auto mb-3" 
          style="width: 120px; height: 120px; object-fit: contain;"
        >
        <div class="card-body p-2">
          <h5 class="card-title fw-bold">${obra.nombre}</h5>
          <p class="card-text mb-1"><strong>Tel:</strong> ${obra.telefono || "-"}</p>
          <p class="card-text mb-2"><strong>Email:</strong> ${obra.email || "-"}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });
});


