// client-side javascript for bio page

$(".pane").height($(window).height());

$(document).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      $(".nav").show("blind")
    }
    else $(".nav").hide("blind")
});


$.get('weather.json', {pass: "sweetboy" }, function(data) {
    forecast = JSON.parse(data);
    temp = forecast.currently.apparentTemperature;
    pressure = forecast.currently.pressure;
    clouds = forecast.currently.cloudCover;
    background_color = 'rgba(51, 153, 255, ' + (1 - clouds) + ')';
    color = 'rgba(0, 0, 0, ' + clouds + ')';

    $('#weather').append(temp + ' degrees, and the barometric pressure is ' + pressure + ' milibars.');
    $('#where').css('background', background_color);
    $('#where').css('color', color);
});
$.get('sun.json', function(data) {
    json = JSON.parse(data);
    sunrise = json.sunrise;
    sunset = json.sunset;
    console.log(sunrise.features[0].properties.quality);
});
