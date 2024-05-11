import { faker } from "@faker-js/faker"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

	// Deleting all the current entries
	await prisma.sellerCookie.deleteMany({})
	await prisma.seller.deleteMany({})
	await prisma.item.deleteMany({})
	await prisma.customerCookie.deleteMany({})
	await prisma.purchase.deleteMany({})
	await prisma.customer.deleteMany({})
	await prisma.bankAccount.deleteMany({})

	const countries = ['Qatar', 'United Arab Emirates', 'Saudi Arabia', 'Kuwait', 'Bahrain', 'Oman'];

	// Generate and insert 100 sellers
	for (let i = 1; i <= 20; i++) {
		const seller = generateSeller(i);
		await prisma.seller.create({ data: seller });
	}

	// Generate and insert 500 customers
	for (let i = 1; i <= 50; i++) {
		const country = faker.helpers.arrayElement(countries);
		const customer = generateCustomer(i, country);
		await prisma.customer.create({ data: customer });
	}

	// Generate and insert 100 purchases
	for (let i = 1; i <= 500; i++) {
		const cCounter = faker.number.int({ min: 1, max: 50 });
		const purchase = generatePurchase(i % 50 + 1, cCounter);
		await prisma.purchase.create({ data: purchase });
	}

	// Generate and insert 100 bank accounts
	for (let i = 1; i <= 20; i++) {
		const bankAccount = generateBankAccount(i);
		await prisma.bankAccount.create({ data: bankAccount });
	}

	// Generate and insert 1000 items
	for (let i = 1; i <= 100; i++) {
		const sCounter = faker.number.int({ min: 1, max: 20 });
		const item = generateItem(i, sCounter);
		await prisma.item.create({ data: item });
	}

	console.log("Seeded the database successfully!");

}

function generateSeller(sCounter) {
	return {
		id: sCounter,
		company: faker.company.name(),
		username: faker.internet.userName(),
		password: faker.internet.password(),
	};
};

// Function to generate a fake purchase object
function generatePurchase(iCounter, cCounter) {
	return {
		orderNo: faker.number.int({ max: 9999999 }),
		itemId: iCounter,
		shippingAddress: faker.location.streetAddress(true),
		quantity: faker.number.int({ max: 10 }),
		date: faker.date.past(),
		shippingType: faker.helpers.arrayElement(['Standard', 'Express']),
		amount: faker.number.int({ max: 9999999 }),
		customerId: cCounter
	};
};

// Function to generate a fake item object
function generateItem(iCounter, sCounter) {
	return {
		id: iCounter,
		thumbnail: faker.image.url(),
		title: faker.commerce.productName(),
		note: faker.lorem.sentence(),
		features: faker.lorem.sentences(3),
		price: faker.number.int({ max: 5000 }),
		quantity: faker.number.int({ max: 1000 }),
		extra_details: faker.lorem.paragraph(),
		sellerId: sCounter
	};
};

// Function to generate a fake customer object
function generateCustomer(cCounter, country) {
	return {
		id: cCounter,
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		streetAddress: faker.location.streetAddress(true),
		city: faker.location.city({ country: country }),
		country: country,
		username: faker.internet.userName(),
		password: faker.internet.password(),
		balance: faker.finance.amount({ min: 5000, max: 10000 })
	};
};

// Function to generate a fake bank account object
function generateBankAccount(sCounter) {
	return {
		accountNo: faker.number.int({ min: 10000000, max: 99999999 }),
		balance: faker.finance.amount(),
		sellerId: sCounter
	};
};

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})