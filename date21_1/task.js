const fs = require('fs');

// fs.mkdir('newDirectory', (err) => {
//     if (err) {
//         return;
//     }
//     console.log('Directory is created');    
// });


// fs.mkdir('folder/folder1/folder2',{recursive:true},(err)=>{
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log('Directories is created');
// });


// directory read karne ke liye

// fs.readdir('newDirectory',(err,files)=>{
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log(files);
// });


//empty directory delete karne ke liye

// fs.rmdir('newDirectory',(err)=>{
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log('newDirectory is deleted');
// });


//non-empty directory delete karne ke liye
//kabhi-kabhi agar folder already delete ho chuka ho ya exist hi na karta ho, error aa sakta hai uske liye force=true kar sakte hain

fs.rm('newDirectory', {recursive:true, force:true},(err)=>{
    if(err) {
        console.log(err);
        return;
    }
    console.log('newDirectory is deleted');
});