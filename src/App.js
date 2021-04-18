import { useState, useReducer, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import AQICard from "./AQICard";
import AQIHighlightCard from "./AQIHighlightCard";
import aqiReducer from './aqi-reducer';
import './App.scss'

const client = new W3CWebSocket('wss://city-ws.herokuapp.com');

const App = () => {
  const [state, dispatch] = useReducer(aqiReducer, {});
  const [selectedCity, setSelectedCity] = useState(null);
  
  useEffect(()=>{
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      // console.log(message.data);
      const data = JSON.parse(message.data); 
      data.forEach(({city, aqi}) => console.log(`The AQI of ${city} is ${aqi}`));
      if(Object.values(state).length === 0)
      dispatch({type: 'update', payload: data});
    };
  }, []);

  return (
    <div className="aqi-app">
      <div className="aqi-highlight">
        {selectedCity && <AQIHighlightCard
            city={selectedCity}
            aqi={state[selectedCity]}
            aqiList={state[selectedCity]}
          />
        }
      </div>
      <div className="aqi-cities">
        {Object.entries(state).map(([key, value]) => {
          const aqiList = value.map((data)=> data.aqi);
          const { aqi, time } = value[value.length - 1];
          return (
              <AQICard
                // key={key}
                city={key}
                aqi={aqi}
                time={time}
                aqiList={aqiList}
                onClick={setSelectedCity}
              />)
          })}
        </div>
    </div>
  );
}

export default App;
