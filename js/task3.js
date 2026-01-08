const checkOrderStatus = (orderId) => {
  return new Promise((resolve, reject) => {
    if (typeof orderId === "number") {
      setTimeout(() => {
        resolve("Order Shipped");
      }, 1000);
    } else {
      reject("Invalid Order ID");
    }
  });
};

async function checkOrder() {
    try {
        const result = await checkOrderStatus(null);
        console.log(result);
    } 
    catch (error) {
        console.error(error);
    }
}
checkOrder();
