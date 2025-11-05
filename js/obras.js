import { inicializarDatos } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ obras.js cargado correctamente.");

  inicializarDatos();

  const tabla = document.getElementById("tablaObras");
  const form = document.getElementById("formObra");
  const btnNueva = document.getElementById("btnNueva");
  const modal = new bootstrap.Modal(document.getElementById("modalObra"));
  const idObra = document.getElementById("idObra");
  const nombreObra = document.getElementById("nombreObra");
  const telefonoObra = document.getElementById("telefonoObra");
  const emailObra = document.getElementById("emailObra");

  let obras = JSON.parse(localStorage.getItem("obras")) || [];
  console.log("📦 Obras sociales cargadas desde localStorage:", obras);

  // ---------- render ----------
  const mostrarObras = () => {
    console.log("🔄 Renderizando tabla de obras sociales...");
    tabla.innerHTML = "";

    obras.forEach((obra, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${obra.id}</td>
        <td>${obra.nombre}</td>
        <td>${obra.telefono || "-"}</td>
        <td>${obra.email || "-"}</td>
        <td>
          <button class="btn btn-warning btn-sm btnEditar" data-index="${index}">Editar</button>
          <button class="btn btn-danger btn-sm btnEliminar" data-index="${index}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });

    console.log("✅ Tabla de obras sociales actualizada.");
  };

  mostrarObras();

  // ---------- nueva ----------
  btnNueva.addEventListener("click", () => {
    console.log("🆕 Creando nueva obra social...");
    form.reset();
    idObra.value = "";
    modal.show();
  });

  // ---------- guardar (alta o edición) ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nueva = {
      id: idObra.value
        ? parseInt(idObra.value)
        : obras.length > 0
          ? obras[obras.length - 1].id + 1
          : 1,
      nombre: nombreObra.value.trim(),
      telefono: telefonoObra.value.trim(),
      email: emailObra.value.trim(),
    };

    // si es edición
    if (idObra.value) {
      const index = obras.findIndex((o) => o.id === parseInt(idObra.value));
      const nombreAnterior = obras[index].nombre;

      obras[index] = nueva;
      localStorage.setItem("obras", JSON.stringify(obras));
      console.log(`✏️ Obra social actualizada: ${nombreAnterior} ➜ ${nueva.nombre}`);

      // 🔁 ACTUALIZAR MÉDICOS QUE TENÍAN ESA OBRA
      let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
      let cambios = 0;

      medicos = medicos.map((m) => {
        if (Array.isArray(m.obrasSociales)) {
          const nuevas = m.obrasSociales.map((os) =>
            os === nombreAnterior ? nueva.nombre : os
          );
          // si cambió alguna
          if (JSON.stringify(nuevas) !== JSON.stringify(m.obrasSociales)) {
            cambios++;
            return { ...m, obrasSociales: nuevas };
          }
        }
        return m;
      });

      if (cambios > 0) {
        localStorage.setItem("medicos", JSON.stringify(medicos));
        console.log(`🩺 Se actualizaron ${cambios} médico(s) por cambio de obra social.`);
      }
    } else {
      // alta
      obras.push(nueva);
      localStorage.setItem("obras", JSON.stringify(obras));
      console.log(`🆕 Obra social agregada: ${nueva.nombre}`);
    }

    mostrarObras();
    modal.hide();
  });

  // ---------- editar / eliminar ----------
  tabla.addEventListener("click", (e) => {
    // editar
    if (e.target.classList.contains("btnEditar")) {
      const index = e.target.dataset.index;
      const obra = obras[index];
      console.log(`✏️ Editando obra social con ID ${obra.id}.`);
      idObra.value = obra.id;
      nombreObra.value = obra.nombre;
      telefonoObra.value = obra.telefono;
      emailObra.value = obra.email;
      modal.show();
    }

    // eliminar
    if (e.target.classList.contains("btnEliminar")) {
      const index = e.target.dataset.index;
      const obra = obras[index];

      if (confirm(`⚠️ ¿Seguro que querés eliminar la obra social "${obra.nombre}"?`)) {
        obras.splice(index, 1);
        localStorage.setItem("obras", JSON.stringify(obras));
        mostrarObras();

        // 🔁 quitar la obra eliminada de los médicos (sin borrar médicos)
        let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
        let cambios = 0;

        medicos = medicos.map((m) => {
          if (Array.isArray(m.obrasSociales)) {
            const filtradas = m.obrasSociales.filter((os) => os !== obra.nombre);
            if (filtradas.length !== m.obrasSociales.length) {
              cambios++;
              return { ...m, obrasSociales: filtradas };
            }
          }
          return m;
        });

        if (cambios > 0) {
          localStorage.setItem("medicos", JSON.stringify(medicos));
          console.log(
            `🗑️ Obra social "${obra.nombre}" eliminada. Se quitaron referencias en ${cambios} médico(s).`
          );
        }
      }
    }
  });
});


