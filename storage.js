const storage = {
  city: "",
  country: "",
  saveItem() {
    localStorage.setItem("wetherApp-city", this.city);
    localStorage.setItem("wetherApp-country", this.country);
  },
  getItem() {
    this.city = localStorage.getItem("wetherApp-city");
    this.country = localStorage.getItem("wetherApp-country");
  },
};

export default storage;
