console.log("✅ app.js cargado correctamente");

export const inicializarDatos = () => {
  // ---------- MÉDICOS ----------
  if (!localStorage.getItem("medicos")) {
    const medicosIniciales = [
      {
        id: 1,
        nombre: "Dr. Jesús María Amor",
        especialidad: "Cardiología",
        obrasSociales: ["OSDE", "Swiss Medical"],
        telefono: "2246-000001",
        email: "jesus@clinica.com",
        foto: "porki.png",
      },
      {
        id: 2,
        nombre: "Dr. Mario Miguel Trozado",
        especialidad: "Cirugía",
        obrasSociales: ["Galeno", "Medifé"],
        telefono: "2246-000002",
        email: "mario@clinica.com",
        foto: "silvestre.png",
      },
      {
        id: 3,
        nombre: "Dr. Atilio Simón Garabato",
        especialidad: "Pediatría",
        obrasSociales: ["OSECAC", "OSDE"],
        telefono: "2246-000003",
        email: "atilio@clinica.com",
        foto: "lucas.png",
      },
      {
        id: 4,
        nombre: "Dra. Patricia Lorena Feliz",
        especialidad: "Gastroenterología",
        obrasSociales: ["Galeno"],
        telefono: "2246-000004",
        email: "patricia@clinica.com",
        foto: "pata2.jpg",
      },
      {
        id: 5,
        nombre: "Dra. Ernestina Luz Del Campo",
        especialidad: "Oftalmología",
        obrasSociales: ["Medifé", "OSECAC"],
        telefono: "2246-000005",
        email: "ernestina@clinica.com",
        foto: "lolabunny.jpg",
      },
      {
        id: 6,
        nombre: "Dr. Camilo Veloz",
        especialidad: "Traumatología",
        obrasSociales: ["OSDE", "OSECAC"],
        telefono: "2246-000006",
        email: "camilo@clinica.com",
        foto: "correcamino2.jpg",
      },

    ];
    localStorage.setItem("medicos", JSON.stringify(medicosIniciales));
    console.log("✅ Médicos iniciales cargados.");
  }

  // ---------- ESPECIALIDADES ----------
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
    localStorage.setItem("especialidades", JSON.stringify(especialidadesIniciales));
    console.log("✅ Especialidades iniciales cargadas.");
  }

  // ---------- OBRAS SOCIALES ----------
  if (!localStorage.getItem("obras")) {
    const obrasIniciales = [
      { id: 1, nombre: "OSDE",
        telefono: "0226-5645-5664",
        email: "OSDE@osde.org",
        imagen: "logos_os/osde.jpg"
       },
      { id: 2, nombre: "Swiss Medical",
        telefono: "0810-222-3431",
        email: "SW@MD.com.ar",
        imagen: "logos_os/sw.jpg",
       },
      { id: 3, nombre: "Galeno",
        telefono: "011-15-2654-1456",
        email: "Gal@eno.gob.ar",
        imagen: "logos_os/galeno.jpg",
       },
      { id: 4, nombre: "Medifé",
        telefono: "11-456-456",
        email: "obra@social.com",
        imagen: "logos_os/medife.jpg",
       },
      { id: 5, nombre: "OSECAC",
        telefono: "0800-000-0000",
        email: "osecac@obr.org.ar",
        imagen: "logos_os/osecac.webp",
       },
    ];
    localStorage.setItem("obras", JSON.stringify(obrasIniciales));
    console.log("✅ Obras sociales iniciales cargadas con imágenes en logos_os/");
  }
};

