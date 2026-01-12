function getUser(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Rahul", type: "Free" });
    }, 1500);
  });
}

function checkSubscription(user) {
  return new Promise((resolve, reject) => {
    if (user.type === "Premium") {
      resolve("Access Granted to Netflix");
    } else {
      reject("Please Subscribe");
    }
  });
}

async function authenticateUser() {
  try {
    const user = await getUser("rahul123");
    const message = await checkSubscription(user); 
    console.log(message);
  } catch (error) {
    console.error(error);
  }
}

authenticateUser();


