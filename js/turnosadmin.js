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
  cargarDias();
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

function cargarDias() {
  selDia.innerHTML = "";

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const diaSemana = hoy.getDay();
  let lunes = new Date(hoy);

  if (diaSemana === 0) {
    lunes.setDate(hoy.getDate() + 1);
  } else if (diaSemana !== 1) {
    lunes.setDate(hoy.getDate() - (diaSemana - 1));
  }

  for (let i = 0; i < 5; i++) {
    const fecha = new Date(lunes);
    fecha.setDate(lunes.getDate() + i);

    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const dd = String(fecha.getDate()).padStart(2, "0");
    const iso = `${yyyy}-${mm}-${dd}`;

    const texto = fecha.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    }).replace(",", "");

    const opcion = document.createElement("option");
    opcion.value = iso;
    opcion.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
    selDia.appendChild(opcion);
  }
}

btnCrear.addEventListener("click", () => {
  const nuevo = {
    id: turnos.length > 0 ? turnos[turnos.length - 1].id + 1 : 1,
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
}

window.eliminarTurno = function (id) {
  turnos = turnos.filter((t) => t.id !== id);

  localStorage.setItem("turnos", JSON.stringify(turnos));

  renderTabla();
};

