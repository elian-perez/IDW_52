import { inicializarDatos } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("obras.js (Base64 compatible) cargado correctamente");
  inicializarDatos();

  const tablaObras = document.getElementById("tablaObras");
  const formObra = document.getElementById("formObra");
  const btnNueva = document.getElementById("btnNueva");
  const modal = new bootstrap.Modal(document.getElementById("modalObra"));
  const idObra = document.getElementById("idObra");
  const nombreObra = document.getElementById("nombreObra");
  const descripcionObra = document.getElementById("descripcionObra");
  const imagenInput = document.getElementById("imagenObra");
  const imagenFile = document.getElementById("imagenFile");
  const preview = document.getElementById("previewImagen");

  let obras = JSON.parse(localStorage.getItem("obras")) || [];

  // Función para convierte archivo a Base64
  function fileToBase64(inputFile) {
    return new Promise((resolve) => {
      const file = inputFile.files[0];
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  // Muestra obras sociales
  const mostrarObras = () => {
    obras = JSON.parse(localStorage.getItem("obras")) || [];
    tablaObras.innerHTML = "";

    obras.forEach((o, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${o.id}</td>
        <td>${o.nombre}</td>
        <td>${o.descripcion}</td>
        <td>
          <img data-src="${o.imagen?.startsWith('data:image') ? '' : 'img/'}${o.imagen}" 
               src="${o.imagen?.startsWith('data:image') ? o.imagen : ''}" 
               width="80" class="rounded mb-1">
        </td>
        <td>
          <button class="btn btn-warning btn-sm btnEditar" data-index="${i}">Editar</button>
          <button class="btn btn-danger btn-sm btnEliminar" data-index="${i}">Eliminar</button>
        </td>
      `;
      tablaObras.appendChild(fila);
    });

    
    if (window.reemplazarImagenes) window.reemplazarImagenes();
  
    if (!sessionStorage.getItem("obrasSync")) {
      sessionStorage.setItem("obrasSync", "1");
      window.dispatchEvent(new StorageEvent("storage", { key: "obras" }));
      setTimeout(() => sessionStorage.removeItem("obrasSync"), 100);
    }
  };

  mostrarObras();

  // Nueva obra 
  btnNueva.addEventListener("click", () => {
    formObra.reset();
    preview.src = "";
    preview.classList.add("d-none");
    idObra.value = "";
    modal.show();
  });

 
  imagenFile.addEventListener("change", async () => {
    const base64 = await fileToBase64(imagenFile);
    if (base64) {
      preview.src = base64;
      preview.classList.remove("d-none");
    }
  });

  // ALTA obra social
  formObra.addEventListener("submit", async (e) => {
    e.preventDefault();

    let imagenFinal = imagenInput.value.trim() || "default.jpg";
    const nuevaBase64 = await fileToBase64(imagenFile);

    if (nuevaBase64) imagenFinal = nuevaBase64;

    const nuevaObra = {
      id: idObra.value
        ? parseInt(idObra.value)
        : obras.length
        ? obras[obras.length - 1].id + 1
        : 1,
      nombre: nombreObra.value.trim(),
      descripcion: descripcionObra.value.trim(),
      imagen: imagenFinal
    };

    if (idObra.value) {
    const i = obras.findIndex(o => o.id === parseInt(idObra.value));
    const nombreAnterior = obras[i].nombre;
    obras[i] = nuevaObra;
    console.log(`Obra actualizada: ${nuevaObra.nombre}`);

    
    let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    medicos = medicos.map(m => {
      if (m.obrasSociales?.includes(nombreAnterior)) {
        m.obrasSociales = m.obrasSociales.map(os =>
          os === nombreAnterior ? nuevaObra.nombre : os
        );
      }
      return m;
    });
    localStorage.setItem("medicos", JSON.stringify(medicos));
    console.log(`Médicos actualizados con el nuevo nombre de obra social`);
  } else {
    obras.push(nuevaObra);
    console.log(`Obra agregada: ${nuevaObra.nombre}`);
  }

    localStorage.setItem("obras", JSON.stringify(obras));
    mostrarObras();
    window.reemplazarImagenes(); 
    modal.hide();
  });

  // Editar & Eliminar 
  tablaObras.addEventListener("click", (e) => {
    const i = e.target.dataset.index;

    if (e.target.classList.contains("btnEditar")) {
      const o = obras[i];
      idObra.value = o.id;
      nombreObra.value = o.nombre;
      descripcionObra.value = o.descripcion;
      imagenInput.value = o.imagen?.startsWith("data:image") ? "" : o.imagen;

     
      if (o.imagen?.startsWith("data:image")) {
        preview.src = o.imagen;
        preview.classList.remove("d-none");
      } else {
        preview.classList.add("d-none");
      }

      modal.show();
    }

    if (e.target.classList.contains("btnEliminar")) {
      if (confirm(`¿Eliminar la obra social "${obras[i].nombre}"?`)) {
        obras.splice(i, 1);
        localStorage.setItem("obras", JSON.stringify(obras));
        mostrarObras();
      }
    }
  });

  
  window.addEventListener("storage", event => {
    if (event.key === "obras") {
      mostrarObras();
    }
  });
});







