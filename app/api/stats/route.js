import statsRepo from "@/app/repo/stats-repo";

// GET method to get the items owned by a specific seller
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url)
		const buyersPerLocation = Boolean(searchParams.get('buyersPerLocation'))
		const topThreeProducts = Boolean(searchParams.get('topThreeProducts'))
		const productsNeverPurchased = Boolean(searchParams.get('productsNeverPurchased'))
		const totalAmountOfPurchases = Boolean(searchParams.get('totalAmountOfPurchases'))
		let result
		if (buyersPerLocation === true) {
			result = await statsRepo.totalNumberOfBuyersPerLocation()
		}
		if (topThreeProducts === true) {
			result = await statsRepo.topThreeProductsBought()
		}
		if (productsNeverPurchased === true) {
			result = await statsRepo.productsNeverPurchased()
		}
		if (totalAmountOfPurchases === true) {
			result = await statsRepo.totalAmountOfPurchases()
		}
		return Response.json(result, { status: 200 })
	} catch (error) {
		return Response.json({ message: error.message }, { status: 500 });
	}
}
