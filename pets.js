#! /usr/local/bin/node

/*
 * A command line file system for a pet shop directory
 *
 * Example:
 *
 *
 */

let fs = require('fs');
let http = require('http');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];
let index = process.argv[3];


if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    let pets = JSON.parse(data);
    // console.log(pets);

    if (numberCheck(index)){
      console.log(pets[index])
    }

    else {
      console.log(pets)
    }
  });

  function numberCheck(num){
    return !isNaN(num)
  }


  

} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    let pets = JSON.parse(data);
    let pet = process.argv[3];
    if (!pets) {
      console.error(`Usage: ${node} ${file} ${cmd} PET`);
      process.exit(1);
    }
    pets.push(pet);

    let petsJSON = JSON.stringify(pets);
    fs.writeFile(petsPATH, petsJSON, function(writeERR) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(pet);
    });
  });
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
