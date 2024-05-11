import React from 'react'

export default function Item({ index, item }) {
	return (
		<p>{index + 1}. {item.title}</p>
	)
}
