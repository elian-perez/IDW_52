
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

  reservas.forEach((r) => {
    const med = medicos.find((m) => m.id === parseInt(r.medicoId));
    const ob = obras.find((o) => o.id === parseInt(r.obraId));

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.paciente}</td>
      <td>${r.documento}</td>
      <td>${med ? med.nombreApellido : "—"}</td>
      <td>${med ? med.especialidad : "—"}</td>
      <td>$${med ? med.valor : "—"}</td>
      <td>${r.fechaHora}</td>
      <td>${ob ? ob.nombre : "Sin obra social"}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="eliminarReserva(${r.id})">
          <i class="fa-solid fa-trash"></i> Eliminar
        </button>
      </td>
    `;
    tabla.appendChild(tr);
  });
}

window.eliminarReserva = function (id) {
  if (confirm("¿Deseas eliminar esta reserva?")) {
    reservas = reservas.filter((r) => r.id !== id);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    renderTabla();
  }
};
