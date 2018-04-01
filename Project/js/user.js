$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 1500,
      max: 50000000,
      values: [ 13847535,33071497 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "from "+"$" + ui.values[ 0 ] + " to "+ "$" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "from "+"$" + $( "#slider-range" ).slider( "values", 0 ) +
       " to "+"$" + $( "#slider-range" ).slider( "values", 1 ) );
  } );

$(".toggle-mnu").click(function() {
  $(this).toggleClass("on");
  $("nav").slideToggle();
 });