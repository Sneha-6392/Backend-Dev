const fetchuser=(userId)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const users={
                1:{name:"sneha",email:"sneha.maurya02sm@gmail.com",address:"mathura"},
                2:{name:"vanshika",email:"vanshika@gmail.com",address:"delhi"}}
        })
        const user=users[userId];
        if(user){
            resolve(user);
        }else{
            reject("user not found");
        }
    })
}
//fetch user
//.then((user)=>console.log(user));
//.catch((err)=>console.log(err));
//const response=await fetch("url");
const userData=async(userId)=>{
    try{
        const user=await fetchuser(userId);
        console.log("user data is fetched");
    }
    catch(e){
        console.log(e);
    }
}