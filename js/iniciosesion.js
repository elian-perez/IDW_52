const adminUsers = { username: "admin", password: "1234" };

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const alerta = document.getElementById("alerta");

  if (user === adminUsers.username && pass === adminUsers.password) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    alerta.classList.remove("d-none");
    setTimeout(() => alerta.classList.add("d-none"), 2500);
  }
});
