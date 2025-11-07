import { inicializarDatos } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarDatos();
  cargarDatosDesdeAppJS();
  cargarEspecialidades();
  configurarEventos();
  cargarTurnosAdmin();
});

// -------------------------------
// 1. SELECTORES DEL HTML
// -------------------------------
const selEspecialidad = document.getElementById("selEspecialidad");
const selObraSocial = document.getElementById("selObraSocial");
const selProfesional = document.getElementById("selProfesional");

const diasSemanaDiv = document.getElementById("diasSemana");
const horariosDiv = document.getElementById("horariosDisponibles");
const listaProfesDiv = document.getElementById("listaProfesionales");

const inpDocumento = document.getElementById("inpDocumento");
const inpNombre = document.getElementById("inpNombre");

const resEspecialidad = document.getElementById("resEspecialidad");
const resObra = document.getElementById("resObra");
const resMedico = document.getElementById("resMedico");
const resFechaHora = document.getElementById("resFechaHora");
const resValor = document.getElementById("resValor");

const btnConfirmar = document.getElementById("btnConfirmar");
const mensaje = document.getElementById("mensaje");

// -------------------------------
// 2. VARIABLES (se llenan con app.js)
// -------------------------------
let especialidades = [];
let obrasSociales = [];
let medicos = [];
let turnos = [];

// -------------------------------
// 4. CARGA DE DATOS
// -------------------------------
function cargarDatosDesdeAppJS() {
  especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
  obrasSociales = JSON.parse(localStorage.getItem("obras")) || [];
  medicos = JSON.parse(localStorage.getItem("medicos")) || [];

  console.log("✅ Datos cargados correctamente desde localStorage");
  console.table(especialidades);
  console.table(obrasSociales);
  console.table(medicos);
}

// Cargar Turnos // Solo para admin
function cargarTurnosAdmin() {
  turnos = JSON.parse(localStorage.getItem("turnos")) || [];
}

// -------------------------------
// 5. CARGAR ESPECIALIDADES
// -------------------------------
function cargarEspecialidades() {
  selEspecialidad.innerHTML = '<option value="">Seleccionar…</option>';

  especialidades.forEach((e) => {
    const opt = document.createElement("option");
    opt.value = e.id;
    opt.textContent = e.nombre;
    selEspecialidad.appendChild(opt);
  });
}

// -------------------------------
// 6. CONFIGURAR EVENTOS
// -------------------------------
function configurarEventos() {
  // Cuando el usuario elige especialidad
  selEspecialidad.addEventListener("change", () => {
    selObraSocial.disabled = false;
    cargarObrasSociales();
    limpiarProfesionales();
    actualizarResumen();
  });

  // Cuando elige obra social
  selObraSocial.addEventListener("change", () => {
    selProfesional.disabled = false;
    cargarProfesionales();
    actualizarResumen();
  });

  // Cuando elige profesional
  selProfesional.addEventListener("change", () => {
    mostrarProfesionalCard();
    cargarDias();
    actualizarResumen();
  });

  // Confirmar turno
  btnConfirmar.addEventListener("click", confirmarReserva);
}

// -------------------------------
// 7. COMPLETAREMOS ESTAS FUNCIONES DESPUÉS
// -------------------------------
function cargarObrasSociales() {
  selObraSocial.innerHTML = '<option value="">Seleccionar…</option>';

  obrasSociales.forEach((os) => {
    const opt = document.createElement("option");
    opt.value = os.id;
    opt.textContent = os.nombre;
    selObraSocial.appendChild(opt);
  });
}

function cargarProfesionales() {
  selProfesional.innerHTML = '<option value="">Seleccionar…</option>';

  const espId = parseInt(selEspecialidad.value);
  const obraSelId = selObraSocial.value;

  const espSeleccionada = especialidades.find((e) => e.id === espId);

  if (!espSeleccionada) return;

  // ✅ Buscar el nombre de la obra social según el ID seleccionado
  const obraSeleccionada = obrasSociales.find(o => o.id == obraSelId);
  const nombreObra = obraSeleccionada ? obraSeleccionada.nombre : "";

  // ✅ Filtrar por especialidad + nombre de obra social
  const filtrados = medicos.filter((m) => {
    const coincideEspecialidad = m.especialidad === espSeleccionada.nombre;
    const coincideObra = nombreObra === "" || m.obrasSociales.includes(nombreObra);

    return coincideEspecialidad && coincideObra;
  });

  filtrados.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = m.nombre;
    selProfesional.appendChild(opt);
  });
}

function limpiarProfesionales() {
  selProfesional.innerHTML = '<option value="">Seleccionar…</option>';
  selProfesional.disabled = true;
  listaProfesDiv.style.display = "none";
  listaProfesDiv.innerHTML = "";
}

function mostrarProfesionalCard() {
  const medicoId = selProfesional.value;
  if (!medicoId) return;

  const medico = medicos.find((m) => m.id == medicoId);

  listaProfesDiv.style.display = "block";

  listaProfesDiv.innerHTML = `
        <div class="card mb-3">
          <div class="card-body d-flex align-items-center gap-3">

            <img src="img/${medico.foto || "https://via.placeholder.com/80"}" 
                 class="rounded-circle" 
                 width="80" height="80" />

            <div>
                <h5 class="card-title mb-1">${medico.nombre}</h5>
                <p class="text-muted mb-1">${medico.especialidad}</p>
                <small class="text-muted">${
                  medico.direccion || "Dirección no cargada"
                }</small>
            </div>

          </div>
        </div>
    `;
}

function cargarDias() {
  diasSemanaDiv.innerHTML = "";
  horariosDiv.innerHTML = '<small class="text-muted">Elegí un día.</small>';

  const medicoId = parseInt(selProfesional.value);
  if (!medicoId) return;

  // filtrar turnos reales del medico
  const turnosMedico = turnos.filter(t => t.medicoId === medicoId);

  // obtener los días disponibles sin repetir
  const dias = [...new Set(turnosMedico.map(t => t.dia))];

  dias.forEach(dia => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary btn-sm m-1";
    btn.textContent = capitalizar(dia);
    btn.dataset.dia = dia;

    btn.addEventListener("click", () => seleccionarDia(btn));

    diasSemanaDiv.appendChild(btn);
  });

  if (dias.length === 0) {
    diasSemanaDiv.innerHTML = "<small class='text-muted'>No hay turnos para este médico.</small>";
  }
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function seleccionarDia(btn) {
  diasSemanaDiv
    .querySelectorAll("button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const dia = btn.dataset.dia;
  cargarHorarios(dia);

  resFechaHora.textContent = capitalizar(dia); // hora después se agrega
}

function cargarHorarios(dia) {
  horariosDiv.innerHTML = "";

  const medicoId = parseInt(selProfesional.value);

  // turnos del medico y del dia
  const turnosDia = turnos
    .filter(t => t.medicoId === medicoId && t.dia === dia)
    .sort((a, b) => a.hora.localeCompare(b.hora)); // ORDENADOS

  if (turnosDia.length === 0) {
    horariosDiv.innerHTML = "<small class='text-muted'>No hay horarios disponibles.</small>";
    return;
  }

  turnosDia.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-secondary btn-sm m-1";
    btn.textContent = t.hora;
    btn.dataset.idTurno = t.id;
    btn.dataset.hora = t.hora;

    if (!t.disponible) {
      btn.disabled = true;
    }

    btn.addEventListener("click", () => seleccionarHorario(btn));

    horariosDiv.appendChild(btn);
  });
}

function seleccionarHorario(btn) {
  horariosDiv
    .querySelectorAll("button")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const hora = btn.dataset.hora;
  const dia = resFechaHora.textContent;

  resFechaHora.textContent = `${dia} ${hora}`;

  btnConfirmar.disabled = false;
}

function actualizarResumen() {
  const esp = especialidades.find((e) => e.id == selEspecialidad.value);
  const os = obrasSociales.find((o) => o.id == selObraSocial.value);
  const med = medicos.find((m) => m.id == selProfesional.value);

  resEspecialidad.textContent = esp ? esp.nombre : "—";
  resObra.textContent = os ? os.nombre : "—";
  resMedico.textContent = med ? med.nombre : "—";
}

function confirmarReserva() {
  const documento = inpDocumento.value.trim();
  const nombre = inpNombre.value.trim();
  const especialidadId = selEspecialidad.value;
  const obraId = selObraSocial.value;
  const medicoId = selProfesional.value;
  const fechaHora = resFechaHora.textContent;

  if (!documento || !nombre || fechaHora === "—") {
    mensaje.textContent = "Faltan completar datos.";
    mensaje.classList.remove("text-success");
    mensaje.classList.add("text-danger");
    return;
  }

  // ID único
  const idReserva = Date.now();

  // Objeto reserva
  const reserva = {
    id: idReserva,
    documento: documento,
    paciente: nombre,
    especialidadId: especialidadId,
    obraId: obraId,
    medicoId: medicoId,
    fechaHora: fechaHora,
    total: calcularValorTotal(especialidadId, obraId),
  };

  // Guardar reserva
  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  marcarTurnoComoOcupado(medicoId, fechaHora);

  mostrarMensajeExito();
  btnConfirmar.disabled = true;
}


function calcularValorTotal(espId, obraId) {
  return 1000;
}

function marcarTurnoComoOcupado(medicoId, fechaHora) {
  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  turnos = turnos.map(t => {
    const turnoFechaHora = `${capitalizar(t.dia)} ${t.hora}`;
    if (t.medicoId == medicoId && turnoFechaHora === fechaHora) {
      return { ...t, disponible: false };
    }
    return t;
  });

  localStorage.setItem("turnos", JSON.stringify(turnos));
}

function mostrarMensajeExito() {
  mensaje.classList.remove("text-danger");
  mensaje.classList.add("text-success");
  mensaje.textContent = "✅ Turno reservado con éxito.";

  setTimeout(() => {
    mensaje.textContent = "";
  }, 4000);
}
