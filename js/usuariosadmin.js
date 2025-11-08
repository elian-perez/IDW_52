
document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("usuariosBody");

  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) throw new Error("Error al obtener los usuarios");

    const data = await response.json();
    const usuarios = data.users;

    tbody.innerHTML = ""; // Limpia el mensaje "Cargando usuarios..."

    usuarios.forEach(user => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${user.id}</td>
        <td>${user.firstName} ${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.age}</td>
      `;
      tbody.appendChild(fila);
    });

  } catch (error) {
    console.error("❌ Error al cargar usuarios:", error);
    tbody.innerHTML = `<tr><td colspan="5" class="text-danger">Error al cargar usuarios.</td></tr>`;
  }
});
