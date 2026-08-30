const logoutButton = document.getElementById("logoutBtn");

function handleLogout() {
  localStorage.removeItem("userToken");
  sessionStorage.clear();

  window.location.replace("login.html");
}
if (logoutButton) {
  logoutButton.addEventListener("click", handleLogout);
}
