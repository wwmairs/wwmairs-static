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
    current_temp = forecast.currently.apparentTemperature;
    pressure = forecast.cuttently.pressure;

    $('#weather').append(current_temp + 'degrees, and the barometric pressure is ' + pressure + 'milibars');
});
