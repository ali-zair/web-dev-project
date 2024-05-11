'use client'
import React, { useState, useEffect } from 'react'
import Chart from '@/app/components/Chart'
import PieChart from '@/app/components/PieChart'
import Items from '@/app/components/Items'
import Table from '@/app/components/Table'
import styles from '@/app/page.module.css'

export default function page() {

	const [totalAmountPerPurchases, setTotalAmountPerPurchases] = useState([])

	useEffect(() => {
		fetch('/api/stats?totalAmountPerPurchases=true').
			then(res => res.json()).
			then(data => {
				setTotalAmountPerPurchases(data)
				console.log(totalAmountPerPurchases);
			})
	}, [])

	return (
		<div className={`${styles.body} ${styles.main}`}>
			<h1 className={styles.h1}>Welcome to the Statistics of the Cyberian Store</h1>
			<div className={`${styles.pieContainer} ${styles.body}`}>
				<PieChart />
			</div >
			<div className={`${styles.chartContainer} ${styles.body}`}>
				<Chart />
			</div>
			<Table />
			<div>
				<p className={styles.p}>Total Amount Spent Per Purchase: {totalAmountPerPurchases}</p>
			</div>
			<Items />
		</div>
	)
}
