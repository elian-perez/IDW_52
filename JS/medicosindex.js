console.log("🏥 medicosIndex.js cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("medicosContainer");

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
 
  contenedor.innerHTML = "";

    medicos.forEach((m) => {
    const card = `
      <div class="col-md-4 d-flex justify-content-center">
        <div class="card shadow-lg mb-4" style="width: 18rem;">
          <img src="img/${m.foto || 'default.jpg'}" class="card-img-top" alt="${m.nombre}">
          <div class="card-body text-center">
            <h5 class="card-title">${m.nombre}</h5>
            <p class="card-text mb-1"><strong>Especialidad:</strong> ${m.especialidad}</p>
            <p class="card-text mb-1"><strong>Teléfono:</strong> ${m.telefono}</p>
            <p class="card-text"><strong>Email:</strong> ${m.email}</p>
            <a href="#" class="btn btn-primary mt-2" onclick="alert('Turnos en desarrollo')">Seleccionar Turno</a>
          </div>
        </div>
      </div>
    `;
    contenedor.innerHTML += card;
  });
});
