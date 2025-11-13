console.log("app.js cargado correctamente");

export const inicializarDatos = () => {
  //  MÉDICOS
  if (!localStorage.getItem("medicos")) {
    const medicosIniciales = [
      {
        id: 1,
        nombreApellido: "Dr. Jesús María Amor",
        especialidad: "Cardiología",
        obrasSociales: ["OSDE", "Swiss Medical"],
        matricula: "MN-10001",
        descripcion: "Especialista en salud cardiovascular con 10 años de experiencia.",
        valor: "8500",
        foto: "porki.png",
      },
      {
        id: 2,
        nombreApellido: "Dr. Mario Miguel Trozado",
        especialidad: "Cirugía",
        obrasSociales: ["Galeno", "Medifé"],
        matricula: "MN-10002",
        descripcion: "Cirujano general especializado en intervenciones mínimamente invasivas.",
        valor: "12000", 
        foto: "silvestre.png",
      },
      {
        id: 3,
        nombreApellido: "Dr. Atilio Simón Garabato",
        especialidad: "Pediatría",
        obrasSociales: ["OSECAC", "OSDE"],
        matricula: "MN-10003 ",
        descripcion: "Pediatra dedicado al cuidado integral de neonatos y niños.",
        valor: "7000",
        foto: "lucas.png",
      },
      {
        id: 4,
        nombreApellido: "Dra. Patricia Lorena Feliz",
        especialidad: "Gastroenterología",
        obrasSociales: ["Galeno"],
        matricula: "MN-10004",
        descripcion: "Experta en el diagnóstico y tratamiento de enfermedades digestivas.",
        valor: "9500",
        foto: "pata2.jpg",
      },
      {
        id: 5,
        nombreApellido: "Dra. Ernestina Luz Del Campo",
        especialidad: "Oftalmología",
        obrasSociales: ["Medifé", "OSECAC"],
        matricula: "MN-10005",
        descripcion: "Oftalmóloga clínica y quirúrgica. Especialista en retina.",
        valor: "11000",
        foto: "lolabunny.jpg",
      },
      {
        id: 6,
        nombreApellido: "Dr. Camilo Veloz",
        especialidad: "Traumatología",
        obrasSociales: ["OSDE", "OSECAC"],
        matricula: "MN-10006",
        descripcion: "Traumatólogo con experiencia en cirugía artroscópica y medicina deportiva.",
        valor: "13000",
        foto: "correcamino2.jpg",
      },
    ];
    localStorage.setItem("medicos", JSON.stringify(medicosIniciales));
    console.log("Médicos iniciales cargados.");
  }

  // ESPECIALIDADES
  if (!localStorage.getItem("especialidades")) {
    const especialidadesIniciales = [
      { id: 1, nombre: "Cardiología" },
      { id: 2, nombre: "Cirugía" },
      { id: 3, nombre: "Pediatría" },
      { id: 4, nombre: "Gastroenterología" },
      { id: 5, nombre: "Oftalmología" },
      { id: 6, nombre: "Psicología" },
      { id: 7, nombre: "Traumatología" },
      { id: 8, nombre: "Dermatología" },
      { id: 9, nombre: "Neurología" },
      { id: 10, nombre: "Reumatología" },
    ];
    localStorage.setItem(
      "especialidades",
      JSON.stringify(especialidadesIniciales)
    );
    console.log("Especialidades iniciales cargadas.");
  }

  // OBRAS SOCIALES
  if (!localStorage.getItem("obras")) {
    const obrasIniciales = [
      {
        id: 1,
        nombre: "OSDE",
        descripcion: "Cobertura médica integral a nivel nacional.",
        imagen: "logos_os/osde.jpg",
      },
      {
        id: 2,
        nombre: "Swiss Medical",
        descripcion: "Servicios médicos de alta complejidad con amplia red de prestadores.",
        imagen: "logos_os/sw.jpg",
      },
      {
        id: 3,
        nombre: "Galeno",
        descripcion: "Atención médica personalizada con planes adaptados a cada necesidad.",
        imagen: "logos_os/galeno.jpg",
      },
      {
        id: 4,
        nombre: "Medifé",
        descripcion: "Cobertura médica con enfoque en prevención y bienestar.",
        imagen: "logos_os/medife.jpg",
      },
      {
        id: 5,
        nombre: "OSECAC",
        descripcion: "Obra social de empleados de comercio con cobertura nacional.",
        imagen: "logos_os/osecac.webp",
      },
    ];
    localStorage.setItem("obras", JSON.stringify(obrasIniciales));
    console.log("Obras sociales iniciales cargadas (con descripción).");
  }

  // TURNOS
  if (!localStorage.getItem("turnos")) {
    const turnosIniciales = [
    // Dr. Jesús María Amor
    { id: 1, medicoId: 1, dia: "2025-11-11", hora: "09:00", disponible: true },
    { id: 2, medicoId: 1, dia: "2025-11-11", hora: "10:00", disponible: true },
    { id: 3, medicoId: 1, dia: "2025-11-12", hora: "09:00", disponible: true },
    { id: 4, medicoId: 1, dia: "2025-11-12", hora: "11:00", disponible: true },

    // Dr. Mario Miguel Trozado
    { id: 5, medicoId: 2, dia: "2025-11-11", hora: "08:30", disponible: true },
    { id: 6, medicoId: 2, dia: "2025-11-13", hora: "09:00", disponible: true },
    { id: 7, medicoId: 2, dia: "2025-11-13", hora: "10:30", disponible: true },

    // Dr. Atilio Simón Garabato
    { id: 8, medicoId: 3, dia: "2025-11-14", hora: "14:00", disponible: true },
    { id: 9, medicoId: 3, dia: "2025-11-14", hora: "15:00", disponible: true },
    { id: 10, medicoId: 3, dia: "2025-11-14", hora: "15:30", disponible: true },
    ];
    localStorage.setItem("turnos", JSON.stringify(turnosIniciales));
    console.log("Turnos iniciales cargados.");
  }
};
