import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const customersPath = path.join(process.cwd(), 'app/data/customers.json')
const itemsPath = path.join(process.cwd(), 'app/data/items.json')
const sellersPath = path.join(process.cwd(), 'app/data/sellers.json')
const bankAccountsPath = path.join(process.cwd(), 'app/data/bank-accounts.json')
const purchasesPath = path.join(process.cwd(), 'app/data/purchases.json')

async function main() {
	try {
		const customers = await fs.readJSON(customersPath)
		const items = await fs.readJSON(itemsPath)
		const sellers = await fs.readJSON(sellersPath)
		const bankAccounts = await fs.readJSON(bankAccountsPath)
		const purchases = await fs.readJSON(purchasesPath)

		// Deleting all the current entries
		await prisma.sellerCookie.deleteMany({})
		await prisma.seller.deleteMany({})
		await prisma.item.deleteMany({})
		await prisma.customerCookie.deleteMany({})
		await prisma.purchase.deleteMany({})
		await prisma.customer.deleteMany({})
		await prisma.bankAccount.deleteMany({})

		for (const seller of sellers) await prisma.seller.create({ data: seller })
		for (const bankAccount of bankAccounts) await prisma.bankAccount.create({ data: bankAccount })
		for (const item of items) await prisma.item.create({ data: item })
		for (const customer of customers) await prisma.customer.create({ data: customer })
		for (const purchase of purchases) await prisma.purchase.create({ data: purchase })

		console.log("Seeded the database successfully!");

	} catch (error) {
		console.log(error);
		return { error: error.message }
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})