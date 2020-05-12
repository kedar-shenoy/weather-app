import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.api = {
      base: "https://api.openweathermap.org/data/2.5/weather",
      key: "b8c50b6a913ea332d90277f074e3584c",
    };
    this.state = {
      searchedCity: "",
      city: "",
      country: "",
      desc: "",
      temp: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDate = this.getDate.bind(this);
  }

  handleInput(e) {
    this.setState({ searchedCity: e.target.value });
  }

  handleSubmit(e) {
    if (this.state.searchedCity === "") return;
    //log the city for debugging
    console.log(this.state.searchedCity);
    this.setState({
      city: this.state.searchedCity,
    });
    //fetch the weather for that city
    fetch(
      this.api.base +
        "?q=" +
        this.state.searchedCity +
        "&units=metric&appid=" +
        this.api.key
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          country: result.sys.country,
          desc: result.weather[0].description,
          temp: result.main.temp,
        });
      })
      .catch((err) => console.log(err));
    this.setState({
      searchedCity: "",
    });
  }

  getDate() {
    let d = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }

  componentDidMount(prevProps) {
    fetch(this.api.base + "?q=Bangalore&units=metric&appid=" + this.api.key)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          city: "Bangalore",
          country: result.sys.country,
          desc: result.weather[0].description,
          temp: result.main.temp,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <input
            type="text"
            value={this.state.searchedCity}
            onChange={this.handleInput}
            placeholder="Enter a city name..."
          ></input>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <div className="weather-info">
          <div>{this.state.city + ", " + this.state.country}</div>
          <div>{this.getDate()}</div>
          <div className="temp">{this.state.temp}°C</div>
          <div>{this.state.desc}</div>
        </div>
      </div>
    );
  }
}

export default App;
