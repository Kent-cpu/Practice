import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import {getStats} from "../http/reportApi";
import {Container, ListGroup} from "react-bootstrap";
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';


ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);


const Stats = () => {
    const [statistics, setStatistics] = useState([]);
    const [dataForBar, setDataForBar] = useState(null);
    const [dataForPie, setDataForPie] = useState(null);

    useEffect(() => {
        getStats().then(stats => {
            if(stats) {
                setStatistics(stats);
                setDataForBar({
                    labels: stats.map(item => item.id),
                    datasets: [
                        {
                            label: 'Количество несоответствий',
                            data: stats.map(item => item["incorrect_answers_count"]),
                            backgroundColor: 'rgba(30,212,212,0.6)',
                        },
                    ],
                });

                setDataForPie({
                    labels: stats.map(item => `Чек лист ${item.id}`),
                    datasets: [
                        {
                            label: 'Количество несоответствий',
                            data: stats.map(item => item["incorrect_answers_count"]),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                        },
                    ],
                })


            }
        }).catch(e => console.log(e));
    }, []);

    const barOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Количество несоответствий',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Номер проверочного листа',
                },
            },
        },
    };


    return (
        <div>
            <Header/>
            <Container>
                <h1 className="mb-3">Статистика</h1>
                <div className="mb-3">
                    <p>Список проблемных областей: </p>
                    <ol>
                        {statistics.map(s => {
                            return <li>{s.title}</li>
                        })}
                    </ol>
                </div>
                <div className="mb-5">
                    {dataForBar && <Bar data={dataForBar} options={barOptions}/>}
                </div>

                {dataForPie  && <Pie data={dataForPie}/>}
            </Container>
        </div>
    );
};

export default Stats;