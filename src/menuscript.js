document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
  
    if (menuButton && sidebar && overlay) {
      menuButton.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
      });
  
      overlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
      });
    } else {
      console.error("Один из элементов (menuButton, sidebar, overlay) не найден на странице.");
    }
  });