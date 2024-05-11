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

	async totalNumberOfBuyersPerLocation() {
		// const purcshases = await this.getItemsPurchasedForSeller(sellerId);
		// const customerIds = purchases.map(purchase => purchase.customerId);
		const buyersByLocation = await prisma.customer.groupBy({
			by: ['country'],
			_count: {
				id: true
			}
		});

		// const buyersByLocation = await prisma.customer.groupBy({
		// 	by: ['city', 'country'],
		// 	_count: {
		// 		customerId: true
		// 	},
		// 	where: {
		// 		id: {
		// 			in: customerIds
		// 		}
		// 	}
		// });
		return buyersByLocation;
	}

	async topThreeProductsBought() {
		return prisma.purchase.groupBy({
			by: ['title'],
			_count: { orderNo: true },
			orderBy: { _count: { orderNo: "desc" } },
			take: 3
		})
	}

	async productsNeverPurchased() {
		return prisma.purchase.groupBy({
			by: ['orderNo'],
			_count: { orderNo: true },
			having: { orderNo: { equals: 0 } }
		})
	}


}

export default new StatsRepo();