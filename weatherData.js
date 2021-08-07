///object property, method
const weatherData = {
  city: "",
  country: "",
  API_KEY: "d777b9cd1436c98f958dac1e189e4f09",
  async getWeather() {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.API_KEY}`
      );
      const data = await res.json();

      return {
        data,
      };
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default weatherData;
