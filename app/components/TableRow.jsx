import React from 'react'

export default function TableRow({ index, title, amount }) {

	console.log(amount);

	return (
		<tr>
			<td>{index + 1}. {title}</td>
			<td>{amount}</td>
		</tr>
	)
}
