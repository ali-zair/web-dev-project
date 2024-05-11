import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class StatsRepo {

	async totalAmountPerPurchases() {
		try {
			const purchases = await prisma.purchase.findMany({})
			const numOfItems = purchases.length;
			const totalAmount = purchases.map(purchase => parseFloat(purchase.amount)).reduce((a, b) => a + b, 0)
			return totalAmount / numOfItems
		} catch (error) {
			console.error("Error fetching purchases:", error);
			throw error; // Rethrow the error to handle it at a higher level
		}
	}

	async totalAmountOfPurchases() {
		const purchasesPerItem = await prisma.purchase.groupBy({
			by: ['itemId'],
			_sum: {
				amount: true,
			},
		});
		const itemIds = purchasesPerItem.map(purchase => purchase.itemId)
		const itemTitles = await prisma.item.findMany({
			where: { id: { in: itemIds } },
			select: { title: true }
		})
		const totalAmounts = purchasesPerItem.map(purchase => purchase._sum.amount)
		return { itemTitles, totalAmounts }
	}

	async totalNumberOfBuyersPerLocation() {
		const buyersByLocation = await prisma.customer.groupBy({
			by: ['country'],
			_count: {
				id: true
			}
		});

		const countries = buyersByLocation.map(buyer => buyer.country)
		const counts = buyersByLocation.map(buyer => buyer._count.id)

		return { countries, counts };
	}

	async topThreeProductsBought() {
		const topThreeProducts = await prisma.purchase.groupBy({
			by: ['itemId'],
			_sum: { quantity: true },
			orderBy: { _sum: { quantity: "desc" } },
			take: 3
		})
		const topThreeCounts = topThreeProducts.map(product => product._sum.quantity)
		const itemIds = topThreeProducts.map(purchase => purchase.itemId)
		const items = await prisma.item.findMany({
			where: { id: { in: itemIds } },
			select: { title: true }
		})
		const titles = items.map(item => item.title)
		return { titles, topThreeCounts }
	}

	async productsNeverPurchased() {
		// Getting all item IDs
		const allItemIds = (await prisma.item.findMany()).map(item => item.id);
		// Getting the item IDs that have been purchased
		const purchasedItemIds = (await prisma.purchase.findMany()).map(purchase => purchase.itemId);
		// Filtering out those item IDs that have never been purchased
		const productsNeverPurchasedIds = allItemIds.filter(itemId => !purchasedItemIds.includes(itemId));

		const productsNeverPurchased = await prisma.item.findMany({
			where: {
				id: { in: productsNeverPurchasedIds }
			},
			select: { title: true }
		})

		return productsNeverPurchased

	}

}

export default new StatsRepo();