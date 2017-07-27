new p5(); 

var HEIGHT; 
var WIDTH; 
var riseTime;
var setTime;
var theta;
var time;

function preload(){

    HEIGHT = windowHeight;
    WIDTH = windowWidth;

// TODO: change this back to just weather.json !!!
    $.get('10.0.0.248/weather.json', {pass: "sweetboy" }, function(data) {
        forecast = JSON.parse(data);
        temp = forecast.currently.apparentTemperature;
        pressure = forecast.currently.pressure;
        clouds = forecast.currently.cloudCover;
        background_color = 'rgba(51, 153, 255, ' + (1 - clouds) + ')';
        riseDate = new Date(forecast.daily.data[0].sunriseTime * 1000);
        setDate  = new Date(forecast.daily.data[0].sunsetTime * 1000);
        riseTime = riseDate.getHours();
        setTime = riseDate.getHours();
        riseTime = sessionStorage.setItem('riseTime', riseDate.getHours());
        setTime = sessionStorage.setItem('setTime', setDate.getHours());
        // console.log(sessionStorage.getItem('setTime'));

        $('#weather').append(temp + ' degrees, and the barometric pressure is ' + pressure + ' milibars.');

        // $('body').css('background', background_color);
    });
    console.log(riseTime);

// TODO: change this back to just sun.json !!!
    $.get('10.0.0.248/sun.json', function(data) {
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
    time = hour();
    createCanvas(WIDTH, HEIGHT);
    riseTime = sessionStorage.getItem('riseTime');
    setTime = sessionStorage.getItem('setTime');

    theta = Theta(time, riseTime, setTime);
}

function draw() {
    console.log('in draw');
    if (theta > PI) {
        console.log('default');
        background('#262673');
        $('body').css('color', 'white');
    } else {
        background(0, 153, 255);
        fill(255, 204, 0);
        noStroke();
        ellipse(X(theta, WIDTH), Y(theta, HEIGHT), 100, 100); 
    }
}

function windowResized() {
    WIDTH = windowWidth;
    HEIGHT = windowHeight;
    resizeCanvas(WIDTH, HEIGHT);
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

function mouseWheel(event) {
    updateTheta(event.delta / 100);
    //uncomment to block page scrolling
    //return false;
}

function updateTheta(num) {
    theta += num;
    while (theta < 0) {
        theta += TWO_PI;
    }
    theta = theta % TWO_PI;
}