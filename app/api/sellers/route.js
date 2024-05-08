import sellersRepo from "@/app/repo/sellers-repo";

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

