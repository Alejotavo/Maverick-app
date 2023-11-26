import { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./Service/Service";
import { Data } from "./Model/model";
import Logo from "./Resources/logo";

function App() {
  const [data, setData] = useState<Data>();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported");
      }
    };

    getLocation();

    if (latitude !== null && longitude !== null) {
      fetchData()
        .then((response) => {
          setData(response);
          if (response.main && response.main.temp !== undefined) {
            const roundedTemperature = Math.round(response.main.temp - 273.15);
            setTemp(roundedTemperature);
          } else {
            console.error("No se pudo obtener la temperatura");
          }
        })
        .catch((error) => {
          console.error("Hubo un error al obtener los datos:", error);
        });
    }
  }, []);

  return (
    <>
      <Logo />
      <h4>Weather App</h4>
      <div>{data?.name}</div>
      <p>Visibility:{data?.visibility}</p>
      <p>La temperatura actual es: {temp}°C</p>
      <p>Humedad: {data?.main.humidity}%</p>
      <p>Presión: {data?.main.pressure}hPa</p>
    </>
  );
}

export default App;
