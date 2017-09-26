new p5(); 

var HEIGHT; 
var WIDTH; 
var riseTime;
var setTime;
var theta;
var time;
var dayColor = '#0099ff';
var nightColor = '#262673';
var sunsetColor = '#ffcccc';

function preload(){

    // dayColor = color('#0099ff');
    // nightColor = color('#262673');
    // sunsetColor = color('#ff9933');

    HEIGHT = windowHeight;
    WIDTH = windowWidth;

// TODO: change this back to just weather.json !!!
    $.get('/api/weather.json', {pass: "sweetboy" }, function(data) {
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
    $.get('/api/sun.json', function(data) {
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
    noLoop();
    // DISABLED FOR TESTING
    riseTime = sessionStorage.getItem('riseTime');
    setTime = sessionStorage.getItem('setTime');
    console.log(riseTime);
    if (riseTime == null) {
        riseTime = 6;
        setTime = 20;
    }

    theta = Theta(time, riseTime, setTime);
}

function draw() {
    if (theta > PI) {
        // console.log('default');
        background(skyColor(theta));
        $(':root').css('--text-color', '#fff5cc');
        // $('body').css('color', 'white');
    } else {
        $(':root').css('--text-color', 'black');
        x = X(theta, WIDTH);
        y = Y(theta, HEIGHT)
        background(skyColor(theta));
        // first layer
        fill(lerpColor(skyColor(theta), color('#ffffff'), .2));
        // fill(26, 163, 255);
        noStroke();
        ellipse(x, y, 255, 255);
        // second layer
        // fill(77, 184, 255);
        fill(lerpColor(skyColor(theta), color('#ffffff'), .4));
        noStroke();
        ellipse(x, y, 220, 220);
        // third layer
        // fill(102, 194, 255);
        fill(lerpColor(skyColor(theta), color('#ffffff'), .5));
        noStroke();
        ellipse(x, y, 200, 200);
        // sun
        fill(255, 204, 0);
        noStroke();
        ellipse(x, y, 150, 150); 
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
    // console.log('scrolling');
    redraw();
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

function skyColor(theta) {
    if (theta > PI)  {
        return lerpColor(color(sunsetColor), color(nightColor), yDisp(theta))
    }
    else {
        return lerpColor(color(sunsetColor), color(dayColor), yDisp(theta));
    }
}

function yDisp(t) {
    return abs((Y(t, HEIGHT) - HEIGHT) / 100);
}