document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const alerta = document.getElementById("alerta");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Error en las credenciales");

      const data = await response.json();
      const userResponse = await fetch(`https://dummyjson.com/users/${data.id}`);
      const userData = await userResponse.json();

      if (userData.role !== "admin") {
        alerta.textContent = "⚠️ Acceso restringido: solo administradores pueden ingresar.";
        alerta.classList.remove("d-none");
        return;
      }

      sessionStorage.setItem("accessToken", data.accessToken || data.token);
      sessionStorage.setItem("user", JSON.stringify(userData));

      window.location.href = "paneladmin.html";

    } catch (error) {
      alerta.classList.remove("d-none");
      alerta.textContent = "❌ Usuario o contraseña incorrectos.";
    }
  });
});




