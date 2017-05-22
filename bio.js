// client-side javascript for bio page

$(".panel").height($(window).height());

$(document).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      $(".navbar").show("blind")
    }
    else $(".navbar").hide("blind")
});


$.get('weather.json', function(data) {
    console.log(data);

    $('#weather').append('Well hi there');
});
