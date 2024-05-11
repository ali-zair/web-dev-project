import React, { useState, useEffect } from 'react'
import TableRow from '@/app/components/TableRow'
import styles from '@/app/page.module.css'

export default function Table() {

	const [itemTitles, setItemTitles] = useState([])
	const [totalAmounts, setTotalAmounts] = useState([])

	useEffect(() => {
		fetch('/api/stats?totalAmountOfPurchases=true').
			then(res => res.json()).
			then(data => {
				setItemTitles(data?.itemTitles || []);
				setTotalAmounts(data?.totalAmounts || []);
			})
	}, [])

	return (
		<>
			<h2>The Total Amount of Purchases Per Product:</h2>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Product</th>
						<th>Amount in Sales</th>
					</tr>
				</thead>
				<tbody>
					{itemTitles.map((title, index) => {
						return <TableRow key={index} index={index} title={title.title} amount={totalAmounts[index]} />;
					})}
				</tbody>
			</table>
		</>
	)
}
