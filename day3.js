// Fetch Data from API in JavaScript:
/* fetch("https://jsonplaceholder.typicode.com/users")
.then((response) => {
  return response.json();
})
.then((data) => {
  console.log("Data using then/catch:", data);
})
.catch((error) => {
  console.log("Error:", error);
}); */

// using async/await:
/* const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");

    }
    const data = await response.json();
    console.log("User Data:", data);

  } catch (error){
    console.error("Fetch errors:",error);
  }

  }
fetchData(); */

// Q1;
// const obj = { a: "one", b: "two", a: "three" };
// console.log(obj);
// ans: { a: "three", b: "two" } 
// kyunki object me same key hone par last value hi consider hoti hai

// Q2;
// const a = {};
// const b = { key: "b" };
// const c = { key: "c" };
// a[b] = 123;
// a[c] = 456;
// console.log(a[b]);
// ans: 456 
// kyunki a[b] aur a[c] dono hi a["[object Object]"] me convert hote hai, isliye last assignment hi consider hota hai

// Q3;
// const user = { name: "Lydia", age: 21 };
// const admin = { admin: true, ...user };
// console.log(admin);
// ans: { admin: true, name: "Lydia", age: 21 } 
// kyunki spread operator se user object ke properties admin object me add ho jate hai

// Q4;
// const shape = {
//     radius: 10,
//     diameter() {
//         return this.radius * 2;
//     },
//     perimeter: () => 2 * Math.PI * this.radius,
// };
// console.log(shape.diameter());
// console.log(shape.perimeter());
// ans: 20, NaN 
// perimeter mai arrow function use hua hai jisme this lexical hota hai, isliye this.radius undefined hai aur result NaN aata hai

// Q5
// function test() {
//     console.log(a);
//     console.log(b);
   
//     var a = 10;
//     let b = 20;
// }
// test();
// ans: undefined, ReferenceError: Cannot access 'b' before initialization
// // kyunki var a ki declaration ho jati hai but initialization nahi hoti, isliye undefined aata hai
// // let b ki declaration bhi ho jati hai but temporal dead zone me hoti hai, isliye ReferenceError aata hai

// Q6
// var x = 10;
// if (true) {
//   var x = 20;
//   console.log(x);
// }
// console.log(x);
// let y = 10;
// if (true) {
//   let y = 20;
//   console.log(y);
// }
// console.log(y);
// ans: 20, 20, 20, 10
// kyunki var function scoped hota hai, isliye block ke andar wali value ne global value ko overwrite kar diya
// let block scoped hota hai, if ke andar ka y alag variable hai, bahar wala y untouched rehta hai