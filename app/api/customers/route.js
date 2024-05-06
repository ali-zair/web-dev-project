import customersRepo from "@/app/repo/customers-repo"

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const custId = parseInt(searchParams.get('custId'))
		if (custId) {
			const itemsPurchased = await customersRepo.getPurchases(custId)
			return Response.json(itemsPurchased, { status: 200 });
		}
		return Response.json({ message: "Invalid username or password" }, { status: 401 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}

export async function POST(request) {
	try {
		const { username, password } = await request.json()
		const cookie = await customersRepo.login(username, password);
		if (cookie) {
			return Response.json(cookie, { status: 200 });
		}
		return Response.json({ message: "Invalid username or password" }, { status: 401 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}

export async function PATCH(request) {
	try {
		const { searchParams } = new URL(request.url)
		const custId = parseInt(searchParams.get('custId'))
		const itemId = parseInt(searchParams.get('itemId'))
		const quantity = parseInt(searchParams.get('quantity'))
		const purchaseDetails = await request.json()
		if (custId && itemId && quantity) {
			const result = await customersRepo.purchaseItem(custId, itemId, quantity, purchaseDetails)
			switch (result) {
				case 'item updated successfully':
					return Response.json({ message: 'item purchased successfully' }, { status: 200 });
				case 'not enough stock for this item':
					return Response.json({ message: 'item is currently unavailable' }, { status: 200 });
				case 'customer has insufficient balance':
					return Response.json({ message: 'customer has insufficient balance' }, { status: 200 });
			}
		}
		return Response.json({ message: 'there was an error purchasing this item' }, { status: 400 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}