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

export default function Chart() {

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

	const [products, setProducts] = useState([])

	useEffect(() => {
		fetch('http://localhost:3000/api/stats?topThreeProducts=true').
			then(res => res.json()).
			then(data => setProducts(data))
	}, [])

	if (products) {
		const labels = products.titles

		const data = {
			labels,
			datasets: [
				{
					title: 'Top Three Products',
					label: "Number of Sales",
					data: products.topThreeCounts,
					backgroundColor: "rgba(53, 162, 235, 0.5)"
				}
			]
		}

		const options = {
			responsive: true,
			plugins: {
				legend: {
					position: "top"
				},
				title: {
					display: true,
					text: "Top 3 Most Selling Products",
					font: {
						size: 20
					}
				}
			}
		}

		return <Bar options={options} data={data} />

	}

	return <></>
}