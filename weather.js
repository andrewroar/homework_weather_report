//Value of the search bar

let city = $("#weather-search-bar").val();

//

$(document).ready(function () {
  //////////////Render Search History to the side bar////////////////
  function renderHistory() {
    keys = Object.keys(localStorage);

    renderWeather();

    keys.forEach((element) => {
      ///I use the local storage to save the last search recent so this is
      if (element !== "lastSearchedCity") {
        let history = $("<li>").text(element).addClass("recentHistory");
        $("#recent-history").append(history);
      }
    });

    city = localStorage.getItem("lastSearchedCity");
    renderWeather();
  }

  renderHistory();

  /////////////////////////////////
  function renderWeather() {
    /////////////Render current Weather////////////////////

    var settings_0 = {
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=c1f7f71746ba6e7fda1ac3eca46c4500",
      method: "GET",
    };

    /////FUnction to render the current weather////

    function renderCurrentWeather(dataCurrentWeather) {
      const weatherCityName = dataCurrentWeather.name;
      const weatherCondition = dataCurrentWeather.weather[0].main;
      const weatherTemp = dataCurrentWeather.main.temp;
      const weatherHumidity = dataCurrentWeather.main.humidity;
      const weatherWind = dataCurrentWeather.wind.speed;
      weatherLat = dataCurrentWeather.coord.lat;
      weatherLon = dataCurrentWeather.coord.lon;

      localStorage.setItem("lastSearchedCity", weatherCityName);

      ////////Storage Search City to local storage////

      function saveCityToLocalStorage(item) {
        let localStorageMessage = $("#weather-search-bar").val().toUpperCase();
        let inputbarParentID = $("#weather-search-bar").val().toUpperCase();
        if (localStorage.getItem(localStorageMessage)) {
          //pass
        } else {
          localStorage.setItem(inputbarParentID, localStorageMessage);

          $("#recent-history").append(
            $("<li>").text(localStorageMessage).addClass("recentHistory")
          );
        }
      }

      saveCityToLocalStorage();

      ////////////////////////Append the information to the html///////////////
      $("#current-weather-container")
        .children("h1")
        .html("You can viewing the weather report of: " + weatherCityName);

      $("#current-weather-container-condition").html(
        "Today weather condition is: " + weatherCondition
      );

      $("#current-weather-container-temp").html(
        "Today tempature is: " + weatherTemp + " C"
      );

      $("#current-weather-container-humidity").html(
        "Today humidity is: " + weatherHumidity
      );

      $("#current-weather-container-wind").html(
        "Today windspeed is: " + weatherWind
      );

      //////////////////////Because the UV is existing in another API, I need to call UV API//////////////////////
      //////////////////Now enjoy this spaghetti////////
      const settings_1 = {
        url:
          "http://api.openweathermap.org/data/2.5/uvi?appid=c1f7f71746ba6e7fda1ac3eca46c4500&lat=" +
          weatherLat +
          "&lon=" +
          weatherLon,
        method: "GET",
      };

      function renderUV(dataUV) {
        let weatherUV = dataUV.value;

        $("#current-weather-container-uv").html("Today UV is: " + weatherUV);
        if (weatherUV >= 0 && weatherUV < 3) {
          $("#current-weather-container-uv").css("background-color", "green");
        } else if (weatherUV >= 3 && weatherUV < 6) {
          $("#current-weather-container-uv").css("background-color", "yellow");
        } else if (weatherUV >= 6 && weatherUV < 8) {
          $("#current-weather-container-uv").css("background-color", "orange");
        } else if (weatherUV >= 8 && weatherUV < 11) {
          $("#current-weather-container-uv").css("background-color", "red");
        } else if (weatherUV >= 11) {
          $("#current-weather-container-uv").css("background-color", "purple");
        } else {
          $("#current-weather-container-uv").html("ESCAPE FROM MOTHER EARTH!!");
        }
      }

      $.ajax(settings_1).then(renderUV).catch(errorFunction);

      //////////////////////////////////////////////////////////////////////
    }

    ////////////Error Message when you enter an invalid location///////

    function errorFunction(error) {
      if (city.length != null) {
        $("#current-weather-container")
          .children("h1")
          .html("Error in your search result, Please enter a valid location");
      }
    }

    $.ajax(settings_0).then(renderCurrentWeather).catch(errorFunction);
    ///////////////////////////////////////////////////////////

    ////////////////////////Five day Forecast/////////////////////////////
    var settings_2 = {
      url:
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=c1f7f71746ba6e7fda1ac3eca46c4500",
      method: "GET",
    };

    function searchWeather(data) {
      ///Weather forecast header//

      $("#future-weather-container")
        .children("h1")
        .html("The next five day forecast:")
        .css("margin-right", "80%")
        .css("white-space", "nowrap");

      //////Render day 1 prediction////
      let header_d1 = data.list[3].dt_txt;
      let tempature_d1 = data.list[3].main.temp_max;
      let humidity_d1 = data.list[3].main.humidity;

      $("#day1").children("h3").html(header_d1);

      $("#day1-text").html(
        "Temperature will be " +
          tempature_d1 +
          " the humidity will be " +
          humidity_d1
      );

      let weatherCodeID_d1 = data.list[3].weather[0].id;

      //////////Day 2///////////

      let header_d2 = data.list[11].dt_txt;
      let tempature_d2 = data.list[11].main.temp_max;
      let humidity_d2 = data.list[11].main.humidity;
      $("#day2").children("h3").html(header_d2);

      $("#day2-text").html(
        "Temperature will be " +
          tempature_d2 +
          " the humidity will be " +
          humidity_d2
      );

      let weatherCodeID_d2 = data.list[11].weather[0].id;

      ////////day 3//////////
      let header_d3 = data.list[19].dt_txt;
      let tempature_d3 = data.list[19].main.temp_max;
      let humidity_d3 = data.list[19].main.humidity;
      $("#day3").children("h3").html(header_d3);

      $("#day3-text").html(
        "Temperature will be " +
          tempature_d3 +
          " the humidity will be " +
          humidity_d3
      );

      let weatherCodeID_d3 = data.list[19].weather[0].id;

      //////day4//////
      let header_d4 = data.list[27].dt_txt;
      let tempature_d4 = data.list[27].main.temp_max;
      let humidity_d4 = data.list[27].main.humidity;
      $("#day4").children("h3").html(header_d4);

      $("#day4-text").html(
        "Temperature will be " +
          tempature_d4 +
          " the humidity will be " +
          humidity_d4
      );

      let weatherCodeID_d4 = data.list[27].weather[0].id;

      /////day 5////////
      let header_d5 = data.list[35].dt_txt;
      let tempature_d5 = data.list[35].main.temp_max;
      let humidity_d5 = data.list[35].main.humidity;
      $("#day5").children("h3").html(header_d5);

      $("#day5-text").html(
        "Temperature will be " +
          tempature_d5 +
          " the humidity will be " +
          humidity_d5
      );

      let weatherCodeID_d5 = data.list[35].weather[0].id;
      ///////////////////////Render the icon of the weather////////////////////////
      ////////////Whoever make me do this, I hate you/////

      for (i = 1; i < 6; i++) {
        let LoopedweatherCodeID = eval("weatherCodeID_d" + i);

        if (LoopedweatherCodeID == 800) {
          $("#day" + i)
            .children("img")
            .attr("src", "http://openweathermap.org/img/wn/01d@2x.png");
        } else if (LoopedweatherCodeID == 801) {
          $("#day" + i)
            .children("img")
            .attr("src", "http://openweathermap.org/img/wn/02d@2x.png");
        } else if (LoopedweatherCodeID == 802) {
          $("#day" + i)
            .children("img")
            .attr("src", "http://openweathermap.org/img/wn/03d@2x.png");
        } else if (LoopedweatherCodeID == 804 || LoopedweatherCodeID == 803) {
          $("#day" + i)
            .children("img")
            .attr("src", "http://openweathermap.org/img/wn/04d@2x.png");
        } else if (LoopedweatherCodeID >= 200 && LoopedweatherCodeID <= 232) {
          $("#day" + i)
            .children("img")
            .attr("src", "http://openweathermap.org/img/wn/11d@2x.png");
        } else if (
          (LoopedweatherCodeID >= 300 && LoopedweatherCodeID <= 321) ||
          (LoopedweatherCodeID >= 520 && LoopedweatherCodeID <= 531)
        ) {
          $("#day" + i)
            .children("img")
            .attr("src", "http://openweathermap.org/img/wn/09d@2x.png");
        } else if (LoopedweatherCodeID >= 500 && LoopedweatherCodeID <= 504) {
          $("#day" + i)
            .children("img")
            .attr("src", "http://openweathermap.org/img/wn/10d@2x.png");
        } else if (LoopedweatherCodeID >= 600 && LoopedweatherCodeID <= 622) {
          $("#day1")
            .children("img")
            .attr("src", "http://openweathermap.org/img/wn/13d@2x.png");
        } else if (LoopedweatherCodeID >= 700 && LoopedweatherCodeID <= 781) {
          $("#day" + i)
            .children("img")
            .attr("src", "http://openweathermap.org/img/wn/50d@2x.png");
        } else {
          $("#day" + i)
            .children("img")
            .attr(
              "alt",
              "I Probably missed something but i cant be asked to fix it"
            );
        }
      }
    }

    $.ajax(settings_2).then(searchWeather).catch(errorFunction);
    ///////////////////////////////////////////////////////////////////
  }

  /////Here are all the click and enter Key////

  $("#search-bar-button").click(function () {
    city = $("#weather-search-bar").val();
    renderWeather();
  });

  $(".recentHistory").click(function () {
    city = $(this).text();
    renderWeather();
  });

  $("#weather-search-bar").keypress(function (e) {
    if (e.which == 13) {
      city = $("#weather-search-bar").val();
      renderWeather();
    }
  });

  function clearHistory() {
    $(".recentHistory").empty();
    localStorage.clear();
  }

  $("#clear-button").click(clearHistory);
});
