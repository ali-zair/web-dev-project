'use client'
import Chart from '@/app/components/Chart'
import PieChart from '@/app/components/PieChart'
import Items from '@/app/components/Items'
import Table from '@/app/components/Table'
import styles from '@/app/page.module.css'

export default function page() {

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
			<Items />
		</div>
	)
}
