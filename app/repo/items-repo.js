import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class ItemsRepo {

	async getItems() {
		try {
			return prisma.item.findMany()
		} catch (error) {
			return { error: error.message }
		}
	}

	async getItem(id) {
		try {
			return prisma.item.findUnique({ where: { id } })
		} catch (error) {
			return { error: error.message }
		}
	}

	async updateItem(itemId, item) {
		try {
			return prisma.item.update({
				where: { id: itemId },
				data: item
			})
		} catch (error) {
			return { error: error.message }
		}
	}

	async createItem(item) {
		try {
			return prisma.item.create({ data: item })
		} catch (error) {
			return { error: error.message }
		}
	}

}

export default new ItemsRepo()