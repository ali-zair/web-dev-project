import React, { useState, useEffect } from 'react'
import Item from '@/app/components/Item'
import styles from '@/app/page.module.css'

export default function Items() {

	const [items, setItems] = useState([])

	useEffect(() => {
		fetch('http://localhost:3000/api/stats?productsNeverPurchased=true').
			then(res => res.json()).
			then(data => setItems(data))
	}, [])

	return (
		<>
			<h2 className={styles.h2}>Items Never Purchased:</h2>
			<div className={styles.border}>
				{items.map((item, index) => <Item key={index} index={index} item={item} />)}
			</div>
		</>
	)

}
