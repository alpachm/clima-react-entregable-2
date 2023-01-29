import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Video from './assets/nubes.mp4'
import ClimaCard from './components/ClimaCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj);
    }

    navigator.geolocation.getCurrentPosition(success);
  }, [])

  useEffect(() => {
    if (coords) {
      const APIkey = 'a2eb8ed09db98ad426213b6782d97d02'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`
      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
          }
          setTemp(obj)
          setTimeout(() => {
            setIsLoading(false)
          }, 3000);
        })
        .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className="App">
      {
        isLoading ? <h1>Loading...</h1>
          : <ClimaCard
            weather={weather}
            temp={temp}
          />
      }
      <video muted autoPlay loop><source src={Video} /></video>

    </div>
  )
}

export default App
