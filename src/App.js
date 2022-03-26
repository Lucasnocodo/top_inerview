import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import History from './components/History';
import getWeather from './apis/getWeather'

const initResultState = { description: '', main_description: '', humidity: -1, temp_max: -1, temp_min: -1, dateTime: '' }

function App() {
  console.log('main render')
  const [result, setResult] = useState(initResultState)
  const [isLoading, setIsLoading] = useState(false)
  const [init, setInit] = useState(true)

  const dataParser = (data) => {
    const { weather, main, sys, name, cod } = data
    const { description, main: main_description } = weather[0]
    const { humidity, temp_max, temp_min } = main
    const { country } = sys
    const dateTime = new Date().toLocaleString()
    return { city: name, country, description, main_description, humidity, temp_max, temp_min, dateTime, cod }
  }

  const handleSearch = (city, country) => {
    setIsLoading(true)
    getWeather(city, country)
      .then((res) => {
        setIsLoading(false)
        setResult(dataParser(res.data))
        localStorage.setItem(`data_${Date.now()}`, JSON.stringify({ ...dataParser(res.data), city, country }))
      }).catch((err) => {
        const { cod, message } = err.response.data
        setResult({ cod, message })
        setIsLoading(false)
      });
    setInit(false)
  }



  return (
    <div className="App">
      <Header />
      <Search
        result={result}
        handleSearch={handleSearch}
        init={init}
        isLoading={isLoading} />
      <History
        setResult={setResult}
        handleSearch={handleSearch}
        result={result}
      />
    </div>
  );
}

export default App;
