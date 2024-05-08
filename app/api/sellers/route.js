import sellersRepo from "@/app/repo/sellers-repo";

// GET method to get the items owned by a specific seller
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const sellerId = parseInt(searchParams.get('sellerId'))
		const itemsOwned = await sellersRepo.getSellerItems(sellerId)
		if (itemsOwned.length > 0) {
			return Response.json(itemsOwned, { status: 200 })
		}
		return Response.json({ message: "the seller does not own any items" }, { status: 401 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}

// POST request to verify the login credentials of a seller
export async function POST(request) {
	try {
		const { username, password } = await request.json()
		const cookie = await sellersRepo.login(username, password);
		if (cookie) {
			return Response.json(cookie, { status: 200 });
		}
		return Response.json({ message: "Invalid username or password" }, { status: 401 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}