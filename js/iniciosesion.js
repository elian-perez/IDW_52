// Usuario administrador permitido
const adminUsers = { username: "acme", password: "saraza" };

// Escucha del formulario
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const alerta = document.getElementById("alerta");

  // Validación de credenciales
  if (user === adminUsers.username && pass === adminUsers.password) {
    // Guardar sesión persistente
    localStorage.setItem("isLoggedIn", "true");

    // Redirigir al panel de administración
    window.location.href = "paneladmin.html";
  } else {
    // Mostrar alerta si las credenciales son incorrectas
    alerta.classList.remove("d-none");
    setTimeout(() => alerta.classList.add("d-none"), 2500);
  }
});

// Si ya está logueado, ir directo al panel
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "paneladmin.html";
}
