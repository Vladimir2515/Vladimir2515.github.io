$(".toggle-mnu").click(function() {
  $(this).toggleClass("on");
  $("nav").slideToggle();
 });
$(".slider.owl-carousel").owlCarousel({
  items : 4,
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
$('#map').hover(
    function(){
      $(this).attr('src','img/map.png')
    },
    function(){
      $(this).attr('src','img/map_blue.png')
    }
);
$('#pan').hover(
    function(){
      $(this).attr('src','img/pan2.png')
    },
    function(){
      $(this).attr('src','img/pan.png')
    }
)

