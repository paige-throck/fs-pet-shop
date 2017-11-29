#!/usr/bin/env node

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

    if (index > pets.length || index < pets.length - pets.length) {
      console.log(`Usage: ${node} ${file} ${cmd} INDEX`)
      process.exit(1);

    } else if (numberCheck(index)) {
      console.log(pets[index])

    } else {
      console.log(pets)
    }

  });

} else if (cmd === 'create') {

  let petAge = Number(process.argv[3]);
  let petKind = process.argv[4];
  let petName = process.argv[5];

  if (petAge === undefined || petKind === undefined || petName === undefined) {
    console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
    process.exit(1);
  } else {
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
} else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }

      if (!process.argv[3] || !process.argv[4] || !process.argv[5] || !process.argv[6]) {
        console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
        process.exit(1);

      }
      let newPets = JSON.parse(data)
      let newIndex = process.argv[3]
      let newAge = Number(process.argv[4])
      let newKind = process.argv[5]
      let newName = process.argv[6]

      newPets[newIndex] = {
        age: newAge,
        kind: newKind,
        name: newName
      }

      console.log(newPets[newIndex]);

      let petsJSON = JSON.stringify(newPets);
      fs.writeFile(petsPath, petsJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }

      });
  });

} else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    let destroyPets = JSON.parse(data);
    let deadIndex = process.argv[3];

    if (deadIndex > destroyPets.length || deadIndex < destroyPets.length - destroyPets.length) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);

    } else  {
      let destroyPet = (destroyPets.splice(deadIndex,1)[0])
      console.log(destroyPet)

    }
    let petsJSON = JSON.stringify(destroyPets);
    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

    });
  });



} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);

}
