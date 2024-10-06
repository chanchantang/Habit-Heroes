import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import histogramBellcurve from 'highcharts/modules/histogram-bellcurve';

histogramBellcurve(Highcharts); // Initialize the module

const HistogramChart = () => {
    useEffect(() => {
        Highcharts.chart('container', {
            chart: {
                type: 'bellcurve' // Specify the chart type
            },
            title: {
                text: 'Bellcurve Histogram'
            },
            xAxis: {
                title: {
                    text: 'Value'
                }
            },
            yAxis: {
                title: {
                    text: 'Frequency'
                }
            },
            series: [{
                name: 'Histogram',
                type: 'histogram',
                baseSeries: 's1', // Link this series to the base series
                zIndex: 1
            }, {
                name: 'Bellcurve',
                type: 'bellcurve',
                baseSeries: 's1', // Link to the base series
                zIndex: 2,
                marker: {
                    enabled: false
                }
            }, {
                name: 'Data',
                type: 'scatter',
                id: 's1',
                data: [/* Your data here */],
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: 'Frequency: {point.y}'
                }
            }]
        });
    }, []);

    return <div id="container" style={{ height: '400px' }}></div>;
};

export default HistogramChart;
