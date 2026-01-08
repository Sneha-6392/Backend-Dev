const cart = [
{ item: "Laptop", price: 50000, quantity: 1, inStock: true },
{ item: "Mouse", price: 1500, quantity: 2, inStock: true },
{ item: "Keyboard", price: 3000, quantity: 1, inStock: false }
];

const allInStock = cart.every(({inStock}) => inStock);
console.log(allInStock ? "Ready to Ship" : "Wait");

const notStockedItems = cart.filter(({inStock}) => !inStock);
console.log(notStockedItems);

const totalBill = cart.reduce((total, {price, quantity}) => total + price * quantity, 0);
console.log(totalBill);