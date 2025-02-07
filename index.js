import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useState} from 'react';

const inter=Inter({subsets:['latin']})

export default function Home() {
  const [location, setlocation] = useState("")
  const [weather,setWeather]=useState('')
  const getWeather=async()=>
  {
    const api_key=' 51ac52b91e4b4cf9b15182422252801'
    const api_url='http://api.weatherapi.com/v1/current.json?key=' +api_key +'&q=' + location
    if(location)
    {
      try
      {const res = await fetch(api_url);
        const data = await res.json();
        if (data) {
          const api_data=
          {
            country: data.location.country,
            city: data.location.name,
            temp:data.current.temp_f,
            humidity:data.current.humidity,
            wind:data.current.wind_mph,
            gust:data.current.gust_mph,
            visibility:data.current.vis_miles,
            condition:data.current.condition.text,
            image:data.current.condition.icon
          }
          setWeather(<>
          <div className='text-center text-2xl p-2'>{api_data.city}</div>
     <div className='flex justify-center'>
      <div className='flow-root'>
        <div className='float-left'>
          <image src={api_data.image} width='80' height='80' alt='condition' />
          </div>
        <div className='float-left text-6xl degrees'>{api_data.temp}</div>
          </div>
        </div>
        <div className='text-center text-gray-400'>{api_data.condition}</div>
        <div className='flow-root p-2'>
          <div className='float-left text-gray-400'>Humidity:{api_data.humidity}%</div>
          <div className='float-right text-gray-400'>Wind:{api_data.wind}mph</div>
          <div className='float-left text-gray-400'>Visibility:{api_data.visibility}mi</div>
          <div className='float-right text-gray-400'>Gust:{api_data.gust}mph</div>
        </div></>)
        }
      }catch(err)
      {
        console.log(err)
      }
    }
    else
    {
    }
  }
  
  return (
    <>
    <nav className='flex item-center justify-center py-4 bg-gray-300 w-full m-0 opacity-80'>
<div className='relative'>
  <input className="block bg-slat-900 text-black rounded-lg opacity-500 pl-10 p-3" 
  type="text" id="location" value={location} onChange={(e)=>setlocation(e.target.value)} placeholder="Location(ie. Islamabad)"/>
</div>
<button onClick={getWeather} className="bg-blue-500 hover:bg-blue-400 text-white font-bold m-1 p-1.5 rounded-lg" id="search">
Search
  </button>
    </nav>
    {weather &&
    <div className="flex w-full p-20 justify-center">
      <div className="w-full max-w-xs">
        <div className="mb-4">
          <div className="bg-black shadow-lg rounded-3xl text-white px-8 pt-6 pb-8 mb-4 opacity-80">
     {weather}
      </div>
    </div>
    </div>
    </div>
}
    </>
   )
}
