// forecast = $.get("https://api.darksky.net/forecast/b98bd842e0894e2f05cb3bc94579718c/37.8267,-122.4233");

// console.log(forecast);


$(".panel").height($(window).height());

$(document).scroll(function() {
  if($(window).scrollTop() + $(window).height() == $(document).height()) {
    $(".navbar").show("blind")
  }
  else $(".navbar").hide("blind")
});
