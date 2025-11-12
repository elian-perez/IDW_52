document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("js/imagenes_base64.json");
  const data = await res.json();

  document.querySelectorAll("img[data-src]").forEach(img => {
    let src = img.getAttribute("data-src").replace(/^\.?\/*/, "").replace(/^img\//, "");
    if (data[src]) {
      img.src = data[src];
        console.log(`✅ Reemplazada: ${src}`);
    } else {
      img.src = img.getAttribute("data-src"); // fallback
    }
  });
});
