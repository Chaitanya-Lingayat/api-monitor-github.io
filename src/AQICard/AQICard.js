import React from 'react';
import PropTypes from 'prop-types';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import {getColorByAQI, getFormattedTime} from '../utils/aqi-util';
import './AQICard.scss'

const AQICard = ({
    city,
    aqi,
    time,
    aqiList,
    onClick
}) => {
    return (
        <div className="aqi-container" onClick={()=> onClick(city)}>
            <div className="aqi-city">{city}</div>
            <div className="aqi-value" style={{color: getColorByAQI(aqi)}}>{aqi}</div>
            <div className="aqi-time">{getFormattedTime(time)}</div>
            <div className="aqi-timeline">
                <Sparklines data={aqiList} limit={20}>
                    <SparklinesLine color="#1c8cdc" />
                    <SparklinesSpots />
                </Sparklines>
            </div>
        </div>
    )
};

AQICard.propTypes = {
    city: PropTypes.string,
    aqi: PropTypes.string,
    time: PropTypes.number,
    aqiList: PropTypes.arrayOf(PropTypes.shape),
    onClick: PropTypes.func,
}


export default AQICard;
