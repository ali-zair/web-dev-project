import sellersRepo from "@/app/repo/sellers-repo";

// POST request to verify the cookie of a seller
export async function POST(request) {
	try {
		const { cookie } = await request.json()
		const isLoggedIn = await sellersRepo.isLoggedIn(cookie);
		if (isLoggedIn) {
			return Response.json({ cookie: cookie }, { status: 200 });
		}
		return Response.json({ message: "Invalid username or password" }, { status: 307 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}

// DELETE request to delete the cookies of the sellers that instantiate a log out
export async function DELETE(request) {
	try {
		const { cookie } = await request.json()
		const message = await sellersRepo.logout(cookie);
		return Response.json({ message: message }, { status: 200 });
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}