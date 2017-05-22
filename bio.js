// client-side javascript for bio page

$(".panel").height($(window).height());

$(document).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      $(".navbar").show("blind")
    }
    else $(".navbar").hide("blind")
});


$.get('weather.json', function(data) {
    forecast = JSON.parse(data);
    temp = forecast.currently.apparentTemperature;
    pressure = forecast.currently.pressure;
    clouds = forecast.currently.cloudCover;

    $('#weather').append(temp + ' degrees, and the barometric pressure is ' + pressure + ' milibars.');
    $('#where').css('background', 'rgba(0, 0, 255, 0)');
    $('#where').css('color', 'rgba(0, 0, 0, ' + clouds + ')');
});
