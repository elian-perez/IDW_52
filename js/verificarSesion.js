document.addEventListener("DOMContentLoaded", () => {
  const token = sessionStorage.getItem("accessToken");
  const userData = sessionStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  // 🔒 Verificación de sesión
  if (!token || !user || user.role !== "admin") {
    window.location.href = "iniciosesion.html";
    return;
  }

  const nombreUsuario = document.getElementById("nombreUsuario");
  const saludoUsuario = document.getElementById("saludoUsuario");

  if (nombreUsuario) {
    nombreUsuario.textContent = user.username || `${user.firstName} ${user.lastName}`;
  }

  if (saludoUsuario) {
    saludoUsuario.textContent = `👋 Bienvenido, ${user.firstName} ${user.lastName}`;
  }
});
