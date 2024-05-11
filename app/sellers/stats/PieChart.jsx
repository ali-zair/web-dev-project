import { React, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {

	const [buyers, setBuyers] = useState([])

	useEffect(() => {
		fetch('http://localhost:3000/api/stats?buyersPerLocation=true').
			then(res => res.json()).
			then(data => setBuyers(data))
	}, [])

	if (buyers) {
		const data = {
			labels: buyers.countries,
			datasets: [
				{
					label: 'Number of Buyers',
					data: buyers.counts,
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
					borderWidth: 1,
				},
			],
		};

		const options = {
			plugins: {
				title: {
					display: true,
					text: 'Buyers per Location (Customer Traffic)',
					font: {
						size: 18,
						weight: 'bold',
					},
				},
			},
		};

		return <Pie data={data} options={options} />;
	}
	return <></>
}

