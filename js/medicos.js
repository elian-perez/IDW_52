import { inicializarDatos } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("🩺 medicos.js cargado correctamente");
  inicializarDatos();

  const tablaMedicos = document.getElementById("tablaMedicos");
  const formMedico = document.getElementById("formMedico");
  const btnNuevo = document.getElementById("btnNuevo");
  const modal = new bootstrap.Modal(document.getElementById("modalMedico"));
  const idMedico = document.getElementById("idMedico");
  const selectEspecialidad = document.getElementById("especialidad");
  const obrasContainer = document.getElementById("obrasSocialesContainer");

  
  function obtenerDatos() {
    return {
      medicos: JSON.parse(localStorage.getItem("medicos")) || [],
      especialidades: JSON.parse(localStorage.getItem("especialidades")) || [],
      obras: JSON.parse(localStorage.getItem("obras")) || []
    };
  }

  let { medicos } = obtenerDatos();

  
  const cargarOpciones = () => {
    const { especialidades, obras } = obtenerDatos();

    selectEspecialidad.innerHTML = especialidades
      .map(e => `<option value="${e.nombre}">${e.nombre}</option>`)
      .join("");

    obrasContainer.innerHTML = obras
      .map(o => `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="${o.nombre}" id="obra-${o.id}">
          <label class="form-check-label" for="obra-${o.id}">${o.nombre}</label>
        </div>
      `)
      .join("");
  };

  cargarOpciones();

  
  const mostrarMedicos = () => {
    medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    tablaMedicos.innerHTML = "";

    medicos.forEach((m, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${m.id}</td>
        <td>${m.nombreApellido}</td>
        <td>${m.especialidad}</td>
        <td>${(m.obrasSociales || []).join(", ")}</td>
        <td>${m.matricula}</td>
        <td>${m.descripcion}</td>
        <td>$${m.valor}</td>
        <td><img data-src="img/${m.foto}" width="60" class="rounded"><div class="small text-muted">${m.foto}</div></td>
        <td>
          <button class="btn btn-warning btn-sm btnEditar" data-index="${i}">Editar</button>
          <button class="btn btn-danger btn-sm btnEliminar" data-index="${i}">Eliminar</button>
        </td>
      `;
      tablaMedicos.appendChild(fila);
    });
  };

  mostrarMedicos();

 
  btnNuevo.addEventListener("click", () => {
    formMedico.reset();
    idMedico.value = "";
    cargarOpciones();
    modal.show();
  });

  
  formMedico.addEventListener("submit", e => {
    e.preventDefault();

    const obrasSeleccionadas = Array.from(
      obrasContainer.querySelectorAll("input[type='checkbox']:checked")
    ).map(cb => cb.value);

    const nuevoMedico = {
      id: idMedico.value
        ? parseInt(idMedico.value)
        : medicos.length ? medicos[medicos.length - 1].id + 1 : 1,
      nombreApellido: document.getElementById("nombreApellido").value.trim(),
      especialidad: selectEspecialidad.value,
      obrasSociales: obrasSeleccionadas,
      matricula: document.getElementById("matricula").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      valor: document.getElementById("valor").value.trim(),
      foto: document.getElementById("foto").value.trim() || "default.jpg"
    };

    if (idMedico.value) {
      const i = medicos.findIndex(m => m.id === parseInt(idMedico.value));
      medicos[i] = nuevoMedico;
      console.log(`✏️ Médico actualizado: ${nuevoMedico.nombreApellido}`);
    } else {
      medicos.push(nuevoMedico);
      console.log(`🩺 Médico agregado: ${nuevoMedico.nombreApellido}`);
    }

    localStorage.setItem("medicos", JSON.stringify(medicos));
    mostrarMedicos();
    modal.hide();
  });

  
  tablaMedicos.addEventListener("click", e => {
    const i = e.target.dataset.index;
    if (e.target.classList.contains("btnEditar")) {
      const m = medicos[i];
      idMedico.value = m.id;
      document.getElementById("nombreApellido").value = m.nombreApellido;
      selectEspecialidad.value = m.especialidad;
      obrasContainer.querySelectorAll("input[type='checkbox']").forEach(cb => {
        cb.checked = m.obrasSociales.includes(cb.value);
      });
      document.getElementById("matricula").value = m.matricula;
      document.getElementById("descripcion").value = m.descripcion;
      document.getElementById("valor").value = m.valor;
      document.getElementById("foto").value = m.foto;
      modal.show();
    }

    if (e.target.classList.contains("btnEliminar")) {
      if (confirm(`¿Eliminar al médico ${medicos[i].nombreApellido}?`)) {
        medicos.splice(i, 1);
        localStorage.setItem("medicos", JSON.stringify(medicos));
        mostrarMedicos();
      }
    }
  });

  
  window.addEventListener("storage", event => {
    if (["especialidades", "obras"].includes(event.key)) {
      cargarOpciones();
      mostrarMedicos();
    }
  });
});


