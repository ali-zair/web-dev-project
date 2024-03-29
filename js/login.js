// const users = [
//     {
//         name: 'John',
//         surname: 'Doe',
//         address: '123 Main St',
//         username: 'jodoe',
//         password: 'jodoe123',
//         balance: 500,
//         purchases: undefined
//     },
//     {
//         name: 'Jane',
//         surname: 'Doe',
//         address: '123 Main St',
//         username: 'jadoe',
//         password: 'jadoe123',
//         balance: 1000,
//         purchases: undefined
//     },
//     {
//         name: 'Jim',
//         surname: 'Doe',
//         address: '123 Main St',
//         username: 'jimdoe',
//         password: 'jimdoe123',
//         balance: 1500,
//         purchases: undefined
//     },
//     {
//         name: 'Jill',
//         surname: 'Doe',
//         address: '123 Main St',
//         username: 'jilldoe',
//         password: 'jilldoe123',
//         balance: 2000,
//         purchases: undefined
//     },
//     {
//         name: 'Jack',
//         surname: 'Doe',
//         address: '123 Main St',
//         username: 'jackdoe',
//         password: 'jackdoe123',
//         balance: 2500,
//         purchases: undefined
//     },
//     {
//         name: 'Jenny',
//         surname: 'Doe',
//         address: '123 Main St',
//         username: 'jennydoe',
//         password: 'jennydoe123',
//         balance: 3000,
//         purchases: undefined
//     },
//     {
//         name: 'Jared',
//         surname: 'Doe',
//         address: '123 Main St',
//         username: 'jareddoe',
//         password: 'jareddoe123',
//         balance: 3500,
//         purchases: undefined
//     },
//     { username: 'admin1', password: 'admin123' },
//     { username: 'admin2', password: 'admin123' },
//     { username: 'admin3', password: 'admin123' },
//     {
//         company: 'companyA',
//         username: 'seller1',
//         password: 'seller123',
//         bankAccount: 'accountA'
//     },
//     {
//         company: 'companyB',
//         username: 'seller2',
//         password: 'seller123',
//         bankAccount: 'accountB'
//     },
//     {
//         company: 'companyC',
//         username: 'seller3',
//         password: 'seller123',
//         bankAccount: 'accountC'
//     },
//     {
//         company: 'companyC',
//         username: 'seller4',
//         password: 'seller123',
//         bankAccount: 'accountD'
//     }
// ];

const data = await fetch("js/data/users.json");
const users = await data.json();

console.log(users);

if (!localStorage.users) {
	localStorage.users = users;
}

document.querySelector('#loginForm').addEventListener('submit', (event) => {
	event.preventDefault();
	const username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;
	const user = users.find(user => user.username === username && user.password === password);
	if (user) {
		localStorage.isLoggedIn = "true";
		confirm("Successfully Logged In!");
		window.location.href = "/home.html";
	} else {
		confirm("Login Failed: Please try again");
	}
});