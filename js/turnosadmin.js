import { inicializarDatos } from "./app.js";

const selMedico = document.getElementById("admSelMedico");
const selDia = document.getElementById("admSelDia");
const inpHora = document.getElementById("admHora");
const btnCrear = document.getElementById("btnCrearTurno");
const tabla = document.querySelector("#tablaTurnos tbody");

let medicos = [];
let turnos = [];

document.addEventListener("DOMContentLoaded", () => {
  inicializarDatos();
  cargarDatos();
  cargarMedicos();
  renderTabla();
});

function cargarDatos() {
  medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  turnos = JSON.parse(localStorage.getItem("turnos")) || [];
}

function cargarMedicos() {
  selMedico.innerHTML = "";
  medicos.forEach(m => {
    const o = document.createElement("option");
    o.value = m.id;
    o.textContent = m.nombreApellido;
    selMedico.appendChild(o);
  });
}

btnCrear.addEventListener("click", () => {
  const nuevo = {
    id: Date.now(),
    medicoId: parseInt(selMedico.value),
    dia: selDia.value,
    hora: inpHora.value,
    disponible: true
  };

  turnos.push(nuevo);
  localStorage.setItem("turnos", JSON.stringify(turnos));
  renderTabla();
  inpHora.value = "";
});

function renderTabla() {
  tabla.innerHTML = "";
  turnos.forEach((t) => {
    const med = medicos.find((m) => m.id === t.medicoId);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${med?.nombreApellido || "—"}</td>
      <td>${t.dia}</td>
      <td>${t.hora}</td>
      <td>
        <select onchange="cambiarDisponibilidad(${t.id}, this.value)">
          <option value="true" ${t.disponible ? "selected" : ""}>Sí</option>
          <option value="false" ${!t.disponible ? "selected" : ""}>No</option>
        </select>
      </td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="eliminarTurno(${t.id})">
          Eliminar
        </button>
      </td>
    `;
    tabla.appendChild(tr);
  });
}

window.cambiarDisponibilidad = function (id, valor) {
  turnos = turnos.map((t) =>
    t.id === id ? { ...t, disponible: valor === "true" } : t
  );

  localStorage.setItem("turnos", JSON.stringify(turnos));
  renderTabla();
};