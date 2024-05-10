import { PrismaClient } from '@prisma/client'
import itemsRepo from './items-repo.js'
import sellersRepo from './sellers-repo.js'
const prisma = new PrismaClient()

class CustomersRepo {

	async getCustomers() {
		try {
			return prisma.customer.findMany()
		} catch (error) {
			return { error: error.message }
		}
	}

	async getCustomer(custId) {
		try {
			return prisma.customer.findUnique({ where: { id: custId } })
		} catch (error) {
			return { error: error.message }
		}
	}

	async login(username, password) {
		try {
			const customer = await prisma.customer.findUnique({
				where: { username, password }
			})
			const cookie = {
				cookie: customer.id + ":" + sellersRepo.generateCookie(),
				customerId: customer.id
			}
			return prisma.customerCookie.create({ data: cookie })
		} catch (error) {
			return { error: error.message }
		}
	}

	// function to remove a cookie from the database when a user logs out
	async logout(cookie) {
		try {
			return prisma.customerCookie.delete({ where: { cookie } })
		} catch (error) {
			return { error: error.message }
		}
	}

	async isLoggedIn(cookie) {
		try {
			return prisma.customerCookie.findUnique({ where: { cookie } })
		} catch (error) {
			return { error: error.message }
		}
	}

	async updateCustomers(custId, customer) {
		try {
			return prisma.customer.update({
				where: { id: custId },
				data: customer
			})
		} catch (error) {
			return { error: error.message }
		}
	}

	async getPurchases(custId) {
		try {
			return prisma.customer.findUnique({
				where: { id: custId },
				select: { itemsPurchased: true }
			})
		} catch (error) {
			return { error: error.message }
		}
	}

	async purchaseItem(custId, itemId, quantity, purchaseDetails) {
		const customer = await prisma.customer.findUnique({ where: { id: custId } })
		const item = await prisma.item.findUnique({ where: { id: itemId } })
		if (customer.balance >= (item.price * quantity)) {
			if (item.quantity >= quantity) {
				// decreasing the quantity of the item
				item.quantity -= quantity
				await itemsRepo.updateItem(itemId, item)
				// calculating the total amount of the purchase
				const amount = parseFloat(item.price) * parseFloat(quantity)
				// reducing the amount from the balance of the customer
				customer.balance -= amount
				// adding the purchase details object to the customer
				// const { orderNo, shippingAddress, date, shippingType, customerId } = purchaseDetails
				// const purchase = {
				// 	orderNo, itemId, shippingAddress, quantity, date, shippingType, amount, customerId
				// }
				purchaseDetails.amount = amount
				await prisma.purchase.create({ data: purchaseDetails })
				await this.updateCustomers(customer.id, customer)
				// updating the sellers balance
				await sellersRepo.updateSellerBalance(itemId, amount)
				return 'item updated successfully'
			}
			return 'not enough stock for this item'
		}
		return 'customer has insufficient balance'
	}

}

export default new CustomersRepo()