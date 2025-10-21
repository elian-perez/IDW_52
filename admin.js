
import { inicializarMedicos } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarMedicos(); 

  const tablaMedicos = document.getElementById("tablaMedicos");
  const formMedico = document.getElementById("formMedico");
  const btnNuevo = document.getElementById("btnNuevo");
  const modal = new bootstrap.Modal(document.getElementById("modalMedico"));
  const idMedico = document.getElementById("idMedico");

  let medicos = JSON.parse(localStorage.getItem("medicos")) || [];

  
  const mostrarMedicos = () => {
    tablaMedicos.innerHTML = "";
    medicos.forEach((medico, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${medico.id}</td>
        <td>${medico.nombre}</td>
        <td>${medico.especialidad}</td>
        <td>${medico.telefono}</td>
        <td>${medico.email}</td>
        <td>
          <button class="btn btn-warning btn-sm btnEditar" data-index="${index}">Editar</button>
          <button class="btn btn-danger btn-sm btnEliminar" data-index="${index}">Eliminar</button>
        </td>
      `;
      tablaMedicos.appendChild(fila);
    });
  };

  mostrarMedicos();

  
  btnNuevo.addEventListener("click", () => {
    formMedico.reset();
    idMedico.value = "";
    modal.show();
  });

  formMedico.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoMedico = {
      id: idMedico.value ? parseInt(idMedico.value) : Date.now(),
      nombre: document.getElementById("nombre").value.trim(),
      especialidad: document.getElementById("especialidad").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      email: document.getElementById("email").value.trim(),
    };

    if (idMedico.value) {
      const index = medicos.findIndex((m) => m.id === parseInt(idMedico.value));
      medicos[index] = nuevoMedico;
    } else {
      medicos.push(nuevoMedico);
    }

    localStorage.setItem("medicos", JSON.stringify(medicos));
    mostrarMedicos();
    modal.hide();
  });

  
  tablaMedicos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEditar")) {
      const index = e.target.dataset.index;
      const medico = medicos[index];
      idMedico.value = medico.id;
      document.getElementById("nombre").value = medico.nombre;
      document.getElementById("especialidad").value = medico.especialidad;
      document.getElementById("telefono").value = medico.telefono;
      document.getElementById("email").value = medico.email;
      modal.show();
    }

    if (e.target.classList.contains("btnEliminar")) {
      const index = e.target.dataset.index;
      if (confirm("¿Seguro que querés eliminar este médico?")) {
        medicos.splice(index, 1);
        localStorage.setItem("medicos", JSON.stringify(medicos));
        mostrarMedicos();
      }
    }
  });

  
  //const btnVolverInicio = document.createElement("button"); 
  //btnVolverInicio.textContent = " Volver al inicio";
  //btnVolverInicio.className = "btn btn-secondary mt-3";
  //btnVolverInicio.addEventListener("click", () => {
  //  window.location.href = "index.html";
  //});
  //tablaMedicos.parentElement.insertBefore(btnVolverInicio, tablaMedicos);

});

