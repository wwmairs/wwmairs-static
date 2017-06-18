new p5(); 

function preload(){

    $.get('weather.json', {pass: "sweetboy" }, function(data) {
        forecast = JSON.parse(data);
        temp = forecast.currently.apparentTemperature;
        pressure = forecast.currently.pressure;
        clouds = forecast.currently.cloudCover;
        background_color = 'rgba(51, 153, 255, ' + (1 - clouds) + ')';
        riseDate = new Date(forecast.daily.data[0].sunriseTime * 1000);
        setDate  = new Date(forecast.daily.data[0].sunsetTime * 1000);
        sessionStorage.setItem('riseTime', riseDate.getHours());
        sessionStorage.setItem('setTime', setDate.getHours());
        // console.log(sessionStorage.getItem('setTime'));

        $('#weather').append(temp + ' degrees, and the barometric pressure is ' + pressure + ' milibars.');

        // $('body').css('background', background_color);
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
}

function setup() {
    const HEIGHT = windowHeight;
    const WIDTH = windowWidth;
    var time = hour();
    createCanvas(WIDTH, HEIGHT);

    var riseTime = sessionStorage.getItem('riseTime');
    var setTime = sessionStorage.getItem('setTime');

    var theta = Theta(time, riseTime, setTime);

    if ((time - riseTime) > 0 &&
        (setTime - time) > 0) {
        background(51, 153, 255);
        fill(255, 204, 0);
        noStroke();
        ellipse(X(theta, WIDTH), Y(theta, HEIGHT), 100, 100); 
    } else {
        background('#262673');
    }
}

function draw() {
}

function Theta(t, r, s) {
    var theta = (t - r) / (s - r) * PI;
    return theta;
}

function X(theta, width) {
    var x = cos(theta);
    // x ranging from 1 to -1
    x = x + 1;
    // x ranging from 0 to 2
    return width - ((x / 2) * width);
}

function Y(theta, height) {
    var y = sin(theta);
    return height - (y * (height / 2));
}

// console.log($('#defaultCanvas0')[0]);
// var src = ($('#defaultCanvas0')[0]).toDataURL("image/png");

// document.body.style.background = "url(" + src + ")";
