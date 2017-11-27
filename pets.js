let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];

if (cmd === 'read'){
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err){
      throw err;
    }


  let pets = JSON.parse(data);
  console.log(pets);
});
} else{
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
