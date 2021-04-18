import moment from 'moment';

const getColorByAQI = (aqi) => {
    if(aqi >= 0 && aqi < 51) return "#55A84F";
    if(aqi >= 51 && aqi < 101) return "#A3C853";
    if(aqi >= 101 && aqi < 201) return "#FFF833";
    if(aqi >= 201 && aqi < 301) return "#F29C33";
    if(aqi >= 301 && aqi < 401) return "#E93F33";
    if(aqi >= 401 && aqi < 501) return "#AF2D24";
    return "#000"
}

const getFormattedTime = (timeStamp) => {
    const time = moment(timeStamp);
    const currentTime = moment(Date.now());
    let days = time.diff(currentTime, 'days');
    let hours = time.diff(currentTime, 'hours');

    if(days === 0 && hours === 0)
    return time.fromNow()
    else 
    return moment(time).format("h:mm a");
}


export {
    getColorByAQI,
    getFormattedTime
}
