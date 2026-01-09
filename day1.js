const user = {name:"Sneha",email:"sneha.maurya02sm@gmail.com" , phone: 1234567890 , password:"sneha@123"}; ;
//methods of object:

const userName = user.name;
console.log(userName);


const {name , email , phone} = user;
console.log(name);
console.log(email);
console.log(phone);


//Object Reference:
const user1={...user};
const user2=user1;
user1.name="Sneha Maurya";
user2.name="Golu"
console.log(user);
console.log(user1);


//Spread Operator:
const updateUser = {...user , address:"mathura"}
console.log(updateUser);

//hide password with rest operator  :
const {password,...publicData} = user;
console.log(publicData);

//Array Methods:
const number = [1,2,3,4,5]; 

//array ke har element ko 2 se multiply karke naya array newNumber banata hai.
const newNumber = number.map((num) => num * 2); 
console.log(newNumber);