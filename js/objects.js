import path from 'path';
import fs from 'fs-extra';

const users = [
	{
		name: 'Sid',
		surname: 'Thomas',
		address: '4073 Hayhurst Lane Southfield, MI 48075',
		username: 'sthomas',
		password: 'thomas123',
		balance: 500,
		itemsPurchased: [{
			itemId: 309,
			shippingAddress: '4073 Hayhurst Lane Southfield, MI 48075',
			quantity: 2,
			date: new Date('2024-19-03'),
			shippingType: 'Standard'
		}]
	},
	{
		name: 'Lucy',
		surname: 'Batts',
		address: '3121 Bottom Lane Gasport, NY 14067', 
		username: 'lbatts',
		password: 'batts123',
		balance: 1000,
		itemsPurchased: [{
			itemId: 265,
			shippingAddress: '3121 Bottom Lane Gasport, NY 14067',
			quantity: 1,
			date: new Date('2024-20-03'),
			shippingType: 'Express'
		}]
	},
	{
		name: 'Tammy',
		surname: 'Scudder',
		address: '253 Michigan Avenue Connellsville, PA 15425',
		username: 'tscudder',
		password: 'scudder123',
		balance: 1500,
		itemsPurchased: [{
			itemId: 401,
			shippingAddress: '253 Michigan Avenue Connellsville, PA 15425',
			quantity: 3,
			date: new Date('2024-21-03'),
			shippingType: 'Priority Mail'
		}]
	},
	{
		name: 'James',
		surname: 'Lemus',
		address: '4985 Roane Avenue Beltsville, MD 20705',
		username: 'jlemus',
		password: 'lemus123',
		balance: 2000,
		itemsPurchased: [{
			itemId: 604,
			shippingAddress: '4985 Roane Avenue Beltsville, MD 20705',
			quantity: 1,
			date: new Date('2024-22-03'),
			shippingType: 'Standard'
		}]
	},
	{
		name: 'Jill',
		surname: 'Bowden',
		address: '4648 Howard Street Grand Rapids, MI 49503',
		username: 'jbowden',
		password: 'bowden123',
		balance: 2500,
		itemsPurchased: [{
			itemId: 367,
			shippingAddress: '4648 Howard Street Grand Rapids, MI 49503',
			quantity: 4,
			date: new Date('2024-23-03'),
			shippingType: 'Standard'
		}]
	},
	{ username: 'admin1', password: 'admin123' },
	{ username: 'admin2', password: 'admin123' },
	{ username: 'admin3', password: 'admin123' },
	{
		company: 'companyA',
		username: 'seller1',
		password: 'seller123',
		bankAccount: 'accountA'
	},
	{
		company: 'companyB',
		username: 'seller2',
		password: 'seller123',
		bankAccount: 'accountB'
	},
	{
		company: 'companyC',
		username: 'seller3',
		password: 'seller123',
		bankAccount: 'accountC'
	},
	{
		company: 'companyC',
		username: 'seller4',
		password: 'seller123',
		bankAccount: 'accountD'
	}
];

const items = [
	{
		id: 309,
		thumbnail: 'img/lemur-pro.png',
		title: 'System76 Lemur Pro',
		note: 'Best everyday laptop!',
		features: [
			'Lightest, thinnest laptop',
			'16:10 screen ratio (1200p)',
			'Opens to 180°',
			'Intel Core Ultra (Series 1)'
		],
		price: 1399,
		quantity: 2
	},
	{
		id: 265,
		thumbnail: 'img/pangolin.png',
		title: 'System76 Pangolin',
		note: 'Best graphics!',
		features: [
			'Fast AMD CPU',
			'Best integrated graphics',
			'Camera privacy switch',
			'Quick storage access'
		],
		price: 1299,
		quantity: 10
	},
	{
		id: 150,
		thumbnail: 'img/darter-pro.png',
		title: 'System76 Darter Pro',
		note: 'Most premium build!',
		features: [
			'Compact 15"',
			'12-Core CPU',
			'DDR5 RAM (96GB max)',
			'Most ports including microSD reader'
		],
		price: 1500,
		quantity: 5
	},
	{
		id: 401,
		thumbnail: 'img/adder-ws.png',
		title: 'System76 Adder WS',
		note: 'Most affordable high-end performance!',
		features: [ '24-core CPU', 'NVIDIA 40-Series', 'DDR5 RAM', 'PCIe 4.0 SSDs' ],
		price: 1699,
		quantity: 9
	},
	{
		id: 604,
		thumbnail: 'img/serval-ws.png',
		title: 'System76 Serval WS',
		note: 'Most affordable 4K display!',
		features: [
			'Fast USB speeds',
			'Premium build',
			'165Hz refresh rate (15")',
			'2K or 4K display (17")'
		],
		price: 2099,
		quantity: 4
	},
	{
		id: 367,
		thumbnail: 'img/bonobo-ws.png',
		title: 'System76 Bonobo WS',
		note: 'Most powerful!',
		features: [
			'24-core Intel i9 processor',
			'NVIDIA RTX 4080 or 4090',
			'2K 240Hz or 4K 144Hz display',
			'Massive trackpad'
		],
		price: 3299,
		quantity: 6
	}
];
