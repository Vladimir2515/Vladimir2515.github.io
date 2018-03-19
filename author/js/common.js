$(".toggle-mnu").click(function() {
  $(this).toggleClass("on");
  $("nav").slideToggle();
 });
$(".slider.owl-carousel").owlCarousel({
  items : 1,
  nav : true,
  navText : " ",
  loop : true,
  autoplay : true,
  autoplayHoverPause : true,
  fluidSpeed : 800,
  autoplaySpeed : 800,
  navSpeed : 800,
  dotsSpeed : 800,
  dragEndSpeed : 800
 });