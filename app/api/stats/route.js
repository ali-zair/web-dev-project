import statsRepo from "@/app/repo/stats-repo";

// GET method to get the items owned by a specific seller
export async function GET(request) {
	try {
		const buyers = await statsRepo.totalNumberOfBuyersPerLocation()
		return Response.json(buyers, { status: 200 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}
