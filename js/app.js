console.log(" app.js cargado correctamente");
export const inicializarMedicos = () => {
  if (!localStorage.getItem("medicos")) {
    const medicosIniciales = [
      {
        id: 1,
        nombre: "Dr. Jesús María Amor",
        especialidad: "Cardiología",
        telefono: "2246-000001",
        email: "jesus@clinica.com",
        foto: "porki.png",
      },
      {
        id: 2,
        nombre: "Dr. Mario Miguel Trozado",
        especialidad: "Cirugía",
        telefono: "2246-000002",
        email: "mario@clinica.com",
        foto: "silvestre.png",
      },
      {
        id: 3,
        nombre: "Dr. Atilio Simón Garabato",
        especialidad: "Pediatría",
        telefono: "2246-000003",
        email: "atilio@clinica.com",
        foto: "lucas.png",
      },
      {
        id: 4,
        nombre: "Dra. Patricia Lorena Feliz",
        especialidad: "Gastroenterología",
        telefono: "2246-000004",
        email: "patricia@clinica.com",
        foto: "pata.jpg",
      },
      {
        id: 5,
        nombre: "Dra. Ernestina Luz Del Campo",
        especialidad: "Oftalmología",
        telefono: "2246-000005",
        email: "ernestina@clinica.com",
        foto: "lolabunny.jpg",
      },
      {
        id: 6,
        nombre: "Dr. Benjamín Anselmo Mento",
        especialidad: "Psicología",
        telefono: "2246-000006",
        email: "benjamin@clinica.com",
        foto: "correcamino.png",
      },
    ];
    localStorage.setItem("medicos", JSON.stringify(medicosIniciales));
    console.log("Medicos ya existen en el LocalStorage");
  } else {
    console.log("LocalStorage ya contiene médicos");
  }
};
