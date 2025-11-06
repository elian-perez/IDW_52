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
        body: JSON.stringify({
          username, 
          password, 
        }),
      });

      if (!response.ok) {
        throw new Error("Error en las credenciales");
      }

      const data = await response.json();

      // ✅ Guardar token y datos de usuario
      sessionStorage.setItem("accessToken", data.token);
      sessionStorage.setItem("user", JSON.stringify(data));

      console.log("✅ Sesión iniciada:", data);

      // Redirigir al panel de administración
      window.location.href = "paneladmin.html";
    } catch (error) {
      console.error("❌ Error de login:", error);
      alerta.classList.remove("d-none");
    }
  });
});

