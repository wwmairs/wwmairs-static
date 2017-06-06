
$.get('weather.json', {pass: "sweetboy" }, function(data) {
    forecast = JSON.parse(data);
    temp = forecast.currently.apparentTemperature;
    pressure = forecast.currently.pressure;
    clouds = forecast.currently.cloudCover;
    background_color = 'rgba(51, 153, 255, ' + (1 - clouds) + ')';
    color = 'rgba(0, 0, 0, ' + clouds + ')';

    $('#weather').append(temp + ' degrees, and the barometric pressure is ' + pressure + ' milibars.');
    $('#content').css('background', background_color);
    // $('body').css('color', color);
    // $('.nav').css('color', color);
});
$.get('sun.json', function(data) {
    sunrise = data.sunrise;
    sunset = data.sunset;
    rise_quality = sunrise.features[0].properties.quality;
    set_quality = sunset.features[0].properties.quality;
    switch (set_quality) {
        case "Poor" :
            $('#sunset').append("Often there are beautiful sunsets here, but not tonight.");
            break;
        case "Fair" :
            $('#sunset').append("The sunset here is supposed to be OK tonight.");
            break;
        case "Good" :
            $('#sunset').append("Tonight the sunset is gonna be a good one! Neat-o!");
            break;
        case "Great" :
            $('#sunset').append("The sunset tonight is supposed to be FAB.  I'll be watching.");
            break;
        default :
            $('#sunset').append("Whoops, there's a bug in my sunset predictor;");

    }
});
