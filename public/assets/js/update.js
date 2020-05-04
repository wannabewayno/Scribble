const fs = require('fs');

// a callback map for the type of method that get's passed in.
methodStack = {};
methodStack.delete = () => console.log("Note succesfully deleted, data updated");
methodStack.post = () => console.log("Data succesfully updated")

const update = (data,method) => {
    fs.writeFile('./db/journal.json',JSON.stringify(data),(err) =>{
        if (err) {throw new Error("Error updating data")};
        methodStack[method];
    });
}
module.exports = update;