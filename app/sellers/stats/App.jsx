import { React, useEffect, useState } from "react"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
} from "chart.js"
import { Bar } from "react-chartjs-2"

export default function App() {

	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top"
			},
			title: {
				display: true,
				text: "Chart.js Bar Chart"
			}
		}
	}

	// fetch('http://localhost:3000/api/stats').then(res => res.json()).then(data => {
	// 	const buyers = data
	// })
	// let buyersCountries = []
	// console.log(buyers);
	// for (let i = 0; i < buyers.length; i++) {
	// 	console.log(buyers[i].country);
	// 	buyersCountries.push(buyers[i].country)
	// }
	const [buyers, setBuyers] = useState([])

	useEffect(() => {
		fetch('http://localhost:3000/api/stats').
			then(res => res.json()).
			then(data => setBuyers(data))
	}, [])

	let labels = []
	let yaxis = []
	if (buyers) {
		labels = buyers.map(buyer => buyer.country)
		yaxis = buyers.map(buyer => buyer._count.id)
	}
	console.log(labels);
	console.log(yaxis);

	const data = {
		labels,
		datasets: [
			{
				label: "Count of Buyers",
				data: yaxis,
				backgroundColor: "rgba(53, 162, 235, 0.5)"
			}
		]
	}

	return <Bar options={options} data={data} />
}