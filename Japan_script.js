var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}


// function to cycle the slides automatically
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
} 


// function to calculate time in Tokyo
function tokyoTime(offset) {

  // create Date object for current location
  d = new Date();
 
  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);
 
  // create new Date object for different city
  // using supplied offset
  nd = new Date(utc + (3600000*offset));
 
  // return time as a string
  //return "The local time in Tokyo is " + nd.toLocaleString();
  document.getElementById("time").innerHTML = nd.toLocaleString();

}

// call function to display the time
tokyoTime('+9');



// function to get the weather in Tokyo
function tokyoWeather() {

  // use fetch to get the weather data from Tokyo
  fetch("http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&units=imperial&appid=153a1ec8f6b54ec52d519c21641a079f")
 
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    displayWeather(data);
  })
  //catch errors
  .catch(function() {
  
  });
}

function displayWeather( d ) {
  
  var icon = d.weather[0].icon
  var img = document.createElement('img'); 
  img.src = 'http://openweathermap.org/img/wn/' + icon + '.png'; 
  //document.getElementById('icon').innerHTML = img;

  document.getElementById('description').innerHTML = d.weather[0].description;
  var temp = Math.round(parseFloat(d.main.temp));
  document.getElementById('temp').innerHTML = 'The current temperature is: ' + temp + '&deg; F';
  var humidity = d.main.humidity;
  document.getElementById('humidity').innerHTML = 'The current humidity is: ' + humidity + "%";
  var hi = d.main.temp_max;
  var lo = d.main.temp_min;
  document.getElementById('wind').innerHTML = 'The current wind speed is: ' + d.wind.speed + " miles/hour";
  document.getElementById('hinlow').innerHTML = 'The high will be ' + hi + '&deg; F, and the low will be '+ lo + '&deg; F';
  //let secs = d.sys.sunrise;
  //let sunrise = new Date(secs*1000);
  //document.getElementById('sunrise').innerHTML = 'The sunrise will be at: ' + sunrise;
  

}

// call function to display the weather
window.onload = function() {
  tokyoWeather();
}



//function to open the images in a pop-up window
function openWindow(image){
  if (document.getElementById) {
     w = screen.availWidth;
     h = screen.availHeight;
  }  
  
  var popW = 1500, popH = 1100;
  
  var leftPos = (w-popW)/2;
  var topPos = (h-popH)/2;
  
  
  
  msgWindow = window.open('','popup','width=' + popW + ',height=' + popH + 
                           ',top=' + topPos + ',left=' + leftPos + ',       scrollbars=yes');
                           msgWindow.document.write ('<HTML><HEAD><TITLE>Centered Window</TITLE></HEAD><BODY><FORM    NAME="form1">' +
    '<img src=" ' + image + '" width="1500" height="1000">'+ '<br>' +
    'Click the button below to close the window.<br />' +
    '<INPUT TYPE="button" VALUE="OK"onClick="window.close();"></FORM></BODY>   </HTML>');
  }

