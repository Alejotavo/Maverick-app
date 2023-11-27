import { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./Service/Service";
import { Data } from "./Model/model";
import Logo from "./assets/logo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <Row>
        <Col className="logo-container">
          <Logo />
        </Col>
      </Row>
      <Row>
        <Col className="main">
          <Row className="main-content">
            <Col lg={6}>
              <div>{data?.name}</div>
              <div className="data">{temp}°C</div>
              {data?.weather && (
                <img
                  src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`}
                  alt="Weather Icon"
                />
              )}
            </Col>
            <Col lg={6}>
              <span className="label">Visibilidad</span>
              <div className="data">{data?.visibility}</div>
            </Col>
            <Col lg={6}>
              <span className="label">Humedad:</span>
              <div className="data">{data?.main.humidity}%</div>
            </Col>
            <Col lg={6}>
              <span className="label">Presión: </span>
              <div className="data">{data?.main.pressure}hPa</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default App;
