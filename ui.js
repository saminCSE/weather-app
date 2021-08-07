import storage from "./storage.js";
import weatherData from "./weatherData.js";

const UI = {
  loadSelectors() {
    const cityElm = document.querySelector("#city");
    const cityInfoElm = document.querySelector("#w-city");
    const iconElm = document.querySelector("#w-icon");
    const temperatureElm = document.querySelector("#w-temp");
    const pressureElm = document.querySelector("#w-pressure");
    const humidityElm = document.querySelector("#w-humidity");
    const feelElm = document.querySelector("#w-feel");
    const formElm = document.querySelector("#form");
    const countryElm = document.querySelector("#country");
    const messageElm = document.querySelector("#messageWrapper");

    return {
      cityInfoElm,
      cityElm,
      countryElm,
      iconElm,
      temperatureElm,
      pressureElm,
      feelElm,
      humidityElm,
      formElm,
      messageElm,
    };
  },
  showMessage(msg) {
    const { messageElm } = this.loadSelectors();
    const elm = `<div class='alert alert-danger' id='message'>${msg}</div>`;
    messageElm.insertAdjacentHTML("afterbegin", elm);
    this.hideMessage();
  },
  hideMessage() {
    const messageElm = document.querySelector("#message");
    setTimeout(() => {
      if (messageElm) {
        messageElm.remove();
      }
    }, 2000);
  },
  validateInput(city, country) {
    if (country === "" || city === "") {
      this.showMessage("Please provide valid country and city");
      return false;
    } else {
      return true;
    }
  },
  getInputValues() {
    const { cityElm, countryElm } = this.loadSelectors();
    const country = countryElm.value;
    const city = cityElm.value;

    const isValid = this.validateInput(city, country);

    if (isValid) {
      //setting city and country to weatherData
      weatherData.city = city;
      weatherData.country = country;

      //setting city and country to localStorage
      storage.city = city;
      storage.country = country;

      //saving city and country localStorage
      storage.saveItem();
    }
  },
  getIcon(iconCode) {
    return "https://openweathermap.org/img/w/" + iconCode + ".png";
  },
  printWeather(weatherData) {
    const { main, weather, name: cityName } = weatherData;

    const {
      cityInfoElm,
      temperatureElm,
      pressureElm,
      humidityElm,
      feelElm,
      iconElm,
    } = this.loadSelectors();
    //paint to UI
    cityInfoElm.textContent = cityName;
    temperatureElm.textContent = `Temperature: ${main.temp}°C`;
    pressureElm.textContent = `Pressure: ${main.pressure}Kpa`;
    humidityElm.textContent = `Humidity ${main.humidity}`;
    feelElm.textContent = weather[0].description;
    iconElm.setAttribute("src", this.getIcon(weather[0].icon));
  },
  resetInputValues() {
    const { cityElm, countryElm } = this.loadSelectors();
    cityElm.value = "";
    countryElm.value = "";
  },
  async handleRemoteData() {
    //get remote data
    const { data } = await weatherData.getWeather();

    if (data.cod === "404") {
      UI.showMessage(data.message);
    } else {
      UI.printWeather(data);
    }
  },
  init() {
    const { formElm } = this.loadSelectors();
    formElm.addEventListener("submit", async (e) => {
      e.preventDefault();
      //get the values from input
      this.getInputValues();
      //reset Input values
      this.resetInputValues();
      this.handleRemoteData();
    });

    window.addEventListener("DOMContentLoaded", async () => {
      storage.getItem();
      //city and country from storage
      const city = storage.city;
      const country = storage.country;

      //data source update(if there is no data in localStorage setting default city and country)
      weatherData.city = city ? city : "Dhaka";
      weatherData.country = country ? country : "BD";

      this.handleRemoteData();
    });
  },
};

export default UI;
