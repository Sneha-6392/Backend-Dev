function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Rahul", isPremium: true });
    }, 1000);
  });
}

function fetchOrders(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { item: "Laptop", price: 1000, status: "delivered" },
        { item: "Phone", price: 500, status: "pending" }
      ]);
    }, 2000);
  });
}

async function displayDashboard(id) {
  try {
    const user = await fetchUser(id);
    const orders = await fetchOrders(id);

    const deliveredOrders = orders.filter(
      order => order.status === "delivered"
    );

    const discountedOrders = deliveredOrders.map(order => {
      if (user.isPremium) {
        return {
          ...order,
          price: order.price * 0.9 
        };
      }
      return order;
    });

    const total = discountedOrders.reduce(
      (sum, order) => sum + order.price,
      0
    );

    console.log(`Welcome ${user.name} 👋`);
    console.log("Delivered Orders:", discountedOrders);
    console.log(`Final Total: $${total}`);

  } catch (error) {
    console.error(error);
  }
}

displayDashboard(1);
