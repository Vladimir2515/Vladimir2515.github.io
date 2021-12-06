
$(document).ready(function() { // Ждём загрузки страницы
$(".popup_bg").click(function(){    // Событие клика на затемненный фон      
$(".popup").fadeOut(800);    // Медленно убираем всплывающее окно
});
});

function showPopup() {
$(".popup").fadeIn(800); // Медленно выводим изображение
}