import React, {useEffect} from 'react'
import PropTypes from 'prop-types';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {getColorByAQI, getFormattedTime} from '../utils/aqi-util';
import './AQIHighlightCard.scss'

const AQIHighlightCard = ({
    city,
    aqiList
}) => {
    useEffect(() => {
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        var data = aqiList;
        chart.data = data;

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        // dateAxis.renderer.minGridDistance = 60;
        dateAxis.tooltip.disabled = true;
        dateAxis.dateFormats.setKey("second", "hh:mm:ss a");
        // dateAxis.label.wrap = true;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "aqi";
        series.dataFields.dateX = "time";
        series.tooltipText = "AQI: {aqi}"

        series.tooltip.pointerOrientation = "vertical";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.snapToSeries = series;
        chart.cursor.xAxis = dateAxis;

        return () => chart.dispose()
    }, [aqiList]);

    const { aqi, time } = aqiList[aqiList.length - 1];
    return (
        <div className="aq-chart">
            <h1 className="aq-chart-city">{city}</h1>
            <h2><span>AQI : </span><span className="aq-chart-aqi" style={{color: getColorByAQI(aqi)}}>{aqi}</span></h2>
            <div>updated: {getFormattedTime(time)}</div>
            <div id={`chartdiv`} className="chart-div" style={{ width: '100%', height: '255px' }} />
        </div>
    )
}

AQIHighlightCard.propTypes = {
    city: PropTypes.string,
    aqiList: PropTypes.arrayOf(PropTypes.shape)
}

export default AQIHighlightCard;
