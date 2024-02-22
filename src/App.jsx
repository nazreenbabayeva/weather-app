import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [cityname, setCityname] = useState("Baku");
  const [city, setCity] = useState([]);
  const ref = useRef();

  let handleClick = () => {
    const name = ref.current.value;
    setCityname(name);
  };

  //cityname istifadecinin girdiyi value

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=0fb48b1b2fa55ad462c257f2f0edbd31`
    )
      .then((res) => res.json())
      .then((data) =>
        setCity({
          cityname: data.name,
          wheather: data.main.temp,
          desc: data.weather[0].description,
          weather: data.weather[0].main,
          wind: data.wind.speed,
        })
      );
  }, [cityname]);

  return (
    <>
      <input type="text" placeholder="City name" ref={ref} />
      <button onClick={handleClick}>Find</button>
      <div className="container">
        <div className="weather-side">
          <div className="weather-gradient"></div>
          <div className="date-container">
            <h2 className="date-dayname">Tuesday</h2>
            <span className="date-day">{city.desc}</span>
            <i className="location-icon" data-feather="map-pin"></i>
            <span className="location">{city.cityname}</span>
          </div>
          <div className="weather-container">
            <i className="weather-icon" data-feather="sun"></i>
            <h1 className="weather-temp">
              {Math.floor(city.wheather - 273.15)}°C
            </h1>
            <h3 className="weather-desc">{city.weather}</h3>
          </div>
        </div>
        <div className="info-side">
          <div className="today-info-container">
            <div className="today-info">
              <div className="precipitation">
                {" "}
                <span className="title">PRECIPITATION</span>
                <span className="value">0 %</span>
                <div className="clear"></div>
              </div>
              <div className="humidity">
                {" "}
                <span className="title">HUMIDITY</span>
                <span className="value">34 %</span>
                <div className="clear"></div>
              </div>
              <div className="wind">
                {" "}
                <span className="title">WIND</span>
                <span className="value">{city.wind}</span>
                <div className="clear"></div>
              </div>
            </div>
          </div>
          <div className="week-container">
            <ul className="week-list">
              <li className="active">
                <i className="day-icon" data-feather="sun"></i>
                <span className="day-name">Tue</span>
                <span className="day-temp">29°C</span>
              </li>
              <li>
                <i className="day-icon" data-feather="cloud"></i>
                <span className="day-name">Wed</span>
                <span className="day-temp">21°C</span>
              </li>
              <li>
                <i className="day-icon" data-feather="cloud-snow"></i>
                <span className="day-name">Thu</span>
                <span className="day-temp">08°C</span>
              </li>
              <li>
                <i className="day-icon" data-feather="cloud-rain"></i>
                <span className="day-name">Fry</span>
                <span className="day-temp">19°C</span>
              </li>
              <div className="clear"></div>
            </ul>
          </div>
          <div className="location-container">
            <button className="location-button">
              {" "}
              <i data-feather="map-pin"></i>
              <span>Change location</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
