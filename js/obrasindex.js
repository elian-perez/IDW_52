
import { inicializarDatos } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("🏥 obrasindex.js cargado correctamente");
  inicializarDatos();

  const tablaObras = document.getElementById("tablaObras");
  const formObra = document.getElementById("formObra");
  const btnNueva = document.getElementById("btnNueva");
  const modal = new bootstrap.Modal(document.getElementById("modalObra"));
  const idObra = document.getElementById("idObra");

  // 🔹 Obtener datos del localStorage
  function obtenerObras() {
    return JSON.parse(localStorage.getItem("obras")) || [];
  }

  let obras = obtenerObras();

  // 🔹 Renderizar tabla
  const mostrarObras = () => {
    obras = obtenerObras();
    tablaObras.innerHTML = "";

    obras.forEach((o, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${o.id}</td>
        <td>${o.nombre}</td>
        <td>${o.telefono}</td>
        <td>${o.email}</td>
        <td>
          ${o.logo ? `<img src="img/logo_os/${o.logo}" width="60" alt="${o.nombre}" class="rounded">` : "Sin logo"}
        </td>
        <td>
          <button class="btn btn-warning btn-sm btnEditar" data-index="${i}">Editar</button>
          <button class="btn btn-danger btn-sm btnEliminar" data-index="${i}">Eliminar</button>
        </td>
      `;
      tablaObras.appendChild(fila);
    });
  };

  mostrarObras();

  // 🔹 Nueva obra social
  btnNueva.addEventListener("click", () => {
    formObra.reset();
    idObra.value = "";
    modal.show();
  });

  // 🔹 Guardar obra social
  formObra.addEventListener("submit", e => {
    e.preventDefault();

    const nuevaObra = {
      id: idObra.value
        ? parseInt(idObra.value)
        : obras.length ? obras[obras.length - 1].id + 1 : 1,
      nombre: document.getElementById("nombre").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      email: document.getElementById("email").value.trim(),
      logo: document.getElementById("logo").value.trim() || "", // 👈 nombre del archivo dentro de img/logo_os
    };

    if (idObra.value) {
      const i = obras.findIndex(o => o.id === parseInt(idObra.value));
      obras[i] = nuevaObra;
      console.log(`✏️ Obra social actualizada: ${nuevaObra.nombre}`);
    } else {
      obras.push(nuevaObra);
      console.log(`🏥 Obra social agregada: ${nuevaObra.nombre}`);
    }

    localStorage.setItem("obras", JSON.stringify(obras));
    mostrarObras();
    modal.hide();
  });

  // 🔹 Editar / Eliminar
  tablaObras.addEventListener("click", e => {
    const i = e.target.dataset.index;
    if (e.target.classList.contains("btnEditar")) {
      const o = obras[i];
      idObra.value = o.id;
      document.getElementById("nombre").value = o.nombre;
      document.getElementById("telefono").value = o.telefono;
      document.getElementById("email").value = o.email;
      document.getElementById("logo").value = o.logo;
      modal.show();
    }

    if (e.target.classList.contains("btnEliminar")) {
      const o = obras[i];
      if (confirm(`¿Eliminar la obra social ${o.nombre}?`)) {
        obras.splice(i, 1);
        localStorage.setItem("obras", JSON.stringify(obras));
        mostrarObras();
      }
    }
  });
});

