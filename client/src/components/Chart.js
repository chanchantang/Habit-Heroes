// src/components/Chart.js
import React, {useEffect} from 'react';
import Highcharts from 'highcharts';
import histogramBellcurve from 'highcharts/modules/histogram-bellcurve';

// {/* <script src="https://code.highcharts.com/highcharts.js"></script> */}

const Chart = ({options, container, modules, type = "Chart" }) =>{
    useEffect(() => {
        if(modules){
            modules.forEach(module => {
                module(Highcharts);
            });
        }
        
        // Create the chart instance
        const chart = new Highcharts[type](container, options);

        // Cleanup function to destroy the chart before unmounting
        return() => {
            chart.destroy();
        };
    }, [options, container, modules, type]);
    return <div id={container}></div>;
}

export default Chart;