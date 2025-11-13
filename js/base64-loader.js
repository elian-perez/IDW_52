// Carga rápido al llegar al SCRITPT
(async () => {
  try {
    const res = await fetch("js/imagenes_base64.json");
    const data = await res.json();

    window.reemplazarImagenes = () => {
      document.querySelectorAll("img[data-src]").forEach(img => {
        let src = img.getAttribute("data-src")
          ?.replace(/^\.?\/*/, "")
          ?.replace(/^img\//, "");

        if (data[src]) {
          img.src = data[src];
          console.log(`Reemplazada desde JSON: ${src}`);
        } else {
          if (!src.startsWith("data:image")) {
            img.src = img.getAttribute("data-src");
          }
        }
      });

      const favicon = document.querySelector('link[rel="icon"][data-src]');
      if (favicon) {
        let src = favicon.getAttribute("data-src")
          ?.replace(/^\.?\/*/, "")
          ?.replace(/^img\//, "");
        if (data[src]) {
          favicon.href = data[src];
          console.log(`Favicon reemplazado: ${src}`);
        }
      }
    };

    window.reemplazarImagenes();

  } catch (err) {
    console.error("Error cargando imágenes Base64:", err);
  }
})();