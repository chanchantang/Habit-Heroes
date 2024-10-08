// src/components/Metrics.js
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Metrics.css'; // Optional: For custom styling
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Chart from './Chart';
import Histogram from './Histogram'


const Metrics = () => {
    const [showChart, setShowChart] = useState(false);
    const [showHistogram, setShowHistogram] = useState(false);

    // Define your Highcharts options
    const options = {
        title: {
            text: 'My Chart'
        },
        series: [
            {
                name: 'Data 1',
                data: [1, 2, 3, 4, 5]
            }
        ]
    };

    const handleClickChart = () => {
        if(showChart){
            setShowChart(false);
        }
        else{
            setShowChart(true);
        }
    };

    const handleClickHist = () => {
        if(showHistogram){
            setShowHistogram(false);
        }
        else{
            setShowHistogram(true);
        }
    };
    return (
        <div className="page">
            <h1>Metrics</h1>
            <p>This is the page for user metrics</p>
            <button onClick={handleClickChart} class="btn btn-primary">Chart</button>
            <button onClick={handleClickHist} class="btn btn-secondary">Histogram</button>
            {showChart && (
                <Chart options={options} container="chart" />
            )}
            {showHistogram && (
                <Histogram options={options} container="histogram" />
            )}
        </div>
        );
};

export default Metrics;