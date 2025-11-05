import { inicializarDatos } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ especialidades.js cargado correctamente.");

  // me aseguro de que existan las claves base
  inicializarDatos();

  const tabla = document.getElementById("tablaEspecialidades");
  const form = document.getElementById("formEspecialidad");
  const btnNueva = document.getElementById("btnNueva");
  const modal = new bootstrap.Modal(document.getElementById("modalEspecialidad"));
  const idEspecialidad = document.getElementById("idEspecialidad");
  const nombreEspecialidad = document.getElementById("nombreEspecialidad");

  let especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  console.log("📦 Especialidades cargadas desde localStorage:", especialidades);

  // ---------- render ----------
  const mostrarEspecialidades = () => {
    console.log("🔄 Renderizando tabla de especialidades...");
    tabla.innerHTML = "";

    especialidades.forEach((esp, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${esp.id}</td>
        <td>${esp.nombre}</td>
        <td>
          <button class="btn btn-warning btn-sm btnEditar" data-index="${index}">Editar</button>
          <button class="btn btn-danger btn-sm btnEliminar" data-index="${index}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });

    console.log("✅ Tabla de especialidades actualizada.");
  };

  mostrarEspecialidades();

  // ---------- nueva ----------
  btnNueva.addEventListener("click", () => {
    console.log("🆕 Creando nueva especialidad...");
    form.reset();
    idEspecialidad.value = "";
    modal.show();
  });

  // ---------- guardar (alta o edición) ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nueva = {
      id: idEspecialidad.value
        ? parseInt(idEspecialidad.value)
        : especialidades.length > 0
          ? especialidades[especialidades.length - 1].id + 1
          : 1,
      nombre: nombreEspecialidad.value.trim(),
    };

    // si es edición
    if (idEspecialidad.value) {
      const index = especialidades.findIndex(
        (e) => e.id === parseInt(idEspecialidad.value)
      );

      // nombre anterior para poder buscarlo en los médicos
      const nombreAnterior = especialidades[index].nombre;

      // actualizo la especialidad
      especialidades[index] = nueva;
      localStorage.setItem("especialidades", JSON.stringify(especialidades));
      console.log(`✏️ Especialidad actualizada: ${nombreAnterior} ➜ ${nueva.nombre}`);

      // 🔁 ACTUALIZAR MÉDICOS QUE TENÍAN ESA ESPECIALIDAD
      let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
      let cambios = 0;

      medicos = medicos.map((m) => {
        if (m.especialidad === nombreAnterior) {
          cambios++;
          return { ...m, especialidad: nueva.nombre };
        }
        return m;
      });

      if (cambios > 0) {
        localStorage.setItem("medicos", JSON.stringify(medicos));
        console.log(`🩺 Se actualizaron ${cambios} médico(s) que tenían "${nombreAnterior}".`);
      }
    } else {
      // si es alta
      especialidades.push(nueva);
      localStorage.setItem("especialidades", JSON.stringify(especialidades));
      console.log(`🆕 Especialidad agregada: ${nueva.nombre}`);
    }

    mostrarEspecialidades();
    modal.hide();
  });

  // ---------- editar / eliminar ----------
  tabla.addEventListener("click", (e) => {
    // editar
    if (e.target.classList.contains("btnEditar")) {
      const index = e.target.dataset.index;
      const esp = especialidades[index];
      console.log(`✏️ Editando especialidad con ID ${esp.id}`);
      idEspecialidad.value = esp.id;
      nombreEspecialidad.value = esp.nombre;
      modal.show();
    }

    // eliminar
    if (e.target.classList.contains("btnEliminar")) {
      const index = e.target.dataset.index;
      const esp = especialidades[index];

      if (confirm(`⚠️ ¿Seguro que querés eliminar la especialidad "${esp.nombre}"?`)) {
        especialidades.splice(index, 1);
        localStorage.setItem("especialidades", JSON.stringify(especialidades));
        mostrarEspecialidades();

        // al eliminar la especialidad, quitamos esa especialidad de los médicos
        let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
        let cambios = 0;

        medicos = medicos.map((m) => {
          if (m.especialidad === esp.nombre) {
            cambios++;
            return { ...m, especialidad: "Sin especialidad" };
          }
          return m;
        });

        if (cambios > 0) {
          localStorage.setItem("medicos", JSON.stringify(medicos));
          console.log(
            `🗑️ Especialidad "${esp.nombre}" eliminada. Se actualizaron ${cambios} médico(s).`
          );
        }
      }
    }
  });
});


