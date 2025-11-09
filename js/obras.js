import { inicializarDatos } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ obras.js (versión con descripción) cargado correctamente.");

  inicializarDatos();

  const tabla = document.getElementById("tablaObras");
  const form = document.getElementById("formObra");
  const btnNueva = document.getElementById("btnNueva");
  const modal = new bootstrap.Modal(document.getElementById("modalObra"));
  const idObra = document.getElementById("idObra");
  const nombreObra = document.getElementById("nombreObra");
  const descripcionObra = document.getElementById("descripcionObra");
  const imagenObra = document.getElementById("imagenObra");

  let obras = JSON.parse(localStorage.getItem("obras")) || [];

  // ---------- Render ----------
  const mostrarObras = () => {
    tabla.innerHTML = "";
    obras.forEach((obra, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${obra.id}</td>
        <td>${obra.nombre}</td>
        <td>${obra.descripcion || "-"}</td>
        <td>
          <img src="img/${obra.imagen || "default.jpg"}" width="80" class="rounded mb-1">
          <div class="small text-muted">${obra.imagen || ""}</div>
        </td>
        <td>
          <button class="btn btn-warning btn-sm btnEditar" data-index="${index}">Editar</button>
          <button class="btn btn-danger btn-sm btnEliminar" data-index="${index}">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  };

  mostrarObras();

  // ---------- Nueva ----------
  btnNueva.addEventListener("click", () => {
    form.reset();
    idObra.value = "";
    modal.show();
  });

  // ---------- Guardar ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nueva = {
      id: idObra.value
        ? parseInt(idObra.value)
        : obras.length > 0
        ? obras[obras.length - 1].id + 1
        : 1,
      nombre: nombreObra.value.trim(),
      descripcion: descripcionObra.value.trim(),
      imagen: imagenObra.value.trim() || "default.jpg",
    };

    // 🔹 Si es edición
    if (idObra.value) {
      const index = obras.findIndex((o) => o.id === parseInt(idObra.value));
      const nombreAnterior = obras[index].nombre;

      obras[index] = nueva;
      localStorage.setItem("obras", JSON.stringify(obras));
      console.log(`✏️ Obra actualizada: ${nombreAnterior} ➜ ${nueva.nombre}`);

      // 🔁 ACTUALIZAR OBRAS SOCIALES EN LOS MÉDICOS
      let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
      let cambios = 0;

      medicos = medicos.map((m) => {
        if (Array.isArray(m.obrasSociales)) {
          const actualizadas = m.obrasSociales.map((os) =>
            os === nombreAnterior ? nueva.nombre : os
          );
          if (JSON.stringify(actualizadas) !== JSON.stringify(m.obrasSociales)) {
            cambios++;
            return { ...m, obrasSociales: actualizadas };
          }
        }
        return m;
      });

      if (cambios > 0) {
        localStorage.setItem("medicos", JSON.stringify(medicos));
        console.log(`🩺 Se actualizaron ${cambios} médico(s) con la nueva obra social.`);
      }
    } else {
      // 🔹 Si es alta
      obras.push(nueva);
      localStorage.setItem("obras", JSON.stringify(obras));
      console.log(`🆕 Obra agregada: ${nueva.nombre}`);
    }

    mostrarObras();
    modal.hide();
  });

  // ---------- Editar / Eliminar ----------
  tabla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEditar")) {
      const index = e.target.dataset.index;
      const obra = obras[index];
      idObra.value = obra.id;
      nombreObra.value = obra.nombre;
      descripcionObra.value = obra.descripcion || "";
      imagenObra.value = obra.imagen;
      modal.show();
    }

    if (e.target.classList.contains("btnEliminar")) {
      const index = e.target.dataset.index;
      const obra = obras[index];

      if (confirm(`⚠️ ¿Seguro que querés eliminar "${obra.nombre}"?`)) {
        // 1️⃣ Eliminar la obra social del listado principal
        obras.splice(index, 1);
        localStorage.setItem("obras", JSON.stringify(obras));

        // 2️⃣ Actualizar las obras sociales de los médicos
        let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
        let cambios = 0;

        medicos = medicos.map((m) => {
          if (Array.isArray(m.obrasSociales)) {
            const actualizadas = m.obrasSociales.filter(
              (os) => os.toLowerCase() !== obra.nombre.toLowerCase()
            );

            if (JSON.stringify(actualizadas) !== JSON.stringify(m.obrasSociales)) {
              cambios++;
              return {
                ...m,
                obrasSociales:
                  actualizadas.length > 0 ? actualizadas : ["Sin obra social"],
              };
            }
          }
          return m;
        });

        if (cambios > 0) {
          localStorage.setItem("medicos", JSON.stringify(medicos));
          console.log(
            `🩺 Se actualizaron ${cambios} médico(s) tras eliminar la obra social "${obra.nombre}".`
          );
        }

        // 3️⃣ Volver a renderizar la tabla
        mostrarObras();

        // 4️⃣ Notificar a otras pestañas
        window.dispatchEvent(new StorageEvent("storage", { key: "obras" }));
      }
    }
  });
});




