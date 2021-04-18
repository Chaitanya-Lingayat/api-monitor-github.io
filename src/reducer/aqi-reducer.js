const reducer = (state = {}, {type, payload = []}) => {
    switch (type) {
      case 'update': {
        let newState = {...state}
        payload.forEach(({city, aqi}) => {
            const existingCityData = state[city] || [];
            const newCityData = [...existingCityData, {aqi: aqi.toFixed(2), time: Date.now()}];
            newState = {...newState, [city]: newCityData};
        })
        return  newState;
      }
      default:
        return state;
    }
  }

export default reducer;
