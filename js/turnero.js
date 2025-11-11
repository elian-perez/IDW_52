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

  const particularOpt = document.createElement("option");
  particularOpt.value = "particular";
  particularOpt.textContent = "Atención particular (sin obra social)";
  selObraSocial.appendChild(particularOpt);
}

function cargarProfesionales() {
  selProfesional.innerHTML = '<option value="">Seleccionar…</option>';

  const espId = parseInt(selEspecialidad.value);
  const obraSelId = selObraSocial.value;

  const espSeleccionada = especialidades.find((e) => e.id === espId);

  if (!espSeleccionada) return;

  // ✅ Buscar el nombre de la obra social según el ID seleccionado
  const obraSeleccionada = obrasSociales.find((o) => o.id == obraSelId);
  const nombreObra = obraSeleccionada ? obraSeleccionada.nombre : "";

  // ✅ Filtrar por especialidad + nombre de obra social
  const filtrados = medicos.filter((m) => {
    const coincideEspecialidad = m.especialidad === espSeleccionada.nombre;
    const coincideObra =
      nombreObra === "" || m.obrasSociales.includes(nombreObra);

    return coincideEspecialidad && coincideObra;
  });

  filtrados.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = m.nombreApellido;
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
                <h5 class="card-title mb-1">${medico.nombreApellido}</h5>
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
  const turnosMedico = turnos.filter((t) => t.medicoId === medicoId);

  // obtener los días disponibles sin repetir
  const dias = [...new Set(turnosMedico.map((t) => t.dia))];

  dias.forEach((dia) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary btn-sm m-1";
    btn.textContent = capitalizar(dia);
    btn.dataset.dia = dia;

    btn.addEventListener("click", () => seleccionarDia(btn));

    diasSemanaDiv.appendChild(btn);
  });

  if (dias.length === 0) {
    diasSemanaDiv.innerHTML =
      "<small class='text-muted'>No hay turnos para este médico.</small>";
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

  resFechaHora.textContent = capitalizar(dia);
}

function cargarHorarios(dia) {
  horariosDiv.innerHTML = "";

  const medicoId = parseInt(selProfesional.value);

  const turnosDia = turnos
    .filter(
      (t) =>
        t.medicoId === medicoId &&
        t.dia.toLowerCase() === dia.toLowerCase() &&
        t.disponible
    )
    .sort((a, b) => a.hora.localeCompare(b.hora));

  if (turnosDia.length === 0) {
    horariosDiv.innerHTML =
      "<small class='text-muted'>No hay horarios disponibles.</small>";
    return;
  }

  turnosDia.forEach((t) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-secondary btn-sm m-1";
    btn.textContent = t.hora;
    btn.dataset.idTurno = t.id;
    btn.dataset.hora = t.hora;

    btn.addEventListener("click", () => seleccionarHorario(btn));

    horariosDiv.appendChild(btn);
  });
}

function seleccionarHorario(btn) {
  const estaActivo = btn.classList.contains("active");
  const diaSeleccionado =
    diasSemanaDiv.querySelector(".active")?.dataset.dia || "—";

  if (estaActivo) {
    btn.classList.remove("active");
    btnConfirmar.disabled = true;

    resFechaHora.textContent = capitalizar(diaSeleccionado);

    horariosDiv.querySelectorAll("button").forEach((b) => (b.disabled = false));
    return;
  }

  horariosDiv.querySelectorAll("button").forEach((b) => {
    b.classList.remove("active");
    b.disabled = b !== btn;
  });

  btn.classList.add("active");

  const hora = btn.dataset.hora;
  resFechaHora.textContent = `${capitalizar(diaSeleccionado)} ${hora}`;
  btnConfirmar.disabled = false;
}

function actualizarResumen() {
  const esp = especialidades.find((e) => e.id == selEspecialidad.value);
  const os = obrasSociales.find((o) => o.id == selObraSocial.value);
  const med = medicos.find((m) => m.id == selProfesional.value);

  resEspecialidad.textContent = esp ? esp.nombre : "—";
  resObra.textContent = os
    ? os.nombre
    : selObraSocial.value === "particular"
    ? "Atención particular"
    : "—";
  resMedico.textContent = med ? med.nombreApellido : "—";

  if (med) {
    let valorConsulta = parseFloat(med.valor);

    if (selObraSocial.value && selObraSocial.value !== "particular") {
      valorConsulta = valorConsulta * 0.6; // 40% de descuento
    }

    resValor.textContent = `$ ${valorConsulta.toFixed(2)}`;
  } else {
    resValor.textContent = "$ —";
  }
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

  const espSeleccionada = especialidades.find(
    (e) => e.id == especialidadId
  ) || { nombre: "—" };
  const obraSeleccionada = obrasSociales.find((o) => o.id == obraId) || {
    nombre: "Sin obra social",
  };
  const medico = medicos.find((m) => m.id == medicoId) || {
    nombreApellido: "—",
  };

  const valorConsulta = calcularValorTotal(especialidadId, obraId);

  // Objeto reserva
  const reserva = {
    id: idReserva,
    documento: documento,
    paciente: nombre,
    medicoNombre: medico.nombreApellido,
    especialidad: espSeleccionada.nombre,
    valorConsulta: `$ ${valorConsulta}`,
    fechaHora: fechaHora,
    obraSocial:
      obraId === "particular" ? "Sin obra social" : obraSeleccionada.nombre,
    medicoId: medicoId,
  };

  // Guardar reserva
  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  marcarTurnoComoOcupado(medicoId, fechaHora);
  mostrarMensajeExito();
  
  const resumen = `
  <div style="font-family: sans-serif; text-align: left; padding: 10px;">
    <h5 style="margin-bottom: 10px;">Reserva confirmada ✅</h5>
    <p><strong>Paciente:</strong> ${nombre}</p>
    <p><strong>Médico:</strong> ${medico.nombreApellido}</p>
    <p><strong>Especialidad:</strong> ${espSeleccionada.nombre}</p>
    <p><strong>Obra social:</strong> ${
      obraId === "particular" ? "Sin obra social" : obraSeleccionada.nombre
    }</p>
    <p><strong>Fecha y hora:</strong> ${fechaHora}</p>
    <p><strong>Valor consulta:</strong> $${valorConsulta}</p>
    <hr>
    <p style="color: gray;">La página se actualizará automáticamente en 7 segundos...</p>
  </div>
`;

  const ventana = window.open("", "Resumen de reserva", "width=400,height=450");
  ventana.document.write(resumen);
  ventana.document.title = "Reserva confirmada";

  setTimeout(() => {
    ventana.close(); // cerrar ventana emergente
    window.location.reload(); // recargar la página principal
  }, 7000);

  btnConfirmar.disabled = true;

  horariosDiv.querySelectorAll("button").forEach((b) => (b.disabled = false));
}

function calcularValorTotal(espId, obraId) {
  const med = medicos.find((m) => m.id == selProfesional.value);
  if (!med) return 0;

  let valor = parseFloat(med.valor) || 0;

  if (obraId && obraId !== "particular") {
    const descuento = 0.4;
    valor = valor * (1 - descuento);
  }

  return valor.toFixed(2);
}

function marcarTurnoComoOcupado(medicoId, fechaHora) {
  let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  turnos = turnos.map((t) => {
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
