import React from 'react'
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler, ArcElement, scales } from "chart.js";
import { getLast7Days } from '../../lib/Features';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler, ArcElement
);

const labels = getLast7Days();

const LineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            }
        }
    }
}

const LineChart = ({ value = [] }) => {
    const data = {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels,
        datasets: [
            {
                label: 'My First Dataset',
                data: value,
                fill: false,
                backgroundColor: 'rgba(75, 12, 192, 0.2)',
                borderColor: 'rgba(75, 12, 192, 1)',
            },
        ],
    }
    return <Line data={data} options={LineChartOptions} />
}

const DoughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    cutout: '60%',
}

const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
        datasets: [
            {
                data: value,
                backgroundColor: ['rgba(75, 12, 192, 0.2)', "#FFA500"],
                borderColor: ['rgba(75, 12, 192, 0.2)', "#FFA500"],
                offset: 10,
            }
        ]
    }
    return <Doughnut style={{
        zIndex: 99
    }} data={data} options={DoughnutChartOptions} />
}

export { LineChart, DoughnutChart }