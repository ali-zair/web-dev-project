import Customer from './customer.js';
import Admin from './admin.js';
import Seller from './seller.js';
import path from 'path';
import fs from 'fs-extra';

const customersPath = path.join(process.cwd(), './customers.json');
const adminsPath = path.join(process.cwd(), './admins.json');
const sellersPath = path.join(process.cwd(), './sellers.json');
 
const customers = [
    new Customer('John', 'Doe', '123 Main St', 'jodoe', 'jodoe123', 500),
    new Customer('Jane', 'Doe', '123 Main St', 'jadoe', 'jadoe123', 1000),
    new Customer('Jim', 'Doe', '123 Main St', 'jimdoe', 'jimdoe123', 1500),
    new Customer('Jill', 'Doe', '123 Main St', 'jilldoe', 'jilldoe123', 2000),
    new Customer('Jack', 'Doe', '123 Main St', 'jackdoe', 'jackdoe123', 2500),
    new Customer('Jenny', 'Doe', '123 Main St', 'jennydoe', 'jennydoe123', 3000),
    new Customer('Jared', 'Doe', '123 Main St', 'jareddoe', 'jareddoe123', 3500)
];

const admins = [
    new Admin('admin1', 'admin123'),
    new Admin('admin2', 'admin123'),
    new Admin('admin3', 'admin123')
];

const sellers = [
    new Seller('companyA', 'seller1', 'seller123', 'accountA'),
    new Seller('companyB', 'seller2', 'seller123', 'accountB'),
    new Seller('companyC', 'seller3', 'seller123', 'accountC'),
    new Seller('companyC', 'seller4', 'seller123', 'accountD')
];

export async function save() {
    await fs.writeJson(customersPath, this.customers);
    await fs.writeJson(adminsPath, this.admins);
    await fs.writeJson(sellersPath, this.sellers);
}

export async function read() {
    this.customers = await fs.readJson(customersPath);
    this.admins = await fs.readJson(adminsPath);
    this.sellers = await fs.readJson(sellersPath);
}

export async function customerLogin(username, password) {
    const foundCustomer = this.customers.find(c => c.username === username && c.password === password);
    if (foundCustomer) return true;
    return false;
}

export async function adminLogin(username, password) {
    const foundAdmin = this.admins.find(a => a.username === username && a.password === password);
    if (foundAdmin) return true;
    return false;
}

export async function sellerLogin(username, password) {
    const foundSeller = this.sellers.find(s => s.username === username && s.password === password);
    if (foundSeller) return true;
    return false;
}