$(".toggle-mnu").click(function() {
  $(this).toggleClass("on");
  $("nav").slideToggle();
 });
 $('.cherry-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows:false,
      autoplaySpeed: 2000,
       });
   $(function() {
 
$(window).scroll(function() {
 
if($(this).scrollTop() != 0) {
 
$('#toTop').fadeIn();
 
} else {
 
$('#toTop').fadeOut();
 
}
 
});
 
$('#toTop').click(function() {
 
$('body,html').animate({scrollTop:0},800);
 
});
 
});