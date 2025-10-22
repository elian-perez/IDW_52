console.log("tema.js cargado correctamente");

const html = document.documentElement;
const btn = document.getElementById("btnTheme");

const savedTheme = sessionStorage.getItem("theme") || "light";
html.setAttribute("data-bs-theme", savedTheme);

actualizarBoton(savedTheme);

btn.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-bs-theme", newTheme);
  sessionStorage.setItem("theme", newTheme);
  actualizarBoton(newTheme);
});

function actualizarBoton(theme) {
  if (theme === "dark") {
    btn.innerHTML = "☀️";
    btn.classList.remove("btn-outline-dark");
    btn.classList.add("btn-outline-light");
  } else {
    btn.innerHTML = "🌙";
    btn.classList.remove("btn-outline-light");
    btn.classList.add("btn-outline-dark");
  }
}
