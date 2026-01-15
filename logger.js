const fs=require("fs");
function logActivity(message){
    const time=new Date().toLocaleString();
    const msg=`${time} - ${message}\n`;

    fs.appendFile("activity.log", msg, (err) => {
        if (err) {
            console.log("Error writing to file");
        }
    });
}

module.exports = logActivity;