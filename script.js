// var APIKey = f6c2e49f3912da040024ebc710d849f8;
var searchFormbutton = document.querySelector("#searchForm")
var searchInput = document.querySelector("#citySearch");
var cityRepoContainer = document.querySelector("#cityDisplayArea")
var displayThisCity =  document.querySelector("#cityToDisplay")
var todayWindSpeed = document.querySelector("#windSpeed1");
var todayTemp = document.querySelector("#temp1");
var todayhumid = document.querySelector("#humid1");
var todayIcon = document.querySelector("#icontoday");
var ImageNew = document.querySelector("#imageID");
var TodaysDate =document.querySelector("#todayDate")
var fullDate = dayjs().format('MM/DD/YYYY');
TodaysDate.textContent = fullDate;
var theCityName ='';
var theCityLong;
var theCityLat;

var formSubmitHandler = function (event) {
    event.preventDefault();

    var searchInputValue = searchInput.value.trim();
    if(searchInputValue) {
        getCity(searchInputValue);
        cityRepoContainer.textContent = '';
        searchInput.textContent = '';
    } else {
        alert('Please enter a City');
    }
    
}

var getCity = function (city) {
    var CoordAPIKEY = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',USA&limit=1&appid=f6c2e49f3912da040024ebc710d849f8';

    fetch(CoordAPIKEY)
    .then(function(response){
        if (response.ok) {
            response.json()
            .then(function(data) {
                console.log("City: ", data);
                displayCity(data, city);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to GEOapi');
      });
}

var displayCity = function(repos, search){
    displayThisCity.textContent = search;
    for (var i = 0; i < repos.length; i++) {
        var cityname = repos[i].name;
        var citylong = repos[i].lon;
        var citylat = repos[i].lat;
        theCityName = cityname;
        theCityLong = citylong;
        theCityLat = citylat;
        console.log(cityname, citylong, citylat);
        get5Weather(citylat, citylong);
        getTodayWeather(citylat, citylong);
}
}

var get5Weather = function (lat, long) {
    var weatherAPIKey = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=f6c2e49f3912da040024ebc710d849f8&units=imperial';

    fetch(weatherAPIKey)
    .then(function(response){
        if (response.ok) {
            response.json()
            .then(function(data) {
                console.log("Weather: ", data);
                for(var i = 0; i < data.length; i++) {
                    var cityIcon = data[0].weather[0].icon;
                    var cityTemp = data[0].main.temp;
                    var cityHumid = data[0].main.humidity;
                    var cityWind = data[0].wind.speed;
                    console.log("City Icon: ", cityTemp);
                }
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to weatherAPI');
      });
}
var getTodayWeather = function (lat, long) {
    var todayWeatherAPIKey = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=f6c2e49f3912da040024ebc710d849f8&units=imperial';

    fetch(todayWeatherAPIKey)
    .then(function(response){
        if (response.ok) {
            response.json()
            .then(function(data) {
                console.log("Today Weather: ", data);
                todayWindSpeed.textContent = data.wind.speed;
                todayTemp.textContent = data.main.temp;
                todayhumid.textContent = data.main.humidity;
                var thetodayIcon = data.weather[0].icon;
                ImageNew.src = 'http://openweathermap.org/img/w/'+ thetodayIcon +'.png'
                todayIcon.appendChild(ImageNew);    
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to weatherAPI');
      });
}

searchFormbutton.addEventListener('submit', formSubmitHandler);
