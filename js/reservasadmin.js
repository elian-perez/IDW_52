import { inicializarDatos } from "./app.js";

const tabla = document.querySelector("#tablaReservas tbody");

let medicos = [];
let obras = [];
let reservas = [];

document.addEventListener("DOMContentLoaded", () => {
  inicializarDatos();
  cargarDatos();
  renderTabla();
});

function cargarDatos() {
  medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  obras = JSON.parse(localStorage.getItem("obras")) || [];
  reservas = JSON.parse(localStorage.getItem("reservas")) || [];
}

function renderTabla() {
  tabla.innerHTML = "";
  reservas.forEach(r => {
    const med = medicos.find(m => m.id === parseInt(r.medicoId));
    const ob = obras.find(o => o.id === parseInt(r.obraId));

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.paciente}</td>
      <td>${r.documento}</td>
      <td>${med?.nombre}</td>
      <td>${r.fechaHora}</td>
      <td>${ob?.nombre}</td>
    `;
    tabla.appendChild(tr);
  });
}
