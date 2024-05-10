import itemsRepo from "@/app/repo/items-repo"

// GET request to get all the items in the database
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const id = parseInt(searchParams.get('id'))
		// const features = searchParams.get('features')
		// if (features) {
		// 	const items = await itemsRepo.getItems()
		// 	const filteredItems = items.filter((item) =>
		// 		item.title.toLowerCase().includes(features.toLowerCase())
		// 	)
		// 	return Response.json(filteredItems, { status: 200 })
		// }
		if (id) {
			const item = await itemsRepo.getItem(id)
			if (item) {
				return Response.json(item, { status: 200 })
			}
			return Response.json({ message: "item not found" }, { status: 400 })
		}
		const items = await itemsRepo.getItems()
		return Response.json(items, { status: 200 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}

// PUT request to update an item in the database
export async function PUT(request) {
	try {
		const { searchParams } = new URL(request.url)
		const id = parseInt(searchParams.get('id'))
		const item = await request.json()
		const result = await itemsRepo.updateItem(id, item)
		if (result === 'item updated successfully') {
			return Response.json(result, { status: 200 })
		}
		return Response.json(result, { status: 400 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}

// POST request to create an item and save it in the database
export async function POST(request) {
	try {
		const { searchParams } = new URL(request.url)
		const sellerId = parseInt(searchParams.get('sellerId'))
		const item = await request.json()
		const { result } = await itemsRepo.createItem(sellerId, item)
		if (result === 'item created successfully') {
			return Response.json(result, { status: 201 })
		}
		return Response.json(result, { status: 400 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}