let fs = require('fs');
let path = require('path');

let petsPath = path.join(__dirname, 'pets.json');
console.log(__dirname);

fs.readFile(petsPath, 'utf8', function(err, data){
  if (err){
    throw err;
  }
  let pets = JSON.parse(data);
  console.log(pets);
});
