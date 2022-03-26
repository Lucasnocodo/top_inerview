import axios from 'axios'

const getWeather = (city, country) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=ba50cd51050375dfdf9b4745aabcde34&units=metric`)
}
export default getWeather