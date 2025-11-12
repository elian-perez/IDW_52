// 🧩 base64-loader.js
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar el archivo JSON con las imágenes en Base64
    const res = await fetch("js/imagenes_base64.json");
    const data = await res.json();

    // Reemplaza todas las imágenes con atributo data-src
    window.reemplazarImagenes = () => {
      document.querySelectorAll("img[data-src]").forEach(img => {
        let src = img.getAttribute("data-src")
          ?.replace(/^\.?\/*/, "")   // elimina ./ o /
          ?.replace(/^img\//, "");   // elimina el prefijo img/

        if (data[src]) {
          img.src = data[src];
          console.log(`✅ Reemplazada desde JSON: ${src}`);
        } else {
          // Evita mostrar advertencias para imágenes que ya están en formato Base64
          if (!src.startsWith("data:image")) {
            img.src = img.getAttribute("data-src");
            // console.warn(`⚠️ No encontrada en JSON: ${src}`);
          }
        }
      });

      // ---------- Reemplazo del favicon ----------
      const favicon = document.querySelector('link[rel="icon"][data-src]');
      if (favicon) {
        let src = favicon.getAttribute("data-src")
          ?.replace(/^\.?\/*/, "")
          ?.replace(/^img\//, "");
        if (data[src]) {
          favicon.href = data[src];
          console.log(`✅ Favicon reemplazado correctamente: ${src}`);
        }
      }
    };

    // Ejecutar la función inmediatamente al cargar
    window.reemplazarImagenes();

  } catch (err) {
    console.error("❌ Error cargando imágenes Base64:", err);
  }
});
