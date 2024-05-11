'use client'
import Chart from '@/app/sellers/stats/Chart'
import PieChart from '@/app/sellers/stats/PieChart'
import Items from '@/app/sellers/stats/Items'
import styles from '@/app/page.module.css'

export default function page() {

	return (
		<div className={`${styles.body} ${styles.main}`}>
			<h1 className={styles.h2}>Welcome to the Statistics of the Cyberian Store</h1>
			<div className={`${styles.pieContainer} ${styles.body}`}>
				<PieChart />
			</div >
			<div className={`${styles.chartContainer} ${styles.body}`}>
				<Chart />
			</div>
			<Items />
		</div>
	)
}
