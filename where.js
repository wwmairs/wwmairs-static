// client-side javascript for bio page


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
    $('body').css('background', background_color);
    $('body').css('color', color);
});
$.get('sun.json', function(data) {
    console.log(data);
    sunrise = data.sunrise;
    sunset = data.sunset;
    rise_quality = sunrise.features[0].properties.quality;
    set_quality = sunset.features[0].properties.quality;
    switch (set_quality) {
        case "Poor" :
            $('#sunset').append("Tonight the sunset isn't supposed to be great.. oh well.");
            break;
        case "Fair" :
            $('#sunset').append("Tonight's sunset should be OK too.");
            break;
        case "Good" :
            $('#sunset').append("Tonight the sunset is gonna be good! Neat-o!");
            break;
        case "Great" :
            $('#sunset').append("The sunset tonight is supposed to be FAB.  I'll be watching.");
            break;
        default :
            $('#sunset').append("Whoops, there's a bug in my sunset predictor;");

    }
});
