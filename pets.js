#! /usr/local/bin/node

'use strict';

let fs = require('fs');
let http = require('http');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];

function numberCheck(num) {
  return !isNaN(num)
}

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    let pets = JSON.parse(data);
    let index = process.argv[3];

    if (undefined) {
      console.log(`Usage: ${node} ${file} read INDEX`)
      process.exit(1);

    } else if
      (numberCheck(index)) {
          console.log(pets[index])
        }
          else {
        console.log(pets)
      }

  });

} else if (cmd === 'create') {

  let petAge = Number(process.argv[3]);
  let petKind = process.argv[4];
  let petName = process.argv[5];

  if (petAge === undefined || petKind === undefined || petName === undefined){
    console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
    process.exit(1);
  } else{
    fs.readFile(petsPath, 'utf8', function(readErr, data) {
      if (readErr) {
        throw readErr;
      }

      let pets = JSON.parse(data);
      let pet = {
        age: petAge,
        kind: petKind,
        name: petName
      };

      pets.push(pet);
      let petsJSON = JSON.stringify(pets);
      fs.writeFile(petsPath, petsJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
        console.log(pet);
      });
    });
  }


} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);

}
