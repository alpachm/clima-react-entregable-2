import { useState } from 'react'
import './climaCard.css'

const ClimaCard = ({ weather, temp }) => {

  const [changeTemp, setChangeTemp] = useState(false)

  const changeCF = () => {
    setChangeTemp(!changeTemp)
  }

  return (
    <div className='card__clima'>
      <h1>{weather?.name}, {weather?.sys.country}</h1>
      <div className="content__box">
        <div className="left">
          <h3>{weather?.weather[0].description}</h3>
          <div className="box__info">
            <i className='bx bx-wind' ></i>
            <p><span>wind speed:</span> {weather?.wind.speed} M/S</p>
          </div>
          <div className="box__info">
            <i className='bx bxs-cloud' ></i>
            <p><span>clouds:</span> {weather?.clouds.all}%</p>
          </div>
          <div className="box__info">
            <i className='bx bxs-thermometer' ></i>
            <p><span>pressure:</span> {weather?.main.pressure} hPa</p>
          </div>
        </div>
        <div className="right">
          <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
        </div>
      </div>

      <div className="temp">
        {
          changeTemp ? <h3>{temp?.farenheit} °F</h3>
            : <h3>{temp?.celsius} °C</h3>
        }

        <button onClick={changeCF}>Change °F/°C</button>
      </div>
    </div>
  )
}

export default ClimaCard