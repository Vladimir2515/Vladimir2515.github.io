
// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__navigation-bar');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}

// Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}

// Slick слайдер
$(document).ready(function () {
  $('.wrapper__slider').slick({
    arrows: false,
    dots: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  });
  $('.wrapper__slider-hide').slick({
    arrows: true,
    dots: false,
    autoplay: false,
    responsive: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]

  });
});