import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class StatsRepo {

	async getItemsPurchasedForSeller(sellerId) {
		try {
			const seller = await prisma.seller.findUnique({
				where: { id: sellerId },
				include: { itemsOwned: true }
			});
			// Extracting the item IDs
			const itemIds = seller.itemsOwned.map(item => item.id);
			// Fetching the purchases for the items
			return prisma.purchase.findMany({
				where: { itemId: { in: itemIds } },
			});
		} catch (error) {
			console.error("Error fetching purchases:", error);
			throw error; // Rethrow the error to handle it at a higher level
		}
	}

	async totalAmountOfPurchases(sellerId) {
		try {
			const purchases = await this.getItemsPurchasedForSeller(sellerId);
			const numOfItems = purchases.length;
			const totalAmount = purchases.map(purchase => purchase.amount).reduce((a, b) => a + b, 0)
			return { numOfItems, totalAmount };
		} catch (error) {
			console.error("Error fetching purchases:", error);
			throw error; // Rethrow the error to handle it at a higher level
		}
	}

	async buyersPerLocation(sellerId) {
		const purchases = await this.getItemsPurchasedForSeller(sellerId);
		const customerIds = purchases.map(purchase => purchase.customerId);
		const customers = await prisma.customer.findMany({
			where: { id: { in: customerIds } },
			select: { city: true, country: true }
		});


	}

}

export default new StatsRepo();