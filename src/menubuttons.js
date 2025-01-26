document.addEventListener("DOMContentLoaded", function () {
  // Находим кнопки меню
  const wokButton = document.getElementById("wokButton");
  const saladsButton = document.getElementById("saladsButton");
  const rolesButton = document.getElementById("rolesButton");
  const soupesButton = document.getElementById("soupesButton");

  // Находим секции с категориями
  const wokSection = document.querySelector(".wok");
  const saladsSection = document.querySelector(".salads");
  const rolesSection = document.querySelector(".roles");
  const soupesSection = document.querySelector(".soupes");

  // Проверяем, что все элементы существуют
  if (
    wokButton &&
    saladsButton &&
    rolesButton &&
    soupesButton &&
    wokSection &&
    saladsSection &&
    rolesSection &&
    soupesSection
  ) {
    // Функция для скрытия всех секций
    function hideAllSections() {
      wokSection.style.display = "none";
      saladsSection.style.display = "none";
      rolesSection.style.display = "none";
      soupesSection.style.display = "none";
    }

    // Показываем только секцию "Воки" по умолчанию
    hideAllSections();
    wokSection.style.display = "block";

    // Обработчики кликов на кнопки
    wokButton.addEventListener("click", function () {
      hideAllSections();
      wokSection.style.display = "block";
    });

    saladsButton.addEventListener("click", function () {
      hideAllSections();
      saladsSection.style.display = "block";
    });

    rolesButton.addEventListener("click", function () {
      hideAllSections();
      rolesSection.style.display = "block";
    });

    soupesButton.addEventListener("click", function () {
      hideAllSections();
      soupesSection.style.display = "block";
    });
  } else {
    console.error(
      "Один из элементов (кнопки или секции) не найден на странице."
    );
  }
});
