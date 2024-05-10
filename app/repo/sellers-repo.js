import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class SellersRepo {

	async getSellers() {
		try {
			return prisma.seller.findMany()
		} catch (error) {
			return { error: error.message }
		}
	}

	async getSeller(sellerId) {
		try {
			return prisma.seller.findUnique({ where: { id: sellerId } })
		} catch (error) {
			return { error: error.message }
		}
	}

	async getSellerItems(sellerId) {
		try {
			return prisma.seller.findUnique({
				where: { id: sellerId },
				select: { itemsOwned: true }
			})
		} catch (error) {
			return { error: error.message }
		}
	}

	async login(username, password) {
		try {
			const seller = await prisma.seller.findUnique({
				where: { username, password }
			})
			const cookie = {
				cookie: seller.id + ":" + this.generateCookie(),
				sellerId: seller.id
			}
			return prisma.sellerCookie.create({ data: cookie })
		} catch (error) {
			return { error: error.message }
		}
	}

	// function to remove a cookie from the database when a seller logs out
	async logout(cookie) {
		try {
			return prisma.sellerCookie.delete({ where: { cookie } })
		} catch (error) {
			return { error: error.message }
		}
	}

	async isLoggedIn(cookie) {
		try {
			return prisma.sellerCookie.findUnique({ where: { cookie } })
		} catch (error) {
			return { error: error.message }
		}
	}

	generateCookie() {
		let cookie = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < 60; i++) {
			cookie += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return cookie;
	}

	async addItemToSeller(sellerId, item) {
		try {
			const seller = await prisma.seller.findUnique({ where: { id: sellerId } })
			seller.itemsOwned.push(item)
			return prisma.seller.update({
				where: { id },
				data: seller
			})
		} catch (error) {
			return { error: error.message }
		}
	}

	async updateSellerBalance(itemId, amount) {
		try {
			const item = await prisma.item.findUnique({ where: { id: itemId } })
			const seller = await prisma.seller.findFirst({
				where: {
					itemsOwned: {
						some: { id: item.id }
					}
				}
			})
			const bankAccount = await prisma.bankAccount.findUnique({ where: { accountNo: seller.bankAccountNo } })
			const newBalance = parseFloat(bankAccount.balance) + parseFloat(amount);
			return prisma.bankAccount.update({
				where: { accountNo: seller.bankAccountNo },
				data: { balance: newBalance }
			})
		} catch (error) {
			return { error: error.message }
		}
	}

}

export default new SellersRepo()